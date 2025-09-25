var it="querySelectorAll",st=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(f,m,c,d,i,p)=>{for(let l of f)(p||it in l)&&(i?c.has(l)||(c.add(l),d.delete(l),t(l,i)):d.has(l)||(d.add(l),c.delete(l),t(l,i)),p||r(l[it](m),m,c,d,i,!0))},s=new o(f=>{if(n.length){let m=n.join(","),c=new Set,d=new Set;for(let{addedNodes:i,removedNodes:p}of f)r(p,m,c,d,!1,!1),r(i,m,c,d,!0,!1)}}),{observe:a}=s;return(s.observe=f=>a.call(s,f,{subtree:!0,childList:!0}))(e),s};var pt="querySelectorAll",{document:ne,Element:at,MutationObserver:re,Set:ie,WeakMap:se}=self,ct=t=>pt in t,{filter:lt}=[],ut=t=>{let e=new se,o=i=>{for(let p=0,{length:l}=i;p<l;p++)e.delete(i[p])},n=()=>{let i=c.takeRecords();for(let p=0,{length:l}=i;p<l;p++)a(lt.call(i[p].removedNodes,ct),!1),a(lt.call(i[p].addedNodes,ct),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,p)=>{let l;if(p)for(let h,y=r(i),E=0,{length:v}=f;E<v;E++)y.call(i,h=f[E])&&(e.has(i)||e.set(i,new ie),l=e.get(i),l.has(h)||(l.add(h),t.handle(i,p,h)));else e.has(i)&&(l=e.get(i),e.delete(i),l.forEach(h=>{t.handle(i,p,h)}))},a=(i,p=!0)=>{for(let l=0,{length:h}=i;l<h;l++)s(i[l],p)},{query:f}=t,m=t.root||ne,c=st(s,m,re,f),{attachShadow:d}=at.prototype;return d&&(at.prototype.attachShadow=function(i){let p=d.call(this,i);return c.observe(p),p}),f.length&&a(m[pt](f)),{drop:o,flush:n,observer:c,parse:a}};function C(t,e){let o=t.get(e);o&&o(e)}function ft(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function dt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function k(t,e){return t.getAttribute(e)}function A(t,e){return t.dataset[e]===""||k(t,`data-${ft(e)}`)===""||bt(t.dataset[e])}function ht(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function mt(t,e){return t.dataset[e]!==void 0}function xt(t,e,o=null){let n=z(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function F(t,e){return t.hasAttribute(e)}function gt(t,e,o=null){let n=z(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function vt(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function I(t,e,o){t.style.setProperty(`--${e}`,o)}function S(t,e){t.classList.add(e)}var B=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},yt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function b(t,e,o=null){let n=B(e,o);for(let r of O(t))n.addEventListener(r,e,yt(r))}function N(t,e,o=null){let n=B(e,o);for(let r of O(t))n.addEventListener(r,e,{once:!0})}function j(t,e,o=null){let n=B(e,o);for(let r of O(t))n.removeEventListener(r,e,yt(r))}function T(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function D(t,e=null,o=document){return o.getElementById(t)}function U(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function wt(t,e=null){let o=K("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function L(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function Ct(t){t.style.display="inherit",t.hidden=!1}function q(t){t.style.display="none",t.hidden=!0}function K(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function bt(t){return["true","1"].includes(String(t).toLowerCase())}function O(t){return Array.isArray(t)?t:[t]}function At(t){return t===void 0||t===""?0:Number.parseInt(`${t}`)}function z(t){return typeof t=="object"&&t!==null}function ae(t){return typeof t=="string"||t instanceof String}function kt(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${dt(r)}`:r;mt(t,s)&&(e[r]=ht(t,s))}}function St(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function Tt(t,e=300){let o;return(...n)=>{le(o),o=pe(()=>{o=void 0,t(...n)},e)}}function Dt(t){if(!t)return{};if(t.endsWith("()")){let o=St(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return Lt(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function Lt(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;ae(n)?t[e]=St(n):Lt(o)}return t}function Mt(t=document){return t.documentElement}function Et(){return HTMLElement.prototype.hasOwnProperty("popover")}function $t(){return"IntersectionObserver"in window}function ce(){return window.CSS?CSS.supports("selector(:dir(rtl))"):!1}function Ot(t){return t.dir?t.dir==="rtl":ce()?t.matches(":dir(rtl)"):document.dir==="rtl"}function le(t){t&&clearTimeout(t)}function pe(t,e=0){return setTimeout(t,e)}var G=new WeakMap,W;$t()&&(W=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),C(G,r)}}));function X(t,e){return W?(G.set(t,e),W.observe(t),()=>(G.delete(t),W.unobserve(t))):(e(t),()=>{})}var Wt={},Y=[],Ht=window.DEBUG||!1,{drop:Rt,flush:Pt,observer:Ue,parse:Q}=ut({query:Y,document,async handle(t,e,o){let n=Wt[o],r=n.initialized,s=n.lazyMap;if(Ht&&console.log(t,e,o),e){let a=()=>{r.has(t)||(n.callback(t),r.add(t))};A(t,"lazy")?s.set(t,X(t,a)):a()}else if(await Promise.resolve(),!t.isConnected){if(C(s,t),r.has(t)){let a=n.cleanup;a&&a(t)}r.delete(t)}}});function ue(t,e,o=null){let n=new WeakSet,r=new WeakMap;Wt[t]={callback:e,cleanup:o,initialized:n,lazyMap:r},Ht&&console.log(`Register selector '${t}'`),Y.includes(t)||(Y.push(t),Q(U(t)))}var H=ue;var M="floatingReposition",P="floatingHide",R=new Set,_=!1,It=t=>{for(let e of R){let o=t.target;(o instanceof Window||o.contains(e))&&T(M,e)}_=!1},zt=t=>{_||requestAnimationFrame(()=>It(t)),_=!0},fe=Tt(t=>{It(t)},10);b("scroll",t=>{zt(t),fe(t)});b("resize",zt,window);b("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of R)T(P,o)});function J(t){return t.split("-")[0]}function Bt(t){return t.split("-")[1]}function Nt(t){return["top","bottom"].includes(J(t))?"x":"y"}function de(t){return t==="y"?"height":"width"}function Vt(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Ft(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function Z(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,a=Nt(o),f=de(a),m=t[f]/2-e[f]/2,c=J(o),d=a==="x",i;switch(c){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(Bt(o)){case"start":i[a]-=m*(n&&d?-1:1);break;case"end":i[a]+=m*(n&&d?-1:1);break}return i}function jt(t){return R.add(t),()=>{R.delete(t)}}function Ut(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=t.getClientRects(),r=e.getBoundingClientRect(),s=Ot(t),a=o.placement||"bottom",f=o.distance||0,m=o.flip||!1,c=J(a),d=Bt(a),i=Nt(a),p=a==="bottom"?n[n.length-1]:n[0];if(!p)return;let l=Mt(t.ownerDocument),h=l.clientWidth,y=l.clientHeight;window.innerWidth-h>20&&(h=window.innerWidth,y=window.innerHeight);let v=0,V=0,ot=o.scopeEl;if(ot){let x=ot.getBoundingClientRect();v=x.x,V=x.y,h=x.x+x.width,y=x.y+x.height}let u=Z(p,r,a,s),nt=At(`${f}`);if(Ft(u,c,nt,s),m){let x=!1,w=Math.ceil(u.x),$=Math.ceil(u.y);if(i==="x"&&($<V||$+r.height>=y)&&($<V&&$>=y?e.style.maxHeight="90vh":(c=Vt(c),x=!0)),i==="y"&&(w<v||w+r.width>=h)&&(w<v&&w>=h?e.style.maxWidth="90vw":(c=Vt(c),x=!0)),i==="y"&&l.clientWidth-r.width<100&&(c="top",i="x",x=!0),x){a=d?`${c}-${d}`:c,u=Z(p,r,a,s);let Jt=u.x>0?u.x:0,te=i==="x"&&u.y+r.height>l.clientHeight,ee=i==="y"&&u.x+r.width>l.clientWidth,oe=i==="y"&&Jt+r.width>p.left;(te||ee||oe)&&(c="top",i="x",a=d?`${c}-${d}`:c,u=Z(p,r,a,s)),Ft(u,c,nt,s)}}let g=0,rt=50;if(o.shift||r.width>p.width){let x=1;u.x<v?(g=u.x-v+o.shiftPadding,u.x=v+o.shiftPadding):u.x+r.width>h&&(g=h-(u.x+r.width)-o.shiftPadding,g+u.x<0&&(g-=u.x+g),u.x+=g,x=g<0?-1:1);let w=g!==0?g/r.width*100*x:0;rt=50+w}I(e,"p",`${rt}%`),e.dataset.placement=a,Object.assign(e.style,{left:`${u.x}px`,top:`${u.y}px`})}var he=`div.tooltip {
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
}`,me="tooltip-style";wt(he,me);var et=Et(),qt=["mouseover","mouseout","focus","blur","click"],Kt=[P,M],tt=!1;function Zt(t){t.classList.remove("tooltip-instant"),tt&&t.classList.add("tooltip-instant"),et&&t.showPopover(),Ct(t),T(M,t),N("transitionend",e=>{L(t)&&(tt=!0)},t)}function _t(t){et&&t.hidePopover(),q(t),N("transitionend",e=>{L(t)||(tt=!1)},t)}var Gt=t=>{let e=t.target,o=e.closest("[data-tooltip]"),n=o.dataset,r=D(n.tooltipTarget);if(!r)return;let s=t.type==="click",a=A(o,"tooltipClick"),f=A(o,"tooltipVisible"),m=A(o,"tooltipHidden"),c=null;a?s&&(t.preventDefault(),c=L(r)?"hide":"show"):s||(c=["mouseover","focus"].includes(t.type)?"show":"hide"),c==="show"?!m&&!L(r)&&Zt(r):c==="hide"&&!f&&(document.activeElement!==e||s)&&_t(r)},Xt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===M){let r=D(n.tooltipElement);Ut(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===P&&!e.dataset.tooltipVisible&&_t(e)},Yt=new WeakMap,Qt=0;H("[data-tooltip]",t=>{let e,o=t.dataset,n=Dt(o.tooltip);kt(t,n,["distance","placement","target","class","title","visible","hidden"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.visible&&(o.tooltipVisible="true"),n.click&&(o.tooltipClick="true");let r=k(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||k(t,"aria-label")||k(t,"title");if(s?(vt(t,"title"),Qt++,e=K("div"),e.id=`tooltip-${Qt}`,e.innerHTML=`${s}`,e.dataset.tooltipGenerated="",(t.closest("dialog")||document.body).appendChild(e),o.tooltipTarget=e.id):n.target&&(e=D(n.target),o.tooltipTarget=n.target),!e)return;F(t,"aria-label")||gt(t,"aria-describedby",e.id),e.style.position="fixed",et&&(e.popover=""),n.visible?e.dataset.tooltipVisible="true":q(e),S(e,"tooltip"),n.click&&S(t,"tooltip-click"),n.class&&S(e,n.class),e.role="tooltip",e.inert=!0,e.tabIndex=-1,t.id||(t.id=`${e.id}-target`),xt(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),b(Kt,Xt,e);let a=jt(e);Yt.set(e,a),b(qt,Gt,t),n.visible&&Zt(e)},t=>{let e=D(t.dataset.tooltipTarget);e&&(j(Kt,Xt,e),C(Yt,e),e.dataset.tooltipGenerated&&e.remove()),j(qt,Gt,t)});var ao={dynamicBehaviour:H,drop:Rt,parse:Q,flush:Pt};export{ao as default};
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
