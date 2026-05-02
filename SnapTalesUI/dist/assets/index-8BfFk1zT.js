(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Mi(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const de={},Nn=[],vt=()=>{},tl=()=>!1,yr=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),vr=t=>t.startsWith("onUpdate:"),Ce=Object.assign,Li=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Lu=Object.prototype.hasOwnProperty,oe=(t,e)=>Lu.call(t,e),z=Array.isArray,xn=t=>Es(t)==="[object Map]",_r=t=>Es(t)==="[object Set]",So=t=>Es(t)==="[object Date]",Y=t=>typeof t=="function",_e=t=>typeof t=="string",Je=t=>typeof t=="symbol",ae=t=>t!==null&&typeof t=="object",nl=t=>(ae(t)||Y(t))&&Y(t.then)&&Y(t.catch),sl=Object.prototype.toString,Es=t=>sl.call(t),Fu=t=>Es(t).slice(8,-1),rl=t=>Es(t)==="[object Object]",br=t=>_e(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,es=Mi(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),wr=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},Uu=/-\w/g,et=wr(t=>t.replace(Uu,e=>e.slice(1).toUpperCase())),Vu=/\B([A-Z])/g,sn=wr(t=>t.replace(Vu,"-$1").toLowerCase()),il=wr(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ur=wr(t=>t?`on${il(t)}`:""),mt=(t,e)=>!Object.is(t,e),Hs=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},ol=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Ir=t=>{const e=parseFloat(t);return isNaN(e)?t:e},Bu=t=>{const e=_e(t)?Number(t):NaN;return isNaN(e)?t:e};let Eo;const Tr=()=>Eo||(Eo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function tn(t){if(z(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=_e(s)?zu(s):tn(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(_e(t)||ae(t))return t}const Hu=/;(?![^(]*\))/g,ju=/:([^]+)/,Wu=/\/\*[^]*?\*\//g;function zu(t){const e={};return t.replace(Wu,"").split(Hu).forEach(n=>{if(n){const s=n.split(ju);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function J(t){let e="";if(_e(t))e=t;else if(z(t))for(let n=0;n<t.length;n++){const s=J(t[n]);s&&(e+=s+" ")}else if(ae(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Ku="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",qu=Mi(Ku);function al(t){return!!t||t===""}function Gu(t,e){if(t.length!==e.length)return!1;let n=!0;for(let s=0;n&&s<t.length;s++)n=Cs(t[s],e[s]);return n}function Cs(t,e){if(t===e)return!0;let n=So(t),s=So(e);if(n||s)return n&&s?t.getTime()===e.getTime():!1;if(n=Je(t),s=Je(e),n||s)return t===e;if(n=z(t),s=z(e),n||s)return n&&s?Gu(t,e):!1;if(n=ae(t),s=ae(e),n||s){if(!n||!s)return!1;const r=Object.keys(t).length,i=Object.keys(e).length;if(r!==i)return!1;for(const o in t){const a=t.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!Cs(t[o],e[o]))return!1}}return String(t)===String(e)}function Ju(t,e){return t.findIndex(n=>Cs(n,e))}const ll=t=>!!(t&&t.__v_isRef===!0),M=t=>_e(t)?t:t==null?"":z(t)||ae(t)&&(t.toString===sl||!Y(t.toString))?ll(t)?M(t.value):JSON.stringify(t,cl,2):String(t),cl=(t,e)=>ll(e)?cl(t,e.value):xn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r],i)=>(n[Vr(s,i)+" =>"]=r,n),{})}:_r(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Vr(n))}:Je(e)?Vr(e):ae(e)&&!z(e)&&!rl(e)?String(e):e,Vr=(t,e="")=>{var n;return Je(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Re;class ul{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=Re,!e&&Re&&(this.index=(Re.scopes||(Re.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Re;try{return Re=this,e()}finally{Re=n}}}on(){++this._on===1&&(this.prevScope=Re,Re=this)}off(){this._on>0&&--this._on===0&&(Re=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function dl(t){return new ul(t)}function fl(){return Re}function Yu(t,e=!1){Re&&Re.cleanups.push(t)}let pe;const Br=new WeakSet;class hl{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Re&&Re.active&&Re.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Br.has(this)&&(Br.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||gl(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Co(this),ml(this);const e=pe,n=tt;pe=this,tt=!0;try{return this.fn()}finally{yl(this),pe=e,tt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Vi(e);this.deps=this.depsTail=void 0,Co(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Br.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){fi(this)&&this.run()}get dirty(){return fi(this)}}let pl=0,ts,ns;function gl(t,e=!1){if(t.flags|=8,e){t.next=ns,ns=t;return}t.next=ts,ts=t}function Fi(){pl++}function Ui(){if(--pl>0)return;if(ns){let e=ns;for(ns=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;ts;){let e=ts;for(ts=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function ml(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function yl(t){let e,n=t.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),Vi(s),Xu(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}t.deps=e,t.depsTail=n}function fi(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(vl(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function vl(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===gs)||(t.globalVersion=gs,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!fi(t))))return;t.flags|=2;const e=t.dep,n=pe,s=tt;pe=t,tt=!0;try{ml(t);const r=t.fn(t._value);(e.version===0||mt(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{pe=n,tt=s,yl(t),t.flags&=-3}}function Vi(t,e=!1){const{dep:n,prevSub:s,nextSub:r}=t;if(s&&(s.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Vi(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Xu(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let tt=!0;const _l=[];function Lt(){_l.push(tt),tt=!1}function Ft(){const t=_l.pop();tt=t===void 0?!0:t}function Co(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=pe;pe=void 0;try{e()}finally{pe=n}}}let gs=0;class Qu{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Bi{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!pe||!tt||pe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==pe)n=this.activeLink=new Qu(pe,this),pe.deps?(n.prevDep=pe.depsTail,pe.depsTail.nextDep=n,pe.depsTail=n):pe.deps=pe.depsTail=n,bl(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=pe.depsTail,n.nextDep=void 0,pe.depsTail.nextDep=n,pe.depsTail=n,pe.deps===n&&(pe.deps=s)}return n}trigger(e){this.version++,gs++,this.notify(e)}notify(e){Fi();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ui()}}}function bl(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)bl(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Ys=new WeakMap,bn=Symbol(""),hi=Symbol(""),ms=Symbol("");function Oe(t,e,n){if(tt&&pe){let s=Ys.get(t);s||Ys.set(t,s=new Map);let r=s.get(n);r||(s.set(n,r=new Bi),r.map=s,r.key=n),r.track()}}function Ot(t,e,n,s,r,i){const o=Ys.get(t);if(!o){gs++;return}const a=l=>{l&&l.trigger()};if(Fi(),e==="clear")o.forEach(a);else{const l=z(t),u=l&&br(n);if(l&&n==="length"){const d=Number(s);o.forEach((f,y)=>{(y==="length"||y===ms||!Je(y)&&y>=d)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),u&&a(o.get(ms)),e){case"add":l?u&&a(o.get("length")):(a(o.get(bn)),xn(t)&&a(o.get(hi)));break;case"delete":l||(a(o.get(bn)),xn(t)&&a(o.get(hi)));break;case"set":xn(t)&&a(o.get(bn));break}}Ui()}function Zu(t,e){const n=Ys.get(t);return n&&n.get(e)}function Pn(t){const e=ne(t);return e===t?e:(Oe(e,"iterate",ms),ze(t)?e:e.map(st))}function Sr(t){return Oe(t=ne(t),"iterate",ms),t}function pt(t,e){return Ut(t)?Vn(Mt(t)?st(e):e):st(e)}const ed={__proto__:null,[Symbol.iterator](){return Hr(this,Symbol.iterator,t=>pt(this,t))},concat(...t){return Pn(this).concat(...t.map(e=>z(e)?Pn(e):e))},entries(){return Hr(this,"entries",t=>(t[1]=pt(this,t[1]),t))},every(t,e){return At(this,"every",t,e,void 0,arguments)},filter(t,e){return At(this,"filter",t,e,n=>n.map(s=>pt(this,s)),arguments)},find(t,e){return At(this,"find",t,e,n=>pt(this,n),arguments)},findIndex(t,e){return At(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return At(this,"findLast",t,e,n=>pt(this,n),arguments)},findLastIndex(t,e){return At(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return At(this,"forEach",t,e,void 0,arguments)},includes(...t){return jr(this,"includes",t)},indexOf(...t){return jr(this,"indexOf",t)},join(t){return Pn(this).join(t)},lastIndexOf(...t){return jr(this,"lastIndexOf",t)},map(t,e){return At(this,"map",t,e,void 0,arguments)},pop(){return qn(this,"pop")},push(...t){return qn(this,"push",t)},reduce(t,...e){return Ao(this,"reduce",t,e)},reduceRight(t,...e){return Ao(this,"reduceRight",t,e)},shift(){return qn(this,"shift")},some(t,e){return At(this,"some",t,e,void 0,arguments)},splice(...t){return qn(this,"splice",t)},toReversed(){return Pn(this).toReversed()},toSorted(t){return Pn(this).toSorted(t)},toSpliced(...t){return Pn(this).toSpliced(...t)},unshift(...t){return qn(this,"unshift",t)},values(){return Hr(this,"values",t=>pt(this,t))}};function Hr(t,e,n){const s=Sr(t),r=s[e]();return s!==t&&!ze(t)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=n(i.value)),i}),r}const td=Array.prototype;function At(t,e,n,s,r,i){const o=Sr(t),a=o!==t&&!ze(t),l=o[e];if(l!==td[e]){const f=l.apply(t,i);return a?st(f):f}let u=n;o!==t&&(a?u=function(f,y){return n.call(this,pt(t,f),y,t)}:n.length>2&&(u=function(f,y){return n.call(this,f,y,t)}));const d=l.call(o,u,s);return a&&r?r(d):d}function Ao(t,e,n,s){const r=Sr(t),i=r!==t&&!ze(t);let o=n,a=!1;r!==t&&(i?(a=s.length===0,o=function(u,d,f){return a&&(a=!1,u=pt(t,u)),n.call(this,u,pt(t,d),f,t)}):n.length>3&&(o=function(u,d,f){return n.call(this,u,d,f,t)}));const l=r[e](o,...s);return a?pt(t,l):l}function jr(t,e,n){const s=ne(t);Oe(s,"iterate",ms);const r=s[e](...n);return(r===-1||r===!1)&&Er(n[0])?(n[0]=ne(n[0]),s[e](...n)):r}function qn(t,e,n=[]){Lt(),Fi();const s=ne(t)[e].apply(t,n);return Ui(),Ft(),s}const nd=Mi("__proto__,__v_isRef,__isVue"),wl=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Je));function sd(t){Je(t)||(t=String(t));const e=ne(this);return Oe(e,"has",t),e.hasOwnProperty(t)}class Il{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?hd:Cl:i?El:Sl).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=z(e);if(!r){let l;if(o&&(l=ed[n]))return l;if(n==="hasOwnProperty")return sd}const a=Reflect.get(e,n,ve(e)?e:s);if((Je(n)?wl.has(n):nd(n))||(r||Oe(e,"get",n),i))return a;if(ve(a)){const l=o&&br(n)?a:a.value;return r&&ae(l)?gi(l):l}return ae(a)?r?gi(a):Cn(a):a}}class Tl extends Il{constructor(e=!1){super(!1,e)}set(e,n,s,r){let i=e[n];const o=z(e)&&br(n);if(!this._isShallow){const u=Ut(i);if(!ze(s)&&!Ut(s)&&(i=ne(i),s=ne(s)),!o&&ve(i)&&!ve(s))return u||(i.value=s),!0}const a=o?Number(n)<e.length:oe(e,n),l=Reflect.set(e,n,s,ve(e)?e:r);return e===ne(r)&&(a?mt(s,i)&&Ot(e,"set",n,s):Ot(e,"add",n,s)),l}deleteProperty(e,n){const s=oe(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&s&&Ot(e,"delete",n,void 0),r}has(e,n){const s=Reflect.has(e,n);return(!Je(n)||!wl.has(n))&&Oe(e,"has",n),s}ownKeys(e){return Oe(e,"iterate",z(e)?"length":bn),Reflect.ownKeys(e)}}class rd extends Il{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const id=new Tl,od=new rd,ad=new Tl(!0);const pi=t=>t,Ds=t=>Reflect.getPrototypeOf(t);function ld(t,e,n){return function(...s){const r=this.__v_raw,i=ne(r),o=xn(i),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,u=r[t](...s),d=n?pi:e?Vn:st;return!e&&Oe(i,"iterate",l?hi:bn),Ce(Object.create(u),{next(){const{value:f,done:y}=u.next();return y?{value:f,done:y}:{value:a?[d(f[0]),d(f[1])]:d(f),done:y}}})}}function Ms(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function cd(t,e){const n={get(r){const i=this.__v_raw,o=ne(i),a=ne(r);t||(mt(r,a)&&Oe(o,"get",r),Oe(o,"get",a));const{has:l}=Ds(o),u=e?pi:t?Vn:st;if(l.call(o,r))return u(i.get(r));if(l.call(o,a))return u(i.get(a));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!t&&Oe(ne(r),"iterate",bn),r.size},has(r){const i=this.__v_raw,o=ne(i),a=ne(r);return t||(mt(r,a)&&Oe(o,"has",r),Oe(o,"has",a)),r===a?i.has(r):i.has(r)||i.has(a)},forEach(r,i){const o=this,a=o.__v_raw,l=ne(a),u=e?pi:t?Vn:st;return!t&&Oe(l,"iterate",bn),a.forEach((d,f)=>r.call(i,u(d),u(f),o))}};return Ce(n,t?{add:Ms("add"),set:Ms("set"),delete:Ms("delete"),clear:Ms("clear")}:{add(r){const i=ne(this),o=Ds(i),a=ne(r),l=!e&&!ze(r)&&!Ut(r)?a:r;return o.has.call(i,l)||mt(r,l)&&o.has.call(i,r)||mt(a,l)&&o.has.call(i,a)||(i.add(l),Ot(i,"add",l,l)),this},set(r,i){!e&&!ze(i)&&!Ut(i)&&(i=ne(i));const o=ne(this),{has:a,get:l}=Ds(o);let u=a.call(o,r);u||(r=ne(r),u=a.call(o,r));const d=l.call(o,r);return o.set(r,i),u?mt(i,d)&&Ot(o,"set",r,i):Ot(o,"add",r,i),this},delete(r){const i=ne(this),{has:o,get:a}=Ds(i);let l=o.call(i,r);l||(r=ne(r),l=o.call(i,r)),a&&a.call(i,r);const u=i.delete(r);return l&&Ot(i,"delete",r,void 0),u},clear(){const r=ne(this),i=r.size!==0,o=r.clear();return i&&Ot(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=ld(r,t,e)}),n}function Hi(t,e){const n=cd(t,e);return(s,r,i)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(oe(n,r)&&r in s?n:s,r,i)}const ud={get:Hi(!1,!1)},dd={get:Hi(!1,!0)},fd={get:Hi(!0,!1)};const Sl=new WeakMap,El=new WeakMap,Cl=new WeakMap,hd=new WeakMap;function pd(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function gd(t){return t.__v_skip||!Object.isExtensible(t)?0:pd(Fu(t))}function Cn(t){return Ut(t)?t:ji(t,!1,id,ud,Sl)}function md(t){return ji(t,!1,ad,dd,El)}function gi(t){return ji(t,!0,od,fd,Cl)}function ji(t,e,n,s,r){if(!ae(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=gd(t);if(i===0)return t;const o=r.get(t);if(o)return o;const a=new Proxy(t,i===2?s:n);return r.set(t,a),a}function Mt(t){return Ut(t)?Mt(t.__v_raw):!!(t&&t.__v_isReactive)}function Ut(t){return!!(t&&t.__v_isReadonly)}function ze(t){return!!(t&&t.__v_isShallow)}function Er(t){return t?!!t.__v_raw:!1}function ne(t){const e=t&&t.__v_raw;return e?ne(e):t}function Wi(t){return!oe(t,"__v_skip")&&Object.isExtensible(t)&&ol(t,"__v_skip",!0),t}const st=t=>ae(t)?Cn(t):t,Vn=t=>ae(t)?gi(t):t;function ve(t){return t?t.__v_isRef===!0:!1}function Q(t){return yd(t,!1)}function yd(t,e){return ve(t)?t:new vd(t,e)}class vd{constructor(e,n){this.dep=new Bi,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:ne(e),this._value=n?e:st(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||ze(e)||Ut(e);e=s?e:ne(e),mt(e,n)&&(this._rawValue=e,this._value=s?e:st(e),this.dep.trigger())}}function v(t){return ve(t)?t.value:t}const _d={get:(t,e,n)=>e==="__v_raw"?t:v(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return ve(r)&&!ve(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function Al(t){return Mt(t)?t:new Proxy(t,_d)}function bd(t){const e=z(t)?new Array(t.length):{};for(const n in t)e[n]=Id(t,n);return e}class wd{constructor(e,n,s){this._object=e,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0,this._key=Je(n)?n:String(n),this._raw=ne(e);let r=!0,i=e;if(!z(e)||Je(this._key)||!br(this._key))do r=!Er(i)||ze(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=v(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&ve(this._raw[this._key])){const n=this._object[this._key];if(ve(n)){n.value=e;return}}this._object[this._key]=e}get dep(){return Zu(this._raw,this._key)}}function Id(t,e,n){return new wd(t,e,n)}class Td{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Bi(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=gs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&pe!==this)return gl(this,!0),!0}get value(){const e=this.dep.track();return vl(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Sd(t,e,n=!1){let s,r;return Y(t)?s=t:(s=t.get,r=t.set),new Td(s,r,n)}const Ls={},Xs=new WeakMap;let fn;function Ed(t,e=!1,n=fn){if(n){let s=Xs.get(n);s||Xs.set(n,s=[]),s.push(t)}}function Cd(t,e,n=de){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:a,call:l}=n,u=V=>r?V:ze(V)||r===!1||r===0?Nt(V,1):Nt(V);let d,f,y,_,m=!1,w=!1;if(ve(t)?(f=()=>t.value,m=ze(t)):Mt(t)?(f=()=>u(t),m=!0):z(t)?(w=!0,m=t.some(V=>Mt(V)||ze(V)),f=()=>t.map(V=>{if(ve(V))return V.value;if(Mt(V))return u(V);if(Y(V))return l?l(V,2):V()})):Y(t)?e?f=l?()=>l(t,2):t:f=()=>{if(y){Lt();try{y()}finally{Ft()}}const V=fn;fn=d;try{return l?l(t,3,[_]):t(_)}finally{fn=V}}:f=vt,e&&r){const V=f,W=r===!0?1/0:r;f=()=>Nt(V(),W)}const H=fl(),R=()=>{d.stop(),H&&H.active&&Li(H.effects,d)};if(i&&e){const V=e;e=(...W)=>{V(...W),R()}}let p=w?new Array(t.length).fill(Ls):Ls;const $=V=>{if(!(!(d.flags&1)||!d.dirty&&!V))if(e){const W=d.run();if(r||m||(w?W.some((F,I)=>mt(F,p[I])):mt(W,p))){y&&y();const F=fn;fn=d;try{const I=[W,p===Ls?void 0:w&&p[0]===Ls?[]:p,_];p=W,l?l(e,3,I):e(...I)}finally{fn=F}}}else d.run()};return a&&a($),d=new hl(f),d.scheduler=o?()=>o($,!1):$,_=V=>Ed(V,!1,d),y=d.onStop=()=>{const V=Xs.get(d);if(V){if(l)l(V,4);else for(const W of V)W();Xs.delete(d)}},e?s?$(!0):p=d.run():o?o($.bind(null,!0),!0):d.run(),R.pause=d.pause.bind(d),R.resume=d.resume.bind(d),R.stop=R,R}function Nt(t,e=1/0,n){if(e<=0||!ae(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,ve(t))Nt(t.value,e,n);else if(z(t))for(let s=0;s<t.length;s++)Nt(t[s],e,n);else if(_r(t)||xn(t))t.forEach(s=>{Nt(s,e,n)});else if(rl(t)){for(const s in t)Nt(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&Nt(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function As(t,e,n,s){try{return s?t(...s):t()}catch(r){Cr(r,e,n)}}function rt(t,e,n,s){if(Y(t)){const r=As(t,e,n,s);return r&&nl(r)&&r.catch(i=>{Cr(i,e,n)}),r}if(z(t)){const r=[];for(let i=0;i<t.length;i++)r.push(rt(t[i],e,n,s));return r}}function Cr(t,e,n,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||de;if(e){let a=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const d=a.ec;if(d){for(let f=0;f<d.length;f++)if(d[f](t,l,u)===!1)return}a=a.parent}if(i){Lt(),As(i,null,10,[t,l,u]),Ft();return}}Ad(t,n,r,s,o)}function Ad(t,e,n,s=!0,r=!1){if(r)throw t;console.error(t)}const $e=[];let ft=-1;const $n=[];let Gt=null,On=0;const kl=Promise.resolve();let Qs=null;function ks(t){const e=Qs||kl;return t?e.then(this?t.bind(this):t):e}function kd(t){let e=ft+1,n=$e.length;for(;e<n;){const s=e+n>>>1,r=$e[s],i=ys(r);i<t||i===t&&r.flags&2?e=s+1:n=s}return e}function zi(t){if(!(t.flags&1)){const e=ys(t),n=$e[$e.length-1];!n||!(t.flags&2)&&e>=ys(n)?$e.push(t):$e.splice(kd(e),0,t),t.flags|=1,Pl()}}function Pl(){Qs||(Qs=kl.then(Ol))}function Pd(t){z(t)?$n.push(...t):Gt&&t.id===-1?Gt.splice(On+1,0,t):t.flags&1||($n.push(t),t.flags|=1),Pl()}function ko(t,e,n=ft+1){for(;n<$e.length;n++){const s=$e[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;$e.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Rl(t){if($n.length){const e=[...new Set($n)].sort((n,s)=>ys(n)-ys(s));if($n.length=0,Gt){Gt.push(...e);return}for(Gt=e,On=0;On<Gt.length;On++){const n=Gt[On];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Gt=null,On=0}}const ys=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Ol(t){try{for(ft=0;ft<$e.length;ft++){const e=$e[ft];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),As(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ft<$e.length;ft++){const e=$e[ft];e&&(e.flags&=-2)}ft=-1,$e.length=0,Rl(),Qs=null,($e.length||$n.length)&&Ol()}}let Ge=null,Nl=null;function Zs(t){const e=Ge;return Ge=t,Nl=t&&t.type.__scopeId||null,e}function vs(t,e=Ge,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&nr(-1);const i=Zs(e);let o;try{o=t(...r)}finally{Zs(i),s._d&&nr(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function ye(t,e){if(Ge===null)return t;const n=Or(Ge),s=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[i,o,a,l=de]=e[r];i&&(Y(i)&&(i={mounted:i,updated:i}),i.deep&&Nt(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:l}))}return t}function on(t,e,n,s){const r=t.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];i&&(a.oldValue=i[o].value);let l=a.dir[s];l&&(Lt(),rt(l,n,8,[t.el,a,t,e]),Ft())}}function Rd(t,e){if(Me){let n=Me.provides;const s=Me.parent&&Me.parent.provides;s===n&&(n=Me.provides=Object.create(s)),n[t]=e}}function ss(t,e,n=!1){const s=Qi();if(s||wn){let r=wn?wn._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&Y(e)?e.call(s&&s.proxy):e}}function Od(){return!!(Qi()||wn)}const Nd=Symbol.for("v-scx"),xd=()=>ss(Nd);function nt(t,e,n){return xl(t,e,n)}function xl(t,e,n=de){const{immediate:s,deep:r,flush:i,once:o}=n,a=Ce({},n),l=e&&s||!e&&i!=="post";let u;if(ws){if(i==="sync"){const _=xd();u=_.__watcherHandles||(_.__watcherHandles=[])}else if(!l){const _=()=>{};return _.stop=vt,_.resume=vt,_.pause=vt,_}}const d=Me;a.call=(_,m,w)=>rt(_,d,m,w);let f=!1;i==="post"?a.scheduler=_=>{xe(_,d&&d.suspense)}:i!=="sync"&&(f=!0,a.scheduler=(_,m)=>{m?_():zi(_)}),a.augmentJob=_=>{e&&(_.flags|=4),f&&(_.flags|=2,d&&(_.id=d.uid,_.i=d))};const y=Cd(t,e,a);return ws&&(u?u.push(y):l&&y()),y}function $d(t,e,n){const s=this.proxy,r=_e(t)?t.includes(".")?$l(s,t):()=>s[t]:t.bind(s,s);let i;Y(e)?i=e:(i=e.handler,n=e);const o=Ps(this),a=xl(r,i.bind(s),n);return o(),a}function $l(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const an=new WeakMap,Dl=Symbol("_vte"),Ml=t=>t.__isTeleport,pn=t=>t&&(t.disabled||t.disabled===""),Dd=t=>t&&(t.defer||t.defer===""),Po=t=>typeof SVGElement<"u"&&t instanceof SVGElement,Ro=t=>typeof MathMLElement=="function"&&t instanceof MathMLElement,mi=(t,e)=>{const n=t&&t.to;return _e(n)?e?e(n):null:n},Md={name:"Teleport",__isTeleport:!0,process(t,e,n,s,r,i,o,a,l,u){const{mc:d,pc:f,pbc:y,o:{insert:_,querySelector:m,createText:w,createComment:H}}=u,R=pn(e.props);let{dynamicChildren:p}=e;const $=(F,I,P)=>{F.shapeFlag&16&&d(F.children,I,P,r,i,o,a,l)},V=(F=e)=>{const I=pn(F.props),P=F.target=mi(F.props,m),N=yi(P,F,w,_);P&&(o!=="svg"&&Po(P)?o="svg":o!=="mathml"&&Ro(P)&&(o="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(P),I||($(F,P,N),Xn(F,!1)))},W=F=>{const I=()=>{an.get(F)===I&&(an.delete(F),pn(F.props)&&($(F,n,F.anchor),Xn(F,!0)),V(F))};an.set(F,I),xe(I,i)};if(t==null){const F=e.el=w(""),I=e.anchor=w("");if(_(F,n,s),_(I,n,s),Dd(e.props)||i&&i.pendingBranch){W(e);return}R&&($(e,n,I),Xn(e,!0)),V()}else{e.el=t.el;const F=e.anchor=t.anchor,I=an.get(t);if(I){I.flags|=8,an.delete(t),W(e);return}e.targetStart=t.targetStart;const P=e.target=t.target,N=e.targetAnchor=t.targetAnchor,q=pn(t.props),ee=q?n:P,L=q?F:N;if(o==="svg"||Po(P)?o="svg":(o==="mathml"||Ro(P))&&(o="mathml"),p?(y(t.dynamicChildren,p,ee,r,i,o,a),Yi(t,e,!0)):l||f(t,e,ee,L,r,i,o,a,!1),R)q?e.props&&t.props&&e.props.to!==t.props.to&&(e.props.to=t.props.to):Fs(e,n,F,u,1);else if((e.props&&e.props.to)!==(t.props&&t.props.to)){const te=e.target=mi(e.props,m);te&&Fs(e,te,null,u,0)}else q&&Fs(e,P,N,u,1);Xn(e,R)}},remove(t,e,n,{um:s,o:{remove:r}},i){const{shapeFlag:o,children:a,anchor:l,targetStart:u,targetAnchor:d,target:f,props:y}=t;let _=i||!pn(y);const m=an.get(t);if(m&&(m.flags|=8,an.delete(t),_=!1),f&&(r(u),r(d)),i&&r(l),o&16)for(let w=0;w<a.length;w++){const H=a[w];s(H,e,n,_,!!H.dynamicChildren)}},move:Fs,hydrate:Ld};function Fs(t,e,n,{o:{insert:s},m:r},i=2){i===0&&s(t.targetAnchor,e,n);const{el:o,anchor:a,shapeFlag:l,children:u,props:d}=t,f=i===2;if(f&&s(o,e,n),(!f||pn(d))&&l&16)for(let y=0;y<u.length;y++)r(u[y],e,n,2);f&&s(a,e,n)}function Ld(t,e,n,s,r,i,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:u,createText:d}},f){function y(H,R){let p=R;for(;p;){if(p&&p.nodeType===8){if(p.data==="teleport start anchor")e.targetStart=p;else if(p.data==="teleport anchor"){e.targetAnchor=p,H._lpa=e.targetAnchor&&o(e.targetAnchor);break}}p=o(p)}}function _(H,R){R.anchor=f(o(H),R,a(H),n,s,r,i)}const m=e.target=mi(e.props,l),w=pn(e.props);if(m){const H=m._lpa||m.firstChild;e.shapeFlag&16&&(w?(_(t,e),y(m,H),e.targetAnchor||yi(m,e,d,u,a(t)===m?t:null)):(e.anchor=o(t),y(m,H),e.targetAnchor||yi(m,e,d,u),f(H&&o(H),e,m,n,s,r,i))),Xn(e,w)}else w&&e.shapeFlag&16&&(_(t,e),e.targetStart=t,e.targetAnchor=o(t));return e.anchor&&o(e.anchor)}const Ll=Md;function Xn(t,e){const n=t.ctx;if(n&&n.ut){let s,r;for(e?(s=t.el,r=t.anchor):(s=t.targetStart,r=t.targetAnchor);s&&s!==r;)s.nodeType===1&&s.setAttribute("data-v-owner",n.uid),s=s.nextSibling;n.ut()}}function yi(t,e,n,s,r=null){const i=e.targetStart=n(""),o=e.targetAnchor=n("");return i[Dl]=o,t&&(s(i,t,r),s(o,t,r)),o}const ht=Symbol("_leaveCb"),Gn=Symbol("_enterCb");function Fd(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Ki(()=>{t.isMounted=!0}),zl(()=>{t.isUnmounting=!0}),t}const qe=[Function,Array],Fl={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:qe,onEnter:qe,onAfterEnter:qe,onEnterCancelled:qe,onBeforeLeave:qe,onLeave:qe,onAfterLeave:qe,onLeaveCancelled:qe,onBeforeAppear:qe,onAppear:qe,onAfterAppear:qe,onAppearCancelled:qe},Ul=t=>{const e=t.subTree;return e.component?Ul(e.component):e},Ud={name:"BaseTransition",props:Fl,setup(t,{slots:e}){const n=Qi(),s=Fd();return()=>{const r=e.default&&Hl(e.default(),!0);if(!r||!r.length)return;const i=Vl(r),o=ne(t),{mode:a}=o;if(s.isLeaving)return Wr(i);const l=Oo(i);if(!l)return Wr(i);let u=vi(l,o,s,n,f=>u=f);l.type!==De&&_s(l,u);let d=n.subTree&&Oo(n.subTree);if(d&&d.type!==De&&!gn(d,l)&&Ul(n).type!==De){let f=vi(d,o,s,n);if(_s(d,f),a==="out-in"&&l.type!==De)return s.isLeaving=!0,f.afterLeave=()=>{s.isLeaving=!1,n.job.flags&8||n.update(),delete f.afterLeave,d=void 0},Wr(i);a==="in-out"&&l.type!==De?f.delayLeave=(y,_,m)=>{const w=Bl(s,d);w[String(d.key)]=d,y[ht]=()=>{_(),y[ht]=void 0,delete u.delayedLeave,d=void 0},u.delayedLeave=()=>{m(),delete u.delayedLeave,d=void 0}}:d=void 0}else d&&(d=void 0);return i}}};function Vl(t){let e=t[0];if(t.length>1){for(const n of t)if(n.type!==De){e=n;break}}return e}const Vd=Ud;function Bl(t,e){const{leavingVNodes:n}=t;let s=n.get(e.type);return s||(s=Object.create(null),n.set(e.type,s)),s}function vi(t,e,n,s,r){const{appear:i,mode:o,persisted:a=!1,onBeforeEnter:l,onEnter:u,onAfterEnter:d,onEnterCancelled:f,onBeforeLeave:y,onLeave:_,onAfterLeave:m,onLeaveCancelled:w,onBeforeAppear:H,onAppear:R,onAfterAppear:p,onAppearCancelled:$}=e,V=String(t.key),W=Bl(n,t),F=(N,q)=>{N&&rt(N,s,9,q)},I=(N,q)=>{const ee=q[1];F(N,q),z(N)?N.every(L=>L.length<=1)&&ee():N.length<=1&&ee()},P={mode:o,persisted:a,beforeEnter(N){let q=l;if(!n.isMounted)if(i)q=H||l;else return;N[ht]&&N[ht](!0);const ee=W[V];ee&&gn(t,ee)&&ee.el[ht]&&ee.el[ht](),F(q,[N])},enter(N){if(W[V]===t)return;let q=u,ee=d,L=f;if(!n.isMounted)if(i)q=R||u,ee=p||d,L=$||f;else return;let te=!1;N[Gn]=Ae=>{te||(te=!0,Ae?F(L,[N]):F(ee,[N]),P.delayedLeave&&P.delayedLeave(),N[Gn]=void 0)};const we=N[Gn].bind(null,!1);q?I(q,[N,we]):we()},leave(N,q){const ee=String(t.key);if(N[Gn]&&N[Gn](!0),n.isUnmounting)return q();F(y,[N]);let L=!1;N[ht]=we=>{L||(L=!0,q(),we?F(w,[N]):F(m,[N]),N[ht]=void 0,W[ee]===t&&delete W[ee])};const te=N[ht].bind(null,!1);W[ee]=t,_?I(_,[N,te]):te()},clone(N){const q=vi(N,e,n,s,r);return r&&r(q),q}};return P}function Wr(t){if(Ar(t))return t=nn(t),t.children=null,t}function Oo(t){if(!Ar(t))return Ml(t.type)&&t.children?Vl(t.children):t;if(t.component)return t.component.subTree;const{shapeFlag:e,children:n}=t;if(n){if(e&16)return n[0];if(e&32&&Y(n.default))return n.default()}}function _s(t,e){t.shapeFlag&6&&t.component?(t.transition=e,_s(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Hl(t,e=!1,n){let s=[],r=0;for(let i=0;i<t.length;i++){let o=t[i];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===re?(o.patchFlag&128&&r++,s=s.concat(Hl(o.children,e,a))):(e||o.type!==De)&&s.push(a!=null?nn(o,{key:a}):o)}if(r>1)for(let i=0;i<s.length;i++)s[i].patchFlag=-2;return s}function it(t,e){return Y(t)?Ce({name:t.name},e,{setup:t}):t}function jl(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function No(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const er=new WeakMap;function rs(t,e,n,s,r=!1){if(z(t)){t.forEach((w,H)=>rs(w,e&&(z(e)?e[H]:e),n,s,r));return}if(is(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&rs(t,e,n,s.component.subTree);return}const i=s.shapeFlag&4?Or(s.component):s.el,o=r?null:i,{i:a,r:l}=t,u=e&&e.r,d=a.refs===de?a.refs={}:a.refs,f=a.setupState,y=ne(f),_=f===de?tl:w=>No(d,w)?!1:oe(y,w),m=(w,H)=>!(H&&No(d,H));if(u!=null&&u!==l){if(xo(e),_e(u))d[u]=null,_(u)&&(f[u]=null);else if(ve(u)){const w=e;m(u,w.k)&&(u.value=null),w.k&&(d[w.k]=null)}}if(Y(l))As(l,a,12,[o,d]);else{const w=_e(l),H=ve(l);if(w||H){const R=()=>{if(t.f){const p=w?_(l)?f[l]:d[l]:m()||!t.k?l.value:d[t.k];if(r)z(p)&&Li(p,i);else if(z(p))p.includes(i)||p.push(i);else if(w)d[l]=[i],_(l)&&(f[l]=d[l]);else{const $=[i];m(l,t.k)&&(l.value=$),t.k&&(d[t.k]=$)}}else w?(d[l]=o,_(l)&&(f[l]=o)):H&&(m(l,t.k)&&(l.value=o),t.k&&(d[t.k]=o))};if(o){const p=()=>{R(),er.delete(t)};p.id=-1,er.set(t,p),xe(p,n)}else xo(t),R()}}}function xo(t){const e=er.get(t);e&&(e.flags|=8,er.delete(t))}Tr().requestIdleCallback;Tr().cancelIdleCallback;const is=t=>!!t.type.__asyncLoader,Ar=t=>t.type.__isKeepAlive;function Bd(t,e){Wl(t,"a",e)}function Hd(t,e){Wl(t,"da",e)}function Wl(t,e,n=Me){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(kr(e,s,n),n){let r=n.parent;for(;r&&r.parent;)Ar(r.parent.vnode)&&jd(s,e,n,r),r=r.parent}}function jd(t,e,n,s){const r=kr(e,t,s,!0);qi(()=>{Li(s[e],r)},n)}function kr(t,e,n=Me,s=!1){if(n){const r=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Lt();const a=Ps(n),l=rt(e,n,t,o);return a(),Ft(),l});return s?r.unshift(i):r.push(i),i}}const jt=t=>(e,n=Me)=>{(!ws||t==="sp")&&kr(t,(...s)=>e(...s),n)},Wd=jt("bm"),Ki=jt("m"),zd=jt("bu"),Kd=jt("u"),zl=jt("bum"),qi=jt("um"),qd=jt("sp"),Gd=jt("rtg"),Jd=jt("rtc");function Yd(t,e=Me){kr("ec",t,e)}const Xd=Symbol.for("v-ndc");function Le(t,e,n,s){let r;const i=n,o=z(t);if(o||_e(t)){const a=o&&Mt(t);let l=!1,u=!1;a&&(l=!ze(t),u=Ut(t),t=Sr(t)),r=new Array(t.length);for(let d=0,f=t.length;d<f;d++)r[d]=e(l?u?Vn(st(t[d])):st(t[d]):t[d],d,void 0,i)}else if(typeof t=="number"){r=new Array(t);for(let a=0;a<t;a++)r[a]=e(a+1,a,void 0,i)}else if(ae(t))if(t[Symbol.iterator])r=Array.from(t,(a,l)=>e(a,l,void 0,i));else{const a=Object.keys(t);r=new Array(a.length);for(let l=0,u=a.length;l<u;l++){const d=a[l];r[l]=e(t[d],d,l,i)}}else r=[];return r}const _i=t=>t?uc(t)?Or(t):_i(t.parent):null,os=Ce(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>_i(t.parent),$root:t=>_i(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>ql(t),$forceUpdate:t=>t.f||(t.f=()=>{zi(t.update)}),$nextTick:t=>t.n||(t.n=ks.bind(t.proxy)),$watch:t=>$d.bind(t)}),zr=(t,e)=>t!==de&&!t.__isScriptSetup&&oe(t,e),Qd={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:a,appContext:l}=t;if(e[0]!=="$"){const y=o[e];if(y!==void 0)switch(y){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return i[e]}else{if(zr(s,e))return o[e]=1,s[e];if(r!==de&&oe(r,e))return o[e]=2,r[e];if(oe(i,e))return o[e]=3,i[e];if(n!==de&&oe(n,e))return o[e]=4,n[e];bi&&(o[e]=0)}}const u=os[e];let d,f;if(u)return e==="$attrs"&&Oe(t.attrs,"get",""),u(t);if((d=a.__cssModules)&&(d=d[e]))return d;if(n!==de&&oe(n,e))return o[e]=4,n[e];if(f=l.config.globalProperties,oe(f,e))return f[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:i}=t;return zr(r,e)?(r[e]=n,!0):s!==de&&oe(s,e)?(s[e]=n,!0):oe(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,props:i,type:o}},a){let l;return!!(n[a]||t!==de&&a[0]!=="$"&&oe(t,a)||zr(e,a)||oe(i,a)||oe(s,a)||oe(os,a)||oe(r.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:oe(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function $o(t){return z(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let bi=!0;function Zd(t){const e=ql(t),n=t.proxy,s=t.ctx;bi=!1,e.beforeCreate&&Do(e.beforeCreate,t,"bc");const{data:r,computed:i,methods:o,watch:a,provide:l,inject:u,created:d,beforeMount:f,mounted:y,beforeUpdate:_,updated:m,activated:w,deactivated:H,beforeDestroy:R,beforeUnmount:p,destroyed:$,unmounted:V,render:W,renderTracked:F,renderTriggered:I,errorCaptured:P,serverPrefetch:N,expose:q,inheritAttrs:ee,components:L,directives:te,filters:we}=e;if(u&&ef(u,s,null),o)for(const Z in o){const le=o[Z];Y(le)&&(s[Z]=le.bind(n))}if(r){const Z=r.call(n,n);ae(Z)&&(t.data=Cn(Z))}if(bi=!0,i)for(const Z in i){const le=i[Z],Et=Y(le)?le.bind(n,n):Y(le.get)?le.get.bind(n,n):vt,kn=!Y(le)&&Y(le.set)?le.set.bind(n):vt,Be=Pe({get:Et,set:kn});Object.defineProperty(s,Z,{enumerable:!0,configurable:!0,get:()=>Be.value,set:He=>Be.value=He})}if(a)for(const Z in a)Kl(a[Z],s,n,Z);if(l){const Z=Y(l)?l.call(n):l;Reflect.ownKeys(Z).forEach(le=>{Rd(le,Z[le])})}d&&Do(d,t,"c");function ie(Z,le){z(le)?le.forEach(Et=>Z(Et.bind(n))):le&&Z(le.bind(n))}if(ie(Wd,f),ie(Ki,y),ie(zd,_),ie(Kd,m),ie(Bd,w),ie(Hd,H),ie(Yd,P),ie(Jd,F),ie(Gd,I),ie(zl,p),ie(qi,V),ie(qd,N),z(q))if(q.length){const Z=t.exposed||(t.exposed={});q.forEach(le=>{Object.defineProperty(Z,le,{get:()=>n[le],set:Et=>n[le]=Et,enumerable:!0})})}else t.exposed||(t.exposed={});W&&t.render===vt&&(t.render=W),ee!=null&&(t.inheritAttrs=ee),L&&(t.components=L),te&&(t.directives=te),N&&jl(t)}function ef(t,e,n=vt){z(t)&&(t=wi(t));for(const s in t){const r=t[s];let i;ae(r)?"default"in r?i=ss(r.from||s,r.default,!0):i=ss(r.from||s):i=ss(r),ve(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function Do(t,e,n){rt(z(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Kl(t,e,n,s){let r=s.includes(".")?$l(n,s):()=>n[s];if(_e(t)){const i=e[t];Y(i)&&nt(r,i)}else if(Y(t))nt(r,t.bind(n));else if(ae(t))if(z(t))t.forEach(i=>Kl(i,e,n,s));else{const i=Y(t.handler)?t.handler.bind(n):e[t.handler];Y(i)&&nt(r,i,t)}}function ql(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let l;return a?l=a:!r.length&&!n&&!s?l=e:(l={},r.length&&r.forEach(u=>tr(l,u,o,!0)),tr(l,e,o)),ae(e)&&i.set(e,l),l}function tr(t,e,n,s=!1){const{mixins:r,extends:i}=e;i&&tr(t,i,n,!0),r&&r.forEach(o=>tr(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const a=tf[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const tf={data:Mo,props:Lo,emits:Lo,methods:Qn,computed:Qn,beforeCreate:Ne,created:Ne,beforeMount:Ne,mounted:Ne,beforeUpdate:Ne,updated:Ne,beforeDestroy:Ne,beforeUnmount:Ne,destroyed:Ne,unmounted:Ne,activated:Ne,deactivated:Ne,errorCaptured:Ne,serverPrefetch:Ne,components:Qn,directives:Qn,watch:sf,provide:Mo,inject:nf};function Mo(t,e){return e?t?function(){return Ce(Y(t)?t.call(this,this):t,Y(e)?e.call(this,this):e)}:e:t}function nf(t,e){return Qn(wi(t),wi(e))}function wi(t){if(z(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Ne(t,e){return t?[...new Set([].concat(t,e))]:e}function Qn(t,e){return t?Ce(Object.create(null),t,e):e}function Lo(t,e){return t?z(t)&&z(e)?[...new Set([...t,...e])]:Ce(Object.create(null),$o(t),$o(e??{})):e}function sf(t,e){if(!t)return e;if(!e)return t;const n=Ce(Object.create(null),t);for(const s in e)n[s]=Ne(t[s],e[s]);return n}function Gl(){return{app:null,config:{isNativeTag:tl,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let rf=0;function of(t,e){return function(s,r=null){Y(s)||(s=Ce({},s)),r!=null&&!ae(r)&&(r=null);const i=Gl(),o=new WeakSet,a=[];let l=!1;const u=i.app={_uid:rf++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:Ff,get config(){return i.config},set config(d){},use(d,...f){return o.has(d)||(d&&Y(d.install)?(o.add(d),d.install(u,...f)):Y(d)&&(o.add(d),d(u,...f))),u},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),u},component(d,f){return f?(i.components[d]=f,u):i.components[d]},directive(d,f){return f?(i.directives[d]=f,u):i.directives[d]},mount(d,f,y){if(!l){const _=u._ceVNode||Se(s,r);return _.appContext=i,y===!0?y="svg":y===!1&&(y=void 0),t(_,d,y),l=!0,u._container=d,d.__vue_app__=u,Or(_.component)}},onUnmount(d){a.push(d)},unmount(){l&&(rt(a,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(d,f){return i.provides[d]=f,u},runWithContext(d){const f=wn;wn=u;try{return d()}finally{wn=f}}};return u}}let wn=null;const af=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${et(e)}Modifiers`]||t[`${sn(e)}Modifiers`];function lf(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||de;let r=n;const i=e.startsWith("update:"),o=i&&af(s,e.slice(7));o&&(o.trim&&(r=n.map(d=>_e(d)?d.trim():d)),o.number&&(r=n.map(Ir)));let a,l=s[a=Ur(e)]||s[a=Ur(et(e))];!l&&i&&(l=s[a=Ur(sn(e))]),l&&rt(l,t,6,r);const u=s[a+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,rt(u,t,6,r)}}const cf=new WeakMap;function Jl(t,e,n=!1){const s=n?cf:e.emitsCache,r=s.get(t);if(r!==void 0)return r;const i=t.emits;let o={},a=!1;if(!Y(t)){const l=u=>{const d=Jl(u,e,!0);d&&(a=!0,Ce(o,d))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!a?(ae(t)&&s.set(t,null),null):(z(i)?i.forEach(l=>o[l]=null):Ce(o,i),ae(t)&&s.set(t,o),o)}function Pr(t,e){return!t||!yr(e)?!1:(e=e.slice(2).replace(/Once$/,""),oe(t,e[0].toLowerCase()+e.slice(1))||oe(t,sn(e))||oe(t,e))}function Fo(t){const{type:e,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:a,emit:l,render:u,renderCache:d,props:f,data:y,setupState:_,ctx:m,inheritAttrs:w}=t,H=Zs(t);let R,p;try{if(n.shapeFlag&4){const V=r||s,W=V;R=gt(u.call(W,V,d,f,_,y,m)),p=a}else{const V=e;R=gt(V.length>1?V(f,{attrs:a,slots:o,emit:l}):V(f,null)),p=e.props?a:uf(a)}}catch(V){as.length=0,Cr(V,t,1),R=Se(De)}let $=R;if(p&&w!==!1){const V=Object.keys(p),{shapeFlag:W}=$;V.length&&W&7&&(i&&V.some(vr)&&(p=df(p,i)),$=nn($,p,!1,!0))}return n.dirs&&($=nn($,null,!1,!0),$.dirs=$.dirs?$.dirs.concat(n.dirs):n.dirs),n.transition&&_s($,n.transition),R=$,Zs(H),R}const uf=t=>{let e;for(const n in t)(n==="class"||n==="style"||yr(n))&&((e||(e={}))[n]=t[n]);return e},df=(t,e)=>{const n={};for(const s in t)(!vr(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function ff(t,e,n){const{props:s,children:r,component:i}=t,{props:o,children:a,patchFlag:l}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?Uo(s,o,u):!!o;if(l&8){const d=e.dynamicProps;for(let f=0;f<d.length;f++){const y=d[f];if(Yl(o,s,y)&&!Pr(u,y))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:s===o?!1:s?o?Uo(s,o,u):!0:!!o;return!1}function Uo(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(Yl(e,t,i)&&!Pr(n,i))return!0}return!1}function Yl(t,e,n){const s=t[n],r=e[n];return n==="style"&&ae(s)&&ae(r)?!Cs(s,r):s!==r}function hf({vnode:t,parent:e,suspense:n},s){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.suspense.vnode.el=r.el=s,t=r),r===t)(t=e.vnode).el=s,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=s)}const Xl={},Ql=()=>Object.create(Xl),Zl=t=>Object.getPrototypeOf(t)===Xl;function pf(t,e,n,s=!1){const r={},i=Ql();t.propsDefaults=Object.create(null),ec(t,e,r,i);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=s?r:md(r):t.type.props?t.props=r:t.props=i,t.attrs=i}function gf(t,e,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=t,a=ne(r),[l]=t.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let f=0;f<d.length;f++){let y=d[f];if(Pr(t.emitsOptions,y))continue;const _=e[y];if(l)if(oe(i,y))_!==i[y]&&(i[y]=_,u=!0);else{const m=et(y);r[m]=Ii(l,a,m,_,t,!1)}else _!==i[y]&&(i[y]=_,u=!0)}}}else{ec(t,e,r,i)&&(u=!0);let d;for(const f in a)(!e||!oe(e,f)&&((d=sn(f))===f||!oe(e,d)))&&(l?n&&(n[f]!==void 0||n[d]!==void 0)&&(r[f]=Ii(l,a,f,void 0,t,!0)):delete r[f]);if(i!==a)for(const f in i)(!e||!oe(e,f))&&(delete i[f],u=!0)}u&&Ot(t.attrs,"set","")}function ec(t,e,n,s){const[r,i]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(es(l))continue;const u=e[l];let d;r&&oe(r,d=et(l))?!i||!i.includes(d)?n[d]=u:(a||(a={}))[d]=u:Pr(t.emitsOptions,l)||(!(l in s)||u!==s[l])&&(s[l]=u,o=!0)}if(i){const l=ne(n),u=a||de;for(let d=0;d<i.length;d++){const f=i[d];n[f]=Ii(r,l,f,u[f],t,!oe(u,f))}}return o}function Ii(t,e,n,s,r,i){const o=t[n];if(o!=null){const a=oe(o,"default");if(a&&s===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Y(l)){const{propsDefaults:u}=r;if(n in u)s=u[n];else{const d=Ps(r);s=u[n]=l.call(null,e),d()}}else s=l;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!a?s=!1:o[1]&&(s===""||s===sn(n))&&(s=!0))}return s}const mf=new WeakMap;function tc(t,e,n=!1){const s=n?mf:e.propsCache,r=s.get(t);if(r)return r;const i=t.props,o={},a=[];let l=!1;if(!Y(t)){const d=f=>{l=!0;const[y,_]=tc(f,e,!0);Ce(o,y),_&&a.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!l)return ae(t)&&s.set(t,Nn),Nn;if(z(i))for(let d=0;d<i.length;d++){const f=et(i[d]);Vo(f)&&(o[f]=de)}else if(i)for(const d in i){const f=et(d);if(Vo(f)){const y=i[d],_=o[f]=z(y)||Y(y)?{type:y}:Ce({},y),m=_.type;let w=!1,H=!0;if(z(m))for(let R=0;R<m.length;++R){const p=m[R],$=Y(p)&&p.name;if($==="Boolean"){w=!0;break}else $==="String"&&(H=!1)}else w=Y(m)&&m.name==="Boolean";_[0]=w,_[1]=H,(w||oe(_,"default"))&&a.push(f)}}const u=[o,a];return ae(t)&&s.set(t,u),u}function Vo(t){return t[0]!=="$"&&!es(t)}const Gi=t=>t==="_"||t==="_ctx"||t==="$stable",Ji=t=>z(t)?t.map(gt):[gt(t)],yf=(t,e,n)=>{if(e._n)return e;const s=vs((...r)=>Ji(e(...r)),n);return s._c=!1,s},nc=(t,e,n)=>{const s=t._ctx;for(const r in t){if(Gi(r))continue;const i=t[r];if(Y(i))e[r]=yf(r,i,s);else if(i!=null){const o=Ji(i);e[r]=()=>o}}},sc=(t,e)=>{const n=Ji(e);t.slots.default=()=>n},rc=(t,e,n)=>{for(const s in e)(n||!Gi(s))&&(t[s]=e[s])},vf=(t,e,n)=>{const s=t.slots=Ql();if(t.vnode.shapeFlag&32){const r=e._;r?(rc(s,e,n),n&&ol(s,"_",r,!0)):nc(e,s)}else e&&sc(t,e)},_f=(t,e,n)=>{const{vnode:s,slots:r}=t;let i=!0,o=de;if(s.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:rc(r,e,n):(i=!e.$stable,nc(e,r)),o=e}else e&&(sc(t,e),o={default:1});if(i)for(const a in r)!Gi(a)&&o[a]==null&&delete r[a]},xe=Sf;function bf(t){return wf(t)}function wf(t,e){const n=Tr();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:a,createComment:l,setText:u,setElementText:d,parentNode:f,nextSibling:y,setScopeId:_=vt,insertStaticContent:m}=t,w=(h,g,b,A=null,S=null,E=null,D=void 0,x=null,O=!!g.dynamicChildren)=>{if(h===g)return;h&&!gn(h,g)&&(A=be(h),He(h,S,E,!0),h=null),g.patchFlag===-2&&(O=!1,g.dynamicChildren=null);const{type:C,ref:K,shapeFlag:U}=g;switch(C){case Rr:H(h,g,b,A);break;case De:R(h,g,b,A);break;case js:h==null&&p(g,b,A,D);break;case re:L(h,g,b,A,S,E,D,x,O);break;default:U&1?W(h,g,b,A,S,E,D,x,O):U&6?te(h,g,b,A,S,E,D,x,O):(U&64||U&128)&&C.process(h,g,b,A,S,E,D,x,O,zn)}K!=null&&S?rs(K,h&&h.ref,E,g||h,!g):K==null&&h&&h.ref!=null&&rs(h.ref,null,E,h,!0)},H=(h,g,b,A)=>{if(h==null)s(g.el=a(g.children),b,A);else{const S=g.el=h.el;g.children!==h.children&&u(S,g.children)}},R=(h,g,b,A)=>{h==null?s(g.el=l(g.children||""),b,A):g.el=h.el},p=(h,g,b,A)=>{[h.el,h.anchor]=m(h.children,g,b,A,h.el,h.anchor)},$=({el:h,anchor:g},b,A)=>{let S;for(;h&&h!==g;)S=y(h),s(h,b,A),h=S;s(g,b,A)},V=({el:h,anchor:g})=>{let b;for(;h&&h!==g;)b=y(h),r(h),h=b;r(g)},W=(h,g,b,A,S,E,D,x,O)=>{if(g.type==="svg"?D="svg":g.type==="math"&&(D="mathml"),h==null)F(g,b,A,S,E,D,x,O);else{const C=h.el&&h.el._isVueCE?h.el:null;try{C&&C._beginPatch(),N(h,g,S,E,D,x,O)}finally{C&&C._endPatch()}}},F=(h,g,b,A,S,E,D,x)=>{let O,C;const{props:K,shapeFlag:U,transition:j,dirs:G}=h;if(O=h.el=o(h.type,E,K&&K.is,K),U&8?d(O,h.children):U&16&&P(h.children,O,null,A,S,Kr(h,E),D,x),G&&on(h,null,A,"created"),I(O,h,h.scopeId,D,A),K){for(const ce in K)ce!=="value"&&!es(ce)&&i(O,ce,null,K[ce],E,A);"value"in K&&i(O,"value",null,K.value,E),(C=K.onVnodeBeforeMount)&&dt(C,A,h)}G&&on(h,null,A,"beforeMount");const se=If(S,j);se&&j.beforeEnter(O),s(O,g,b),((C=K&&K.onVnodeMounted)||se||G)&&xe(()=>{try{C&&dt(C,A,h),se&&j.enter(O),G&&on(h,null,A,"mounted")}finally{}},S)},I=(h,g,b,A,S)=>{if(b&&_(h,b),A)for(let E=0;E<A.length;E++)_(h,A[E]);if(S){let E=S.subTree;if(g===E||ac(E.type)&&(E.ssContent===g||E.ssFallback===g)){const D=S.vnode;I(h,D,D.scopeId,D.slotScopeIds,S.parent)}}},P=(h,g,b,A,S,E,D,x,O=0)=>{for(let C=O;C<h.length;C++){const K=h[C]=x?Rt(h[C]):gt(h[C]);w(null,K,g,b,A,S,E,D,x)}},N=(h,g,b,A,S,E,D)=>{const x=g.el=h.el;let{patchFlag:O,dynamicChildren:C,dirs:K}=g;O|=h.patchFlag&16;const U=h.props||de,j=g.props||de;let G;if(b&&ln(b,!1),(G=j.onVnodeBeforeUpdate)&&dt(G,b,g,h),K&&on(g,h,b,"beforeUpdate"),b&&ln(b,!0),(U.innerHTML&&j.innerHTML==null||U.textContent&&j.textContent==null)&&d(x,""),C?q(h.dynamicChildren,C,x,b,A,Kr(g,S),E):D||le(h,g,x,null,b,A,Kr(g,S),E,!1),O>0){if(O&16)ee(x,U,j,b,S);else if(O&2&&U.class!==j.class&&i(x,"class",null,j.class,S),O&4&&i(x,"style",U.style,j.style,S),O&8){const se=g.dynamicProps;for(let ce=0;ce<se.length;ce++){const he=se[ce],Ie=U[he],ke=j[he];(ke!==Ie||he==="value")&&i(x,he,Ie,ke,S,b)}}O&1&&h.children!==g.children&&d(x,g.children)}else!D&&C==null&&ee(x,U,j,b,S);((G=j.onVnodeUpdated)||K)&&xe(()=>{G&&dt(G,b,g,h),K&&on(g,h,b,"updated")},A)},q=(h,g,b,A,S,E,D)=>{for(let x=0;x<g.length;x++){const O=h[x],C=g[x],K=O.el&&(O.type===re||!gn(O,C)||O.shapeFlag&198)?f(O.el):b;w(O,C,K,null,A,S,E,D,!0)}},ee=(h,g,b,A,S)=>{if(g!==b){if(g!==de)for(const E in g)!es(E)&&!(E in b)&&i(h,E,g[E],null,S,A);for(const E in b){if(es(E))continue;const D=b[E],x=g[E];D!==x&&E!=="value"&&i(h,E,x,D,S,A)}"value"in b&&i(h,"value",g.value,b.value,S)}},L=(h,g,b,A,S,E,D,x,O)=>{const C=g.el=h?h.el:a(""),K=g.anchor=h?h.anchor:a("");let{patchFlag:U,dynamicChildren:j,slotScopeIds:G}=g;G&&(x=x?x.concat(G):G),h==null?(s(C,b,A),s(K,b,A),P(g.children||[],b,K,S,E,D,x,O)):U>0&&U&64&&j&&h.dynamicChildren&&h.dynamicChildren.length===j.length?(q(h.dynamicChildren,j,b,S,E,D,x),(g.key!=null||S&&g===S.subTree)&&Yi(h,g,!0)):le(h,g,b,K,S,E,D,x,O)},te=(h,g,b,A,S,E,D,x,O)=>{g.slotScopeIds=x,h==null?g.shapeFlag&512?S.ctx.activate(g,b,A,D,O):we(g,b,A,S,E,D,O):Ae(h,g,O)},we=(h,g,b,A,S,E,D)=>{const x=h.component=Of(h,A,S);if(Ar(h)&&(x.ctx.renderer=zn),Nf(x,!1,D),x.asyncDep){if(S&&S.registerDep(x,ie,D),!h.el){const O=x.subTree=Se(De);R(null,O,g,b),h.placeholder=O.el}}else ie(x,h,g,b,S,E,D)},Ae=(h,g,b)=>{const A=g.component=h.component;if(ff(h,g,b))if(A.asyncDep&&!A.asyncResolved){Z(A,g,b);return}else A.next=g,A.update();else g.el=h.el,A.vnode=g},ie=(h,g,b,A,S,E,D)=>{const x=()=>{if(h.isMounted){let{next:U,bu:j,u:G,parent:se,vnode:ce}=h;{const ct=ic(h);if(ct){U&&(U.el=ce.el,Z(h,U,D)),ct.asyncDep.then(()=>{xe(()=>{h.isUnmounted||C()},S)});return}}let he=U,Ie;ln(h,!1),U?(U.el=ce.el,Z(h,U,D)):U=ce,j&&Hs(j),(Ie=U.props&&U.props.onVnodeBeforeUpdate)&&dt(Ie,se,U,ce),ln(h,!0);const ke=Fo(h),lt=h.subTree;h.subTree=ke,w(lt,ke,f(lt.el),be(lt),h,S,E),U.el=ke.el,he===null&&hf(h,ke.el),G&&xe(G,S),(Ie=U.props&&U.props.onVnodeUpdated)&&xe(()=>dt(Ie,se,U,ce),S)}else{let U;const{el:j,props:G}=g,{bm:se,m:ce,parent:he,root:Ie,type:ke}=h,lt=is(g);ln(h,!1),se&&Hs(se),!lt&&(U=G&&G.onVnodeBeforeMount)&&dt(U,he,g),ln(h,!0);{Ie.ce&&Ie.ce._hasShadowRoot()&&Ie.ce._injectChildStyle(ke,h.parent?h.parent.type:void 0);const ct=h.subTree=Fo(h);w(null,ct,b,A,h,S,E),g.el=ct.el}if(ce&&xe(ce,S),!lt&&(U=G&&G.onVnodeMounted)){const ct=g;xe(()=>dt(U,he,ct),S)}(g.shapeFlag&256||he&&is(he.vnode)&&he.vnode.shapeFlag&256)&&h.a&&xe(h.a,S),h.isMounted=!0,g=b=A=null}};h.scope.on();const O=h.effect=new hl(x);h.scope.off();const C=h.update=O.run.bind(O),K=h.job=O.runIfDirty.bind(O);K.i=h,K.id=h.uid,O.scheduler=()=>zi(K),ln(h,!0),C()},Z=(h,g,b)=>{g.component=h;const A=h.vnode.props;h.vnode=g,h.next=null,gf(h,g.props,A,b),_f(h,g.children,b),Lt(),ko(h),Ft()},le=(h,g,b,A,S,E,D,x,O=!1)=>{const C=h&&h.children,K=h?h.shapeFlag:0,U=g.children,{patchFlag:j,shapeFlag:G}=g;if(j>0){if(j&128){kn(C,U,b,A,S,E,D,x,O);return}else if(j&256){Et(C,U,b,A,S,E,D,x,O);return}}G&8?(K&16&&fe(C,S,E),U!==C&&d(b,U)):K&16?G&16?kn(C,U,b,A,S,E,D,x,O):fe(C,S,E,!0):(K&8&&d(b,""),G&16&&P(U,b,A,S,E,D,x,O))},Et=(h,g,b,A,S,E,D,x,O)=>{h=h||Nn,g=g||Nn;const C=h.length,K=g.length,U=Math.min(C,K);let j;for(j=0;j<U;j++){const G=g[j]=O?Rt(g[j]):gt(g[j]);w(h[j],G,b,null,S,E,D,x,O)}C>K?fe(h,S,E,!0,!1,U):P(g,b,A,S,E,D,x,O,U)},kn=(h,g,b,A,S,E,D,x,O)=>{let C=0;const K=g.length;let U=h.length-1,j=K-1;for(;C<=U&&C<=j;){const G=h[C],se=g[C]=O?Rt(g[C]):gt(g[C]);if(gn(G,se))w(G,se,b,null,S,E,D,x,O);else break;C++}for(;C<=U&&C<=j;){const G=h[U],se=g[j]=O?Rt(g[j]):gt(g[j]);if(gn(G,se))w(G,se,b,null,S,E,D,x,O);else break;U--,j--}if(C>U){if(C<=j){const G=j+1,se=G<K?g[G].el:A;for(;C<=j;)w(null,g[C]=O?Rt(g[C]):gt(g[C]),b,se,S,E,D,x,O),C++}}else if(C>j)for(;C<=U;)He(h[C],S,E,!0),C++;else{const G=C,se=C,ce=new Map;for(C=se;C<=j;C++){const je=g[C]=O?Rt(g[C]):gt(g[C]);je.key!=null&&ce.set(je.key,C)}let he,Ie=0;const ke=j-se+1;let lt=!1,ct=0;const Kn=new Array(ke);for(C=0;C<ke;C++)Kn[C]=0;for(C=G;C<=U;C++){const je=h[C];if(Ie>=ke){He(je,S,E,!0);continue}let ut;if(je.key!=null)ut=ce.get(je.key);else for(he=se;he<=j;he++)if(Kn[he-se]===0&&gn(je,g[he])){ut=he;break}ut===void 0?He(je,S,E,!0):(Kn[ut-se]=C+1,ut>=ct?ct=ut:lt=!0,w(je,g[ut],b,null,S,E,D,x,O),Ie++)}const wo=lt?Tf(Kn):Nn;for(he=wo.length-1,C=ke-1;C>=0;C--){const je=se+C,ut=g[je],Io=g[je+1],To=je+1<K?Io.el||oc(Io):A;Kn[C]===0?w(null,ut,b,To,S,E,D,x,O):lt&&(he<0||C!==wo[he]?Be(ut,b,To,2):he--)}}},Be=(h,g,b,A,S=null)=>{const{el:E,type:D,transition:x,children:O,shapeFlag:C}=h;if(C&6){Be(h.component.subTree,g,b,A);return}if(C&128){h.suspense.move(g,b,A);return}if(C&64){D.move(h,g,b,zn);return}if(D===re){s(E,g,b);for(let U=0;U<O.length;U++)Be(O[U],g,b,A);s(h.anchor,g,b);return}if(D===js){$(h,g,b);return}if(A!==2&&C&1&&x)if(A===0)x.beforeEnter(E),s(E,g,b),xe(()=>x.enter(E),S);else{const{leave:U,delayLeave:j,afterLeave:G}=x,se=()=>{h.ctx.isUnmounted?r(E):s(E,g,b)},ce=()=>{E._isLeaving&&E[ht](!0),U(E,()=>{se(),G&&G()})};j?j(E,se,ce):ce()}else s(E,g,b)},He=(h,g,b,A=!1,S=!1)=>{const{type:E,props:D,ref:x,children:O,dynamicChildren:C,shapeFlag:K,patchFlag:U,dirs:j,cacheIndex:G,memo:se}=h;if(U===-2&&(S=!1),x!=null&&(Lt(),rs(x,null,b,h,!0),Ft()),G!=null&&(g.renderCache[G]=void 0),K&256){g.ctx.deactivate(h);return}const ce=K&1&&j,he=!is(h);let Ie;if(he&&(Ie=D&&D.onVnodeBeforeUnmount)&&dt(Ie,g,h),K&6)X(h.component,b,A);else{if(K&128){h.suspense.unmount(b,A);return}ce&&on(h,null,g,"beforeUnmount"),K&64?h.type.remove(h,g,b,zn,A):C&&!C.hasOnce&&(E!==re||U>0&&U&64)?fe(C,g,b,!1,!0):(E===re&&U&384||!S&&K&16)&&fe(O,g,b),A&&Wn(h)}const ke=se!=null&&G==null;(he&&(Ie=D&&D.onVnodeUnmounted)||ce||ke)&&xe(()=>{Ie&&dt(Ie,g,h),ce&&on(h,null,g,"unmounted"),ke&&(h.el=null)},b)},Wn=h=>{const{type:g,el:b,anchor:A,transition:S}=h;if(g===re){Fr(b,A);return}if(g===js){V(h);return}const E=()=>{r(b),S&&!S.persisted&&S.afterLeave&&S.afterLeave()};if(h.shapeFlag&1&&S&&!S.persisted){const{leave:D,delayLeave:x}=S,O=()=>D(b,E);x?x(h.el,E,O):O()}else E()},Fr=(h,g)=>{let b;for(;h!==g;)b=y(h),r(h),h=b;r(g)},X=(h,g,b)=>{const{bum:A,scope:S,job:E,subTree:D,um:x,m:O,a:C}=h;Bo(O),Bo(C),A&&Hs(A),S.stop(),E&&(E.flags|=8,He(D,h,g,b)),x&&xe(x,g),xe(()=>{h.isUnmounted=!0},g)},fe=(h,g,b,A=!1,S=!1,E=0)=>{for(let D=E;D<h.length;D++)He(h[D],g,b,A,S)},be=h=>{if(h.shapeFlag&6)return be(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();const g=y(h.anchor||h.el),b=g&&g[Dl];return b?y(b):g};let Ct=!1;const rn=(h,g,b)=>{let A;h==null?g._vnode&&(He(g._vnode,null,null,!0),A=g._vnode.component):w(g._vnode||null,h,g,null,null,null,b),g._vnode=h,Ct||(Ct=!0,ko(A),Rl(),Ct=!1)},zn={p:w,um:He,m:Be,r:Wn,mt:we,mc:P,pc:le,pbc:q,n:be,o:t};return{render:rn,hydrate:void 0,createApp:of(rn)}}function Kr({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function ln({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function If(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Yi(t,e,n=!1){const s=t.children,r=e.children;if(z(s)&&z(r))for(let i=0;i<s.length;i++){const o=s[i];let a=r[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[i]=Rt(r[i]),a.el=o.el),!n&&a.patchFlag!==-2&&Yi(o,a)),a.type===Rr&&(a.patchFlag===-1&&(a=r[i]=Rt(a)),a.el=o.el),a.type===De&&!a.el&&(a.el=o.el)}}function Tf(t){const e=t.slice(),n=[0];let s,r,i,o,a;const l=t.length;for(s=0;s<l;s++){const u=t[s];if(u!==0){if(r=n[n.length-1],t[r]<u){e[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<u?i=a+1:o=a;u<t[n[i]]&&(i>0&&(e[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function ic(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ic(e)}function Bo(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function oc(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?oc(e.subTree):null}const ac=t=>t.__isSuspense;function Sf(t,e){e&&e.pendingBranch?z(t)?e.effects.push(...t):e.effects.push(t):Pd(t)}const re=Symbol.for("v-fgt"),Rr=Symbol.for("v-txt"),De=Symbol.for("v-cmt"),js=Symbol.for("v-stc"),as=[];let We=null;function T(t=!1){as.push(We=t?null:[])}function Ef(){as.pop(),We=as[as.length-1]||null}let bs=1;function nr(t,e=!1){bs+=t,t<0&&We&&e&&(We.hasOnce=!0)}function lc(t){return t.dynamicChildren=bs>0?We||Nn:null,Ef(),bs>0&&We&&We.push(t),t}function k(t,e,n,s,r,i){return lc(c(t,e,n,s,r,i,!0))}function Ye(t,e,n,s,r){return lc(Se(t,e,n,s,r,!0))}function sr(t){return t?t.__v_isVNode===!0:!1}function gn(t,e){return t.type===e.type&&t.key===e.key}const cc=({key:t})=>t??null,Ws=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?_e(t)||ve(t)||Y(t)?{i:Ge,r:t,k:e,f:!!n}:t:null);function c(t,e=null,n=null,s=0,r=null,i=t===re?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&cc(e),ref:e&&Ws(e),scopeId:Nl,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Ge};return a?(Xi(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=_e(n)?8:16),bs>0&&!o&&We&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&We.push(l),l}const Se=Cf;function Cf(t,e=null,n=null,s=0,r=null,i=!1){if((!t||t===Xd)&&(t=De),sr(t)){const a=nn(t,e,!0);return n&&Xi(a,n),bs>0&&!i&&We&&(a.shapeFlag&6?We[We.indexOf(t)]=a:We.push(a)),a.patchFlag=-2,a}if(Mf(t)&&(t=t.__vccOpts),e){e=Af(e);let{class:a,style:l}=e;a&&!_e(a)&&(e.class=J(a)),ae(l)&&(Er(l)&&!z(l)&&(l=Ce({},l)),e.style=tn(l))}const o=_e(t)?1:ac(t)?128:Ml(t)?64:ae(t)?4:Y(t)?2:0;return c(t,e,n,s,r,o,i,!0)}function Af(t){return t?Er(t)||Zl(t)?Ce({},t):t:null}function nn(t,e,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:a,transition:l}=t,u=e?kf(r||{},e):r,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&cc(u),ref:e&&e.ref?n&&i?z(i)?i.concat(Ws(e)):[i,Ws(e)]:Ws(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==re?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&nn(t.ssContent),ssFallback:t.ssFallback&&nn(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&s&&_s(d,l.clone(d)),d}function me(t=" ",e=0){return Se(Rr,null,t,e)}function Ho(t,e){const n=Se(js,null,t);return n.staticCount=e,n}function ge(t="",e=!1){return e?(T(),Ye(De,null,t)):Se(De,null,t)}function gt(t){return t==null||typeof t=="boolean"?Se(De):z(t)?Se(re,null,t.slice()):sr(t)?Rt(t):Se(Rr,null,String(t))}function Rt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:nn(t)}function Xi(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(z(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),Xi(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Zl(e)?e._ctx=Ge:r===3&&Ge&&(Ge.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else Y(e)?(e={default:e,_ctx:Ge},n=32):(e=String(e),s&64?(n=16,e=[me(e)]):n=8);t.children=e,t.shapeFlag|=n}function kf(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=J([e.class,s.class]));else if(r==="style")e.style=tn([e.style,s.style]);else if(yr(r)){const i=e[r],o=s[r];o&&i!==o&&!(z(i)&&i.includes(o))?e[r]=i?[].concat(i,o):o:o==null&&i==null&&!vr(r)&&(e[r]=o)}else r!==""&&(e[r]=s[r])}return e}function dt(t,e,n,s=null){rt(t,e,7,[n,s])}const Pf=Gl();let Rf=0;function Of(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||Pf,i={uid:Rf++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ul(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:tc(s,r),emitsOptions:Jl(s,r),emit:null,emitted:null,propsDefaults:de,inheritAttrs:s.inheritAttrs,ctx:de,data:de,props:de,attrs:de,slots:de,refs:de,setupState:de,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=lf.bind(null,i),t.ce&&t.ce(i),i}let Me=null;const Qi=()=>Me||Ge;let rr,Ti;{const t=Tr(),e=(n,s)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};rr=e("__VUE_INSTANCE_SETTERS__",n=>Me=n),Ti=e("__VUE_SSR_SETTERS__",n=>ws=n)}const Ps=t=>{const e=Me;return rr(t),t.scope.on(),()=>{t.scope.off(),rr(e)}},jo=()=>{Me&&Me.scope.off(),rr(null)};function uc(t){return t.vnode.shapeFlag&4}let ws=!1;function Nf(t,e=!1,n=!1){e&&Ti(e);const{props:s,children:r}=t.vnode,i=uc(t);pf(t,s,i,e),vf(t,r,n||e);const o=i?xf(t,e):void 0;return e&&Ti(!1),o}function xf(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Qd);const{setup:s}=n;if(s){Lt();const r=t.setupContext=s.length>1?Df(t):null,i=Ps(t),o=As(s,t,0,[t.props,r]),a=nl(o);if(Ft(),i(),(a||t.sp)&&!is(t)&&jl(t),a){if(o.then(jo,jo),e)return o.then(l=>{Wo(t,l)}).catch(l=>{Cr(l,t,0)});t.asyncDep=o}else Wo(t,o)}else dc(t)}function Wo(t,e,n){Y(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ae(e)&&(t.setupState=Al(e)),dc(t)}function dc(t,e,n){const s=t.type;t.render||(t.render=s.render||vt);{const r=Ps(t);Lt();try{Zd(t)}finally{Ft(),r()}}}const $f={get(t,e){return Oe(t,"get",""),t[e]}};function Df(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,$f),slots:t.slots,emit:t.emit,expose:e}}function Or(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Al(Wi(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in os)return os[n](t)},has(e,n){return n in e||n in os}})):t.proxy}function Mf(t){return Y(t)&&"__vccOpts"in t}const Pe=(t,e)=>Sd(t,e,ws);function Lf(t,e,n){try{nr(-1);const s=arguments.length;return s===2?ae(e)&&!z(e)?sr(e)?Se(t,null,[e]):Se(t,e):Se(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&sr(n)&&(n=[n]),Se(t,e,n))}finally{nr(1)}}const Ff="3.5.32";/**
* @vue/runtime-dom v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Si;const zo=typeof window<"u"&&window.trustedTypes;if(zo)try{Si=zo.createPolicy("vue",{createHTML:t=>t})}catch{}const fc=Si?t=>Si.createHTML(t):t=>t,Uf="http://www.w3.org/2000/svg",Vf="http://www.w3.org/1998/Math/MathML",Pt=typeof document<"u"?document:null,Ko=Pt&&Pt.createElement("template"),Bf={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e==="svg"?Pt.createElementNS(Uf,t):e==="mathml"?Pt.createElementNS(Vf,t):n?Pt.createElement(t,{is:n}):Pt.createElement(t);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>Pt.createTextNode(t),createComment:t=>Pt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Pt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,i){const o=n?n.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{Ko.innerHTML=fc(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const a=Ko.content;if(s==="svg"||s==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},zt="transition",Jn="animation",Is=Symbol("_vtc"),hc={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Hf=Ce({},Fl,hc),jf=t=>(t.displayName="Transition",t.props=Hf,t),ir=jf((t,{slots:e})=>Lf(Vd,Wf(t),e)),cn=(t,e=[])=>{z(t)?t.forEach(n=>n(...e)):t&&t(...e)},qo=t=>t?z(t)?t.some(e=>e.length>1):t.length>1:!1;function Wf(t){const e={};for(const L in t)L in hc||(e[L]=t[L]);if(t.css===!1)return e;const{name:n="v",type:s,duration:r,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=i,appearActiveClass:u=o,appearToClass:d=a,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:y=`${n}-leave-active`,leaveToClass:_=`${n}-leave-to`}=t,m=zf(r),w=m&&m[0],H=m&&m[1],{onBeforeEnter:R,onEnter:p,onEnterCancelled:$,onLeave:V,onLeaveCancelled:W,onBeforeAppear:F=R,onAppear:I=p,onAppearCancelled:P=$}=e,N=(L,te,we,Ae)=>{L._enterCancelled=Ae,un(L,te?d:a),un(L,te?u:o),we&&we()},q=(L,te)=>{L._isLeaving=!1,un(L,f),un(L,_),un(L,y),te&&te()},ee=L=>(te,we)=>{const Ae=L?I:p,ie=()=>N(te,L,we);cn(Ae,[te,ie]),Go(()=>{un(te,L?l:i),kt(te,L?d:a),qo(Ae)||Jo(te,s,w,ie)})};return Ce(e,{onBeforeEnter(L){cn(R,[L]),kt(L,i),kt(L,o)},onBeforeAppear(L){cn(F,[L]),kt(L,l),kt(L,u)},onEnter:ee(!1),onAppear:ee(!0),onLeave(L,te){L._isLeaving=!0;const we=()=>q(L,te);kt(L,f),L._enterCancelled?(kt(L,y),Qo(L)):(Qo(L),kt(L,y)),Go(()=>{L._isLeaving&&(un(L,f),kt(L,_),qo(V)||Jo(L,s,H,we))}),cn(V,[L,we])},onEnterCancelled(L){N(L,!1,void 0,!0),cn($,[L])},onAppearCancelled(L){N(L,!0,void 0,!0),cn(P,[L])},onLeaveCancelled(L){q(L),cn(W,[L])}})}function zf(t){if(t==null)return null;if(ae(t))return[qr(t.enter),qr(t.leave)];{const e=qr(t);return[e,e]}}function qr(t){return Bu(t)}function kt(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t[Is]||(t[Is]=new Set)).add(e)}function un(t,e){e.split(/\s+/).forEach(s=>s&&t.classList.remove(s));const n=t[Is];n&&(n.delete(e),n.size||(t[Is]=void 0))}function Go(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let Kf=0;function Jo(t,e,n,s){const r=t._endId=++Kf,i=()=>{r===t._endId&&s()};if(n!=null)return setTimeout(i,n);const{type:o,timeout:a,propCount:l}=qf(t,e);if(!o)return s();const u=o+"end";let d=0;const f=()=>{t.removeEventListener(u,y),i()},y=_=>{_.target===t&&++d>=l&&f()};setTimeout(()=>{d<l&&f()},a+1),t.addEventListener(u,y)}function qf(t,e){const n=window.getComputedStyle(t),s=m=>(n[m]||"").split(", "),r=s(`${zt}Delay`),i=s(`${zt}Duration`),o=Yo(r,i),a=s(`${Jn}Delay`),l=s(`${Jn}Duration`),u=Yo(a,l);let d=null,f=0,y=0;e===zt?o>0&&(d=zt,f=o,y=i.length):e===Jn?u>0&&(d=Jn,f=u,y=l.length):(f=Math.max(o,u),d=f>0?o>u?zt:Jn:null,y=d?d===zt?i.length:l.length:0);const _=d===zt&&/\b(?:transform|all)(?:,|$)/.test(s(`${zt}Property`).toString());return{type:d,timeout:f,propCount:y,hasTransform:_}}function Yo(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,s)=>Xo(n)+Xo(t[s])))}function Xo(t){return t==="auto"?0:Number(t.slice(0,-1).replace(",","."))*1e3}function Qo(t){return(t?t.ownerDocument:document).body.offsetHeight}function Gf(t,e,n){const s=t[Is];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Zo=Symbol("_vod"),Jf=Symbol("_vsh"),Yf=Symbol(""),Xf=/(?:^|;)\s*display\s*:/;function Qf(t,e,n){const s=t.style,r=_e(n);let i=!1;if(n&&!r){if(e)if(_e(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&zs(s,a,"")}else for(const o in e)n[o]==null&&zs(s,o,"");for(const o in n)o==="display"&&(i=!0),zs(s,o,n[o])}else if(r){if(e!==n){const o=s[Yf];o&&(n+=";"+o),s.cssText=n,i=Xf.test(n)}}else e&&t.removeAttribute("style");Zo in t&&(t[Zo]=i?s.display:"",t[Jf]&&(s.display="none"))}const ea=/\s*!important$/;function zs(t,e,n){if(z(n))n.forEach(s=>zs(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=Zf(t,e);ea.test(n)?t.setProperty(sn(s),n.replace(ea,""),"important"):t[s]=n}}const ta=["Webkit","Moz","ms"],Gr={};function Zf(t,e){const n=Gr[e];if(n)return n;let s=et(e);if(s!=="filter"&&s in t)return Gr[e]=s;s=il(s);for(let r=0;r<ta.length;r++){const i=ta[r]+s;if(i in t)return Gr[e]=i}return e}const na="http://www.w3.org/1999/xlink";function sa(t,e,n,s,r,i=qu(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(na,e.slice(6,e.length)):t.setAttributeNS(na,e,n):n==null||i&&!al(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Je(n)?String(n):n)}function ra(t,e,n,s,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?fc(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=al(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function mn(t,e,n,s){t.addEventListener(e,n,s)}function eh(t,e,n,s){t.removeEventListener(e,n,s)}const ia=Symbol("_vei");function th(t,e,n,s,r=null){const i=t[ia]||(t[ia]={}),o=i[e];if(s&&o)o.value=s;else{const[a,l]=nh(e);if(s){const u=i[e]=ih(s,r);mn(t,a,u,l)}else o&&(eh(t,a,o,l),i[e]=void 0)}}const oa=/(?:Once|Passive|Capture)$/;function nh(t){let e;if(oa.test(t)){e={};let s;for(;s=t.match(oa);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):sn(t.slice(2)),e]}let Jr=0;const sh=Promise.resolve(),rh=()=>Jr||(sh.then(()=>Jr=0),Jr=Date.now());function ih(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;rt(oh(s,n.value),e,5,[s])};return n.value=t,n.attached=rh(),n}function oh(t,e){if(z(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>r=>!r._stopped&&s&&s(r))}else return e}const aa=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,ah=(t,e,n,s,r,i)=>{const o=r==="svg";e==="class"?Gf(t,s,o):e==="style"?Qf(t,n,s):yr(e)?vr(e)||th(t,e,n,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):lh(t,e,s,o))?(ra(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&sa(t,e,s,o,i,e!=="value")):t._isVueCE&&(ch(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!_e(s)))?ra(t,et(e),s,i,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),sa(t,e,s,o))};function lh(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&aa(e)&&Y(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return aa(e)&&_e(n)?!1:e in t}function ch(t,e){const n=t._def.props;if(!n)return!1;const s=et(e);return Array.isArray(n)?n.some(r=>et(r)===s):Object.keys(n).some(r=>et(r)===s)}const or=t=>{const e=t.props["onUpdate:modelValue"]||!1;return z(e)?n=>Hs(e,n):e};function uh(t){t.target.composing=!0}function la(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Dn=Symbol("_assign");function ca(t,e,n){return e&&(t=t.trim()),n&&(t=Ir(t)),t}const Ee={created(t,{modifiers:{lazy:e,trim:n,number:s}},r){t[Dn]=or(r);const i=s||r.props&&r.props.type==="number";mn(t,e?"change":"input",o=>{o.target.composing||t[Dn](ca(t.value,n,i))}),(n||i)&&mn(t,"change",()=>{t.value=ca(t.value,n,i)}),e||(mn(t,"compositionstart",uh),mn(t,"compositionend",la),mn(t,"change",la))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:r,number:i}},o){if(t[Dn]=or(o),t.composing)return;const a=(i||t.type==="number")&&!/^0\d/.test(t.value)?Ir(t.value):t.value,l=e??"";if(a===l)return;const u=t.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===t&&t.type!=="range"&&(s&&e===n||r&&t.value.trim()===l)||(t.value=l)}},Yr={deep:!0,created(t,{value:e,modifiers:{number:n}},s){const r=_r(e);mn(t,"change",()=>{const i=Array.prototype.filter.call(t.options,o=>o.selected).map(o=>n?Ir(ar(o)):ar(o));t[Dn](t.multiple?r?new Set(i):i:i[0]),t._assigning=!0,ks(()=>{t._assigning=!1})}),t[Dn]=or(s)},mounted(t,{value:e}){ua(t,e)},beforeUpdate(t,e,n){t[Dn]=or(n)},updated(t,{value:e}){t._assigning||ua(t,e)}};function ua(t,e){const n=t.multiple,s=z(e);if(!(n&&!s&&!_r(e))){for(let r=0,i=t.options.length;r<i;r++){const o=t.options[r],a=ar(o);if(n)if(s){const l=typeof a;l==="string"||l==="number"?o.selected=e.some(u=>String(u)===String(a)):o.selected=Ju(e,a)>-1}else o.selected=e.has(a);else if(Cs(ar(o),e)){t.selectedIndex!==r&&(t.selectedIndex=r);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function ar(t){return"_value"in t?t._value:t.value}const dh=["ctrl","shift","alt","meta"],fh={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>dh.some(n=>t[`${n}Key`]&&!e.includes(n))},yt=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=((r,...i)=>{for(let o=0;o<e.length;o++){const a=fh[e[o]];if(a&&a(r,e))return}return t(r,...i)}))},hh={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},yn=(t,e)=>{const n=t._withKeys||(t._withKeys={}),s=e.join(".");return n[s]||(n[s]=(r=>{if(!("key"in r))return;const i=sn(r.key);if(e.some(o=>o===i||hh[o]===i))return t(r)}))},ph=Ce({patchProp:ah},Bf);let da;function gh(){return da||(da=bf(ph))}const mh=((...t)=>{const e=gh().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=vh(s);if(!r)return;const i=e._component;!Y(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,yh(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e});function yh(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function vh(t){return _e(t)?document.querySelector(t):t}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let pc;const Nr=t=>pc=t,gc=Symbol();function Ei(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var ls;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(ls||(ls={}));function _h(){const t=dl(!0),e=t.run(()=>Q({}));let n=[],s=[];const r=Wi({install(i){Nr(r),r._a=i,i.provide(gc,r),i.config.globalProperties.$pinia=r,s.forEach(o=>n.push(o)),s=[]},use(i){return this._a?n.push(i):s.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return r}const mc=()=>{};function fa(t,e,n,s=mc){t.push(e);const r=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),s())};return!n&&fl()&&Yu(r),r}function Rn(t,...e){t.slice().forEach(n=>{n(...e)})}const bh=t=>t(),ha=Symbol(),Xr=Symbol();function Ci(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,s)=>t.set(s,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],r=t[n];Ei(r)&&Ei(s)&&t.hasOwnProperty(n)&&!ve(s)&&!Mt(s)?t[n]=Ci(r,s):t[n]=s}return t}const wh=Symbol();function Ih(t){return!Ei(t)||!t.hasOwnProperty(wh)}const{assign:qt}=Object;function Th(t){return!!(ve(t)&&t.effect)}function Sh(t,e,n,s){const{state:r,actions:i,getters:o}=e,a=n.state.value[t];let l;function u(){a||(n.state.value[t]=r?r():{});const d=bd(n.state.value[t]);return qt(d,i,Object.keys(o||{}).reduce((f,y)=>(f[y]=Wi(Pe(()=>{Nr(n);const _=n._s.get(t);return o[y].call(_,_)})),f),{}))}return l=yc(t,u,e,n,s,!0),l}function yc(t,e,n={},s,r,i){let o;const a=qt({actions:{}},n),l={deep:!0};let u,d,f=[],y=[],_;const m=s.state.value[t];!i&&!m&&(s.state.value[t]={});let w;function H(P){let N;u=d=!1,typeof P=="function"?(P(s.state.value[t]),N={type:ls.patchFunction,storeId:t,events:_}):(Ci(s.state.value[t],P),N={type:ls.patchObject,payload:P,storeId:t,events:_});const q=w=Symbol();ks().then(()=>{w===q&&(u=!0)}),d=!0,Rn(f,N,s.state.value[t])}const R=i?function(){const{state:N}=n,q=N?N():{};this.$patch(ee=>{qt(ee,q)})}:mc;function p(){o.stop(),f=[],y=[],s._s.delete(t)}const $=(P,N="")=>{if(ha in P)return P[Xr]=N,P;const q=function(){Nr(s);const ee=Array.from(arguments),L=[],te=[];function we(Z){L.push(Z)}function Ae(Z){te.push(Z)}Rn(y,{args:ee,name:q[Xr],store:W,after:we,onError:Ae});let ie;try{ie=P.apply(this&&this.$id===t?this:W,ee)}catch(Z){throw Rn(te,Z),Z}return ie instanceof Promise?ie.then(Z=>(Rn(L,Z),Z)).catch(Z=>(Rn(te,Z),Promise.reject(Z))):(Rn(L,ie),ie)};return q[ha]=!0,q[Xr]=N,q},V={_p:s,$id:t,$onAction:fa.bind(null,y),$patch:H,$reset:R,$subscribe(P,N={}){const q=fa(f,P,N.detached,()=>ee()),ee=o.run(()=>nt(()=>s.state.value[t],L=>{(N.flush==="sync"?d:u)&&P({storeId:t,type:ls.direct,events:_},L)},qt({},l,N)));return q},$dispose:p},W=Cn(V);s._s.set(t,W);const I=(s._a&&s._a.runWithContext||bh)(()=>s._e.run(()=>(o=dl()).run(()=>e({action:$}))));for(const P in I){const N=I[P];if(ve(N)&&!Th(N)||Mt(N))i||(m&&Ih(N)&&(ve(N)?N.value=m[P]:Ci(N,m[P])),s.state.value[t][P]=N);else if(typeof N=="function"){const q=$(N,P);I[P]=q,a.actions[P]=N}}return qt(W,I),qt(ne(W),I),Object.defineProperty(W,"$state",{get:()=>s.state.value[t],set:P=>{H(N=>{qt(N,P)})}}),s._p.forEach(P=>{qt(W,o.run(()=>P({store:W,app:s._a,pinia:s,options:a})))}),m&&i&&n.hydrate&&n.hydrate(W.$state,m),u=!0,d=!0,W}/*! #__NO_SIDE_EFFECTS__ */function Eh(t,e,n){let s,r;const i=typeof e=="function";s=t,r=i?n:e;function o(a,l){const u=Od();return a=a||(u?ss(gc,null):null),a&&Nr(a),a=pc,a._s.has(s)||(i?yc(s,e,r,a):Sh(s,r,a)),a._s.get(s)}return o.$id=s,o}const Xe=[{id:1,name:"Classic Walnut Frame",style:"classic",price:49.99,orig:69.99,rating:4.8,reviews:234,sale:!0,desc:"Handcrafted walnut wood frame with a rich, warm finish. Perfect for family portraits and traditional art prints. Each piece is carefully sanded and finished with natural oils.",sizes:["5×7","8×10","11×14","16×20"],stock:45,sku:"ST-CW-001"},{id:2,name:"Midnight Matte Frame",style:"modern",price:34.99,orig:null,rating:4.6,reviews:182,sale:!1,desc:"Sleek matte black finish with clean lines. A contemporary choice that makes your photos the focus of attention.",sizes:["4×6","5×7","8×10","12×16"],stock:78,sku:"ST-MM-002"},{id:3,name:"Gilded Baroque Frame",style:"ornate",price:89.99,orig:119.99,rating:4.9,reviews:97,sale:!0,desc:"Stunning gold-leafed frame with intricate baroque detailing. A statement piece for fine art and cherished portraits.",sizes:["8×10","11×14","16×20","20×24"],stock:12,sku:"ST-GB-003"},{id:4,name:"White Float Frame",style:"minimal",price:29.99,orig:null,rating:4.5,reviews:312,sale:!1,desc:"Minimalist white frame with a float effect. Creates the illusion of artwork suspended in air.",sizes:["5×7","8×10","11×14"],stock:120,sku:"ST-WF-004"},{id:5,name:"Barnwood Rustic Frame",style:"rustic",price:54.99,orig:74.99,rating:4.7,reviews:145,sale:!0,desc:"Reclaimed barnwood frame with natural weathered texture. Each piece is unique with authentic character.",sizes:["5×7","8×10","11×14","16×20"],stock:33,sku:"ST-BR-005"},{id:6,name:"Gallery Slim Frame",style:"gallery",price:39.99,orig:null,rating:4.4,reviews:267,sale:!1,desc:"Ultra-slim profile frame used by professional galleries. Museum-quality with UV-protective glazing.",sizes:["8×10","11×14","16×20","24×36"],stock:65,sku:"ST-GS-006"},{id:7,name:"Cherry Blossom Frame",style:"classic",price:59.99,orig:null,rating:4.8,reviews:89,sale:!1,desc:"Premium cherry wood with a warm reddish tone. Hand-polished to a satin finish for timeless elegance.",sizes:["5×7","8×10","11×14"],stock:28,sku:"ST-CB-007"},{id:8,name:"Brushed Steel Frame",style:"modern",price:44.99,orig:59.99,rating:4.3,reviews:156,sale:!0,desc:"Industrial brushed stainless steel frame. A bold, modern statement for contemporary spaces.",sizes:["4×6","8×10","12×16","16×20"],stock:52,sku:"ST-BS-008"},{id:9,name:"Victorian Gold Frame",style:"ornate",price:109.99,orig:null,rating:4.9,reviews:63,sale:!1,desc:"Intricately carved gold frame inspired by Victorian era craftsmanship. A true collector's piece.",sizes:["11×14","16×20","20×24"],stock:8,sku:"ST-VG-009"},{id:10,name:"Nordic Birch Frame",style:"minimal",price:27.99,orig:null,rating:4.6,reviews:201,sale:!1,desc:"Light Scandinavian birch wood frame with a clean, airy aesthetic. Perfect for creating gallery walls.",sizes:["4×6","5×7","8×10","11×14"],stock:95,sku:"ST-NB-010"},{id:11,name:"Driftwood Coastal Frame",style:"rustic",price:64.99,orig:79.99,rating:4.7,reviews:112,sale:!0,desc:"Genuine driftwood frame with ocean-weathered character. Brings coastal charm to any room.",sizes:["5×7","8×10","11×14"],stock:22,sku:"ST-DC-011"},{id:12,name:"Shadow Box Deep Frame",style:"gallery",price:49.99,orig:null,rating:4.5,reviews:178,sale:!1,desc:"Deep profile shadow box for displaying 3D objects, memorabilia, and layered art compositions.",sizes:["8×10","11×14","12×12","16×20"],stock:41,sku:"ST-SB-012"}],Ch=[{name:"Classic",icon:"🖼️",cls:"cg1",filter:"classic",count:2},{name:"Modern",icon:"◼️",cls:"cg2",filter:"modern",count:2},{name:"Ornate",icon:"✨",cls:"cg3",filter:"ornate",count:2},{name:"Minimal",icon:"◻️",cls:"cg4",filter:"minimal",count:2},{name:"Rustic",icon:"🪵",cls:"cg5",filter:"rustic",count:2},{name:"Gallery",icon:"🎨",cls:"cg6",filter:"gallery",count:2},{name:"Shadow Box",icon:"📦",cls:"cg7",filter:"gallery",count:1},{name:"Custom",icon:"⚙️",cls:"cg8",filter:"all",count:12}],Ah=[{id:"ST-20260328-001",items:[1,3],total:139.98,status:"delivered",date:"Mar 28, 2026",progress:100},{id:"ST-20260401-002",items:[5,10],total:82.98,status:"shipped",date:"Apr 01, 2026",progress:65},{id:"ST-20260403-003",items:[9],total:109.99,status:"processing",date:"Apr 03, 2026",progress:25}],kh=[{type:"order",title:"Order Delivered",desc:"Your order ST-20260328-001 has been delivered successfully",time:"2 hours ago",unread:!0},{type:"ship",title:"Shipment Update",desc:"Your order ST-20260401-002 is on its way! Track it now",time:"5 hours ago",unread:!0},{type:"promo",title:"Spring Sale — 30% Off",desc:"Use code SPRING30 for 30% off all ornate frames this weekend",time:"1 day ago",unread:!0},{type:"order",title:"Order Confirmed",desc:"Your order ST-20260403-003 has been confirmed and is being processed",time:"2 days ago",unread:!1}],cs=[{id:"luxury-light",name:"Champagne",cls:"td-luxury-light"},{id:"luxury-dark",name:"Obsidian",cls:"td-luxury-dark"},{id:"ivory-rose",name:"Rose",cls:"td-ivory-rose"},{id:"midnight-teal",name:"Teal",cls:"td-midnight-teal"},{id:"warm-slate",name:"Slate",cls:"td-warm-slate"}],Ph={classic:{border:"7px solid #8B7355",radius:"2px"},modern:{border:"3px solid #2C2C2C",radius:"0"},ornate:{border:"9px double #C9A85C",radius:"3px"},minimal:{border:"2px solid #D0D0D0",radius:"0"},rustic:{border:"8px solid #A0856E",radius:"1px"},gallery:{border:"4px solid #1A1A1A",radius:"0"}},It=Eh("app",()=>{const t=Q("shop"),e=Q(null),n=Q("all"),s=Q([]),r=Q(new Set),i=Q(0),o=Q(0),a=Q(""),l=Q(!1),u=Q(null),d=Q(!1);let f=null;const y=Q(!1),_=X=>{e.value=X},m=()=>{e.value=null},w=()=>{y.value=!0},H=()=>{y.value=!1},R=()=>{e.value=null,s.value=[],r.value=new Set,t.value="shop",o.value=0,Ae("Signed out successfully")},p=new Set(["wishlist","orders","profile","notifications"]);function $(X){if(e.value)X();else{w();const fe=nt(e,be=>{be&&(fe(),X())})}}const V=X=>{if(p.has(X)&&!e.value){w();const fe=nt(e,be=>{be&&(fe(),t.value=X,o.value=0,window.scrollTo(0,0))});return}t.value=X,o.value=0,window.scrollTo(0,0)},W=X=>{n.value=X},F=X=>{$(()=>{r.value.has(X)?(r.value.delete(X),Ae("Removed from wishlist")):(r.value.add(X),Ae("Added to wishlist"))})},I=(X,fe)=>{$(()=>{const be=s.value.find(rn=>rn.id===X&&rn.size===fe);be?be.qty++:s.value.push({id:X,size:fe,qty:1});const Ct=Xe.find(rn=>rn.id===X);Ae(((Ct==null?void 0:Ct.name)||"Item")+" added to cart"),d.value=!1})},P=(X,fe)=>{const be=s.value[X];be&&(be.qty+=fe,be.qty<=0&&s.value.splice(X,1))},N=()=>{o.value=1},q=()=>{s.value=[],o.value=0,t.value="orders",Ae("Order placed successfully!")},ee=X=>{u.value=X,d.value=!0,document.body.style.overflow="hidden",window.scrollTo({top:0,behavior:"instant"})},L=()=>{d.value=!1,document.body.style.overflow=""},te=X=>{document.documentElement.dataset.theme=X;const fe=cs.findIndex(be=>be.id===X);fe!==-1&&(i.value=fe)},we=()=>{i.value=(i.value+1)%cs.length,te(cs[i.value].id)},Ae=X=>{a.value=X,l.value=!0,f&&clearTimeout(f),f=setTimeout(()=>{l.value=!1},2400)},ie=Q(""),Z=X=>{ie.value=X.trim().toLowerCase(),ie.value?W("search"):W("all"),t.value!=="shop"&&(t.value="shop")},le=Pe(()=>{if(n.value==="search"&&ie.value){const X=ie.value;return Xe.filter(fe=>fe.name.toLowerCase().includes(X)||fe.desc.toLowerCase().includes(X)||fe.style.toLowerCase().includes(X))}return n.value==="all"?Xe:Xe.filter(X=>X.style===n.value)}),Et=Pe(()=>[...Xe].reverse().slice(0,4)),kn=Pe(()=>s.value.reduce((X,fe)=>X+fe.qty,0)),Be=Pe(()=>s.value.reduce((X,fe)=>{const be=Xe.find(Ct=>Ct.id===fe.id);return X+((be==null?void 0:be.price)||0)*fe.qty},0)),He=Pe(()=>Be.value>0?Be.value>99?0:9.99:0),Wn=Pe(()=>Be.value*.08),Fr=Pe(()=>Be.value+He.value+Wn.value);return{currentPage:t,currentUser:e,signInOpen:y,setUser:_,clearUser:m,signOut:R,openSignIn:w,closeSignIn:H,filter:n,cart:s,wishlist:r,themeIdx:i,checkoutStep:o,toastMsg:a,toastVisible:l,sheetProduct:u,sheetOpen:d,searchQuery:ie,nav:V,setFilter:W,toggleWish:F,addCart:I,chgQty:P,startCheckout:N,placeOrder:q,openSheet:ee,closeSheet:L,setTheme:te,cycleTheme:we,showToast:Ae,handleSearch:Z,filteredProducts:le,newArrivals:Et,totalQty:kn,cartSubtotal:Be,shipping:He,tax:Wn,cartTotal:Fr}}),Rh={class:"page active"},Oh={class:"page-pad"},Nh={class:"hero"},xh={class:"mobile-search"},$h={class:"chips-row"},Dh=["onClick"],Mh={class:"sec-head"},Lh={class:"prod-grid"},Fh=["onClick"],Uh={class:"prod-img"},Vh={key:0,class:"sale-pill"},Bh=["onClick"],Hh={class:"material-icons-round"},jh={class:"prod-info"},Wh={class:"prod-name"},zh={class:"prod-rating"},Kh={class:"prod-price-row"},qh={class:"prod-price"},Gh={key:0,class:"prod-price-old"},Jh={class:"prod-grid"},Yh=["onClick"],Xh={class:"prod-img"},Qh={key:0,class:"sale-pill"},Zh=["onClick"],ep={class:"material-icons-round"},tp={class:"prod-info"},np={class:"prod-name"},sp={class:"prod-rating"},rp={class:"prod-price-row"},ip={class:"prod-price"},op={key:0,class:"prod-price-old"},ap=it({__name:"ShopPage",setup(t){const e=It(),n=["all","classic","modern","ornate","minimal","rustic","gallery"],s=Pe(()=>e.filteredProducts.slice(0,8));return(r,i)=>(T(),k("main",Rh,[c("div",Oh,[c("div",Nh,[i[4]||(i[4]=c("div",{class:"hero-tag"},[c("span",{class:"material-icons-round",style:{"font-size":"14px"}},"auto_awesome"),me(" New Collection 2026 ")],-1)),i[5]||(i[5]=c("div",{class:"hero-title"},[me("Craft Your"),c("br"),me("Precious Memories")],-1)),i[6]||(i[6]=c("div",{class:"hero-sub"},"Premium handcrafted frames for every moment worth preserving",-1)),c("a",{class:"hero-btn",onClick:i[0]||(i[0]=o=>v(e).nav("categories"))},[...i[3]||(i[3]=[me(" Explore Collection ",-1),c("span",{class:"material-icons-round"},"arrow_forward",-1)])])]),c("div",xh,[i[7]||(i[7]=c("span",{class:"material-icons-round"},"search",-1)),c("input",{type:"text",placeholder:"Search frames...",onInput:i[1]||(i[1]=o=>v(e).handleSearch(o.target.value))},null,32)]),c("div",$h,[(T(),k(re,null,Le(n,o=>c("div",{key:o,class:J(["chip",{active:v(e).filter===o}]),onClick:a=>v(e).setFilter(o)},M(o.charAt(0).toUpperCase()+o.slice(1)),11,Dh)),64))]),c("div",Mh,[i[9]||(i[9]=c("div",{class:"sec-title"},"Featured Frames",-1)),c("div",{class:"sec-link",onClick:i[2]||(i[2]=o=>v(e).nav("categories"))},[...i[8]||(i[8]=[me("View All ",-1),c("span",{class:"material-icons-round"},"chevron_right",-1)])])]),c("div",Lh,[(T(!0),k(re,null,Le(s.value,(o,a)=>(T(),k("div",{key:o.id,class:J(["prod-card","fr-"+o.style,"stag-"+(a%8+1)]),onClick:l=>v(e).openSheet(o)},[c("div",Uh,[i[10]||(i[10]=c("div",{class:"frame-box"},[c("div",{class:"inner"})],-1)),o.sale?(T(),k("div",Vh,"SALE")):ge("",!0),c("button",{class:J(["wish-btn",{liked:v(e).wishlist.has(o.id)}]),onClick:yt(l=>v(e).toggleWish(o.id),["stop"])},[c("span",Hh,M(v(e).wishlist.has(o.id)?"favorite":"favorite_border"),1)],10,Bh)]),c("div",jh,[c("div",Wh,M(o.name),1),c("div",zh,[i[11]||(i[11]=c("span",{class:"material-icons-round"},"star",-1)),c("span",null,M(o.rating)+" ("+M(o.reviews)+")",1)]),c("div",Kh,[c("span",qh,"$"+M(o.price.toFixed(2)),1),o.orig?(T(),k("span",Gh,"$"+M(o.orig.toFixed(2)),1)):ge("",!0)])])],10,Fh))),128))]),i[14]||(i[14]=c("div",{class:"sec-head"},[c("div",{class:"sec-title"},"New Arrivals"),c("div",{class:"sec-link"},[me("See More "),c("span",{class:"material-icons-round"},"chevron_right")])],-1)),c("div",Jh,[(T(!0),k(re,null,Le(v(e).newArrivals,(o,a)=>(T(),k("div",{key:"new-"+o.id,class:J(["prod-card","fr-"+o.style,"stag-"+(a%8+1)]),onClick:l=>v(e).openSheet(o)},[c("div",Xh,[i[12]||(i[12]=c("div",{class:"frame-box"},[c("div",{class:"inner"})],-1)),o.sale?(T(),k("div",Qh,"SALE")):ge("",!0),c("button",{class:J(["wish-btn",{liked:v(e).wishlist.has(o.id)}]),onClick:yt(l=>v(e).toggleWish(o.id),["stop"])},[c("span",ep,M(v(e).wishlist.has(o.id)?"favorite":"favorite_border"),1)],10,Zh)]),c("div",tp,[c("div",np,M(o.name),1),c("div",sp,[i[13]||(i[13]=c("span",{class:"material-icons-round"},"star",-1)),c("span",null,M(o.rating)+" ("+M(o.reviews)+")",1)]),c("div",rp,[c("span",ip,"$"+M(o.price.toFixed(2)),1),o.orig?(T(),k("span",op,"$"+M(o.orig.toFixed(2)),1)):ge("",!0)])])],10,Yh))),128))])])]))}}),lp={class:"page active"},cp={class:"page-pad"},up={class:"cat-grid"},dp=["onClick"],fp={class:"cat-thumb"},hp=["onClick"],pp={class:"cat-frame-stage"},gp=["onClick"],mp={key:2,class:"cat-dots"},yp={class:"cat-label"},vp={class:"cat-count"},_p=it({__name:"CategoriesPage",setup(t){const e=It(),n=Ch,s=Q({}),r=u=>s.value[u]??0,i=(u,d,f)=>{const y=r(u);s.value[u]=(y+d+f)%f},o=u=>u==="all"?Xe.filter(d=>[1,3,5,8,2,6].includes(d.id)):Xe.filter(d=>d.style===u),a=u=>{const d=o(u.filter);return d[r(u.name)]??d[0]},l=u=>{e.setFilter(u),e.nav("shop")};return(u,d)=>(T(),k("main",lp,[c("div",cp,[d[4]||(d[4]=c("h2",{style:{padding:"16px 0 4px","font-family":"var(--font-display)","font-size":"1.4rem","font-weight":"700"}},"Categories",-1)),d[5]||(d[5]=c("p",{style:{color:"var(--text-tertiary)","font-size":".88rem","margin-bottom":"16px"}},"Browse by frame style",-1)),c("div",up,[(T(!0),k(re,null,Le(v(n),(f,y)=>(T(),k("div",{key:f.name,class:J(["cat-card","stag-"+(y+1)]),onClick:_=>l(f.filter)},[c("div",fp,[o(f.filter).length>1?(T(),k("button",{key:0,class:"cat-nav cat-nav-l",onClick:yt(_=>i(f.name,-1,o(f.filter).length),["stop"])},[...d[0]||(d[0]=[c("span",{class:"material-icons-round"},"chevron_left",-1)])],8,hp)):ge("",!0),c("div",pp,[Se(ir,{name:"cat-slide"},{default:vs(()=>[(T(),k("div",{key:f.name+"-"+r(f.name),class:J(["cat-frame-wrap","fr-"+a(f).style])},[...d[1]||(d[1]=[c("div",{class:"cat-frame-box"},[c("div",{class:"cat-frame-inner"})],-1)])],2))]),_:2},1024)]),o(f.filter).length>1?(T(),k("button",{key:1,class:"cat-nav cat-nav-r",onClick:yt(_=>i(f.name,1,o(f.filter).length),["stop"])},[...d[2]||(d[2]=[c("span",{class:"material-icons-round"},"chevron_right",-1)])],8,gp)):ge("",!0),o(f.filter).length>1?(T(),k("div",mp,[(T(!0),k(re,null,Le(o(f.filter),(_,m)=>(T(),k("span",{key:m,class:J(["cat-dot",{active:r(f.name)===m}])},null,2))),128))])):ge("",!0)]),c("div",yp,[me(M(f.name),1),d[3]||(d[3]=c("br",null,null,-1)),c("span",vp,M(f.count)+" items",1)])],10,dp))),128))])])]))}}),bp={class:"page active"},wp={class:"page-pad"},Ip={class:"preview-tool"},Tp={class:"preview-area"},Sp={class:"preview-canvas"},Ep={key:0,class:"no-img"},Cp=["src"],Ap={class:"preview-controls"},kp={class:"form-group"},Pp={class:"form-group"},Rp={class:"form-group"},Op=it({__name:"PreviewPage",setup(t,{expose:e}){const n=Q(null),s=Q(""),r=Q("classic"),i=Q("80"),o=Q("none"),a=Q(!1),l=Pe(()=>{const R=Ph[r.value],p={border:R.border,borderRadius:R.radius,width:i.value+"%",height:i.value+"%"};return o.value!=="none"?(p.padding="12px",p.backgroundColor=o.value):(p.padding="0",p.backgroundColor="transparent"),p}),u=Pe(()=>a.value?{borderColor:"var(--accent)",background:"rgba(var(--accent-rgb),.06)"}:{}),d=()=>{var R;(R=n.value)==null||R.click()},f=R=>{var W;const $=(W=R.target.files)==null?void 0:W[0];if(!$)return;const V=new FileReader;V.onload=F=>{var I;s.value=(I=F.target)==null?void 0:I.result},V.readAsDataURL($)},y=()=>{a.value=!0},_=()=>{a.value=!1},m=R=>{var $;a.value=!1;const p=($=R.dataTransfer)==null?void 0:$.files[0];if(p&&p.type.startsWith("image/")){const V=new FileReader;V.onload=W=>{var F;s.value=(F=W.target)==null?void 0:F.result},V.readAsDataURL(p)}},w=()=>{};return e({setFrameStyle:R=>{r.value=R}}),(R,p)=>(T(),k("main",bp,[c("div",wp,[p[11]||(p[11]=c("h2",{style:{padding:"16px 0 4px","font-family":"var(--font-display)","font-size":"1.4rem","font-weight":"700"}},"Frame Preview Tool",-1)),p[12]||(p[12]=c("p",{style:{color:"var(--text-tertiary)","font-size":".88rem","margin-bottom":"16px"}},"Upload your photo and see how it looks in different frames",-1)),c("div",Ip,[c("div",Tp,[c("div",Sp,[c("div",{class:"frame-wrap",style:tn(l.value)},[s.value?(T(),k("img",{key:1,src:s.value,style:{width:"100%",height:"100%","object-fit":"cover"},alt:"Preview"},null,8,Cp)):(T(),k("div",Ep,[...p[3]||(p[3]=[c("span",{class:"material-icons-round"},"add_photo_alternate",-1),c("p",null,"Upload a photo to preview",-1)])]))],4)]),c("div",{class:"upload-zone",onClick:d,onDragover:yt(y,["prevent"]),onDragenter:yt(y,["prevent"]),onDragleave:yt(_,["prevent"]),onDrop:yt(m,["prevent"]),style:tn(u.value)},[...p[4]||(p[4]=[c("span",{class:"material-icons-round"},"cloud_upload",-1),c("p",null,"Click or drag to upload your photo",-1),c("small",null,"JPG, PNG, WEBP — Max 10 MB",-1)])],36),c("input",{ref_key:"fileInput",ref:n,type:"file",accept:"image/*",style:{display:"none"},onChange:f},null,544)]),c("div",Ap,[c("div",kp,[p[6]||(p[6]=c("label",{class:"form-label"},"Frame Style",-1)),ye(c("select",{class:"form-select","onUpdate:modelValue":p[0]||(p[0]=$=>r.value=$),onChange:w},[...p[5]||(p[5]=[Ho('<option value="classic">Classic Walnut</option><option value="modern">Modern Matte</option><option value="ornate">Ornate Gold</option><option value="minimal">Minimal White</option><option value="rustic">Rustic Wood</option><option value="gallery">Gallery Black</option>',6)])],544),[[Yr,r.value]])]),c("div",Pp,[p[8]||(p[8]=c("label",{class:"form-label"},"Frame Size",-1)),ye(c("select",{class:"form-select","onUpdate:modelValue":p[1]||(p[1]=$=>i.value=$),onChange:w},[...p[7]||(p[7]=[c("option",{value:"80"},"5×7",-1),c("option",{value:"75"},"8×10",-1),c("option",{value:"70"},"11×14",-1),c("option",{value:"65"},"16×20",-1)])],544),[[Yr,i.value]])]),c("div",Rp,[p[10]||(p[10]=c("label",{class:"form-label"},"Mat Color",-1)),ye(c("select",{class:"form-select","onUpdate:modelValue":p[2]||(p[2]=$=>o.value=$),onChange:w},[...p[9]||(p[9]=[Ho('<option value="none">No Mat</option><option value="#FFFFFF">White</option><option value="#F5F0E8">Cream</option><option value="#2C2C2C">Black</option><option value="#F0EDE4">Ivory</option>',5)])],544),[[Yr,o.value]])])])])])]))}}),Np={class:"page active"},xp={class:"page-pad"},$p={key:0,class:"auth-gate"},Dp={key:1,class:"wish-empty"},Mp={key:2,class:"prod-grid",style:{"padding-top":"12px"}},Lp=["onClick"],Fp={class:"prod-img"},Up=["onClick"],Vp={class:"prod-info"},Bp={class:"prod-name"},Hp={class:"prod-price-row"},jp={class:"prod-price"},Wp=it({__name:"WishlistPage",setup(t){const e=It(),n=Pe(()=>Xe.filter(s=>e.wishlist.has(s.id)));return(s,r)=>(T(),k("main",Np,[c("div",xp,[r[10]||(r[10]=c("h2",{style:{padding:"16px 0 4px","font-family":"var(--font-display)","font-size":"1.4rem","font-weight":"700"}},"My Wishlist",-1)),v(e).currentUser?n.value.length===0?(T(),k("div",Dp,[r[5]||(r[5]=c("span",{class:"material-icons-round"},"favorite_border",-1)),r[6]||(r[6]=c("h3",null,"Your wishlist is empty",-1)),r[7]||(r[7]=c("p",null,"Save frames you love for later",-1)),c("button",{class:"btn-primary",onClick:r[1]||(r[1]=i=>v(e).nav("shop"))},"Browse Frames")])):(T(),k("div",Mp,[(T(!0),k(re,null,Le(n.value,(i,o)=>(T(),k("div",{key:i.id,class:J(["prod-card","fr-"+i.style,"stag-"+(o%8+1)]),onClick:a=>v(e).openSheet(i)},[c("div",Fp,[r[9]||(r[9]=c("div",{class:"frame-box"},[c("div",{class:"inner"})],-1)),c("button",{class:"wish-btn liked",onClick:yt(a=>v(e).toggleWish(i.id),["stop"])},[...r[8]||(r[8]=[c("span",{class:"material-icons-round"},"favorite",-1)])],8,Up)]),c("div",Vp,[c("div",Bp,M(i.name),1),c("div",Hp,[c("span",jp,"$"+M(i.price.toFixed(2)),1)])])],10,Lp))),128))])):(T(),k("div",$p,[r[2]||(r[2]=c("span",{class:"material-icons-round auth-gate-icon"},"favorite_border",-1)),r[3]||(r[3]=c("h3",{class:"auth-gate-title"},"Sign in to see your wishlist",-1)),r[4]||(r[4]=c("p",{class:"auth-gate-sub"},"Save frames you love and access them anytime",-1)),c("button",{class:"btn-gold",onClick:r[0]||(r[0]=i=>v(e).openSignIn())},"Sign In")]))])]))}}),Yn="http://localhost:5184/api",us={async findOrCreate(t){const e=await fetch(`${Yn}/users/find-or-create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error(await e.text());return e.json()},async getById(t){const e=await fetch(`${Yn}/users/${t}`);if(!e.ok)throw new Error(await e.text());return e.json()},async update(t,e){const n=await fetch(`${Yn}/users/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!n.ok)throw new Error(await n.text());return n.json()},async addAddress(t,e){const n=await fetch(`${Yn}/users/${t}/addresses`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!n.ok)throw new Error(await n.text());return n.json()},async removeAddress(t,e){const n=await fetch(`${Yn}/users/${t}/addresses/${e}`,{method:"DELETE"});if(!n.ok)throw new Error(await n.text());return n.json()}},zp={class:"page active"},Kp={class:"page-pad"},qp={key:0,class:"cart-empty"},Gp={class:"cart-items"},Jp={class:"cart-item-img"},Yp={class:"cart-item-info"},Xp={class:"name"},Qp={class:"size"},Zp={class:"cart-item-bot"},eg={class:"price"},tg={class:"qty-row"},ng=["onClick"],sg={class:"qty-val"},rg=["onClick"],ig={class:"cart-summary"},og={class:"cart-row"},ag={class:"cart-row"},lg={key:0,style:{color:"var(--success)","font-weight":"600"}},cg={key:1},ug={class:"cart-row"},dg={key:0,style:{"font-size":".76rem",color:"var(--accent)","margin-bottom":"8px"}},fg={class:"cart-row total"},hg={class:"address-grid"},pg={class:"form-group"},gg={class:"form-group"},mg={class:"form-group",style:{"grid-column":"1/-1"}},yg={class:"form-group"},vg={class:"form-group"},_g={class:"form-group"},bg=["disabled"],wg={key:0,class:"material-icons-round",style:{"font-size":"18px"}},Ig={class:"payment-options"},Tg=["onClick"],Sg={class:"material-icons-round"},Eg={class:"pay-opt-label"},Cg={class:"pay-opt-desc"},Ag=it({__name:"CartPage",setup(t){var f,y;const e=It(),n=Q("Credit / Debit Card"),s=Q(!1),r=Q(null),i=Q(null),o=Cn({fullName:((f=e.currentUser)==null?void 0:f.name)??"",phone:((y=e.currentUser)==null?void 0:y.phone)??"",line1:"",city:"",state:"",pinCode:""});nt(()=>e.currentUser,_=>{_&&(o.fullName||(o.fullName=_.name??""),o.phone||(o.phone=_.phone??""))}),nt(()=>e.checkoutStep,async _=>{var m,w;await ks(),_===1&&((m=r.value)==null||m.scrollIntoView({behavior:"smooth",block:"start"})),_===2&&((w=i.value)==null||w.scrollIntoView({behavior:"smooth",block:"start"}))});const a=[{icon:"credit_card",label:"Credit / Debit Card",desc:"Visa, Mastercard, RuPay"},{icon:"account_balance",label:"Net Banking",desc:"All major banks"},{icon:"qr_code_2",label:"UPI",desc:"GPay, PhonePe, Paytm"},{icon:"local_shipping",label:"Cash on Delivery",desc:"Pay when you receive"}],l=_=>Xe.find(m=>m.id===_);function u(){if(e.currentUser)e.startCheckout();else{e.openSignIn();const _=nt(()=>e.currentUser,m=>{m&&(_(),e.startCheckout())})}}async function d(){var _;if(!o.phone){e.showToast("Phone number is required");return}if(((_=e.currentUser)==null?void 0:_.phone)===o.phone){e.checkoutStep=2;return}s.value=!0;try{const m=await us.findOrCreate({name:o.fullName||void 0,phone:o.phone});e.setUser(m),e.checkoutStep=2}catch{e.showToast("Something went wrong. Please try again.")}finally{s.value=!1}}return(_,m)=>(T(),k("main",zp,[c("div",Kp,[m[29]||(m[29]=c("h2",{style:{padding:"16px 0 4px","font-family":"var(--font-display)","font-size":"1.4rem","font-weight":"700"}},"Shopping Cart",-1)),v(e).cart.length===0?(T(),k("div",qp,[m[9]||(m[9]=c("span",{class:"material-icons-round"},"shopping_bag",-1)),m[10]||(m[10]=c("h3",null,"Your cart is empty",-1)),m[11]||(m[11]=c("p",null,"Add beautiful frames to get started",-1)),c("button",{class:"btn-primary",onClick:m[0]||(m[0]=w=>v(e).nav("shop"))},[...m[8]||(m[8]=[c("span",{class:"material-icons-round",style:{"font-size":"18px"}},"storefront",-1),me(" Start Shopping ",-1)])])])):(T(),k(re,{key:1},[c("div",Gp,[(T(!0),k(re,null,Le(v(e).cart,(w,H)=>{var R,p,$;return T(),k("div",{key:H,class:"cart-item",style:tn({animationDelay:H*.08+"s"})},[c("div",Jp,[c("div",{class:J(["mini-frame","fr-"+((R=l(w.id))==null?void 0:R.style)]),style:{width:"52px",height:"52px"}},[...m[12]||(m[12]=[c("div",{class:"frame-box",style:{width:"100%",height:"100%"}},[c("div",{class:"inner",style:{width:"80%",height:"80%"}})],-1)])],2)]),c("div",Yp,[c("div",Xp,M((p=l(w.id))==null?void 0:p.name),1),c("div",Qp,"Size: "+M(w.size),1),c("div",Zp,[c("div",eg,"$"+M((((($=l(w.id))==null?void 0:$.price)||0)*w.qty).toFixed(2)),1),c("div",tg,[c("button",{class:"qty-btn",onClick:V=>v(e).chgQty(H,-1)},"−",8,ng),c("span",sg,M(w.qty),1),c("button",{class:"qty-btn",onClick:V=>v(e).chgQty(H,1)},"+",8,rg)])])])],4)}),128))]),c("div",ig,[c("div",og,[m[13]||(m[13]=c("span",null,"Subtotal",-1)),c("span",null,"$"+M(v(e).cartSubtotal.toFixed(2)),1)]),c("div",ag,[m[14]||(m[14]=c("span",null,"Shipping",-1)),v(e).shipping===0?(T(),k("span",lg,"FREE")):(T(),k("span",cg,"$"+M(v(e).shipping.toFixed(2)),1))]),c("div",ug,[m[15]||(m[15]=c("span",null,"Tax (8%)",-1)),c("span",null,"$"+M(v(e).tax.toFixed(2)),1)]),v(e).shipping>0?(T(),k("div",dg," Add $"+M((99-v(e).cartSubtotal).toFixed(2))+" more for free shipping ",1)):ge("",!0),c("div",fg,[m[16]||(m[16]=c("span",null,"Total",-1)),c("span",null,"$"+M(v(e).cartTotal.toFixed(2)),1)]),v(e).checkoutStep===0?(T(),k("button",{key:1,class:"btn-gold",onClick:u},[...m[17]||(m[17]=[c("span",{class:"material-icons-round",style:{"font-size":"20px"}},"lock",-1),me(" Proceed to Checkout ",-1)])])):ge("",!0)]),v(e).checkoutStep>=1?(T(),k("div",{key:0,ref_key:"checkoutSection",ref:r,class:"checkout-section"},[m[26]||(m[26]=c("h3",null,[c("span",{class:"step-num"},"1"),me(" Shipping Address")],-1)),c("div",hg,[c("div",pg,[m[18]||(m[18]=c("label",{class:"form-label"},"Full Name",-1)),ye(c("input",{class:"form-input","onUpdate:modelValue":m[1]||(m[1]=w=>o.fullName=w),placeholder:"Full name"},null,512),[[Ee,o.fullName]])]),c("div",gg,[m[19]||(m[19]=c("label",{class:"form-label"},"Phone",-1)),ye(c("input",{class:"form-input","onUpdate:modelValue":m[2]||(m[2]=w=>o.phone=w),placeholder:"Phone number"},null,512),[[Ee,o.phone]])]),c("div",mg,[m[20]||(m[20]=c("label",{class:"form-label"},"Address Line 1",-1)),ye(c("input",{class:"form-input","onUpdate:modelValue":m[3]||(m[3]=w=>o.line1=w),placeholder:"Street address"},null,512),[[Ee,o.line1]])]),c("div",yg,[m[21]||(m[21]=c("label",{class:"form-label"},"City",-1)),ye(c("input",{class:"form-input","onUpdate:modelValue":m[4]||(m[4]=w=>o.city=w),placeholder:"City"},null,512),[[Ee,o.city]])]),c("div",vg,[m[22]||(m[22]=c("label",{class:"form-label"},"State",-1)),ye(c("input",{class:"form-input","onUpdate:modelValue":m[5]||(m[5]=w=>o.state=w),placeholder:"State"},null,512),[[Ee,o.state]])]),c("div",_g,[m[23]||(m[23]=c("label",{class:"form-label"},"PIN Code",-1)),ye(c("input",{class:"form-input","onUpdate:modelValue":m[6]||(m[6]=w=>o.pinCode=w),placeholder:"PIN code"},null,512),[[Ee,o.pinCode]])])]),c("button",{class:"btn-gold",style:{"margin-top":"4px",width:"100%"},disabled:s.value,onClick:d},[s.value?(T(),k("span",wg,"hourglass_empty")):(T(),k(re,{key:1},[m[24]||(m[24]=me(" Continue to Payment ",-1)),m[25]||(m[25]=c("span",{class:"material-icons-round",style:{"font-size":"18px"}},"arrow_forward",-1))],64))],8,bg)],512)):ge("",!0),v(e).checkoutStep>=2?(T(),k("div",{key:1,ref_key:"paymentSection",ref:i,class:"checkout-section"},[m[28]||(m[28]=c("h3",null,[c("span",{class:"step-num"},"2"),me(" Payment Method")],-1)),c("div",Ig,[(T(),k(re,null,Le(a,w=>c("div",{key:w.label,class:J(["pay-opt",{active:n.value===w.label}]),onClick:H=>n.value=w.label},[c("span",Sg,M(w.icon),1),c("div",null,[c("div",Eg,M(w.label),1),c("div",Cg,M(w.desc),1)])],10,Tg)),64))]),c("button",{class:"btn-gold",style:{width:"100%"},onClick:m[7]||(m[7]=w=>v(e).placeOrder())},[m[27]||(m[27]=c("span",{class:"material-icons-round",style:{"font-size":"20px"}},"check_circle",-1)),me(" Place Order — $"+M(v(e).cartTotal.toFixed(2)),1)])],512)):ge("",!0)],64))])]))}}),kg={class:"page active"},Pg={class:"page-pad"},Rg={key:0,class:"auth-gate"},Og={key:1,class:"orders-empty"},Ng={key:2},xg={class:"order-head"},$g={class:"order-id"},Dg={class:"order-items"},Mg=["title"],Lg={class:"order-track-bar"},Fg={class:"order-foot"},Ug={class:"order-date"},Vg={class:"order-total"},Bg=it({__name:"OrdersPage",setup(t){const e=It(),n=Ah,s=r=>Xe.find(i=>i.id===r);return(r,i)=>(T(),k("main",kg,[c("div",Pg,[i[10]||(i[10]=c("h2",{style:{padding:"16px 0 4px","font-family":"var(--font-display)","font-size":"1.4rem","font-weight":"700"}},"My Orders",-1)),v(e).currentUser?v(n).length===0?(T(),k("div",Og,[i[5]||(i[5]=c("span",{class:"material-icons-round"},"receipt_long",-1)),i[6]||(i[6]=c("h3",null,"No orders yet",-1)),i[7]||(i[7]=c("p",null,"Your order history will appear here",-1)),c("button",{class:"btn-primary",onClick:i[1]||(i[1]=o=>v(e).nav("shop"))},"Start Shopping")])):v(n).length>0?(T(),k("div",Ng,[(T(!0),k(re,null,Le(v(n),(o,a)=>(T(),k("div",{key:o.id,class:J(["order-card","stag-"+(a+1)])},[c("div",xg,[c("span",$g,M(o.id),1),c("span",{class:J(["order-status","status-"+o.status])},M(o.status),3)]),c("div",Dg,[(T(!0),k(re,null,Le(o.items,l=>{var u;return T(),k("div",{key:l,class:"order-item-thumb",title:(u=s(l))==null?void 0:u.name},[...i[8]||(i[8]=[c("div",{class:"mini-frame",style:{border:"3px solid var(--text-tertiary)"}},null,-1)])],8,Mg)}),128))]),c("div",Lg,[c("div",{class:"order-track-fill",style:tn({width:o.progress+"%"})},null,4)]),i[9]||(i[9]=c("div",{class:"order-track-labels"},[c("span",null,"Confirmed"),c("span",null,"Shipped"),c("span",null,"Delivered")],-1)),c("div",Fg,[c("span",Ug,M(o.date),1),c("span",Vg,"$"+M(o.total.toFixed(2)),1)])],2))),128))])):ge("",!0):(T(),k("div",Rg,[i[2]||(i[2]=c("span",{class:"material-icons-round auth-gate-icon"},"receipt_long",-1)),i[3]||(i[3]=c("h3",{class:"auth-gate-title"},"Sign in to view orders",-1)),i[4]||(i[4]=c("p",{class:"auth-gate-sub"},"Your order history will appear here once you sign in",-1)),c("button",{class:"btn-gold",onClick:i[0]||(i[0]=o=>v(e).openSignIn())},"Sign In")]))])]))}}),Hg={class:"page active"},jg={class:"page-pad"},Wg={key:0,class:"auth-gate"},zg={key:1,class:"notif-list"},Kg={class:"material-icons-round"},qg={class:"notif-body"},Gg={class:"notif-title"},Jg={class:"notif-desc"},Yg={class:"notif-time"},Xg=it({__name:"NotificationsPage",setup(t){const e=It(),n=kh,s=r=>{switch(r){case"order":return"check_circle";case"ship":return"local_shipping";default:return"local_offer"}};return(r,i)=>(T(),k("main",Hg,[c("div",jg,[i[4]||(i[4]=c("h2",{style:{padding:"16px 0 4px","font-family":"var(--font-display)","font-size":"1.4rem","font-weight":"700"}},"Notifications",-1)),v(e).currentUser?(T(),k("div",zg,[(T(!0),k(re,null,Le(v(n),(o,a)=>(T(),k("div",{key:a,class:J(["notif-item",{unread:o.unread},"stag-"+(a+1)])},[c("div",{class:J(["notif-icon",o.type])},[c("span",Kg,M(s(o.type)),1)],2),c("div",qg,[c("div",Gg,M(o.title),1),c("div",Jg,M(o.desc),1),c("div",Yg,M(o.time),1)])],2))),128))])):(T(),k("div",Wg,[i[1]||(i[1]=c("span",{class:"material-icons-round auth-gate-icon"},"notifications_none",-1)),i[2]||(i[2]=c("h3",{class:"auth-gate-title"},"Sign in for notifications",-1)),i[3]||(i[3]=c("p",{class:"auth-gate-sub"},"Order updates and offers will appear here",-1)),c("button",{class:"btn-gold",onClick:i[0]||(i[0]=o=>v(e).openSignIn())},"Sign In")]))])]))}}),Qg={class:"page active"},Zg={class:"page-pad"},em={key:0,class:"auth-gate"},tm={class:"profile-head"},nm={class:"avatar"},sm={key:0,class:"profile-name"},rm={key:1,class:"name-edit-row"},im=["disabled"],om={key:0,class:"material-icons-round rotating"},am={key:1,class:"material-icons-round"},lm={class:"profile-email"},cm={class:"menu-group"},um={key:0,class:"addr-panel"},dm={key:0,class:"addr-empty"},fm={class:"addr-card-head"},hm={class:"addr-label"},pm=["onClick"],gm={class:"addr-line"},mm={class:"addr-line"},ym={key:1,class:"addr-add-btn-wrap"},vm={key:2,class:"addr-form"},_m={class:"addr-form-row"},bm={class:"addr-form-row two-col"},wm={class:"addr-form-row"},Im={class:"addr-form-row two-col"},Tm={class:"addr-form-row half"},Sm={class:"addr-form-actions"},Em=["disabled"],Cm={key:0,class:"material-icons-round rotating",style:{"font-size":"16px"}},Am={key:1},km={class:"theme-picker"},Pm={class:"theme-row"},Rm=["onClick"],Om={class:"menu-group"},Nm=it({__name:"ProfilePage",setup(t){const e=It(),n=cs,s=Pe(()=>{var F;return((F=cs[e.themeIdx])==null?void 0:F.id)||"luxury-light"}),r=Pe(()=>{var F,I;return((I=(F=e.currentUser)==null?void 0:F.name)==null?void 0:I.charAt(0).toUpperCase())??"?"}),i=Q(!1),o=Q(""),a=Q(!1),l=Q(null);function u(){var F;o.value=((F=e.currentUser)==null?void 0:F.name)??"",i.value=!0,ks(()=>{var I;return(I=l.value)==null?void 0:I.focus()})}function d(){i.value=!1}async function f(){if(!(!e.currentUser||a.value)){a.value=!0;try{const F=await us.update(e.currentUser.id,{name:o.value.trim()});e.setUser(F),i.value=!1,e.showToast("Name updated")}catch{e.showToast("Failed to update name")}finally{a.value=!1}}}const y=Q(!1),_=Q(!1),m=Q(!1),w=Pe(()=>{var F;return((F=e.currentUser)==null?void 0:F.addresses)??[]});function H(){y.value=!y.value,y.value||(_.value=!1)}const R=()=>({label:"",fullName:"",phone:"",line1:"",city:"",state:"",pinCode:""}),p=Cn(R());function $(){Object.assign(p,R()),_.value=!1}async function V(){if(!(!e.currentUser||m.value)){if(!p.fullName||!p.phone||!p.line1||!p.city||!p.state||!p.pinCode){e.showToast("Please fill all required fields");return}m.value=!0;try{const F=await us.addAddress(e.currentUser.id,{...p});e.setUser(F),Object.assign(p,R()),_.value=!1,e.showToast("Address saved")}catch{e.showToast("Failed to save address")}finally{m.value=!1}}}async function W(F){if(e.currentUser)try{const I=await us.removeAddress(e.currentUser.id,F);e.setUser(I),e.showToast("Address removed")}catch{e.showToast("Failed to remove address")}}return(F,I)=>(T(),k("main",Qg,[c("div",Zg,[v(e).currentUser?(T(),k(re,{key:1},[c("div",tm,[c("div",nm,[me(M(r.value)+" ",1),c("span",{class:"avatar-edit",onClick:u},[...I[17]||(I[17]=[c("span",{class:"material-icons-round"},"edit",-1)])])]),i.value?(T(),k("div",rm,[ye(c("input",{ref_key:"nameInputRef",ref:l,"onUpdate:modelValue":I[1]||(I[1]=P=>o.value=P),class:"name-input",placeholder:"Your name",maxlength:"60",onKeyup:[yn(f,["enter"]),yn(d,["escape"])]},null,544),[[Ee,o.value]]),c("button",{class:"icon-btn-sm",disabled:a.value,onClick:f},[a.value?(T(),k("span",om,"sync")):(T(),k("span",am,"check"))],8,im),c("button",{class:"icon-btn-sm",onClick:d},[...I[18]||(I[18]=[c("span",{class:"material-icons-round"},"close",-1)])])])):(T(),k("div",sm,M(v(e).currentUser.name??"My Account"),1)),c("div",lm,M(v(e).currentUser.email??v(e).currentUser.phone??""),1)]),c("div",cm,[c("div",{class:"menu-item",onClick:I[2]||(I[2]=P=>v(e).nav("orders"))},[...I[19]||(I[19]=[c("span",{class:"material-icons-round"},"receipt_long",-1),c("span",{class:"menu-item-label"},"My Orders",-1),c("span",{class:"material-icons-round menu-item-arrow"},"chevron_right",-1)])]),c("div",{class:"menu-item",onClick:I[3]||(I[3]=P=>v(e).nav("wishlist"))},[...I[20]||(I[20]=[c("span",{class:"material-icons-round"},"favorite",-1),c("span",{class:"menu-item-label"},"Wishlist",-1),c("span",{class:"material-icons-round menu-item-arrow"},"chevron_right",-1)])]),c("div",{class:"menu-item",onClick:H},[I[21]||(I[21]=c("span",{class:"material-icons-round"},"location_on",-1)),I[22]||(I[22]=c("span",{class:"menu-item-label"},"Addresses",-1)),c("span",{class:"material-icons-round menu-item-arrow",style:tn({transform:y.value?"rotate(90deg)":""})},"chevron_right",4)]),Se(ir,{name:"slide-down"},{default:vs(()=>[y.value?(T(),k("div",um,[w.value.length===0?(T(),k("div",dm,"No saved addresses")):ge("",!0),(T(!0),k(re,null,Le(w.value,(P,N)=>(T(),k("div",{key:N,class:"addr-card"},[c("div",fm,[c("span",hm,M(P.label||"Address "+(N+1)),1),c("button",{class:"icon-btn-sm icon-btn-danger",onClick:q=>W(N)},[...I[23]||(I[23]=[c("span",{class:"material-icons-round"},"delete_outline",-1)])],8,pm)]),c("div",gm,M(P.fullName)+" · "+M(P.phone),1),c("div",mm,M(P.line1)+", "+M(P.city)+", "+M(P.state)+" "+M(P.pinCode),1)]))),128)),_.value?(T(),k("div",vm,[I[25]||(I[25]=c("div",{class:"addr-form-title"},"New Address",-1)),c("div",_m,[ye(c("input",{"onUpdate:modelValue":I[5]||(I[5]=P=>p.label=P),class:"addr-input",placeholder:"Label (Home, Work…)"},null,512),[[Ee,p.label]])]),c("div",bm,[ye(c("input",{"onUpdate:modelValue":I[6]||(I[6]=P=>p.fullName=P),class:"addr-input",placeholder:"Full name *"},null,512),[[Ee,p.fullName]]),ye(c("input",{"onUpdate:modelValue":I[7]||(I[7]=P=>p.phone=P),class:"addr-input",placeholder:"Phone *"},null,512),[[Ee,p.phone]])]),c("div",wm,[ye(c("input",{"onUpdate:modelValue":I[8]||(I[8]=P=>p.line1=P),class:"addr-input",placeholder:"Street / Flat / Area *"},null,512),[[Ee,p.line1]])]),c("div",Im,[ye(c("input",{"onUpdate:modelValue":I[9]||(I[9]=P=>p.city=P),class:"addr-input",placeholder:"City *"},null,512),[[Ee,p.city]]),ye(c("input",{"onUpdate:modelValue":I[10]||(I[10]=P=>p.state=P),class:"addr-input",placeholder:"State *"},null,512),[[Ee,p.state]])]),c("div",Tm,[ye(c("input",{"onUpdate:modelValue":I[11]||(I[11]=P=>p.pinCode=P),class:"addr-input",placeholder:"PIN Code *",maxlength:"10"},null,512),[[Ee,p.pinCode]])]),c("div",Sm,[c("button",{class:"btn-outline-sm",onClick:$},"Cancel"),c("button",{class:"btn-primary-sm",disabled:m.value,onClick:V},[m.value?(T(),k("span",Cm,"sync")):(T(),k("span",Am,"Save"))],8,Em)])])):(T(),k("div",ym,[c("button",{class:"btn-outline-sm",onClick:I[4]||(I[4]=P=>_.value=!0)},[...I[24]||(I[24]=[c("span",{class:"material-icons-round"},"add",-1),me(" Add Address ",-1)])])]))])):ge("",!0)]),_:1}),c("div",{class:"menu-item",onClick:I[12]||(I[12]=P=>v(e).nav("notifications"))},[...I[26]||(I[26]=[c("span",{class:"material-icons-round"},"notifications",-1),c("span",{class:"menu-item-label"},"Notifications",-1),c("span",{class:"material-icons-round menu-item-arrow"},"chevron_right",-1)])]),I[27]||(I[27]=c("div",{class:"menu-item"},[c("span",{class:"material-icons-round"},"help"),c("span",{class:"menu-item-label"},"Help & Support"),c("span",{class:"material-icons-round menu-item-arrow"},"chevron_right")],-1))]),c("div",km,[I[28]||(I[28]=c("div",{class:"theme-picker-title"},[c("span",{class:"material-icons-round",style:{"font-size":"20px",color:"var(--accent)"}},"palette"),me(" App Theme ")],-1)),c("div",Pm,[(T(!0),k(re,null,Le(v(n),P=>(T(),k("div",{key:P.id,class:J(["theme-opt",{active:s.value===P.id}]),onClick:N=>v(e).setTheme(P.id)},[c("div",{class:J(["theme-dot",P.cls,{active:s.value===P.id}])},null,2),c("span",null,M(P.name),1)],10,Rm))),128))])]),c("div",Om,[c("div",{class:"menu-item",style:{color:"var(--error)"},onClick:I[13]||(I[13]=P=>v(e).signOut())},[...I[29]||(I[29]=[c("span",{class:"material-icons-round",style:{color:"var(--error)"}},"logout",-1),c("span",{class:"menu-item-label"},"Sign Out",-1),c("span",{class:"material-icons-round menu-item-arrow"},"chevron_right",-1)])])])],64)):(T(),k("div",em,[I[14]||(I[14]=c("span",{class:"material-icons-round auth-gate-icon"},"account_circle",-1)),I[15]||(I[15]=c("h3",{class:"auth-gate-title"},"Sign in to your account",-1)),I[16]||(I[16]=c("p",{class:"auth-gate-sub"},"Access your orders, wishlist, addresses and more",-1)),c("button",{class:"btn-gold",onClick:I[0]||(I[0]=P=>v(e).openSignIn())},"Sign In")]))])]))}}),xm={key:0,class:"bsheet-content"},$m={class:"bsheet-img"},Dm={class:"bsheet-meta"},Mm={class:"bsheet-name"},Lm={class:"bsheet-rating"},Fm={class:"bsheet-price"},Um={key:0,class:"old"},Vm={class:"bsheet-desc-wrap"},Bm={class:"bsheet-sizes"},Hm={class:"sizes"},jm=["onClick"],Wm={class:"bsheet-acts"},zm=["title"],Km={class:"material-icons-round"},qm=it({__name:"BottomSheet",setup(t){const e=It(),n=Q(1),s=Q(!1);nt(()=>e.sheetProduct,()=>{n.value=1,s.value=!1});const r=Pe(()=>{var a,l;return(((l=(a=e.sheetProduct)==null?void 0:a.desc)==null?void 0:l.length)||0)>100}),i=()=>{if(!e.sheetProduct)return;const a=e.sheetProduct.sizes[n.value]||e.sheetProduct.sizes[0];e.addCart(e.sheetProduct.id,a)},o=()=>{e.closeSheet(),e.nav("preview")};return(a,l)=>v(e).sheetProduct?(T(),k("div",xm,[c("button",{class:"bsheet-close",onClick:l[0]||(l[0]=u=>v(e).closeSheet())},[...l[3]||(l[3]=[c("span",{class:"material-icons-round"},"close",-1)])]),c("div",$m,[c("div",{class:J(["frame-lg","fr-"+v(e).sheetProduct.style])},[...l[4]||(l[4]=[c("div",{class:"frame-box"},[c("div",{class:"inner-lg"})],-1)])],2)]),c("div",Dm,[c("div",Mm,M(v(e).sheetProduct.name),1),c("div",Lm,[(T(),k(re,null,Le(5,u=>c("span",{key:u,class:"material-icons-round"},M(u<=Math.floor(v(e).sheetProduct.rating)?"star":u-v(e).sheetProduct.rating<1?"star_half":"star_border"),1)),64)),c("span",null,M(v(e).sheetProduct.rating)+" ("+M(v(e).sheetProduct.reviews)+" reviews)",1)]),c("div",Fm,[me(" $"+M(v(e).sheetProduct.price.toFixed(2))+" ",1),v(e).sheetProduct.orig?(T(),k("span",Um,"$"+M(v(e).sheetProduct.orig.toFixed(2)),1)):ge("",!0)])]),c("div",Vm,[c("div",{class:J(["bsheet-desc",{expanded:s.value}])},M(v(e).sheetProduct.desc),3),r.value?(T(),k("button",{key:0,class:"read-more-btn",onClick:l[1]||(l[1]=u=>s.value=!s.value)},M(s.value?"Read Less":"Read More"),1)):ge("",!0)]),c("div",Bm,[l[5]||(l[5]=c("div",{class:"size-label"},"Select Size",-1)),c("div",Hm,[(T(!0),k(re,null,Le(v(e).sheetProduct.sizes,(u,d)=>(T(),k("div",{key:u,class:J(["size-chip",{active:n.value===d}]),onClick:f=>n.value=d},M(u),11,jm))),128))])]),c("div",Wm,[c("button",{class:"btn-wish",onClick:l[2]||(l[2]=u=>v(e).toggleWish(v(e).sheetProduct.id)),title:v(e).wishlist.has(v(e).sheetProduct.id)?"Remove from Wishlist":"Add to Wishlist"},[c("span",Km,M(v(e).wishlist.has(v(e).sheetProduct.id)?"favorite":"favorite_border"),1)],8,zm),c("button",{class:"btn-try",onClick:o,title:"Try with your photo"},[...l[6]||(l[6]=[c("span",{class:"material-icons-round"},"photo_camera",-1)])]),c("button",{class:"bsheet-cart-btn",onClick:i},[...l[7]||(l[7]=[c("span",{class:"material-icons-round"},"add_shopping_cart",-1),me(" Add to Cart ",-1)])])])])):ge("",!0)}}),Gm=()=>{};var pa={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vc=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Jm=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],l=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},_c={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,l=r+2<t.length,u=l?t[r+2]:0,d=i>>2,f=(i&3)<<4|a>>4;let y=(a&15)<<2|u>>6,_=u&63;l||(_=64,o||(y=64)),s.push(n[d],n[f],n[y],n[_])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(vc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Jm(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const u=r<t.length?n[t.charAt(r)]:64;++r;const f=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||u==null||f==null)throw new Ym;const y=i<<2|a>>4;if(s.push(y),u!==64){const _=a<<4&240|u>>2;if(s.push(_),f!==64){const m=u<<6&192|f;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ym extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Xm=function(t){const e=vc(t);return _c.encodeByteArray(e,!0)},bc=function(t){return Xm(t).replace(/\./g,"")},wc=function(t){try{return _c.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm=()=>Qm().__FIREBASE_DEFAULTS__,ey=()=>{if(typeof process>"u"||typeof pa>"u")return;const t=pa.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ty=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&wc(t[1]);return e&&JSON.parse(e)},Zi=()=>{try{return Gm()||Zm()||ey()||ty()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ny=t=>{var e,n;return(n=(e=Zi())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},Ic=()=>{var t;return(t=Zi())==null?void 0:t.config},Tc=t=>{var e;return(e=Zi())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ry(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ue())}function iy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sc(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function oy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ay(){const t=Ue();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Ec(){try{return typeof indexedDB=="object"}catch{return!1}}function Cc(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}function ly(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy="FirebaseError";class Tt extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=cy,Object.setPrototypeOf(this,Tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,An.prototype.create)}}class An{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?uy(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Tt(r,a,s)}}function uy(t,e){return t.replace(dy,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const dy=/\{\$([^}]+)}/g;function fy(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function In(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(ga(i)&&ga(o)){if(!In(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function ga(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hn(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function hy(t,e){const n=new py(t,e);return n.subscribe.bind(n)}class py{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");gy(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=Qr),r.error===void 0&&(r.error=Qr),r.complete===void 0&&(r.complete=Qr);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function gy(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Qr(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my=1e3,yy=2,vy=14400*1e3,_y=.5;function ma(t,e=my,n=yy){const s=e*Math.pow(n,t),r=Math.round(_y*s*(Math.random()-.5)*2);return Math.min(vy,s+r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function by(t){return(await fetch(t,{credentials:"include"})).ok}class bt{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new sy;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ty(e))try{this.getOrInitializeService({instanceIdentifier:hn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=hn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=hn){return this.instances.has(e)}getOptions(e=hn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Iy(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=hn){return this.component?this.component.multipleInstances?e:hn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Iy(t){return t===hn?void 0:t}function Ty(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new wy(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ue||(ue={}));const Ey={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},Cy=ue.INFO,Ay={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},ky=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Ay[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class to{constructor(e){this.name=e,this._logLevel=Cy,this._logHandler=ky,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ey[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}}const Py=(t,e)=>e.some(n=>t instanceof n);let ya,va;function Ry(){return ya||(ya=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Oy(){return va||(va=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ac=new WeakMap,Ai=new WeakMap,kc=new WeakMap,Zr=new WeakMap,no=new WeakMap;function Ny(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Qt(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Ac.set(n,t)}).catch(()=>{}),no.set(e,t),e}function xy(t){if(Ai.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Ai.set(t,e)}let ki={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ai.get(t);if(e==="objectStoreNames")return t.objectStoreNames||kc.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Qt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function $y(t){ki=t(ki)}function Dy(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ei(this),e,...n);return kc.set(s,e.sort?e.sort():[e]),Qt(s)}:Oy().includes(t)?function(...e){return t.apply(ei(this),e),Qt(Ac.get(this))}:function(...e){return Qt(t.apply(ei(this),e))}}function My(t){return typeof t=="function"?Dy(t):(t instanceof IDBTransaction&&xy(t),Py(t,Ry())?new Proxy(t,ki):t)}function Qt(t){if(t instanceof IDBRequest)return Ny(t);if(Zr.has(t))return Zr.get(t);const e=My(t);return e!==t&&(Zr.set(t,e),no.set(e,t)),e}const ei=t=>no.get(t);function Pc(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=Qt(o);return s&&o.addEventListener("upgradeneeded",l=>{s(Qt(o.result),l.oldVersion,l.newVersion,Qt(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{i&&l.addEventListener("close",()=>i()),r&&l.addEventListener("versionchange",u=>r(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const Ly=["get","getKey","getAll","getAllKeys","count"],Fy=["put","add","delete","clear"],ti=new Map;function _a(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ti.get(e))return ti.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Fy.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Ly.includes(n)))return;const i=async function(o,...a){const l=this.transaction(o,r?"readwrite":"readonly");let u=l.store;return s&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),r&&l.done]))[0]};return ti.set(e,i),i}$y(t=>({...t,get:(e,n,s)=>_a(e,n)||t.get(e,n,s),has:(e,n)=>!!_a(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uy{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Vy(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Vy(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Pi="@firebase/app",ba="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=new to("@firebase/app"),By="@firebase/app-compat",Hy="@firebase/analytics-compat",jy="@firebase/analytics",Wy="@firebase/app-check-compat",zy="@firebase/app-check",Ky="@firebase/auth",qy="@firebase/auth-compat",Gy="@firebase/database",Jy="@firebase/data-connect",Yy="@firebase/database-compat",Xy="@firebase/functions",Qy="@firebase/functions-compat",Zy="@firebase/installations",ev="@firebase/installations-compat",tv="@firebase/messaging",nv="@firebase/messaging-compat",sv="@firebase/performance",rv="@firebase/performance-compat",iv="@firebase/remote-config",ov="@firebase/remote-config-compat",av="@firebase/storage",lv="@firebase/storage-compat",cv="@firebase/firestore",uv="@firebase/ai",dv="@firebase/firestore-compat",fv="firebase",hv="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri="[DEFAULT]",pv={[Pi]:"fire-core",[By]:"fire-core-compat",[jy]:"fire-analytics",[Hy]:"fire-analytics-compat",[zy]:"fire-app-check",[Wy]:"fire-app-check-compat",[Ky]:"fire-auth",[qy]:"fire-auth-compat",[Gy]:"fire-rtdb",[Jy]:"fire-data-connect",[Yy]:"fire-rtdb-compat",[Xy]:"fire-fn",[Qy]:"fire-fn-compat",[Zy]:"fire-iid",[ev]:"fire-iid-compat",[tv]:"fire-fcm",[nv]:"fire-fcm-compat",[sv]:"fire-perf",[rv]:"fire-perf-compat",[iv]:"fire-rc",[ov]:"fire-rc-compat",[av]:"fire-gcs",[lv]:"fire-gcs-compat",[cv]:"fire-fst",[dv]:"fire-fst-compat",[uv]:"fire-vertex","fire-js":"fire-js",[fv]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lr=new Map,gv=new Map,Oi=new Map;function wa(t,e){try{t.container.addComponent(e)}catch(n){Vt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Bt(t){const e=t.name;if(Oi.has(e))return Vt.debug(`There were multiple attempts to register component ${e}.`),!1;Oi.set(e,t);for(const n of lr.values())wa(n,t);for(const n of gv.values())wa(n,t);return!0}function jn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Qe(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mv={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Zt=new An("app","Firebase",mv);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new bt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Zt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=hv;function Rc(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Ri,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw Zt.create("bad-app-name",{appName:String(r)});if(n||(n=Ic()),!n)throw Zt.create("no-options");const i=lr.get(r);if(i){if(In(n,i.options)&&In(s,i.config))return i;throw Zt.create("duplicate-app",{appName:r})}const o=new Sy(r);for(const l of Oi.values())o.addComponent(l);const a=new yv(n,s,o);return lr.set(r,a),a}function Oc(t=Ri){const e=lr.get(t);if(!e&&t===Ri&&Ic())return Rc();if(!e)throw Zt.create("no-app",{appName:t});return e}function _t(t,e,n){let s=pv[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vt.warn(o.join(" "));return}Bt(new bt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vv="firebase-heartbeat-database",_v=1,Ts="firebase-heartbeat-store";let ni=null;function Nc(){return ni||(ni=Pc(vv,_v,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ts)}catch(n){console.warn(n)}}}}).catch(t=>{throw Zt.create("idb-open",{originalErrorMessage:t.message})})),ni}async function bv(t){try{const n=(await Nc()).transaction(Ts),s=await n.objectStore(Ts).get(xc(t));return await n.done,s}catch(e){if(e instanceof Tt)Vt.warn(e.message);else{const n=Zt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Vt.warn(n.message)}}}async function Ia(t,e){try{const s=(await Nc()).transaction(Ts,"readwrite");await s.objectStore(Ts).put(e,xc(t)),await s.done}catch(n){if(n instanceof Tt)Vt.warn(n.message);else{const s=Zt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Vt.warn(s.message)}}}function xc(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wv=1024,Iv=30;class Tv{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ev(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ta();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>Iv){const o=Cv(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Vt.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ta(),{heartbeatsToSend:s,unsentEntries:r}=Sv(this._heartbeatsCache.heartbeats),i=bc(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Vt.warn(n),""}}}function Ta(){return new Date().toISOString().substring(0,10)}function Sv(t,e=wv){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Sa(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Sa(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Ev{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ec()?Cc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await bv(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ia(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ia(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Sa(t){return bc(JSON.stringify({version:2,heartbeats:t})).length}function Cv(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Av(t){Bt(new bt("platform-logger",e=>new Uy(e),"PRIVATE")),Bt(new bt("heartbeat",e=>new Tv(e),"PRIVATE")),_t(Pi,ba,t),_t(Pi,ba,"esm2020"),_t("fire-js","")}Av("");var kv="firebase",Pv="12.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_t(kv,Pv,"app");function $c(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Rv=$c,Dc=new An("auth","Firebase",$c());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr=new to("@firebase/auth");function Ov(t,...e){cr.logLevel<=ue.WARN&&cr.warn(`Auth (${Rs}): ${t}`,...e)}function Ks(t,...e){cr.logLevel<=ue.ERROR&&cr.error(`Auth (${Rs}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(t,...e){throw ro(t,...e)}function Ve(t,...e){return ro(t,...e)}function so(t,e,n){const s={...Rv(),[e]:n};return new An("auth","Firebase",s).create(e,{appName:t.name})}function en(t){return so(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Nv(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&wt(t,"argument-error"),so(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ro(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Dc.create(t,...e)}function B(t,e,...n){if(!t)throw ro(e,...n)}function $t(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ks(e),new Error(e)}function Ht(t,e){t||$t(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ni(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function Mc(){return Ea()==="http:"||Ea()==="https:"}function Ea(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Mc()||Sc()||"connection"in navigator)?navigator.onLine:!0}function $v(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ht(n>e,"Short delay should be less than long delay!"),this.isMobile=ry()||oy()}get(){return xv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(t,e){Ht(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;$t("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;$t("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;$t("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mv=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Lv=new Os(3e4,6e4);function St(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function at(t,e,n,s,r={}){return Fc(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Hn({key:t.config.apiKey,...o}).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const u={method:e,headers:l,...i};return iy()||(u.referrerPolicy="no-referrer"),t.emulatorConfig&&eo(t.emulatorConfig.host)&&(u.credentials="include"),Lc.fetch()(await Uc(t,t.config.apiHost,n,a),u)})}async function Fc(t,e,n){t._canInitEmulator=!1;const s={...Dv,...e};try{const r=new Uv(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Zn(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[l,u]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Zn(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Zn(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw Zn(t,"user-disabled",o);const d=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw so(t,d,u);wt(t,d)}}catch(r){if(r instanceof Tt)throw r;wt(t,"network-request-failed",{message:String(r)})}}async function xr(t,e,n,s,r={}){const i=await at(t,e,n,s,r);return"mfaPendingCredential"in i&&wt(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function Uc(t,e,n,s){const r=`${e}${n}?${s}`,i=t,o=i.config.emulator?io(t.config,r):`${t.config.apiScheme}://${r}`;return Mv.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function Fv(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Uv{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Ve(this.auth,"network-request-failed")),Lv.get())})}}function Zn(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=Ve(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ca(t){return t!==void 0&&t.getResponse!==void 0}function Aa(t){return t!==void 0&&t.enterprise!==void 0}class Vc{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Fv(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vv(t){return(await at(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Bc(t,e){return at(t,"GET","/v2/recaptchaConfig",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bv(t,e){return at(t,"POST","/v1/accounts:delete",e)}async function ur(t,e){return at(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ds(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Hv(t,e=!1){const n=ot(t),s=await n.getIdToken(e),r=oo(s);B(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:ds(si(r.auth_time)),issuedAtTime:ds(si(r.iat)),expirationTime:ds(si(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function si(t){return Number(t)*1e3}function oo(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return Ks("JWT malformed, contained fewer than 3 sections"),null;try{const r=wc(n);return r?JSON.parse(r):(Ks("Failed to decode base64 JWT payload"),null)}catch(r){return Ks("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function ka(t){const e=oo(t);return B(e,"internal-error"),B(typeof e.exp<"u","internal-error"),B(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ss(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Tt&&jv(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function jv({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ds(this.lastLoginAt),this.creationTime=ds(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dr(t){var f;const e=t.auth,n=await t.getIdToken(),s=await Ss(t,ur(e,{idToken:n}));B(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const i=(f=r.providerUserInfo)!=null&&f.length?Hc(r.providerUserInfo):[],o=Kv(t.providerData,i),a=t.isAnonymous,l=!(t.email&&r.passwordHash)&&!(o!=null&&o.length),u=a?l:!1,d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new xi(r.createdAt,r.lastLoginAt),isAnonymous:u};Object.assign(t,d)}async function zv(t){const e=ot(t);await dr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Kv(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function Hc(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qv(t,e){const n=await Fc(t,{},async()=>{const s=Hn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=await Uc(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:a,body:s};return t.emulatorConfig&&eo(t.emulatorConfig.host)&&(l.credentials="include"),Lc.fetch()(o,l)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Gv(t,e){return at(t,"POST","/v2/accounts:revokeToken",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,"internal-error"),B(typeof e.idToken<"u","internal-error"),B(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ka(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){B(e.length!==0,"internal-error");const n=ka(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await qv(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new Mn;return s&&(B(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(B(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(B(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Mn,this.toJSON())}_performRefresh(){return $t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(t,e){B(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ze{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Wv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new xi(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await Ss(this,this.stsTokenManager.getToken(this.auth,e));return B(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Hv(this,e)}reload(){return zv(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ze({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await dr(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(en(this.auth));const e=await this.getIdToken();return await Ss(this,Bv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,l=n._redirectEventId??void 0,u=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:f,emailVerified:y,isAnonymous:_,providerData:m,stsTokenManager:w}=n;B(f&&w,e,"internal-error");const H=Mn.fromJSON(this.name,w);B(typeof f=="string",e,"internal-error"),Kt(s,e.name),Kt(r,e.name),B(typeof y=="boolean",e,"internal-error"),B(typeof _=="boolean",e,"internal-error"),Kt(i,e.name),Kt(o,e.name),Kt(a,e.name),Kt(l,e.name),Kt(u,e.name),Kt(d,e.name);const R=new Ze({uid:f,auth:e,email:r,emailVerified:y,displayName:s,isAnonymous:_,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:H,createdAt:u,lastLoginAt:d});return m&&Array.isArray(m)&&(R.providerData=m.map(p=>({...p}))),l&&(R._redirectEventId=l),R}static async _fromIdTokenResponse(e,n,s=!1){const r=new Mn;r.updateFromServerResponse(n);const i=new Ze({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await dr(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];B(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Hc(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),a=new Mn;a.updateFromIdToken(s);const l=new Ze({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new xi(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa=new Map;function Dt(t){Ht(t instanceof Function,"Expected a class definition");let e=Pa.get(t);return e?(Ht(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Pa.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}jc.type="NONE";const Ra=jc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(t,e,n){return`firebase:${t}:${e}:${n}`}class Ln{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=qs(this.userKey,r.apiKey,i),this.fullPersistenceKey=qs("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await ur(this.auth,{idToken:e}).catch(()=>{});return n?Ze._fromGetAccountInfoResponse(this.auth,n,e):null}return Ze._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Ln(Dt(Ra),e,s);const r=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=r[0]||Dt(Ra);const o=qs(s,e.config.apiKey,e.name);let a=null;for(const u of n)try{const d=await u._get(o);if(d){let f;if(typeof d=="string"){const y=await ur(e,{idToken:d}).catch(()=>{});if(!y)break;f=await Ze._fromGetAccountInfoResponse(e,y,d)}else f=Ze._fromJSON(e,d);u!==i&&(a=f),i=u;break}}catch{}const l=r.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Ln(i,e,s):(i=l[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Ln(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oa(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Wc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Jc(e))return"Blackberry";if(Yc(e))return"Webos";if(zc(e))return"Safari";if((e.includes("chrome/")||Kc(e))&&!e.includes("edge/"))return"Chrome";if(Gc(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Wc(t=Ue()){return/firefox\//i.test(t)}function zc(t=Ue()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Kc(t=Ue()){return/crios\//i.test(t)}function qc(t=Ue()){return/iemobile/i.test(t)}function Gc(t=Ue()){return/android/i.test(t)}function Jc(t=Ue()){return/blackberry/i.test(t)}function Yc(t=Ue()){return/webos/i.test(t)}function ao(t=Ue()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Jv(t=Ue()){var e;return ao(t)&&!!((e=window.navigator)!=null&&e.standalone)}function Yv(){return ay()&&document.documentMode===10}function Xc(t=Ue()){return ao(t)||Gc(t)||Yc(t)||Jc(t)||/windows phone/i.test(t)||qc(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(t,e=[]){let n;switch(t){case"Browser":n=Oa(Ue());break;case"Worker":n=`${Oa(Ue())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Rs}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const l=e(i);o(l)}catch(l){a(l)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qv(t,e={}){return at(t,"GET","/v2/passwordPolicy",St(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv=6;class e_{constructor(e){var s;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Zv,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Na(this),this.idTokenSubscription=new Na(this),this.beforeStateQueue=new Xv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Dc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Dt(n)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted&&(this.persistenceManager=await Ln.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ur(this,{idToken:e}),s=await Ze._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Qe(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await dr(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=$v()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(en(this));const n=e?ot(e):null;return n&&B(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(en(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(en(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Dt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Qv(this),n=new e_(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new An("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await Gv(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Dt(e)||this._popupRedirectResolver;B(n,this,"argument-error"),this.redirectPersistenceManager=await Ln.create(this,[Dt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,s,r);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Qc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var n;if(Qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&Ov(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Wt(t){return ot(t)}class Na{constructor(e){this.auth=e,this.observer=null,this.addObserver=hy(n=>this.observer=n)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ns={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function n_(t){Ns=t}function lo(t){return Ns.loadJS(t)}function s_(){return Ns.recaptchaV2Script}function r_(){return Ns.recaptchaEnterpriseScript}function i_(){return Ns.gapiScript}function Zc(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_=500,a_=6e4,Us=1e12;class l_{constructor(e){this.auth=e,this.counter=Us,this._widgets=new Map}render(e,n){const s=this.counter;return this._widgets.set(s,new d_(e,this.auth.name,n||{})),this.counter++,s}reset(e){var s;const n=e||Us;(s=this._widgets.get(n))==null||s.delete(),this._widgets.delete(n)}getResponse(e){var s;const n=e||Us;return((s=this._widgets.get(n))==null?void 0:s.getResponse())||""}async execute(e){var s;const n=e||Us;return(s=this._widgets.get(n))==null||s.execute(),""}}class c_{constructor(){this.enterprise=new u_}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class u_{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class d_{constructor(e,n,s){this.params=s,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const r=typeof e=="string"?document.getElementById(e):e;B(r,"argument-error",{appName:n}),this.container=r,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=f_(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},a_)},o_))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function f_(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let s=0;s<t;s++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}const h_="recaptcha-enterprise",fs="NO_RECAPTCHA";class eu{constructor(e){this.type=h_,this.auth=Wt(e)}async verify(e="verify",n=!1){async function s(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{Bc(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const u=new Vc(l);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(l=>{a(l)})})}function r(i,o,a){const l=window.grecaptcha;Aa(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(fs)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new c_().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{s(this.auth).then(a=>{if(!n&&Aa(window.grecaptcha))r(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=r_();l.length!==0&&(l+=a),lo(l).then(()=>{r(a,i,o)}).catch(u=>{o(u)})}}).catch(a=>{o(a)})})}}async function ri(t,e,n,s=!1,r=!1){const i=new eu(t);let o;if(r)o=fs;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const a={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const l=a.phoneEnrollmentInfo.phoneNumber,u=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const l=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return s?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ii(t,e,n,s,r){var i;if((i=t._getRecaptchaConfig())!=null&&i.isProviderEnabled("PHONE_PROVIDER")){const o=await ri(t,e,n);return s(t,o).catch(async a=>{var l;if(((l=t._getRecaptchaConfig())==null?void 0:l.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(a.code==="auth/missing-recaptcha-token"||a.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const u=await ri(t,e,n,!1,!0);return s(t,u)}return Promise.reject(a)})}else{const o=await ri(t,e,n,!1,!0);return s(t,o)}}async function p_(t){const e=Wt(t),n=await Bc(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),s=new Vc(n);e.tenantId==null?e._agentRecaptchaConfig=s:e._tenantRecaptchaConfigs[e.tenantId]=s,s.isAnyProviderEnabled()&&new eu(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(t,e){const n=jn(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(In(i,e??{}))return r;wt(r,"already-initialized")}return n.initialize({options:e})}function m_(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Dt);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function y_(t,e,n){const s=Wt(t);B(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=tu(e),{host:o,port:a}=v_(e),l=a===null?"":`:${a}`,u={url:`${i}//${o}${l}/`},d=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){B(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),B(In(u,s.config.emulator)&&In(d,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=u,s.emulatorConfig=d,s.settings.appVerificationDisabledForTesting=!0,eo(o)?by(`${i}//${o}${l}`):__()}function tu(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function v_(t){const e=tu(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:xa(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:xa(o)}}}function xa(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function __(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return $t("not implemented")}_getIdTokenResponse(e){return $t("not implemented")}_linkToIdToken(e,n){return $t("not implemented")}_getReauthenticationResolver(e){return $t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fn(t,e){return xr(t,"POST","/v1/accounts:signInWithIdp",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_="http://localhost";class Tn extends co{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Tn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):wt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new Tn(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Fn(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Fn(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Fn(e,n)}buildRequest(){const e={requestUri:b_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Hn(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $a(t,e){return at(t,"POST","/v1/accounts:sendVerificationCode",St(t,e))}async function w_(t,e){return xr(t,"POST","/v1/accounts:signInWithPhoneNumber",St(t,e))}async function I_(t,e){const n=await xr(t,"POST","/v1/accounts:signInWithPhoneNumber",St(t,e));if(n.temporaryProof)throw Zn(t,"account-exists-with-different-credential",n);return n}const T_={USER_NOT_FOUND:"user-not-found"};async function S_(t,e){const n={...e,operation:"REAUTH"};return xr(t,"POST","/v1/accounts:signInWithPhoneNumber",St(t,n),T_)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs extends co{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new hs({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new hs({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return w_(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return I_(e,{idToken:n,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return S_(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:s,verificationCode:r}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:s,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:s,phoneNumber:r,temporaryProof:i}=e;return!s&&!n&&!r&&!i?null:new hs({verificationId:n,verificationCode:s,phoneNumber:r,temporaryProof:i})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs extends uo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt extends xs{constructor(){super("facebook.com")}static credential(e){return Tn._fromParams({providerId:Jt.PROVIDER_ID,signInMethod:Jt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Jt.credentialFromTaggedObject(e)}static credentialFromError(e){return Jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Jt.credential(e.oauthAccessToken)}catch{return null}}}Jt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Jt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends xs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Tn._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return xt.credential(n,s)}catch{return null}}}xt.GOOGLE_SIGN_IN_METHOD="google.com";xt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt extends xs{constructor(){super("github.com")}static credential(e){return Tn._fromParams({providerId:Yt.PROVIDER_ID,signInMethod:Yt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Yt.credentialFromTaggedObject(e)}static credentialFromError(e){return Yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Yt.credential(e.oauthAccessToken)}catch{return null}}}Yt.GITHUB_SIGN_IN_METHOD="github.com";Yt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt extends xs{constructor(){super("twitter.com")}static credential(e,n){return Tn._fromParams({providerId:Xt.PROVIDER_ID,signInMethod:Xt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Xt.credentialFromTaggedObject(e)}static credentialFromError(e){return Xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Xt.credential(n,s)}catch{return null}}}Xt.TWITTER_SIGN_IN_METHOD="twitter.com";Xt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await Ze._fromIdTokenResponse(e,s,r),o=Da(s);return new Bn({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Da(s);return new Bn({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Da(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr extends Tt{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,fr.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new fr(e,n,s,r)}}function nu(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?fr._fromErrorAndOperation(t,i,e,s):i})}async function E_(t,e,n=!1){const s=await Ss(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Bn._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function C_(t,e,n=!1){const{auth:s}=t;if(Qe(s.app))return Promise.reject(en(s));const r="reauthenticate";try{const i=await Ss(t,nu(s,r,e,t),n);B(i.idToken,s,"internal-error");const o=oo(i.idToken);B(o,s,"internal-error");const{sub:a}=o;return B(t.uid===a,s,"user-mismatch"),Bn._forOperation(t,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&wt(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function su(t,e,n=!1){if(Qe(t.app))return Promise.reject(en(t));const s="signIn",r=await nu(t,s,e),i=await Bn._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function A_(t,e){return su(Wt(t),e)}function k_(t,e,n,s){return ot(t).onIdTokenChanged(e,n,s)}function P_(t,e,n){return ot(t).beforeAuthStateChanged(e,n)}function R_(t){return ot(t).signOut()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ma(t,e){return at(t,"POST","/v2/accounts/mfaEnrollment:start",St(t,e))}const hr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(hr,"1"),this.storage.removeItem(hr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_=1e3,N_=10;class iu extends ru{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Xc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);Yv()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,N_):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},O_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}iu.type="LOCAL";const x_=iu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou extends ru{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ou.type="SESSION";const au=ou;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $_(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new $r(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async u=>u(n.origin,i)),l=await $_(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}$r.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fo(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,l)=>{const u=fo("",20);r.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(f){const y=f;if(y.data.eventId===u)switch(y.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(y.data.response);break;default:clearTimeout(d),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(){return window}function M_(t){Te().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ho(){return typeof Te().WorkerGlobalScope<"u"&&typeof Te().importScripts=="function"}async function L_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function F_(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function U_(){return ho()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu="firebaseLocalStorageDb",V_=1,pr="firebaseLocalStorage",cu="fbase_key";class $s{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Dr(t,e){return t.transaction([pr],e?"readwrite":"readonly").objectStore(pr)}function B_(){const t=indexedDB.deleteDatabase(lu);return new $s(t).toPromise()}function $i(){const t=indexedDB.open(lu,V_);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(pr,{keyPath:cu})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(pr)?e(s):(s.close(),await B_(),e(await $i()))})})}async function La(t,e,n){const s=Dr(t,!0).put({[cu]:e,value:n});return new $s(s).toPromise()}async function H_(t,e){const n=Dr(t,!1).get(e),s=await new $s(n).toPromise();return s===void 0?null:s.value}function Fa(t,e){const n=Dr(t,!0).delete(e);return new $s(n).toPromise()}const j_=800,W_=3;class uu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $i(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>W_)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ho()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=$r._getInstance(U_()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,s;if(this.activeServiceWorker=await L_(),!this.activeServiceWorker)return;this.sender=new D_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||F_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $i();return await La(e,hr,"1"),await Fa(e,hr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>La(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>H_(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Fa(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=Dr(r,!1).getAll();return new $s(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),j_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}uu.type="LOCAL";const z_=uu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(t,e){return at(t,"POST","/v2/accounts/mfaSignIn:start",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi=Zc("rcb"),K_=new Os(3e4,6e4);class q_{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!((e=Te().grecaptcha)!=null&&e.render)}load(e,n=""){return B(G_(n),e,"argument-error"),this.shouldResolveImmediately(n)&&Ca(Te().grecaptcha)?Promise.resolve(Te().grecaptcha):new Promise((s,r)=>{const i=Te().setTimeout(()=>{r(Ve(e,"network-request-failed"))},K_.get());Te()[oi]=()=>{Te().clearTimeout(i),delete Te()[oi];const a=Te().grecaptcha;if(!a||!Ca(a)){r(Ve(e,"internal-error"));return}const l=a.render;a.render=(u,d)=>{const f=l(u,d);return this.counter++,f},this.hostLanguage=n,s(a)};const o=`${s_()}?${Hn({onload:oi,render:"explicit",hl:n})}`;lo(o).catch(()=>{clearTimeout(i),r(Ve(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!((n=Te().grecaptcha)!=null&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function G_(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class J_{async load(e){return new l_(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps="recaptcha",Y_={theme:"light",type:"image"};class X_{constructor(e,n,s={...Y_}){this.parameters=s,this.type=ps,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Wt(e),this.isInvisible=this.parameters.size==="invisible",B(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const r=typeof n=="string"?document.getElementById(n):n;B(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new J_:new q_,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),s=n.getResponse(e);return s||new Promise(r=>{const i=o=>{o&&(this.tokenChangeListeners.delete(i),r(o))};this.tokenChangeListeners.add(i),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){B(!this.parameters.sitekey,this.auth,"argument-error"),B(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),B(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(s=>s(n)),typeof e=="function")e(n);else if(typeof e=="string"){const s=Te()[e];typeof s=="function"&&s(n)}}}assertNotDestroyed(){B(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){B(Mc()&&!ho(),this.auth,"internal-error"),await Q_(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await Vv(this.auth);B(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return B(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Q_(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=hs._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function eb(t,e,n){if(Qe(t.app))return Promise.reject(en(t));const s=Wt(t),r=await tb(s,e,ot(n));return new Z_(r,i=>A_(s,i))}async function tb(t,e,n){var s;if(!t._getRecaptchaConfig())try{await p_(t)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const i=r.session;if("phoneNumber"in r){B(i.type==="enroll",t,"internal-error");const o={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await ii(t,o,"mfaSmsEnrollment",async(d,f)=>{if(f.phoneEnrollmentInfo.captchaResponse===fs){B((n==null?void 0:n.type)===ps,d,"argument-error");const y=await ai(d,f,n);return Ma(d,y)}return Ma(d,f)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneSessionInfo.sessionInfo}else{B(i.type==="signin",t,"internal-error");const o=((s=r.multiFactorHint)==null?void 0:s.uid)||r.multiFactorUid;B(o,t,"missing-multi-factor-info");const a={mfaPendingCredential:i.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await ii(t,a,"mfaSmsSignIn",async(f,y)=>{if(y.phoneSignInInfo.captchaResponse===fs){B((n==null?void 0:n.type)===ps,f,"argument-error");const _=await ai(f,y,n);return Ua(f,_)}return Ua(f,y)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneResponseInfo.sessionInfo}}else{const i={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await ii(t,i,"sendVerificationCode",async(u,d)=>{if(d.captchaResponse===fs){B((n==null?void 0:n.type)===ps,u,"argument-error");const f=await ai(u,d,n);return $a(u,f)}return $a(u,d)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).sessionInfo}}finally{n==null||n._reset()}}async function ai(t,e,n){B(n.type===ps,t,"argument-error");const s=await n.verify();B(typeof s=="string",t,"argument-error");const r={...e};if("phoneEnrollmentInfo"in r){const i=r.phoneEnrollmentInfo.phoneNumber,o=r.phoneEnrollmentInfo.captchaResponse,a=r.phoneEnrollmentInfo.clientType,l=r.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(r,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:s,captchaResponse:o,clientType:a,recaptchaVersion:l}}),r}else if("phoneSignInInfo"in r){const i=r.phoneSignInInfo.captchaResponse,o=r.phoneSignInInfo.clientType,a=r.phoneSignInInfo.recaptchaVersion;return Object.assign(r,{phoneSignInInfo:{recaptchaToken:s,captchaResponse:i,clientType:o,recaptchaVersion:a}}),r}else return Object.assign(r,{recaptchaToken:s}),r}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(t,e){return e?Dt(e):(B(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po extends co{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Fn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Fn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Fn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function nb(t){return su(t.auth,new po(t),t.bypassAuthState)}function sb(t){const{auth:e,user:n}=t;return B(n,e,"internal-error"),C_(n,new po(t),t.bypassAuthState)}async function rb(t){const{auth:e,user:n}=t;return B(n,e,"internal-error"),E_(n,new po(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return nb;case"linkViaPopup":case"linkViaRedirect":return rb;case"reauthViaPopup":case"reauthViaRedirect":return sb;default:wt(this.auth,"internal-error")}}resolve(e){Ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ib=new Os(2e3,1e4);async function ob(t,e,n){if(Qe(t.app))return Promise.reject(Ve(t,"operation-not-supported-in-this-environment"));const s=Wt(t);Nv(t,e,uo);const r=du(s,n);return new vn(s,"signInViaPopup",e,r).executeNotNull()}class vn extends fu{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,vn.currentPopupAction&&vn.currentPopupAction.cancel(),vn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return B(e,this.auth,"internal-error"),e}async onExecution(){Ht(this.filter.length===1,"Popup operations only handle one event");const e=fo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ve(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ve(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,vn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if((s=(n=this.authWindow)==null?void 0:n.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ve(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ib.get())};e()}}vn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab="pendingRedirect",Gs=new Map;class lb extends fu{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Gs.get(this.auth._key());if(!e){try{const s=await cb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Gs.set(this.auth._key(),e)}return this.bypassAuthState||Gs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function cb(t,e){const n=fb(e),s=db(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function ub(t,e){Gs.set(t._key(),e)}function db(t){return Dt(t._redirectPersistence)}function fb(t){return qs(ab,t.config.apiKey,t.name)}async function hb(t,e,n=!1){if(Qe(t.app))return Promise.reject(en(t));const s=Wt(t),r=du(s,e),o=await new lb(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb=600*1e3;class gb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!mb(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!hu(e)){const r=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";n.onError(Ve(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=pb&&this.cachedEventUids.clear(),this.cachedEventUids.has(Va(e))}saveEventToCache(e){this.cachedEventUids.add(Va(e)),this.lastProcessedEventTime=Date.now()}}function Va(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function hu({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function mb(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hu(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yb(t,e={}){return at(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_b=/^https?/;async function bb(t){if(t.config.emulator)return;const{authorizedDomains:e}=await yb(t);for(const n of e)try{if(wb(n))return}catch{}wt(t,"unauthorized-domain")}function wb(t){const e=Ni(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!_b.test(n))return!1;if(vb.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ib=new Os(3e4,6e4);function Ba(){const t=Te().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Tb(t){return new Promise((e,n)=>{var r,i,o;function s(){Ba(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ba(),n(Ve(t,"network-request-failed"))},timeout:Ib.get()})}if((i=(r=Te().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=Te().gapi)!=null&&o.load)s();else{const a=Zc("iframefcb");return Te()[a]=()=>{gapi.load?s():n(Ve(t,"network-request-failed"))},lo(`${i_()}?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw Js=null,e})}let Js=null;function Sb(t){return Js=Js||Tb(t),Js}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eb=new Os(5e3,15e3),Cb="__/auth/iframe",Ab="emulator/auth/iframe",kb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Pb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Rb(t){const e=t.config;B(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?io(e,Ab):`https://${t.config.authDomain}/${Cb}`,s={apiKey:e.apiKey,appName:t.name,v:Rs},r=Pb.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Hn(s).slice(1)}`}async function Ob(t){const e=await Sb(t),n=Te().gapi;return B(n,t,"internal-error"),e.open({where:document.body,url:Rb(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:kb,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=Ve(t,"network-request-failed"),a=Te().setTimeout(()=>{i(o)},Eb.get());function l(){Te().clearTimeout(a),r(s)}s.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},xb=500,$b=600,Db="_blank",Mb="http://localhost";class Ha{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Lb(t,e,n,s=xb,r=$b){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const l={...Nb,width:s.toString(),height:r.toString(),top:i,left:o},u=Ue().toLowerCase();n&&(a=Kc(u)?Db:n),Wc(u)&&(e=e||Mb,l.scrollbars="yes");const d=Object.entries(l).reduce((y,[_,m])=>`${y}${_}=${m},`,"");if(Jv(u)&&a!=="_self")return Fb(e||"",a),new Ha(null);const f=window.open(e||"",a,d);B(f,t,"popup-blocked");try{f.focus()}catch{}return new Ha(f)}function Fb(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ub="__/auth/handler",Vb="emulator/auth/handler",Bb=encodeURIComponent("fac");async function ja(t,e,n,s,r,i){B(t.config.authDomain,t,"auth-domain-config-required"),B(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Rs,eventId:r};if(e instanceof uo){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",fy(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,f]of Object.entries({}))o[d]=f}if(e instanceof xs){const d=e.getScopes().filter(f=>f!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await t._getAppCheckToken(),u=l?`#${Bb}=${encodeURIComponent(l)}`:"";return`${Hb(t)}?${Hn(a).slice(1)}${u}`}function Hb({config:t}){return t.emulator?io(t,Vb):`https://${t.authDomain}/${Ub}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li="webStorageSupport";class jb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=au,this._completeRedirectFn=hb,this._overrideRedirectResult=ub}async _openPopup(e,n,s,r){var o;Ht((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await ja(e,n,s,Ni(),r);return Lb(e,i,fo())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await ja(e,n,s,Ni(),r);return M_(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Ht(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await Ob(e),s=new gb(e);return n.register("authEvent",r=>(B(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(li,{type:li},r=>{var o;const i=(o=r==null?void 0:r[0])==null?void 0:o[li];i!==void 0&&n(!!i),wt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=bb(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Xc()||zc()||ao()}}const Wb=jb;var Wa="@firebase/auth",za="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kb(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function qb(t){Bt(new bt("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;B(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Qc(t)},u=new t_(s,r,i,l);return m_(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Bt(new bt("auth-internal",e=>{const n=Wt(e.getProvider("auth").getImmediate());return(s=>new zb(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),_t(Wa,za,Kb(t)),_t(Wa,za,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gb=300,Jb=Tc("authIdTokenMaxAge")||Gb;let Ka=null;const Yb=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>Jb)return;const r=n==null?void 0:n.token;Ka!==r&&(Ka=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Xb(t=Oc()){const e=jn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=g_(t,{popupRedirectResolver:Wb,persistence:[z_,x_,au]}),s=Tc("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=Yb(i.toString());P_(n,o,()=>o(n.currentUser)),k_(n,a=>o(a))}}const r=ny("auth");return r&&y_(n,`http://${r}`),n}function Qb(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}n_({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=Ve("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",Qb().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});qb("Browser");const pu="@firebase/installations",go="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu=1e4,mu=`w:${go}`,yu="FIS_v2",Zb="https://firebaseinstallations.googleapis.com/v1",ew=3600*1e3,tw="installations",nw="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sw={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Sn=new An(tw,nw,sw);function vu(t){return t instanceof Tt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _u({projectId:t}){return`${Zb}/projects/${t}/installations`}function bu(t){return{token:t.token,requestStatus:2,expiresIn:iw(t.expiresIn),creationTime:Date.now()}}async function wu(t,e){const s=(await e.json()).error;return Sn.create("request-failed",{requestName:t,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function Iu({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function rw(t,{refreshToken:e}){const n=Iu(t);return n.append("Authorization",ow(e)),n}async function Tu(t){const e=await t();return e.status>=500&&e.status<600?t():e}function iw(t){return Number(t.replace("s","000"))}function ow(t){return`${yu} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aw({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const s=_u(t),r=Iu(t),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&r.append("x-firebase-client",u)}const o={fid:n,authVersion:yu,appId:t.appId,sdkVersion:mu},a={method:"POST",headers:r,body:JSON.stringify(o)},l=await Tu(()=>fetch(s,a));if(l.ok){const u=await l.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:bu(u.authToken)}}else throw await wu("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Su(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lw(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cw=/^[cdef][\w-]{21}$/,Di="";function uw(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=dw(t);return cw.test(n)?n:Di}catch{return Di}}function dw(t){return lw(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mr(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eu=new Map;function Cu(t,e){const n=Mr(t);Au(n,e),fw(n,e)}function Au(t,e){const n=Eu.get(t);if(n)for(const s of n)s(e)}function fw(t,e){const n=hw();n&&n.postMessage({key:t,fid:e}),pw()}let _n=null;function hw(){return!_n&&"BroadcastChannel"in self&&(_n=new BroadcastChannel("[Firebase] FID Change"),_n.onmessage=t=>{Au(t.data.key,t.data.fid)}),_n}function pw(){Eu.size===0&&_n&&(_n.close(),_n=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gw="firebase-installations-database",mw=1,En="firebase-installations-store";let ci=null;function mo(){return ci||(ci=Pc(gw,mw,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(En)}}})),ci}async function gr(t,e){const n=Mr(t),r=(await mo()).transaction(En,"readwrite"),i=r.objectStore(En),o=await i.get(n);return await i.put(e,n),await r.done,(!o||o.fid!==e.fid)&&Cu(t,e.fid),e}async function ku(t){const e=Mr(t),s=(await mo()).transaction(En,"readwrite");await s.objectStore(En).delete(e),await s.done}async function Lr(t,e){const n=Mr(t),r=(await mo()).transaction(En,"readwrite"),i=r.objectStore(En),o=await i.get(n),a=e(o);return a===void 0?await i.delete(n):await i.put(a,n),await r.done,a&&(!o||o.fid!==a.fid)&&Cu(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yo(t){let e;const n=await Lr(t.appConfig,s=>{const r=yw(s),i=vw(t,r);return e=i.registrationPromise,i.installationEntry});return n.fid===Di?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function yw(t){const e=t||{fid:uw(),registrationStatus:0};return Pu(e)}function vw(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(Sn.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=_w(t,n);return{installationEntry:n,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:bw(t)}:{installationEntry:e}}async function _w(t,e){try{const n=await aw(t,e);return gr(t.appConfig,n)}catch(n){throw vu(n)&&n.customData.serverCode===409?await ku(t.appConfig):await gr(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function bw(t){let e=await qa(t.appConfig);for(;e.registrationStatus===1;)await Su(100),e=await qa(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:s}=await yo(t);return s||n}return e}function qa(t){return Lr(t,e=>{if(!e)throw Sn.create("installation-not-found");return Pu(e)})}function Pu(t){return ww(t)?{fid:t.fid,registrationStatus:0}:t}function ww(t){return t.registrationStatus===1&&t.registrationTime+gu<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iw({appConfig:t,heartbeatServiceProvider:e},n){const s=Tw(t,n),r=rw(t,n),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&r.append("x-firebase-client",u)}const o={installation:{sdkVersion:mu,appId:t.appId}},a={method:"POST",headers:r,body:JSON.stringify(o)},l=await Tu(()=>fetch(s,a));if(l.ok){const u=await l.json();return bu(u)}else throw await wu("Generate Auth Token",l)}function Tw(t,{fid:e}){return`${_u(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vo(t,e=!1){let n;const s=await Lr(t.appConfig,i=>{if(!Ru(i))throw Sn.create("not-registered");const o=i.authToken;if(!e&&Cw(o))return i;if(o.requestStatus===1)return n=Sw(t,e),i;{if(!navigator.onLine)throw Sn.create("app-offline");const a=kw(i);return n=Ew(t,a),a}});return n?await n:s.authToken}async function Sw(t,e){let n=await Ga(t.appConfig);for(;n.authToken.requestStatus===1;)await Su(100),n=await Ga(t.appConfig);const s=n.authToken;return s.requestStatus===0?vo(t,e):s}function Ga(t){return Lr(t,e=>{if(!Ru(e))throw Sn.create("not-registered");const n=e.authToken;return Pw(n)?{...e,authToken:{requestStatus:0}}:e})}async function Ew(t,e){try{const n=await Iw(t,e),s={...e,authToken:n};return await gr(t.appConfig,s),n}catch(n){if(vu(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ku(t.appConfig);else{const s={...e,authToken:{requestStatus:0}};await gr(t.appConfig,s)}throw n}}function Ru(t){return t!==void 0&&t.registrationStatus===2}function Cw(t){return t.requestStatus===2&&!Aw(t)}function Aw(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+ew}function kw(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function Pw(t){return t.requestStatus===1&&t.requestTime+gu<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rw(t){const e=t,{installationEntry:n,registrationPromise:s}=await yo(e);return s?s.catch(console.error):vo(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ow(t,e=!1){const n=t;return await Nw(n),(await vo(n,e)).token}async function Nw(t){const{registrationPromise:e}=await yo(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xw(t){if(!t||!t.options)throw ui("App Configuration");if(!t.name)throw ui("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw ui(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function ui(t){return Sn.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou="installations",$w="installations-internal",Dw=t=>{const e=t.getProvider("app").getImmediate(),n=xw(e),s=jn(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},Mw=t=>{const e=t.getProvider("app").getImmediate(),n=jn(e,Ou).getImmediate();return{getId:()=>Rw(n),getToken:r=>Ow(n,r)}};function Lw(){Bt(new bt(Ou,Dw,"PUBLIC")),Bt(new bt($w,Mw,"PRIVATE"))}Lw();_t(pu,go);_t(pu,go,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr="analytics",Fw="firebase_id",Uw="origin",Vw=60*1e3,Bw="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",_o="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe=new to("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ke=new An("analytics","Analytics",Hw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jw(t){if(!t.startsWith(_o)){const e=Ke.create("invalid-gtag-resource",{gtagURL:t});return Fe.warn(e.message),""}return t}function Nu(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Ww(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function zw(t,e){const n=Ww("firebase-js-sdk-policy",{createScriptURL:jw}),s=document.createElement("script"),r=`${_o}?l=${t}&id=${e}`;s.src=n?n==null?void 0:n.createScriptURL(r):r,s.async=!0,document.head.appendChild(s)}function Kw(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function qw(t,e,n,s,r,i){const o=s[r];try{if(o)await e[o];else{const l=(await Nu(n)).find(u=>u.measurementId===r);l&&await e[l.appId]}}catch(a){Fe.error(a)}t("config",r,i)}async function Gw(t,e,n,s,r){try{let i=[];if(r&&r.send_to){let o=r.send_to;Array.isArray(o)||(o=[o]);const a=await Nu(n);for(const l of o){const u=a.find(f=>f.measurementId===l),d=u&&e[u.appId];if(d)i.push(d);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",s,r||{})}catch(i){Fe.error(i)}}function Jw(t,e,n,s){async function r(i,...o){try{if(i==="event"){const[a,l]=o;await Gw(t,e,n,a,l)}else if(i==="config"){const[a,l]=o;await qw(t,e,n,s,a,l)}else if(i==="consent"){const[a,l]=o;t("consent",a,l)}else if(i==="get"){const[a,l,u]=o;t("get",a,l,u)}else if(i==="set"){const[a]=o;t("set",a)}else t(i,...o)}catch(a){Fe.error(a)}}return r}function Yw(t,e,n,s,r){let i=function(...o){window[s].push(arguments)};return window[r]&&typeof window[r]=="function"&&(i=window[r]),window[r]=Jw(i,t,e,n),{gtagCore:i,wrappedGtag:window[r]}}function Xw(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(_o)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qw=30,Zw=1e3;class eI{constructor(e={},n=Zw){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const xu=new eI;function tI(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function nI(t){var o;const{appId:e,apiKey:n}=t,s={method:"GET",headers:tI(n)},r=Bw.replace("{app-id}",e),i=await fetch(r,s);if(i.status!==200&&i.status!==304){let a="";try{const l=await i.json();(o=l.error)!=null&&o.message&&(a=l.error.message)}catch{}throw Ke.create("config-fetch-failed",{httpStatus:i.status,responseMessage:a})}return i.json()}async function sI(t,e=xu,n){const{appId:s,apiKey:r,measurementId:i}=t.options;if(!s)throw Ke.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:s};throw Ke.create("no-api-key")}const o=e.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new oI;return setTimeout(async()=>{a.abort()},Vw),$u({appId:s,apiKey:r,measurementId:i},o,a,e)}async function $u(t,{throttleEndTimeMillis:e,backoffCount:n},s,r=xu){var a;const{appId:i,measurementId:o}=t;try{await rI(s,e)}catch(l){if(o)return Fe.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:i,measurementId:o};throw l}try{const l=await nI(t);return r.deleteThrottleMetadata(i),l}catch(l){const u=l;if(!iI(u)){if(r.deleteThrottleMetadata(i),o)return Fe.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:i,measurementId:o};throw l}const d=Number((a=u==null?void 0:u.customData)==null?void 0:a.httpStatus)===503?ma(n,r.intervalMillis,Qw):ma(n,r.intervalMillis),f={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return r.setThrottleMetadata(i,f),Fe.debug(`Calling attemptFetch again in ${d} millis`),$u(t,f,s,r)}}function rI(t,e){return new Promise((n,s)=>{const r=Math.max(e-Date.now(),0),i=setTimeout(n,r);t.addEventListener(()=>{clearTimeout(i),s(Ke.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function iI(t){if(!(t instanceof Tt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class oI{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function aI(t,e,n,s,r){if(r&&r.global){t("event",n,s);return}else{const i=await e,o={...s,send_to:i};t("event",n,o)}}async function lI(t,e,n,s){if(s&&s.global){const r={};for(const i of Object.keys(n))r[`user_properties.${i}`]=n[i];return t("set",r),Promise.resolve()}else{const r=await e;t("config",r,{update:!0,user_properties:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cI(){if(Ec())try{await Cc()}catch(t){return Fe.warn(Ke.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Fe.warn(Ke.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function uI(t,e,n,s,r,i,o){const a=sI(t);a.then(y=>{n[y.measurementId]=y.appId,t.options.measurementId&&y.measurementId!==t.options.measurementId&&Fe.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${y.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(y=>Fe.error(y)),e.push(a);const l=cI().then(y=>{if(y)return s.getId()}),[u,d]=await Promise.all([a,l]);Xw(i)||zw(i,u.measurementId),r("js",new Date);const f=(o==null?void 0:o.config)??{};return f[Uw]="firebase",f.update=!0,d!=null&&(f[Fw]=d),r("config",u.measurementId,f),u.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(e){this.app=e}_delete(){return delete Un[this.app.options.appId],Promise.resolve()}}let Un={},Ja=[];const Ya={};let di="dataLayer",fI="gtag",Xa,bo,Qa=!1;function hI(){const t=[];if(Sc()&&t.push("This is a browser extension environment."),ly()||t.push("Cookies are not available."),t.length>0){const e=t.map((s,r)=>`(${r+1}) ${s}`).join(" "),n=Ke.create("invalid-analytics-context",{errorInfo:e});Fe.warn(n.message)}}function pI(t,e,n){hI();const s=t.options.appId;if(!s)throw Ke.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Fe.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ke.create("no-api-key");if(Un[s]!=null)throw Ke.create("already-exists",{id:s});if(!Qa){Kw(di);const{wrappedGtag:i,gtagCore:o}=Yw(Un,Ja,Ya,di,fI);bo=i,Xa=o,Qa=!0}return Un[s]=uI(t,Ja,Ya,e,Xa,di,n),new dI(t)}function gI(t=Oc()){t=ot(t);const e=jn(t,mr);return e.isInitialized()?e.getImmediate():mI(t)}function mI(t,e={}){const n=jn(t,mr);if(n.isInitialized()){const r=n.getImmediate();if(In(e,n.getOptions()))return r;throw Ke.create("already-initialized")}return n.initialize({options:e})}function yI(t,e,n){t=ot(t),lI(bo,Un[t.app.options.appId],e,n).catch(s=>Fe.error(s))}function vI(t,e,n,s){t=ot(t),aI(bo,Un[t.app.options.appId],e,n,s).catch(r=>Fe.error(r))}const Za="@firebase/analytics",el="0.10.21";function _I(){Bt(new bt(mr,(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return pI(s,r,n)},"PUBLIC")),Bt(new bt("analytics-internal",t,"PRIVATE")),_t(Za,el),_t(Za,el,"esm2020");function t(e){try{const n=e.getProvider(mr).getImmediate();return{logEvent:(s,r,i)=>vI(n,s,r,i),setUserProperties:(s,r)=>yI(n,s,r)}}catch(n){throw Ke.create("interop-component-reg-failed",{reason:n})}}}_I();const bI={apiKey:"AIzaSyAWQCJvSAiBir_kQfEe4llV70m616Q7tqk",authDomain:"snaptales-d85f3.firebaseapp.com",projectId:"snaptales-d85f3",storageBucket:"snaptales-d85f3.firebasestorage.app",messagingSenderId:"558471624651",appId:"1:558471624651:web:e68fd7984f9622a690284e",measurementId:"G-B7ENYSFREZ"},Du=Rc(bI),Vs=Xb(Du);gI(Du);let dn=null;const Bs={async signInWithGoogle(){const t=new xt,e=await ob(Vs,t),{displayName:n,email:s,phoneNumber:r}=e.user;return{name:n,email:s,phone:r}},setupRecaptcha(t){return dn&&(dn.clear(),dn=null),dn=new X_(Vs,t,{size:"invisible"}),dn},async sendOTP(t){if(!dn)throw new Error("Recaptcha not initialised");return eb(Vs,t,dn)},async verifyOTP(t,e){const n=await t.confirm(e),{displayName:s,email:r,phoneNumber:i}=n.user;return{name:s,email:r,phone:i}},signOut(){return R_(Vs)}},wI={class:"modal-card"},II={class:"modal-seg"},TI={key:"signin",class:"modal-body"},SI=["disabled"],EI={class:"field-group"},CI={class:"field-wrap"},AI=["disabled"],kI={key:0,class:"material-icons-round rotating"},PI={key:1,class:"material-icons-round"},RI={class:"otp-sent-msg"},OI={class:"field-group"},NI={class:"field-wrap"},xI=["disabled"],$I={key:0,class:"material-icons-round rotating"},DI={key:1,class:"material-icons-round"},MI={key:"signup",class:"modal-body"},LI=["disabled"],FI={class:"field-group"},UI={class:"field-wrap"},VI={class:"field-group"},BI={class:"field-wrap"},HI={class:"field-group"},jI={class:"field-wrap"},WI=["disabled"],zI={key:0,class:"material-icons-round rotating"},KI={key:1,class:"material-icons-round"},qI=it({__name:"SignInModal",setup(t){const e=It(),n=Q("signin"),s=Q("right"),r=Q(!1),i=Q(""),o=Q(""),a=Q("phone"),l=Q(null),u=Cn({name:"",email:"",phone:""});nt(()=>e.signInOpen,R=>{R&&d()});function d(){i.value="",o.value="",a.value="phone",l.value=null,u.name="",u.email="",u.phone=""}function f(R){s.value=R==="signup"?"right":"left",n.value=R}async function y(R){const p={};R.name&&(p.name=R.name),R.email&&(p.email=R.email),R.phone&&(p.phone=R.phone);const $=await us.findOrCreate(p);e.setUser($),e.closeSignIn(),e.showToast(`Welcome${$.name?", "+$.name:""}!`)}async function _(){r.value=!0;try{const R=await Bs.signInWithGoogle();await y(R)}catch(R){(R instanceof Error?R.message:"").includes("popup-closed")||e.showToast("Google sign-in failed. Try again.")}finally{r.value=!1}}async function m(){const R=i.value.trim();if(!R){e.showToast("Enter your phone number");return}r.value=!0;try{Bs.setupRecaptcha("recaptcha-container"),l.value=await Bs.sendOTP(R),a.value="otp"}catch{e.showToast("Failed to send OTP. Check number and try again.")}finally{r.value=!1}}async function w(){if(!(!o.value||!l.value)){r.value=!0;try{const R=await Bs.verifyOTP(l.value,o.value.trim());await y(R)}catch{e.showToast("Invalid OTP. Please try again.")}finally{r.value=!1}}}async function H(){if(!u.email&&!u.phone){e.showToast("Email or phone is required");return}r.value=!0;try{await y(u)}catch{e.showToast("Something went wrong. Please try again.")}finally{r.value=!1}}return(R,p)=>(T(),Ye(Ll,{to:"body"},[Se(ir,{name:"modal"},{default:vs(()=>[v(e).signInOpen?(T(),k("div",{key:0,class:"modal-backdrop",onClick:p[9]||(p[9]=yt($=>v(e).closeSignIn(),["self"]))},[c("div",wI,[p[31]||(p[31]=c("div",{class:"modal-handle"},null,-1)),c("button",{class:"modal-close-btn",onClick:p[0]||(p[0]=$=>v(e).closeSignIn()),"aria-label":"Close"},[...p[10]||(p[10]=[c("span",{class:"material-icons-round"},"close",-1)])]),p[32]||(p[32]=c("div",{class:"modal-head"},[c("div",{class:"modal-logo"},[c("span",{class:"material-icons-round"},"crop_original")]),c("div",{class:"modal-title"},"Welcome to SnapTales"),c("div",{class:"modal-sub"},"Sign in or create your account")],-1)),c("div",II,[c("button",{class:J(["seg-btn",{active:n.value==="signin"}]),onClick:p[1]||(p[1]=$=>f("signin"))},[...p[11]||(p[11]=[c("span",{class:"material-icons-round"},"login",-1),me("Sign In ",-1)])],2),c("button",{class:J(["seg-btn",{active:n.value==="signup"}]),onClick:p[2]||(p[2]=$=>f("signup"))},[...p[12]||(p[12]=[c("span",{class:"material-icons-round"},"person_add",-1),me("Sign Up ",-1)])],2)]),Se(ir,{name:s.value==="right"?"tab-slide-right":"tab-slide-left",mode:"out-in"},{default:vs(()=>[n.value==="signin"?(T(),k("div",TI,[c("button",{class:"google-btn",disabled:r.value,onClick:_},[...p[13]||(p[13]=[c("svg",{class:"google-icon",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[c("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),c("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),c("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z",fill:"#FBBC05"}),c("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})],-1),me(" Continue with Google ",-1)])],8,SI),p[21]||(p[21]=c("div",{class:"divider"},[c("span",null,"or")],-1)),a.value==="phone"?(T(),k(re,{key:0},[c("div",EI,[p[15]||(p[15]=c("label",{class:"field-label"},"Phone Number",-1)),c("div",CI,[p[14]||(p[14]=c("span",{class:"material-icons-round field-icon"},"phone_android",-1)),ye(c("input",{class:"field-input","onUpdate:modelValue":p[3]||(p[3]=$=>i.value=$),placeholder:"+91 9876543210",type:"tel",autofocus:"",onKeyup:yn(m,["enter"])},null,544),[[Ee,i.value]])]),p[16]||(p[16]=c("p",{class:"field-hint"},"Enter number with country code, e.g. +91…",-1))]),c("button",{class:"md-action-btn",disabled:r.value,onClick:m},[r.value?(T(),k("span",kI,"sync")):(T(),k("span",PI,"sms")),c("span",null,M(r.value?"Sending OTP…":"Send OTP"),1)],8,AI)],64)):(T(),k(re,{key:1},[c("p",RI,[p[17]||(p[17]=c("span",{class:"material-icons-round",style:{"font-size":"16px","vertical-align":"middle"}},"check_circle",-1)),p[18]||(p[18]=me(" OTP sent to ",-1)),c("strong",null,M(i.value),1),c("button",{class:"link-btn",onClick:p[4]||(p[4]=$=>a.value="phone")},"Change")]),c("div",OI,[p[20]||(p[20]=c("label",{class:"field-label"},"Enter OTP",-1)),c("div",NI,[p[19]||(p[19]=c("span",{class:"material-icons-round field-icon"},"pin",-1)),ye(c("input",{class:"field-input otp-input","onUpdate:modelValue":p[5]||(p[5]=$=>o.value=$),placeholder:"6-digit code",type:"number",maxlength:"6",autofocus:"",onKeyup:yn(w,["enter"])},null,544),[[Ee,o.value]])])]),c("button",{class:"md-action-btn",disabled:r.value,onClick:w},[r.value?(T(),k("span",$I,"sync")):(T(),k("span",DI,"verified")),c("span",null,M(r.value?"Verifying…":"Verify OTP"),1)],8,xI)],64)),p[22]||(p[22]=c("div",{id:"recaptcha-container"},null,-1))])):(T(),k("div",MI,[c("button",{class:"google-btn",disabled:r.value,onClick:_},[...p[23]||(p[23]=[c("svg",{class:"google-icon",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[c("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),c("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),c("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z",fill:"#FBBC05"}),c("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})],-1),me(" Continue with Google ",-1)])],8,LI),p[30]||(p[30]=c("div",{class:"divider"},[c("span",null,"or")],-1)),c("div",FI,[p[25]||(p[25]=c("label",{class:"field-label"},[me("Full Name "),c("span",{class:"field-optional"},"optional")],-1)),c("div",UI,[p[24]||(p[24]=c("span",{class:"material-icons-round field-icon"},"person",-1)),ye(c("input",{class:"field-input","onUpdate:modelValue":p[6]||(p[6]=$=>u.name=$),placeholder:"Your name",onKeyup:yn(H,["enter"])},null,544),[[Ee,u.name]])])]),c("div",VI,[p[27]||(p[27]=c("label",{class:"field-label"},"Email",-1)),c("div",BI,[p[26]||(p[26]=c("span",{class:"material-icons-round field-icon"},"email",-1)),ye(c("input",{class:"field-input","onUpdate:modelValue":p[7]||(p[7]=$=>u.email=$),placeholder:"you@email.com",type:"email",onKeyup:yn(H,["enter"])},null,544),[[Ee,u.email]])])]),c("div",HI,[p[29]||(p[29]=c("label",{class:"field-label"},"Phone",-1)),c("div",jI,[p[28]||(p[28]=c("span",{class:"material-icons-round field-icon"},"phone_android",-1)),ye(c("input",{class:"field-input","onUpdate:modelValue":p[8]||(p[8]=$=>u.phone=$),placeholder:"+91 9876543210",type:"tel",onKeyup:yn(H,["enter"])},null,544),[[Ee,u.phone]])])]),c("button",{class:"md-action-btn",disabled:r.value,onClick:H},[r.value?(T(),k("span",zI,"sync")):(T(),k("span",KI,"how_to_reg")),c("span",null,M(r.value?"Creating account…":"Create Account"),1)],8,WI)]))]),_:1},8,["name"])])])):ge("",!0)]),_:1})]))}}),GI=(t,e)=>{const n=t.__vccOpts||t;for(const[s,r]of e)n[s]=r;return n},JI=GI(qI,[["__scopeId","data-v-5d41ac55"]]),YI={class:"app-header"},XI={class:"hdr-search"},QI={class:"hdr-actions"},ZI=["title"],e1={key:0,class:"hdr-avatar"},t1={key:1,class:"material-icons-round"},n1={class:"sidebar"},s1={class:"sb-avatar"},r1={class:"sb-user-info"},i1={class:"sb-user-name"},o1={class:"sb-user-sub"},a1={class:"tab-bar"},l1={class:"bsheet-body"},c1=it({__name:"App",setup(t){const e=It(),n=Q(!1),s=()=>{n.value=window.scrollY>10};return Ki(()=>{window.addEventListener("scroll",s)}),qi(()=>{window.removeEventListener("scroll",s)}),(r,i)=>{var o,a;return T(),k(re,null,[c("header",YI,[c("div",{class:"header-logo",onClick:i[0]||(i[0]=l=>v(e).nav("shop"))},[...i[21]||(i[21]=[c("div",{class:"logo-icon"},[c("span",{class:"material-icons-round"},"photo_frame")],-1),c("span",null,"SnapTales",-1)])]),c("div",XI,[i[22]||(i[22]=c("span",{class:"material-icons-round"},"search",-1)),c("input",{type:"text",placeholder:"Search frames, styles, sizes...",onInput:i[1]||(i[1]=l=>v(e).handleSearch(l.target.value))},null,32)]),c("div",QI,[c("button",{class:"icon-btn",onClick:i[2]||(i[2]=l=>v(e).nav("notifications")),title:"Notifications"},[...i[23]||(i[23]=[c("span",{class:"material-icons-round"},"notifications_none",-1),c("span",{class:"badge"},"3",-1)])]),c("button",{class:"icon-btn",onClick:i[3]||(i[3]=l=>v(e).nav("cart")),title:"Cart"},[i[24]||(i[24]=c("span",{class:"material-icons-round"},"shopping_bag",-1)),c("span",{class:J(["badge cart-badge",{hidden:v(e).totalQty===0}])},M(v(e).totalQty),3)]),c("button",{class:"icon-btn",onClick:i[4]||(i[4]=l=>v(e).cycleTheme()),title:"Change Theme"},[...i[25]||(i[25]=[c("span",{class:"material-icons-round"},"palette",-1)])]),c("button",{class:J(["icon-btn",{"icon-btn--authed":v(e).currentUser}]),title:v(e).currentUser?"My Profile":"Sign In",onClick:i[5]||(i[5]=l=>v(e).currentUser?v(e).nav("profile"):v(e).openSignIn())},[v(e).currentUser?(T(),k("span",e1,M(((o=v(e).currentUser.name)==null?void 0:o.charAt(0).toUpperCase())??"?"),1)):(T(),k("span",t1,"person_outline"))],10,ZI)])]),c("nav",n1,[i[35]||(i[35]=c("div",{class:"sidebar-brand"},[c("div",{class:"logo-icon"},[c("span",{class:"material-icons-round"},"photo_frame")]),c("span",null,"SnapTales")],-1)),i[36]||(i[36]=c("div",{class:"sidebar-label"},"Shop",-1)),c("div",{class:J(["sidebar-item",{active:v(e).currentPage==="shop"}]),onClick:i[6]||(i[6]=l=>v(e).nav("shop"))},[...i[26]||(i[26]=[c("span",{class:"material-icons-round"},"storefront",-1),c("span",null,"Explore",-1)])],2),c("div",{class:J(["sidebar-item",{active:v(e).currentPage==="categories"}]),onClick:i[7]||(i[7]=l=>v(e).nav("categories"))},[...i[27]||(i[27]=[c("span",{class:"material-icons-round"},"category",-1),c("span",null,"Categories",-1)])],2),c("div",{class:J(["sidebar-item",{active:v(e).currentPage==="preview"}]),onClick:i[8]||(i[8]=l=>v(e).nav("preview"))},[...i[28]||(i[28]=[c("span",{class:"material-icons-round"},"photo_camera",-1),c("span",null,"Frame Preview",-1)])],2),i[37]||(i[37]=c("div",{class:"sidebar-divider"},null,-1)),i[38]||(i[38]=c("div",{class:"sidebar-label"},"Account",-1)),c("div",{class:J(["sidebar-item",{active:v(e).currentPage==="wishlist"}]),onClick:i[9]||(i[9]=l=>v(e).nav("wishlist"))},[...i[29]||(i[29]=[c("span",{class:"material-icons-round"},"favorite_border",-1),c("span",null,"Wishlist",-1)])],2),c("div",{class:J(["sidebar-item",{active:v(e).currentPage==="cart"}]),onClick:i[10]||(i[10]=l=>v(e).nav("cart"))},[i[30]||(i[30]=c("span",{class:"material-icons-round"},"shopping_bag",-1)),i[31]||(i[31]=c("span",null,"Cart",-1)),c("span",{class:J(["sb-badge",{hidden:v(e).totalQty===0}])},M(v(e).totalQty),3)],2),c("div",{class:J(["sidebar-item",{active:v(e).currentPage==="orders"}]),onClick:i[11]||(i[11]=l=>v(e).nav("orders"))},[...i[32]||(i[32]=[c("span",{class:"material-icons-round"},"receipt_long",-1),c("span",null,"Orders",-1)])],2),c("div",{class:J(["sidebar-item",{active:v(e).currentPage==="notifications"}]),onClick:i[12]||(i[12]=l=>v(e).nav("notifications"))},[...i[33]||(i[33]=[c("span",{class:"material-icons-round"},"notifications_none",-1),c("span",null,"Notifications",-1),c("span",{class:"sb-badge"},"3",-1)])],2),i[39]||(i[39]=c("div",{class:"sidebar-divider"},null,-1)),v(e).currentUser?(T(),k("div",{key:0,class:J(["sidebar-item",{active:v(e).currentPage==="profile"}]),onClick:i[13]||(i[13]=l=>v(e).nav("profile"))},[c("span",s1,M(((a=v(e).currentUser.name)==null?void 0:a.charAt(0).toUpperCase())??"?"),1),c("div",r1,[c("span",i1,M(v(e).currentUser.name??"My Account"),1),c("span",o1,M(v(e).currentUser.email??v(e).currentUser.phone),1)])],2)):(T(),k("div",{key:1,class:"sidebar-item",onClick:i[14]||(i[14]=l=>v(e).openSignIn())},[...i[34]||(i[34]=[c("span",{class:"material-icons-round"},"person_outline",-1),c("span",null,"Sign In",-1)])]))]),v(e).currentPage==="shop"?(T(),Ye(ap,{key:0})):ge("",!0),v(e).currentPage==="categories"?(T(),Ye(_p,{key:1})):ge("",!0),v(e).currentPage==="preview"?(T(),Ye(Op,{key:2})):ge("",!0),v(e).currentPage==="wishlist"?(T(),Ye(Wp,{key:3})):ge("",!0),v(e).currentPage==="cart"?(T(),Ye(Ag,{key:4})):ge("",!0),v(e).currentPage==="orders"?(T(),Ye(Bg,{key:5})):ge("",!0),v(e).currentPage==="notifications"?(T(),Ye(Xg,{key:6})):ge("",!0),v(e).currentPage==="profile"?(T(),Ye(Nm,{key:7})):ge("",!0),c("nav",a1,[c("button",{class:J(["tab-item",{active:v(e).currentPage==="shop"}]),onClick:i[15]||(i[15]=l=>v(e).nav("shop"))},[...i[40]||(i[40]=[c("span",{class:"tab-pill"},null,-1),c("span",{class:"material-icons-round"},"storefront",-1),c("span",null,"Shop",-1)])],2),c("button",{class:J(["tab-item",{active:v(e).currentPage==="categories"}]),onClick:i[16]||(i[16]=l=>v(e).nav("categories"))},[...i[41]||(i[41]=[c("span",{class:"tab-pill"},null,-1),c("span",{class:"material-icons-round"},"category",-1),c("span",null,"Browse",-1)])],2),c("button",{class:J(["tab-item",{active:v(e).currentPage==="preview"}]),onClick:i[17]||(i[17]=l=>v(e).nav("preview"))},[...i[42]||(i[42]=[c("span",{class:"tab-pill"},null,-1),c("span",{class:"material-icons-round"},"photo_camera",-1),c("span",null,"Preview",-1)])],2),c("button",{class:J(["tab-item",{active:v(e).currentPage==="cart"}]),onClick:i[18]||(i[18]=l=>v(e).nav("cart"))},[i[43]||(i[43]=c("span",{class:"tab-pill"},null,-1)),i[44]||(i[44]=c("span",{class:"material-icons-round"},"shopping_bag",-1)),i[45]||(i[45]=c("span",null,"Cart",-1)),c("span",{class:J(["badge cart-badge-tab",{hidden:v(e).totalQty===0}])},M(v(e).totalQty),3)],2),c("button",{class:J(["tab-item",{active:v(e).currentPage==="profile"}]),onClick:i[19]||(i[19]=l=>v(e).nav("profile"))},[...i[46]||(i[46]=[c("span",{class:"tab-pill"},null,-1),c("span",{class:"material-icons-round"},"person",-1),c("span",null,"Profile",-1)])],2)]),c("div",{class:J(["overlay",{open:v(e).sheetOpen}]),onClick:i[20]||(i[20]=l=>v(e).closeSheet())},null,2),c("div",{class:J(["bsheet",{open:v(e).sheetOpen}])},[i[47]||(i[47]=c("div",{class:"bsheet-handle"},null,-1)),c("div",l1,[Se(qm)])],2),(T(),Ye(Ll,{to:"body"},[c("div",{class:J(["toast",{show:v(e).toastVisible}])},[i[48]||(i[48]=c("span",{class:"material-icons-round"},"check_circle",-1)),c("span",null,M(v(e).toastMsg),1)],2)])),Se(JI)],64)}}}),Mu=mh(c1);Mu.use(_h());Mu.mount("#app");
