var ot="querySelectorAll",nt=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,h,f,p,i,a)=>{for(let c of l)(a||ot in c)&&(i?f.has(c)||(f.add(c),p.delete(c),t(c,i)):p.has(c)||(p.add(c),f.delete(c),t(c,i)),a||r(c[ot](h),h,f,p,i,!0))},s=new o(l=>{if(n.length){let h=n.join(","),f=new Set,p=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,h,f,p,!1,!1),r(i,h,f,p,!0,!1)}}),{observe:u}=s;return(s.observe=l=>u.call(s,l,{subtree:!0,childList:!0}))(e),s};var at="querySelectorAll",{document:Jt,Element:rt,MutationObserver:Zt,Set:Gt,WeakMap:te}=self,it=t=>at in t,{filter:st}=[],ct=t=>{let e=new te,o=i=>{for(let a=0,{length:c}=i;a<c;a++)e.delete(i[a])},n=()=>{let i=f.takeRecords();for(let a=0,{length:c}=i;a<c;a++)u(st.call(i[a].removedNodes,it),!1),u(st.call(i[a].addedNodes,it),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,a)=>{let c;if(a)for(let m,v=r(i),x=0,{length:Z}=l;x<Z;x++)v.call(i,m=l[x])&&(e.has(i)||e.set(i,new Gt),c=e.get(i),c.has(m)||(c.add(m),t.handle(i,a,m)));else e.has(i)&&(c=e.get(i),e.delete(i),c.forEach(m=>{t.handle(i,a,m)}))},u=(i,a=!0)=>{for(let c=0,{length:m}=i;c<m;c++)s(i[c],a)},{query:l}=t,h=t.root||Jt,f=nt(s,h,Zt,l),{attachShadow:p}=rt.prototype;return p&&(rt.prototype.attachShadow=function(i){let a=p.call(this,i);return f.observe(a),a}),l.length&&u(h[at](l)),{drop:o,flush:n,observer:f,parse:u}};function w(t,e){let o=t.get(e);o&&o(e)}function P(t,e){return t.getAttribute(e)}function A(t,e){return t.dataset[e]===""||mt(t.dataset[e])}function lt(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function pt(t,e){return t.dataset[e]!==void 0}function ut(t,e,o=null){let n=R(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function ft(t,e,o=null){let n=R(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function dt(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function ht(t,e,o){t.style.setProperty(`--${e}`,o)}function L(t,e){t.classList.add(e)}var gt=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},vt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function b(t,e,o=null){let n=gt(e,o);for(let r of I(t))n.addEventListener(r,e,vt(r))}function V(t,e,o=null){let n=gt(e,o);for(let r of I(t))n.removeEventListener(r,e,vt(r))}function k(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function S(t,e=null,o=document){return o.getElementById(t)}function B(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function xt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function bt(t,e=null){let o=z("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function F(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function yt(t){t.style.display="inherit"}function j(t){t.style.display="none"}function z(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function mt(t){return["true","1"].includes(String(t).toLowerCase())}function I(t){return Array.isArray(t)?t:[t]}function wt(t){return t===void 0?0:Number.parseInt(`${t}`)}function R(t){return typeof t=="object"&&t!==null}function ee(t){return typeof t=="string"||t instanceof String}function N(t,e=null){return t}function At(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${xt(r)}`:r;pt(t,s)&&(e[r]=lt(t,s))}}function Ct(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function kt(t,e=300){let o;return(...n)=>{oe(o),o=setTimeout(()=>{o=void 0,t(...n)},e)}}function St(t){if(!t)return{};if(t.endsWith("()")){let o=Ct(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return Mt(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function Mt(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;ee(n)?t[e]=Ct(n):Mt(o)}return t}function $t(){return HTMLElement.prototype.hasOwnProperty("popover")}function Et(){return"IntersectionObserver"in window}function oe(t){t&&clearTimeout(t)}var q=new WeakMap,T;Et()&&(T=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),w(q,r)}}));function U(t,e){return T?(q.set(t,e),T.observe(t),()=>(q.delete(t),T.unobserve(t))):(e(t),()=>{})}var Tt={},K=[],Lt=new WeakMap,W=new WeakSet,{drop:Pe,flush:Re,observer:Ve,parse:ne}=ct({query:K,document,async handle(t,e,o){let n=Tt[o];if(e){let r=()=>{W.has(t)||(n[0](t),W.add(t))};A(t,"lazy")?Lt.set(t,U(t,r)):r()}else if(await Promise.resolve(),!t.isConnected&&W.has(t)){let r=n[1];r&&r(t),w(Lt,t),W.delete(t)}}});var Wt=(t,e,o=null)=>{Tt[t]=[e,o],K.includes(t)||(K.push(t),ne(B(t)))};var M="floatingReposition",D="floatingHide",O=new Set,Y=!1,Ht=t=>{for(let e of O){let o=t.target;(o instanceof Window||o.contains(e))&&k(M,e)}Y=!1},Pt=t=>{Y||requestAnimationFrame(()=>Ht(t)),Y=!0},re=kt(t=>{Ht(t)},10);b("scroll",t=>{Pt(t),re(t)});b("resize",Pt,window);b("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of O)k(D,o)});function Q(t){return t.split("-")[0]}function Rt(t){return t.split("-")[1]}function Vt(t){return["top","bottom"].includes(Q(t))?"x":"y"}function ie(t){return t==="y"?"height":"width"}function Ot(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Dt(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function X(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,u=Vt(o),l=ie(u),h=t[l]/2-e[l]/2,f=Q(o),p=u==="x",i;switch(f){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(Rt(o)){case"start":i[u]-=h*(n&&p?-1:1);break;case"end":i[u]+=h*(n&&p?-1:1);break}return i}function It(t){return O.add(t),()=>{O.delete(t)}}function Bt(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=window.getComputedStyle(t),r=t.getClientRects(),s=e.getBoundingClientRect(),u=n.direction==="rtl",l=o.placement||"bottom",h=o.distance||0,f=o.flip||!1,p=Q(l),i=Rt(l),a=Vt(l),c=l==="bottom"?r[r.length-1]:r[0],m=t.ownerDocument.documentElement,v=m.clientWidth,x=m.clientHeight;window.innerWidth-v>20&&(v=window.innerWidth,x=window.innerHeight);let y=0,H=0,G=o.scopeEl;if(G){let g=G.getBoundingClientRect();y=g.x,H=g.y,v=g.x+g.width,x=g.y+g.height}let d=X(c,s,l,u),tt=wt(`${h}`);if(Dt(d,p,tt,u),f){let g=!1,$=Math.ceil(d.x),E=Math.ceil(d.y);if(a==="x"&&(E<H||E+s.height>=x)&&(E<H&&E>=x?e.style.maxHeight="90vh":(p=Ot(p),g=!0)),a==="y"&&($<y||$+s.width>=v)&&($<y&&$>=v?e.style.maxWidth="90vw":(p=Ot(p),g=!0)),a==="y"&&m.clientWidth-s.width<100&&(p="top",a="x",g=!0),g){l=i?`${p}-${i}`:p,d=X(c,s,l,u);let Xt=d.x>0?d.x:0,Yt=a==="x"&&d.y+s.height>m.clientHeight,Qt=a==="y"&&d.x+s.width>m.clientWidth,_t=a==="y"&&Xt+s.width>c.left;(Yt||Qt||_t)&&(p="top",a="x",l=i?`${p}-${i}`:p,d=X(c,s,l,u)),Dt(d,p,tt,u)}}let C=0,et=50;if(o.shift||s.width>c.width){d.x<y?(C=d.x-y+o.shiftPadding,d.x=y+o.shiftPadding):d.x+s.width>v&&(C=v-(d.x+s.width)-o.shiftPadding,d.x+=C);let g=C>0?C/s.width*100:0;et=50+g}ht(e,"p",`${et}%`),e.dataset.placement=l,Object.assign(e.style,{left:`${d.x}px`,top:`${d.y}px`})}var se=`
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
`,ae="tooltip-style";bt(se,ae);var J=$t(),Ft=["mouseover","mouseout","focus","blur","click"],jt=[D,M];function Ut(t){J&&t.showPopover(),yt(t),k(M,t)}function Kt(t){J&&t.hidePopover(),j(t)}var zt=t=>{let e=N(t.target,"div"),o=N(e.closest("[data-tooltip]"),"a"),n=o.dataset,r=S(n.tooltipTarget);if(!r)return;let s=t.type==="click",u=A(o,"tooltipClick"),l=A(o,"tooltipVisible"),h=A(o,"tooltipHidden"),f=null;u?s&&(t.preventDefault(),f=F(r)?"hide":"show"):s||(f=["mouseover","focus"].includes(t.type)?"show":"hide"),f==="show"?!h&&!F(r)&&Ut(r):f==="hide"&&!l&&(document.activeElement!==e||s)&&Kt(r)},Nt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===M){let r=S(n.tooltipElement);Bt(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===D&&!e.dataset.tooltipVisible&&Kt(e)},qt=new WeakMap,_=0;Wt("[data-tooltip]",t=>{let e,o=t.dataset,n=St(o.tooltip);At(t,n,["distance","placement","target","class","title","visible","hidden"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.visible&&(o.tooltipVisible="true"),n.click&&(o.tooltipClick="true");let r=P(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||P(t,"title");if(s?(dt(t,"title"),_++,e=z("div"),e.id=`tooltip-${_}`,e.style.maxWidth="40ch",e.innerHTML=`${s}`,(t.closest("dialog")||document.body).appendChild(e),o.tooltipTarget=e.id):n.target&&(e=S(n.target),o.tooltipTarget=n.target),!e)return;ft(t,"aria-describedby",`tooltip-${_}`),e.style.position="fixed",J&&(e.popover=""),n.visible?e.dataset.tooltipVisible="true":j(e),L(e,"tooltip"),e.role="tooltip",e.inert=!0,e.tabIndex=-1,n.class&&L(e,n.class),t.id||(t.id=`${e.id}-target`),ut(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),b(jt,Nt,e);let u=It(e);qt.set(e,u),b(Ft,zt,t),n.visible&&Ut(e)},t=>{let e=S(t.dataset.tooltipTarget);e&&(V(jt,Nt,e),w(qt,e),e.remove()),V(Ft,zt,t)});
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
