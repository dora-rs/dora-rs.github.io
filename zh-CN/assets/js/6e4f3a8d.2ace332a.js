"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[158],{2859:(n,o,e)=>{e.r(o),e.d(o,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var s=e(74848),t=e(28453);const r={sidebar_position:3},i="\u969c\u788d\u7269\u5b9a\u4f4d",a={id:"guides/dora-drives/obstacle_location",title:"\u969c\u788d\u7269\u5b9a\u4f4d",description:"carla \u6a21\u62df\u5668 \u7ed9\u6211\u4eec\u4e0e\u8bb8\u591a\u66f4\u591a\u4f20\u611f\u5668\u534f\u4f5c\u7684\u53ef\u80fd\uff0c\u4e0d\u4ec5\u662f\u4e00\u4e2a\u6444\u5934\u3002 \u6211\u4eec\u53ef\u4ee5\u6a21\u62dfLIDAR\uff08\u6fc0\u5149\u96f7\u8fbe\uff09\u3001IMU\uff08\u9640\u87ba\u4eea-\u52a0\u901f\u5ea6\u8ba1-\u78c1\u529b\u8ba1\uff09\u3001\u6df1\u5ea6\u4f20\u611f\u5668\u3001\u5206\u5272\u4f20\u611f\u5668......",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/guides/dora-drives/obstacle_location.mdx",sourceDirName:"guides/dora-drives",slug:"/guides/dora-drives/obstacle_location",permalink:"/zh-CN/docs/guides/dora-drives/obstacle_location",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/dora-rs/zh-CN",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"guides",previous:{title:"Carla \u6a21\u62df\u5668",permalink:"/zh-CN/docs/guides/dora-drives/carla"},next:{title:"\u89c4\u5212",permalink:"/zh-CN/docs/guides/dora-drives/planning"}},c={},l=[];function d(n){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.h1,{id:"\u969c\u788d\u7269\u5b9a\u4f4d",children:"\u969c\u788d\u7269\u5b9a\u4f4d"}),"\n",(0,s.jsx)(o.p,{children:"carla \u6a21\u62df\u5668 \u7ed9\u6211\u4eec\u4e0e\u8bb8\u591a\u66f4\u591a\u4f20\u611f\u5668\u534f\u4f5c\u7684\u53ef\u80fd\uff0c\u4e0d\u4ec5\u662f\u4e00\u4e2a\u6444\u5934\u3002 \u6211\u4eec\u53ef\u4ee5\u6a21\u62dfLIDAR\uff08\u6fc0\u5149\u96f7\u8fbe\uff09\u3001IMU\uff08\u9640\u87ba\u4eea-\u52a0\u901f\u5ea6\u8ba1-\u78c1\u529b\u8ba1\uff09\u3001\u6df1\u5ea6\u4f20\u611f\u5668\u3001\u5206\u5272\u4f20\u611f\u5668......"}),"\n",(0,s.jsx)(o.p,{children:"\u8ba9\u6211\u4eec\u4f7f\u7528\u6fc0\u5149\u96f7\u8fbe\u4f20\u611f\u5668\u5b9a\u4f4d\u201cyolov5\u201d\u5b9a\u4f4d\u7684\u969c\u788d\u7269\u7684\u786e\u5207\u4f4d\u7f6e\u3002"}),"\n",(0,s.jsxs)(o.blockquote,{children:["\n",(0,s.jsxs)(o.p,{children:["\u96f7\u8fbe\u70b9\u6570\u636e\u662f\u6570\u636e\u70b9\u96c6\u5408\uff0c\u5f62\u5982",(0,s.jsx)(o.code,{children:"x, y, z, \u5f3a\u5ea6"})," \u7684\u6570\u7ec4 \u3002"]}),"\n",(0,s.jsx)(o.p,{children:"\u5750\u6807\u57fa\u4e8e\u865a\u5e7b\u5f15\u64ce\u5750\u6807\u7cfb\u7edf\uff0c\u5373\uff1a"}),"\n",(0,s.jsxs)(o.ul,{children:["\n",(0,s.jsx)(o.li,{children:"z \u662f\u5411\u4e0a"}),"\n",(0,s.jsx)(o.li,{children:"x \u662f\u5411\u524d"}),"\n",(0,s.jsx)(o.li,{children:"y \u662f\u5411\u53f3"}),"\n"]}),"\n",(0,s.jsxs)(o.p,{children:["\u66f4\u591a\u4fe1\u606f: ",(0,s.jsx)(o.a,{href:"https://www.techarthub.com/a-practical-guide-to-unreal-engine-4s-coordinate-system/",children:"https://www.techarthub.com/a-practical-guide-to-unreal-engine-4s-coordinate-system/"})]}),"\n",(0,s.jsxs)(o.p,{children:["\u4ee5\u53ca carla \u6587\u6863: ",(0,s.jsx)(o.a,{href:"https://carla.readthedocs.io/en/latest/ref_sensors/#lidar-sensor",children:"https://carla.readthedocs.io/en/latest/ref_sensors/#lidar-sensor"})]}),"\n",(0,s.jsxs)(o.p,{children:["\u60a8\u8fd8\u53ef\u4ee5\u67e5\u770b velodyne \u53c2\u8003: ",(0,s.jsx)(o.a,{href:"https://github.com/ros-drivers/velodyne/blob/master/velodyne_pcl/README.md",children:"https://github.com/ros-drivers/velodyne/blob/master/velodyne_pcl/README.md"})]}),"\n"]}),"\n",(0,s.jsxs)(o.p,{children:["\u4e3a\u4e86\u83b7\u5f97\u969c\u788d\u7269\u4f4d\u7f6e\uff0c\u6211\u4eec\u5c06\u8ba1\u7b97\u70b9\u6570\u636e\u4e2d\u7684\u6bcf\u4e2a\u70b9\u7684\u89d2\u5ea6\u3002 \u6211\u4eec\u53ef\u4ee5\u5c06\u8fb9\u754c\u6846\u7684\u6bcf\u4e2a\u50cf\u7d20\u7684\u89d2\u5ea6\u6620\u5c04\u5230\u4e00\u4e2a\u771f\u5b9e\u70b9\uff0c\u4ece\u800c\u63a8\u65ad\u5176\u4f4d\u7f6e\u3002 \u6211\u4eec\u901a\u8fc7\u6dfb\u52a0 LIDAR \u4f20\u611f\u5668\u7684\u5f53\u524d\u4f4d\u7f6e\uff0c\u5c06\u5750\u6807\u4ece\u76f8\u5bf9 lIDAR \u5750\u6807\u7cfb\u8f6c\u6362\u4e3a\u5168\u5c40\u5750\u6807\u7cfb\u3002 \u4ee3\u7801\u5728\u6b64\uff1a ",(0,s.jsx)(o.a,{href:"https://github.com/dora-rs/dora-drives/blob/main/operators/obstacle_location_op.py",children:(0,s.jsx)(o.code,{children:"operators/obstacle_location_op.py"})}),"."]}),"\n",(0,s.jsx)(o.p,{children:"\u8981\u4f7f\u7528\u969c\u788d\u7269\u4f4d\u7f6e\uff0c\u53ea\u9700\u5c06\u5176\u6dfb\u52a0\u5230\u56fe\u4e2d\uff0c\u5e76\u9644\u4e0a\uff1a"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-yaml",children:"nodes:\n  - id: oasis_agent\n    custom:\n      inputs:\n        tick: dora/timer/millis/400\n      outputs:\n        - position\n        - speed\n        - image\n        - objective_waypoints\n        - lidar_pc\n        - opendrive\n      source: shell\n      # With Carla_source_node\n      args: python3 ../../carla/carla_source_node.py\n      #\n      # Or with the OASIS AGENT\n      #\n      # args: >\n        # python3 $SIMULATE --output \n        # --oasJson --criteriaConfig $CRITERIA\n        # --openscenario $XOSC\n        # --agent $TEAM_AGENT\n        # --agentConfig $TEAM_AGENT_CONF\n        # --destination $DESTINATION\n  \n  - id: yolov5\n    operator: \n      outputs:\n        - bbox\n      inputs:\n        image: oasis_agent/image\n      python: ../../operators/yolov5_op.py\n\n  - id: obstacle_location_op\n    operator: \n      outputs:\n        - obstacles\n      inputs:\n        lidar_pc: oasis_agent/lidar_pc\n        obstacles_bbox: yolov5/bbox\n        position: oasis_agent/position\n      python: ../../operators/obstacle_location_op.py\n\n  - id: plot\n    operator:\n      python: ../../operators/plot.py\n      inputs:\n        image: oasis_agent/image\n        obstacles_bbox: yolov5/bbox\n        position: oasis_agent/position\n        obstacles: obstacle_location_op/obstacles\n"})}),"\n",(0,s.jsx)(o.p,{children:"\u81f3\u8fd0\u884c\uff1a"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"dora up\ndora start graphs/oasis/oasis_agent_obstacle_location.yaml --attach\n"})}),"\n",(0,s.jsx)(o.p,{children:"\u60a8\u5e94\u8be5\u80fd\u591f\u5728\u8fb9\u754c\u6846\u4e2d\u770b\u5230\u4e00\u4e2a\u70b9\uff0c\u8868\u793a\u969c\u788d\u7269\u5168\u5c40\u5750\u6807\u4e2d\u7684\u4f30\u8ba1\u4f4d\u7f6e\u3002"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("img",{src:"/img/obstacle_location.png",width:"800"})}),"\n",(0,s.jsxs)(o.blockquote,{children:["\n",(0,s.jsxs)(o.p,{children:["\u66f4\u591a\u4fe1\u606f\u5728 ",(0,s.jsx)(o.code,{children:"obstacle_location"}),"\uff0c\u53bb\u81f3 ",(0,s.jsxs)(o.a,{href:"/docs/nodes_operators/obstacle_location_op",children:["\u6211\u4eec\u7684 ",(0,s.jsx)(o.code,{children:"obstacle_location"})," \u7ec6\u8282\u9875\u9762"]})]}),"\n"]})]})}function p(n={}){const{wrapper:o}={...(0,t.R)(),...n.components};return o?(0,s.jsx)(o,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},28453:(n,o,e)=>{e.d(o,{R:()=>i,x:()=>a});var s=e(96540);const t={},r=s.createContext(t);function i(n){const o=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(o):{...o,...n}}),[o,n])}function a(n){let o;return o=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:i(n.components),s.createElement(r.Provider,{value:o},n.children)}}}]);