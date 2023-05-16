# FOT Operator

<!---
This file is auto-generated using:
node .scripts/generate-python-operator-doc.js
-->

```
Send the frenet optimal trajectory `waypoints` given some initial conditions in
    cartesian space.
    Args:
        initial_conditions (dict): dict containing the following items
            ps (float): previous longitudinal position
            target_speed (float): target speed [m/s]
            pos (np.ndarray([float, float])): initial position in global coord
            vel (np.ndarray([float, float])): initial velocity [m/s]
            wp (np.ndarray([float, float])): list of global waypoints
            obs (np.ndarray([float, float, float, float])): list of obstacles
                as: [lower left x, lower left y, upper right x, upper right y]
        hyperparameters (dict): a dict of optional hyperparameters
            max_speed (float): maximum speed [m/s]
            max_accel (float): maximum acceleration [m/s^2]
            max_curvature (float): maximum curvature [1/m]
            max_road_width_l (float): maximum road width to the left [m]
            max_road_width_r (float): maximum road width to the right [m]
            d_road_w (float): road width sampling discretization [m]
            dt (float): time sampling discretization [s]
            maxt (float): max prediction horizon [s]
            mint (float): min prediction horizon [s]
            d_t_s (float): target speed sampling discretization [m/s]
            n_s_sample (float): sampling number of target speed
            obstacle_clearance (float): obstacle radius [m]
            kd (float): positional deviation cost
            kv (float): velocity cost
            ka (float): acceleration cost
            kj (float): jerk cost
            kt (float): time cost
            ko (float): dist to obstacle cost
            klat (float): lateral cost
            klon (float): longitudinal cost
    Returns:
        result_x (np.ndarray(float)): x positions of fot, if it exists
        result_y (np.ndarray(float)): y positions of fot, if it exists
        speeds (np.ndarray(float)): speeds of fot, if it exists
        ix (np.ndarray(float)): spline x of fot, if it exists
        iy (np.ndarray(float)): spline y of fot, if it exists
        iyaw (np.ndarray(float)): spline yaws of fot, if it exists
        d (np.ndarray(float)): lateral offset of fot, if it exists
        s (np.ndarray(float)): longitudinal offset of fot, if it exists
        speeds_x (np.ndarray(float)): x speeds of fot, if it exists
        speeds_y (np.ndarray(float)): y speeds of fot, if it exists
        params (dict): next frenet coordinates, if they exist
        costs (dict): costs of best frenet path, if it exists
        success (bool): whether a fot was found or not
    
```

### `__init__()`



<details>
  <summary>Source Code</summary>

```python
    def __init__(self):
        self.obstacles = np.array([])
        self.lanes = np.array([])
        self.position = []
        self.speed = []
        self.last_position = []
        self.waypoints = []
        self.gps_waypoints = np.array([])
        self.last_obstacles = np.array([])
        self.obstacle_metadata = {}
        self.gps_metadata = {}
        self.metadata = {}
        self.orientation = None
        self.outputs = []
        self.hyperparameters = {
            "max_speed": 25.0,
            "max_accel": 45.0,
            "max_curvature": 55.0,
            "max_road_width_l": 0.1,
            "max_road_width_r": 0.1,
            "d_road_w": 0.5,
            "dt": 0.5,
            "maxt": 5.0,
            "mint": 2.0,
            "d_t_s": 5,
            "n_s_sample": 2.0,
            "obstacle_clearance": 0.1,
            "kd": 1.0,
            "kv": 0.1,
            "ka": 0.1,
            "kj": 0.1,
            "kt": 0.1,
            "ko": 0.1,
            "klat": 1.0,
            "klon": 1.0,
            "num_threads": 0,  # set 0 to avoid using threaded algorithm
        }
        self.conds = {
            "s0": 0,
            "target_speed": TARGET_SPEED,
        }  # paste output from debug log


```

</details>

### `.on_event(...)`



<details>
  <summary>Source Code</summary>

```python

    def on_event(
        self,
        dora_event: dict,
        send_output: Callable[[str, bytes], None],
    ) -> DoraStatus:
        if dora_event["type"] == "INPUT":
            return self.on_input(dora_event, send_output)
        return DoraStatus.CONTINUE


```

