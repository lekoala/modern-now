var et="querySelectorAll",ot=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,h,f,u,i,a)=>{for(let c of l)(a||et in c)&&(i?f.has(c)||(f.add(c),u.delete(c),t(c,i)):u.has(c)||(u.add(c),f.delete(c),t(c,i)),a||r(c[et](h),h,f,u,i,!0))},s=new o(l=>{if(n.length){let h=n.join(","),f=new Set,u=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,h,f,u,!1,!1),r(i,h,f,u,!0,!1)}}),{observe:p}=s;return(s.observe=l=>p.call(s,l,{subtree:!0,childList:!0}))(e),s};var st="querySelectorAll",{document:_t,Element:nt,MutationObserver:Jt,Set:Zt,WeakMap:Gt}=self,rt=t=>st in t,{filter:it}=[],at=t=>{let e=new Gt,o=i=>{for(let a=0,{length:c}=i;a<c;a++)e.delete(i[a])},n=()=>{let i=f.takeRecords();for(let a=0,{length:c}=i;a<c;a++)p(it.call(i[a].removedNodes,rt),!1),p(it.call(i[a].addedNodes,rt),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,a)=>{let c;if(a)for(let m,x=r(i),v=0,{length:J}=l;v<J;v++)x.call(i,m=l[v])&&(e.has(i)||e.set(i,new Zt),c=e.get(i),c.has(m)||(c.add(m),t.handle(i,a,m)));else e.has(i)&&(c=e.get(i),e.delete(i),c.forEach(m=>{t.handle(i,a,m)}))},p=(i,a=!0)=>{for(let c=0,{length:m}=i;c<m;c++)s(i[c],a)},{query:l}=t,h=t.root||_t,f=ot(s,h,Jt,l),{attachShadow:u}=nt.prototype;return u&&(nt.prototype.attachShadow=function(i){let a=u.call(this,i);return f.observe(a),a}),l.length&&p(h[st](l)),{drop:o,flush:n,observer:f,parse:p}};function w(t,e){let o=t.get(e);o&&o(e)}function H(t,e){return t.getAttribute(e)}function A(t,e){return t.dataset[e]===""||ht(t.dataset[e])}function ct(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function lt(t,e){return t.dataset[e]!==void 0}function ut(t,e,o=null){let n=P(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function pt(t,e,o=null){let n=P(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function ft(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function dt(t,e,o){t.style.setProperty(`--${e}`,o)}function L(t,e){t.classList.add(e)}var mt=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},gt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function b(t,e,o=null){let n=mt(e,o);for(let r of V(t))n.addEventListener(r,e,gt(r))}function R(t,e,o=null){let n=mt(e,o);for(let r of V(t))n.removeEventListener(r,e,gt(r))}function k(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function S(t,e=null,o=document){return o.getElementById(t)}function I(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function xt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function vt(t,e=null){let o=B("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function F(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function bt(t){t.style.display="inherit"}function z(t){t.style.display="none"}function B(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function ht(t){return["true","1"].includes(String(t).toLowerCase())}function V(t){return Array.isArray(t)?t:[t]}function yt(t){return t===void 0?0:Number.parseInt(`${t}`)}function P(t){return typeof t=="object"&&t!==null}function te(t){return typeof t=="string"||t instanceof String}function N(t,e=null){return t}function wt(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${xt(r)}`:r;lt(t,s)&&(e[r]=ct(t,s))}}function At(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function Ct(t,e=300){let o;return(...n)=>{ee(o),o=setTimeout(()=>{o=void 0,t(...n)},e)}}function kt(t){if(!t)return{};if(t.endsWith("()")){let o=At(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return St(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function St(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;te(n)?t[e]=At(n):St(o)}return t}function $t(){return HTMLElement.prototype.hasOwnProperty("popover")}function Mt(){return"IntersectionObserver"in window}function ee(t){t&&clearTimeout(t)}var j=new WeakMap,T;Mt()&&(T=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),w(j,r)}}));function q(t,e){return T?(j.set(t,e),T.observe(t),()=>(j.delete(t),T.unobserve(t))):(e(t),()=>{})}var Lt={},U=[],Et=new WeakMap,{drop:He,flush:Pe,observer:Re,parse:oe}=at({query:U,document,async handle(t,e,o){let n=Lt[o],r=n.initialized;if(e){let s=()=>{r.has(t)||(n.callback(t),r.add(t))};A(t,"lazy")?Et.set(t,q(t,s)):s()}else if(await Promise.resolve(),!t.isConnected&&r.has(t)){let s=n.cleanup;s&&s(t),w(Et,t),r.delete(t)}}});var Tt=(t,e,o=null)=>{let n=new WeakSet;Lt[t]={callback:e,cleanup:o,initialized:n},U.includes(t)||(U.push(t),oe(I(t)))};var $="floatingReposition",O="floatingHide",W=new Set,X=!1,Dt=t=>{for(let e of W){let o=t.target;(o instanceof Window||o.contains(e))&&k($,e)}X=!1},Ht=t=>{X||requestAnimationFrame(()=>Dt(t)),X=!0},ne=Ct(t=>{Dt(t)},10);b("scroll",t=>{Ht(t),ne(t)});b("resize",Ht,window);b("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of W)k(O,o)});function Y(t){return t.split("-")[0]}function Pt(t){return t.split("-")[1]}function Rt(t){return["top","bottom"].includes(Y(t))?"x":"y"}function re(t){return t==="y"?"height":"width"}function Wt(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Ot(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function K(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,p=Rt(o),l=re(p),h=t[l]/2-e[l]/2,f=Y(o),u=p==="x",i;switch(f){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(Pt(o)){case"start":i[p]-=h*(n&&u?-1:1);break;case"end":i[p]+=h*(n&&u?-1:1);break}return i}function Vt(t){return W.add(t),()=>{W.delete(t)}}function It(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=window.getComputedStyle(t),r=t.getClientRects(),s=e.getBoundingClientRect(),p=n.direction==="rtl",l=o.placement||"bottom",h=o.distance||0,f=o.flip||!1,u=Y(l),i=Pt(l),a=Rt(l),c=l==="bottom"?r[r.length-1]:r[0],m=t.ownerDocument.documentElement,x=m.clientWidth,v=m.clientHeight;window.innerWidth-x>20&&(x=window.innerWidth,v=window.innerHeight);let y=0,D=0,Z=o.scopeEl;if(Z){let g=Z.getBoundingClientRect();y=g.x,D=g.y,x=g.x+g.width,v=g.y+g.height}let d=K(c,s,l,p),G=yt(`${h}`);if(Ot(d,u,G,p),f){let g=!1,M=Math.ceil(d.x),E=Math.ceil(d.y);if(a==="x"&&(E<D||E+s.height>=v)&&(E<D&&E>=v?e.style.maxHeight="90vh":(u=Wt(u),g=!0)),a==="y"&&(M<y||M+s.width>=x)&&(M<y&&M>=x?e.style.maxWidth="90vw":(u=Wt(u),g=!0)),a==="y"&&m.clientWidth-s.width<100&&(u="top",a="x",g=!0),g){l=i?`${u}-${i}`:u,d=K(c,s,l,p);let Kt=d.x>0?d.x:0,Xt=a==="x"&&d.y+s.height>m.clientHeight,Yt=a==="y"&&d.x+s.width>m.clientWidth,Qt=a==="y"&&Kt+s.width>c.left;(Xt||Yt||Qt)&&(u="top",a="x",l=i?`${u}-${i}`:u,d=K(c,s,l,p)),Ot(d,u,G,p)}}let C=0,tt=50;if(o.shift||s.width>c.width){d.x<y?(C=d.x-y+o.shiftPadding,d.x=y+o.shiftPadding):d.x+s.width>x&&(C=x-(d.x+s.width)-o.shiftPadding,d.x+=C);let g=C>0?C/s.width*100:0;tt=50+g}dt(e,"p",`${tt}%`),e.dataset.placement=l,Object.assign(e.style,{left:`${d.x}px`,top:`${d.y}px`})}var ie=`
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
`,se="tooltip-style";vt(ie,se);var _=$t(),Ft=["mouseover","mouseout","focus","blur","click"],zt=[O,$];function qt(t){_&&t.showPopover(),bt(t),k($,t)}function Ut(t){_&&t.hidePopover(),z(t)}var Bt=t=>{let e=N(t.target,"div"),o=N(e.closest("[data-tooltip]"),"a"),n=o.dataset,r=S(n.tooltipTarget);if(!r)return;let s=t.type==="click",p=A(o,"tooltipClick"),l=A(o,"tooltipVisible"),h=A(o,"tooltipHidden"),f=null;p?s&&(t.preventDefault(),f=F(r)?"hide":"show"):s||(f=["mouseover","focus"].includes(t.type)?"show":"hide"),f==="show"?!h&&!F(r)&&qt(r):f==="hide"&&!l&&(document.activeElement!==e||s)&&Ut(r)},Nt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===$){let r=S(n.tooltipElement);It(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===O&&!e.dataset.tooltipVisible&&Ut(e)},jt=new WeakMap,Q=0;Tt("[data-tooltip]",t=>{let e,o=t.dataset,n=kt(o.tooltip);wt(t,n,["distance","placement","target","class","title","visible","hidden"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.visible&&(o.tooltipVisible="true"),n.click&&(o.tooltipClick="true");let r=H(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||H(t,"title");if(s?(ft(t,"title"),Q++,e=B("div"),e.id=`tooltip-${Q}`,e.style.maxWidth="40ch",e.innerHTML=`${s}`,(t.closest("dialog")||document.body).appendChild(e),o.tooltipTarget=e.id):n.target&&(e=S(n.target),o.tooltipTarget=n.target),!e)return;pt(t,"aria-describedby",`tooltip-${Q}`),e.style.position="fixed",_&&(e.popover=""),n.visible?e.dataset.tooltipVisible="true":z(e),L(e,"tooltip"),e.role="tooltip",e.inert=!0,e.tabIndex=-1,n.class&&L(e,n.class),t.id||(t.id=`${e.id}-target`),ut(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),b(zt,Nt,e);let p=Vt(e);jt.set(e,p),b(Ft,Bt,t),n.visible&&qt(e)},t=>{let e=S(t.dataset.tooltipTarget);e&&(R(zt,Nt,e),w(jt,e),e.remove()),R(Ft,Bt,t)});
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
