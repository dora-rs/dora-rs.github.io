
 
# Plot operator

Plot operator takes outputs from the graph and plot it on the camera frame.


<!---
This file is auto-generated using:
node .scripts/generate-python-operator-doc.js
-->

## Methods

### `__init__()`



<details>
  <summary>Source Code</summary>

```python
    def __init__(self):
        self.waypoints = []
        self.gps_waypoints = []
        self.obstacles = []
        self.raw_obstacles = []
        self.obstacles_bbox = []
        self.obstacles_id = []
        self.lanes = []
        self.global_lanes = []
        self.drivable_area = []
        self.last_timestamp = time.time()
        self.position = []
        self.last_position = []
        self.camera_frame = []
        self.traffic_sign_bbox = []
        self.point_cloud = np.array([])
        self.control = []
        self.last_time = time.time()
        self.current_speed = []


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
        if "waypoints" == dora_input["id"]:
            waypoints = np.array(dora_input["value"])
            waypoints = waypoints.reshape((-1, 3))
            waypoints = waypoints[:, :2]
            # Adding z axis for plot
            waypoints = np.hstack((waypoints, -0.5 + np.zeros((waypoints.shape[0], 1))))
            self.waypoints = waypoints

        elif "gps_waypoints" == dora_input["id"]:
            gps_waypoints = np.array(dora_input["value"])
            gps_waypoints = gps_waypoints.reshape((-1, 3))
            gps_waypoints = gps_waypoints[:, :2]
            # Adding z axis for plot
            gps_waypoints = np.hstack(
                (gps_waypoints, -0.5 + np.zeros((gps_waypoints.shape[0], 1)))
            )
            self.gps_waypoints = gps_waypoints

        elif "control" == dora_input["id"]:
            self.control = np.array(dora_input["value"])

        elif "obstacles_bbox" == dora_input["id"]:
            self.obstacles_bbox = dora_input["value"].to_numpy().reshape((-1, 6))

        elif "traffic_sign_bbox" == dora_input["id"]:
            self.traffic_sign_bbox = np.array(dora_input["value"]).reshape((-1, 6))

        elif "obstacles_id" == dora_input["id"]:
            self.obstacles_id = np.array(dora_input["value"]).reshape((-1, 7))

        elif "obstacles" == dora_input["id"]:
            obstacles = np.array(dora_input["value"]).reshape((-1, 5))[:, :3]
            self.obstacles = obstacles

        elif "lanes" == dora_input["id"]:
            lanes = np.array(dora_input["value"]).reshape((-1, 30, 2))
            self.lanes = lanes

        elif "global_lanes" == dora_input["id"]:
            global_lanes = np.array(dora_input["value"]).reshape((-1, 3))
            self.global_lanes = global_lanes

        elif "drivable_area" == dora_input["id"]:
            drivable_area = np.array(dora_input["value"]).reshape((1, -1, 2))
            self.drivable_area = drivable_area

        elif "position" == dora_input["id"]:
            # Add sensor transform

            self.last_position = self.position
            self.position = np.array(dora_input["value"])
            if len(self.last_position) == 0:
                return DoraStatus.CONTINUE

            self.current_speed = (self.position[:2] - self.last_position[:2]) * 20

        elif "lidar_pc" == dora_input["id"]:
            point_cloud = np.array(dora_input["value"])
            point_cloud = point_cloud.reshape((-1, 3))
            # To camera coordinate
            # The latest coordinate space is the unreal space.
            point_cloud = np.dot(
                point_cloud,
                VELODYNE_MATRIX,
            )
            point_cloud = point_cloud[np.where(point_cloud[:, 2] > 0.1)]
            point_cloud = local_points_to_camera_view(point_cloud, INTRINSIC_MATRIX)

            if len(point_cloud) != 0:
                self.point_cloud = point_cloud.T

        elif "image" == dora_input["id"]:
            self.camera_frame = (
                dora_input["value"]
                .to_numpy()
                .copy()
                .reshape((CAMERA_HEIGHT, CAMERA_WIDTH, 4))
            )

        if "image" != dora_input["id"] or isinstance(self.camera_frame, list):
            return DoraStatus.CONTINUE

        if len(self.position) != 0:
            inv_extrinsic_matrix = np.linalg.inv(
                get_extrinsic_matrix(get_projection_matrix(self.position))
            )
        else:
            inv_extrinsic_matrix = None
            # print("no position messages.")

        resized_image = self.camera_frame[:, :, :3]
        resized_image = np.ascontiguousarray(resized_image, np.uint8)

        ## Drawing waypoints on frame
        if inv_extrinsic_matrix is not None:
            waypoints = location_to_camera_view(
                self.waypoints, INTRINSIC_MATRIX, inv_extrinsic_matrix
            ).T
            waypoints = np.clip(waypoints, 0, 1_000_000)
            for id, waypoint in enumerate(waypoints):
                if np.isnan(waypoint).any():
                    break

                cv2.circle(
                    resized_image,
                    (int(waypoint[0]), int(waypoint[1])),
                    3,
                    (
                        int(np.clip(255 - waypoint[2] * 100, 0, 255)),
                        int(np.clip(waypoint[2], 0, 255)),
                        255,
                    ),
                    -1,
                )
                if VERBOSE:
                    [x, y, z] = self.waypoints[id]
                    cv2.putText(
                        resized_image,
                        f"x: {x:.2f}, y: {y:.2f}",
                        (int(waypoint[0]), int(waypoint[1])),
                        font,
                        0.5,
                        (
                            int(np.clip(255 - waypoint[2] * 100, 0, 255)),
                            int(np.clip(waypoint[2], 0, 255)),
                            255,
                        ),
                        2,
                        1,
                    )

        ## Drawing gps waypoints on frame
        if inv_extrinsic_matrix is not None:
            gps_waypoints = location_to_camera_view(
                self.gps_waypoints, INTRINSIC_MATRIX, inv_extrinsic_matrix
            ).T

            for waypoint in gps_waypoints:
                if np.isnan(waypoint).any():
                    break
                cv2.circle(
                    resized_image,
                    (int(waypoint[0]), int(waypoint[1])),
                    3,
                    (
                        int(np.clip(255 - waypoint[2] * 100, 0, 255)),
                        int(np.clip(waypoint[2], 0, 255)),
                        122,
                    ),
                    -1,
                )

        ## Drawing lanes on frame
        if inv_extrinsic_matrix is not None:
            lanes = location_to_camera_view(
                self.global_lanes, INTRINSIC_MATRIX, inv_extrinsic_matrix
            ).T

            for lane_dot in lanes:
                if np.isnan(lane_dot).any():
                    break
                cv2.circle(
                    resized_image,
                    (int(lane_dot[0]), int(lane_dot[1])),
                    3,
                    (
                        100,
                        100,
                        100,
                    ),
                    -1,
                )

        ## Draw obstacle dot
        if inv_extrinsic_matrix is not None:
            obstacles = location_to_camera_view(
                self.obstacles, INTRINSIC_MATRIX, inv_extrinsic_matrix
            ).T

            for id, obstacle in enumerate(obstacles):
                [x, y, z] = obstacle
                location = [x, y, z]
                cv2.circle(
                    resized_image,
                    (int(location[0]), int(location[1])),
                    3,
                    (
                        0,
                        200,
                        0,
                    ),
                    -1,
                )

                if VERBOSE:
                    [x, y, z] = self.obstacles[id]
                    cv2.putText(
                        resized_image,
                        f"x: {x:.2f}, y: {y:.2f}",
                        (int(location[0]), int(location[1])),
                        font,
                        0.5,
                        (0, 200, 0),
                        2,
                        1,
                    )

        for point in self.point_cloud:
            cv2.circle(
                resized_image,
                (int(point[0]), int(point[1])),
                3,
                (
                    0,
                    int(max(255 - point[2] * 100, 0)),
                    int(min(point[2] * 10, 255)),
                ),
                -1,
            )

        for obstacle_bb in self.obstacles_bbox:
            [min_x, max_x, min_y, max_y, confidence, label] = obstacle_bb

            start = (int(min_x), int(min_y))
            end = (int(max_x), int(max_y))
            cv2.rectangle(resized_image, start, end, (0, 255, 0), 2)
            if VERBOSE:
                cv2.putText(
                    resized_image,
                    LABELS[label] + f", {confidence}%",
                    (int(min_x), int(max_y)),
                    font,
                    0.5,
                    (0, 255, 0),
                    2,
                    1,
                )

        for obstacle_id in self.obstacles_id:
            [
                min_x,
                max_x,
                min_y,
                max_y,
                track_id,
                confidence,
                label,
            ] = obstacle_id
            start = (int(min_x), int(min_y))
            end = (int(max_x), int(max_y))
            # cv2.rectangle(resized_image, start, end, (0, 255, 0), 2)

            cv2.putText(
                resized_image,
                f"#{track_id}",
                (int(max_x), int(max_y + 20)),
                font,
                0.75,
                (255, 140, 0),
                2,
                1,
            )

        # for lane in self.lanes:
        # cv2.polylines(resized_image, [lane], False, (0, 0, 255), 3)

        for contour in self.drivable_area:
            if len(contour) != 0:
                back = resized_image.copy()
                cv2.drawContours(back, [contour], 0, (0, 255, 0), -1)

                # blend with original image
                alpha = 0.25
                resized_image = cv2.addWeighted(
                    resized_image, 1 - alpha, back, alpha, 0
                )
        if not isinstance(self.position, list):
            [x, y, z, rx, ry, rz, rw] = self.position
            [pitch, roll, yaw] = R.from_quat([rx, ry, rz, rw]).as_euler(
                "xyz", degrees=True
            )

            cv2.putText(
                resized_image,
                f"""cur: x: {x:.2f}, y: {y:.2f}, pitch: {pitch:.2f}, roll: {roll:.2f}, yaw: {yaw:.2f}""",
                (10, 30),
                font,
                fontScale,
                fontColor,
                thickness,
                lineType,
            )

        if len(self.current_speed) != 0:
            cv2.putText(
                resized_image,
                f"""vx: {self.current_speed[0]:.2f}, vy: {self.current_speed[1]:.2f}""",
                (10, 50),
                font,
                fontScale,
                fontColor,
                thickness,
                lineType,
            )

        if len(self.control) != 0:
            cv2.putText(
                resized_image,
                f"""throttle: {self.control[0]:.2f}, brake: {self.control[2]:.2f}, steering: {np.degrees(self.control[1]):.2f} """,
                (10, 70),
                font,
                fontScale,
                fontColor,
                thickness,
                lineType,
            )

        # cv2.putText(
        # resized_image,
        # f"""latency: {(time.time() - self.last_time) * 1000:.2f} ms""",
        # (10, 105),
        # font,
        # fontScale,
        # fontColor,
        # thickness,
        # lineType,
        # )
        writer.write(resized_image)
        resized_image = cv2.resize(resized_image, (800, 600))
        if not NO_DISPLAY:
            cv2.imshow("image", resized_image)
            cv2.waitKey(1)
        self.last_time = time.time()
        ## send_output("plot_status", b"")
        return DoraStatus.CONTINUE


```

</details>




<!---
This file is auto-generated using:
node .scripts/generate-python-operator-doc.js
-->
