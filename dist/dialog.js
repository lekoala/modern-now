var $="querySelectorAll",I=(t,e=document,o=MutationObserver,n=["*"])=>{let r=(l,d,f,p,i,a)=>{for(let s of l)(a||$ in s)&&(i?f.has(s)||(f.add(s),p.delete(s),t(s,i)):p.has(s)||(p.add(s),f.delete(s),t(s,i)),a||r(s[$](d),d,f,p,i,!0))},u=new o(l=>{if(n.length){let d=n.join(","),f=new Set,p=new Set;for(let{addedNodes:i,removedNodes:a}of l)r(a,d,f,p,!1,!1),r(i,d,f,p,!0,!1)}}),{observe:c}=u;return(u.observe=l=>c.call(u,l,{subtree:!0,childList:!0}))(e),u};var j="querySelectorAll",{document:lt,Element:W,MutationObserver:ft,Set:pt,WeakMap:dt}=self,B=t=>j in t,{filter:F}=[],N=t=>{let e=new dt,o=i=>{for(let a=0,{length:s}=i;a<s;a++)e.delete(i[a])},n=()=>{let i=f.takeRecords();for(let a=0,{length:s}=i;a<s;a++)c(F.call(i[a].removedNodes,B),!1),c(F.call(i[a].addedNodes,B),!0)},r=i=>i.matches||i.webkitMatchesSelector||i.msMatchesSelector,u=(i,a)=>{let s;if(a)for(let m,ct=r(i),C=0,{length:ut}=l;C<ut;C++)ct.call(i,m=l[C])&&(e.has(i)||e.set(i,new pt),s=e.get(i),s.has(m)||(s.add(m),t.handle(i,a,m)));else e.has(i)&&(s=e.get(i),e.delete(i),s.forEach(m=>{t.handle(i,a,m)}))},c=(i,a=!0)=>{for(let s=0,{length:m}=i;s<m;s++)u(i[s],a)},{query:l}=t,d=t.root||lt,f=I(u,d,ft,l),{attachShadow:p}=W.prototype;return p&&(W.prototype.attachShadow=function(i){let a=p.call(this,i);return f.observe(a),a}),l.length&&c(d[j](l)),{drop:o,flush:n,observer:f,parse:c}};function h(t,e){let o=t.get(e);o&&o(e)}function x(t,e){return t.dataset[e]===""||H(t.dataset[e])}function b(t,e){return t.dataset[e]!==void 0}function R(t,e){return t.dataset[e]}function V(t,e,o){t.style.setProperty(`--${e}`,o)}function y(t,e){t.classList.add(e)}function z(t,e){t.classList.remove(e)}var E=(t,e)=>{if(e)return e;if(typeof t=="function")return document;if(t instanceof HTMLElement)return t;throw"Invalid handler"},U=t=>["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mousemove","mouseenter","mousewheel","mouseover"].includes(t)?{passive:!0}:{};function S(t,e,o=null){let n=E(e,o);for(let r of v(t))n.addEventListener(r,e,U(r))}function q(t,e,o=null){let n=E(e,o);for(let r of v(t))n.addEventListener(r,e,{once:!0})}function L(t,e,o=null){let n=E(e,o);for(let r of v(t))n.removeEventListener(r,e,U(r))}function P(t,e=null,o=document){return o.getElementById(t)}function D(t,e=null,o=document){return Array.from(o.querySelectorAll(t))}function _(t,e=null){let o=G("style");e&&(o.id=e),o.textContent=t,document.head.append(o)}function G(t,e=null){let o=document.createElement(t);return e&&e.appendChild(o),o}function H(t){return["true","1"].includes(String(t).toLowerCase())}function v(t){return Array.isArray(t)?t:[t]}function mt(t){return typeof t=="string"||t instanceof String}function Q(t,e=window){return t.split(".").reduce((o,n)=>o[n],e)}function J(t){if(!t)return{};if(t.endsWith("()")){let o=Q(t.replace("()",""));return o?o():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(o,n,r)=>`"${n.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return Y(JSON.parse(e))}catch(o){throw`Invalid config ${t} interpreted as ${e} with error ${o}`}}function Y(t){for(let[e,o]of Object.entries(t))if(o&&typeof o=="object"){let n=o.__fn;mt(n)?t[e]=Q(n):Y(o)}return t}function gt(){return document.documentElement}function Z(){let t=gt();if(t.scrollHeight<=t.clientHeight)return 0;let e=G("div");e.style.cssText="overflow:scroll; visibility:hidden; position:absolute;",document.body.appendChild(e);let o=e.offsetWidth-e.clientWidth;return e.remove(),o}function w(){return typeof HTMLDialogElement<"u"}function K(){return"IntersectionObserver"in window}function ht(){return window.matchMedia("(prefers-reduced-motion: no-preference)")===!0||window.matchMedia("(prefers-reduced-motion: no-preference)").matches===!0}function X(t,e,o=!1){let u=o?"is-opening":"is-closing";if(ht()){let c=getComputedStyle(t);c.animation.length===0||c.animation.startsWith("none ")?e():(q("animationend",d=>{z(t,u),e()},t),y(t,u))}else e()}var M=new WeakMap,A;K()&&(A=new IntersectionObserver((t,e)=>{let o=t.filter(n=>n.isIntersecting);for(let n of o){let r=n.target;e.unobserve(r),h(M,r)}}));function k(t,e){return A?(M.set(t,e),A.observe(t),()=>(M.delete(t),A.unobserve(t))):(e(t),()=>{})}var tt={},O=[],xt=window.DEBUG||!1,{drop:et,flush:ot,observer:Gt,parse:T}=N({query:O,document,async handle(t,e,o){let n=tt[o],r=n.initialized,u=n.lazyMap;if(xt&&console.log(t,e,o),e){let c=()=>{r.has(t)||(n.callback(t),r.add(t))};x(t,"lazy")?u.set(t,k(t,c)):c()}else if(await Promise.resolve(),!t.isConnected&&r.has(t)){let c=n.cleanup;c&&c(t),h(u,t),r.delete(t)}}});var g=(t,e,o=null)=>{let n=new WeakSet,r=new WeakMap;tt[t]={callback:e,cleanup:o,initialized:n,lazyMap:r},O.includes(t)||(O.push(t),T(D(t)))};var bt=window.DIALOG_POLYFILL_URL||"https://cdn.jsdelivr.net/npm/dialog-polyfill/+esm",rt=()=>{if(w())return;let t="dialog-polyfill";y(document.documentElement,t),_(`dialog{position:fixed;left:0;right:0;top:0;bottom:0;width:fit-content;height:fit-content;overflow:auto;max-height:90vh;max-width:90vw;background: white}
dialog:not([open]){display:none}
dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:var(--backdrop-bg,rgba(0,0,0,.1))}
._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}`,t),import(bt).then(o=>{let n=o.default;g("dialog",u=>{n.registerDialog(u)})})};var st=t=>{t.target.nodeName==="DIALOG"&&(t.target.close(),L("click",st,t.target))};function nt(t){!t||X(t,()=>{t.close()})}function at(){V(document.documentElement,"scrollbar-width",`${Z()}px`)}var it=t=>{if(!w()&&!HTMLFormElement.prototype.submit.toString().includes("call(this)"))return;let e=t.target.closest("button");if(!e)return;let o=R(e,"dialog"),n=x(e,"dialogClose");if(o){let r=P(o,"dialog");if(!r){console.error(`${o} not found`);return}let u=r.dataset,c=J(u.dialog);b(r,"dialogModal")&&(c.modal=!0),b(r,"dialogDismissible")&&(c.dismissible=!0),n?nt(r):c.dismissible||c.modal?(at(),r.showModal(),c.dismissible&&S("click",st,r)):r.show();return}n&&nt(e.closest("dialog"))};at();g("button[data-dialog],button[data-dialog-close]",t=>{S("click",it,t)},t=>{L("click",it,t)});rt();var ae={dynamicBehaviour:g,drop:et,parse:T,flush:ot};export{ae as default};
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - dialog build
 * Modern now/github.com/lekoala/modern-now
 * @license MIT
 */
