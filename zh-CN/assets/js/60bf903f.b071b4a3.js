"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[457],{86190:(n,e,o)=>{o.r(e),o.d(e,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>c,metadata:()=>t,toc:()=>s});var r=o(74848),d=o(28453);const c={},i=void 0,t={id:"api/cli",title:"cli",description:"\x3c!---",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/api/cli.md",sourceDirName:"api",slug:"/api/cli",permalink:"/zh-CN/docs/api/cli",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/dora-rs/zh-CN",tags:[],version:"current",frontMatter:{}},l={},s=[{value:"\u6982\u89c8",id:"\u6982\u89c8",level:2},{value:"<code>up</code>",id:"up",level:2},{value:"<code>new</code>",id:"new",level:2},{value:"<code>start</code>",id:"start",level:2},{value:"<code>list</code>",id:"list",level:2},{value:"<code>logs</code>",id:"logs",level:2},{value:"<code>check</code>",id:"check",level:2},{value:"<code>stop</code>",id:"stop",level:2},{value:"<code>destroy</code>",id:"destroy",level:2},{value:"<code>graph</code>",id:"graph",level:2},{value:"<code>--version</code>",id:"--version",level:2}];function a(n){const e={code:"code",h2:"h2",p:"p",pre:"pre",...(0,d.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{id:"\u6982\u89c8",children:"\u6982\u89c8"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"dora-rs cli \u5ba2\u6237\u7aef\n\n\u7528\u6cd5: dora <COMMAND>\n\n\u547d\u4ee4:\n  check        \u68c0\u67e5\u534f\u8c03\u5668\u548c\u5b88\u62a4\u7a0b\u5e8f\u662f\u5426\u6b63\u5728\u8fd0\u884c\n  graph        \u4f7f\u7528 mermaid.js \u751f\u6210\u7ed9\u5b9a\u56fe\u5f62\u7684\u53ef\u89c6\u5316 \u4f7f\u7528 --open \u6253\u5f00\u6d4f\u89c8\u5668\n  build        \u8fd0\u884c\u5728\u7ed9\u5b9a\u6570\u636e\u6d41\u63d0\u4f9b\u7684 build \u547d\u4ee4\n  new          \u751f\u6210\u4e00\u4e2a\u65b0\u9879\u76ee\u6216\u7ed3\u70b9 \u5728 Rust, Python, C \u6216 C++ \u4e4b\u95f4\u9009\u62e9\u8bed\u8a00\n  up       \u5728\u672c\u5730\u6a21\u5f0f\uff08\u9ed8\u8ba4\u914d\u7f6e\uff09\u6d3e\u751f\u4e00\u4e2a\u534f\u8c03\u5668\u548c\u4e00\u4e2a\u5b88\u62a4\u8fdb\u7a0b\u3002\n  destroy  \u9500\u6bc1\u8fd0\u884c\u4e2d\u7684\u534f\u8c03\u5668\u548c\u5b88\u62a4\u8fdb\u7a0b\u3002 \u5982\u679c\u67d0\u4e9b\u6570\u636e\u6d41\u4ecd\u5728\u8fd0\u884c\uff0c\u5219\u5b83\u4eec\u5c06\u9996\u5148\u505c\u6b62\n  start        \u542f\u52a8\u7ed9\u5b9a\u6570\u636e\u6d41\u8def\u5f84 \u4f7f\u7528 --name \u9644\u52a0\u4e00\u4e2a\u540d\u79f0\u81f3\u8fd0\u884c\u4e2d\u7684\u6570\u636e\u6d41\n  stop         \u505c\u6b62\u7ed9\u5b9a\u6570\u636e\u6d41UUID \u5982\u679c\u6ca1\u6709\u63d0\u4f9bID\uff0c\u60a8\u5c06\u5728\u8fd0\u884c\u4e2d\u7684\u6570\u636e\u6d41\u4e4b\u95f4\u9009\u62e9\n  list         \u5217\u8868\u51fa\u8fd0\u884c\u4e2d\u7684\u6570\u636e\u6d41\n  logs         \u663e\u793a\u4e00\u4e2a\u7ed9\u5b9a\u6570\u636e\u6d41\u548c\u8282\u70b9\u65e5\u5fd7\n  daemon       \u8fd0\u884c\u5b88\u62a4\u8fdb\u7a0b\n  runtime      \u8fd0\u884c\u8fd0\u884c\u65f6\n  coordinator  \u8fd0\u884c\u534f\u8c03\u5668\n  help         \u6253\u5370\u672c\u5e2e\u52a9\u4fe1\u606f\u6216\u7ed9\u5b9a\u5b50\u547d\u4ee4\u7684\u5e2e\u52a9\u4fe1\u606f\n\n\u9009\u9879:\n  -h, --help     \u6253\u5370\u5e2e\u52a9\u4fe1\u606f\n  -V, --version  \u6253\u5370\u7248\u672c\u4fe1\u606f\n"})}),"\n",(0,r.jsx)(e.h2,{id:"up",children:(0,r.jsx)(e.code,{children:"up"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u5728\u672c\u5730\u6a21\u5f0f\uff08\u9ed8\u8ba4\u914d\u7f6e\uff09\u751f\u6210\u534f\u8c03\u5668\u548c\u5b88\u62a4\u8fdb\u7a0b\n"})}),"\n",(0,r.jsx)(e.h2,{id:"new",children:(0,r.jsx)(e.code,{children:"new"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u751f\u6210\u4e00\u4e2a\u65b0\u7684\u9879\u76ee\u6216\u7ed3\u70b9\u3002 \u5728 Rust, Python, C \u6216 C++ \u4e4b\u95f4\u9009\u62e9\u8bed\u8a00\n\n\u7528\u6cd5: dora new [\u9009\u9879] <NAME> [\u8def\u5f84]\n\n\u53c2\u6570:\n  <NAME>  \n  [\u8def\u5f84]  \n\n\u9009\u9879:\n      --kind <KIND>  \u5df2\u521b\u5efa\u5b9e\u4f53 [\u9ed8\u8ba4: dataflow] [\u53ef\u80fd\u7684\u9009\u9879: dataflow, operator, custom-node]\n      --lang <LANG>  \u5df2\u4f7f\u7528\u7f16\u7a0b\u8bed\u8a00 [\u9ed8\u8ba4: rust] [\u53ef\u80fd\u7684\u9009\u9879: rust, python, c, cxx]\n  -h, --help         \u6253\u5370\u5e2e\u52a9\u4fe1\u606f\n"})}),"\n",(0,r.jsx)(e.h2,{id:"start",children:(0,r.jsx)(e.code,{children:"start"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u4ece\u7ed9\u5b9a\u6570\u636e\u6d41\u8def\u5f84\u542f\u52a8\u3002 \u4f7f\u7528 --name \u9644\u52a0\u4e00\u4e2a\u540d\u79f0\u81f3\u8fd0\u884c\u4e2d\u7684\u6570\u636e\u6d41\n\n\u7528\u6cd5: dora start [\u9009\u9879] <PATH>\n\n\u53c2\u6570:\n  <PATH>  \u6570\u636e\u6d41\u63cf\u8ff0\u7b26\u6587\u4ef6\u7684\u8def\u5f84\n\n\u9009\u9879:\n      --name <NAME>              \u5206\u914d\u4e00\u4e2a\u540d\u79f0\u81f3\u6570\u636e\u6d41\n      --coordinator-addr <IP>    dora \u534f\u8c03\u5668\u7684\u5730\u5740 [\u9ed8\u8ba4: 127.0.0.1]\n      --coordinator-port <PORT>  \u534f\u8c03\u5668\u63a7\u5236\u670d\u52a1\u7684\u7aef\u53e3\u53f7 [\u9ed8\u8ba4: 6012]\n      --attach                   \u9644\u52a0\u81f3\u6570\u636e\u6d41\u5e76\u7b49\u5f85\u5176\u5b8c\u6210\n      --hot-reload            \u542f\u7528\u70ed\u91cd\u8f7d (\u4ec5 Python)\n  -h, --help                     \u6253\u5370\u5e2e\u52a9\u4fe1\u606f\n"})}),"\n",(0,r.jsx)(e.h2,{id:"list",children:(0,r.jsx)(e.code,{children:"list"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u5217\u51fa\u6b63\u5728\u8fd0\u884c\u7684\u6570\u636e\u6d41\n\n\u7528\u6cd5\uff1adora list [\u9009\u9879]\n\n\u9009\u9879\uff1a\n      --coordinator-addr <IP>    dora \u534f\u8c03\u5668\u7684\u5730\u5740 [\u9ed8\u8ba4: 127.0.0.1]\n      --coordinator-\u7aef\u53e3 <PORT>  \u534f\u8c03\u5668\u63a7\u5236\u670d\u52a1\u7684\u7aef\u53e3\u53f7[\u9ed8\u8ba4\uff1a6012]\n  - h, --help \u6253\u5370\u5e2e\u52a9\n"})}),"\n",(0,r.jsx)(e.h2,{id:"logs",children:(0,r.jsx)(e.code,{children:"logs"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u663e\u793a\u4e00\u4e2a\u7ed9\u5b9a\u6570\u636e\u6d41\u548c\u7ed3\u70b9\u7684\u65e5\u5fd7\n\n\u7528\u6cd5: dora logs [\u9009\u9879] [UUID \u6216 \u540d\u79f0] <NAME>\n\n\u53c2\u6570:\n  [UUID \u6216 \u540d\u79f0]  \u6570\u636e\u6d41\u7684\u6807\u8bc6\u7b26\n  <NAME>          \u663e\u793a\u7ed9\u5b9a\u7ed3\u70b9\u7684\u65e5\u5fd7\n\n\u9009\u9879:\n      --coordinator-addr <IP>    dora \u534f\u8c03\u5668\u7684\u5730\u5740 [\u9ed8\u8ba4: 127.0.0.1]\n      --coordinator-port <PORT>  \u534f\u8c03\u5668\u63a7\u5236\u670d\u52a1\u7684\u7aef\u53e3\u53f7 [\u9ed8\u8ba4: 6012]\n  -h, --help                     \u6253\u5370\u5e2e\u52a9\u4fe1\u606f\n"})}),"\n",(0,r.jsx)(e.h2,{id:"check",children:(0,r.jsx)(e.code,{children:"check"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u68c0\u67e5\u534f\u8c03\u5668\u548c\u5b88\u62a4\u8fdb\u7a0b\u662f\u5426\u8fd0\u884c\n\n\u7528\u6cd5\uff1adora \u68c0\u67e5 [OPTIONS]\n\n\u9009\u9879\uff1a\n      --dataflow <PATH>          \u5230 data flow \u63cf\u8ff0\u6587\u4ef6\u7684\u8def\u5f84(\u542f\u7528\u989d\u5916\u68c0\u67e5)\n      --coordinator-addr <IP>    dora coordinator [\u9ed8\u8ba4: 127.0.0.1]\n      --coordinator-\u7aef\u53e3 <PORT>  \u534f\u8c03\u5668\u63a7\u5236\u670d\u52a1\u7684\u7aef\u53e3\u53f7[\u9ed8\u8ba4: 6012]\n  - h, --help \u6253\u5370\u5e2e\u52a9\n"})}),"\n",(0,r.jsx)(e.h2,{id:"stop",children:(0,r.jsx)(e.code,{children:"stop"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u505c\u6b62\u7ed9\u5b9aUUID\u7684\u6570\u636e\u6d41\u3002 \u5982\u679c\u6ca1\u6709\u5df2\u63d0\u4f9b\u7684ID\uff0c \u60a8\u5c06\u53ef\u4ee5\u5728\u5df2\u8fd0\u884c\u7684\u6570\u636e\u6d41\u4e2d\u8fdb\u884c\u9009\u62e9\n\n\u7528\u6cd5: dora stop [\u9009\u9879] [UUID]\n\n\u53c2\u6570:\n  [UUID]  \u5c06\u88ab\u505c\u6b62\u6570\u636e\u6d41\u7684UUID\n\n\u9009\u9879:\n      --name <NAME>                \u5c06\u88ab\u505c\u6b62\u7684\u6570\u636e\u6d41\u540d\u79f0\n      --grace-duration <DURATION>  \u5728\u7ed9\u5b9a\u7684\u6301\u7eed\u65f6\u95f4\u4e4b\u540e\u6570\u636e\u6d41\u8fd8\u6ca1\u6709\u505c\u6b62\uff0c\u5c06\u88ab\u6740\u6389\n      --coordinator-addr <IP>      dora \u534f\u8c03\u5668 \u7684\u5730\u5740 [\u9ed8\u8ba4: 127.0.0.1]\n      --coordinator-port <PORT>    \u534f\u8c03\u5668\u63a7\u5236\u670d\u52a1\u7684\u7aef\u53e3\u53f7 [\u9ed8\u8ba4: 6012]\n  -h, --help                       \u6253\u5370\u5e2e\u52a9\u4fe1\u606f\n"})}),"\n",(0,r.jsx)(e.h2,{id:"destroy",children:(0,r.jsx)(e.code,{children:"destroy"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u9500\u6bc1\u8fd0\u884c\u4e2d\u7684\u534f\u8c03\u5668\u548c\u5b88\u62a4\u8fdb\u7a0b\u3002 \u5982\u679c\u4e00\u4e9b\u6570\u636e\u6d41\u8fd8\u5728\u8fd0\u884c\uff0c\u4ed6\u4eec\u5c06\u9996\u5148\u88ab\u505c\u6b62\n\n\u7528\u6cd5: dora destroy [\u9009\u9879]\n\n\u9009\u9879:\n      --coordinator-addr <IP>    dora \u534f\u8c03\u5668\u7684\u5730\u5740 [\u9ed8\u8ba4: 127.0.0.1]\n      --coordinator-port <PORT>  \u534f\u8c03\u5668\u63a7\u5236\u670d\u52a1\u7684\u7aef\u53e3\u53f7 [\u9ed8\u8ba4: 6012]\n  -h, --help                     \u6253\u5370\u5e2e\u52a9\u4fe1\u606f\n"})}),"\n",(0,r.jsx)(e.h2,{id:"graph",children:(0,r.jsx)(e.code,{children:"graph"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u5bf9\u7ed9\u5b9a\u56fe\u4f7f\u7528 mermaid.js \u751f\u6210\u53ef\u89c6\u5316\u3002 \u4f7f\u7528 --open \u6253\u5f00\u6d4f\u89c8\u5668\n\n\u7528\u6cd5: dora graph [\u9009\u9879] <PATH>\n\n\u53c2\u6570:\n  <PATH>  \u6570\u636e\u6d41\u63cf\u8ff0\u6587\u4ef6\u7684\u8def\u5f84\n\n\u9009\u9879:\n      --mermaid  \u53ef\u89c6\u5316\u6570\u636e\u6d41\u505a\u4e3a\u4e00\u4e2a Mermaid\u56fe (\u800c\u4e0d\u662f HTML)\n      --open    \u5728\u6d4f\u89c8\u5668\u4e2d\u6253\u5f00\u53ef\u89c6\u5316\u7684HTML\n  -h, --help     \u6253\u5370\u5e2e\u52a9\u4fe1\u606f\n"})}),"\n",(0,r.jsx)(e.h2,{id:"--version",children:(0,r.jsx)(e.code,{children:"--version"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u8fd4\u56de dora \u7684\u5f53\u524d\u7248\u672c\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u8fd9\u4e2a\u547d\u4ee4\u5c06\u663e\u793a dora \u7684\u5f53\u524d\u7248\u672c\u3002"})]})}function h(n={}){const{wrapper:e}={...(0,d.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}},28453:(n,e,o)=>{o.d(e,{R:()=>i,x:()=>t});var r=o(96540);const d={},c=r.createContext(d);function i(n){const e=r.useContext(c);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function t(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:i(n.components),r.createElement(c.Provider,{value:e},n.children)}}}]);