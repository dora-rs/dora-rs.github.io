"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[4440],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>g});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),d=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=d(a),m=n,g=c["".concat(p,".").concat(m)]||c[m]||u[m]||o;return a?r.createElement(g,i(i({ref:t},s),{},{components:a})):r.createElement(g,i({ref:t},s))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[c]="string"==typeof e?e:n,i[1]=l;for(var d=2;d<o;d++)i[d]=a[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1559:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var r=a(7462),n=(a(7294),a(3905));const o={},i="Getting started",l={unversionedId:"guides/getting-started/first-dataflow",id:"guides/getting-started/first-dataflow",title:"Getting started",description:"1. Install dora binaries using our installation page",source:"@site/docs/guides/getting-started/first-dataflow.md",sourceDirName:"guides/getting-started",slug:"/guides/getting-started/first-dataflow",permalink:"/docs/guides/getting-started/first-dataflow",draft:!1,editUrl:"https://github.com/dora-rs/dora-rs.github.io/edit/main/docs/guides/getting-started/first-dataflow.md",tags:[],version:"current",frontMatter:{},sidebar:"guides",previous:{title:"Uninstalling",permalink:"/docs/guides/Installation/uninstalling"},next:{title:"Webcam Plot",permalink:"/docs/guides/getting-started/webcam_plot"}},p={},d=[{value:"Video Tutorial",id:"video-tutorial",level:2}],s={toc:d},c="wrapper";function u(e){let{components:t,...a}=e;return(0,n.kt)(c,(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"getting-started"},"Getting started"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Install ",(0,n.kt)("inlineCode",{parentName:"p"},"dora")," binaries using our ",(0,n.kt)("a",{parentName:"p",href:"/docs/guides/Installation/installing"},"installation page"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Create a new dataflow"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"dora new abc_project --lang python\ncd abc_project\n")),(0,n.kt)("p",{parentName:"li"},"This creates the following ",(0,n.kt)("inlineCode",{parentName:"p"},"abc_project")," directory"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},".\n\u251c\u2500\u2500 dataflow.yml\n\u251c\u2500\u2500 node_1\n\u2502   \u2514\u2500\u2500 node_1.py\n\u251c\u2500\u2500 op_1\n\u2502   \u2514\u2500\u2500 op_1.py\n\u2514\u2500\u2500 op_2\n    \u2514\u2500\u2500 op_2.py\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Start ",(0,n.kt)("inlineCode",{parentName:"p"},"dora-coordinator")," and a ",(0,n.kt)("inlineCode",{parentName:"p"},"dora-deamon")),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"dora up \n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Start your dataflow"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"dora start dataflow.yml --name first-dataflow\n# Output: c95d118b-cded-4531-a0e4-cd85b7c3916c\n")),(0,n.kt)("p",{parentName:"li"},"The output is a randomly generated unique ID of the dataflow instance, which can be used to control it through the ",(0,n.kt)("inlineCode",{parentName:"p"},"dora")," CLI. You can use ",(0,n.kt)("inlineCode",{parentName:"p"},"--name ")," option to set a specific name for your dataflow.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"You can check the logs with:"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"dora logs first-dataflow custom-node_1\n")),(0,n.kt)("p",{parentName:"li"},"In this example, the output is going to be:"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n     \u2502 Logs from custom-node_1.\n\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   1 \u2502 Node received:\n   2 \u2502     id: tick,\n   3 \u2502     value: None,\n   4 \u2502     metadata: {'open_telemetry_context': ''}\n   5 \u2502 \n\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Stop your dataflow"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"dora stop --name first-dataflow\n")),(0,n.kt)("p",{parentName:"li"},"(Pass the ID or name returned by ",(0,n.kt)("inlineCode",{parentName:"p"},"dora start")," here.)")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"You can then add or modify operators or nodes. For adding nodes easily, you can use the ",(0,n.kt)("inlineCode",{parentName:"p"},"dora")," CLI again:"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Run ",(0,n.kt)("inlineCode",{parentName:"li"},"dora new --kind operator --lang rust <name>")," to create a new Rust operator named ",(0,n.kt)("inlineCode",{parentName:"li"},"<name>"),"."),(0,n.kt)("li",{parentName:"ul"},"Run ",(0,n.kt)("inlineCode",{parentName:"li"},"dora new --kind custom-node --lang rust <name>")," to create a new custom node named ",(0,n.kt)("inlineCode",{parentName:"li"},"<name>"),".")),(0,n.kt)("p",{parentName:"li"},"You need to add the created operators/nodes to your dataflow YAML file."))),(0,n.kt)("hr",null),(0,n.kt)("h2",{id:"video-tutorial"},"Video Tutorial"),(0,n.kt)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/uOO1NtzI6bA",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,n.kt)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/_QLvFUyDKYc",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}))}u.isMDXComponent=!0}}]);