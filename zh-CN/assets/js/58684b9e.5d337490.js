"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[1978],{36575:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>t,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var s=r(74848),a=r(28453);const o={sidebar_position:2},t="Carla \u6a21\u62df\u5668",i={id:"guides/dora-drives/carla",title:"Carla \u6a21\u62df\u5668",description:"\u8ba9\u6211\u4eec\u5c1d\u8bd5\u4f7f\u7528\u6c7d\u8f66\u6a21\u62df\u5668\u4e0d\u4ec5\u8fdb\u884c\u611f\u77e5\u8fd8\u53ef\u4ee5\u8fdb\u884c\u63a7\u5236\u3002",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/guides/dora-drives/carla.mdx",sourceDirName:"guides/dora-drives",slug:"/guides/dora-drives/carla",permalink:"/zh-CN/docs/guides/dora-drives/carla",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/dora-rs/zh-CN",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"guides",previous:{title:"\u5b89\u88c5",permalink:"/zh-CN/docs/guides/dora-drives/installation"},next:{title:"\u969c\u788d\u7269\u5b9a\u4f4d",permalink:"/zh-CN/docs/guides/dora-drives/obstacle_location"}},c={},d=[];function l(n){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",pre:"pre",...(0,a.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"carla-\u6a21\u62df\u5668",children:"Carla \u6a21\u62df\u5668"}),"\n",(0,s.jsx)(e.p,{children:"\u8ba9\u6211\u4eec\u5c1d\u8bd5\u4f7f\u7528\u6c7d\u8f66\u6a21\u62df\u5668\u4e0d\u4ec5\u8fdb\u884c\u611f\u77e5\u8fd8\u53ef\u4ee5\u8fdb\u884c\u63a7\u5236\u3002"}),"\n",(0,s.jsxs)(e.p,{children:["\u5728\u672c\u6559\u7a0b\u7684\u5176\u4f59\u90e8\u5206\u4e2d\uff0c\u6211\u4eec\u5c06\u63a5\u53d7\u60a8\u6709\u4e00\u4e2a carla \u6a21\u62df\u5668 \u8fd0\u884c\u5728 ",(0,s.jsx)(e.code,{children:"localhost:2000"})," \u4e0a\uff0c\u8fd9\u662f\u9ed8\u8ba4\u7684 carla \u914d\u7f6e\u3002"]}),"\n",(0,s.jsxs)(e.p,{children:["\u67e5\u770b ",(0,s.jsx)(e.a,{href:"https://carla.readthedocs.io/en/latest/start_quickstart/",children:"Carla \u6a21\u62df\u5668\u5b89\u88c5\u9875\u9762"})]}),"\n",(0,s.jsx)(e.p,{children:"\u6700\u5feb\u7684\u65b9\u5f0f\u662f\u4f7f\u7528docker:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"docker pull carlasim/carla:0.9.13\ndocker run --privileged --gpus all --net=host -e DISPLAY=$DISPLAY carlasim/carla:0.9.13 /bin/bash ./CarlaUE4.sh -carla-server -world-port=2000 -RenderOffScreen\n# \u66f4\u591a\u4fe1\u606f\u5728 https://carla.readthedocs.io/en/latest/build_docker/\n"})}),"\n",(0,s.jsxs)(e.p,{children:["\u4e00\u65e6\u6a21\u62df\u5668\u542f\u52a8\u5e76\u8fd0\u884c\uff0c\u6211\u4eec\u53ef\u4ee5\u5728",(0,s.jsx)(e.a,{href:"/docs/guides/getting-started/yolov8",children:"\u5f00\u59cb"})," \u4e2d\u6dfb\u52a0\u4ee3\u7801\u6765\u68c0\u6d4b\u6211\u4eec\u7684\u884c\u7a0b\u4e2d\u7684\u969c\u788d\u3002\n\u4e3a\u6b64\uff0c\u6211\u4eec\u53ea\u9700\u8981\u66ff\u6362\u53d1\u9001\u56fe\u50cf\u7684\u6444\u5934\u8282\u70b9\u3002 oasis agent \u8fde\u63a5\u5230 carla \u670d\u52a1\u7aef\uff0c\u5e76\u4ece\u8f66\u8f86\u7684\u524d\u7f6e\u6444\u5934\u6355\u83b7\u56fe\u50cf\u3002 \u6211\u4eec\u53ef\u4ee5\u4f7f\u7528\u6444\u5934\u7684\u8fd9\u4e2a instaad agent \u5c06\u56fe\u50cf\u6570\u636e\u53d1\u9001\u5230\u6570\u636e\u6d41\u56fe\u4e2d\u7684\u4e0b\u6e38\u7b97\u5b50\u3002"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"nodes:\n  - id: oasis_agent\n    custom:\n      inputs:\n        tick: dora/timer/millis/400\n      outputs:\n        - position\n        - speed\n        - image\n        - objective_waypoints\n        - lidar_pc\n        - opendrive\n      source: shell\n      # With Carla_source_node\n      args: python3 ../../carla/carla_source_node.py\n      #\n      # Or with the OASIS AGENT\n      #\n      # args: >\n        # python3 $SIMULATE --output \n        # --oasJson --criteriaConfig $CRITERIA\n        # --openscenario $XOSC\n        # --agent $TEAM_AGENT\n        # --agentConfig $TEAM_AGENT_CONF\n        # --destination $DESTINATION\n  \n  - id: yolov5\n    operator: \n      outputs:\n        - bbox\n      inputs:\n        image: oasis_agent/image\n      python: ../../operators/yolov5_op.py\n\n  - id: plot\n    operator:\n      python: ../../operators/plot.py\n      inputs:\n        image: oasis_agent/image\n        obstacles_bbox: yolov5/bbox\n        position: oasis_agent/position\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u81f3\u8fd0\u884c\uff1a"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"dora up\ndora start graphs/oasis/oasis_agent_yolov5.yaml --attach\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u60a8\u5e94\u8be5\u53ef\u4ee5\u770b\u5230\u4e00\u4e2a\u7a97\u53e3\u663e\u793a carla \u6a21\u62df\u5668\u4e2d\u6765\u81ea\u4e00\u4e2a\u6444\u5934\u7684\u89c6\u56fe\u3002 \u5728\u8fd9\u4e2a\u6444\u5934\u6d41\uff0c\u60a8\u5e94\u8be5\u770b\u5230\u5bf9\u8c61\u68c0\u6d4b\u53d1\u751f\u3002"}),"\n",(0,s.jsxs)(e.p,{children:["\u60a8\u53ef\u4ee5\u4f7f\u7528 ",(0,s.jsx)("kbd",{children:"ctrl"}),"+",(0,s.jsx)("kbd",{children:"c"})," \u7ec8\u6b62\u60a8\u8fd0\u884c\u4e2d\u7684\u6570\u636e\u6d41\u3002"]}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("img",{src:"/img/yolov5.png",width:"800"})}),"\n",(0,s.jsxs)(e.blockquote,{children:["\n",(0,s.jsx)(e.p,{children:"\u5b8c\u6210\u7b2c\u4e00\u6b65\u662f\u4e3a\u60a8\u5c55\u793a\u5982\u4f55\u8fde\u63a5 carla \u6a21\u62df\u5668\u4e0e dora\u3002 \u5e76\u65e0\u63d0\u4f9b\u4efb\u610f\u79fb\u52a8\u8f66\u7684\u63a7\u5236\u3002"}),"\n"]})]})}function p(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}},28453:(n,e,r)=>{r.d(e,{R:()=>t,x:()=>i});var s=r(96540);const a={},o=s.createContext(a);function t(n){const e=s.useContext(o);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:t(n.components),s.createElement(o.Provider,{value:e},n.children)}}}]);