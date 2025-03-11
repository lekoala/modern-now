var $="querySelectorAll",I=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,d,f,p,i,a)=>{for(let s of l)(a||$ in s)&&(i?f.has(s)||(f.add(s),p.delete(s),t(s,i)):p.has(s)||(p.add(s),f.delete(s),t(s,i)),a||r(s[$](d),d,f,p,i,!0))},u=new o(l=>{if(n.length){let d=n.join(","),f=new Set,p=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,d,f,p,!1,!1),r(i,d,f,p,!0,!1)}}),{observe:c}=u;return(u.observe=l=>c.call(u,l,{subtree:!0,childList:!0}))(e),u};var j="querySelectorAll",{document:ft,Element:W,MutationObserver:pt,Set:dt,WeakMap:mt}=self,B=t=>j in t,{filter:F}=[],N=t=>{let e=new mt,o=i=>{for(let a=0,{length:s}=i;a<s;a++)e.delete(i[a])},n=()=>{let i=f.takeRecords();for(let a=0,{length:s}=i;a<s;a++)c(F.call(i[a].removedNodes,B),!1),c(F.call(i[a].addedNodes,B),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,u=(i,a)=>{let s;if(a)for(let m,ut=r(i),C=0,{length:lt}=l;C<lt;C++)ut.call(i,m=l[C])&&(e.has(i)||e.set(i,new dt),s=e.get(i),s.has(m)||(s.add(m),t.handle(i,a,m)));else e.has(i)&&(s=e.get(i),e.delete(i),s.forEach(m=>{t.handle(i,a,m)}))},c=(i,a=!0)=>{for(let s=0,{length:m}=i;s<m;s++)u(i[s],a)},{query:l}=t,d=t.root||ft,f=I(u,d,pt,l),{attachShadow:p}=W.prototype;return p&&(W.prototype.attachShadow=function(i){let a=p.call(this,i);return f.observe(a),a}),l.length&&c(d[j](l)),{drop:o,flush:n,observer:f,parse:c}};function h(t,e){let o=t.get(e);o&&o(e)}function R(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function gt(t,e){return t.getAttribute(e)}function x(t,e){return t.dataset[e]===""||gt(t,`data-${R(e)}`)===""||U(t.dataset[e])}function b(t,e){return t.dataset[e]!==void 0}function V(t,e){return t.dataset[e]}function z(t,e,o){t.style.setProperty(`--${e}`,o)}function y(t,e){t.classList.add(e)}function H(t,e){t.classList.remove(e)}var E=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},q=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function L(t,e,o=null){let n=E(e,o);for(let r of v(t))n.addEventListener(r,e,q(r))}function P(t,e,o=null){let n=E(e,o);for(let r of v(t))n.addEventListener(r,e,{once:!0})}function S(t,e,o=null){let n=E(e,o);for(let r of v(t))n.removeEventListener(r,e,q(r))}function _(t,e=null,o=document){return o.getElementById(t)}function D(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function G(t,e=null){let o=Q("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function Q(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function U(t){return["true","1"].includes(String(t).toLowerCase())}function v(t){return Array.isArray(t)?t:[t]}function ht(t){return typeof t=="string"||t instanceof String}function Z(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function J(t){if(!t)return{};if(t.endsWith("()")){let o=Z(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return Y(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function Y(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;ht(n)?t[e]=Z(n):Y(o)}return t}function xt(){return document.documentElement}function K(){let t=xt();if(t.scrollHeight<=t.clientHeight)return 0;let e=Q("div");e.style.cssText="overflow:scroll; visibility:hidden; position:absolute;",document.body.appendChild(e);let o=e.offsetWidth-e.clientWidth;return e.remove(),o}function w(){return typeof HTMLDialogElement<"u"}function X(){return"IntersectionObserver"in window}function bt(){return window.matchMedia("(prefers-reduced-motion: no-preference)")===!0||window.matchMedia("(prefers-reduced-motion: no-preference)").matches===!0}function tt(t,e,o=!1){let u=o?"is-opening":"is-closing";if(bt()){let c=getComputedStyle(t);c.animation.length===0||c.animation.startsWith("none ")?e():(P("animationend",d=>{H(t,u),e()},t),y(t,u))}else e()}var M=new WeakMap,A;X()&&(A=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),h(M,r)}}));function T(t,e){return A?(M.set(t,e),A.observe(t),()=>(M.delete(t),A.unobserve(t))):(e(t),()=>{})}var et={},k=[],yt=window.DEBUG||!1,{drop:ot,flush:rt,observer:Xt,parse:O}=N({query:k,document,async handle(t,e,o){let n=et[o],r=n.initialized,u=n.lazyMap;if(yt&&console.log(t,e,o),e){let c=()=>{r.has(t)||(n.callback(t),r.add(t))};x(t,"lazy")?u.set(t,T(t,c)):c()}else if(await Promise.resolve(),!t.isConnected&&r.has(t)){let c=n.cleanup;c&&c(t),h(u,t),r.delete(t)}}});var g=(t,e,o=null)=>{let n=new WeakSet,r=new WeakMap;et[t]={callback:e,cleanup:o,initialized:n,lazyMap:r},k.includes(t)||(k.push(t),O(D(t)))};var vt=window.DIALOG_POLYFILL_URL||"https://cdn.jsdelivr.net/npm/dialog-polyfill/+esm",nt=()=>{if(w())return;let t="dialog-polyfill";y(document.documentElement,t),G(`dialog{position:fixed;left:0;right:0;top:0;bottom:0;width:fit-content;height:fit-content;overflow:auto;max-height:90vh;max-width:90vw;background: white}
dialog:not([open]){display:none}
dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:var(--backdrop-bg,rgba(0,0,0,.1))}
._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}`,t),import(vt).then(o=>{let n=o.default;g("dialog",u=>{n.registerDialog(u)})})};var at=t=>{t.target.nodeName==="DIALOG"&&(t.target.close(),S("click",at,t.target))};function it(t){!t||tt(t,()=>{t.close()})}function ct(){z(document.documentElement,"scrollbar-width",`${K()}px`)}var st=t=>{if(!w()&&!HTMLFormElement.prototype.submit.toString().includes("call(this)"))return;let e=t.target.closest("button");if(!e)return;let o=V(e,"dialog"),n=x(e,"dialogClose");if(o){let r=_(o,"dialog");if(!r){console.error(`${o} not found`);return}let u=r.dataset,c=J(u.dialog);b(r,"dialogModal")&&(c.modal=!0),b(r,"dialogDismissible")&&(c.dismissible=!0),n?it(r):c.dismissible||c.modal?(ct(),r.showModal(),c.dismissible&&L("click",at,r)):r.show();return}n&&it(e.closest("dialog"))};ct();g("button[data-dialog],button[data-dialog-close]",t=>{L("click",st,t)},t=>{S("click",st,t)});nt();var de={dynamicBehaviour:g,drop:ot,parse:O,flush:rt};export{de as default};
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - dialog build
 * Modern now/github.com/lekoala/modern-now
 * @license MIT
 */
