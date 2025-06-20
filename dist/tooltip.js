var et="querySelectorAll",ot=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,h,f,u,i,a)=>{for(let c of l)(a||et in c)&&(i?f.has(c)||(f.add(c),u.delete(c),t(c,i)):u.has(c)||(u.add(c),f.delete(c),t(c,i)),a||r(c[et](h),h,f,u,i,!0))},s=new o(l=>{if(n.length){let h=n.join(","),f=new Set,u=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,h,f,u,!1,!1),r(i,h,f,u,!0,!1)}}),{observe:p}=s;return(s.observe=l=>p.call(s,l,{subtree:!0,childList:!0}))(e),s};var st="querySelectorAll",{document:te,Element:nt,MutationObserver:ee,Set:oe,WeakMap:ne}=self,rt=t=>st in t,{filter:it}=[],at=t=>{let e=new ne,o=i=>{for(let a=0,{length:c}=i;a<c;a++)e.delete(i[a])},n=()=>{let i=f.takeRecords();for(let a=0,{length:c}=i;a<c;a++)p(it.call(i[a].removedNodes,rt),!1),p(it.call(i[a].addedNodes,rt),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,s=(i,a)=>{let c;if(a)for(let m,v=r(i),b=0,{length:Z}=l;b<Z;b++)v.call(i,m=l[b])&&(e.has(i)||e.set(i,new oe),c=e.get(i),c.has(m)||(c.add(m),t.handle(i,a,m)));else e.has(i)&&(c=e.get(i),e.delete(i),c.forEach(m=>{t.handle(i,a,m)}))},p=(i,a=!0)=>{for(let c=0,{length:m}=i;c<m;c++)s(i[c],a)},{query:l}=t,h=t.root||te,f=ot(s,h,ee,l),{attachShadow:u}=nt.prototype;return u&&(nt.prototype.attachShadow=function(i){let a=u.call(this,i);return f.observe(a),a}),l.length&&p(h[st](l)),{drop:o,flush:n,observer:f,parse:p}};function A(t,e){let o=t.get(e);o&&o(e)}function ct(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function lt(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function L(t,e){return t.getAttribute(e)}function k(t,e){return t.dataset[e]===""||L(t,`data-${ct(e)}`)===""||xt(t.dataset[e])}function pt(t,e){let o=t.dataset[e];return o==="false"?!1:o==="true"?!0:o}function ut(t,e){return t.dataset[e]!==void 0}function ft(t,e,o=null){let n=R(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.dataset[r]=`${s}`}function dt(t,e,o=null){let n=R(e)?e:{[e]:o};for(let[r,s]of Object.entries(n))t.setAttribute(r,`${s}`)}function ht(t,e){if(!t)return;let o=Array.isArray(e)?e:[e];for(let n of o)t.removeAttribute(n)}function mt(t,e,o){t.style.setProperty(`--${e}`,o)}function S(t,e){t.classList.add(e)}var vt=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},gt=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function y(t,e,o=null){let n=vt(e,o);for(let r of V(t))n.addEventListener(r,e,gt(r))}function B(t,e,o=null){let n=vt(e,o);for(let r of V(t))n.removeEventListener(r,e,gt(r))}function $(t,e=document,o={},n=!1){let r={};n&&(r.bubbles=!0),o&&(r.detail=o),e.dispatchEvent(new CustomEvent(t,r))}function T(t,e=null,o=document){return o.getElementById(t)}function I(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function bt(t,e=null){let o=N("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function z(t){return!(t.offsetWidth===0||t.offsetHeight===0||t.style.display==="none"||t.style.visibility==="hidden")}function yt(t){t.style.display="inherit",t.hidden=!1}function F(t){t.style.display="none",t.hidden=!0}function N(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function xt(t){return["true","1"].includes(String(t).toLowerCase())}function V(t){return Array.isArray(t)?t:[t]}function wt(t){return t===void 0?0:Number.parseInt(`${t}`)}function R(t){return typeof t=="object"&&t!==null}function re(t){return typeof t=="string"||t instanceof String}function Ct(t,e,o=[],n=null){for(let r of o){let s=n?`${n}${lt(r)}`:r;ut(t,s)&&(e[r]=pt(t,s))}}function At(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function kt(t,e=300){let o;return(...n)=>{ie(o),o=setTimeout(()=>{o=void 0,t(...n)},e)}}function St(t){if(!t)return{};if(t.endsWith("()")){let o=At(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return $t(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function $t(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;re(n)?t[e]=At(n):$t(o)}return t}function Tt(t=document){return t.documentElement}function Mt(){return HTMLElement.prototype.hasOwnProperty("popover")}function Et(){return"IntersectionObserver"in window}function ie(t){t&&clearTimeout(t)}var j=new WeakMap,D;Et()&&(D=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),A(j,r)}}));function U(t,e){return D?(j.set(t,e),D.observe(t),()=>(j.delete(t),D.unobserve(t))):(e(t),()=>{})}var Lt={},q=[],Dt=window.DEBUG||!1,{drop:Ot,flush:Wt,observer:ze,parse:K}=at({query:q,document,async handle(t,e,o){let n=Lt[o],r=n.initialized,s=n.lazyMap;if(Dt&&console.log(t,e,o),e){let p=()=>{r.has(t)||(n.callback(t),r.add(t))};k(t,"lazy")?s.set(t,U(t,p)):p()}else if(await Promise.resolve(),!t.isConnected){if(A(s,t),r.has(t)){let p=n.cleanup;p&&p(t)}r.delete(t)}}});function se(t,e,o=null){let n=new WeakSet,r=new WeakMap;Lt[t]={callback:e,cleanup:o,initialized:n,lazyMap:r},Dt&&console.log(`Register selector '${t}'`),q.includes(t)||(q.push(t),K(I(t)))}var O=se;var M="floatingReposition",H="floatingHide",W=new Set,Y=!1,Rt=t=>{for(let e of W){let o=t.target;(o instanceof Window||o.contains(e))&&$(M,e)}Y=!1},Bt=t=>{Y||requestAnimationFrame(()=>Rt(t)),Y=!0},ae=kt(t=>{Rt(t)},10);y("scroll",t=>{Bt(t),ae(t)});y("resize",Bt,window);y("keydown",t=>{if(t.key==="Escape"&&!(t.ctrlKey||t.altKey||t.shiftKey))for(let o of W)$(H,o)});function Q(t){return t.split("-")[0]}function Vt(t){return t.split("-")[1]}function It(t){return["top","bottom"].includes(Q(t))?"x":"y"}function ce(t){return t==="y"?"height":"width"}function Ht(t){if(t==="top")return"bottom";if(t==="bottom")return"top";if(t==="left")return"right";if(t==="right")return"left"}function Pt(t,e,o,n=!1){switch(e){case"top":t.y-=o;break;case"bottom":t.y+=o;break;case"left":t.x+=n?o:-o;break;case"right":t.x+=n?-o:o;break;default:console.warn(`Invalid side ${e}`)}}function X(t,e,o,n=!1){let r=t.x+t.width/2-e.width/2,s=t.y+t.height/2-e.height/2,p=It(o),l=ce(p),h=t[l]/2-e[l]/2,f=Q(o),u=p==="x",i;switch(f){case"top":i={x:r,y:t.y-e.height};break;case"bottom":i={x:r,y:t.y+t.height};break;case"right":i={x:t.x+t.width,y:s};break;case"left":i={x:t.x-e.width,y:s};break;default:i={x:t.x,y:t.y}}switch(Vt(o)){case"start":i[p]-=h*(n&&u?-1:1);break;case"end":i[p]+=h*(n&&u?-1:1);break}return i}function zt(t){return W.add(t),()=>{W.delete(t)}}function Ft(t,e,o={}){if(e.style.display==="none"||e.style.visibility==="hidden")return;let n=window.getComputedStyle(t),r=t.getClientRects(),s=e.getBoundingClientRect(),p=n.direction==="rtl",l=o.placement||"bottom",h=o.distance||0,f=o.flip||!1,u=Q(l),i=Vt(l),a=It(l),c=l==="bottom"?r[r.length-1]:r[0],m=Tt(t.ownerDocument),v=m.clientWidth,b=m.clientHeight;window.innerWidth-v>20&&(v=window.innerWidth,b=window.innerHeight);let w=0,P=0,_=o.scopeEl;if(_){let x=_.getBoundingClientRect();w=x.x,P=x.y,v=x.x+x.width,b=x.y+x.height}let d=X(c,s,l,p),J=wt(`${h}`);if(Pt(d,u,J,p),f){let x=!1,C=Math.ceil(d.x),E=Math.ceil(d.y);if(a==="x"&&(E<P||E+s.height>=b)&&(E<P&&E>=b?e.style.maxHeight="90vh":(u=Ht(u),x=!0)),a==="y"&&(C<w||C+s.width>=v)&&(C<w&&C>=v?e.style.maxWidth="90vw":(u=Ht(u),x=!0)),a==="y"&&m.clientWidth-s.width<100&&(u="top",a="x",x=!0),x){l=i?`${u}-${i}`:u,d=X(c,s,l,p);let Gt=d.x>0?d.x:0,Zt=a==="x"&&d.y+s.height>m.clientHeight,_t=a==="y"&&d.x+s.width>m.clientWidth,Jt=a==="y"&&Gt+s.width>c.left;(Zt||_t||Jt)&&(u="top",a="x",l=i?`${u}-${i}`:u,d=X(c,s,l,p)),Pt(d,u,J,p)}}let g=0,tt=50;if(o.shift||s.width>c.width){let x=1;d.x<w?(g=d.x-w+o.shiftPadding,d.x=w+o.shiftPadding):d.x+s.width>v&&(g=v-(d.x+s.width)-o.shiftPadding,g+d.x<0&&(g-=d.x+g),d.x+=g,x=g<0?-1:1);let C=g!==0?g/s.width*100*x:0;tt=50+C}mt(e,"p",`${tt}%`),e.dataset.placement=l,Object.assign(e.style,{left:`${d.x}px`,top:`${d.y}px`})}var le=`div.tooltip {
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
}`,pe="tooltip-style";bt(le,pe);var G=Mt(),Nt=["mouseover","mouseout","focus","blur","click"],jt=[H,M];function Yt(t){G&&t.showPopover(),yt(t),$(M,t)}function Qt(t){G&&t.hidePopover(),F(t)}var Ut=t=>{let e=t.target,o=e.closest("[data-tooltip]"),n=o.dataset,r=T(n.tooltipTarget);if(!r)return;let s=t.type==="click",p=k(o,"tooltipClick"),l=k(o,"tooltipVisible"),h=k(o,"tooltipHidden"),f=null;p?s&&(t.preventDefault(),f=z(r)?"hide":"show"):s||(f=["mouseover","focus"].includes(t.type)?"show":"hide"),f==="show"?!h&&!z(r)&&Yt(r):f==="hide"&&!l&&(document.activeElement!==e||s)&&Qt(r)},qt=t=>{let e=t.target,o=t.type,n=e.dataset;if(o===M){let r=T(n.tooltipElement);Ft(r,e,{placement:n.tooltipPlacement,distance:n.tooltipDistance,flip:!0,shift:!0,shiftPadding:6})}o===H&&!e.dataset.tooltipVisible&&Qt(e)},Kt=new WeakMap,Xt=0;O("[data-tooltip]",t=>{let e,o=t.dataset,n=St(o.tooltip);Ct(t,n,["distance","placement","target","class","title","visible","hidden"],"tooltip"),n.hidden&&(o.tooltipHidden="true"),n.visible&&(o.tooltipVisible="true"),n.click&&(o.tooltipClick="true");let r=L(t,"href");!n.target&&r&&r.indexOf("#")===0&&(n.target=r.substring(1));let s=n.title||L(t,"title");if(s?(ht(t,"title"),Xt++,e=N("div"),e.id=`tooltip-${Xt}`,e.innerHTML=`${s}`,(t.closest("dialog")||document.body).appendChild(e),o.tooltipTarget=e.id):n.target&&(e=T(n.target),o.tooltipTarget=n.target),!e)return;dt(t,"aria-describedby",e.id),e.style.position="fixed",G&&(e.popover=""),n.visible?e.dataset.tooltipVisible="true":F(e),S(e,"tooltip"),n.click&&S(t,"tooltip-click"),n.class&&S(e,n.class),e.role="tooltip",e.inert=!0,e.tabIndex=-1,t.id||(t.id=`${e.id}-target`),ft(e,{tooltipPlacement:n.placement||"top",tooltipDistance:n.distance||"6",tooltipElement:t.id}),y(jt,qt,e);let p=zt(e);Kt.set(e,p),y(Nt,Ut,t),n.visible&&Yt(e)},t=>{let e=T(t.dataset.tooltipTarget);e&&(B(jt,qt,e),A(Kt,e),e.remove()),B(Nt,Ut,t)});var eo={dynamicBehaviour:O,drop:Ot,parse:K,flush:Wt};export{eo as default};
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - tooltip build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
