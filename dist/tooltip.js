var ct="querySelectorAll",lt=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(u,h,c,d,i,p)=>{for(let l of u)(p||ct in l)&&(i?c.has(l)||(c.add(l),d.delete(l),t(l,i)):d.has(l)||(d.add(l),c.delete(l),t(l,i)),p||r(l[ct](h),h,c,d,i,!0))},s=new o(u=>{if(n.length){let h=n.join(","),c=new Set,d=new Set;for(let{addedNodes:i,removedNodes:p}of u)r(p,h,c,d,!1,!1),r(i,h,c,d,!0,!1)}}),{observe:a}=s;return(s.observe=u=>a.call(s,u,{subtree:!0,childList:!0}))(e),s};var dt="querySelectorAll",{document:le,Element:pt,MutationObserver:pe,Set:ue,WeakMap:fe}=self,ut=t=>dt in t,{filter:ft}=[],ht=t=>{let e=new fe,o=i=>{for(let p=0,{length:l}=i;p<l;p++)e.delete(i[p])},n=()=>{let i=c.takeRecords();for(let p=0,{length:l}=i;p<l;p++)a(ft.call(i[p].removedNodes,ut),!1),a(ft.call(i[p].addedNodes,ut),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,p)=>{let l;if(p)for(let m,b=r(i),E=0,{length:v}=u;E<v;E++)b.call(i,m=u[E])&&(e.has(i)||e.set(i,new ue),l=e.get(i),l.has(m)||(l.add(m),t.handle(i,p,m)));else e.has(i)&&(l=e.get(i),e.delete(i),l.forEach(m=>{t.handle(i,p,m)}))},a=(i,p=!0)=>{for(let l=0,{length:m}=i;l<m;l++)s(i[l],p)},{query:u}=t,h=t.root||le,c=lt(s,h,pe,u),{attachShadow:d}=pt.prototype;return d&&(pt.prototype.attachShadow=function(i){let p=d.call(this,i);return c.observe(p),p}),u.length&&a(h[dt](u)),{drop:o,flush:n,observer:c,parse:a}};function C(t,e){let o=t.get(e);o&&o(e)}function mt(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function xt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function S(t,e){return t.getAttribute(e)}function A(t,e){return t.dataset[e]===""||S(t,`data-${mt(e)}`)===""||Ct(t.dataset[e])}function gt(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function vt(t,e){return t.dataset[e]!==void 0}function bt(t,e,o=null){let n=B(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function z(t,e){return t.hasAttribute(e)}function yt(t,e,o=null){let n=B(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function wt(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function T(t,e,o){t.style.setProperty(`--${e}`,o)}function k(t,e){t.classList.add(e)}var N=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},At=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function y(t,e,o=null){let n=N(e,o);for(let r of W(t))n.addEventListener(r,e,At(r))}function j(t,e,o=null){let n=N(e,o);for(let r of W(t))n.addEventListener(r,e,{once:!0})}function U(t,e,o=null){let n=N(e,o);for(let r of W(t))n.removeEventListener(r,e,At(r))}function D(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function L(t,e=null,o=document){return o.getElementById(t)}function q(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function kt(t,e=null){let o=G("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function M(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function St(t){t.style.display="inherit",t.hidden=!1}function K(t){t.style.display="none",t.hidden=!0}function G(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function Ct(t){return["true","1"].includes(String(t).toLowerCase())}function W(t){return Array.isArray(t)?t:[t]}function Tt(t){return t===void 0||t===""?0:Number.parseInt(`${t}`)}function B(t){return typeof t=="object"&&t!==null}function de(t){return typeof t=="string"||t instanceof String}function Dt(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${xt(r)}`:r;vt(t,s)&&(e[r]=gt(t,s))}}function Lt(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function Mt(t,e=300){let o;return(...n)=>{X(o),o=Y(()=>{o=void 0,t(...n)},e)}}function $t(t){if(!t)return{};if(t.endsWith("()")){let o=Lt(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return Et(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function Et(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;de(n)?t[e]=Lt(n):Et(o)}return t}function Ot(t=document){return t.documentElement}function Wt(){return HTMLElement.prototype.hasOwnProperty("popover")}function Pt(){return"IntersectionObserver"in window}function he(){return window.CSS?CSS.supports("selector(:dir(rtl))"):!1}function Ht(){return window.CSS?CSS.supports("anchor-name: --foo"):!1}function Rt(t){return t.dir?t.dir==="rtl":he()?t.matches(":dir(rtl)"):document.dir==="rtl"}function X(t){t&&clearTimeout(t)}function Y(t,e=0){return setTimeout(t,e)}var Q=new WeakMap,P;Pt()&&(P=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),C(Q,r)}}));function Z(t,e){return P?(Q.set(t,e),P.observe(t),()=>(Q.delete(t),P.unobserve(t))):(e(t),()=>{})}var Vt={},_=[],Ft=window.DEBUG||!1,{drop:It,flush:zt,observer:Ye,parse:J}=ht({query:_,document,async handle(t,e,o){let n=Vt[o],r=n.initialized,s=n.lazyMap;if(Ft&&console.log(t,e,o),e){let a=()=>{r.has(t)||(n.callback(t),r.add(t))};A(t,"lazy")?s.set(t,Z(t,a)):a()}else if(await Promise.resolve(),!t.isConnected){if(C(s,t),r.has(t)){let a=n.cleanup;a&&a(t)}r.delete(t)}}});function me(t,e,o=null){let n=new WeakSet,r=new WeakMap;Vt[t]={callback:e,cleanup:o,initialized:n,lazyMap:r},Ft&&console.log(`Register selector '${t}'`),_.includes(t)||(_.push(t),J(q(t)))}var H=me;var $="floatingReposition",V="floatingHide",R=new Set,et=!1,jt=t=>{for(let e of R){let o=t.target;(o instanceof Window||o.contains(e))&&D($,e)}et=!1},Ut=t=>{et||requestAnimationFrame(()=>jt(t)),et=!0},xe=Mt(t=>{jt(t)},10);y("scroll",t=>{Ut(t),xe(t)});y("resize",Ut,window);y("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of R)D(V,o)});function ot(t){return t.split("-")[0]}function qt(t){return t.split("-")[1]}function Kt(t){return["top","bottom"].includes(ot(t))?"x":"y"}function ge(t){return t==="y"?"height":"width"}function Bt(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Nt(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function tt(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,a=Kt(o),u=ge(a),h=t[u]/2-e[u]/2,c=ot(o),d=a==="x",i;switch(c){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(qt(o)){case"start":i[a]-=h*(n&&d?-1:1);break;case"end":i[a]+=h*(n&&d?-1:1);break}return i}function Gt(t){return R.add(t),()=>{R.delete(t)}}function Xt(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=t.getClientRects(),r=e.getBoundingClientRect(),s=Rt(t),a=o.placement||"bottom",u=o.distance||0,h=o.flip||!1,c=ot(a),d=qt(a),i=Kt(a),p=a==="bottom"?n[n.length-1]:n[0];if(!p)return;let l=Ot(t.ownerDocument),m=l.clientWidth,b=l.clientHeight;window.innerWidth-m>20&&(m=window.innerWidth,b=window.innerHeight);let v=0,I=0,rt=o.scopeEl;if(rt){let x=rt.getBoundingClientRect();v=x.x,I=x.y,m=x.x+x.width,b=x.y+x.height}let f=tt(p,r,a,s),it=Tt(`${u}`);Nt(f,c,it,s);let st=128;if(h){let x=!1,w=Math.ceil(f.x),O=Math.ceil(f.y);if(i==="x"&&(O<I||O+r.height>=b)&&(O<I&&O>=b?e.style.maxHeight="90vh":r.height<=b-st&&(c=Bt(c),x=!0)),i==="y"&&(w<v||w+r.width>=m)&&(w<v&&w>=m?e.style.maxWidth="90vw":(c=Bt(c),x=!0)),i==="y"&&l.clientWidth-r.width<st&&(c="top",i="x",x=!0),x){a=d?`${c}-${d}`:c,f=tt(p,r,a,s);let ie=f.x>0?f.x:0,se=i==="x"&&f.y+r.height>l.clientHeight,ae=i==="y"&&f.x+r.width>l.clientWidth,ce=i==="y"&&ie+r.width>p.left;(se||ae||ce)&&(c="top",i="x",a=d?`${c}-${d}`:c,f=tt(p,r,a,s)),Nt(f,c,it,s)}}let g=0,at=50;if(o.shift||r.width>p.width){let x=1;f.x<v?(g=f.x-v+o.shiftPadding,f.x=v+o.shiftPadding):f.x+r.width>m&&(g=m-(f.x+r.width)-o.shiftPadding,g+f.x<0&&(g-=f.x+g),f.x+=g,x=g<0?-1:1);let w=g!==0?g/r.width*100*x:0;at=50+w}T(e,"p",`${at}%`),e.dataset.placement=a,Object.assign(e.style,{left:`${f.x}px`,top:`${f.y}px`})}var ve=`div.tooltip {
  --b: 12px;
  --h: 6px;
  --p: 50%;
  --r: 6px;
  --tooltip-color-start: var(--accent, rgb(139, 59, 210));
  --tooltip-color-end: var(--accent-hover, rgb(47, 30, 152));
  --tooltip-bg: linear-gradient(45deg, var(--tooltip-color-start), var(--tooltip-color-end));
  --tooltip-transition: 0.15s;
  --tooltip-delay: 0.1s;
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
            display var(--tooltip-transition) ease-in-out allow-discrete;

        @starting-style {
            opacity: 0;
        }
    }
    div.tooltip:not(.tooltip-click) {
        transition-delay: var(--tooltip-delay);
    }
    div.tooltip.tooltip-instant {
        transition-delay: 0s;
        --tooltip-transition: 0;
    }
    div.tooltip[hidden] {
        transition-delay: 0s;
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
@supports (anchor-name: --foo) {
    div.tooltip.tooltip-anchored {
        position-area: start span-all;
        position-try: flip-block;
        margin-inline: 0;
        margin-block: var(--tooltip-distance, 6px);
    }
    div.tooltip.tooltip-anchored:before {
        display:none;
    }
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
}`,be="tooltip-style";kt(ve,be);var nt=Wt(),ye=Ht(),Yt=["mouseover","mouseout","focus","blur","click"],Qt=[V,$],ee=!1,F=!1,oe;function ne(t){X(oe),t.classList.remove("tooltip-instant"),(F||!ee)&&t.classList.add("tooltip-instant"),nt&&t.showPopover(),St(t),D($,t),j("transitionend",e=>{M(t)&&(F=!0)},t)}function re(t){nt&&t.hidePopover(),K(t),oe=Y(()=>{M(t)||(F=!1)},150)}var Zt=t=>{let e=t.target,o=e.closest("[data-tooltip]"),n=o.dataset,r=L(n.tooltipTarget);if(!r)return;let s=t.type==="click",a=A(o,"tooltipClick"),u=A(o,"tooltipVisible"),h=A(o,"tooltipHidden"),c=null;a?s&&(t.preventDefault(),c=M(r)?"hide":"show"):s||(c=["mouseover","focus"].includes(t.type)?"show":"hide"),c==="show"?!h&&!M(r)&&ne(r):c==="hide"&&!u&&(document.activeElement!==e||s)&&re(r)},_t=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===$){let r=L(n.tooltipElement);Xt(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===V&&!e.dataset.tooltipVisible&&re(e)},Jt=new WeakMap;j("DOMContentLoaded",t=>{F=!1,ee=!0});var te=0;H("[data-tooltip]",t=>{let e,o=t.dataset,n=$t(o.tooltip);Dt(t,n,["distance","placement","target","class","title","visible","hidden","anchor"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.visible&&(o.tooltipVisible="true"),n.click&&(o.tooltipClick="true");let r=ye&&n.anchor,s=S(t,"href");!n.target&&s&&s.indexOf("#")===0&&(n.target=s.substring(1));let a=n.title||S(t,"aria-label")||S(t,"title");if(a?(te++,wt(t,"title"),e=G("div"),e.id=`tooltip-${te}`,e.innerHTML=`${a}`,e.dataset.tooltipGenerated="",(t.closest("dialog")||document.body).appendChild(e),o.tooltipTarget=e.id):n.target&&(e=L(n.target),o.tooltipTarget=n.target),!e)return;r&&(t.style.setProperty("anchor-name",`--${e.id}`),e.style.setProperty("position-anchor",`--${e.id}`),n.distance&&T(e,"tooltip-distance",`${n.distance}px`),k(e,"tooltip-anchored")),z(t,"aria-label")||yt(t,"aria-describedby",e.id),e.style.position="fixed",nt&&(e.popover=""),n.visible?e.dataset.tooltipVisible="true":K(e),k(e,"tooltip"),n.click&&k(t,"tooltip-click"),n.class&&k(e,n.class),e.role="tooltip",e.inert=!0,e.tabIndex=-1,t.id||(t.id=`${e.id}-target`),bt(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),r||y(Qt,_t,e);let u=Gt(e);Jt.set(e,u),y(Yt,Zt,t),n.visible&&ne(e)},t=>{let e=L(t.dataset.tooltipTarget);e&&(U(Qt,_t,e),C(Jt,e),e.dataset.tooltipGenerated&&e.remove()),U(Yt,Zt,t)});var po={dynamicBehaviour:H,drop:It,parse:J,flush:zt};export{po as default};
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
