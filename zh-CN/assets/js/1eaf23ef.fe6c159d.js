"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[390],{3905:(e,t,o)=>{o.d(t,{Zo:()=>u,kt:()=>y});var r=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var p=r.createContext({}),s=function(e){var t=r.useContext(p),o=t;return e&&(o="function"==typeof e?e(t):l(l({},t),e)),o},u=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=s(o),m=n,y=c["".concat(p,".").concat(m)]||c[m]||d[m]||a;return o?r.createElement(y,l(l({ref:t},u),{},{components:o})):r.createElement(y,l({ref:t},u))}));function y(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,l=new Array(a);l[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:n,l[1]=i;for(var s=2;s<a;s++)l[s]=o[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,o)}m.displayName="MDXCreateElement"},1430:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var r=o(7462),n=(o(7294),o(3905));const a={},l="Yolov5 operator",i={unversionedId:"nodes_operators/yolov5_operator",id:"nodes_operators/yolov5_operator",title:"Yolov5 operator",description:"Yolov5 object detection operator generates bounding boxes on images where it detects object.",source:"@site/docs/nodes_operators/yolov5_operator.md",sourceDirName:"nodes_operators",slug:"/nodes_operators/yolov5_operator",permalink:"/zh-CN/docs/nodes_operators/yolov5_operator",draft:!1,editUrl:"https://crowdin.com/dora-rs/zh-CN",tags:[],version:"current",frontMatter:{},sidebar:"nodes_operators",previous:{title:"Yolop operator",permalink:"/zh-CN/docs/nodes_operators/yolop_operator"}},p={},s=[{value:"Inputs",id:"inputs",level:2},{value:"Outputs",id:"outputs",level:2},{value:"Graph Description",id:"graph-description",level:2},{value:"Graph visualisation",id:"graph-visualisation",level:2}],u={toc:s},c="wrapper";function d(e){let{components:t,...o}=e;return(0,n.kt)(c,(0,r.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"yolov5-operator"},"Yolov5 operator"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Yolov5")," object detection operator generates bounding boxes on images where it detects object. "),(0,n.kt)("p",null,"More info here: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ultralytics/yolov5"},"https://github.com/ultralytics/yolov5")),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Yolov5")," has not been finetuned on the simulation and is directly importing weight from Pytorch Hub."),(0,n.kt)("p",null,"In case you want to run ",(0,n.kt)("inlineCode",{parentName:"p"},"yolov5")," without internet you can clone ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ultralytics/yolov5"},"https://github.com/ultralytics/yolov5")," and download the weights you want to use from ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ultralytics/yolov5/releases/tag/v7.0"},"the release page")," and then specify within the yaml graph the two environments variables:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"YOLOV5_PATH: YOUR/PATH")," "),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"YOLOV5_WEIGHT_PATH: YOUR/WEIGHT/PATH"))),(0,n.kt)("p",null,"You can also choose to allocate the model in GPU using the environment variable:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"PYTORCH_DEVICE: cuda # or cpu"))),(0,n.kt)("p",null,"The image size must be specified in order to work. By default it is 1920x1080xBGR."),(0,n.kt)("h2",{id:"inputs"},"Inputs"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"image as 1920x1080xBGR array.")),(0,n.kt)("h2",{id:"outputs"},"Outputs"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Bounding box coordinates as well as the confidence and class label as output.")),(0,n.kt)("h2",{id:"graph-description"},"Graph Description"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"  - id: yolov5\n    operator: \n      outputs:\n        - bbox\n      inputs:\n        image: agent/image\n      python: ../../operators/yolov5_op.py\n    env:\n      PYTORCH_DEVICE: cuda\n")),(0,n.kt)("h2",{id:"graph-visualisation"},"Graph visualisation"),(0,n.kt)("div",{align:"center"},(0,n.kt)("mermaid",{value:"        flowchart TB\n  agent\nsubgraph yolov5\n  yolov5/op[op]\nend\nsubgraph obstacle_location_op\n  obstacle_location_op/op[op]\nend\n  agent -- image --\x3e yolov5/op\n  yolov5/op -- bbox as obstacles_bbox --\x3e obstacle_location_op/op"})))}d.isMDXComponent=!0}}]);