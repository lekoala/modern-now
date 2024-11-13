var Z="querySelectorAll",ot="querySelectorAll",{document:Rt,Element:G,MutationObserver:jt,Set:Nt,WeakMap:Vt}=self,tt=t=>ot in t,{filter:et}=[],nt=t=>{let e=new Vt,o=(s,p)=>{let a;if(p)for(let l,v=(d=>d.matches||d.webkitMatchesSelector||d.msMatchesSelector)(s),m=0,{length:y}=r;m<y;m++)v.call(s,l=r[m])&&(e.has(s)||e.set(s,new Nt),a=e.get(s),a.has(l)||(a.add(l),t.handle(s,p,l)));else e.has(s)&&(a=e.get(s),e.delete(s),a.forEach(l=>{t.handle(s,p,l)}))},n=(s,p=!0)=>{for(let a=0,{length:l}=s;a<l;a++)o(s[a],p)},{query:r}=t,i=t.root||Rt,u=((s,p=document,a=MutationObserver,l=["*"])=>{let v=(d,x,w,h,b,A)=>{for(let c of d)(A||Z in c)&&(b?w.has(c)||(w.add(c),h.delete(c),s(c,b)):h.has(c)||(h.add(c),w.delete(c),s(c,b)),A||v(c[Z](x),x,w,h,b,!0))},m=new a(d=>{if(l.length){let x=l.join(","),w=new Set,h=new Set;for(let{addedNodes:b,removedNodes:A}of d)v(A,x,w,h,!1,!1),v(b,x,w,h,!0,!1)}}),{observe:y}=m;return(m.observe=d=>y.call(m,d,{subtree:!0,childList:!0}))(p),m})(o,i,jt,r),{attachShadow:f}=G.prototype;return f&&(G.prototype.attachShadow=function(s){let p=f.call(this,s);return u.observe(p),p}),r.length&&n(i[ot](r)),{drop:s=>{for(let p=0,{length:a}=s;p<a;p++)e.delete(s[p])},flush:()=>{let s=u.takeRecords();for(let p=0,{length:a}=s;p<a;p++)n(et.call(s[p].removedNodes,tt),!1),n(et.call(s[p].addedNodes,tt),!0)},observer:u,parse:n}};var rt=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},it=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function C(t,e,o=null){let n=rt(e,o);for(let r of R(t))n.addEventListener(r,e,it(r))}function B(t,e,o=null){let n=rt(e,o);for(let r of R(t))n.removeEventListener(r,e,it(r))}function S(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function $(t,e=null,o=document){return o.getElementById(t)}function at(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function st(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function ct(t,e=null){let o=document.createElement("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function lt(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function pt(t){t.style.display="inherit"}function H(t){t.style.display="none"}function ut(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function ft(t){return["true","1"].includes(String(t).toLowerCase())}function R(t){return Array.isArray(t)?t:[t]}function dt(t){return t===void 0?0:Number.parseInt(`${t}`)}function j(t){return typeof t=="object"&&t!==null}function zt(t){return typeof t=="string"||t instanceof String}function N(t,e=null){return t}function ht(t,e,o=[],n=null){for(let r of o){let i=n?`${n}${st(r)}`:r;yt(t,i)&&(e[r]=bt(t,i))}}function mt(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function gt(t){if(!t)return{};if(t.endsWith("()")){let o=mt(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|[^,'"{]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return vt(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function vt(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;zt(n)?t[e]=mt(n):vt(o)}return t}function xt(){return"IntersectionObserver"in window}function V(t,e){return t.getAttribute(e)}function L(t,e){return t.dataset[e]===""||ft(t.dataset[e])}function bt(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function yt(t,e){return t.dataset[e]!==void 0}function wt(t,e,o=null){let n=j(e)?e:{[e]:o};for(let[r,i]of Object.entries(n))t.dataset[r]=`${i}`}function At(t,e,o=null){let n=j(e)?e:{[e]:o};for(let[r,i]of Object.entries(n))t.setAttribute(r,`${i}`)}function Ct(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function z(t,e,o){t.style.setProperty(`--${e}`,o)}function T(t,e){t.classList.add(e)}function k(t,e){let o=t.get(e);o&&typeof o=="function"&&o(e)}var q=new WeakMap,E;xt()&&(E=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),k(q,r)}}));function F(t,e){return E?(q.set(t,e),E.observe(t),()=>(q.delete(t),E.unobserve(t))):(e(t),()=>{})}var K={},U=[],kt=new WeakMap,{drop:be,flush:ye,observer:we,parse:qt}=nt({query:U,document,handle(t,e,o){if(e){let n=()=>{K[o][0](t)};L(t,"lazy")?kt.set(t,F(t,n)):n()}else{let n=K[o][1];n&&n(t),k(kt,t)}}}),Mt=(t,e,o=null)=>{K[t]=[e,o],U.includes(t)||(U.push(t),qt(at(t)))};var O="floatingReposition",P="floatingHide",I=new Set,Y=!1,Ft=t=>{for(let e of I){let o=t.target;(o instanceof Window||o.contains(e))&&S(O,e)}Y=!1},Lt=t=>{Y||requestAnimationFrame(()=>Ft(t)),Y=!0};C("scroll",Lt);C("resize",Lt,window);C("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of I)S(P,o)});function _(t){return t.split("-")[0]}function Ot(t){return t.split("-")[1]}function Dt(t){return["top","bottom"].includes(_(t))?"x":"y"}function Kt(t){return t==="y"?"height":"width"}function St(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function $t(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function X(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,i=t.y+t.height/2-e.height/2,u=Dt(o),f=Kt(u),s=t[f]/2-e[f]/2,p=_(o),a=u==="x",l;switch(p){case"top":l={x:r,y:t.y-e.height};break;case"bottom":l={x:r,y:t.y+t.height};break;case"right":l={x:t.x+t.width,y:i};break;case"left":l={x:t.x-e.width,y:i};break;default:l={x:t.x,y:t.y}}switch(Ot(o)){case"start":l[u]-=s*(n&&a?-1:1);break;case"end":l[u]+=s*(n&&a?-1:1);break}return l}function Wt(t){return I.add(t),()=>{I.delete(t)}}function Ht(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=window.getComputedStyle(t),r=t.getClientRects(),i=e.getBoundingClientRect(),u=n.direction==="rtl",f=o.placement||"bottom",s=o.distance||0,p=o.flip||!1,a=_(f),l=Ot(f),v=Dt(f),m=f==="bottom"?r[r.length-1]:r[0],y=t.ownerDocument.documentElement,d=y.clientWidth,x=y.clientHeight;window.innerWidth-d>20&&(d=window.innerWidth,x=window.innerHeight);let h=0,b=0,A=o.scopeEl;if(A){let g=A.getBoundingClientRect();h=g.x,b=g.y,d=g.x+g.width,x=g.y+g.height}let c=X(m,i,f,u),Q=dt(`${s}`);if($t(c,a,Q,u),p){let g=!1,D=Math.ceil(c.x),W=Math.ceil(c.y);v==="x"&&(W<b||W+i.height>=x)&&(W<b&&W>=x?e.style.maxHeight="90vh":(a=St(a),g=!0)),v==="y"&&(D<h||D+i.width>=d)&&(D<h&&D>=d?e.style.maxWidth="90vw":(a=St(a),g=!0)),v==="y"&&y.clientWidth-i.width<100&&(a="top",v="x",g=!0),g&&(f=l?`${a}-${l}`:a,c=X(m,i,f,u),v==="y"&&c.x+i.width>y.clientWidth&&(a="top",v="x",f=l?`${a}-${l}`:a,c=X(m,i,f,u)),$t(c,a,Q,u))}let M=0;if(o.shift||i.width>m.width){c.x<h?(M=c.x-h+o.shiftPadding,c.x=h+o.shiftPadding):c.x+i.width>d&&(M=d-(c.x+i.width)-o.shiftPadding,c.x+=M);let g=M>0?M/i.width*100:0;z(e,"p",`${50+g}%`)}else z(e,"p","50%");e.dataset.placement=f,Object.assign(e.style,{left:`${c.x}px`,top:`${c.y}px`})}var Ut=`
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
`,Xt="tooltip-style";ct(Ut,Xt);var Tt=["mouseover","mouseout","focus","blur","click"],Et=[P,O],It=t=>{let e=N(t.target,"div"),o=N(e.closest("[data-tooltip]"),"a"),n=o.dataset,r=$(n.tooltipTarget);if(!r)return;let i=t.type==="click",u=null;L(o,"tooltipClick")?i&&(t.preventDefault(),u=lt(r)?"hide":"show"):i||(u=["mouseover","focus"].includes(t.type)?"show":"hide"),u==="show"?L(o,"tooltipHidden")||(pt(r),S(O,r)):u==="hide"&&(document.activeElement!==e||i)&&H(r)},Pt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===O){let r=$(n.tooltipElement);Ht(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===P&&H(e)},Bt=new WeakMap,J=0;Mt("[data-tooltip]",t=>{let e,o=t.dataset,n=gt(o.tooltip);ht(t,n,["distance","placement","target","class","title"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.click&&(o.tooltipClick="true");let r=V(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let i=n.title||V(t,"title");if(i?(Ct(t,"title"),J++,e=ut("div"),e.id=`tooltip-${J}`,e.style.maxWidth="40ch",e.innerHTML=`${i}`,document.body.appendChild(e),o.tooltipTarget=e.id):n.target&&(e=$(n.target),o.tooltipTarget=n.target),!e)return;At(t,"aria-describedby",`tooltip-${J}`),e.style.position="fixed",H(e),T(e,"tooltip"),e.role="tooltip",e.inert=!0,e.tabIndex=-1,n.class&&T(e,n.class),t.id||(t.id=`${e.id}-target`),wt(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),C(Et,Pt,e);let u=Wt(e);Bt.set(e,u),C(Tt,It,t)},t=>{let e=$(t.dataset.tooltipTarget);e&&(B(Et,Pt,e),k(Bt,e),e.remove()),B(Tt,It,t)});
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
