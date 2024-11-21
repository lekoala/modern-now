var Z="querySelectorAll",G=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,h,f,p,i,a)=>{for(let c of l)(a||Z in c)&&(i?f.has(c)||(f.add(c),p.delete(c),t(c,i)):p.has(c)||(p.add(c),f.delete(c),t(c,i)),a||r(c[Z](h),h,f,p,i,!0))},s=new o(l=>{if(n.length){let h=n.join(","),f=new Set,p=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,h,f,p,!1,!1),r(i,h,f,p,!0,!1)}}),{observe:u}=s;return(s.observe=l=>u.call(s,l,{subtree:!0,childList:!0}))(e),s};var nt="querySelectorAll",{document:jt,Element:tt,MutationObserver:Nt,Set:Vt,WeakMap:zt}=self,et=t=>nt in t,{filter:ot}=[],rt=t=>{let e=new zt,o=i=>{for(let a=0,{length:c}=i;a<c;a++)e.delete(i[a])},n=()=>{let i=f.takeRecords();for(let a=0,{length:c}=i;a<c;a++)u(ot.call(i[a].removedNodes,et),!1),u(ot.call(i[a].addedNodes,et),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,a)=>{let c;if(a)for(let m,x=r(i),v=0,{length:Y}=l;v<Y;v++)x.call(i,m=l[v])&&(e.has(i)||e.set(i,new Vt),c=e.get(i),c.has(m)||(c.add(m),t.handle(i,a,m)));else e.has(i)&&(c=e.get(i),e.delete(i),c.forEach(m=>{t.handle(i,a,m)}))},u=(i,a=!0)=>{for(let c=0,{length:m}=i;c<m;c++)s(i[c],a)},{query:l}=t,h=t.root||jt,f=G(s,h,Nt,l),{attachShadow:p}=tt.prototype;return p&&(tt.prototype.attachShadow=function(i){let a=p.call(this,i);return f.observe(a),a}),l.length&&u(h[nt](l)),{drop:o,flush:n,observer:f,parse:u}};var it=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},st=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function b(t,e,o=null){let n=it(e,o);for(let r of I(t))n.addEventListener(r,e,st(r))}function R(t,e,o=null){let n=it(e,o);for(let r of I(t))n.removeEventListener(r,e,st(r))}function C(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function k(t,e=null,o=document){return o.getElementById(t)}function at(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function ct(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function lt(t,e=null){let o=document.createElement("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function pt(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function ut(t){t.style.display="inherit"}function L(t){t.style.display="none"}function ft(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function dt(t){return["true","1"].includes(String(t).toLowerCase())}function I(t){return Array.isArray(t)?t:[t]}function ht(t){return t===void 0?0:Number.parseInt(`${t}`)}function P(t){return typeof t=="object"&&t!==null}function qt(t){return typeof t=="string"||t instanceof String}function B(t,e=null){return t}function mt(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${ct(r)}`:r;wt(t,s)&&(e[r]=yt(t,s))}}function gt(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function xt(t){if(!t)return{};if(t.endsWith("()")){let o=gt(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|[^,'"{]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return vt(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function vt(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;qt(n)?t[e]=gt(n):vt(o)}return t}function bt(){return"IntersectionObserver"in window}function j(t,e){return t.getAttribute(e)}function S(t,e){return t.dataset[e]===""||dt(t.dataset[e])}function yt(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function wt(t,e){return t.dataset[e]!==void 0}function At(t,e,o=null){let n=P(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function Ct(t,e,o=null){let n=P(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function kt(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function N(t,e,o){t.style.setProperty(`--${e}`,o)}function T(t,e){t.classList.add(e)}function w(t,e){let o=t.get(e);o&&typeof o=="function"&&o(e)}var V=new WeakMap,O;bt()&&(O=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),w(V,r)}}));function z(t,e){return O?(V.set(t,e),O.observe(t),()=>(V.delete(t),O.unobserve(t))):(e(t),()=>{})}var q={},F=[],St=new WeakMap,{drop:Ae,flush:Ce,observer:ke,parse:Ft}=rt({query:F,document,handle(t,e,o){if(e){let n=()=>{q[o][0](t)};S(t,"lazy")?St.set(t,z(t,n)):n()}else{let n=q[o][1];n&&n(t),w(St,t)}}}),Mt=(t,e,o=null)=>{q[t]=[e,o],F.includes(t)||(F.push(t),Ft(at(t)))};var M="floatingReposition",W="floatingHide",D=new Set,K=!1,Ut=t=>{for(let e of D){let o=t.target;(o instanceof Window||o.contains(e))&&C(M,e)}K=!1},Lt=t=>{K||requestAnimationFrame(()=>Ut(t)),K=!0};b("scroll",Lt);b("resize",Lt,window);b("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of D)C(W,o)});function Q(t){return t.split("-")[0]}function Tt(t){return t.split("-")[1]}function Ot(t){return["top","bottom"].includes(Q(t))?"x":"y"}function Kt(t){return t==="y"?"height":"width"}function $t(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Et(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function U(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,u=Ot(o),l=Kt(u),h=t[l]/2-e[l]/2,f=Q(o),p=u==="x",i;switch(f){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(Tt(o)){case"start":i[u]-=h*(n&&p?-1:1);break;case"end":i[u]+=h*(n&&p?-1:1);break}return i}function Dt(t){return D.add(t),()=>{D.delete(t)}}function Wt(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=window.getComputedStyle(t),r=t.getClientRects(),s=e.getBoundingClientRect(),u=n.direction==="rtl",l=o.placement||"bottom",h=o.distance||0,f=o.flip||!1,p=Q(l),i=Tt(l),a=Ot(l),c=l==="bottom"?r[r.length-1]:r[0],m=t.ownerDocument.documentElement,x=m.clientWidth,v=m.clientHeight;window.innerWidth-x>20&&(x=window.innerWidth,v=window.innerHeight);let y=0,H=0,_=o.scopeEl;if(_){let g=_.getBoundingClientRect();y=g.x,H=g.y,x=g.x+g.width,v=g.y+g.height}let d=U(c,s,l,u),J=ht(`${h}`);if(Et(d,p,J,u),f){let g=!1,$=Math.ceil(d.x),E=Math.ceil(d.y);a==="x"&&(E<H||E+s.height>=v)&&(E<H&&E>=v?e.style.maxHeight="90vh":(p=$t(p),g=!0)),a==="y"&&($<y||$+s.width>=x)&&($<y&&$>=x?e.style.maxWidth="90vw":(p=$t(p),g=!0)),a==="y"&&m.clientWidth-s.width<100&&(p="top",a="x",g=!0),g&&(l=i?`${p}-${i}`:p,d=U(c,s,l,u),a==="y"&&d.x+s.width>m.clientWidth&&(p="top",a="x",l=i?`${p}-${i}`:p,d=U(c,s,l,u)),Et(d,p,J,u))}let A=0;if(o.shift||s.width>c.width){d.x<y?(A=d.x-y+o.shiftPadding,d.x=y+o.shiftPadding):d.x+s.width>x&&(A=x-(d.x+s.width)-o.shiftPadding,d.x+=A);let g=A>0?A/s.width*100:0;N(e,"p",`${50+g}%`)}else N(e,"p","50%");e.dataset.placement=l,Object.assign(e.style,{left:`${d.x}px`,top:`${d.y}px`})}var Qt=`
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
`,Xt="tooltip-style";lt(Qt,Xt);var Ht=["mouseover","mouseout","focus","blur","click"],Rt=[W,M],It=t=>{let e=B(t.target,"div"),o=B(e.closest("[data-tooltip]"),"a"),n=o.dataset,r=k(n.tooltipTarget);if(!r)return;let s=t.type==="click",u=null;S(o,"tooltipClick")?s&&(t.preventDefault(),u=pt(r)?"hide":"show"):s||(u=["mouseover","focus"].includes(t.type)?"show":"hide"),u==="show"?S(o,"tooltipHidden")||(ut(r),C(M,r)):u==="hide"&&(document.activeElement!==e||s)&&L(r)},Pt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===M){let r=k(n.tooltipElement);Wt(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===W&&L(e)},Bt=new WeakMap,X=0;Mt("[data-tooltip]",t=>{let e,o=t.dataset,n=xt(o.tooltip);mt(t,n,["distance","placement","target","class","title"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.click&&(o.tooltipClick="true");let r=j(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||j(t,"title");if(s?(kt(t,"title"),X++,e=ft("div"),e.id=`tooltip-${X}`,e.style.maxWidth="40ch",e.innerHTML=`${s}`,document.body.appendChild(e),o.tooltipTarget=e.id):n.target&&(e=k(n.target),o.tooltipTarget=n.target),!e)return;Ct(t,"aria-describedby",`tooltip-${X}`),e.style.position="fixed",L(e),T(e,"tooltip"),e.role="tooltip",e.inert=!0,e.tabIndex=-1,n.class&&T(e,n.class),t.id||(t.id=`${e.id}-target`),At(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),b(Rt,Pt,e);let u=Dt(e);Bt.set(e,u),b(Ht,It,t)},t=>{let e=k(t.dataset.tooltipTarget);e&&(R(Rt,Pt,e),w(Bt,e),e.remove()),R(Ht,It,t)});
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
