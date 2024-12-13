var nt="querySelectorAll",rt=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,h,f,p,i,a)=>{for(let c of l)(a||nt in c)&&(i?f.has(c)||(f.add(c),p.delete(c),t(c,i)):p.has(c)||(p.add(c),f.delete(c),t(c,i)),a||r(c[nt](h),h,f,p,i,!0))},s=new o(l=>{if(n.length){let h=n.join(","),f=new Set,p=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,h,f,p,!1,!1),r(i,h,f,p,!0,!1)}}),{observe:u}=s;return(s.observe=l=>u.call(s,l,{subtree:!0,childList:!0}))(e),s};var ct="querySelectorAll",{document:Qt,Element:it,MutationObserver:Xt,Set:Yt,WeakMap:_t}=self,st=t=>ct in t,{filter:at}=[],lt=t=>{let e=new _t,o=i=>{for(let a=0,{length:c}=i;a<c;a++)e.delete(i[a])},n=()=>{let i=f.takeRecords();for(let a=0,{length:c}=i;a<c;a++)u(at.call(i[a].removedNodes,st),!1),u(at.call(i[a].addedNodes,st),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,a)=>{let c;if(a)for(let m,g=r(i),x=0,{length:tt}=l;x<tt;x++)g.call(i,m=l[x])&&(e.has(i)||e.set(i,new Yt),c=e.get(i),c.has(m)||(c.add(m),t.handle(i,a,m)));else e.has(i)&&(c=e.get(i),e.delete(i),c.forEach(m=>{t.handle(i,a,m)}))},u=(i,a=!0)=>{for(let c=0,{length:m}=i;c<m;c++)s(i[c],a)},{query:l}=t,h=t.root||Qt,f=rt(s,h,Xt,l),{attachShadow:p}=it.prototype;return p&&(it.prototype.attachShadow=function(i){let a=p.call(this,i);return f.observe(a),a}),l.length&&u(h[ct](l)),{drop:o,flush:n,observer:f,parse:u}};function w(t,e){let o=t.get(e);o&&o(e)}function R(t,e){return t.getAttribute(e)}function A(t,e){return t.dataset[e]===""||mt(t.dataset[e])}function pt(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function ut(t,e){return t.dataset[e]!==void 0}function ft(t,e,o=null){let n=I(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function dt(t,e,o=null){let n=I(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function ht(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function V(t,e,o){t.style.setProperty(`--${e}`,o)}function T(t,e){t.classList.add(e)}var vt=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},gt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function b(t,e,o=null){let n=vt(e,o);for(let r of j(t))n.addEventListener(r,e,gt(r))}function B(t,e,o=null){let n=vt(e,o);for(let r of j(t))n.removeEventListener(r,e,gt(r))}function k(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function S(t,e=null,o=document){return o.getElementById(t)}function z(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function xt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function bt(t,e=null){let o=E("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function N(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function yt(t){t.style.display="inherit"}function q(t){t.style.display="none"}function E(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function mt(t){return["true","1"].includes(String(t).toLowerCase())}function j(t){return Array.isArray(t)?t:[t]}function wt(t){return t===void 0?0:Number.parseInt(`${t}`)}function I(t){return typeof t=="object"&&t!==null}function Jt(t){return typeof t=="string"||t instanceof String}function F(t,e=null){return t}function At(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${xt(r)}`:r;ut(t,s)&&(e[r]=pt(t,s))}}function Ct(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function kt(t){if(!t)return{};if(t.endsWith("()")){let o=Ct(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|[^,'"{]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return St(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function St(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;Jt(n)?t[e]=Ct(n):St(o)}return t}function Mt(){return HTMLElement.prototype.hasOwnProperty("popover")}function $t(){return"IntersectionObserver"in window}var U=new WeakMap,W;$t()&&(W=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),w(U,r)}}));function K(t,e){return W?(U.set(t,e),W.observe(t),()=>(U.delete(t),W.unobserve(t))):(e(t),()=>{})}var Tt={},Q=[],Lt=new WeakMap,O=new WeakSet,{drop:Ee,flush:We,observer:Oe,parse:Zt}=lt({query:Q,document,async handle(t,e,o){let n=Tt[o];if(e){let r=()=>{O.has(t)||(n[0](t),O.add(t))};A(t,"lazy")?Lt.set(t,K(t,r)):r()}else if(await Promise.resolve(),!t.isConnected&&O.has(t)){let r=n[1];r&&r(t),w(Lt,t),O.delete(t)}}}),Et=(t,e,o=null)=>{Tt[t]=[e,o],Q.includes(t)||(Q.push(t),Zt(z(t)))};var M="floatingReposition",D="floatingHide",H=new Set,Y=!1,Gt=t=>{for(let e of H){let o=t.target;(o instanceof Window||o.contains(e))&&k(M,e)}Y=!1},Ht=t=>{Y||requestAnimationFrame(()=>Gt(t)),Y=!0};b("scroll",Ht);b("resize",Ht,window);b("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of H)k(D,o)});function _(t){return t.split("-")[0]}function Dt(t){return t.split("-")[1]}function Pt(t){return["top","bottom"].includes(_(t))?"x":"y"}function te(t){return t==="y"?"height":"width"}function Wt(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Ot(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function X(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,u=Pt(o),l=te(u),h=t[l]/2-e[l]/2,f=_(o),p=u==="x",i;switch(f){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(Dt(o)){case"start":i[u]-=h*(n&&p?-1:1);break;case"end":i[u]+=h*(n&&p?-1:1);break}return i}function Rt(t){return H.add(t),()=>{H.delete(t)}}function Vt(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=window.getComputedStyle(t),r=t.getClientRects(),s=e.getBoundingClientRect(),u=n.direction==="rtl",l=o.placement||"bottom",h=o.distance||0,f=o.flip||!1,p=_(l),i=Dt(l),a=Pt(l),c=l==="bottom"?r[r.length-1]:r[0],m=t.ownerDocument.documentElement,g=m.clientWidth,x=m.clientHeight;window.innerWidth-g>20&&(g=window.innerWidth,x=window.innerHeight);let y=0,P=0,et=o.scopeEl;if(et){let v=et.getBoundingClientRect();y=v.x,P=v.y,g=v.x+v.width,x=v.y+v.height}let d=X(c,s,l,u),ot=wt(`${h}`);if(Ot(d,p,ot,u),f){let v=!1,$=Math.ceil(d.x),L=Math.ceil(d.y);if(a==="x"&&(L<P||L+s.height>=x)&&(L<P&&L>=x?e.style.maxHeight="90vh":(p=Wt(p),v=!0)),a==="y"&&($<y||$+s.width>=g)&&($<y&&$>=g?e.style.maxWidth="90vw":(p=Wt(p),v=!0)),a==="y"&&m.clientWidth-s.width<100&&(p="top",a="x",v=!0),v){l=i?`${p}-${i}`:p,d=X(c,s,l,u);let Ut=a==="x"&&d.y+s.height>m.clientHeight,Kt=a==="y"&&d.x+s.width>m.clientWidth;(Ut||Kt)&&(p="top",a="x",l=i?`${p}-${i}`:p,d=X(c,s,l,u)),Ot(d,p,ot,u)}}let C=0;if(o.shift||s.width>c.width){d.x<y?(C=d.x-y+o.shiftPadding,d.x=y+o.shiftPadding):d.x+s.width>g&&(C=g-(d.x+s.width)-o.shiftPadding,d.x+=C);let v=C>0?C/s.width*100:0;V(e,"p",`${50+v}%`)}else V(e,"p","50%");e.dataset.placement=l,Object.assign(e.style,{left:`${d.x}px`,top:`${d.y}px`})}var ee=`
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
`,oe="tooltip-style";bt(ee,oe);var Z=E("div");Z.id="tooltip-container";document.body.appendChild(Z);var G=Mt(),It=["mouseover","mouseout","focus","blur","click"],Bt=[D,M];function qt(t){G&&t.showPopover(),yt(t),k(M,t)}function Ft(t){G&&t.hidePopover(),q(t)}var jt=t=>{let e=F(t.target,"div"),o=F(e.closest("[data-tooltip]"),"a"),n=o.dataset,r=S(n.tooltipTarget);if(!r)return;let s=t.type==="click",u=A(o,"tooltipClick"),l=A(o,"tooltipVisible"),h=A(o,"tooltipHidden"),f=null;u?s&&(t.preventDefault(),f=N(r)?"hide":"show"):s||(f=["mouseover","focus"].includes(t.type)?"show":"hide"),f==="show"?!h&&!N(r)&&qt(r):f==="hide"&&!l&&(document.activeElement!==e||s)&&Ft(r)},zt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===M){let r=S(n.tooltipElement);Vt(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===D&&!e.dataset.tooltipVisible&&Ft(e)},Nt=new WeakMap,J=0;Et("[data-tooltip]",t=>{let e,o=t.dataset,n=kt(o.tooltip);At(t,n,["distance","placement","target","class","title","visible","hidden"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.visible&&(o.tooltipVisible="true"),n.click&&(o.tooltipClick="true");let r=R(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||R(t,"title");if(s?(ht(t,"title"),J++,e=E("div"),e.id=`tooltip-${J}`,e.style.maxWidth="40ch",e.innerHTML=`${s}`,(t.closest("dialog")||Z).appendChild(e),o.tooltipTarget=e.id):n.target&&(e=S(n.target),o.tooltipTarget=n.target),!e)return;dt(t,"aria-describedby",`tooltip-${J}`),e.style.position="fixed",G&&(e.popover=""),n.visible?e.dataset.tooltipVisible="true":q(e),T(e,"tooltip"),e.role="tooltip",e.inert=!0,e.tabIndex=-1,n.class&&T(e,n.class),t.id||(t.id=`${e.id}-target`),ft(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),b(Bt,zt,e);let u=Rt(e);Nt.set(e,u),b(It,jt,t),n.visible&&qt(e)},t=>{let e=S(t.dataset.tooltipTarget);e&&(B(Bt,zt,e),w(Nt,e),e.remove()),B(It,jt,t)});
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
