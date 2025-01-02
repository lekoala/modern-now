var nt="querySelectorAll",rt=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,h,f,u,i,a)=>{for(let c of l)(a||nt in c)&&(i?f.has(c)||(f.add(c),u.delete(c),t(c,i)):u.has(c)||(u.add(c),f.delete(c),t(c,i)),a||r(c[nt](h),h,f,u,i,!0))},s=new o(l=>{if(n.length){let h=n.join(","),f=new Set,u=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,h,f,u,!1,!1),r(i,h,f,u,!0,!1)}}),{observe:p}=s;return(s.observe=l=>p.call(s,l,{subtree:!0,childList:!0}))(e),s};var ct="querySelectorAll",{document:Jt,Element:it,MutationObserver:Zt,Set:te,WeakMap:ee}=self,st=t=>ct in t,{filter:at}=[],lt=t=>{let e=new ee,o=i=>{for(let a=0,{length:c}=i;a<c;a++)e.delete(i[a])},n=()=>{let i=f.takeRecords();for(let a=0,{length:c}=i;a<c;a++)p(at.call(i[a].removedNodes,st),!1),p(at.call(i[a].addedNodes,st),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,a)=>{let c;if(a)for(let m,x=r(i),b=0,{length:Z}=l;b<Z;b++)x.call(i,m=l[b])&&(e.has(i)||e.set(i,new te),c=e.get(i),c.has(m)||(c.add(m),t.handle(i,a,m)));else e.has(i)&&(c=e.get(i),e.delete(i),c.forEach(m=>{t.handle(i,a,m)}))},p=(i,a=!0)=>{for(let c=0,{length:m}=i;c<m;c++)s(i[c],a)},{query:l}=t,h=t.root||Jt,f=rt(s,h,Zt,l),{attachShadow:u}=it.prototype;return u&&(it.prototype.attachShadow=function(i){let a=u.call(this,i);return f.observe(a),a}),l.length&&p(h[ct](l)),{drop:o,flush:n,observer:f,parse:p}};function C(t,e){let o=t.get(e);o&&o(e)}function P(t,e){return t.getAttribute(e)}function k(t,e){return t.dataset[e]===""||gt(t.dataset[e])}function pt(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function ut(t,e){return t.dataset[e]!==void 0}function ft(t,e,o=null){let n=R(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function dt(t,e,o=null){let n=R(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function ht(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function mt(t,e,o){t.style.setProperty(`--${e}`,o)}function L(t,e){t.classList.add(e)}var xt=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},vt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function y(t,e,o=null){let n=xt(e,o);for(let r of B(t))n.addEventListener(r,e,vt(r))}function V(t,e,o=null){let n=xt(e,o);for(let r of B(t))n.removeEventListener(r,e,vt(r))}function S(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function M(t,e=null,o=document){return o.getElementById(t)}function I(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function bt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function yt(t,e=null){let o=N("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function z(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function wt(t){t.style.display="inherit"}function F(t){t.style.display="none"}function N(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function gt(t){return["true","1"].includes(String(t).toLowerCase())}function B(t){return Array.isArray(t)?t:[t]}function At(t){return t===void 0?0:Number.parseInt(`${t}`)}function R(t){return typeof t=="object"&&t!==null}function oe(t){return typeof t=="string"||t instanceof String}function j(t,e=null){return t}function Ct(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${bt(r)}`:r;ut(t,s)&&(e[r]=pt(t,s))}}function kt(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function St(t,e=300){let o;return(...n)=>{ne(o),o=setTimeout(()=>{o=void 0,t(...n)},e)}}function Mt(t){if(!t)return{};if(t.endsWith("()")){let o=kt(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return Et(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function Et(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;oe(n)?t[e]=kt(n):Et(o)}return t}function $t(){return HTMLElement.prototype.hasOwnProperty("popover")}function Lt(){return"IntersectionObserver"in window}function ne(t){t&&clearTimeout(t)}var U=new WeakMap,T;Lt()&&(T=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),C(U,r)}}));function q(t,e){return T?(U.set(t,e),T.observe(t),()=>(U.delete(t),T.unobserve(t))):(e(t),()=>{})}var Tt={},K=[],re=window.DEBUG||!1,{drop:Dt,flush:Ot,observer:Re,parse:X}=lt({query:K,document,async handle(t,e,o){let n=Tt[o],r=n.initialized,s=n.lazyMap;if(re&&console.log(t,e,o),e){let p=()=>{r.has(t)||(n.callback(t),r.add(t))};k(t,"lazy")?s.set(t,q(t,p)):p()}else if(await Promise.resolve(),!t.isConnected&&r.has(t)){let p=n.cleanup;p&&p(t),C(s,t),r.delete(t)}}});var D=(t,e,o=null)=>{let n=new WeakSet,r=new WeakMap;Tt[t]={callback:e,cleanup:o,initialized:n,lazyMap:r},K.includes(t)||(K.push(t),X(I(t)))};var E="floatingReposition",W="floatingHide",O=new Set,Q=!1,Pt=t=>{for(let e of O){let o=t.target;(o instanceof Window||o.contains(e))&&S(E,e)}Q=!1},Rt=t=>{Q||requestAnimationFrame(()=>Pt(t)),Q=!0},ie=St(t=>{Pt(t)},10);y("scroll",t=>{Rt(t),ie(t)});y("resize",Rt,window);y("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of O)S(W,o)});function G(t){return t.split("-")[0]}function Vt(t){return t.split("-")[1]}function Bt(t){return["top","bottom"].includes(G(t))?"x":"y"}function se(t){return t==="y"?"height":"width"}function Wt(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Ht(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function Y(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,p=Bt(o),l=se(p),h=t[l]/2-e[l]/2,f=G(o),u=p==="x",i;switch(f){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(Vt(o)){case"start":i[p]-=h*(n&&u?-1:1);break;case"end":i[p]+=h*(n&&u?-1:1);break}return i}function It(t){return O.add(t),()=>{O.delete(t)}}function zt(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=window.getComputedStyle(t),r=t.getClientRects(),s=e.getBoundingClientRect(),p=n.direction==="rtl",l=o.placement||"bottom",h=o.distance||0,f=o.flip||!1,u=G(l),i=Vt(l),a=Bt(l),c=l==="bottom"?r[r.length-1]:r[0],m=t.ownerDocument.documentElement,x=m.clientWidth,b=m.clientHeight;window.innerWidth-x>20&&(x=window.innerWidth,b=window.innerHeight);let w=0,H=0,tt=o.scopeEl;if(tt){let g=tt.getBoundingClientRect();w=g.x,H=g.y,x=g.x+g.width,b=g.y+g.height}let d=Y(c,s,l,p),et=At(`${h}`);if(Ht(d,u,et,p),f){let g=!1,A=Math.ceil(d.x),$=Math.ceil(d.y);if(a==="x"&&($<H||$+s.height>=b)&&($<H&&$>=b?e.style.maxHeight="90vh":(u=Wt(u),g=!0)),a==="y"&&(A<w||A+s.width>=x)&&(A<w&&A>=x?e.style.maxWidth="90vw":(u=Wt(u),g=!0)),a==="y"&&m.clientWidth-s.width<100&&(u="top",a="x",g=!0),g){l=i?`${u}-${i}`:u,d=Y(c,s,l,p);let Yt=d.x>0?d.x:0,Qt=a==="x"&&d.y+s.height>m.clientHeight,Gt=a==="y"&&d.x+s.width>m.clientWidth,_t=a==="y"&&Yt+s.width>c.left;(Qt||Gt||_t)&&(u="top",a="x",l=i?`${u}-${i}`:u,d=Y(c,s,l,p)),Ht(d,u,et,p)}}let v=0,ot=50;if(o.shift||s.width>c.width){let g=1;d.x<w?(v=d.x-w+o.shiftPadding,d.x=w+o.shiftPadding):d.x+s.width>x&&(v=x-(d.x+s.width)-o.shiftPadding,v+d.x<0&&(v-=d.x+v),d.x+=v,g=v<0?-1:1);let A=v!==0?v/s.width*100*g:0;ot=50+A}mt(e,"p",`${ot}%`),e.dataset.placement=l,Object.assign(e.style,{left:`${d.x}px`,top:`${d.y}px`})}var ae=`
div.tooltip {
  --b: 12px;
  --h: 6px;
  --p: 50%;
  --r: 6px;
  --tooltip-color-start: var(--accent, rgb(139, 59, 210));
  --tooltip-color-end: var(--accent-hover, rgb(47, 30, 152));
  --tooltip-bg: linear-gradient(45deg, var(--tooltip-color-start), var(--tooltip-color-end));
  pointer-events: none;
  user-select: none;
  padding: 0.125em 0.5em;
  color: #fff;
  border-radius: min(var(--r),var(--p) - var(--b)/2) min(var(--r),100% - var(--p) - var(--b)/2) var(--r) var(--r)/var(--r);
  background: 0 0/100% calc(100% + var(--h)) var(--tooltip-bg);
  position: relative;
  overflow: visible;
  inset: unset;
  z-index: 0;
  max-width: max(40ch, 90vw);
  opacity:1;
  font-size: 0.875rem;
}
div.tooltip:before {
  content: " ";
  position: absolute;
  z-index: -1;
  background-image: inherit;
  right: 0px;
  top: 0px;
  left: 0px;
  bottom: 0px;
}
div.tooltip[data-placement="top"]:before {
  bottom: calc(-1*var(--h));
  clip-path: polygon(min(100%,var(--p) + var(--b)/2) calc(100% - var(--h)),var(--p) 100%,max(0%,var(--p) - var(--b)/2) calc(100% - var(--h)),50% 50%);
  -webkit-clip-path: polygon(min(100%,var(--p) + var(--b)/2) calc(100% - var(--h)),var(--p) 100%,max(0%,var(--p) - var(--b)/2) calc(100% - var(--h)),50% 50%);
}
div.tooltip[data-placement="bottom"] {
  background: 0 100%/100% calc(100% + var(--h)) var(--tooltip-bg);
}
div.tooltip[data-placement="bottom"]:before {
  top: calc(-1*var(--h));
  clip-path: polygon(min(100%,var(--p) + var(--b)/2) var(--h),var(--p) 0,max(0%,var(--p) - var(--b)/2) var(--h),50% 50%);
  -webkit-clip-path: polygon(min(100%,var(--p) + var(--b)/2) var(--h),var(--p) 0,max(0%,var(--p) - var(--b)/2) var(--h),50% 50%);
}
div.tooltip[data-placement="right"] {
  background:  0/calc(100% + var(--h)) 100%  var(--tooltip-bg);
}
div.tooltip[data-placement="right"]:before {
  left: calc(-1*var(--h));
  clip-path: polygon(var(--h) max(0%,var(--p) - var(--b)/2),0 var(--p),var(--h) min(100%,var(--p) + var(--b)/2),50% 50%);
  -webkit-clip-path: polygon(var(--h) max(0%,var(--p) - var(--b)/2),0 var(--p),var(--h) min(100%,var(--p) + var(--b)/2),50% 50%);
}
div.tooltip[data-placement="left"] {
  background: 100%/calc(100% + var(--h)) 100% var(--tooltip-bg);
}
div.tooltip[data-placement="left"]:before {
  right: calc(-1*var(--h));
  clip-path: polygon(calc(100% - var(--h)) max(0%,var(--p) - var(--b)/2),100% var(--p),calc(100% - var(--h)) min(100%,var(--p) + var(--b)/2),50% 50%);
  -webkit-clip-path: polygon(calc(100% - var(--h)) max(0%,var(--p) - var(--b)/2),100% var(--p),calc(100% - var(--h)) min(100%,var(--p) + var(--b)/2),50% 50%);
}
`,ce="tooltip-style";yt(ae,ce);var J=$t(),Ft=["mouseover","mouseout","focus","blur","click"],Nt=[W,E];function Kt(t){J&&t.showPopover(),wt(t),S(E,t)}function Xt(t){J&&t.hidePopover(),F(t)}var jt=t=>{let e=j(t.target,"div"),o=j(e.closest("[data-tooltip]"),"a"),n=o.dataset,r=M(n.tooltipTarget);if(!r)return;let s=t.type==="click",p=k(o,"tooltipClick"),l=k(o,"tooltipVisible"),h=k(o,"tooltipHidden"),f=null;p?s&&(t.preventDefault(),f=z(r)?"hide":"show"):s||(f=["mouseover","focus"].includes(t.type)?"show":"hide"),f==="show"?!h&&!z(r)&&Kt(r):f==="hide"&&!l&&(document.activeElement!==e||s)&&Xt(r)},Ut=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===E){let r=M(n.tooltipElement);zt(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===W&&!e.dataset.tooltipVisible&&Xt(e)},qt=new WeakMap,_=0;D("[data-tooltip]",t=>{let e,o=t.dataset,n=Mt(o.tooltip);Ct(t,n,["distance","placement","target","class","title","visible","hidden"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.visible&&(o.tooltipVisible="true"),n.click&&(o.tooltipClick="true");let r=P(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||P(t,"title");if(s?(ht(t,"title"),_++,e=N("div"),e.id=`tooltip-${_}`,e.innerHTML=`${s}`,(t.closest("dialog")||document.body).appendChild(e),o.tooltipTarget=e.id):n.target&&(e=M(n.target),o.tooltipTarget=n.target),!e)return;dt(t,"aria-describedby",`tooltip-${_}`),e.style.position="fixed",J&&(e.popover=""),n.visible?e.dataset.tooltipVisible="true":F(e),L(e,"tooltip"),e.role="tooltip",e.inert=!0,e.tabIndex=-1,n.class&&L(e,n.class),t.id||(t.id=`${e.id}-target`),ft(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),y(Nt,Ut,e);let p=It(e);qt.set(e,p),y(Ft,jt,t),n.visible&&Kt(e)},t=>{let e=M(t.dataset.tooltipTarget);e&&(V(Nt,Ut,e),C(qt,e),e.remove()),V(Ft,jt,t)});var Je={dynamicBehaviour:D,drop:Dt,parse:X,flush:Ot};export{Je as default};
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
