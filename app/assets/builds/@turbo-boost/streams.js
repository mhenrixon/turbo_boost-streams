var le=Object.defineProperty,ae=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var F=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,ue=Object.prototype.propertyIsEnumerable;var q=(a,o,u)=>o in a?le(a,o,{enumerable:!0,configurable:!0,writable:!0,value:u}):a[o]=u,V=(a,o)=>{for(var u in o||(o={}))se.call(o,u)&&q(a,u,o[u]);if(F)for(var u of F(o))ue.call(o,u)&&q(a,u,o[u]);return a},U=(a,o)=>ae(a,oe(o));var W="0.1.10";var fe={turboPermanentAttribute:"data-turbo-permanent"},w=V({},fe);var _=function(){"use strict";let a=new Set,o={morphStyle:"outerHTML",callbacks:{beforeNodeAdded:A,afterNodeAdded:A,beforeNodeMorphed:A,afterNodeMorphed:A,beforeNodeRemoved:A,afterNodeRemoved:A,beforeAttributeUpdated:A},head:{style:"merge",shouldPreserve:function(e){return e.getAttribute("im-preserve")==="true"},shouldReAppend:function(e){return e.getAttribute("im-re-append")==="true"},shouldRemove:A,afterHeadMorphed:A}};function u(e,t,r={}){e instanceof Document&&(e=e.documentElement),typeof t=="string"&&(t=K(t));let n=Q(t),i=J(e,n,r);return p(e,n,i)}function p(e,t,r){if(r.head.block){let n=e.querySelector("head"),i=t.querySelector("head");if(n&&i){let l=T(i,n,r);Promise.all(l).then(function(){p(e,t,Object.assign(r,{head:{block:!1,ignore:!0}}))});return}}if(r.morphStyle==="innerHTML")return b(t,e,r),e.children;if(r.morphStyle==="outerHTML"||r.morphStyle==null){let n=x(t,e,r),i=n==null?void 0:n.previousSibling,l=n==null?void 0:n.nextSibling,s=f(e,n,r);return n?Z(i,s,l):[]}else throw"Do not understand how to morph style "+r.morphStyle}function d(e,t){return t.ignoreActiveValue&&e===document.activeElement&&e!==document.body}function f(e,t,r){if(!(r.ignoreActive&&e===document.activeElement))return t==null?r.callbacks.beforeNodeRemoved(e)===!1?e:(e.remove(),r.callbacks.afterNodeRemoved(e),null):R(e,t)?(r.callbacks.beforeNodeMorphed(e,t)===!1||(e instanceof HTMLHeadElement&&r.head.ignore||(e instanceof HTMLHeadElement&&r.head.style!=="morph"?T(t,e,r):(g(t,e,r),d(e,r)||b(t,e,r))),r.callbacks.afterNodeMorphed(e,t)),e):r.callbacks.beforeNodeRemoved(e)===!1||r.callbacks.beforeNodeAdded(t)===!1?e:(e.parentElement.replaceChild(t,e),r.callbacks.afterNodeAdded(t),r.callbacks.afterNodeRemoved(e),t)}function b(e,t,r){let n=e.firstChild,i=t.firstChild,l;for(;n;){if(l=n,n=l.nextSibling,i==null){if(r.callbacks.beforeNodeAdded(l)===!1)return;t.appendChild(l),r.callbacks.afterNodeAdded(l),S(r,l);continue}if(C(l,i,r)){f(i,l,r),i=i.nextSibling,S(r,l);continue}let s=Y(e,t,l,i,r);if(s){i=P(i,s,r),f(s,l,r),S(r,l);continue}let m=G(e,t,l,i,r);if(m){i=P(i,m,r),f(m,l,r),S(r,l);continue}if(r.callbacks.beforeNodeAdded(l)===!1)return;t.insertBefore(l,i),r.callbacks.afterNodeAdded(l),S(r,l)}for(;i!==null;){let s=i;i=i.nextSibling,j(s,r)}}function c(e,t,r,n){return e==="value"&&n.ignoreActiveValue&&t===document.activeElement?!0:n.callbacks.beforeAttributeUpdated(e,t,r)===!1}function g(e,t,r){let n=e.nodeType;if(n===1){let i=e.attributes,l=t.attributes;for(let s of i)c(s.name,t,"update",r)||t.getAttribute(s.name)!==s.value&&t.setAttribute(s.name,s.value);for(let s=l.length-1;0<=s;s--){let m=l[s];c(m.name,t,"remove",r)||e.hasAttribute(m.name)||t.removeAttribute(m.name)}}(n===8||n===3)&&t.nodeValue!==e.nodeValue&&(t.nodeValue=e.nodeValue),d(t,r)||H(e,t,r)}function v(e,t,r,n){if(e[r]!==t[r]){let i=c(r,t,"update",n);i||(t[r]=e[r]),e[r]?i||t.setAttribute(r,e[r]):c(r,t,"remove",n)||t.removeAttribute(r)}}function H(e,t,r){if(e instanceof HTMLInputElement&&t instanceof HTMLInputElement&&e.type!=="file"){let n=e.value,i=t.value;v(e,t,"checked",r),v(e,t,"disabled",r),e.hasAttribute("value")?n!==i&&(c("value",t,"update",r)||(t.setAttribute("value",n),t.value=n)):c("value",t,"remove",r)||(t.value="",t.removeAttribute("value"))}else if(e instanceof HTMLOptionElement)v(e,t,"selected",r);else if(e instanceof HTMLTextAreaElement&&t instanceof HTMLTextAreaElement){let n=e.value,i=t.value;if(c("value",t,"update",r))return;n!==i&&(t.value=n),t.firstChild&&t.firstChild.nodeValue!==n&&(t.firstChild.nodeValue=n)}}function T(e,t,r){let n=[],i=[],l=[],s=[],m=r.head.style,y=new Map;for(let h of e.children)y.set(h.outerHTML,h);for(let h of t.children){let E=y.has(h.outerHTML),I=r.head.shouldReAppend(h),L=r.head.shouldPreserve(h);E||L?I?i.push(h):(y.delete(h.outerHTML),l.push(h)):m==="append"?I&&(i.push(h),s.push(h)):r.head.shouldRemove(h)!==!1&&i.push(h)}s.push(...y.values());let N=[];for(let h of s){let E=document.createRange().createContextualFragment(h.outerHTML).firstChild;if(r.callbacks.beforeNodeAdded(E)!==!1){if(E.href||E.src){let I=null,L=new Promise(function(ie){I=ie});E.addEventListener("load",function(){I()}),N.push(L)}t.appendChild(E),r.callbacks.afterNodeAdded(E),n.push(E)}}for(let h of i)r.callbacks.beforeNodeRemoved(h)!==!1&&(t.removeChild(h),r.callbacks.afterNodeRemoved(h));return r.head.afterHeadMorphed(t,{added:n,kept:l,removed:i}),N}function ye(){}function A(){}function z(e){let t={};return Object.assign(t,o),Object.assign(t,e),t.callbacks={},Object.assign(t.callbacks,o.callbacks),Object.assign(t.callbacks,e.callbacks),t.head={},Object.assign(t.head,o.head),Object.assign(t.head,e.head),t}function J(e,t,r){return r=z(r),{target:e,newContent:t,config:r,morphStyle:r.morphStyle,ignoreActive:r.ignoreActive,ignoreActiveValue:r.ignoreActiveValue,idMap:ne(e,t),deadIds:new Set,callbacks:r.callbacks,head:r.head}}function C(e,t,r){return e==null||t==null?!1:e.nodeType===t.nodeType&&e.tagName===t.tagName?e.id!==""&&e.id===t.id?!0:M(r,e,t)>0:!1}function R(e,t){return e==null||t==null?!1:e.nodeType===t.nodeType&&e.tagName===t.tagName}function P(e,t,r){for(;e!==t;){let n=e;e=e.nextSibling,j(n,r)}return S(r,t),t.nextSibling}function Y(e,t,r,n,i){let l=M(i,r,t),s=null;if(l>0){let m=n,y=0;for(;m!=null;){if(C(r,m,i))return m;if(y+=M(i,m,e),y>l)return null;m=m.nextSibling}}return s}function G(e,t,r,n,i){let l=n,s=r.nextSibling,m=0;for(;l!=null;){if(M(i,l,e)>0)return null;if(R(r,l))return l;if(R(s,l)&&(m++,s=s.nextSibling,m>=2))return null;l=l.nextSibling}return l}function K(e){let t=new DOMParser,r=e.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(r.match(/<\/html>/)||r.match(/<\/head>/)||r.match(/<\/body>/)){let n=t.parseFromString(e,"text/html");if(r.match(/<\/html>/))return n.generatedByIdiomorph=!0,n;{let i=n.firstChild;return i?(i.generatedByIdiomorph=!0,i):null}}else{let i=t.parseFromString("<body><template>"+e+"</template></body>","text/html").body.querySelector("template").content;return i.generatedByIdiomorph=!0,i}}function Q(e){if(e==null)return document.createElement("div");if(e.generatedByIdiomorph)return e;if(e instanceof Node){let t=document.createElement("div");return t.append(e),t}else{let t=document.createElement("div");for(let r of[...e])t.append(r);return t}}function Z(e,t,r){let n=[],i=[];for(;e!=null;)n.push(e),e=e.previousSibling;for(;n.length>0;){let l=n.pop();i.push(l),t.parentElement.insertBefore(l,t)}for(i.push(t);r!=null;)n.push(r),i.push(r),r=r.nextSibling;for(;n.length>0;)t.parentElement.insertBefore(n.pop(),t.nextSibling);return i}function x(e,t,r){let n;n=e.firstChild;let i=n,l=0;for(;n;){let s=ee(n,t,r);s>l&&(i=n,l=s),n=n.nextSibling}return i}function ee(e,t,r){return R(e,t)?.5+M(r,e,t):0}function j(e,t){S(t,e),t.callbacks.beforeNodeRemoved(e)!==!1&&(e.remove(),t.callbacks.afterNodeRemoved(e))}function te(e,t){return!e.deadIds.has(t)}function re(e,t,r){return(e.idMap.get(r)||a).has(t)}function S(e,t){let r=e.idMap.get(t)||a;for(let n of r)e.deadIds.add(n)}function M(e,t,r){let n=e.idMap.get(t)||a,i=0;for(let l of n)te(e,l)&&re(e,l,r)&&++i;return i}function D(e,t){let r=e.parentElement,n=e.querySelectorAll("[id]");for(let i of n){let l=i;for(;l!==r&&l!=null;){let s=t.get(l);s==null&&(s=new Set,t.set(l,s)),s.add(i.id),l=l.parentElement}}}function ne(e,t){let r=new Map;return D(e,r),D(t,r),r}return{morph:u,defaults:o}}();var de=/INPUT/i,ce=/date|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/i,he=/TEXTAREA/i,me=/TRIX-EDITOR/i,pe=a=>a.nodeType!==Node.ELEMENT_NODE||a!==document.activeElement?!0:a.hasAttribute(w.turboPermanentAttribute)&&a.getAttribute(w.turboPermanentAttribute)!=="false"||a.tagName.match(he)||a.tagName.match(me)?!1:a.tagName.match(de)&&a.getAttribute("type").match(ce),be={beforeNodeMorphed:(a,o)=>pe(a)},ve=(a,o)=>_.morph(a,o,{callbacks:be}),X=ve;var k={before:"turbo-boost:stream:before-invoke",after:"turbo-boost:stream:after-invoke",finish:"turbo-boost:stream:finish-invoke"};function O(a,o,u){let{object:p,target:d}=a;o=o||{},o=U(V({},o),{object:a.object});let f={detail:o,bubbles:!0};d.dispatchEvent(new CustomEvent(k.before,f));let{delay:b}=o.invoke||{};b=b||0;let c=()=>{let g=u(p);f.detail.result=g,d.dispatchEvent(new CustomEvent(k.after,f));let v;g instanceof Animation&&(v=g.finished),g instanceof Promise&&(v=g),v?v.then(()=>{f.detail.promise="fulfilled",d.dispatchEvent(new CustomEvent(k.finish,f))},()=>{f.detail.promise="rejected",d.dispatchEvent(new CustomEvent(k.finish,f))}):d.dispatchEvent(new CustomEvent(k.finish,f))};b>0?setTimeout(c,b):c()}function ge(a,o,u){let p=o[0],d=o[1],f={method:a,eventName:p,eventOptions:d};u.forEach(b=>O(b,f,c=>c.dispatchEvent(new CustomEvent(p,d))))}function Ee(a,o,u){let p=o[0],d={method:a,html:p};u.forEach(f=>O(f,d,b=>X(b,p)))}function Ae(a,o,u){let p=a.slice(0,-1).trim(),d=o[0],f={method:a,property:p,value:d};u.forEach(b=>O(b,f,c=>c[p]=d))}function Se(a,o,u){let p={method:a,args:o};u.forEach(d=>O(d,p,f=>f[a].apply(f,o)))}function $(a,o,u){return a.match(/^dispatch(Event)?$/)?ge(a,o,u):a.match(/^morph|mutate$/)?Ee(a,o,u):a.endsWith("=")?Ae(a,o,u):Se(a,o,u)}function B(){let a=JSON.parse(this.templateContent.textContent),{id:o,selector:u,receiver:p,method:d,args:f,delay:b}=a,c=[{object:self,target:self}];u&&(c=Array.from(document.querySelectorAll(u)).map(g=>({object:g,target:g}))),p&&(c=c.map(g=>{let{object:v,target:H}=g,T=p.split(".");for(;T.length>0;)v=v[T.shift()],v.dispatchEvent&&(H=v);return{object:v,target:H}})),b>0?setTimeout(()=>$(d,f,c),b):$(d,f,c)}if(!self.Turbo)throw new Error("`Turbo` is not defined! Be sure to import `@turbo-boost/streams` after `@hotwired/turbo` or `@hotwired/turbo-rails`.");if(!Turbo.StreamActions)throw new Error("`Turbo.StreamActions` is not defined! Verify that you are running >= `7.2.0` of `@hotwired/turbo`.");Turbo.StreamActions.invoke=B;self.TurboBoost=self.TurboBoost||{};self.TurboBoost.Streams={invoke:B,invokeEvents:k,schema:w,VERSION:W};console.info("@turbo-boost/streams has initialized and registered new stream actions with Turbo.");var De=self.TurboBoost.Streams;export{De as default};
//# sourceMappingURL=streams.js.map
