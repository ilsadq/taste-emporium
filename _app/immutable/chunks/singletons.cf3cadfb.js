import{w as u}from"./index.141485cb.js";var _;const g=((_=globalThis.__sveltekit_2lxu7z)==null?void 0:_.base)??"";var h;const v=((h=globalThis.__sveltekit_2lxu7z)==null?void 0:h.assets)??g,k="1683565500599",R="sveltekit:snapshot",T="sveltekit:scroll",x="sveltekit:index",f={tap:1,hover:2,viewport:3,eager:4,off:-1};function I(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function S(){return{x:pageXOffset,y:pageYOffset}}function i(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const d={...f,"":f.hover};function b(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function y(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=b(e)}}function O(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,a=!n||!!o||m(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external")||e.hasAttribute("download");return{url:n,external:a,target:o}}function U(e){let t=null,n=null,o=null,a=null,r=null,l=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=i(s,"preload-code")),a===null&&(a=i(s,"preload-data")),t===null&&(t=i(s,"keepfocus")),n===null&&(n=i(s,"noscroll")),r===null&&(r=i(s,"reload")),l===null&&(l=i(s,"replacestate")),s=b(s);return{preload_code:d[o??"off"],preload_data:d[a??"off"],keep_focus:t==="off"?!1:t===""?!0:null,noscroll:n==="off"?!1:n===""?!0:null,reload:r==="off"?!1:r===""?!0:null,replace_state:l==="off"?!1:l===""?!0:null}}function p(e){const t=u(e);let n=!0;function o(){n=!0,t.update(l=>l)}function a(l){n=!1,t.set(l)}function r(l){let s;return t.subscribe(c=>{(s===void 0||n&&c!==s)&&l(s=c)})}return{notify:o,set:a,subscribe:r}}function E(){const{set:e,subscribe:t}=u(!1);let n;async function o(){clearTimeout(n);const a=await fetch(`${v}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(a.ok){const l=(await a.json()).version!==k;return l&&(e(!0),clearTimeout(n)),l}else throw new Error(`Version check failed: ${a.status}`)}return{subscribe:t,check:o}}function m(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}let w;function L(e){w=e.client}const N={url:p({}),page:p({}),navigating:u(null),updated:E()};export{x as I,f as P,T as S,R as a,O as b,U as c,S as d,g as e,y as f,I as g,L as h,m as i,w as j,N as s};
