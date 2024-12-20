function $(t,e=null,n=document){return Array.from(n.querySelectorAll(t))}function B(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function U(t){return["true","1"].includes(String(t).toLowerCase())}function at(t){return typeof t=="string"||t instanceof String}function z(t,e,n=[],s=null){for(let r of n){let f=s?`${s}${B(r)}`:r;q(t,f)&&(e[r]=h(t,f))}}function j(t,e=window){return t.split(".").reduce((n,s)=>n[s],e)}function D(t){if(!t)return{};if(t.endsWith("()")){let n=j(t.replace("()",""));return n?n():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(n,s,r)=>`"${s.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return V(JSON.parse(e))}catch(n){throw`Invalid config ${t} interpreted as ${e} with error ${n}`}}function V(t){for(let[e,n]of Object.entries(t))if(n&&typeof n=="object"){let s=n.__fn;at(s)?t[e]=j(s):V(n)}return t}function ut(){return document.documentElement}function v(){return ut().getAttribute("lang")||"en"}function H(){return"IntersectionObserver"in window}function T(t,e,n){let s=(f,l)=>{for(let a of f)a.type==="attributes"&&n(a.target,a.oldValue)},r=new MutationObserver(s);return r.observe(t,{attributes:!0,attributeOldValue:!0,attributeFilter:e}),()=>{r.disconnect(),r=null}}function x(t,e){return t.getAttribute(e)}function A(t,e){return t.dataset[e]===""||U(t.dataset[e])}function h(t,e){let n=t.dataset[e];return n==="false"?!1:n==="true"?!0:n}function q(t,e){return t.dataset[e]!==void 0}function b(t,e){return t.dataset[e]}function P(){return{years:3600*24*365,months:3600*24*30,weeks:3600*24*7,days:3600*24,hours:3600,minutes:60,seconds:1}}function k(t=null){return t?t instanceof Date?t:Number.isInteger(t)?new Date(t):new Date(I(O(t))):new Date}function O(t){let e=t;return ft(e)&&(e=`1970-01-01 ${e}`),ct(e,"1970-01-01 00:00:00")}function I(t){let e=t.split(" ");return`${e[0]}T${e[1]}Z`}function ct(t,e){let n=t.toString();for(;n.length<e.length;)n+=e[n.length];return n}function ft(t){return S(t)&&!F(t)}function S(t){return t.toString().includes(":")}function F(t){return t.toString().includes("-")||!S(t)}function C(t){return lt(t).toISOString().split(".")[0].replace("T"," ")}function lt(t){let e=k(t);return new Date(e.getTime()-e.getTimezoneOffset()*6e4)}function Q(t){return C(t).split(" ")[0]}function G(t){return C(t).split(" ")[1]}function Z(){return Intl.RelativeTimeFormat!==void 0}var _="querySelectorAll",J=(t,e=document,n=MutationObserver,s=["*"])=>{let r=(a,m,p,c,o,i)=>{for(let u of a)(i||_ in u)&&(o?p.has(u)||(p.add(u),c.delete(u),t(u,o)):c.has(u)||(c.add(u),p.delete(u),t(u,o)),i||r(u[_](m),m,p,c,o,!0))},f=new n(a=>{if(s.length){let m=s.join(","),p=new Set,c=new Set;for(let{addedNodes:o,removedNodes:i}of a)r(i,m,p,c,!1,!1),r(o,m,p,c,!0,!1)}}),{observe:l}=f;return(f.observe=a=>l.call(f,a,{subtree:!0,childList:!0}))(e),f};var tt="querySelectorAll",{document:pt,Element:K,MutationObserver:dt,Set:mt,WeakMap:gt}=self,X=t=>tt in t,{filter:Y}=[],et=t=>{let e=new gt,n=o=>{for(let i=0,{length:u}=o;i<u;i++)e.delete(o[i])},s=()=>{let o=p.takeRecords();for(let i=0,{length:u}=o;i<u;i++)l(Y.call(o[i].removedNodes,X),!1),l(Y.call(o[i].addedNodes,X),!0)},r=o=>o.matches||o.webkitMatchesSelector||o.msMatchesSelector,f=(o,i)=>{let u;if(i)for(let d,w=r(o),y=0,{length:L}=a;y<L;y++)w.call(o,d=a[y])&&(e.has(o)||e.set(o,new mt),u=e.get(o),u.has(d)||(u.add(d),t.handle(o,i,d)));else e.has(o)&&(u=e.get(o),e.delete(o),u.forEach(d=>{t.handle(o,i,d)}))},l=(o,i=!0)=>{for(let u=0,{length:d}=o;u<d;u++)f(o[u],i)},{query:a}=t,m=t.root||pt,p=J(f,m,dt,a),{attachShadow:c}=K.prototype;return c&&(K.prototype.attachShadow=function(o){let i=c.call(this,o);return p.observe(i),i}),a.length&&l(m[tt](a)),{drop:n,flush:s,observer:p,parse:l}};function g(t,e){let n=t.get(e);n&&n(e)}var N=new WeakMap,M;H()&&(M=new IntersectionObserver((t,e)=>{let n=t.filter(s=>s.isIntersecting);for(let s of n){let r=s.target;e.unobserve(r),g(N,r)}}));function R(t,e){return M?(N.set(t,e),M.observe(t),()=>(N.delete(t),M.unobserve(t))):(e(t),()=>{})}var nt={},W=[],xt=window.DEBUG||!1,{drop:te,flush:ee,observer:ne,parse:yt}=et({query:W,document,async handle(t,e,n){let s=nt[n],r=s.initialized,f=s.lazyMap;if(xt&&console.log(t,e,n),e){let l=()=>{r.has(t)||(s.callback(t),r.add(t))};A(t,"lazy")?f.set(t,R(t,l)):l()}else if(await Promise.resolve(),!t.isConnected&&r.has(t)){let l=s.cleanup;l&&l(t),g(f,t),r.delete(t)}}});var E=(t,e,n=null)=>{let s=new WeakSet,r=new WeakMap;nt[t]={callback:e,cleanup:n,initialized:s,lazyMap:r},W.includes(t)||(W.push(t),yt($(t)))};function ot(t){if(!t.dataset.render)return;let e=D(b(t,"datetimeConfig")),n=x(t,"datetime"),s=b(t,"style"),r=b(t,"format"),f=A(t,"relative"),l=x(t,"lang")||v(),a=e;S(n)&&!a.timeStyle&&(a.timeStyle=s||"short"),F(n)&&!a.dateStyle&&(a.dateStyle=s||"short");let m=!1,p=!1;for(let i in t.dataset)["style","format","relative","render"].includes(i)||(["year","month","day"].includes(i)&&(m=!0),["hour","minute","second"].includes(i)&&(p=!0),a[i]=h(t,i));m&&a.dateStyle&&(a.dateStyle=void 0),p&&a.timeStyle&&(a.timeStyle=void 0);let c="",o=k(n);switch(r){case"iso":c=o.toISOString();break;case"utc":c=o.toUTCString();break;case"datetime":c=C(o);break;case"date":c=Q(o);break;case"time":c=G(o);break;default:if(f){let i=P(),u=(o.getTime()-Date.now())/1e3;for(let d in i)if(i[d]<Math.abs(u)){let w=u/i[d];if(Z())c=new Intl.RelativeTimeFormat(l).format(Math.round(w),d);else{let y=Math.abs(Math.floor(w)),L=y===1?d.replace(/s$/,""):d;c=`${y} ${L}`}break}}else try{let i=Date.parse(I(O(n)));c=new Intl.DateTimeFormat(l,a).format(i)}catch(i){t.dataset.error=i}break}c.length>0&&(t.innerText=c)}var rt=new WeakMap;E("time[datetime]",t=>{x(t,"datetime")&&!t.innerText.trim()&&(t.dataset.render="true"),ot(t),rt.set(t,T(t,["datetime"],(n,s)=>{ot(n)}))},t=>{g(rt,t)});function it(t){let e=D(b(t,"numberConfig")),n=x(t,"data-number");z(t,e,["currency","unit"]);let s=x(t,"lang")||v(),r=new Intl.NumberFormat().resolvedOptions();e.currency&&(r.currency=e.currency,r.style="currency"),e.unit&&(r.unit=e.unit,r.style="unit");for(let[a,m]of Object.entries(e))r[a]=m;for(let a in t.dataset)["value","currency","unit"].includes(a)||(r[a]=h(t,a));let f=new Intl.NumberFormat(s,r),l=Number(n);t.innerText=Number.isNaN(l)?"":f.format(l)}var st=new WeakMap;E("span[data-number]",t=>{it(t),st.set(t,T(t,["data-number"],(e,n)=>{it(e)}))},t=>{g(st,t)});
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - formatters build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
