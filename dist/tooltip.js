var rt="querySelectorAll",nt=(t,e=document,o=MutationObserver,r=["*"])=>{let n=(l,h,f,u,i,a)=>{for(let c of l)(a||rt in c)&&(i?f.has(c)||(f.add(c),u.delete(c),t(c,i)):u.has(c)||(u.add(c),f.delete(c),t(c,i)),a||n(c[rt](h),h,f,u,i,!0))},s=new o(l=>{if(r.length){let h=r.join(","),f=new Set,u=new Set;for(let{addedNodes:i,removedNodes:a}of l)n(a,h,f,u,!1,!1),n(i,h,f,u,!0,!1)}}),{observe:p}=s;return(s.observe=l=>p.call(s,l,{subtree:!0,childList:!0}))(e),s};var ct="querySelectorAll",{document:ee,Element:it,MutationObserver:oe,Set:re,WeakMap:ne}=self,st=t=>ct in t,{filter:at}=[],lt=t=>{let e=new ne,o=i=>{for(let a=0,{length:c}=i;a<c;a++)e.delete(i[a])},r=()=>{let i=f.takeRecords();for(let a=0,{length:c}=i;a<c;a++)p(at.call(i[a].removedNodes,st),!1),p(at.call(i[a].addedNodes,st),!0)},n=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,a)=>{let c;if(a)for(let m,x=n(i),b=0,{length:J}=l;b<J;b++)x.call(i,m=l[b])&&(e.has(i)||e.set(i,new re),c=e.get(i),c.has(m)||(c.add(m),t.handle(i,a,m)));else e.has(i)&&(c=e.get(i),e.delete(i),c.forEach(m=>{t.handle(i,a,m)}))},p=(i,a=!0)=>{for(let c=0,{length:m}=i;c<m;c++)s(i[c],a)},{query:l}=t,h=t.root||ee,f=nt(s,h,oe,l),{attachShadow:u}=it.prototype;return u&&(it.prototype.attachShadow=function(i){let a=u.call(this,i);return f.observe(a),a}),l.length&&p(h[ct](l)),{drop:o,flush:r,observer:f,parse:p}};function C(t,e){let o=t.get(e);o&&o(e)}function pt(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function ut(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function E(t,e){return t.getAttribute(e)}function k(t,e){return t.dataset[e]===""||E(t,`data-${pt(e)}`)===""||vt(t.dataset[e])}function ft(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function dt(t,e){return t.dataset[e]!==void 0}function ht(t,e,o=null){let r=R(e)?e:{[e]:o};for(let[n,s]of Object.entries(r))t.dataset[n]=`${s}`}function mt(t,e,o=null){let r=R(e)?e:{[e]:o};for(let[n,s]of Object.entries(r))t.setAttribute(n,`${s}`)}function gt(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let r of o)t.removeAttribute(r)}function xt(t,e,o){t.style.setProperty(`--${e}`,o)}function L(t,e){t.classList.add(e)}var bt=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},yt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function y(t,e,o=null){let r=bt(e,o);for(let n of V(t))r.addEventListener(n,e,yt(n))}function B(t,e,o=null){let r=bt(e,o);for(let n of V(t))r.removeEventListener(n,e,yt(n))}function S(t,e=document,o={},r=!1){let n={};r&&(n.bubbles=!0),o&&(n.detail=o),e.dispatchEvent(new CustomEvent(t,n))}function $(t,e=null,o=document){return o.getElementById(t)}function I(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function wt(t,e=null){let o=N("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function z(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function At(t){t.style.display="inherit"}function F(t){t.style.display="none"}function N(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function vt(t){return["true","1"].includes(String(t).toLowerCase())}function V(t){return Array.isArray(t)?t:[t]}function Ct(t){return t===void 0?0:Number.parseInt(`${t}`)}function R(t){return typeof t=="object"&&t!==null}function ie(t){return typeof t=="string"||t instanceof String}function j(t,e=null){return t}function kt(t,e,o=[],r=null){for(let n of o){let s=r?`${r}${ut(n)}`:n;dt(t,s)&&(e[n]=ft(t,s))}}function St(t,e=window){return t.split(".").reduce((o,r)=>o[r],e)}function $t(t,e=300){let o;return(...r)=>{se(o),o=setTimeout(()=>{o=void 0,t(...r)},e)}}function Mt(t){if(!t)return{};if(t.endsWith("()")){let o=St(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,r,n)=>`"${r.replace(/['"]/g,"")}":${n.includes('"')?n:n.replace(/'/g,'"')}`)}}`);try{return Tt(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function Tt(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let r=o.__fn;ie(r)?t[e]=St(r):Tt(o)}return t}function Et(t=document){return t.documentElement}function Lt(){return HTMLElement.prototype.hasOwnProperty("popover")}function Dt(){return"IntersectionObserver"in window}function se(t){t&&clearTimeout(t)}var U=new WeakMap,D;Dt()&&(D=new IntersectionObserver((t,e)=>{let o=t.filter(r=>r.isIntersecting);for(let r of o){let n=r.target;e.unobserve(n),C(U,n)}}));function q(t,e){return D?(U.set(t,e),D.observe(t),()=>(U.delete(t),D.unobserve(t))):(e(t),()=>{})}var Ot={},K=[],Wt=window.DEBUG||!1,{drop:Ht,flush:Pt,observer:je,parse:X}=lt({query:K,document,async handle(t,e,o){let r=Ot[o],n=r.initialized,s=r.lazyMap;if(Wt&&console.log(t,e,o),e){let p=()=>{n.has(t)||(r.callback(t),n.add(t))};k(t,"lazy")?s.set(t,q(t,p)):p()}else if(await Promise.resolve(),!t.isConnected&&n.has(t)){let p=r.cleanup;p&&p(t),C(s,t),n.delete(t)}}});var ae=(t,e,o=null)=>{let r=new WeakSet,n=new WeakMap;Ot[t]={callback:e,cleanup:o,initialized:r,lazyMap:n},Wt&&console.log(`Register selector '${t}'`),K.includes(t)||(K.push(t),X(I(t)))},O=ae;var M="floatingReposition",H="floatingHide",W=new Set,Q=!1,Vt=t=>{for(let e of W){let o=t.target;(o instanceof Window||o.contains(e))&&S(M,e)}Q=!1},It=t=>{Q||requestAnimationFrame(()=>Vt(t)),Q=!0},ce=$t(t=>{Vt(t)},10);y("scroll",t=>{It(t),ce(t)});y("resize",It,window);y("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of W)S(H,o)});function G(t){return t.split("-")[0]}function zt(t){return t.split("-")[1]}function Ft(t){return["top","bottom"].includes(G(t))?"x":"y"}function le(t){return t==="y"?"height":"width"}function Rt(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Bt(t,e,o,r=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=r?o:-o;break;case"right":t.x+=r?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function Y(t,e,o,r=!1){let n=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,p=Ft(o),l=le(p),h=t[l]/2-e[l]/2,f=G(o),u=p==="x",i;switch(f){case"top":i={x:n,y:t.y-e.height};break;case"bottom":i={x:n,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(zt(o)){case"start":i[p]-=h*(r&&u?-1:1);break;case"end":i[p]+=h*(r&&u?-1:1);break}return i}function Nt(t){return W.add(t),()=>{W.delete(t)}}function jt(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let r=window.getComputedStyle(t),n=t.getClientRects(),s=e.getBoundingClientRect(),p=r.direction==="rtl",l=o.placement||"bottom",h=o.distance||0,f=o.flip||!1,u=G(l),i=zt(l),a=Ft(l),c=l==="bottom"?n[n.length-1]:n[0],m=Et(t.ownerDocument),x=m.clientWidth,b=m.clientHeight;window.innerWidth-x>20&&(x=window.innerWidth,b=window.innerHeight);let w=0,P=0,tt=o.scopeEl;if(tt){let g=tt.getBoundingClientRect();w=g.x,P=g.y,x=g.x+g.width,b=g.y+g.height}let d=Y(c,s,l,p),et=Ct(`${h}`);if(Bt(d,u,et,p),f){let g=!1,A=Math.ceil(d.x),T=Math.ceil(d.y);if(a==="x"&&(T<P||T+s.height>=b)&&(T<P&&T>=b?e.style.maxHeight="90vh":(u=Rt(u),g=!0)),a==="y"&&(A<w||A+s.width>=x)&&(A<w&&A>=x?e.style.maxWidth="90vw":(u=Rt(u),g=!0)),a==="y"&&m.clientWidth-s.width<100&&(u="top",a="x",g=!0),g){l=i?`${u}-${i}`:u,d=Y(c,s,l,p);let Zt=d.x>0?d.x:0,_t=a==="x"&&d.y+s.height>m.clientHeight,Jt=a==="y"&&d.x+s.width>m.clientWidth,te=a==="y"&&Zt+s.width>c.left;(_t||Jt||te)&&(u="top",a="x",l=i?`${u}-${i}`:u,d=Y(c,s,l,p)),Bt(d,u,et,p)}}let v=0,ot=50;if(o.shift||s.width>c.width){let g=1;d.x<w?(v=d.x-w+o.shiftPadding,d.x=w+o.shiftPadding):d.x+s.width>x&&(v=x-(d.x+s.width)-o.shiftPadding,v+d.x<0&&(v-=d.x+v),d.x+=v,g=v<0?-1:1);let A=v!==0?v/s.width*100*g:0;ot=50+A}xt(e,"p",`${ot}%`),e.dataset.placement=l,Object.assign(e.style,{left:`${d.x}px`,top:`${d.y}px`})}var pe=`
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
`,ue="tooltip-style";wt(pe,ue);var _=Lt(),Ut=["mouseover","mouseout","focus","blur","click"],qt=[H,M];function Qt(t){_&&t.showPopover(),At(t),S(M,t)}function Gt(t){_&&t.hidePopover(),F(t)}var Kt=t=>{let e=j(t.target,"div"),o=j(e.closest("[data-tooltip]"),"a"),r=o.dataset,n=$(r.tooltipTarget);if(!n)return;let s=t.type==="click",p=k(o,"tooltipClick"),l=k(o,"tooltipVisible"),h=k(o,"tooltipHidden"),f=null;p?s&&(t.preventDefault(),f=z(n)?"hide":"show"):s||(f=["mouseover","focus"].includes(t.type)?"show":"hide"),f==="show"?!h&&!z(n)&&Qt(n):f==="hide"&&!l&&(document.activeElement!==e||s)&&Gt(n)},Xt=t=>{let e=t.target,o=t.type,r=e.dataset;if(o===M){let n=$(r.tooltipElement);jt(n,e,{placement:r.tooltipPlacement,distance:r.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===H&&!e.dataset.tooltipVisible&&Gt(e)},Yt=new WeakMap,Z=0;O("[data-tooltip]",t=>{let e,o=t.dataset,r=Mt(o.tooltip);kt(t,r,["distance","placement","target","class","title","visible","hidden"],"tooltip"),r.hidden&&(o.tooltipHidden="true"),r.visible&&(o.tooltipVisible="true"),r.click&&(o.tooltipClick="true");let n=E(t,"href");!r.target&&n&&n.indexOf("#")===0&&(r.target=n.substring(1));let s=r.title||E(t,"title");if(s?(gt(t,"title"),Z++,e=N("div"),e.id=`tooltip-${Z}`,e.innerHTML=`${s}`,(t.closest("dialog")||document.body).appendChild(e),o.tooltipTarget=e.id):r.target&&(e=$(r.target),o.tooltipTarget=r.target),!e)return;mt(t,"aria-describedby",`tooltip-${Z}`),e.style.position="fixed",_&&(e.popover=""),r.visible?e.dataset.tooltipVisible="true":F(e),L(e,"tooltip"),e.role="tooltip",e.inert=!0,e.tabIndex=-1,r.class&&L(e,r.class),t.id||(t.id=`${e.id}-target`),ht(e,{tooltipPlacement:r.placement||"top",tooltipDistance:r.distance||"6",tooltipElement:t.id}),y(qt,Xt,e);let p=Nt(e);Yt.set(e,p),y(Ut,Kt,t),r.visible&&Qt(e)},t=>{let e=$(t.dataset.tooltipTarget);e&&(B(qt,Xt,e),C(Yt,e),e.remove()),B(Ut,Kt,t)});var io={dynamicBehaviour:O,drop:Ht,parse:X,flush:Pt};export{io as default};
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
