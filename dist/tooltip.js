var et="querySelectorAll",ot=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,m,d,u,i,a)=>{for(let c of l)(a||et in c)&&(i?d.has(c)||(d.add(c),u.delete(c),t(c,i)):u.has(c)||(u.add(c),d.delete(c),t(c,i)),a||r(c[et](m),m,d,u,i,!0))},s=new o(l=>{if(n.length){let m=n.join(","),d=new Set,u=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,m,d,u,!1,!1),r(i,m,d,u,!0,!1)}}),{observe:p}=s;return(s.observe=l=>p.call(s,l,{subtree:!0,childList:!0}))(e),s};var st="querySelectorAll",{document:qt,Element:nt,MutationObserver:Ft,Set:Ut,WeakMap:Kt}=self,rt=t=>st in t,{filter:it}=[],at=t=>{let e=new Kt,o=i=>{for(let a=0,{length:c}=i;a<c;a++)e.delete(i[a])},n=()=>{let i=d.takeRecords();for(let a=0,{length:c}=i;a<c;a++)p(it.call(i[a].removedNodes,rt),!1),p(it.call(i[a].addedNodes,rt),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,a)=>{let c;if(a)for(let h,x=r(i),v=0,{length:Z}=l;v<Z;v++)x.call(i,h=l[v])&&(e.has(i)||e.set(i,new Ut),c=e.get(i),c.has(h)||(c.add(h),t.handle(i,a,h)));else e.has(i)&&(c=e.get(i),e.delete(i),c.forEach(h=>{t.handle(i,a,h)}))},p=(i,a=!0)=>{for(let c=0,{length:h}=i;c<h;c++)s(i[c],a)},{query:l}=t,m=t.root||qt,d=ot(s,m,Ft,l),{attachShadow:u}=nt.prototype;return u&&(nt.prototype.attachShadow=function(i){let a=u.call(this,i);return d.observe(a),a}),l.length&&p(m[st](l)),{drop:o,flush:n,observer:d,parse:p}};function w(t,e){let o=t.get(e);o&&typeof o=="function"&&o(e)}function R(t,e){return t.getAttribute(e)}function I(t,e){return t.dataset[e]===""||dt(t.dataset[e])}function ct(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function lt(t,e){return t.dataset[e]!==void 0}function ut(t,e,o=null){let n=V(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function P(t,e){return t.hasAttribute(e)}function pt(t,e,o=null){let n=V(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function ft(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function B(t,e,o){t.style.setProperty(`--${e}`,o)}function L(t,e){t.classList.add(e)}var ht=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},mt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function b(t,e,o=null){let n=ht(e,o);for(let r of z(t))n.addEventListener(r,e,mt(r))}function j(t,e,o=null){let n=ht(e,o);for(let r of z(t))n.removeEventListener(r,e,mt(r))}function C(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function k(t,e=null,o=document){return o.getElementById(t)}function N(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function gt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function xt(t,e=null){let o=q("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function vt(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function bt(t){t.style.display="inherit"}function E(t){t.style.display="none"}function q(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function dt(t){return["true","1"].includes(String(t).toLowerCase())}function z(t){return Array.isArray(t)?t:[t]}function yt(t){return t===void 0?0:Number.parseInt(`${t}`)}function V(t){return typeof t=="object"&&t!==null}function Qt(t){return typeof t=="string"||t instanceof String}function F(t,e=null){return t}function wt(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${gt(r)}`:r;lt(t,s)&&(e[r]=ct(t,s))}}function At(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function Ct(t){if(!t)return{};if(t.endsWith("()")){let o=At(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|[^,'"{]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return kt(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function kt(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;Qt(n)?t[e]=At(n):kt(o)}return t}function St(){return"IntersectionObserver"in window}var U=new WeakMap,T;St()&&(T=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),w(U,r)}}));function K(t,e){return T?(U.set(t,e),T.observe(t),()=>(U.delete(t),T.unobserve(t))):(e(t),()=>{})}var $t={},Q=[],Mt=new WeakMap,W=new WeakSet,{drop:Se,flush:Me,observer:$e,parse:Xt}=at({query:Q,document,async handle(t,e,o){let n=$t[o];if(e){let r=()=>{W.has(t)||(n[0](t),W.add(t))};P(t,"data-lazy")?Mt.set(t,K(t,r)):r()}else if(await Promise.resolve(),!t.isConnected&&W.has(t)){let r=n[1];r&&r(t),w(Mt,t),W.delete(t)}}}),Lt=(t,e,o=null)=>{$t[t]=[e,o],Q.includes(t)||(Q.push(t),Xt(N(t)))};var S="floatingReposition",H="floatingHide",O=new Set,Y=!1,Yt=t=>{for(let e of O){let o=t.target;(o instanceof Window||o.contains(e))&&C(S,e)}Y=!1},Wt=t=>{Y||requestAnimationFrame(()=>Yt(t)),Y=!0};b("scroll",Wt);b("resize",Wt,window);b("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of O)C(H,o)});function _(t){return t.split("-")[0]}function Ot(t){return t.split("-")[1]}function Ht(t){return["top","bottom"].includes(_(t))?"x":"y"}function _t(t){return t==="y"?"height":"width"}function Et(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Tt(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function X(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,p=Ht(o),l=_t(p),m=t[l]/2-e[l]/2,d=_(o),u=p==="x",i;switch(d){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(Ot(o)){case"start":i[p]-=m*(n&&u?-1:1);break;case"end":i[p]+=m*(n&&u?-1:1);break}return i}function Dt(t){return O.add(t),()=>{O.delete(t)}}function Rt(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=window.getComputedStyle(t),r=t.getClientRects(),s=e.getBoundingClientRect(),p=n.direction==="rtl",l=o.placement||"bottom",m=o.distance||0,d=o.flip||!1,u=_(l),i=Ot(l),a=Ht(l),c=l==="bottom"?r[r.length-1]:r[0],h=t.ownerDocument.documentElement,x=h.clientWidth,v=h.clientHeight;window.innerWidth-x>20&&(x=window.innerWidth,v=window.innerHeight);let y=0,D=0,G=o.scopeEl;if(G){let g=G.getBoundingClientRect();y=g.x,D=g.y,x=g.x+g.width,v=g.y+g.height}let f=X(c,s,l,p),tt=yt(`${m}`);if(Tt(f,u,tt,p),d){let g=!1,M=Math.ceil(f.x),$=Math.ceil(f.y);if(a==="x"&&($<D||$+s.height>=v)&&($<D&&$>=v?e.style.maxHeight="90vh":(u=Et(u),g=!0)),a==="y"&&(M<y||M+s.width>=x)&&(M<y&&M>=x?e.style.maxWidth="90vw":(u=Et(u),g=!0)),a==="y"&&h.clientWidth-s.width<100&&(u="top",a="x",g=!0),g){l=i?`${u}-${i}`:u,f=X(c,s,l,p);let zt=a==="x"&&f.y+s.height>h.clientHeight,Nt=a==="y"&&f.x+s.width>h.clientWidth;(zt||Nt)&&(u="top",a="x",l=i?`${u}-${i}`:u,f=X(c,s,l,p)),Tt(f,u,tt,p)}}let A=0;if(o.shift||s.width>c.width){f.x<y?(A=f.x-y+o.shiftPadding,f.x=y+o.shiftPadding):f.x+s.width>x&&(A=x-(f.x+s.width)-o.shiftPadding,f.x+=A);let g=A>0?A/s.width*100:0;B(e,"p",`${50+g}%`)}else B(e,"p","50%");e.dataset.placement=l,Object.assign(e.style,{left:`${f.x}px`,top:`${f.y}px`})}var Jt=`
.tooltip {
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
  z-index: 0;
  max-width: max(40ch, 90vw);
  opacity:1;
  font-size: 0.875rem;
}
.tooltip:before {
  content: " ";
  position: absolute;
  z-index: -1;
  background-image: inherit;
  right: 0px;
  top: 0px;
  left: 0px;
  bottom: 0px;
}
.tooltip[data-placement="top"]:before {
  bottom: calc(-1*var(--h));
  clip-path: polygon(min(100%,var(--p) + var(--b)/2) calc(100% - var(--h)),var(--p) 100%,max(0%,var(--p) - var(--b)/2) calc(100% - var(--h)),50% 50%);
  -webkit-clip-path: polygon(min(100%,var(--p) + var(--b)/2) calc(100% - var(--h)),var(--p) 100%,max(0%,var(--p) - var(--b)/2) calc(100% - var(--h)),50% 50%);
}
.tooltip[data-placement="bottom"] {
  background: 0 100%/100% calc(100% + var(--h)) var(--tooltip-bg);
}
.tooltip[data-placement="bottom"]:before {
  top: calc(-1*var(--h));
  clip-path: polygon(min(100%,var(--p) + var(--b)/2) var(--h),var(--p) 0,max(0%,var(--p) - var(--b)/2) var(--h),50% 50%);
  -webkit-clip-path: polygon(min(100%,var(--p) + var(--b)/2) var(--h),var(--p) 0,max(0%,var(--p) - var(--b)/2) var(--h),50% 50%);
}
.tooltip[data-placement="right"] {
  background:  0/calc(100% + var(--h)) 100%  var(--tooltip-bg);
}
.tooltip[data-placement="right"]:before {
  left: calc(-1*var(--h));
  clip-path: polygon(var(--h) max(0%,var(--p) - var(--b)/2),0 var(--p),var(--h) min(100%,var(--p) + var(--b)/2),50% 50%);
  -webkit-clip-path: polygon(var(--h) max(0%,var(--p) - var(--b)/2),0 var(--p),var(--h) min(100%,var(--p) + var(--b)/2),50% 50%);
}
.tooltip[data-placement="left"] {
  background: 100%/calc(100% + var(--h)) 100% var(--tooltip-bg);
}
.tooltip[data-placement="left"]:before {
  right: calc(-1*var(--h));
  clip-path: polygon(calc(100% - var(--h)) max(0%,var(--p) - var(--b)/2),100% var(--p),calc(100% - var(--h)) min(100%,var(--p) + var(--b)/2),50% 50%);
  -webkit-clip-path: polygon(calc(100% - var(--h)) max(0%,var(--p) - var(--b)/2),100% var(--p),calc(100% - var(--h)) min(100%,var(--p) + var(--b)/2),50% 50%);
}
`,Zt="tooltip-style";xt(Jt,Zt);var It=["mouseover","mouseout","focus","blur","click"],Pt=[H,S],Bt=t=>{let e=F(t.target,"div"),o=F(e.closest("[data-tooltip]"),"a"),n=o.dataset,r=k(n.tooltipTarget);if(!r)return;let s=t.type==="click",p=null;I(o,"tooltipClick")?s&&(t.preventDefault(),p=vt(r)?"hide":"show"):s||(p=["mouseover","focus"].includes(t.type)?"show":"hide"),p==="show"?I(o,"tooltipHidden")||(bt(r),C(S,r)):p==="hide"&&(document.activeElement!==e||s)&&E(r)},Vt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===S){let r=k(n.tooltipElement);Rt(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===H&&E(e)},jt=new WeakMap,J=0;Lt("[data-tooltip]",t=>{let e,o=t.dataset,n=Ct(o.tooltip);wt(t,n,["distance","placement","target","class","title"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.click&&(o.tooltipClick="true");let r=R(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||R(t,"title");if(s?(ft(t,"title"),J++,e=q("div"),e.id=`tooltip-${J}`,e.style.maxWidth="40ch",e.innerHTML=`${s}`,document.body.appendChild(e),o.tooltipTarget=e.id):n.target&&(e=k(n.target),o.tooltipTarget=n.target),!e)return;pt(t,"aria-describedby",`tooltip-${J}`),e.style.position="fixed",E(e),L(e,"tooltip"),e.role="tooltip",e.inert=!0,e.tabIndex=-1,n.class&&L(e,n.class),t.id||(t.id=`${e.id}-target`),ut(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),b(Pt,Vt,e);let p=Dt(e);jt.set(e,p),b(It,Bt,t)},t=>{let e=k(t.dataset.tooltipTarget);e&&(j(Pt,Vt,e),w(jt,e),e.remove()),j(It,Bt,t)});
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