</details>


### `.on_input(...)`



<details>
  <summary>Source Code</summary>

```python

    def on_input(
        self,
        dora_input: dict,
        send_output: Callable[[str, bytes], None],
    ):

        if dora_input["id"] == "position":
            self.last_position = self.position
            self.position = np.array(dora_input["value"]).view(np.float32)
            if len(self.last_position) == 0:
                self.last_position = self.position
            return DoraStatus.CONTINUE

        elif dora_input["id"] == "speed":
            self.speed = np.array(dora_input["value"]).view(np.float32)
            return DoraStatus.CONTINUE

        elif dora_input["id"] == "obstacles":
            obstacles = (
                np.array(dora_input["value"]).view(np.float32).reshape((-1, 5))
            )
            if len(self.last_obstacles) > 0:
                self.obstacles = np.concatenate(
                    [self.last_obstacles, obstacles]
                )
            else:
                self.obstacles = obstacles

        elif dora_input["id"] == "global_lanes":
            lanes = (
                np.array(dora_input["value"])
                .view(np.float32)
                .reshape((-1, 60, 3))
            )
            self.lanes = lanes
            return DoraStatus.CONTINUE

        elif "gps_waypoints" == dora_input["id"]:
            waypoints = np.array(dora_input["value"]).view(np.float32)
            waypoints = waypoints.reshape((-1, 3))[:, :2]
            self.gps_waypoints = waypoints
            return DoraStatus.CONTINUE

        if len(self.gps_waypoints) == 0:
            print("No waypoints")
            send_output(
                "waypoints",
                self.gps_waypoints.tobytes(),
                dora_input["metadata"],
            )
            return DoraStatus.CONTINUE

        elif len(self.position) == 0 or len(self.speed) == 0:
            return DoraStatus.CONTINUE

        [x, y, z, rx, ry, rz, rw] = self.position
        [_, _, yaw] = R.from_quat([rx, ry, rz, rw]).as_euler(
            "xyz", degrees=False
        )

        gps_obstacles = get_obstacle_list(
            self.position, self.obstacles, self.gps_waypoints
        )

        if len(self.lanes) > 0:
            lanes = get_lane_list(self.position, self.lanes, self.gps_waypoints)
            obstacles = np.concatenate([gps_obstacles, lanes])
        else:
            obstacles = gps_obstacles
        initial_conditions = {
            "ps": 0,
            "target_speed": self.conds["target_speed"],
            "pos": self.position[:2],
            "vel": (np.clip(LA.norm(self.speed), 0.5, 40))
            * np.array([np.cos(yaw), np.sin(yaw)]),
            "wp": self.gps_waypoints,
            "obs": obstacles,
        }

        (
            result_x,
            result_y,
            speeds,
            ix,
            iy,
            iyaw,
            d,
            s,
            speeds_x,
            speeds_y,
            misc,
            costs,
            success,
        ) = fot_wrapper.run_fot(initial_conditions, self.hyperparameters)

        if not success:
            initial_conditions["wp"] = initial_conditions["wp"][:5]
            print(f"fot failed. stopping with {initial_conditions}.")
            target_distance = LA.norm(
                self.gps_waypoints[-1] - self.position[:2]
            )
            print(f"Distance to target: {target_distance}")
            for obstacle in self.obstacles:
                print(
                    f"obstacles:{obstacle}, label: {LABELS[int(obstacle[-1])]}"
                )

            send_output(
                "waypoints",
                pa.array(np.array([x, y, 0.0], np.float32).view(np.uint8)),
                dora_input["metadata"],
            )
            return DoraStatus.CONTINUE

        self.waypoints = np.concatenate([result_x, result_y]).reshape((2, -1)).T

        self.outputs = np.ascontiguousarray(
            np.concatenate([result_x, result_y, speeds])
            .reshape((3, -1))
            .T.astype(np.float32)
        )
        send_output(
            "waypoints",
            pa.array(self.outputs.ravel().view(np.uint8)),
            dora_input["metadata"],
        )
        return DoraStatus.CONTINUE


```

</details>


