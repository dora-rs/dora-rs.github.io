"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[1922],{30975:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>c,frontMatter:()=>a,metadata:()=>r,toc:()=>p});var t=i(74848),o=i(28453);const a={},s="Plot operator",r={id:"nodes_operators/plot",title:"Plot operator",description:"Plot operator takes outputs from the graph and plot it on the camera frame.",source:"@site/docs/nodes_operators/plot.md",sourceDirName:"nodes_operators",slug:"/nodes_operators/plot",permalink:"/docs/nodes_operators/plot",draft:!1,unlisted:!1,editUrl:"https://github.com/dora-rs/dora-rs.github.io/edit/main/docs/nodes_operators/plot.md",tags:[],version:"current",frontMatter:{}},l={},p=[{value:"Methods",id:"methods",level:2},{value:"<code>__init__()</code>",id:"__init__",level:3},{value:"<code>.on_event(...)</code>",id:"on_event",level:3},{value:"<code>.on_input(...)</code>",id:"on_input",level:3}];function _(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,o.R)(),...n.components},{Details:i}=e;return i||function(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"plot-operator",children:"Plot operator"}),"\n",(0,t.jsx)(e.p,{children:"Plot operator takes outputs from the graph and plot it on the camera frame."}),"\n",(0,t.jsx)(e.h2,{id:"methods",children:"Methods"}),"\n",(0,t.jsx)(e.h3,{id:"__init__",children:(0,t.jsx)(e.code,{children:"__init__()"})}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:"Source Code"}),(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:"    def __init__(self):\n        self.waypoints = []\n        self.gps_waypoints = []\n        self.obstacles = []\n        self.raw_obstacles = []\n        self.obstacles_bbox = []\n        self.obstacles_id = []\n        self.lanes = []\n        self.global_lanes = []\n        self.drivable_area = []\n        self.last_timestamp = time.time()\n        self.position = []\n        self.last_position = []\n        self.camera_frame = []\n        self.traffic_sign_bbox = []\n        self.point_cloud = np.array([])\n        self.control = []\n        self.last_time = time.time()\n        self.current_speed = []\n\n\n"})})]}),"\n",(0,t.jsx)(e.h3,{id:"on_event",children:(0,t.jsx)(e.code,{children:".on_event(...)"})}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:"Source Code"}),(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:'\n    def on_event(\n        self,\n        dora_event: dict,\n        send_output: Callable[[str, bytes], None],\n    ) -> DoraStatus:\n        if dora_event["type"] == "INPUT":\n            return self.on_input(dora_event, send_output)\n        return DoraStatus.CONTINUE\n\n\n'})})]}),"\n",(0,t.jsx)(e.h3,{id:"on_input",children:(0,t.jsx)(e.code,{children:".on_input(...)"})}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:"Source Code"}),(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:'\n    def on_input(\n        self,\n        dora_input: dict,\n        send_output: Callable[[str, bytes], None],\n    ):\n        if "waypoints" == dora_input["id"]:\n            waypoints = np.array(dora_input["value"])\n            waypoints = waypoints.reshape((-1, 3))\n            waypoints = waypoints[:, :2]\n            # Adding z axis for plot\n            waypoints = np.hstack((waypoints, -0.5 + np.zeros((waypoints.shape[0], 1))))\n            self.waypoints = waypoints\n\n        elif "gps_waypoints" == dora_input["id"]:\n            gps_waypoints = np.array(dora_input["value"])\n            gps_waypoints = gps_waypoints.reshape((-1, 3))\n            gps_waypoints = gps_waypoints[:, :2]\n            # Adding z axis for plot\n            gps_waypoints = np.hstack(\n                (gps_waypoints, -0.5 + np.zeros((gps_waypoints.shape[0], 1)))\n            )\n            self.gps_waypoints = gps_waypoints\n\n        elif "control" == dora_input["id"]:\n            self.control = np.array(dora_input["value"])\n\n        elif "obstacles_bbox" == dora_input["id"]:\n            self.obstacles_bbox = dora_input["value"].to_numpy().reshape((-1, 6))\n\n        elif "traffic_sign_bbox" == dora_input["id"]:\n            self.traffic_sign_bbox = np.array(dora_input["value"]).reshape((-1, 6))\n\n        elif "obstacles_id" == dora_input["id"]:\n            self.obstacles_id = np.array(dora_input["value"]).reshape((-1, 7))\n\n        elif "obstacles" == dora_input["id"]:\n            obstacles = np.array(dora_input["value"]).reshape((-1, 5))[:, :3]\n            self.obstacles = obstacles\n\n        elif "lanes" == dora_input["id"]:\n            lanes = np.array(dora_input["value"]).reshape((-1, 30, 2))\n            self.lanes = lanes\n\n        elif "global_lanes" == dora_input["id"]:\n            global_lanes = np.array(dora_input["value"]).reshape((-1, 3))\n            self.global_lanes = global_lanes\n\n        elif "drivable_area" == dora_input["id"]:\n            drivable_area = np.array(dora_input["value"]).reshape((1, -1, 2))\n            self.drivable_area = drivable_area\n\n        elif "position" == dora_input["id"]:\n            # Add sensor transform\n\n            self.last_position = self.position\n            self.position = np.array(dora_input["value"])\n            if len(self.last_position) == 0:\n                return DoraStatus.CONTINUE\n\n            self.current_speed = (self.position[:2] - self.last_position[:2]) * 20\n\n        elif "lidar_pc" == dora_input["id"]:\n            point_cloud = np.array(dora_input["value"])\n            point_cloud = point_cloud.reshape((-1, 3))\n            # To camera coordinate\n            # The latest coordinate space is the unreal space.\n            point_cloud = np.dot(\n                point_cloud,\n                VELODYNE_MATRIX,\n            )\n            point_cloud = point_cloud[np.where(point_cloud[:, 2] > 0.1)]\n            point_cloud = local_points_to_camera_view(point_cloud, INTRINSIC_MATRIX)\n\n            if len(point_cloud) != 0:\n                self.point_cloud = point_cloud.T\n\n        elif "image" == dora_input["id"]:\n            self.camera_frame = (\n                dora_input["value"]\n                .to_numpy()\n                .copy()\n                .reshape((CAMERA_HEIGHT, CAMERA_WIDTH, 4))\n            )\n\n        if "image" != dora_input["id"] or isinstance(self.camera_frame, list):\n            return DoraStatus.CONTINUE\n\n        if len(self.position) != 0:\n            inv_extrinsic_matrix = np.linalg.inv(\n                get_extrinsic_matrix(get_projection_matrix(self.position))\n            )\n        else:\n            inv_extrinsic_matrix = None\n            # print("no position messages.")\n\n        resized_image = self.camera_frame[:, :, :3]\n        resized_image = np.ascontiguousarray(resized_image, np.uint8)\n\n        ## Drawing waypoints on frame\n        if inv_extrinsic_matrix is not None:\n            waypoints = location_to_camera_view(\n                self.waypoints, INTRINSIC_MATRIX, inv_extrinsic_matrix\n            ).T\n            waypoints = np.clip(waypoints, 0, 1_000_000)\n            for id, waypoint in enumerate(waypoints):\n                if np.isnan(waypoint).any():\n                    break\n\n                cv2.circle(\n                    resized_image,\n                    (int(waypoint[0]), int(waypoint[1])),\n                    3,\n                    (\n                        int(np.clip(255 - waypoint[2] * 100, 0, 255)),\n                        int(np.clip(waypoint[2], 0, 255)),\n                        255,\n                    ),\n                    -1,\n                )\n                if VERBOSE:\n                    [x, y, z] = self.waypoints[id]\n                    cv2.putText(\n                        resized_image,\n                        f"x: {x:.2f}, y: {y:.2f}",\n                        (int(waypoint[0]), int(waypoint[1])),\n                        font,\n                        0.5,\n                        (\n                            int(np.clip(255 - waypoint[2] * 100, 0, 255)),\n                            int(np.clip(waypoint[2], 0, 255)),\n                            255,\n                        ),\n                        2,\n                        1,\n                    )\n\n        ## Drawing gps waypoints on frame\n        if inv_extrinsic_matrix is not None:\n            gps_waypoints = location_to_camera_view(\n                self.gps_waypoints, INTRINSIC_MATRIX, inv_extrinsic_matrix\n            ).T\n\n            for waypoint in gps_waypoints:\n                if np.isnan(waypoint).any():\n                    break\n                cv2.circle(\n                    resized_image,\n                    (int(waypoint[0]), int(waypoint[1])),\n                    3,\n                    (\n                        int(np.clip(255 - waypoint[2] * 100, 0, 255)),\n                        int(np.clip(waypoint[2], 0, 255)),\n                        122,\n                    ),\n                    -1,\n                )\n\n        ## Drawing lanes on frame\n        if inv_extrinsic_matrix is not None:\n            lanes = location_to_camera_view(\n                self.global_lanes, INTRINSIC_MATRIX, inv_extrinsic_matrix\n            ).T\n\n            for lane_dot in lanes:\n                if np.isnan(lane_dot).any():\n                    break\n                cv2.circle(\n                    resized_image,\n                    (int(lane_dot[0]), int(lane_dot[1])),\n                    3,\n                    (\n                        100,\n                        100,\n                        100,\n                    ),\n                    -1,\n                )\n\n        ## Draw obstacle dot\n        if inv_extrinsic_matrix is not None:\n            obstacles = location_to_camera_view(\n                self.obstacles, INTRINSIC_MATRIX, inv_extrinsic_matrix\n            ).T\n\n            for id, obstacle in enumerate(obstacles):\n                [x, y, z] = obstacle\n                location = [x, y, z]\n                cv2.circle(\n                    resized_image,\n                    (int(location[0]), int(location[1])),\n                    3,\n                    (\n                        0,\n                        200,\n                        0,\n                    ),\n                    -1,\n                )\n\n                if VERBOSE:\n                    [x, y, z] = self.obstacles[id]\n                    cv2.putText(\n                        resized_image,\n                        f"x: {x:.2f}, y: {y:.2f}",\n                        (int(location[0]), int(location[1])),\n                        font,\n                        0.5,\n                        (0, 200, 0),\n                        2,\n                        1,\n                    )\n\n        for point in self.point_cloud:\n            cv2.circle(\n                resized_image,\n                (int(point[0]), int(point[1])),\n                3,\n                (\n                    0,\n                    int(max(255 - point[2] * 100, 0)),\n                    int(min(point[2] * 10, 255)),\n                ),\n                -1,\n            )\n\n        for obstacle_bb in self.obstacles_bbox:\n            [min_x, max_x, min_y, max_y, confidence, label] = obstacle_bb\n\n            start = (int(min_x), int(min_y))\n            end = (int(max_x), int(max_y))\n            cv2.rectangle(resized_image, start, end, (0, 255, 0), 2)\n            if VERBOSE:\n                cv2.putText(\n                    resized_image,\n                    LABELS[label] + f", {confidence}%",\n                    (int(min_x), int(max_y)),\n                    font,\n                    0.5,\n                    (0, 255, 0),\n                    2,\n                    1,\n                )\n\n        for obstacle_id in self.obstacles_id:\n            [\n                min_x,\n                max_x,\n                min_y,\n                max_y,\n                track_id,\n                confidence,\n                label,\n            ] = obstacle_id\n            start = (int(min_x), int(min_y))\n            end = (int(max_x), int(max_y))\n            # cv2.rectangle(resized_image, start, end, (0, 255, 0), 2)\n\n            cv2.putText(\n                resized_image,\n                f"#{track_id}",\n                (int(max_x), int(max_y + 20)),\n                font,\n                0.75,\n                (255, 140, 0),\n                2,\n                1,\n            )\n\n        # for lane in self.lanes:\n        # cv2.polylines(resized_image, [lane], False, (0, 0, 255), 3)\n\n        for contour in self.drivable_area:\n            if len(contour) != 0:\n                back = resized_image.copy()\n                cv2.drawContours(back, [contour], 0, (0, 255, 0), -1)\n\n                # blend with original image\n                alpha = 0.25\n                resized_image = cv2.addWeighted(\n                    resized_image, 1 - alpha, back, alpha, 0\n                )\n        if not isinstance(self.position, list):\n            [x, y, z, rx, ry, rz, rw] = self.position\n            [pitch, roll, yaw] = R.from_quat([rx, ry, rz, rw]).as_euler(\n                "xyz", degrees=True\n            )\n\n            cv2.putText(\n                resized_image,\n                f"""cur: x: {x:.2f}, y: {y:.2f}, pitch: {pitch:.2f}, roll: {roll:.2f}, yaw: {yaw:.2f}""",\n                (10, 30),\n                font,\n                fontScale,\n                fontColor,\n                thickness,\n                lineType,\n            )\n\n        if len(self.current_speed) != 0:\n            cv2.putText(\n                resized_image,\n                f"""vx: {self.current_speed[0]:.2f}, vy: {self.current_speed[1]:.2f}""",\n                (10, 50),\n                font,\n                fontScale,\n                fontColor,\n                thickness,\n                lineType,\n            )\n\n        if len(self.control) != 0:\n            cv2.putText(\n                resized_image,\n                f"""throttle: {self.control[0]:.2f}, brake: {self.control[2]:.2f}, steering: {np.degrees(self.control[1]):.2f} """,\n                (10, 70),\n                font,\n                fontScale,\n                fontColor,\n                thickness,\n                lineType,\n            )\n\n        # cv2.putText(\n        # resized_image,\n        # f"""latency: {(time.time() - self.last_time) * 1000:.2f} ms""",\n        # (10, 105),\n        # font,\n        # fontScale,\n        # fontColor,\n        # thickness,\n        # lineType,\n        # )\n        writer.write(resized_image)\n        resized_image = cv2.resize(resized_image, (800, 600))\n        if not NO_DISPLAY:\n            cv2.imshow("image", resized_image)\n            cv2.waitKey(1)\n        self.last_time = time.time()\n        ## send_output("plot_status", b"")\n        return DoraStatus.CONTINUE\n\n\n'})})]})]})}function c(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(_,{...n})}):_(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>s,x:()=>r});var t=i(96540);const o={},a=t.createContext(o);function s(n){const e=t.useContext(a);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:s(n.components),t.createElement(a.Provider,{value:e},n.children)}}}]);