(function(T,b){typeof exports=="object"&&typeof module<"u"?b(exports,require("picmo")):typeof define=="function"&&define.amd?define(["exports","picmo"],b):(T=typeof globalThis<"u"?globalThis:T||self,b(T.picmoPopup={},T.picmo))})(this,function(T,b){"use strict";function D(t){return t.split("-")[0]}function M(t){return t.split("-")[1]}function H(t){return["top","bottom"].includes(D(t))?"x":"y"}function et(t){return t==="y"?"height":"width"}function nt(t,e,n){let{reference:i,floating:o}=t;const c=i.x+i.width/2-o.width/2,r=i.y+i.height/2-o.height/2,s=H(e),l=et(s),a=i[l]/2-o[l]/2,d=D(e),f=s==="x";let u;switch(d){case"top":u={x:c,y:i.y-o.height};break;case"bottom":u={x:c,y:i.y+i.height};break;case"right":u={x:i.x+i.width,y:r};break;case"left":u={x:i.x-o.width,y:r};break;default:u={x:i.x,y:i.y}}switch(M(e)){case"start":u[s]-=a*(n&&f?-1:1);break;case"end":u[s]+=a*(n&&f?-1:1);break}return u}const xt=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:c=[],platform:r}=n,s=await(r.isRTL==null?void 0:r.isRTL(e));let l=await r.getElementRects({reference:t,floating:e,strategy:o}),{x:a,y:d}=nt(l,i,s),f=i,u={},h=0;for(let m=0;m<c.length;m++){const{name:p,fn:w}=c[m],{x:y,y:g,data:x,reset:v}=await w({x:a,y:d,initialPlacement:i,placement:f,strategy:o,middlewareData:u,rects:l,platform:r,elements:{reference:t,floating:e}});if(a=y!=null?y:a,d=g!=null?g:d,u={...u,[p]:{...u[p],...x}},v&&h<=50){h++,typeof v=="object"&&(v.placement&&(f=v.placement),v.rects&&(l=v.rects===!0?await r.getElementRects({reference:t,floating:e,strategy:o}):v.rects),{x:a,y:d}=nt(l,f,s)),m=-1;continue}}return{x:a,y:d,placement:f,strategy:o,middlewareData:u}};function bt(t){return{top:0,right:0,bottom:0,left:0,...t}}function Ct(t){return typeof t!="number"?bt(t):{top:t,right:t,bottom:t,left:t}}function I(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function Q(t,e){var n;e===void 0&&(e={});const{x:i,y:o,platform:c,rects:r,elements:s,strategy:l}=t,{boundary:a="clippingAncestors",rootBoundary:d="viewport",elementContext:f="floating",altBoundary:u=!1,padding:h=0}=e,m=Ct(h),w=s[u?f==="floating"?"reference":"floating":f],y=I(await c.getClippingRect({element:(n=await(c.isElement==null?void 0:c.isElement(w)))==null||n?w:w.contextElement||await(c.getDocumentElement==null?void 0:c.getDocumentElement(s.floating)),boundary:a,rootBoundary:d,strategy:l})),g=I(c.convertOffsetParentRelativeRectToViewportRelativeRect?await c.convertOffsetParentRelativeRectToViewportRelativeRect({rect:f==="floating"?{...r.floating,x:i,y:o}:r.reference,offsetParent:await(c.getOffsetParent==null?void 0:c.getOffsetParent(s.floating)),strategy:l}):r[f]);return{top:y.top-g.top+m.top,bottom:g.bottom-y.bottom+m.bottom,left:y.left-g.left+m.left,right:g.right-y.right+m.right}}const Et=Math.min,Pt=Math.max;function ot(t,e,n){return Pt(t,Et(e,n))}const At={left:"right",right:"left",bottom:"top",top:"bottom"};function z(t){return t.replace(/left|right|bottom|top/g,e=>At[e])}function it(t,e,n){n===void 0&&(n=!1);const i=M(t),o=H(t),c=et(o);let r=o==="x"?i===(n?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[c]>e.floating[c]&&(r=z(r)),{main:r,cross:z(r)}}const Lt={start:"end",end:"start"};function Z(t){return t.replace(/start|end/g,e=>Lt[e])}const Ot=["top","right","bottom","left"].reduce((t,e)=>t.concat(e,e+"-start",e+"-end"),[]);function Rt(t,e,n){return(t?[...n.filter(o=>M(o)===t),...n.filter(o=>M(o)!==t)]:n.filter(o=>D(o)===o)).filter(o=>t?M(o)===t||(e?Z(o)!==o:!1):!0)}const kt=function(t){return t===void 0&&(t={}),{name:"autoPlacement",options:t,async fn(e){var n,i,o,c,r;const{x:s,y:l,rects:a,middlewareData:d,placement:f,platform:u,elements:h}=e,{alignment:m=null,allowedPlacements:p=Ot,autoAlignment:w=!0,...y}=t,g=Rt(m,w,p),x=await Q(e,y),v=(n=(i=d.autoPlacement)==null?void 0:i.index)!=null?n:0,P=g[v];if(P==null)return{};const{main:U,cross:G}=it(P,a,await(u.isRTL==null?void 0:u.isRTL(h.floating)));if(f!==P)return{x:s,y:l,reset:{placement:g[0]}};const J=[x[D(P)],x[U],x[G]],A=[...(o=(c=d.autoPlacement)==null?void 0:c.overflows)!=null?o:[],{placement:P,overflows:J}],V=g[v+1];if(V)return{data:{index:v+1,overflows:A},reset:{placement:V}};const N=A.slice().sort((k,_)=>k.overflows[0]-_.overflows[0]),j=(r=N.find(k=>{let{overflows:_}=k;return _.every(re=>re<=0)}))==null?void 0:r.placement,F=j!=null?j:N[0].placement;return F!==f?{data:{index:v+1,overflows:A},reset:{placement:F}}:{}}}};function Tt(t){const e=z(t);return[Z(t),e,Z(e)]}const Bt=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n;const{placement:i,middlewareData:o,rects:c,initialPlacement:r,platform:s,elements:l}=e,{mainAxis:a=!0,crossAxis:d=!0,fallbackPlacements:f,fallbackStrategy:u="bestFit",flipAlignment:h=!0,...m}=t,p=D(i),y=f||(p===r||!h?[z(r)]:Tt(r)),g=[r,...y],x=await Q(e,m),v=[];let P=((n=o.flip)==null?void 0:n.overflows)||[];if(a&&v.push(x[p]),d){const{main:A,cross:V}=it(i,c,await(s.isRTL==null?void 0:s.isRTL(l.floating)));v.push(x[A],x[V])}if(P=[...P,{placement:i,overflows:v}],!v.every(A=>A<=0)){var U,G;const A=((U=(G=o.flip)==null?void 0:G.index)!=null?U:0)+1,V=g[A];if(V)return{data:{index:A,overflows:P},reset:{placement:V}};let N="bottom";switch(u){case"bestFit":{var J;const j=(J=P.map(F=>[F,F.overflows.filter(k=>k>0).reduce((k,_)=>k+_,0)]).sort((F,k)=>F[1]-k[1])[0])==null?void 0:J[0].placement;j&&(N=j);break}case"initialPlacement":N=r;break}if(i!==N)return{reset:{placement:N}}}return{}}}};async function St(t,e){const{placement:n,platform:i,elements:o}=t,c=await(i.isRTL==null?void 0:i.isRTL(o.floating)),r=D(n),s=M(n),l=H(n)==="x",a=["left","top"].includes(r)?-1:1,d=c&&l?-1:1,f=typeof e=="function"?e(t):e;let{mainAxis:u,crossAxis:h,alignmentAxis:m}=typeof f=="number"?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...f};return s&&typeof m=="number"&&(h=s==="end"?m*-1:m),l?{x:h*d,y:u*a}:{x:u*a,y:h*d}}const st=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){const{x:n,y:i}=e,o=await St(e,t);return{x:n+o.x,y:i+o.y,data:o}}}};function Dt(t){return t==="x"?"y":"x"}const rt=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:i,placement:o}=e,{mainAxis:c=!0,crossAxis:r=!1,limiter:s={fn:w=>{let{x:y,y:g}=w;return{x:y,y:g}}},...l}=t,a={x:n,y:i},d=await Q(e,l),f=H(D(o)),u=Dt(f);let h=a[f],m=a[u];if(c){const w=f==="y"?"top":"left",y=f==="y"?"bottom":"right",g=h+d[w],x=h-d[y];h=ot(g,h,x)}if(r){const w=u==="y"?"top":"left",y=u==="y"?"bottom":"right",g=m+d[w],x=m-d[y];m=ot(g,m,x)}const p=s.fn({...e,[f]:h,[u]:m});return{...p,data:{x:p.x-n,y:p.y-i}}}}};function ct(t){return t&&t.document&&t.location&&t.alert&&t.setInterval}function L(t){if(t==null)return window;if(!ct(t)){const e=t.ownerDocument;return e&&e.defaultView||window}return t}function C(t){return L(t).getComputedStyle(t)}function O(t){return ct(t)?"":t?(t.nodeName||"").toLowerCase():""}function lt(){const t=navigator.userAgentData;return t!=null&&t.brands?t.brands.map(e=>e.brand+"/"+e.version).join(" "):navigator.userAgent}function E(t){return t instanceof L(t).HTMLElement}function B(t){return t instanceof L(t).Element}function Vt(t){return t instanceof L(t).Node}function W(t){if(typeof ShadowRoot>"u")return!1;const e=L(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function X(t){const{overflow:e,overflowX:n,overflowY:i}=C(t);return/auto|scroll|overlay|hidden/.test(e+i+n)}function Nt(t){return["table","td","th"].includes(O(t))}function at(t){const e=/firefox/i.test(lt()),n=C(t);return n.transform!=="none"||n.perspective!=="none"||n.contain==="paint"||["transform","perspective"].includes(n.willChange)||e&&n.willChange==="filter"||e&&(n.filter?n.filter!=="none":!1)}function ft(){return!/^((?!chrome|android).)*safari/i.test(lt())}const ut=Math.min,$=Math.max,Y=Math.round;function R(t,e,n){var i,o,c,r;e===void 0&&(e=!1),n===void 0&&(n=!1);const s=t.getBoundingClientRect();let l=1,a=1;e&&E(t)&&(l=t.offsetWidth>0&&Y(s.width)/t.offsetWidth||1,a=t.offsetHeight>0&&Y(s.height)/t.offsetHeight||1);const d=B(t)?L(t):window,f=!ft()&&n,u=(s.left+(f&&(i=(o=d.visualViewport)==null?void 0:o.offsetLeft)!=null?i:0))/l,h=(s.top+(f&&(c=(r=d.visualViewport)==null?void 0:r.offsetTop)!=null?c:0))/a,m=s.width/l,p=s.height/a;return{width:m,height:p,top:h,right:u+m,bottom:h+p,left:u,x:u,y:h}}function S(t){return((Vt(t)?t.ownerDocument:t.document)||window.document).documentElement}function K(t){return B(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function dt(t){return R(S(t)).left+K(t).scrollLeft}function Ft(t){const e=R(t);return Y(e.width)!==t.offsetWidth||Y(e.height)!==t.offsetHeight}function Mt(t,e,n){const i=E(e),o=S(e),c=R(t,i&&Ft(e),n==="fixed");let r={scrollLeft:0,scrollTop:0};const s={x:0,y:0};if(i||!i&&n!=="fixed")if((O(e)!=="body"||X(o))&&(r=K(e)),E(e)){const l=R(e,!0);s.x=l.x+e.clientLeft,s.y=l.y+e.clientTop}else o&&(s.x=dt(o));return{x:c.left+r.scrollLeft-s.x,y:c.top+r.scrollTop-s.y,width:c.width,height:c.height}}function pt(t){return O(t)==="html"?t:t.assignedSlot||t.parentNode||(W(t)?t.host:null)||S(t)}function ht(t){return!E(t)||C(t).position==="fixed"?null:Wt(t)}function Wt(t){let{offsetParent:e}=t,n=t,i=!1;for(;n&&n!==e;){const{assignedSlot:o}=n;if(o){let c=o.offsetParent;if(C(o).display==="contents"){const r=o.hasAttribute("style"),s=o.style.display;o.style.display=C(n).display,c=o.offsetParent,o.style.display=s,r||o.removeAttribute("style")}n=o,e!==c&&(e=c,i=!0)}else if(W(n)&&n.host&&i)break;n=W(n)&&n.host||n.parentNode}return e}function $t(t){let e=pt(t);for(W(e)&&(e=e.host);E(e)&&!["html","body"].includes(O(e));){if(at(e))return e;{const n=e.parentNode;e=W(n)?n.host:n}}return null}function tt(t){const e=L(t);let n=ht(t);for(;n&&Nt(n)&&C(n).position==="static";)n=ht(n);return n&&(O(n)==="html"||O(n)==="body"&&C(n).position==="static"&&!at(n))?e:n||$t(t)||e}function mt(t){if(E(t))return{width:t.offsetWidth,height:t.offsetHeight};const e=R(t);return{width:e.width,height:e.height}}function jt(t){let{rect:e,offsetParent:n,strategy:i}=t;const o=E(n),c=S(n);if(n===c)return e;let r={scrollLeft:0,scrollTop:0};const s={x:0,y:0};if((o||!o&&i!=="fixed")&&((O(n)!=="body"||X(c))&&(r=K(n)),E(n))){const l=R(n,!0);s.x=l.x+n.clientLeft,s.y=l.y+n.clientTop}return{...e,x:e.x-r.scrollLeft+s.x,y:e.y-r.scrollTop+s.y}}function _t(t,e){const n=L(t),i=S(t),o=n.visualViewport;let c=i.clientWidth,r=i.clientHeight,s=0,l=0;if(o){c=o.width,r=o.height;const a=ft();(a||!a&&e==="fixed")&&(s=o.offsetLeft,l=o.offsetTop)}return{width:c,height:r,x:s,y:l}}function Ht(t){var e;const n=S(t),i=K(t),o=(e=t.ownerDocument)==null?void 0:e.body,c=$(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),r=$(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0);let s=-i.scrollLeft+dt(t);const l=-i.scrollTop;return C(o||n).direction==="rtl"&&(s+=$(n.clientWidth,o?o.clientWidth:0)-c),{width:c,height:r,x:s,y:l}}function gt(t){const e=pt(t);return["html","body","#document"].includes(O(e))?t.ownerDocument.body:E(e)&&X(e)?e:gt(e)}function q(t,e){var n;e===void 0&&(e=[]);const i=gt(t),o=i===((n=t.ownerDocument)==null?void 0:n.body),c=L(i),r=o?[c].concat(c.visualViewport||[],X(i)?i:[]):i,s=e.concat(r);return o?s:s.concat(q(r))}function It(t,e){const n=e.getRootNode==null?void 0:e.getRootNode();if(t.contains(e))return!0;if(n&&W(n)){let i=e;do{if(i&&t===i)return!0;i=i.parentNode||i.host}while(i)}return!1}function zt(t,e){const n=R(t,!1,e==="fixed"),i=n.top+t.clientTop,o=n.left+t.clientLeft;return{top:i,left:o,x:o,y:i,right:o+t.clientWidth,bottom:i+t.clientHeight,width:t.clientWidth,height:t.clientHeight}}function wt(t,e,n){return e==="viewport"?I(_t(t,n)):B(e)?zt(e,n):I(Ht(S(t)))}function Xt(t){const e=q(t),i=["absolute","fixed"].includes(C(t).position)&&E(t)?tt(t):t;return B(i)?e.filter(o=>B(o)&&It(o,i)&&O(o)!=="body"):[]}function Yt(t){let{element:e,boundary:n,rootBoundary:i,strategy:o}=t;const r=[...n==="clippingAncestors"?Xt(e):[].concat(n),i],s=r[0],l=r.reduce((a,d)=>{const f=wt(e,d,o);return a.top=$(f.top,a.top),a.right=ut(f.right,a.right),a.bottom=ut(f.bottom,a.bottom),a.left=$(f.left,a.left),a},wt(e,s,o));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}const Kt={getClippingRect:Yt,convertOffsetParentRelativeRectToViewportRelativeRect:jt,isElement:B,getDimensions:mt,getOffsetParent:tt,getDocumentElement:S,getElementRects:t=>{let{reference:e,floating:n,strategy:i}=t;return{reference:Mt(e,tt(n),i),floating:{...mt(n),x:0,y:0}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>C(t).direction==="rtl"};function qt(t,e,n,i){i===void 0&&(i={});const{ancestorScroll:o=!0,ancestorResize:c=!0,elementResize:r=!0,animationFrame:s=!1}=i,l=o&&!s,a=c&&!s,d=l||a?[...B(t)?q(t):[],...q(e)]:[];d.forEach(p=>{l&&p.addEventListener("scroll",n,{passive:!0}),a&&p.addEventListener("resize",n)});let f=null;if(r){let p=!0;f=new ResizeObserver(()=>{p||n(),p=!1}),B(t)&&!s&&f.observe(t),f.observe(e)}let u,h=s?R(t):null;s&&m();function m(){const p=R(t);h&&(p.x!==h.x||p.y!==h.y||p.width!==h.width||p.height!==h.height)&&n(),h=p,u=requestAnimationFrame(m)}return n(),()=>{var p;d.forEach(w=>{l&&w.removeEventListener("scroll",n),a&&w.removeEventListener("resize",n)}),(p=f)==null||p.disconnect(),f=null,s&&cancelAnimationFrame(u)}}const Ut=(t,e,n)=>xt(t,e,{platform:Kt,...n});async function Gt(t,e,n,i){if(!i)throw new Error("Must provide a positioning option");return await(typeof i=="string"?Jt(t,e,n,i):Qt(e,i))}async function Jt(t,e,n,i){if(!n)throw new Error("Reference element is required for relative positioning");let o;return i==="auto"?o={middleware:[kt(),rt(),st({mainAxis:5,crossAxis:12})]}:o={placement:i,middleware:[Bt(),rt(),st(5)]},qt(n,e,async()=>{if((!n.isConnected||!n.offsetParent)&&Zt(t))return;const{x:c,y:r}=await Ut(n,e,o);Object.assign(e.style,{position:"absolute",left:`${c}px`,top:`${r}px`})})}function Qt(t,e){return t.style.position="fixed",Object.entries(e).forEach(([n,i])=>{t.style[n]=i}),()=>{}}function Zt(t){switch(t.options.onPositionLost){case"close":return t.close(),!0;case"destroy":return t.destroy(),!0;case"hold":return!0}}const te={hideOnClickOutside:!0,hideOnEmojiSelect:!0,hideOnEscape:!0,position:"auto",showCloseButton:!0,onPositionLost:"none"};function ee(t={}){return{...te,rootElement:document.body,...t}}const ne='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>',yt={popupContainer:"popupContainer",closeButton:"closeButton"};class vt{constructor(e,n){this.isOpen=!1,this.externalEvents=new b.Events,this.options={...ee(n),...b.getOptions(e)},this.popupEl=document.createElement("div"),this.popupEl.classList.add(yt.popupContainer),this.popupEl.classList.add(this.options.theme),n.className&&this.popupEl.classList.add(n.className),this.options.showCloseButton&&(this.closeButton=document.createElement("button"),this.closeButton.type="button",this.closeButton.classList.add(yt.closeButton),this.closeButton.innerHTML=ne,this.closeButton.addEventListener("click",()=>{this.close()}),this.popupEl.appendChild(this.closeButton));const i=document.createElement("div");this.popupEl.appendChild(i),this.picker=b.createPicker({...this.options,rootElement:i}),this.focusTrap=new b.FocusTrap,this.picker.addEventListener("data:ready",()=>{this.focusTrap.activate(this.picker.el),this.picker.setInitialFocus()}),this.options.hideOnEmojiSelect&&this.picker.addEventListener("emoji:select",()=>{var o;this.close(),(o=this.triggerElement)==null||o.focus()}),this.options.hideOnClickOutside&&(this.onDocumentClick=this.onDocumentClick.bind(this),document.addEventListener("click",this.onDocumentClick)),this.options.hideOnEscape&&(this.handleKeydown=this.handleKeydown.bind(this),this.popupEl.addEventListener("keydown",this.handleKeydown)),this.referenceElement=this.options.referenceElement,this.triggerElement=this.options.triggerElement}addEventListener(e,n){this.externalEvents.on(e,n),this.picker.addEventListener(e,n)}removeEventListener(e,n){this.externalEvents.off(e,n),this.picker.removeEventListener(e,n)}handleKeydown(e){var n;e.key==="Escape"&&(this.close(),(n=this.triggerElement)==null||n.focus())}async destroy(){this.isOpen&&await this.close(),document.removeEventListener("click",this.onDocumentClick),this.picker.destroy(),this.externalEvents.removeAll()}toggle(e){return this.isOpen?this.close():this.open(e)}async open({triggerElement:e,referenceElement:n}={}){this.isOpen||(e&&(this.triggerElement=e),n&&(this.referenceElement=n),await this.initiateOpenStateChange(!0),this.popupEl.style.opacity="0",this.options.rootElement.appendChild(this.popupEl),await this.setPosition(),this.picker.reset(!1),await this.animatePopup(!0),await this.animateCloseButton(!0),this.picker.setInitialFocus(),this.externalEvents.emit("picker:open"))}async close(){var e;!this.isOpen||(await this.initiateOpenStateChange(!1),await this.animateCloseButton(!1),await this.animatePopup(!1),this.popupEl.remove(),this.picker.reset(),(e=this.positionCleanup)==null||e.call(this),this.focusTrap.deactivate(),this.externalEvents.emit("picker:close"))}getRunningAnimations(){return this.picker.el.getAnimations().filter(e=>e.playState==="running")}async setPosition(){var e;(e=this.positionCleanup)==null||e.call(this),this.positionCleanup=await Gt(this,this.popupEl,this.referenceElement,this.options.position)}awaitPendingAnimations(){return Promise.all(this.getRunningAnimations().map(e=>e.finished))}onDocumentClick(e){var o;const n=e.target,i=(o=this.triggerElement)==null?void 0:o.contains(n);this.isOpen&&!this.picker.isPickerClick(e)&&!i&&this.close()}animatePopup(e){return b.animate(this.popupEl,{opacity:[0,1],transform:["scale(0.9)","scale(1)"]},{duration:150,id:e?"show-picker":"hide-picker",easing:"ease-in-out",direction:e?"normal":"reverse",fill:"both"},this.options)}animateCloseButton(e){if(this.closeButton)return b.animate(this.closeButton,{opacity:[0,1]},{duration:25,id:e?"show-close":"hide-close",easing:"ease-in-out",direction:e?"normal":"reverse",fill:"both"},this.options)}async initiateOpenStateChange(e){this.isOpen=e,await this.awaitPendingAnimations()}}const oe=`.popupContainer{display:flex;flex-direction:column;position:absolute}.popupContainer .closeButton{position:absolute;opacity:0;background:transparent;border:none;z-index:1;right:0;top:0;cursor:pointer;padding:4px;align-self:flex-end;transform:translate(50%,-50%);background:#999999;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%}.popupContainer .closeButton:hover{background:var(--accent-color)}.popupContainer .closeButton svg{fill:#fff;width:1.25rem;height:1.25rem}
`,ie=b.createStyleInjector();function se(t,e){return ie(oe),new vt({autoFocus:"auto",...t},e)}T.PopupPickerController=vt,T.createPopup=se,Object.defineProperties(T,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});