"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[8814],{89809:(r,e,a)=>{a.r(e),a.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var t=a(74848),n=a(28453);const o={},s=void 0,i={id:"guides/Development/Arrow",title:"Arrow",description:"Arrow",source:"@site/docs/guides/Development/Arrow.md",sourceDirName:"guides/Development",slug:"/guides/Development/Arrow",permalink:"/docs/guides/Development/Arrow",draft:!1,unlisted:!1,editUrl:"https://github.com/dora-rs/dora-rs.github.io/edit/main/docs/guides/Development/Arrow.md",tags:[],version:"current",frontMatter:{},sidebar:"guides",previous:{title:"LLMs",permalink:"/docs/guides/getting-started/llm"},next:{title:"CUDA 0-Copy IPC",permalink:"/docs/guides/Development/Cuda"}},l={},d=[{value:"Arrow",id:"arrow",level:2},{value:"Cheatsheet",id:"cheatsheet",level:3}];function p(r){const e={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,n.R)(),...r.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{id:"arrow",children:"Arrow"}),"\n",(0,t.jsx)(e.p,{children:"dora-rs communicates messages using Apache Arrow data format"}),"\n",(0,t.jsx)(e.p,{children:"When receiving data, the value is of type arrow Array. For Python, you will be able to convert the data as follows:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:'import numpy as np\nimport pandas as pd\nimport pyarrow as pa\n\n## ...\n\narrow_array = dora_event["value"]\nlist = arrow_array.to_pylist()\nnumpy_array = arrow_array.to_numpy() # Zero-Copy Read Only\npandas_series = arrow_array.to_pandas()\n\nsend_output("topic", arrow_array)\n'})}),"\n",(0,t.jsx)("p",{align:"center",children:(0,t.jsx)("img",{src:"/img/arrow.png",width:"80%"})}),"\n",(0,t.jsx)(e.h3,{id:"cheatsheet",children:"Cheatsheet"}),"\n",(0,t.jsx)(e.p,{children:"In Arrow, everything is an array. So even though you might want to only pass a scalar you will have to encapsulate it within a list."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:'import pyarrow as pa\nimport numpy as np\nimport pandas as pd\n# List Message\n\narray = pa.array([1, 2, 3])\nassert array.to_pylist() == [1, 2, 3], "Did not convert to the Same list"\n\n# String Message\narray = pa.array(["Hello World"])\nassert array.to_pylist() == ["Hello World"], "Did not convert to the Same list"\n\n# Dictionary/Struct Message\narray = pa.array([{"a": 1, "b": 2, "c":[1, 2, 3]}])\nassert array.to_pylist() == [{"a": 1, "b": 2, "c":[1, 2, 3]}], "Did not convert to the Same list"\n\n# Numpy Array\narray = np.array([1, 2, 3])\npyarrow_array = pa.array(array)\nassert (pyarrow_array.to_numpy() == array).all(), "Did not convert to the Same list"\n\n# Pandas Series\nd = {\'col1\': [1, 2], \'col2\': [3, 4]}\ndf = pd.DataFrame(data=d)\npyarrow_array = pa.array(df["col1"])\nassert (pyarrow_array.to_pandas() == df["col1"]).all(), "Did not convert to the Same list"\n'})})]})}function c(r={}){const{wrapper:e}={...(0,n.R)(),...r.components};return e?(0,t.jsx)(e,{...r,children:(0,t.jsx)(p,{...r})}):p(r)}},28453:(r,e,a)=>{a.d(e,{R:()=>s,x:()=>i});var t=a(96540);const n={},o=t.createContext(n);function s(r){const e=t.useContext(o);return t.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function i(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(n):r.components||n:s(r.components),t.createElement(o.Provider,{value:e},r.children)}}}]);