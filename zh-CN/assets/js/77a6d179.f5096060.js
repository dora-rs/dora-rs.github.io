"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[173],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),d=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=d(e.components);return o.createElement(l.Provider,{value:t},e.children)},s="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),s=d(n),m=r,h=s["".concat(l,".").concat(m)]||s[m]||c[m]||a;return n?o.createElement(h,p(p({ref:t},u),{},{components:n})):o.createElement(h,p({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,p=new Array(a);p[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[s]="string"==typeof e?e:r,p[1]=i;for(var d=2;d<a;d++)p[d]=n[d];return o.createElement.apply(null,p)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4753:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>c,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var o=n(7462),r=(n(7294),n(3905));const a={},p="Python API",i={unversionedId:"api/python-api",id:"api/python-api",title:"Python API",description:"\x3c!---",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/api/python-api.md",sourceDirName:"api",slug:"/api/python-api",permalink:"/zh-CN/docs/api/python-api",draft:!1,editUrl:"https://crowdin.com/dora-rs/zh-CN",tags:[],version:"current",frontMatter:{}},l={},d=[{value:"Operator",id:"operator",level:2},{value:"Custom Node",id:"custom-node",level:2},{value:"<code>Node()</code>",id:"node",level:3},{value:"<code>.next()</code>",id:"next",level:3},{value:"<code>.send_output(output_id, data, metadata)</code>",id:"send_outputoutput_id-data-metadata",level:3},{value:"<code>.__version__</code>",id:"__version__",level:3}],u={toc:d},s="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(s,(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"python-api"},"Python API"),(0,r.kt)("h2",{id:"operator"},"Operator"),(0,r.kt)("p",null,"The operator API is a framework for you to implement. The implemented operator will be managed by ",(0,r.kt)("inlineCode",{parentName:"p"},"dora"),". This framework enable us to make optimisation and provide advanced features. It is the recommended way of using ",(0,r.kt)("inlineCode",{parentName:"p"},"dora"),"."),(0,r.kt)("p",null,"An operator requires an ",(0,r.kt)("inlineCode",{parentName:"p"},"on_event")," method and requires to return a ",(0,r.kt)("inlineCode",{parentName:"p"},"DoraStatus")," , depending of it needs to continue or stop."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"{{#include ../../examples/python-operator-dataflow/object_detection.py:0:25}}\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"For Python, we recommend to allocate the operator on a single runtime. A runtime will share the same GIL with several operators making those operators run almost sequentially. See: ",(0,r.kt)("a",{parentName:"p",href:"https://docs.rs/pyo3/latest/pyo3/marker/struct.Python.html#deadlocks"},"https://docs.rs/pyo3/latest/pyo3/marker/struct.Python.html#deadlocks"))),(0,r.kt)("h2",{id:"custom-node"},"Custom Node"),(0,r.kt)("h3",{id:"node"},(0,r.kt)("inlineCode",{parentName:"h3"},"Node()")),(0,r.kt)("p",null,"The custom node API lets you integrate ",(0,r.kt)("inlineCode",{parentName:"p"},"dora")," into your application. It allows you to retrieve input and send output in any fashion you want."),(0,r.kt)("p",null,"Use with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"from dora import Node\n\nnode = Node()\n")),(0,r.kt)("h3",{id:"next"},(0,r.kt)("inlineCode",{parentName:"h3"},".next()")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},".next()")," gives you the next input that the node has received. It blocks until the next input becomes available. It will return ",(0,r.kt)("inlineCode",{parentName:"p"},"None")," when all senders has been dropped."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"input_id, value, metadata = node.next()\n")),(0,r.kt)("p",null,"You can also iterate over the node in a loop"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"for input_id, value, metadata in node:\n")),(0,r.kt)("h3",{id:"send_outputoutput_id-data-metadata"},(0,r.kt)("inlineCode",{parentName:"h3"},".send_output(output_id, data, metadata)")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"send_output")," send data from the node."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"Args:\n   output_id: str,\n   data: Bytes|Arrow,\n   metadata: Option[Dict],\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'node.send_output("string", b"string", {"open_telemetry_context": "7632e76"})\n')),(0,r.kt)("h3",{id:"__version__"},(0,r.kt)("inlineCode",{parentName:"h3"},".__version__")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Returns the current version of dora python API.\n")),(0,r.kt)("p",null,"This command will show the current version of cora."))}c.isMDXComponent=!0}}]);