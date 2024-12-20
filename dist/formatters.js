function O(t,e=null,n=document){return Array.from(n.querySelectorAll(t))}function j(t){return t.charAt(0).toLocaleUpperCase()+t.slice(1)}function V(t){return["true","1"].includes(String(t).toLowerCase())}function ct(t){return typeof t=="string"||t instanceof String}function H(t,e,n=[],a=null){for(let r of n){let f=a?`${a}${j(r)}`:r;z(t,f)&&(e[r]=h(t,f))}}function q(t,e=window){return t.split(".").reduce((n,a)=>n[a],e)}function D(t){if(!t)return{};if(t.endsWith("()")){let n=q(t.replace("()",""));return n?n():{}}if(!t.includes(":"))return{default:t};let e=t;!t.startsWith("{")&&/[\w'"]\s*:\s*/.test(t)&&(e=`{${t.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g,(n,a,r)=>`"${a.replace(/['"]/g,"")}":${r.includes('"')?r:r.replace(/'/g,'"')}`)}}`);try{return P(JSON.parse(e))}catch(n){throw`Invalid config ${t} interpreted as ${e} with error ${n}`}}function P(t){for(let[e,n]of Object.entries(t))if(n&&typeof n=="object"){let a=n.__fn;ct(a)?t[e]=q(a):P(n)}return t}function ft(){return document.documentElement}function v(){return ft().getAttribute("lang")||"en"}function U(){return"IntersectionObserver"in window}function T(t,e,n){let a=(f,d)=>{for(let s of f)s.type==="attributes"&&n(s.target,s.oldValue)},r=new MutationObserver(a);return r.observe(t,{attributes:!0,attributeOldValue:!0,attributeFilter:e}),()=>{r.disconnect(),r=null}}function x(t,e){return t.getAttribute(e)}function A(t,e){return t.dataset[e]===""||V(t.dataset[e])}function h(t,e){let n=t.dataset[e];return n==="false"?!1:n==="true"?!0:n}function z(t,e){return t.dataset[e]!==void 0}function b(t,e){return t.dataset[e]}function Q(){return{years:3600*24*365,months:3600*24*30,weeks:3600*24*7,days:3600*24,hours:3600,minutes:60,seconds:1}}function k(t=null){return t?t instanceof Date?t:Number.isInteger(t)?new Date(t):new Date(F(I(t))):new Date}function I(t){let e=t;return pt(e)&&(e=`1970-01-01 ${e}`),lt(e,"1970-01-01 00:00:00")}function F(t){let e=t.split(" ");return`${e[0]}T${e[1]}Z`}function lt(t,e){let n=t.toString();for(;n.length<e.length;)n+=e[n.length];return n}function pt(t){return S(t)&&!N(t)}function S(t){return t.toString().includes(":")}function N(t){return t.toString().includes("-")||!S(t)}function C(t){return dt(t).toISOString().split(".")[0].replace("T"," ")}function dt(t){let e=k(t);return new Date(e.getTime()-e.getTimezoneOffset()*6e4)}function Z(t){return C(t).split(" ")[0]}function _(t){return C(t).split(" ")[1]}function J(){return Intl.RelativeTimeFormat!==void 0}var G="querySelectorAll",K=(t,e=document,n=MutationObserver,a=["*"])=>{let r=(s,m,l,c,o,i)=>{for(let u of s)(i||G in u)&&(o?l.has(u)||(l.add(u),c.delete(u),t(u,o)):c.has(u)||(c.add(u),l.delete(u),t(u,o)),i||r(u[G](m),m,l,c,o,!0))},f=new n(s=>{if(a.length){let m=a.join(","),l=new Set,c=new Set;for(let{addedNodes:o,removedNodes:i}of s)r(i,m,l,c,!1,!1),r(o,m,l,c,!0,!1)}}),{observe:d}=f;return(f.observe=s=>d.call(f,s,{subtree:!0,childList:!0}))(e),f};var et="querySelectorAll",{document:mt,Element:X,MutationObserver:gt,Set:xt,WeakMap:yt}=self,Y=t=>et in t,{filter:tt}=[],nt=t=>{let e=new yt,n=o=>{for(let i=0,{length:u}=o;i<u;i++)e.delete(o[i])},a=()=>{let o=l.takeRecords();for(let i=0,{length:u}=o;i<u;i++)d(tt.call(o[i].removedNodes,Y),!1),d(tt.call(o[i].addedNodes,Y),!0)},r=o=>o.matches||o.webkitMatchesSelector||o.msMatchesSelector,f=(o,i)=>{let u;if(i)for(let p,w=r(o),y=0,{length:$}=s;y<$;y++)w.call(o,p=s[y])&&(e.has(o)||e.set(o,new xt),u=e.get(o),u.has(p)||(u.add(p),t.handle(o,i,p)));else e.has(o)&&(u=e.get(o),e.delete(o),u.forEach(p=>{t.handle(o,i,p)}))},d=(o,i=!0)=>{for(let u=0,{length:p}=o;u<p;u++)f(o[u],i)},{query:s}=t,m=t.root||mt,l=K(f,m,gt,s),{attachShadow:c}=X.prototype;return c&&(X.prototype.attachShadow=function(o){let i=c.call(this,o);return l.observe(i),i}),s.length&&d(m[et](s)),{drop:n,flush:a,observer:l,parse:d}};function g(t,e){let n=t.get(e);n&&n(e)}var R=new WeakMap,M;U()&&(M=new IntersectionObserver((t,e)=>{let n=t.filter(a=>a.isIntersecting);for(let a of n){let r=a.target;e.unobserve(r),g(R,r)}}));function W(t,e){return M?(R.set(t,e),M.observe(t),()=>(R.delete(t),M.unobserve(t))):(e(t),()=>{})}var rt={},B=[],ot=new WeakMap,E=new WeakSet,{drop:ee,flush:ne,observer:oe,parse:ht}=nt({query:B,document,async handle(t,e,n){let a=rt[n];if(e){let r=()=>{E.has(t)||(a[0](t),E.add(t))};A(t,"lazy")?ot.set(t,W(t,r)):r()}else if(await Promise.resolve(),!t.isConnected&&E.has(t)){let r=a[1];r&&r(t),g(ot,t),E.delete(t)}}});var L=(t,e,n=null)=>{rt[t]=[e,n],B.includes(t)||(B.push(t),ht(O(t)))};function it(t){if(!t.dataset.render)return;let e=D(b(t,"datetimeConfig")),n=x(t,"datetime"),a=b(t,"style"),r=b(t,"format"),f=A(t,"relative"),d=x(t,"lang")||v(),s=e;S(n)&&!s.timeStyle&&(s.timeStyle=a||"short"),N(n)&&!s.dateStyle&&(s.dateStyle=a||"short");let m=!1,l=!1;for(let i in t.dataset)["style","format","relative","render"].includes(i)||(["year","month","day"].includes(i)&&(m=!0),["hour","minute","second"].includes(i)&&(l=!0),s[i]=h(t,i));m&&s.dateStyle&&(s.dateStyle=void 0),l&&s.timeStyle&&(s.timeStyle=void 0);let c="",o=k(n);switch(r){case"iso":c=o.toISOString();break;case"utc":c=o.toUTCString();break;case"datetime":c=C(o);break;case"date":c=Z(o);break;case"time":c=_(o);break;default:if(f){let i=Q(),u=(o.getTime()-Date.now())/1e3;for(let p in i)if(i[p]<Math.abs(u)){let w=u/i[p];if(J())c=new Intl.RelativeTimeFormat(d).format(Math.round(w),p);else{let y=Math.abs(Math.floor(w)),$=y===1?p.replace(/s$/,""):p;c=`${y} ${$}`}break}}else try{let i=Date.parse(F(I(n)));c=new Intl.DateTimeFormat(d,s).format(i)}catch(i){t.dataset.error=i}break}c.length>0&&(t.innerText=c)}var st=new WeakMap;L("time[datetime]",t=>{x(t,"datetime")&&!t.innerText.trim()&&(t.dataset.render="true"),it(t),st.set(t,T(t,["datetime"],(n,a)=>{it(n)}))},t=>{g(st,t)});function at(t){let e=D(b(t,"numberConfig")),n=x(t,"data-number");H(t,e,["currency","unit"]);let a=x(t,"lang")||v(),r=new Intl.NumberFormat().resolvedOptions();e.currency&&(r.currency=e.currency,r.style="currency"),e.unit&&(r.unit=e.unit,r.style="unit");for(let[s,m]of Object.entries(e))r[s]=m;for(let s in t.dataset)["value","currency","unit"].includes(s)||(r[s]=h(t,s));let f=new Intl.NumberFormat(a,r),d=Number(n);t.innerText=Number.isNaN(d)?"":f.format(d)}var ut=new WeakMap;L("span[data-number]",t=>{at(t),ut.set(t,T(t,["data-number"],(e,n)=>{at(e)}))},t=>{g(ut,t)});
/*! (c) Andrea Giammarchi - ISC */
/**
 * Modern now - formatters build
 * https://github.com/lekoala/modern-now
 * @license MIT
 */
