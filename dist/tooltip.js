var et="querySelectorAll",ot=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(f,m,c,d,i,p)=>{for(let l of f)(p||et in l)&&(i?c.has(l)||(c.add(l),d.delete(l),t(l,i)):d.has(l)||(d.add(l),c.delete(l),t(l,i)),p||r(l[et](m),m,c,d,i,!0))},s=new o(f=>{if(n.length){let m=n.join(","),c=new Set,d=new Set;for(let{addedNodes:i,removedNodes:p}of f)r(p,m,c,d,!1,!1),r(i,m,c,d,!0,!1)}}),{observe:a}=s;return(s.observe=f=>a.call(s,f,{subtree:!0,childList:!0}))(e),s};var st="querySelectorAll",{document:te,Element:nt,MutationObserver:ee,Set:oe,WeakMap:ne}=self,rt=t=>st in t,{filter:it}=[],at=t=>{let e=new ne,o=i=>{for(let p=0,{length:l}=i;p<l;p++)e.delete(i[p])},n=()=>{let i=c.takeRecords();for(let p=0,{length:l}=i;p<l;p++)a(it.call(i[p].removedNodes,rt),!1),a(it.call(i[p].addedNodes,rt),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,p)=>{let l;if(p)for(let h,y=r(i),M=0,{length:v}=f;M<v;M++)y.call(i,h=f[M])&&(e.has(i)||e.set(i,new oe),l=e.get(i),l.has(h)||(l.add(h),t.handle(i,p,h)));else e.has(i)&&(l=e.get(i),e.delete(i),l.forEach(h=>{t.handle(i,p,h)}))},a=(i,p=!0)=>{for(let l=0,{length:h}=i;l<h;l++)s(i[l],p)},{query:f}=t,m=t.root||te,c=ot(s,m,ee,f),{attachShadow:d}=nt.prototype;return d&&(nt.prototype.attachShadow=function(i){let p=d.call(this,i);return c.observe(p),p}),f.length&&a(m[st](f)),{drop:o,flush:n,observer:c,parse:a}};function C(t,e){let o=t.get(e);o&&o(e)}function ct(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function lt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function L(t,e){return t.getAttribute(e)}function A(t,e){return t.dataset[e]===""||L(t,`data-${ct(e)}`)===""||mt(t.dataset[e])}function pt(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function ut(t,e){return t.dataset[e]!==void 0}function ft(t,e,o=null){let n=V(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function dt(t,e,o=null){let n=V(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function ht(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function P(t,e,o){t.style.setProperty(`--${e}`,o)}function k(t,e){t.classList.add(e)}var xt=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},gt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function b(t,e,o=null){let n=xt(e,o);for(let r of z(t))n.addEventListener(r,e,gt(r))}function I(t,e,o=null){let n=xt(e,o);for(let r of z(t))n.removeEventListener(r,e,gt(r))}function S(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function T(t,e=null,o=document){return o.getElementById(t)}function B(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function vt(t,e=null){let o=j("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function F(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function bt(t){t.style.display="inherit",t.hidden=!1}function N(t){t.style.display="none",t.hidden=!0}function j(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function mt(t){return["true","1"].includes(String(t).toLowerCase())}function z(t){return Array.isArray(t)?t:[t]}function yt(t){return t===void 0?0:Number.parseInt(`${t}`)}function V(t){return typeof t=="object"&&t!==null}function re(t){return typeof t=="string"||t instanceof String}function wt(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${lt(r)}`:r;ut(t,s)&&(e[r]=pt(t,s))}}function Ct(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function At(t,e=300){let o;return(...n)=>{se(o),o=setTimeout(()=>{o=void 0,t(...n)},e)}}function kt(t){if(!t)return{};if(t.endsWith("()")){let o=Ct(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return St(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function St(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;re(n)?t[e]=Ct(n):St(o)}return t}function Tt(t=document){return t.documentElement}function Dt(){return HTMLElement.prototype.hasOwnProperty("popover")}function Mt(){return"IntersectionObserver"in window}function ie(){return window.CSS?CSS.supports("selector(:dir(rtl))"):!1}function Et(t){return t.dir?t.dir==="rtl":ie()?t.matches(":dir(rtl)"):document.dir==="rtl"}function se(t){t&&clearTimeout(t)}var U=new WeakMap,$;Mt()&&($=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),C(U,r)}}));function q(t,e){return $?(U.set(t,e),$.observe(t),()=>(U.delete(t),$.unobserve(t))):(e(t),()=>{})}var Lt={},K=[],$t=window.DEBUG||!1,{drop:Ot,flush:Wt,observer:Fe,parse:X}=at({query:K,document,async handle(t,e,o){let n=Lt[o],r=n.initialized,s=n.lazyMap;if($t&&console.log(t,e,o),e){let a=()=>{r.has(t)||(n.callback(t),r.add(t))};A(t,"lazy")?s.set(t,q(t,a)):a()}else if(await Promise.resolve(),!t.isConnected){if(C(s,t),r.has(t)){let a=n.cleanup;a&&a(t)}r.delete(t)}}});function ae(t,e,o=null){let n=new WeakSet,r=new WeakMap;Lt[t]={callback:e,cleanup:o,initialized:n,lazyMap:r},$t&&console.log(`Register selector '${t}'`),K.includes(t)||(K.push(t),X(B(t)))}var O=ae;var D="floatingReposition",H="floatingHide",W=new Set,Q=!1,Pt=t=>{for(let e of W){let o=t.target;(o instanceof Window||o.contains(e))&&S(D,e)}Q=!1},Vt=t=>{Q||requestAnimationFrame(()=>Pt(t)),Q=!0},ce=At(t=>{Pt(t)},10);b("scroll",t=>{Vt(t),ce(t)});b("resize",Vt,window);b("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of W)S(H,o)});function G(t){return t.split("-")[0]}function It(t){return t.split("-")[1]}function zt(t){return["top","bottom"].includes(G(t))?"x":"y"}function le(t){return t==="y"?"height":"width"}function Ht(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Rt(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function Y(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,a=zt(o),f=le(a),m=t[f]/2-e[f]/2,c=G(o),d=a==="x",i;switch(c){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(It(o)){case"start":i[a]-=m*(n&&d?-1:1);break;case"end":i[a]+=m*(n&&d?-1:1);break}return i}function Bt(t){return W.add(t),()=>{W.delete(t)}}function Ft(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=t.getClientRects(),r=e.getBoundingClientRect(),s=Et(t),a=o.placement||"bottom",f=o.distance||0,m=o.flip||!1,c=G(a),d=It(a),i=zt(a),p=a==="bottom"?n[n.length-1]:n[0],l=Tt(t.ownerDocument),h=l.clientWidth,y=l.clientHeight;window.innerWidth-h>20&&(h=window.innerWidth,y=window.innerHeight);let v=0,R=0,_=o.scopeEl;if(_){let x=_.getBoundingClientRect();v=x.x,R=x.y,h=x.x+x.width,y=x.y+x.height}let u=Y(p,r,a,s),J=yt(`${f}`);if(Rt(u,c,J,s),m){let x=!1,w=Math.ceil(u.x),E=Math.ceil(u.y);if(i==="x"&&(E<R||E+r.height>=y)&&(E<R&&E>=y?e.style.maxHeight="90vh":(c=Ht(c),x=!0)),i==="y"&&(w<v||w+r.width>=h)&&(w<v&&w>=h?e.style.maxWidth="90vw":(c=Ht(c),x=!0)),i==="y"&&l.clientWidth-r.width<100&&(c="top",i="x",x=!0),x){a=d?`${c}-${d}`:c,u=Y(p,r,a,s);let Gt=u.x>0?u.x:0,Zt=i==="x"&&u.y+r.height>l.clientHeight,_t=i==="y"&&u.x+r.width>l.clientWidth,Jt=i==="y"&&Gt+r.width>p.left;(Zt||_t||Jt)&&(c="top",i="x",a=d?`${c}-${d}`:c,u=Y(p,r,a,s)),Rt(u,c,J,s)}}let g=0,tt=50;if(o.shift||r.width>p.width){let x=1;u.x<v?(g=u.x-v+o.shiftPadding,u.x=v+o.shiftPadding):u.x+r.width>h&&(g=h-(u.x+r.width)-o.shiftPadding,g+u.x<0&&(g-=u.x+g),u.x+=g,x=g<0?-1:1);let w=g!==0?g/r.width*100*x:0;tt=50+w}P(e,"p",`${tt}%`),e.dataset.placement=a,Object.assign(e.style,{left:`${u.x}px`,top:`${u.y}px`})}var pe=`div.tooltip {
  --b: 12px;
  --h: 6px;
  --p: 50%;
  --r: 6px;
  --tooltip-color-start: var(--accent, rgb(139, 59, 210));
  --tooltip-color-end: var(--accent-hover, rgb(47, 30, 152));
  --tooltip-bg: linear-gradient(45deg, var(--tooltip-color-start), var(--tooltip-color-end));
  --tooltip-transition: 0.15s;
  --tooltip-scale: 0.9;
  pointer-events: none;
  user-select: none;
  padding: 0.125em 0.5em;
  color: #fff;
  border: 0;
  border-radius: min(var(--r),var(--p) - var(--b)/2) min(var(--r),100% - var(--p) - var(--b)/2) var(--r) var(--r)/var(--r);
  background: 0 0/100% calc(100% + var(--h)) var(--tooltip-bg);
  position: relative;
  overflow: visible;
  inset: unset;
  z-index: 0;
  max-width: max(40ch, 90vw);
  opacity: 1;
  font-size: 0.875rem;
  box-shadow:
    inset 0 0 0.5px 1px hsla(0, 0%,  100%, 0.1),
    0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.5px 0.5px hsla(0, 0%, 0%, 0.04),
    0 1px 1.5px hsla(0, 0%, 0%, 0.08),
    0 3px 6px hsla(0, 0%, 0%, 0.14);
}
@media (prefers-reduced-motion: no-preference) {
    div.tooltip {
        transition:
            opacity var(--tooltip-transition) ease-in-out,
            scale var(--tooltip-transition) ease-in-out,
            display var(--tooltip-transition) ease-in-out allow-discrete;

        @starting-style {
            opacity: 0;
            scale: var(--tooltip-scale);
        }
    }
    div.tooltip:not(.tooltip-click) {
        transition-delay: var(--tooltip-transition);
    }
    div.tooltip[hidden] {
        transition-delay: 0s;
        scale: var(--tooltip-scale);
        opacity:0;
    }
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
}`,ue="tooltip-style";vt(pe,ue);var Z=Dt(),Nt=["mouseover","mouseout","focus","blur","click"],jt=[H,D];function Yt(t){Z&&t.showPopover(),bt(t),S(D,t)}function Qt(t){Z&&t.hidePopover(),N(t)}var Ut=t=>{let e=t.target,o=e.closest("[data-tooltip]"),n=o.dataset,r=T(n.tooltipTarget);if(!r)return;let s=t.type==="click",a=A(o,"tooltipClick"),f=A(o,"tooltipVisible"),m=A(o,"tooltipHidden"),c=null;a?s&&(t.preventDefault(),c=F(r)?"hide":"show"):s||(c=["mouseover","focus"].includes(t.type)?"show":"hide"),c==="show"?!m&&!F(r)&&Yt(r):c==="hide"&&!f&&(document.activeElement!==e||s)&&Qt(r)},qt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===D){let r=T(n.tooltipElement);Ft(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===H&&!e.dataset.tooltipVisible&&Qt(e)},Kt=new WeakMap,Xt=0;O("[data-tooltip]",t=>{let e,o=t.dataset,n=kt(o.tooltip);wt(t,n,["distance","placement","target","class","title","visible","hidden"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.visible&&(o.tooltipVisible="true"),n.click&&(o.tooltipClick="true");let r=L(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||L(t,"title");if(s?(ht(t,"title"),Xt++,e=j("div"),e.id=`tooltip-${Xt}`,e.innerHTML=`${s}`,(t.closest("dialog")||document.body).appendChild(e),o.tooltipTarget=e.id):n.target&&(e=T(n.target),o.tooltipTarget=n.target),!e)return;dt(t,"aria-describedby",e.id),e.style.position="fixed",Z&&(e.popover=""),n.visible?e.dataset.tooltipVisible="true":N(e),k(e,"tooltip"),n.click&&k(t,"tooltip-click"),n.class&&k(e,n.class),e.role="tooltip",e.inert=!0,e.tabIndex=-1,t.id||(t.id=`${e.id}-target`),ft(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),b(jt,qt,e);let a=Bt(e);Kt.set(e,a),b(Nt,Ut,t),n.visible&&Yt(e)},t=>{let e=T(t.dataset.tooltipTarget);e&&(I(jt,qt,e),C(Kt,e),e.remove()),I(Nt,Ut,t)});var oo={dynamicBehaviour:O,drop:Ot,parse:X,flush:Wt};export{oo as default};
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
