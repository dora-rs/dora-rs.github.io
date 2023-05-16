"use strict";(self.webpackChunkdora_rs_github_io=self.webpackChunkdora_rs_github_io||[]).push([[2691],{5262:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>oe,contentTitle:()=>te,default:()=>ce,frontMatter:()=>ee,metadata:()=>ae,toc:()=>se});var o=a(7462),s=a(7294),r=a(3905),n=a(6010),c=a(412),l=a(5999),i=a(6550),d=a(8824),m=a(9960);const u={svgIcon:"svgIcon_R3jO",small:"small_SUAn",medium:"medium_GxVq",large:"large_TyPU",primary:"primary_V8Cc",secondary:"secondary_WyIo",success:"success_lY5U",error:"error_eHdq",warning:"warning_IB04",inherit:"inherit_2ln5"};function p(e){const{svgClass:t,colorAttr:a,children:r,color:c="inherit",size:l="medium",viewBox:i="0 0 24 24",...d}=e;return s.createElement("svg",(0,o.Z)({viewBox:i,color:a,"aria-hidden":!0,className:(0,n.Z)(u.svgIcon,u[c],u[l],t)},d),r)}function h(e){return s.createElement(p,e,s.createElement("path",{d:"M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"}))}function g(e,t){const a=[...e];return a.sort(((e,a)=>t(e)>t(a)?1:t(a)>t(e)?-1:0)),a}const b=JSON.parse('[{"title":"Yolov5 Operator","description":"Yolov5 object detection operator","preview":"/img/agilets.png","website":"yolov5_operator","source":"https://github.com/dora-rs/dora-drives/blob/main/operators/yolov5_op.py","tags":["object_detection","python"]},{"title":"Plot Operator","description":"Plot operator based on cv2","preview":"/img/agilets.png","website":"plot_operator","source":"https://github.com/dora-rs/dora-drives/blob/main/operators/plot.py","tags":["python"]},{"title":"PID Operator","description":"PID controller","preview":"/img/agilets.png","website":"pid_control_operator","source":"https://github.com/dora-rs/dora-drives/blob/main/operators/pid_control_op.py","tags":["python","control"]},{"title":"Obstacle Location Operator","description":"Obstacle location based on LIDAR and 2D bounding boxes","preview":"/img/agilets.png","website":"obstacle_location_operator","source":"https://github.com/dora-rs/dora-drives/blob/main/operators/obstacle_location_op.py","tags":["python"]},{"title":"FOT Operator","description":"Waypoint generation based on current position and frenet optimal trajectory planner.","preview":"/img/agilets.png","website":"obstacle_location_operator","source":"https://github.com/dora-rs/dora-drives/blob/main/carla/fot_op.py","tags":["python"]},{"title":"YOLOP Operator","description":"YOLOP lane and drivable area detection","preview":"/img/agilets.png","website":"yolop_operator","source":"https://github.com/dora-rs/dora-drives/blob/main/operators/yolop_op.py","tags":["object_detection","python"]},{"title":"MiDaS Operator","description":"MiDaS depth estimation","preview":"/img/agilets.png","website":"midas_operator","source":"https://github.com/dora-rs/dora-drives/blob/main/operators/midas_op.py","tags":["depth_estimation","python"]},{"title":"Webcam Operator","description":"Webcam Operator","preview":"/img/agilets.png","website":"webcam_operator","source":"https://github.com/dora-rs/dora-drives/blob/main/operators/webcam_op.py","tags":["python"]}]');var f=a.t(b,2);const w={object_detection:{label:(0,l.I)({id:"showcase.tag.oject-detection.tag",message:"object detection"}),description:(0,l.I)({message:"Open-Source Docusaurus sites can be useful for inspiration!",id:"showcase.tag.oject-detection.description"}),color:"#39ca30"},python:{label:(0,l.I)({id:"showcase.tag.python.tag",message:"Python"}),description:(0,l.I)({message:"Docusaurus sites associated to a commercial product!",id:"showcase.tag.python.description"}),color:"#dfd545"},control:{label:(0,l.I)({id:"showcase.tag.control.tag",message:"Control"}),description:(0,l.I)({message:"Beautiful Docusaurus sites, polished and standing out from the initial template!",id:"showcase.tag.control.description"}),color:"#a44fb7"},depth_estimation:{label:(0,l.I)({id:"showcase.tag.depth-estimation.tag",message:"Depth Esimation"}),description:(0,l.I)({message:"Translated Docusaurus sites using the internationalization support with more than 1 locale.",id:"showcase.tag.depth-estimation.description"}),color:"#127f82"}},E=Object.keys(w),v=f;const _=function(){let e=v.default;return e=g(e,(e=>e.title.toLowerCase())),e=g(e,(e=>!e.tags.includes("favorite"))),e}();var y=a(2503);const L="checkboxLabel_nyuG",C="tags";function k(e){return new URLSearchParams(e).getAll(C)}function N(e,t){let{id:a,icon:r,label:n,tag:c,...l}=e;const d=(0,i.TH)(),m=(0,i.k6)(),[u,p]=(0,s.useState)(!1);(0,s.useEffect)((()=>{const e=k(d.search);p(e.includes(c))}),[c,d]);const h=(0,s.useCallback)((()=>{const e=function(e,t){const a=e.indexOf(t);if(-1===a)return e.concat(t);const o=[...e];return o.splice(a,1),o}(k(d.search),c),t=function(e,t){const a=new URLSearchParams(e);return a.delete(C),t.forEach((e=>a.append(C,e))),a.toString()}(d.search,e);m.push({...d,search:t,state:Y()})}),[c,d,m]);return s.createElement(s.Fragment,null,s.createElement("input",(0,o.Z)({type:"checkbox",id:a,className:"screen-reader-only",onKeyDown:e=>{"Enter"===e.key&&h()},onFocus:e=>{e.relatedTarget&&e.target.nextElementSibling?.dispatchEvent(new KeyboardEvent("focus"))},onBlur:e=>{e.target.nextElementSibling?.dispatchEvent(new KeyboardEvent("blur"))},onChange:h,checked:u},l)),s.createElement("label",{ref:t,htmlFor:a,className:L},n,r))}const x=s.forwardRef(N),I={checkboxLabel:"checkboxLabel_C_EF"},O="operator";function S(e){return new URLSearchParams(e).get(O)??"OR"}function Z(){const e="showcase_filter_toggle",t=(0,i.TH)(),a=(0,i.k6)(),[o,r]=(0,s.useState)(!1);(0,s.useEffect)((()=>{r("AND"===S(t.search))}),[t]);const c=(0,s.useCallback)((()=>{r((e=>!e));const e=new URLSearchParams(t.search);e.delete(O),o||e.append(O,"AND"),a.push({...t,search:e.toString(),state:Y()})}),[o,t,a]);return s.createElement("div",null,s.createElement("input",{type:"checkbox",id:e,className:"screen-reader-only","aria-label":"Toggle between or and and for the tags you selected",onChange:c,onKeyDown:e=>{"Enter"===e.key&&c()},checked:o}),s.createElement("label",{htmlFor:e,className:(0,n.Z)(I.checkboxLabel,"shadow--md")},s.createElement("span",{className:I.checkboxLabelOr},"OR"),s.createElement("span",{className:I.checkboxLabelAnd},"AND")))}var F=a(3935),T=a(5237);const D={tooltip:"tooltip_u6Wa",tooltipArrow:"tooltipArrow_gH7I"};function P(e){let{children:t,id:a,anchorEl:r,text:n}=e;const[c,l]=(0,s.useState)(!1),[i,d]=(0,s.useState)(null),[m,u]=(0,s.useState)(null),[p,h]=(0,s.useState)(null),[g,b]=(0,s.useState)(null),{styles:f,attributes:w}=(0,T.D)(i,m,{modifiers:[{name:"arrow",options:{element:p}},{name:"offset",options:{offset:[0,8]}}]}),E=(0,s.useRef)(null),v=`${a}_tooltip`;return(0,s.useEffect)((()=>{b(r?"string"==typeof r?document.querySelector(r):r:document.body)}),[g,r]),(0,s.useEffect)((()=>{const e=["mouseenter","focus"],t=["mouseleave","blur"],a=()=>{""!==n&&(i?.removeAttribute("title"),E.current=window.setTimeout((()=>{l(!0)}),400))},o=()=>{clearInterval(E.current),l(!1)};return i&&(e.forEach((e=>{i.addEventListener(e,a)})),t.forEach((e=>{i.addEventListener(e,o)}))),()=>{i&&(e.forEach((e=>{i.removeEventListener(e,a)})),t.forEach((e=>{i.removeEventListener(e,o)})))}}),[i,n]),s.createElement(s.Fragment,null,s.cloneElement(t,{ref:d,"aria-describedby":c?v:void 0}),g?F.createPortal(c&&s.createElement("div",(0,o.Z)({id:v,role:"tooltip",ref:u,className:D.tooltip,style:f.popper},w.popper),n,s.createElement("span",{ref:h,className:D.tooltipArrow,style:f.arrow})),g):g)}const R={showcaseCardImage:"showcaseCardImage_ilpR",showcaseCardHeader:"showcaseCardHeader_OEf6",showcaseCardTitle:"showcaseCardTitle_N5BJ",svgIconFavorite:"svgIconFavorite_ndny",showcaseCardSrcBtn:"showcaseCardSrcBtn_cNFV",showcaseCardBody:"showcaseCardBody_o6UT",cardFooter:"cardFooter_Z6cQ",tag:"tag_JW46",textLabel:"textLabel_zE2j",colorLabel:"colorLabel_K1aW"},B=s.forwardRef(((e,t)=>{let{label:a,color:o,description:r}=e;return s.createElement("li",{ref:t,className:R.tag,title:r},s.createElement("span",{className:R.textLabel},a.toLowerCase()),s.createElement("span",{className:R.colorLabel,style:{backgroundColor:o}}))}));function U(e){let{tags:t}=e;const a=g(t.map((e=>({tag:e,...w[e]}))),(e=>E.indexOf(e.tag)));return s.createElement(s.Fragment,null,a.map(((e,t)=>{const a=`showcase_card_tag_${e.tag}`;return s.createElement(P,{key:t,text:e.description,anchorEl:"#__docusaurus",id:a},s.createElement(B,(0,o.Z)({key:t},e)))})))}function H(e){let{user:t}=e;!function(e){e.preview}(t);const a=(o=t.source,new URL(o).pathname.split("/").at(-1)).replace(".py","");var o;return s.createElement("li",{key:t.title,className:"card shadow--md"},s.createElement("div",{className:"card__body"},s.createElement("div",{className:(0,n.Z)(R.showcaseCardHeader)},s.createElement(y.Z,{as:"h4",className:R.showcaseCardTitle},s.createElement(m.Z,{href:a,className:R.showcaseCardLink},t.title)),t.tags.includes("favorite")&&s.createElement(h,{svgClass:R.svgIconFavorite,size:"small"}),t.source&&s.createElement(m.Z,{href:t.source,className:(0,n.Z)("button button--secondary button--sm",R.showcaseCardSrcBtn)},s.createElement(l.Z,{id:"showcase.card.sourceLink"},"source"))),s.createElement("p",{className:R.showcaseCardBody},t.description)),s.createElement("ul",{className:(0,n.Z)("card__footer",R.cardFooter)},s.createElement(U,{tags:t.tags})))}const A=s.memo(H),j={filterCheckbox:"filterCheckbox_q3sb",checkboxList:"checkboxList_OUH8",checkboxListItem:"checkboxListItem_P6Ma",searchContainer:"searchContainer_e2L2",showcaseList:"showcaseList_lJcJ",showcaseFavorite:"showcaseFavorite_iniO",showcaseFavoriteHeader:"showcaseFavoriteHeader_bJ1Y",svgIconFavoriteXs:"svgIconFavoriteXs_BcXG",svgIconFavorite:"svgIconFavorite_wQHr"},M=((0,l.I)({message:"dora-rs nodes and operators"}),(0,l.I)({message:"List of operators already implemented by the community"})),W="https://github.com/dora-rs/dora/discussions";function Y(){if(c.Z.canUseDOM)return{scrollTopPosition:window.scrollY,focusedElementId:document.activeElement?.id}}const J="name";function X(e){return new URLSearchParams(e).get(J)}function z(){const e=(0,i.TH)(),[t,a]=(0,s.useState)("OR"),[o,r]=(0,s.useState)([]),[n,c]=(0,s.useState)(null);return(0,s.useEffect)((()=>{r(k(e.search)),a(S(e.search)),c(X(e.search)),function(e){const{scrollTopPosition:t,focusedElementId:a}=e??{scrollTopPosition:0,focusedElementId:void 0};document.getElementById(a)?.focus(),window.scrollTo({top:t})}(e.state)}),[e]),(0,s.useMemo)((()=>function(e,t,a,o){return o&&(e=e.filter((e=>e.title.toLowerCase().includes(o.toLowerCase())))),0===t.length?e:e.filter((e=>0!==e.tags.length&&("AND"===a?t.every((t=>e.tags.includes(t))):t.some((t=>e.tags.includes(t))))))}(_,o,t,n)),[o,t,n])}function K(){return s.createElement("section",{className:"margin-top--lg margin-bottom--lg text--center"},s.createElement("p",null,M),s.createElement(m.Z,{className:"button button--primary",to:W},s.createElement(l.Z,{id:"showcase.header.button"},"\ud83d\ude4f Please add your Operators or Nodes")))}function q(){const e=z(),t=function(){const{selectMessage:e}=(0,d.c)();return t=>e(t,(0,l.I)({id:"showcase.filters.resultCount",description:'Pluralized label for the number of sites found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"1 site|{sitesCount} sites"},{sitesCount:t}))}();return s.createElement("section",{className:"container margin-top--l margin-bottom--lg"},s.createElement("div",{className:(0,n.Z)("margin-bottom--sm",j.filterCheckbox)},s.createElement("div",null,s.createElement(y.Z,{as:"h2"},s.createElement(l.Z,{id:"showcase.filters.title"},"Filters")),s.createElement("span",null,t(e.length))),s.createElement(Z,null)),s.createElement("ul",{className:(0,n.Z)("clean-list",j.checkboxList)},E.map(((e,t)=>{const{label:a,description:o,color:r}=w[e],n=`showcase_checkbox_id_${e}`;return s.createElement("li",{key:t,className:j.checkboxListItem},s.createElement(P,{id:n,text:o,anchorEl:"#__docusaurus"},s.createElement(x,{tag:e,id:n,label:a,icon:"favorite"===e?s.createElement(h,{svgClass:j.svgIconFavoriteXs}):s.createElement("span",{style:{backgroundColor:r,width:10,height:10,borderRadius:"50%",marginLeft:8}})})))}))))}_.filter((e=>e.tags.includes("favorite")));const G=_.filter((e=>!e.tags.includes("favorite")));function V(){const e=(0,i.k6)(),t=(0,i.TH)(),[a,o]=(0,s.useState)(null);return(0,s.useEffect)((()=>{o(X(t.search))}),[t]),s.createElement("div",{className:j.searchContainer},s.createElement("input",{id:"searchbar",placeholder:(0,l.I)({message:"Search for site name...",id:"showcase.searchBar.placeholder"}),value:a??void 0,onInput:a=>{o(a.currentTarget.value);const s=new URLSearchParams(t.search);s.delete(J),a.currentTarget.value&&s.set(J,a.currentTarget.value),e.push({...t,search:s.toString(),state:Y()}),setTimeout((()=>{document.getElementById("searchbar")?.focus()}),0)}}))}function $(){const e=z();return 0===e.length?s.createElement("section",{className:"margin-top--lg margin-bottom--xl"},s.createElement("div",{className:"container padding-vert--md text--center"},s.createElement(y.Z,{as:"h2"},s.createElement(l.Z,{id:"showcase.usersList.noResult"},"No result")),s.createElement(V,null))):s.createElement("section",{className:"margin-top--lg margin-bottom--xl"},e.length===_.length?s.createElement(s.Fragment,null,s.createElement("div",{className:"container margin-top--lg"},s.createElement(y.Z,{as:"h2",className:j.showcaseHeader},s.createElement(l.Z,{id:"showcase.usersList.allUsers"},"All sites")),s.createElement("ul",{className:(0,n.Z)("clean-list",j.showcaseList)},G.map((e=>s.createElement(A,{key:e.title,user:e})))))):s.createElement("div",{className:"container"},s.createElement("div",{className:(0,n.Z)("margin-bottom--md",j.showcaseFavoriteHeader)},s.createElement(V,null)),s.createElement("ul",{className:(0,n.Z)("clean-list",j.showcaseList)},e.map((e=>s.createElement(A,{key:e.title,user:e}))))))}function Q(){return s.createElement("div",null,s.createElement(K,null),s.createElement(q,null),s.createElement($,null))}const ee={sidebar_position:1},te=void 0,ae={unversionedId:"nodes_operators/search",id:"nodes_operators/search",title:"search",description:"",source:"@site/docs/nodes_operators/search.mdx",sourceDirName:"nodes_operators",slug:"/nodes_operators/search",permalink:"/docs/nodes_operators/search",draft:!1,editUrl:"https://github.com/dora-rs/dora-rs.github.io/edit/main/docs/nodes_operators/search.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"nodes_operators",next:{title:"FOT Operator",permalink:"/docs/nodes_operators/fot_op"}},oe={},se=[],re={toc:se},ne="wrapper";function ce(e){let{components:t,...a}=e;return(0,r.kt)(ne,(0,o.Z)({},re,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(Q,{mdxType:"Showcase"}))}ce.isMDXComponent=!0}}]);