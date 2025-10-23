(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function lo(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const ne={},En=[],ht=()=>{},tc=()=>!1,Ai=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),ao=t=>t.startsWith("onUpdate:"),Re=Object.assign,co=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},sf=Object.prototype.hasOwnProperty,X=(t,e)=>sf.call(t,e),W=Array.isArray,bn=t=>Ni(t)==="[object Map]",nc=t=>Ni(t)==="[object Set]",U=t=>typeof t=="function",de=t=>typeof t=="string",qt=t=>typeof t=="symbol",ue=t=>t!==null&&typeof t=="object",sc=t=>(ue(t)||U(t))&&U(t.then)&&U(t.catch),ic=Object.prototype.toString,Ni=t=>ic.call(t),rf=t=>Ni(t).slice(8,-1),rc=t=>Ni(t)==="[object Object]",uo=t=>de(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Zn=lo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Pi=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},of=/-\w/g,Ke=Pi(t=>t.replace(of,e=>e.slice(1).toUpperCase())),lf=/\B([A-Z])/g,un=Pi(t=>t.replace(lf,"-$1").toLowerCase()),Oi=Pi(t=>t.charAt(0).toUpperCase()+t.slice(1)),Zi=Pi(t=>t?`on${Oi(t)}`:""),Bt=(t,e)=>!Object.is(t,e),Qs=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},oc=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Sr=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let _l;const Di=()=>_l||(_l=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ho(t){if(W(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],i=de(s)?hf(s):ho(s);if(i)for(const r in i)e[r]=i[r]}return e}else if(de(t)||ue(t))return t}const af=/;(?![^(]*\))/g,cf=/:([^]+)/,uf=/\/\*[^]*?\*\//g;function hf(t){const e={};return t.replace(uf,"").split(af).forEach(n=>{if(n){const s=n.split(cf);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Ds(t){let e="";if(de(t))e=t;else if(W(t))for(let n=0;n<t.length;n++){const s=Ds(t[n]);s&&(e+=s+" ")}else if(ue(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const ff="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",df=lo(ff);function lc(t){return!!t||t===""}const ac=t=>!!(t&&t.__v_isRef===!0),_s=t=>de(t)?t:t==null?"":W(t)||ue(t)&&(t.toString===ic||!U(t.toString))?ac(t)?_s(t.value):JSON.stringify(t,cc,2):String(t),cc=(t,e)=>ac(e)?cc(t,e.value):bn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,i],r)=>(n[er(s,r)+" =>"]=i,n),{})}:nc(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>er(n))}:qt(e)?er(e):ue(e)&&!W(e)&&!rc(e)?String(e):e,er=(t,e="")=>{var n;return qt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let De;class pf{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=De,!e&&De&&(this.index=(De.scopes||(De.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=De;try{return De=this,e()}finally{De=n}}}on(){++this._on===1&&(this.prevScope=De,De=this)}off(){this._on>0&&--this._on===0&&(De=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function _f(){return De}let re;const tr=new WeakSet;class uc{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,De&&De.active&&De.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,tr.has(this)&&(tr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||fc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,gl(this),dc(this);const e=re,n=Je;re=this,Je=!0;try{return this.fn()}finally{pc(this),re=e,Je=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)_o(e);this.deps=this.depsTail=void 0,gl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?tr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ir(this)&&this.run()}get dirty(){return Ir(this)}}let hc=0,es,ts;function fc(t,e=!1){if(t.flags|=8,e){t.next=ts,ts=t;return}t.next=es,es=t}function fo(){hc++}function po(){if(--hc>0)return;if(ts){let e=ts;for(ts=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;es;){let e=es;for(es=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function dc(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function pc(t){let e,n=t.depsTail,s=n;for(;s;){const i=s.prevDep;s.version===-1?(s===n&&(n=i),_o(s),gf(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}t.deps=e,t.depsTail=n}function Ir(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(_c(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function _c(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===gs)||(t.globalVersion=gs,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Ir(t))))return;t.flags|=2;const e=t.dep,n=re,s=Je;re=t,Je=!0;try{dc(t);const i=t.fn(t._value);(e.version===0||Bt(i,t._value))&&(t.flags|=128,t._value=i,e.version++)}catch(i){throw e.version++,i}finally{re=n,Je=s,pc(t),t.flags&=-3}}function _o(t,e=!1){const{dep:n,prevSub:s,nextSub:i}=t;if(s&&(s.nextSub=i,t.prevSub=void 0),i&&(i.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)_o(r,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function gf(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Je=!0;const gc=[];function wt(){gc.push(Je),Je=!1}function St(){const t=gc.pop();Je=t===void 0?!0:t}function gl(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=re;re=void 0;try{e()}finally{re=n}}}let gs=0;class mf{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class go{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!re||!Je||re===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==re)n=this.activeLink=new mf(re,this),re.deps?(n.prevDep=re.depsTail,re.depsTail.nextDep=n,re.depsTail=n):re.deps=re.depsTail=n,mc(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=re.depsTail,n.nextDep=void 0,re.depsTail.nextDep=n,re.depsTail=n,re.deps===n&&(re.deps=s)}return n}trigger(e){this.version++,gs++,this.notify(e)}notify(e){fo();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{po()}}}function mc(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)mc(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Tr=new WeakMap,rn=Symbol(""),Rr=Symbol(""),ms=Symbol("");function Se(t,e,n){if(Je&&re){let s=Tr.get(t);s||Tr.set(t,s=new Map);let i=s.get(n);i||(s.set(n,i=new go),i.map=s,i.key=n),i.track()}}function vt(t,e,n,s,i,r){const o=Tr.get(t);if(!o){gs++;return}const l=a=>{a&&a.trigger()};if(fo(),e==="clear")o.forEach(l);else{const a=W(t),c=a&&uo(n);if(a&&n==="length"){const u=Number(s);o.forEach((h,f)=>{(f==="length"||f===ms||!qt(f)&&f>=u)&&l(h)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),c&&l(o.get(ms)),e){case"add":a?c&&l(o.get("length")):(l(o.get(rn)),bn(t)&&l(o.get(Rr)));break;case"delete":a||(l(o.get(rn)),bn(t)&&l(o.get(Rr)));break;case"set":bn(t)&&l(o.get(rn));break}}po()}function _n(t){const e=Q(t);return e===t?e:(Se(e,"iterate",ms),je(t)?e:e.map(be))}function ki(t){return Se(t=Q(t),"iterate",ms),t}const yf={__proto__:null,[Symbol.iterator](){return nr(this,Symbol.iterator,be)},concat(...t){return _n(this).concat(...t.map(e=>W(e)?_n(e):e))},entries(){return nr(this,"entries",t=>(t[1]=be(t[1]),t))},every(t,e){return gt(this,"every",t,e,void 0,arguments)},filter(t,e){return gt(this,"filter",t,e,n=>n.map(be),arguments)},find(t,e){return gt(this,"find",t,e,be,arguments)},findIndex(t,e){return gt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return gt(this,"findLast",t,e,be,arguments)},findLastIndex(t,e){return gt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return gt(this,"forEach",t,e,void 0,arguments)},includes(...t){return sr(this,"includes",t)},indexOf(...t){return sr(this,"indexOf",t)},join(t){return _n(this).join(t)},lastIndexOf(...t){return sr(this,"lastIndexOf",t)},map(t,e){return gt(this,"map",t,e,void 0,arguments)},pop(){return qn(this,"pop")},push(...t){return qn(this,"push",t)},reduce(t,...e){return ml(this,"reduce",t,e)},reduceRight(t,...e){return ml(this,"reduceRight",t,e)},shift(){return qn(this,"shift")},some(t,e){return gt(this,"some",t,e,void 0,arguments)},splice(...t){return qn(this,"splice",t)},toReversed(){return _n(this).toReversed()},toSorted(t){return _n(this).toSorted(t)},toSpliced(...t){return _n(this).toSpliced(...t)},unshift(...t){return qn(this,"unshift",t)},values(){return nr(this,"values",be)}};function nr(t,e,n){const s=ki(t),i=s[e]();return s!==t&&!je(t)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.done||(r.value=n(r.value)),r}),i}const vf=Array.prototype;function gt(t,e,n,s,i,r){const o=ki(t),l=o!==t&&!je(t),a=o[e];if(a!==vf[e]){const h=a.apply(t,r);return l?be(h):h}let c=n;o!==t&&(l?c=function(h,f){return n.call(this,be(h),f,t)}:n.length>2&&(c=function(h,f){return n.call(this,h,f,t)}));const u=a.call(o,c,s);return l&&i?i(u):u}function ml(t,e,n,s){const i=ki(t);let r=n;return i!==t&&(je(t)?n.length>3&&(r=function(o,l,a){return n.call(this,o,l,a,t)}):r=function(o,l,a){return n.call(this,o,be(l),a,t)}),i[e](r,...s)}function sr(t,e,n){const s=Q(t);Se(s,"iterate",ms);const i=s[e](...n);return(i===-1||i===!1)&&vo(n[0])?(n[0]=Q(n[0]),s[e](...n)):i}function qn(t,e,n=[]){wt(),fo();const s=Q(t)[e].apply(t,n);return po(),St(),s}const Cf=lo("__proto__,__v_isRef,__isVue"),yc=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(qt));function Ef(t){qt(t)||(t=String(t));const e=Q(this);return Se(e,"has",t),e.hasOwnProperty(t)}class vc{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const i=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return r;if(n==="__v_raw")return s===(i?r?Pf:wc:r?bc:Ec).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=W(e);if(!i){let a;if(o&&(a=yf[n]))return a;if(n==="hasOwnProperty")return Ef}const l=Reflect.get(e,n,Ce(e)?e:s);if((qt(n)?yc.has(n):Cf(n))||(i||Se(e,"get",n),r))return l;if(Ce(l)){const a=o&&uo(n)?l:l.value;return i&&ue(a)?Ar(a):a}return ue(l)?i?Ar(l):Mi(l):l}}class Cc extends vc{constructor(e=!1){super(!1,e)}set(e,n,s,i){let r=e[n];if(!this._isShallow){const a=Ut(r);if(!je(s)&&!Ut(s)&&(r=Q(r),s=Q(s)),!W(e)&&Ce(r)&&!Ce(s))return a||(r.value=s),!0}const o=W(e)&&uo(n)?Number(n)<e.length:X(e,n),l=Reflect.set(e,n,s,Ce(e)?e:i);return e===Q(i)&&(o?Bt(s,r)&&vt(e,"set",n,s):vt(e,"add",n,s)),l}deleteProperty(e,n){const s=X(e,n);e[n];const i=Reflect.deleteProperty(e,n);return i&&s&&vt(e,"delete",n,void 0),i}has(e,n){const s=Reflect.has(e,n);return(!qt(n)||!yc.has(n))&&Se(e,"has",n),s}ownKeys(e){return Se(e,"iterate",W(e)?"length":rn),Reflect.ownKeys(e)}}class bf extends vc{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const wf=new Cc,Sf=new bf,If=new Cc(!0);const xr=t=>t,js=t=>Reflect.getPrototypeOf(t);function Tf(t,e,n){return function(...s){const i=this.__v_raw,r=Q(i),o=bn(r),l=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,c=i[t](...s),u=n?xr:e?ni:be;return!e&&Se(r,"iterate",a?Rr:rn),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:l?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function qs(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Rf(t,e){const n={get(i){const r=this.__v_raw,o=Q(r),l=Q(i);t||(Bt(i,l)&&Se(o,"get",i),Se(o,"get",l));const{has:a}=js(o),c=e?xr:t?ni:be;if(a.call(o,i))return c(r.get(i));if(a.call(o,l))return c(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!t&&Se(Q(i),"iterate",rn),i.size},has(i){const r=this.__v_raw,o=Q(r),l=Q(i);return t||(Bt(i,l)&&Se(o,"has",i),Se(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,a=Q(l),c=e?xr:t?ni:be;return!t&&Se(a,"iterate",rn),l.forEach((u,h)=>i.call(r,c(u),c(h),o))}};return Re(n,t?{add:qs("add"),set:qs("set"),delete:qs("delete"),clear:qs("clear")}:{add(i){!e&&!je(i)&&!Ut(i)&&(i=Q(i));const r=Q(this);return js(r).has.call(r,i)||(r.add(i),vt(r,"add",i,i)),this},set(i,r){!e&&!je(r)&&!Ut(r)&&(r=Q(r));const o=Q(this),{has:l,get:a}=js(o);let c=l.call(o,i);c||(i=Q(i),c=l.call(o,i));const u=a.call(o,i);return o.set(i,r),c?Bt(r,u)&&vt(o,"set",i,r):vt(o,"add",i,r),this},delete(i){const r=Q(this),{has:o,get:l}=js(r);let a=o.call(r,i);a||(i=Q(i),a=o.call(r,i)),l&&l.call(r,i);const c=r.delete(i);return a&&vt(r,"delete",i,void 0),c},clear(){const i=Q(this),r=i.size!==0,o=i.clear();return r&&vt(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=Tf(i,t,e)}),n}function mo(t,e){const n=Rf(t,e);return(s,i,r)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?s:Reflect.get(X(n,i)&&i in s?n:s,i,r)}const xf={get:mo(!1,!1)},Af={get:mo(!1,!0)},Nf={get:mo(!0,!1)};const Ec=new WeakMap,bc=new WeakMap,wc=new WeakMap,Pf=new WeakMap;function Of(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Df(t){return t.__v_skip||!Object.isExtensible(t)?0:Of(rf(t))}function Mi(t){return Ut(t)?t:yo(t,!1,wf,xf,Ec)}function Sc(t){return yo(t,!1,If,Af,bc)}function Ar(t){return yo(t,!0,Sf,Nf,wc)}function yo(t,e,n,s,i){if(!ue(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=Df(t);if(r===0)return t;const o=i.get(t);if(o)return o;const l=new Proxy(t,r===2?s:n);return i.set(t,l),l}function wn(t){return Ut(t)?wn(t.__v_raw):!!(t&&t.__v_isReactive)}function Ut(t){return!!(t&&t.__v_isReadonly)}function je(t){return!!(t&&t.__v_isShallow)}function vo(t){return t?!!t.__v_raw:!1}function Q(t){const e=t&&t.__v_raw;return e?Q(e):t}function kf(t){return!X(t,"__v_skip")&&Object.isExtensible(t)&&oc(t,"__v_skip",!0),t}const be=t=>ue(t)?Mi(t):t,ni=t=>ue(t)?Ar(t):t;function Ce(t){return t?t.__v_isRef===!0:!1}function Ft(t){return Ic(t,!1)}function Mf(t){return Ic(t,!0)}function Ic(t,e){return Ce(t)?t:new Lf(t,e)}class Lf{constructor(e,n){this.dep=new go,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Q(e),this._value=n?e:be(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||je(e)||Ut(e);e=s?e:Q(e),Bt(e,n)&&(this._rawValue=e,this._value=s?e:be(e),this.dep.trigger())}}function ft(t){return Ce(t)?t.value:t}const Ff={get:(t,e,n)=>e==="__v_raw"?t:ft(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return Ce(i)&&!Ce(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};function Tc(t){return wn(t)?t:new Proxy(t,Ff)}class Bf{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new go(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=gs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&re!==this)return fc(this,!0),!0}get value(){const e=this.dep.track();return _c(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Hf(t,e,n=!1){let s,i;return U(t)?s=t:(s=t.get,i=t.set),new Bf(s,i,n)}const Gs={},si=new WeakMap;let Xt;function $f(t,e=!1,n=Xt){if(n){let s=si.get(n);s||si.set(n,s=[]),s.push(t)}}function Wf(t,e,n=ne){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:a}=n,c=k=>i?k:je(k)||i===!1||i===0?Ct(k,1):Ct(k);let u,h,f,_,m=!1,E=!1;if(Ce(t)?(h=()=>t.value,m=je(t)):wn(t)?(h=()=>c(t),m=!0):W(t)?(E=!0,m=t.some(k=>wn(k)||je(k)),h=()=>t.map(k=>{if(Ce(k))return k.value;if(wn(k))return c(k);if(U(k))return a?a(k,2):k()})):U(t)?e?h=a?()=>a(t,2):t:h=()=>{if(f){wt();try{f()}finally{St()}}const k=Xt;Xt=u;try{return a?a(t,3,[_]):t(_)}finally{Xt=k}}:h=ht,e&&i){const k=h,ee=i===!0?1/0:i;h=()=>Ct(k(),ee)}const A=_f(),O=()=>{u.stop(),A&&A.active&&co(A.effects,u)};if(r&&e){const k=e;e=(...ee)=>{k(...ee),O()}}let P=E?new Array(t.length).fill(Gs):Gs;const M=k=>{if(!(!(u.flags&1)||!u.dirty&&!k))if(e){const ee=u.run();if(i||m||(E?ee.some((Ee,he)=>Bt(Ee,P[he])):Bt(ee,P))){f&&f();const Ee=Xt;Xt=u;try{const he=[ee,P===Gs?void 0:E&&P[0]===Gs?[]:P,_];P=ee,a?a(e,3,he):e(...he)}finally{Xt=Ee}}}else u.run()};return l&&l(M),u=new uc(h),u.scheduler=o?()=>o(M,!1):M,_=k=>$f(k,!1,u),f=u.onStop=()=>{const k=si.get(u);if(k){if(a)a(k,4);else for(const ee of k)ee();si.delete(u)}},e?s?M(!0):P=u.run():o?o(M.bind(null,!0),!0):u.run(),O.pause=u.pause.bind(u),O.resume=u.resume.bind(u),O.stop=O,O}function Ct(t,e=1/0,n){if(e<=0||!ue(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Ce(t))Ct(t.value,e,n);else if(W(t))for(let s=0;s<t.length;s++)Ct(t[s],e,n);else if(nc(t)||bn(t))t.forEach(s=>{Ct(s,e,n)});else if(rc(t)){for(const s in t)Ct(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&Ct(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ks(t,e,n,s){try{return s?t(...s):t()}catch(i){Li(i,e,n)}}function pt(t,e,n,s){if(U(t)){const i=ks(t,e,n,s);return i&&sc(i)&&i.catch(r=>{Li(r,e,n)}),i}if(W(t)){const i=[];for(let r=0;r<t.length;r++)i.push(pt(t[r],e,n,s));return i}}function Li(t,e,n,s=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ne;if(e){let l=e.parent;const a=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const u=l.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](t,a,c)===!1)return}l=l.parent}if(r){wt(),ks(r,null,10,[t,a,c]),St();return}}Uf(t,n,i,s,o)}function Uf(t,e,n,s=!0,i=!1){if(i)throw t;console.error(t)}const Ae=[];let ct=-1;const Sn=[];let kt=null,mn=0;const Rc=Promise.resolve();let ii=null;function xc(t){const e=ii||Rc;return t?e.then(this?t.bind(this):t):e}function Vf(t){let e=ct+1,n=Ae.length;for(;e<n;){const s=e+n>>>1,i=Ae[s],r=ys(i);r<t||r===t&&i.flags&2?e=s+1:n=s}return e}function Co(t){if(!(t.flags&1)){const e=ys(t),n=Ae[Ae.length-1];!n||!(t.flags&2)&&e>=ys(n)?Ae.push(t):Ae.splice(Vf(e),0,t),t.flags|=1,Ac()}}function Ac(){ii||(ii=Rc.then(Pc))}function jf(t){W(t)?Sn.push(...t):kt&&t.id===-1?kt.splice(mn+1,0,t):t.flags&1||(Sn.push(t),t.flags|=1),Ac()}function yl(t,e,n=ct+1){for(;n<Ae.length;n++){const s=Ae[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;Ae.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Nc(t){if(Sn.length){const e=[...new Set(Sn)].sort((n,s)=>ys(n)-ys(s));if(Sn.length=0,kt){kt.push(...e);return}for(kt=e,mn=0;mn<kt.length;mn++){const n=kt[mn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}kt=null,mn=0}}const ys=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Pc(t){try{for(ct=0;ct<Ae.length;ct++){const e=Ae[ct];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),ks(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ct<Ae.length;ct++){const e=Ae[ct];e&&(e.flags&=-2)}ct=-1,Ae.length=0,Nc(),ii=null,(Ae.length||Sn.length)&&Pc()}}let $e=null,Oc=null;function ri(t){const e=$e;return $e=t,Oc=t&&t.type.__scopeId||null,e}function ns(t,e=$e,n){if(!e||t._n)return t;const s=(...i)=>{s._d&&ai(-1);const r=ri(e);let o;try{o=t(...i)}finally{ri(r),s._d&&ai(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function Nr(t,e){if($e===null)return t;const n=$i($e),s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[r,o,l,a=ne]=e[i];r&&(U(r)&&(r={mounted:r,updated:r}),r.deep&&Ct(o),s.push({dir:r,instance:n,value:o,oldValue:void 0,arg:l,modifiers:a}))}return t}function Yt(t,e,n,s){const i=t.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let a=l.dir[s];a&&(wt(),pt(a,n,8,[t.el,l,t,e]),St())}}const qf=Symbol("_vte"),Gf=t=>t.__isTeleport,Kf=Symbol("_leaveCb");function Eo(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Eo(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Dc(t,e){return U(t)?Re({name:t.name},e,{setup:t}):t}function kc(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const oi=new WeakMap;function ss(t,e,n,s,i=!1){if(W(t)){t.forEach((m,E)=>ss(m,e&&(W(e)?e[E]:e),n,s,i));return}if(is(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&ss(t,e,n,s.component.subTree);return}const r=s.shapeFlag&4?$i(s.component):s.el,o=i?null:r,{i:l,r:a}=t,c=e&&e.r,u=l.refs===ne?l.refs={}:l.refs,h=l.setupState,f=Q(h),_=h===ne?tc:m=>X(f,m);if(c!=null&&c!==a){if(vl(e),de(c))u[c]=null,_(c)&&(h[c]=null);else if(Ce(c)){c.value=null;const m=e;m.k&&(u[m.k]=null)}}if(U(a))ks(a,l,12,[o,u]);else{const m=de(a),E=Ce(a);if(m||E){const A=()=>{if(t.f){const O=m?_(a)?h[a]:u[a]:a.value;if(i)W(O)&&co(O,r);else if(W(O))O.includes(r)||O.push(r);else if(m)u[a]=[r],_(a)&&(h[a]=u[a]);else{const P=[r];a.value=P,t.k&&(u[t.k]=P)}}else m?(u[a]=o,_(a)&&(h[a]=o)):E&&(a.value=o,t.k&&(u[t.k]=o))};if(o){const O=()=>{A(),oi.delete(t)};O.id=-1,oi.set(t,O),He(O,n)}else vl(t),A()}}}function vl(t){const e=oi.get(t);e&&(e.flags|=8,oi.delete(t))}Di().requestIdleCallback;Di().cancelIdleCallback;const is=t=>!!t.type.__asyncLoader,Mc=t=>t.type.__isKeepAlive;function zf(t,e){Lc(t,"a",e)}function Yf(t,e){Lc(t,"da",e)}function Lc(t,e,n=Te){const s=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if(Fi(e,s,n),n){let i=n.parent;for(;i&&i.parent;)Mc(i.parent.vnode)&&Qf(s,e,n,i),i=i.parent}}function Qf(t,e,n,s){const i=Fi(e,t,s,!0);Bc(()=>{co(s[e],i)},n)}function Fi(t,e,n=Te,s=!1){if(n){const i=n[t]||(n[t]=[]),r=e.__weh||(e.__weh=(...o)=>{wt();const l=Ms(n),a=pt(e,n,t,o);return l(),St(),a});return s?i.unshift(r):i.push(r),r}}const xt=t=>(e,n=Te)=>{(!Cs||t==="sp")&&Fi(t,(...s)=>e(...s),n)},Xf=xt("bm"),Fc=xt("m"),Jf=xt("bu"),Zf=xt("u"),ed=xt("bum"),Bc=xt("um"),td=xt("sp"),nd=xt("rtg"),sd=xt("rtc");function id(t,e=Te){Fi("ec",t,e)}const rd="components";function bo(t,e){return ld(rd,t,!0,e)||t}const od=Symbol.for("v-ndc");function ld(t,e,n=!0,s=!1){const i=$e||Te;if(i){const r=i.type;{const l=Qd(r,!1);if(l&&(l===e||l===Ke(e)||l===Oi(Ke(e))))return r}const o=Cl(i[t]||r[t],e)||Cl(i.appContext[t],e);return!o&&s?r:o}}function Cl(t,e){return t&&(t[e]||t[Ke(e)]||t[Oi(Ke(e))])}function Hc(t,e,n,s){let i;const r=n,o=W(t);if(o||de(t)){const l=o&&wn(t);let a=!1,c=!1;l&&(a=!je(t),c=Ut(t),t=ki(t)),i=new Array(t.length);for(let u=0,h=t.length;u<h;u++)i[u]=e(a?c?ni(be(t[u])):be(t[u]):t[u],u,void 0,r)}else if(typeof t=="number"){i=new Array(t);for(let l=0;l<t;l++)i[l]=e(l+1,l,void 0,r)}else if(ue(t))if(t[Symbol.iterator])i=Array.from(t,(l,a)=>e(l,a,void 0,r));else{const l=Object.keys(t);i=new Array(l.length);for(let a=0,c=l.length;a<c;a++){const u=l[a];i[a]=e(t[u],u,a,r)}}else i=[];return i}const Pr=t=>t?ru(t)?$i(t):Pr(t.parent):null,rs=Re(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Pr(t.parent),$root:t=>Pr(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Wc(t),$forceUpdate:t=>t.f||(t.f=()=>{Co(t.update)}),$nextTick:t=>t.n||(t.n=xc.bind(t.proxy)),$watch:t=>xd.bind(t)}),ir=(t,e)=>t!==ne&&!t.__isScriptSetup&&X(t,e),ad={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:a}=t;let c;if(e[0]!=="$"){const _=o[e];if(_!==void 0)switch(_){case 1:return s[e];case 2:return i[e];case 4:return n[e];case 3:return r[e]}else{if(ir(s,e))return o[e]=1,s[e];if(i!==ne&&X(i,e))return o[e]=2,i[e];if((c=t.propsOptions[0])&&X(c,e))return o[e]=3,r[e];if(n!==ne&&X(n,e))return o[e]=4,n[e];Or&&(o[e]=0)}}const u=rs[e];let h,f;if(u)return e==="$attrs"&&Se(t.attrs,"get",""),u(t);if((h=l.__cssModules)&&(h=h[e]))return h;if(n!==ne&&X(n,e))return o[e]=4,n[e];if(f=a.config.globalProperties,X(f,e))return f[e]},set({_:t},e,n){const{data:s,setupState:i,ctx:r}=t;return ir(i,e)?(i[e]=n,!0):s!==ne&&X(s,e)?(s[e]=n,!0):X(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(r[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:i,propsOptions:r,type:o}},l){let a,c;return!!(n[l]||t!==ne&&l[0]!=="$"&&X(t,l)||ir(e,l)||(a=r[0])&&X(a,l)||X(s,l)||X(rs,l)||X(i.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:X(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function El(t){return W(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Or=!0;function cd(t){const e=Wc(t),n=t.proxy,s=t.ctx;Or=!1,e.beforeCreate&&bl(e.beforeCreate,t,"bc");const{data:i,computed:r,methods:o,watch:l,provide:a,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:_,updated:m,activated:E,deactivated:A,beforeDestroy:O,beforeUnmount:P,destroyed:M,unmounted:k,render:ee,renderTracked:Ee,renderTriggered:he,errorCaptured:tt,serverPrefetch:Nt,expose:nt,inheritAttrs:Pt,components:zt,directives:st,filters:Vn}=e;if(c&&ud(c,s,null),o)for(const Z in o){const z=o[Z];U(z)&&(s[Z]=z.bind(n))}if(i){const Z=i.call(n,n);ue(Z)&&(t.data=Mi(Z))}if(Or=!0,r)for(const Z in r){const z=r[Z],_t=U(z)?z.bind(n,n):U(z.get)?z.get.bind(n,n):ht,Ot=!U(z)&&U(z.set)?z.set.bind(n):ht,it=ze({get:_t,set:Ot});Object.defineProperty(s,Z,{enumerable:!0,configurable:!0,get:()=>it.value,set:Ne=>it.value=Ne})}if(l)for(const Z in l)$c(l[Z],s,n,Z);if(a){const Z=U(a)?a.call(n):a;Reflect.ownKeys(Z).forEach(z=>{Xs(z,Z[z])})}u&&bl(u,t,"c");function ge(Z,z){W(z)?z.forEach(_t=>Z(_t.bind(n))):z&&Z(z.bind(n))}if(ge(Xf,h),ge(Fc,f),ge(Jf,_),ge(Zf,m),ge(zf,E),ge(Yf,A),ge(id,tt),ge(sd,Ee),ge(nd,he),ge(ed,P),ge(Bc,k),ge(td,Nt),W(nt))if(nt.length){const Z=t.exposed||(t.exposed={});nt.forEach(z=>{Object.defineProperty(Z,z,{get:()=>n[z],set:_t=>n[z]=_t,enumerable:!0})})}else t.exposed||(t.exposed={});ee&&t.render===ht&&(t.render=ee),Pt!=null&&(t.inheritAttrs=Pt),zt&&(t.components=zt),st&&(t.directives=st),Nt&&kc(t)}function ud(t,e,n=ht){W(t)&&(t=Dr(t));for(const s in t){const i=t[s];let r;ue(i)?"default"in i?r=dt(i.from||s,i.default,!0):r=dt(i.from||s):r=dt(i),Ce(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function bl(t,e,n){pt(W(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function $c(t,e,n,s){let i=s.includes(".")?eu(n,s):()=>n[s];if(de(t)){const r=e[t];U(r)&&Js(i,r)}else if(U(t))Js(i,t.bind(n));else if(ue(t))if(W(t))t.forEach(r=>$c(r,e,n,s));else{const r=U(t.handler)?t.handler.bind(n):e[t.handler];U(r)&&Js(i,r,t)}}function Wc(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=t.appContext,l=r.get(e);let a;return l?a=l:!i.length&&!n&&!s?a=e:(a={},i.length&&i.forEach(c=>li(a,c,o,!0)),li(a,e,o)),ue(e)&&r.set(e,a),a}function li(t,e,n,s=!1){const{mixins:i,extends:r}=e;r&&li(t,r,n,!0),i&&i.forEach(o=>li(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const l=hd[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const hd={data:wl,props:Sl,emits:Sl,methods:Jn,computed:Jn,beforeCreate:xe,created:xe,beforeMount:xe,mounted:xe,beforeUpdate:xe,updated:xe,beforeDestroy:xe,beforeUnmount:xe,destroyed:xe,unmounted:xe,activated:xe,deactivated:xe,errorCaptured:xe,serverPrefetch:xe,components:Jn,directives:Jn,watch:dd,provide:wl,inject:fd};function wl(t,e){return e?t?function(){return Re(U(t)?t.call(this,this):t,U(e)?e.call(this,this):e)}:e:t}function fd(t,e){return Jn(Dr(t),Dr(e))}function Dr(t){if(W(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function xe(t,e){return t?[...new Set([].concat(t,e))]:e}function Jn(t,e){return t?Re(Object.create(null),t,e):e}function Sl(t,e){return t?W(t)&&W(e)?[...new Set([...t,...e])]:Re(Object.create(null),El(t),El(e??{})):e}function dd(t,e){if(!t)return e;if(!e)return t;const n=Re(Object.create(null),t);for(const s in e)n[s]=xe(t[s],e[s]);return n}function Uc(){return{app:null,config:{isNativeTag:tc,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let pd=0;function _d(t,e){return function(s,i=null){U(s)||(s=Re({},s)),i!=null&&!ue(i)&&(i=null);const r=Uc(),o=new WeakSet,l=[];let a=!1;const c=r.app={_uid:pd++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:Jd,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&U(u.install)?(o.add(u),u.install(c,...h)):U(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!a){const _=c._ceVNode||_e(s,i);return _.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),t(_,u,f),a=!0,c._container=u,u.__vue_app__=c,$i(_.component)}},onUnmount(u){l.push(u)},unmount(){a&&(pt(l,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=In;In=c;try{return u()}finally{In=h}}};return c}}let In=null;function Xs(t,e){if(Te){let n=Te.provides;const s=Te.parent&&Te.parent.provides;s===n&&(n=Te.provides=Object.create(s)),n[t]=e}}function dt(t,e,n=!1){const s=qd();if(s||In){let i=In?In._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&t in i)return i[t];if(arguments.length>1)return n&&U(e)?e.call(s&&s.proxy):e}}const Vc={},jc=()=>Object.create(Vc),qc=t=>Object.getPrototypeOf(t)===Vc;function gd(t,e,n,s=!1){const i={},r=jc();t.propsDefaults=Object.create(null),Gc(t,e,i,r);for(const o in t.propsOptions[0])o in i||(i[o]=void 0);n?t.props=s?i:Sc(i):t.type.props?t.props=i:t.props=r,t.attrs=r}function md(t,e,n,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=t,l=Q(i),[a]=t.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Bi(t.emitsOptions,f))continue;const _=e[f];if(a)if(X(r,f))_!==r[f]&&(r[f]=_,c=!0);else{const m=Ke(f);i[m]=kr(a,l,m,_,t,!1)}else _!==r[f]&&(r[f]=_,c=!0)}}}else{Gc(t,e,i,r)&&(c=!0);let u;for(const h in l)(!e||!X(e,h)&&((u=un(h))===h||!X(e,u)))&&(a?n&&(n[h]!==void 0||n[u]!==void 0)&&(i[h]=kr(a,l,h,void 0,t,!0)):delete i[h]);if(r!==l)for(const h in r)(!e||!X(e,h))&&(delete r[h],c=!0)}c&&vt(t.attrs,"set","")}function Gc(t,e,n,s){const[i,r]=t.propsOptions;let o=!1,l;if(e)for(let a in e){if(Zn(a))continue;const c=e[a];let u;i&&X(i,u=Ke(a))?!r||!r.includes(u)?n[u]=c:(l||(l={}))[u]=c:Bi(t.emitsOptions,a)||(!(a in s)||c!==s[a])&&(s[a]=c,o=!0)}if(r){const a=Q(n),c=l||ne;for(let u=0;u<r.length;u++){const h=r[u];n[h]=kr(i,a,h,c[h],t,!X(c,h))}}return o}function kr(t,e,n,s,i,r){const o=t[n];if(o!=null){const l=X(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&U(a)){const{propsDefaults:c}=i;if(n in c)s=c[n];else{const u=Ms(i);s=c[n]=a.call(null,e),u()}}else s=a;i.ce&&i.ce._setProp(n,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===un(n))&&(s=!0))}return s}const yd=new WeakMap;function Kc(t,e,n=!1){const s=n?yd:e.propsCache,i=s.get(t);if(i)return i;const r=t.props,o={},l=[];let a=!1;if(!U(t)){const u=h=>{a=!0;const[f,_]=Kc(h,e,!0);Re(o,f),_&&l.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!r&&!a)return ue(t)&&s.set(t,En),En;if(W(r))for(let u=0;u<r.length;u++){const h=Ke(r[u]);Il(h)&&(o[h]=ne)}else if(r)for(const u in r){const h=Ke(u);if(Il(h)){const f=r[u],_=o[h]=W(f)||U(f)?{type:f}:Re({},f),m=_.type;let E=!1,A=!0;if(W(m))for(let O=0;O<m.length;++O){const P=m[O],M=U(P)&&P.name;if(M==="Boolean"){E=!0;break}else M==="String"&&(A=!1)}else E=U(m)&&m.name==="Boolean";_[0]=E,_[1]=A,(E||X(_,"default"))&&l.push(h)}}const c=[o,l];return ue(t)&&s.set(t,c),c}function Il(t){return t[0]!=="$"&&!Zn(t)}const wo=t=>t==="_"||t==="_ctx"||t==="$stable",So=t=>W(t)?t.map(ut):[ut(t)],vd=(t,e,n)=>{if(e._n)return e;const s=ns((...i)=>So(e(...i)),n);return s._c=!1,s},zc=(t,e,n)=>{const s=t._ctx;for(const i in t){if(wo(i))continue;const r=t[i];if(U(r))e[i]=vd(i,r,s);else if(r!=null){const o=So(r);e[i]=()=>o}}},Yc=(t,e)=>{const n=So(e);t.slots.default=()=>n},Qc=(t,e,n)=>{for(const s in e)(n||!wo(s))&&(t[s]=e[s])},Cd=(t,e,n)=>{const s=t.slots=jc();if(t.vnode.shapeFlag&32){const i=e._;i?(Qc(s,e,n),n&&oc(s,"_",i,!0)):zc(e,s)}else e&&Yc(t,e)},Ed=(t,e,n)=>{const{vnode:s,slots:i}=t;let r=!0,o=ne;if(s.shapeFlag&32){const l=e._;l?n&&l===1?r=!1:Qc(i,e,n):(r=!e.$stable,zc(e,i)),o=e}else e&&(Yc(t,e),o={default:1});if(r)for(const l in i)!wo(l)&&o[l]==null&&delete i[l]},He=Ld;function bd(t){return wd(t)}function wd(t,e){const n=Di();n.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:a,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:_=ht,insertStaticContent:m}=t,E=(d,p,g,v=null,b=null,y=null,R=void 0,T=null,I=!!p.dynamicChildren)=>{if(d===p)return;d&&!Gn(d,p)&&(v=C(d),Ne(d,b,y,!0),d=null),p.patchFlag===-2&&(I=!1,p.dynamicChildren=null);const{type:w,ref:B,shapeFlag:N}=p;switch(w){case Hi:A(d,p,g,v);break;case Nn:O(d,p,g,v);break;case or:d==null&&P(p,g,v,R);break;case Ve:zt(d,p,g,v,b,y,R,T,I);break;default:N&1?ee(d,p,g,v,b,y,R,T,I):N&6?st(d,p,g,v,b,y,R,T,I):(N&64||N&128)&&w.process(d,p,g,v,b,y,R,T,I,L)}B!=null&&b?ss(B,d&&d.ref,y,p||d,!p):B==null&&d&&d.ref!=null&&ss(d.ref,null,y,d,!0)},A=(d,p,g,v)=>{if(d==null)s(p.el=l(p.children),g,v);else{const b=p.el=d.el;p.children!==d.children&&c(b,p.children)}},O=(d,p,g,v)=>{d==null?s(p.el=a(p.children||""),g,v):p.el=d.el},P=(d,p,g,v)=>{[d.el,d.anchor]=m(d.children,p,g,v,d.el,d.anchor)},M=({el:d,anchor:p},g,v)=>{let b;for(;d&&d!==p;)b=f(d),s(d,g,v),d=b;s(p,g,v)},k=({el:d,anchor:p})=>{let g;for(;d&&d!==p;)g=f(d),i(d),d=g;i(p)},ee=(d,p,g,v,b,y,R,T,I)=>{p.type==="svg"?R="svg":p.type==="math"&&(R="mathml"),d==null?Ee(p,g,v,b,y,R,T,I):Nt(d,p,b,y,R,T,I)},Ee=(d,p,g,v,b,y,R,T)=>{let I,w;const{props:B,shapeFlag:N,transition:F,dirs:$}=d;if(I=d.el=o(d.type,y,B&&B.is,B),N&8?u(I,d.children):N&16&&tt(d.children,I,null,v,b,rr(d,y),R,T),$&&Yt(d,null,v,"created"),he(I,d,d.scopeId,R,v),B){for(const ie in B)ie!=="value"&&!Zn(ie)&&r(I,ie,null,B[ie],y,v);"value"in B&&r(I,"value",null,B.value,y),(w=B.onVnodeBeforeMount)&&at(w,v,d)}$&&Yt(d,null,v,"beforeMount");const G=Sd(b,F);G&&F.beforeEnter(I),s(I,p,g),((w=B&&B.onVnodeMounted)||G||$)&&He(()=>{w&&at(w,v,d),G&&F.enter(I),$&&Yt(d,null,v,"mounted")},b)},he=(d,p,g,v,b)=>{if(g&&_(d,g),v)for(let y=0;y<v.length;y++)_(d,v[y]);if(b){let y=b.subTree;if(p===y||nu(y.type)&&(y.ssContent===p||y.ssFallback===p)){const R=b.vnode;he(d,R,R.scopeId,R.slotScopeIds,b.parent)}}},tt=(d,p,g,v,b,y,R,T,I=0)=>{for(let w=I;w<d.length;w++){const B=d[w]=T?Mt(d[w]):ut(d[w]);E(null,B,p,g,v,b,y,R,T)}},Nt=(d,p,g,v,b,y,R)=>{const T=p.el=d.el;let{patchFlag:I,dynamicChildren:w,dirs:B}=p;I|=d.patchFlag&16;const N=d.props||ne,F=p.props||ne;let $;if(g&&Qt(g,!1),($=F.onVnodeBeforeUpdate)&&at($,g,p,d),B&&Yt(p,d,g,"beforeUpdate"),g&&Qt(g,!0),(N.innerHTML&&F.innerHTML==null||N.textContent&&F.textContent==null)&&u(T,""),w?nt(d.dynamicChildren,w,T,g,v,rr(p,b),y):R||z(d,p,T,null,g,v,rr(p,b),y,!1),I>0){if(I&16)Pt(T,N,F,g,b);else if(I&2&&N.class!==F.class&&r(T,"class",null,F.class,b),I&4&&r(T,"style",N.style,F.style,b),I&8){const G=p.dynamicProps;for(let ie=0;ie<G.length;ie++){const J=G[ie],Pe=N[J],Oe=F[J];(Oe!==Pe||J==="value")&&r(T,J,Pe,Oe,b,g)}}I&1&&d.children!==p.children&&u(T,p.children)}else!R&&w==null&&Pt(T,N,F,g,b);(($=F.onVnodeUpdated)||B)&&He(()=>{$&&at($,g,p,d),B&&Yt(p,d,g,"updated")},v)},nt=(d,p,g,v,b,y,R)=>{for(let T=0;T<p.length;T++){const I=d[T],w=p[T],B=I.el&&(I.type===Ve||!Gn(I,w)||I.shapeFlag&198)?h(I.el):g;E(I,w,B,null,v,b,y,R,!0)}},Pt=(d,p,g,v,b)=>{if(p!==g){if(p!==ne)for(const y in p)!Zn(y)&&!(y in g)&&r(d,y,p[y],null,b,v);for(const y in g){if(Zn(y))continue;const R=g[y],T=p[y];R!==T&&y!=="value"&&r(d,y,T,R,b,v)}"value"in g&&r(d,"value",p.value,g.value,b)}},zt=(d,p,g,v,b,y,R,T,I)=>{const w=p.el=d?d.el:l(""),B=p.anchor=d?d.anchor:l("");let{patchFlag:N,dynamicChildren:F,slotScopeIds:$}=p;$&&(T=T?T.concat($):$),d==null?(s(w,g,v),s(B,g,v),tt(p.children||[],g,B,b,y,R,T,I)):N>0&&N&64&&F&&d.dynamicChildren?(nt(d.dynamicChildren,F,g,b,y,R,T),(p.key!=null||b&&p===b.subTree)&&Xc(d,p,!0)):z(d,p,g,B,b,y,R,T,I)},st=(d,p,g,v,b,y,R,T,I)=>{p.slotScopeIds=T,d==null?p.shapeFlag&512?b.ctx.activate(p,g,v,R,I):Vn(p,g,v,b,y,R,I):fn(d,p,I)},Vn=(d,p,g,v,b,y,R)=>{const T=d.component=jd(d,v,b);if(Mc(d)&&(T.ctx.renderer=L),Gd(T,!1,R),T.asyncDep){if(b&&b.registerDep(T,ge,R),!d.el){const I=T.subTree=_e(Nn);O(null,I,p,g),d.placeholder=I.el}}else ge(T,d,p,g,b,y,R)},fn=(d,p,g)=>{const v=p.component=d.component;if(kd(d,p,g))if(v.asyncDep&&!v.asyncResolved){Z(v,p,g);return}else v.next=p,v.update();else p.el=d.el,v.vnode=p},ge=(d,p,g,v,b,y,R)=>{const T=()=>{if(d.isMounted){let{next:N,bu:F,u:$,parent:G,vnode:ie}=d;{const ot=Jc(d);if(ot){N&&(N.el=ie.el,Z(d,N,R)),ot.asyncDep.then(()=>{d.isUnmounted||T()});return}}let J=N,Pe;Qt(d,!1),N?(N.el=ie.el,Z(d,N,R)):N=ie,F&&Qs(F),(Pe=N.props&&N.props.onVnodeBeforeUpdate)&&at(Pe,G,N,ie),Qt(d,!0);const Oe=Rl(d),rt=d.subTree;d.subTree=Oe,E(rt,Oe,h(rt.el),C(rt),d,b,y),N.el=Oe.el,J===null&&Md(d,Oe.el),$&&He($,b),(Pe=N.props&&N.props.onVnodeUpdated)&&He(()=>at(Pe,G,N,ie),b)}else{let N;const{el:F,props:$}=p,{bm:G,m:ie,parent:J,root:Pe,type:Oe}=d,rt=is(p);Qt(d,!1),G&&Qs(G),!rt&&(N=$&&$.onVnodeBeforeMount)&&at(N,J,p),Qt(d,!0);{Pe.ce&&Pe.ce._def.shadowRoot!==!1&&Pe.ce._injectChildStyle(Oe);const ot=d.subTree=Rl(d);E(null,ot,g,v,d,b,y),p.el=ot.el}if(ie&&He(ie,b),!rt&&(N=$&&$.onVnodeMounted)){const ot=p;He(()=>at(N,J,ot),b)}(p.shapeFlag&256||J&&is(J.vnode)&&J.vnode.shapeFlag&256)&&d.a&&He(d.a,b),d.isMounted=!0,p=g=v=null}};d.scope.on();const I=d.effect=new uc(T);d.scope.off();const w=d.update=I.run.bind(I),B=d.job=I.runIfDirty.bind(I);B.i=d,B.id=d.uid,I.scheduler=()=>Co(B),Qt(d,!0),w()},Z=(d,p,g)=>{p.component=d;const v=d.vnode.props;d.vnode=p,d.next=null,md(d,p.props,v,g),Ed(d,p.children,g),wt(),yl(d),St()},z=(d,p,g,v,b,y,R,T,I=!1)=>{const w=d&&d.children,B=d?d.shapeFlag:0,N=p.children,{patchFlag:F,shapeFlag:$}=p;if(F>0){if(F&128){Ot(w,N,g,v,b,y,R,T,I);return}else if(F&256){_t(w,N,g,v,b,y,R,T,I);return}}$&8?(B&16&&Ue(w,b,y),N!==w&&u(g,N)):B&16?$&16?Ot(w,N,g,v,b,y,R,T,I):Ue(w,b,y,!0):(B&8&&u(g,""),$&16&&tt(N,g,v,b,y,R,T,I))},_t=(d,p,g,v,b,y,R,T,I)=>{d=d||En,p=p||En;const w=d.length,B=p.length,N=Math.min(w,B);let F;for(F=0;F<N;F++){const $=p[F]=I?Mt(p[F]):ut(p[F]);E(d[F],$,g,null,b,y,R,T,I)}w>B?Ue(d,b,y,!0,!1,N):tt(p,g,v,b,y,R,T,I,N)},Ot=(d,p,g,v,b,y,R,T,I)=>{let w=0;const B=p.length;let N=d.length-1,F=B-1;for(;w<=N&&w<=F;){const $=d[w],G=p[w]=I?Mt(p[w]):ut(p[w]);if(Gn($,G))E($,G,g,null,b,y,R,T,I);else break;w++}for(;w<=N&&w<=F;){const $=d[N],G=p[F]=I?Mt(p[F]):ut(p[F]);if(Gn($,G))E($,G,g,null,b,y,R,T,I);else break;N--,F--}if(w>N){if(w<=F){const $=F+1,G=$<B?p[$].el:v;for(;w<=F;)E(null,p[w]=I?Mt(p[w]):ut(p[w]),g,G,b,y,R,T,I),w++}}else if(w>F)for(;w<=N;)Ne(d[w],b,y,!0),w++;else{const $=w,G=w,ie=new Map;for(w=G;w<=F;w++){const Be=p[w]=I?Mt(p[w]):ut(p[w]);Be.key!=null&&ie.set(Be.key,w)}let J,Pe=0;const Oe=F-G+1;let rt=!1,ot=0;const jn=new Array(Oe);for(w=0;w<Oe;w++)jn[w]=0;for(w=$;w<=N;w++){const Be=d[w];if(Pe>=Oe){Ne(Be,b,y,!0);continue}let lt;if(Be.key!=null)lt=ie.get(Be.key);else for(J=G;J<=F;J++)if(jn[J-G]===0&&Gn(Be,p[J])){lt=J;break}lt===void 0?Ne(Be,b,y,!0):(jn[lt-G]=w+1,lt>=ot?ot=lt:rt=!0,E(Be,p[lt],g,null,b,y,R,T,I),Pe++)}const fl=rt?Id(jn):En;for(J=fl.length-1,w=Oe-1;w>=0;w--){const Be=G+w,lt=p[Be],dl=p[Be+1],pl=Be+1<B?dl.el||dl.placeholder:v;jn[w]===0?E(null,lt,g,pl,b,y,R,T,I):rt&&(J<0||w!==fl[J]?it(lt,g,pl,2):J--)}}},it=(d,p,g,v,b=null)=>{const{el:y,type:R,transition:T,children:I,shapeFlag:w}=d;if(w&6){it(d.component.subTree,p,g,v);return}if(w&128){d.suspense.move(p,g,v);return}if(w&64){R.move(d,p,g,L);return}if(R===Ve){s(y,p,g);for(let N=0;N<I.length;N++)it(I[N],p,g,v);s(d.anchor,p,g);return}if(R===or){M(d,p,g);return}if(v!==2&&w&1&&T)if(v===0)T.beforeEnter(y),s(y,p,g),He(()=>T.enter(y),b);else{const{leave:N,delayLeave:F,afterLeave:$}=T,G=()=>{d.ctx.isUnmounted?i(y):s(y,p,g)},ie=()=>{y._isLeaving&&y[Kf](!0),N(y,()=>{G(),$&&$()})};F?F(y,G,ie):ie()}else s(y,p,g)},Ne=(d,p,g,v=!1,b=!1)=>{const{type:y,props:R,ref:T,children:I,dynamicChildren:w,shapeFlag:B,patchFlag:N,dirs:F,cacheIndex:$}=d;if(N===-2&&(b=!1),T!=null&&(wt(),ss(T,null,g,d,!0),St()),$!=null&&(p.renderCache[$]=void 0),B&256){p.ctx.deactivate(d);return}const G=B&1&&F,ie=!is(d);let J;if(ie&&(J=R&&R.onVnodeBeforeUnmount)&&at(J,p,d),B&6)Vs(d.component,g,v);else{if(B&128){d.suspense.unmount(g,v);return}G&&Yt(d,null,p,"beforeUnmount"),B&64?d.type.remove(d,p,g,L,v):w&&!w.hasOnce&&(y!==Ve||N>0&&N&64)?Ue(w,p,g,!1,!0):(y===Ve&&N&384||!b&&B&16)&&Ue(I,p,g),v&&dn(d)}(ie&&(J=R&&R.onVnodeUnmounted)||G)&&He(()=>{J&&at(J,p,d),G&&Yt(d,null,p,"unmounted")},g)},dn=d=>{const{type:p,el:g,anchor:v,transition:b}=d;if(p===Ve){pn(g,v);return}if(p===or){k(d);return}const y=()=>{i(g),b&&!b.persisted&&b.afterLeave&&b.afterLeave()};if(d.shapeFlag&1&&b&&!b.persisted){const{leave:R,delayLeave:T}=b,I=()=>R(g,y);T?T(d.el,y,I):I()}else y()},pn=(d,p)=>{let g;for(;d!==p;)g=f(d),i(d),d=g;i(p)},Vs=(d,p,g)=>{const{bum:v,scope:b,job:y,subTree:R,um:T,m:I,a:w}=d;Tl(I),Tl(w),v&&Qs(v),b.stop(),y&&(y.flags|=8,Ne(R,d,p,g)),T&&He(T,p),He(()=>{d.isUnmounted=!0},p)},Ue=(d,p,g,v=!1,b=!1,y=0)=>{for(let R=y;R<d.length;R++)Ne(d[R],p,g,v,b)},C=d=>{if(d.shapeFlag&6)return C(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const p=f(d.anchor||d.el),g=p&&p[qf];return g?f(g):p};let D=!1;const x=(d,p,g)=>{d==null?p._vnode&&Ne(p._vnode,null,null,!0):E(p._vnode||null,d,p,null,null,null,g),p._vnode=d,D||(D=!0,yl(),Nc(),D=!1)},L={p:E,um:Ne,m:it,r:dn,mt:Vn,mc:tt,pc:z,pbc:nt,n:C,o:t};return{render:x,hydrate:void 0,createApp:_d(x)}}function rr({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Qt({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Sd(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Xc(t,e,n=!1){const s=t.children,i=e.children;if(W(s)&&W(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=Mt(i[r]),l.el=o.el),!n&&l.patchFlag!==-2&&Xc(o,l)),l.type===Hi&&l.patchFlag!==-1&&(l.el=o.el),l.type===Nn&&!l.el&&(l.el=o.el)}}function Id(t){const e=t.slice(),n=[0];let s,i,r,o,l;const a=t.length;for(s=0;s<a;s++){const c=t[s];if(c!==0){if(i=n[n.length-1],t[i]<c){e[s]=i,n.push(s);continue}for(r=0,o=n.length-1;r<o;)l=r+o>>1,t[n[l]]<c?r=l+1:o=l;c<t[n[r]]&&(r>0&&(e[s]=n[r-1]),n[r]=s)}}for(r=n.length,o=n[r-1];r-- >0;)n[r]=o,o=e[o];return n}function Jc(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Jc(e)}function Tl(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Td=Symbol.for("v-scx"),Rd=()=>dt(Td);function Js(t,e,n){return Zc(t,e,n)}function Zc(t,e,n=ne){const{immediate:s,deep:i,flush:r,once:o}=n,l=Re({},n),a=e&&s||!e&&r!=="post";let c;if(Cs){if(r==="sync"){const _=Rd();c=_.__watcherHandles||(_.__watcherHandles=[])}else if(!a){const _=()=>{};return _.stop=ht,_.resume=ht,_.pause=ht,_}}const u=Te;l.call=(_,m,E)=>pt(_,u,m,E);let h=!1;r==="post"?l.scheduler=_=>{He(_,u&&u.suspense)}:r!=="sync"&&(h=!0,l.scheduler=(_,m)=>{m?_():Co(_)}),l.augmentJob=_=>{e&&(_.flags|=4),h&&(_.flags|=2,u&&(_.id=u.uid,_.i=u))};const f=Wf(t,e,l);return Cs&&(c?c.push(f):a&&f()),f}function xd(t,e,n){const s=this.proxy,i=de(t)?t.includes(".")?eu(s,t):()=>s[t]:t.bind(s,s);let r;U(e)?r=e:(r=e.handler,n=e);const o=Ms(this),l=Zc(i,r.bind(s),n);return o(),l}function eu(t,e){const n=e.split(".");return()=>{let s=t;for(let i=0;i<n.length&&s;i++)s=s[n[i]];return s}}const Ad=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Ke(e)}Modifiers`]||t[`${un(e)}Modifiers`];function Nd(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||ne;let i=n;const r=e.startsWith("update:"),o=r&&Ad(s,e.slice(7));o&&(o.trim&&(i=n.map(u=>de(u)?u.trim():u)),o.number&&(i=n.map(Sr)));let l,a=s[l=Zi(e)]||s[l=Zi(Ke(e))];!a&&r&&(a=s[l=Zi(un(e))]),a&&pt(a,t,6,i);const c=s[l+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,pt(c,t,6,i)}}const Pd=new WeakMap;function tu(t,e,n=!1){const s=n?Pd:e.emitsCache,i=s.get(t);if(i!==void 0)return i;const r=t.emits;let o={},l=!1;if(!U(t)){const a=c=>{const u=tu(c,e,!0);u&&(l=!0,Re(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!r&&!l?(ue(t)&&s.set(t,null),null):(W(r)?r.forEach(a=>o[a]=null):Re(o,r),ue(t)&&s.set(t,o),o)}function Bi(t,e){return!t||!Ai(e)?!1:(e=e.slice(2).replace(/Once$/,""),X(t,e[0].toLowerCase()+e.slice(1))||X(t,un(e))||X(t,e))}function Rl(t){const{type:e,vnode:n,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:a,render:c,renderCache:u,props:h,data:f,setupState:_,ctx:m,inheritAttrs:E}=t,A=ri(t);let O,P;try{if(n.shapeFlag&4){const k=i||s,ee=k;O=ut(c.call(ee,k,u,h,_,f,m)),P=l}else{const k=e;O=ut(k.length>1?k(h,{attrs:l,slots:o,emit:a}):k(h,null)),P=e.props?l:Od(l)}}catch(k){os.length=0,Li(k,t,1),O=_e(Nn)}let M=O;if(P&&E!==!1){const k=Object.keys(P),{shapeFlag:ee}=M;k.length&&ee&7&&(r&&k.some(ao)&&(P=Dd(P,r)),M=Pn(M,P,!1,!0))}return n.dirs&&(M=Pn(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&Eo(M,n.transition),O=M,ri(A),O}const Od=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ai(n))&&((e||(e={}))[n]=t[n]);return e},Dd=(t,e)=>{const n={};for(const s in t)(!ao(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function kd(t,e,n){const{props:s,children:i,component:r}=t,{props:o,children:l,patchFlag:a}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return s?xl(s,o,c):!!o;if(a&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==s[f]&&!Bi(c,f))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?xl(s,o,c):!0:!!o;return!1}function xl(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(e[r]!==t[r]&&!Bi(n,r))return!0}return!1}function Md({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const nu=t=>t.__isSuspense;function Ld(t,e){e&&e.pendingBranch?W(t)?e.effects.push(...t):e.effects.push(t):jf(t)}const Ve=Symbol.for("v-fgt"),Hi=Symbol.for("v-txt"),Nn=Symbol.for("v-cmt"),or=Symbol.for("v-stc"),os=[];let We=null;function qe(t=!1){os.push(We=t?null:[])}function Fd(){os.pop(),We=os[os.length-1]||null}let vs=1;function ai(t,e=!1){vs+=t,t<0&&We&&e&&(We.hasOnce=!0)}function Bd(t){return t.dynamicChildren=vs>0?We||En:null,Fd(),vs>0&&We&&We.push(t),t}function Ge(t,e,n,s,i,r){return Bd(ce(t,e,n,s,i,r,!0))}function ci(t){return t?t.__v_isVNode===!0:!1}function Gn(t,e){return t.type===e.type&&t.key===e.key}const su=({key:t})=>t??null,Zs=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?de(t)||Ce(t)||U(t)?{i:$e,r:t,k:e,f:!!n}:t:null);function ce(t,e=null,n=null,s=0,i=null,r=t===Ve?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&su(e),ref:e&&Zs(e),scopeId:Oc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:$e};return l?(Io(a,n),r&128&&t.normalize(a)):n&&(a.shapeFlag|=de(n)?8:16),vs>0&&!o&&We&&(a.patchFlag>0||r&6)&&a.patchFlag!==32&&We.push(a),a}const _e=Hd;function Hd(t,e=null,n=null,s=0,i=null,r=!1){if((!t||t===od)&&(t=Nn),ci(t)){const l=Pn(t,e,!0);return n&&Io(l,n),vs>0&&!r&&We&&(l.shapeFlag&6?We[We.indexOf(t)]=l:We.push(l)),l.patchFlag=-2,l}if(Xd(t)&&(t=t.__vccOpts),e){e=$d(e);let{class:l,style:a}=e;l&&!de(l)&&(e.class=Ds(l)),ue(a)&&(vo(a)&&!W(a)&&(a=Re({},a)),e.style=ho(a))}const o=de(t)?1:nu(t)?128:Gf(t)?64:ue(t)?4:U(t)?2:0;return ce(t,e,n,s,i,o,r,!0)}function $d(t){return t?vo(t)||qc(t)?Re({},t):t:null}function Pn(t,e,n=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:a}=t,c=e?Wd(i||{},e):i,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&su(c),ref:e&&e.ref?n&&r?W(r)?r.concat(Zs(e)):[r,Zs(e)]:Zs(e):r,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ve?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:a,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Pn(t.ssContent),ssFallback:t.ssFallback&&Pn(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return a&&s&&Eo(u,a.clone(u)),u}function iu(t=" ",e=0){return _e(Hi,null,t,e)}function ut(t){return t==null||typeof t=="boolean"?_e(Nn):W(t)?_e(Ve,null,t.slice()):ci(t)?Mt(t):_e(Hi,null,String(t))}function Mt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Pn(t)}function Io(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(W(e))n=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),Io(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!qc(e)?e._ctx=$e:i===3&&$e&&($e.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else U(e)?(e={default:e,_ctx:$e},n=32):(e=String(e),s&64?(n=16,e=[iu(e)]):n=8);t.children=e,t.shapeFlag|=n}function Wd(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=Ds([e.class,s.class]));else if(i==="style")e.style=ho([e.style,s.style]);else if(Ai(i)){const r=e[i],o=s[i];o&&r!==o&&!(W(r)&&r.includes(o))&&(e[i]=r?[].concat(r,o):o)}else i!==""&&(e[i]=s[i])}return e}function at(t,e,n,s=null){pt(t,e,7,[n,s])}const Ud=Uc();let Vd=0;function jd(t,e,n){const s=t.type,i=(e?e.appContext:t.appContext)||Ud,r={uid:Vd++,vnode:t,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new pf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Kc(s,i),emitsOptions:tu(s,i),emit:null,emitted:null,propsDefaults:ne,inheritAttrs:s.inheritAttrs,ctx:ne,data:ne,props:ne,attrs:ne,slots:ne,refs:ne,setupState:ne,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Nd.bind(null,r),t.ce&&t.ce(r),r}let Te=null;const qd=()=>Te||$e;let ui,Mr;{const t=Di(),e=(n,s)=>{let i;return(i=t[n])||(i=t[n]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};ui=e("__VUE_INSTANCE_SETTERS__",n=>Te=n),Mr=e("__VUE_SSR_SETTERS__",n=>Cs=n)}const Ms=t=>{const e=Te;return ui(t),t.scope.on(),()=>{t.scope.off(),ui(e)}},Al=()=>{Te&&Te.scope.off(),ui(null)};function ru(t){return t.vnode.shapeFlag&4}let Cs=!1;function Gd(t,e=!1,n=!1){e&&Mr(e);const{props:s,children:i}=t.vnode,r=ru(t);gd(t,s,r,e),Cd(t,i,n||e);const o=r?Kd(t,e):void 0;return e&&Mr(!1),o}function Kd(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,ad);const{setup:s}=n;if(s){wt();const i=t.setupContext=s.length>1?Yd(t):null,r=Ms(t),o=ks(s,t,0,[t.props,i]),l=sc(o);if(St(),r(),(l||t.sp)&&!is(t)&&kc(t),l){if(o.then(Al,Al),e)return o.then(a=>{Nl(t,a)}).catch(a=>{Li(a,t,0)});t.asyncDep=o}else Nl(t,o)}else ou(t)}function Nl(t,e,n){U(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ue(e)&&(t.setupState=Tc(e)),ou(t)}function ou(t,e,n){const s=t.type;t.render||(t.render=s.render||ht);{const i=Ms(t);wt();try{cd(t)}finally{St(),i()}}}const zd={get(t,e){return Se(t,"get",""),t[e]}};function Yd(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,zd),slots:t.slots,emit:t.emit,expose:e}}function $i(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Tc(kf(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in rs)return rs[n](t)},has(e,n){return n in e||n in rs}})):t.proxy}function Qd(t,e=!0){return U(t)?t.displayName||t.name:t.name||e&&t.__name}function Xd(t){return U(t)&&"__vccOpts"in t}const ze=(t,e)=>Hf(t,e,Cs);function lu(t,e,n){try{ai(-1);const s=arguments.length;return s===2?ue(e)&&!W(e)?ci(e)?_e(t,null,[e]):_e(t,e):_e(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&ci(n)&&(n=[n]),_e(t,e,n))}finally{ai(1)}}const Jd="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Lr;const Pl=typeof window<"u"&&window.trustedTypes;if(Pl)try{Lr=Pl.createPolicy("vue",{createHTML:t=>t})}catch{}const au=Lr?t=>Lr.createHTML(t):t=>t,Zd="http://www.w3.org/2000/svg",ep="http://www.w3.org/1998/Math/MathML",yt=typeof document<"u"?document:null,Ol=yt&&yt.createElement("template"),tp={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const i=e==="svg"?yt.createElementNS(Zd,t):e==="mathml"?yt.createElementNS(ep,t):n?yt.createElement(t,{is:n}):yt.createElement(t);return t==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:t=>yt.createTextNode(t),createComment:t=>yt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>yt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,i,r){const o=n?n.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===r||!(i=i.nextSibling)););else{Ol.innerHTML=au(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const l=Ol.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},np=Symbol("_vtc");function sp(t,e,n){const s=t[np];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Dl=Symbol("_vod"),ip=Symbol("_vsh"),rp=Symbol(""),op=/(?:^|;)\s*display\s*:/;function lp(t,e,n){const s=t.style,i=de(n);let r=!1;if(n&&!i){if(e)if(de(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&ei(s,l,"")}else for(const o in e)n[o]==null&&ei(s,o,"");for(const o in n)o==="display"&&(r=!0),ei(s,o,n[o])}else if(i){if(e!==n){const o=s[rp];o&&(n+=";"+o),s.cssText=n,r=op.test(n)}}else e&&t.removeAttribute("style");Dl in t&&(t[Dl]=r?s.display:"",t[ip]&&(s.display="none"))}const kl=/\s*!important$/;function ei(t,e,n){if(W(n))n.forEach(s=>ei(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=ap(t,e);kl.test(n)?t.setProperty(un(s),n.replace(kl,""),"important"):t[s]=n}}const Ml=["Webkit","Moz","ms"],lr={};function ap(t,e){const n=lr[e];if(n)return n;let s=Ke(e);if(s!=="filter"&&s in t)return lr[e]=s;s=Oi(s);for(let i=0;i<Ml.length;i++){const r=Ml[i]+s;if(r in t)return lr[e]=r}return e}const Ll="http://www.w3.org/1999/xlink";function Fl(t,e,n,s,i,r=df(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Ll,e.slice(6,e.length)):t.setAttributeNS(Ll,e,n):n==null||r&&!lc(n)?t.removeAttribute(e):t.setAttribute(e,r?"":qt(n)?String(n):n)}function Bl(t,e,n,s,i){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?au(n):n);return}const r=t.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?t.getAttribute("value")||"":t.value,a=n==null?t.type==="checkbox"?"on":"":String(n);(l!==a||!("_value"in t))&&(t.value=a),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=lc(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(i||e)}function yn(t,e,n,s){t.addEventListener(e,n,s)}function cp(t,e,n,s){t.removeEventListener(e,n,s)}const Hl=Symbol("_vei");function up(t,e,n,s,i=null){const r=t[Hl]||(t[Hl]={}),o=r[e];if(s&&o)o.value=s;else{const[l,a]=hp(e);if(s){const c=r[e]=pp(s,i);yn(t,l,c,a)}else o&&(cp(t,l,o,a),r[e]=void 0)}}const $l=/(?:Once|Passive|Capture)$/;function hp(t){let e;if($l.test(t)){e={};let s;for(;s=t.match($l);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):un(t.slice(2)),e]}let ar=0;const fp=Promise.resolve(),dp=()=>ar||(fp.then(()=>ar=0),ar=Date.now());function pp(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;pt(_p(s,n.value),e,5,[s])};return n.value=t,n.attached=dp(),n}function _p(t,e){if(W(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>i=>!i._stopped&&s&&s(i))}else return e}const Wl=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,gp=(t,e,n,s,i,r)=>{const o=i==="svg";e==="class"?sp(t,s,o):e==="style"?lp(t,n,s):Ai(e)?ao(e)||up(t,e,n,s,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):mp(t,e,s,o))?(Bl(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Fl(t,e,s,o,r,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!de(s))?Bl(t,Ke(e),s,r,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Fl(t,e,s,o))};function mp(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Wl(e)&&U(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=t.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Wl(e)&&de(n)?!1:e in t}const Ul=t=>{const e=t.props["onUpdate:modelValue"]||!1;return W(e)?n=>Qs(e,n):e};function yp(t){t.target.composing=!0}function Vl(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const cr=Symbol("_assign"),Fr={created(t,{modifiers:{lazy:e,trim:n,number:s}},i){t[cr]=Ul(i);const r=s||i.props&&i.props.type==="number";yn(t,e?"change":"input",o=>{if(o.target.composing)return;let l=t.value;n&&(l=l.trim()),r&&(l=Sr(l)),t[cr](l)}),n&&yn(t,"change",()=>{t.value=t.value.trim()}),e||(yn(t,"compositionstart",yp),yn(t,"compositionend",Vl),yn(t,"change",Vl))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:i,number:r}},o){if(t[cr]=Ul(o),t.composing)return;const l=(r||t.type==="number")&&!/^0\d/.test(t.value)?Sr(t.value):t.value,a=e??"";l!==a&&(document.activeElement===t&&t.type!=="range"&&(s&&e===n||i&&t.value.trim()===a)||(t.value=a))}},vp=Re({patchProp:gp},tp);let jl;function Cp(){return jl||(jl=bd(vp))}const Ep=((...t)=>{const e=Cp().createApp(...t),{mount:n}=e;return e.mount=s=>{const i=wp(s);if(!i)return;const r=e._component;!U(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=n(i,!1,bp(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e});function bp(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function wp(t){return de(t)?document.querySelector(t):t}/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const vn=typeof document<"u";function cu(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function Sp(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&cu(t.default)}const Y=Object.assign;function ur(t,e){const n={};for(const s in e){const i=e[s];n[s]=et(i)?i.map(t):t(i)}return n}const ls=()=>{},et=Array.isArray,uu=/#/g,Ip=/&/g,Tp=/\//g,Rp=/=/g,xp=/\?/g,hu=/\+/g,Ap=/%5B/g,Np=/%5D/g,fu=/%5E/g,Pp=/%60/g,du=/%7B/g,Op=/%7C/g,pu=/%7D/g,Dp=/%20/g;function To(t){return encodeURI(""+t).replace(Op,"|").replace(Ap,"[").replace(Np,"]")}function kp(t){return To(t).replace(du,"{").replace(pu,"}").replace(fu,"^")}function Br(t){return To(t).replace(hu,"%2B").replace(Dp,"+").replace(uu,"%23").replace(Ip,"%26").replace(Pp,"`").replace(du,"{").replace(pu,"}").replace(fu,"^")}function Mp(t){return Br(t).replace(Rp,"%3D")}function Lp(t){return To(t).replace(uu,"%23").replace(xp,"%3F")}function Fp(t){return t==null?"":Lp(t).replace(Tp,"%2F")}function Es(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const Bp=/\/$/,Hp=t=>t.replace(Bp,"");function hr(t,e,n="/"){let s,i={},r="",o="";const l=e.indexOf("#");let a=e.indexOf("?");return l<a&&l>=0&&(a=-1),a>-1&&(s=e.slice(0,a),r=e.slice(a+1,l>-1?l:e.length),i=t(r)),l>-1&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=Vp(s??e,n),{fullPath:s+(r&&"?")+r+o,path:s,query:i,hash:Es(o)}}function $p(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function ql(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function Wp(t,e,n){const s=e.matched.length-1,i=n.matched.length-1;return s>-1&&s===i&&On(e.matched[s],n.matched[i])&&_u(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function On(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function _u(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!Up(t[n],e[n]))return!1;return!0}function Up(t,e){return et(t)?Gl(t,e):et(e)?Gl(e,t):t===e}function Gl(t,e){return et(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function Vp(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),i=s[s.length-1];(i===".."||i===".")&&s.push("");let r=n.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")r>1&&r--;else break;return n.slice(0,r).join("/")+"/"+s.slice(o).join("/")}const Dt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var bs;(function(t){t.pop="pop",t.push="push"})(bs||(bs={}));var as;(function(t){t.back="back",t.forward="forward",t.unknown=""})(as||(as={}));function jp(t){if(!t)if(vn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Hp(t)}const qp=/^[^#]+#/;function Gp(t,e){return t.replace(qp,"#")+e}function Kp(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const Wi=()=>({left:window.scrollX,top:window.scrollY});function zp(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;e=Kp(i,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Kl(t,e){return(history.state?history.state.position-e:-1)+t}const Hr=new Map;function Yp(t,e){Hr.set(t,e)}function Qp(t){const e=Hr.get(t);return Hr.delete(t),e}let Xp=()=>location.protocol+"//"+location.host;function gu(t,e){const{pathname:n,search:s,hash:i}=e,r=t.indexOf("#");if(r>-1){let l=i.includes(t.slice(r))?t.slice(r).length:1,a=i.slice(l);return a[0]!=="/"&&(a="/"+a),ql(a,"")}return ql(n,t)+s+i}function Jp(t,e,n,s){let i=[],r=[],o=null;const l=({state:f})=>{const _=gu(t,location),m=n.value,E=e.value;let A=0;if(f){if(n.value=_,e.value=f,o&&o===m){o=null;return}A=E?f.position-E.position:0}else s(_);i.forEach(O=>{O(n.value,m,{delta:A,type:bs.pop,direction:A?A>0?as.forward:as.back:as.unknown})})};function a(){o=n.value}function c(f){i.push(f);const _=()=>{const m=i.indexOf(f);m>-1&&i.splice(m,1)};return r.push(_),_}function u(){const{history:f}=window;f.state&&f.replaceState(Y({},f.state,{scroll:Wi()}),"")}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:a,listen:c,destroy:h}}function zl(t,e,n,s=!1,i=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:i?Wi():null}}function Zp(t){const{history:e,location:n}=window,s={value:gu(t,n)},i={value:e.state};i.value||r(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(a,c,u){const h=t.indexOf("#"),f=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+a:Xp()+t+a;try{e[u?"replaceState":"pushState"](c,"",f),i.value=c}catch(_){console.error(_),n[u?"replace":"assign"](f)}}function o(a,c){const u=Y({},e.state,zl(i.value.back,a,i.value.forward,!0),c,{position:i.value.position});r(a,u,!0),s.value=a}function l(a,c){const u=Y({},i.value,e.state,{forward:a,scroll:Wi()});r(u.current,u,!0);const h=Y({},zl(s.value,a,null),{position:u.position+1},c);r(a,h,!1),s.value=a}return{location:s,state:i,push:l,replace:o}}function e_(t){t=jp(t);const e=Zp(t),n=Jp(t,e.state,e.location,e.replace);function s(r,o=!0){o||n.pauseListeners(),history.go(r)}const i=Y({location:"",base:t,go:s,createHref:Gp.bind(null,t)},e,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function t_(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),e_(t)}function n_(t){return typeof t=="string"||t&&typeof t=="object"}function mu(t){return typeof t=="string"||typeof t=="symbol"}const yu=Symbol("");var Yl;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Yl||(Yl={}));function Dn(t,e){return Y(new Error,{type:t,[yu]:!0},e)}function mt(t,e){return t instanceof Error&&yu in t&&(e==null||!!(t.type&e))}const Ql="[^/]+?",s_={sensitive:!1,strict:!1,start:!0,end:!0},i_=/[.+*?^${}()[\]/\\]/g;function r_(t,e){const n=Y({},s_,e),s=[];let i=n.start?"^":"";const r=[];for(const c of t){const u=c.length?[]:[90];n.strict&&!c.length&&(i+="/");for(let h=0;h<c.length;h++){const f=c[h];let _=40+(n.sensitive?.25:0);if(f.type===0)h||(i+="/"),i+=f.value.replace(i_,"\\$&"),_+=40;else if(f.type===1){const{value:m,repeatable:E,optional:A,regexp:O}=f;r.push({name:m,repeatable:E,optional:A});const P=O||Ql;if(P!==Ql){_+=10;try{new RegExp(`(${P})`)}catch(k){throw new Error(`Invalid custom RegExp for param "${m}" (${P}): `+k.message)}}let M=E?`((?:${P})(?:/(?:${P}))*)`:`(${P})`;h||(M=A&&c.length<2?`(?:/${M})`:"/"+M),A&&(M+="?"),i+=M,_+=20,A&&(_+=-8),E&&(_+=-20),P===".*"&&(_+=-50)}u.push(_)}s.push(u)}if(n.strict&&n.end){const c=s.length-1;s[c][s[c].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function l(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const _=u[f]||"",m=r[f-1];h[m.name]=_&&m.repeatable?_.split("/"):_}return h}function a(c){let u="",h=!1;for(const f of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const _ of f)if(_.type===0)u+=_.value;else if(_.type===1){const{value:m,repeatable:E,optional:A}=_,O=m in c?c[m]:"";if(et(O)&&!E)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const P=et(O)?O.join("/"):O;if(!P)if(A)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${m}"`);u+=P}}return u||"/"}return{re:o,score:s,keys:r,parse:l,stringify:a}}function o_(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function vu(t,e){let n=0;const s=t.score,i=e.score;for(;n<s.length&&n<i.length;){const r=o_(s[n],i[n]);if(r)return r;n++}if(Math.abs(i.length-s.length)===1){if(Xl(s))return 1;if(Xl(i))return-1}return i.length-s.length}function Xl(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const l_={type:0,value:""},a_=/[a-zA-Z0-9_]/;function c_(t){if(!t)return[[]];if(t==="/")return[[l_]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${c}": ${_}`)}let n=0,s=n;const i=[];let r;function o(){r&&i.push(r),r=[]}let l=0,a,c="",u="";function h(){c&&(n===0?r.push({type:0,value:c}):n===1||n===2||n===3?(r.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:c,regexp:u,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=a}for(;l<t.length;){if(a=t[l++],a==="\\"&&n!==2){s=n,n=4;continue}switch(n){case 0:a==="/"?(c&&h(),o()):a===":"?(h(),n=1):f();break;case 4:f(),n=s;break;case 1:a==="("?n=2:a_.test(a)?f():(h(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case 2:a===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:h(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&l--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),i}function u_(t,e,n){const s=r_(c_(t.path),n),i=Y(s,{record:t,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function h_(t,e){const n=[],s=new Map;e=ta({strict:!1,end:!0,sensitive:!1},e);function i(h){return s.get(h)}function r(h,f,_){const m=!_,E=Zl(h);E.aliasOf=_&&_.record;const A=ta(e,h),O=[E];if("alias"in h){const k=typeof h.alias=="string"?[h.alias]:h.alias;for(const ee of k)O.push(Zl(Y({},E,{components:_?_.record.components:E.components,path:ee,aliasOf:_?_.record:E})))}let P,M;for(const k of O){const{path:ee}=k;if(f&&ee[0]!=="/"){const Ee=f.record.path,he=Ee[Ee.length-1]==="/"?"":"/";k.path=f.record.path+(ee&&he+ee)}if(P=u_(k,f,A),_?_.alias.push(P):(M=M||P,M!==P&&M.alias.push(P),m&&h.name&&!ea(P)&&o(h.name)),Cu(P)&&a(P),E.children){const Ee=E.children;for(let he=0;he<Ee.length;he++)r(Ee[he],P,_&&_.children[he])}_=_||P}return M?()=>{o(M)}:ls}function o(h){if(mu(h)){const f=s.get(h);f&&(s.delete(h),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(h);f>-1&&(n.splice(f,1),h.record.name&&s.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function l(){return n}function a(h){const f=p_(h,n);n.splice(f,0,h),h.record.name&&!ea(h)&&s.set(h.record.name,h)}function c(h,f){let _,m={},E,A;if("name"in h&&h.name){if(_=s.get(h.name),!_)throw Dn(1,{location:h});A=_.record.name,m=Y(Jl(f.params,_.keys.filter(M=>!M.optional).concat(_.parent?_.parent.keys.filter(M=>M.optional):[]).map(M=>M.name)),h.params&&Jl(h.params,_.keys.map(M=>M.name))),E=_.stringify(m)}else if(h.path!=null)E=h.path,_=n.find(M=>M.re.test(E)),_&&(m=_.parse(E),A=_.record.name);else{if(_=f.name?s.get(f.name):n.find(M=>M.re.test(f.path)),!_)throw Dn(1,{location:h,currentLocation:f});A=_.record.name,m=Y({},f.params,h.params),E=_.stringify(m)}const O=[];let P=_;for(;P;)O.unshift(P.record),P=P.parent;return{name:A,path:E,params:m,matched:O,meta:d_(O)}}t.forEach(h=>r(h));function u(){n.length=0,s.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:l,getRecordMatcher:i}}function Jl(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function Zl(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:f_(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function f_(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function ea(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function d_(t){return t.reduce((e,n)=>Y(e,n.meta),{})}function ta(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}function p_(t,e){let n=0,s=e.length;for(;n!==s;){const r=n+s>>1;vu(t,e[r])<0?s=r:n=r+1}const i=__(t);return i&&(s=e.lastIndexOf(i,s-1)),s}function __(t){let e=t;for(;e=e.parent;)if(Cu(e)&&vu(t,e)===0)return e}function Cu({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function g_(t){const e={};if(t===""||t==="?")return e;const s=(t[0]==="?"?t.slice(1):t).split("&");for(let i=0;i<s.length;++i){const r=s[i].replace(hu," "),o=r.indexOf("="),l=Es(o<0?r:r.slice(0,o)),a=o<0?null:Es(r.slice(o+1));if(l in e){let c=e[l];et(c)||(c=e[l]=[c]),c.push(a)}else e[l]=a}return e}function na(t){let e="";for(let n in t){const s=t[n];if(n=Mp(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(et(s)?s.map(r=>r&&Br(r)):[s&&Br(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function m_(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=et(s)?s.map(i=>i==null?null:""+i):s==null?s:""+s)}return e}const y_=Symbol(""),sa=Symbol(""),Ro=Symbol(""),xo=Symbol(""),$r=Symbol("");function Kn(){let t=[];function e(s){return t.push(s),()=>{const i=t.indexOf(s);i>-1&&t.splice(i,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Lt(t,e,n,s,i,r=o=>o()){const o=s&&(s.enterCallbacks[i]=s.enterCallbacks[i]||[]);return()=>new Promise((l,a)=>{const c=f=>{f===!1?a(Dn(4,{from:n,to:e})):f instanceof Error?a(f):n_(f)?a(Dn(2,{from:e,to:f})):(o&&s.enterCallbacks[i]===o&&typeof f=="function"&&o.push(f),l())},u=r(()=>t.call(s&&s.instances[i],e,n,c));let h=Promise.resolve(u);t.length<3&&(h=h.then(c)),h.catch(f=>a(f))})}function fr(t,e,n,s,i=r=>r()){const r=[];for(const o of t)for(const l in o.components){let a=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(cu(a)){const u=(a.__vccOpts||a)[e];u&&r.push(Lt(u,n,s,o,l,i))}else{let c=a();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const h=Sp(u)?u.default:u;o.mods[l]=u,o.components[l]=h;const _=(h.__vccOpts||h)[e];return _&&Lt(_,n,s,o,l,i)()}))}}return r}function ia(t){const e=dt(Ro),n=dt(xo),s=ze(()=>{const a=ft(t.to);return e.resolve(a)}),i=ze(()=>{const{matched:a}=s.value,{length:c}=a,u=a[c-1],h=n.matched;if(!u||!h.length)return-1;const f=h.findIndex(On.bind(null,u));if(f>-1)return f;const _=ra(a[c-2]);return c>1&&ra(u)===_&&h[h.length-1].path!==_?h.findIndex(On.bind(null,a[c-2])):f}),r=ze(()=>i.value>-1&&w_(n.params,s.value.params)),o=ze(()=>i.value>-1&&i.value===n.matched.length-1&&_u(n.params,s.value.params));function l(a={}){if(b_(a)){const c=e[ft(t.replace)?"replace":"push"](ft(t.to)).catch(ls);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:s,href:ze(()=>s.value.href),isActive:r,isExactActive:o,navigate:l}}function v_(t){return t.length===1?t[0]:t}const C_=Dc({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:ia,setup(t,{slots:e}){const n=Mi(ia(t)),{options:s}=dt(Ro),i=ze(()=>({[oa(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[oa(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const r=e.default&&v_(e.default(n));return t.custom?r:lu("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},r)}}}),E_=C_;function b_(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function w_(t,e){for(const n in e){const s=e[n],i=t[n];if(typeof s=="string"){if(s!==i)return!1}else if(!et(i)||i.length!==s.length||s.some((r,o)=>r!==i[o]))return!1}return!0}function ra(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const oa=(t,e,n)=>t??e??n,S_=Dc({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=dt($r),i=ze(()=>t.route||s.value),r=dt(sa,0),o=ze(()=>{let c=ft(r);const{matched:u}=i.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),l=ze(()=>i.value.matched[o.value]);Xs(sa,ze(()=>o.value+1)),Xs(y_,l),Xs($r,i);const a=Ft();return Js(()=>[a.value,l.value,t.name],([c,u,h],[f,_,m])=>{u&&(u.instances[h]=c,_&&_!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=_.leaveGuards),u.updateGuards.size||(u.updateGuards=_.updateGuards))),c&&u&&(!_||!On(u,_)||!f)&&(u.enterCallbacks[h]||[]).forEach(E=>E(c))},{flush:"post"}),()=>{const c=i.value,u=t.name,h=l.value,f=h&&h.components[u];if(!f)return la(n.default,{Component:f,route:c});const _=h.props[u],m=_?_===!0?c.params:typeof _=="function"?_(c):_:null,A=lu(f,Y({},m,e,{onVnodeUnmounted:O=>{O.component.isUnmounted&&(h.instances[u]=null)},ref:a}));return la(n.default,{Component:A,route:c})||A}}});function la(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const I_=S_;function T_(t){const e=h_(t.routes,t),n=t.parseQuery||g_,s=t.stringifyQuery||na,i=t.history,r=Kn(),o=Kn(),l=Kn(),a=Mf(Dt);let c=Dt;vn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=ur.bind(null,C=>""+C),h=ur.bind(null,Fp),f=ur.bind(null,Es);function _(C,D){let x,L;return mu(C)?(x=e.getRecordMatcher(C),L=D):L=C,e.addRoute(L,x)}function m(C){const D=e.getRecordMatcher(C);D&&e.removeRoute(D)}function E(){return e.getRoutes().map(C=>C.record)}function A(C){return!!e.getRecordMatcher(C)}function O(C,D){if(D=Y({},D||a.value),typeof C=="string"){const g=hr(n,C,D.path),v=e.resolve({path:g.path},D),b=i.createHref(g.fullPath);return Y(g,v,{params:f(v.params),hash:Es(g.hash),redirectedFrom:void 0,href:b})}let x;if(C.path!=null)x=Y({},C,{path:hr(n,C.path,D.path).path});else{const g=Y({},C.params);for(const v in g)g[v]==null&&delete g[v];x=Y({},C,{params:h(g)}),D.params=h(D.params)}const L=e.resolve(x,D),te=C.hash||"";L.params=u(f(L.params));const d=$p(s,Y({},C,{hash:kp(te),path:L.path})),p=i.createHref(d);return Y({fullPath:d,hash:te,query:s===na?m_(C.query):C.query||{}},L,{redirectedFrom:void 0,href:p})}function P(C){return typeof C=="string"?hr(n,C,a.value.path):Y({},C)}function M(C,D){if(c!==C)return Dn(8,{from:D,to:C})}function k(C){return he(C)}function ee(C){return k(Y(P(C),{replace:!0}))}function Ee(C){const D=C.matched[C.matched.length-1];if(D&&D.redirect){const{redirect:x}=D;let L=typeof x=="function"?x(C):x;return typeof L=="string"&&(L=L.includes("?")||L.includes("#")?L=P(L):{path:L},L.params={}),Y({query:C.query,hash:C.hash,params:L.path!=null?{}:C.params},L)}}function he(C,D){const x=c=O(C),L=a.value,te=C.state,d=C.force,p=C.replace===!0,g=Ee(x);if(g)return he(Y(P(g),{state:typeof g=="object"?Y({},te,g.state):te,force:d,replace:p}),D||x);const v=x;v.redirectedFrom=D;let b;return!d&&Wp(s,L,x)&&(b=Dn(16,{to:v,from:L}),it(L,L,!0,!1)),(b?Promise.resolve(b):nt(v,L)).catch(y=>mt(y)?mt(y,2)?y:Ot(y):z(y,v,L)).then(y=>{if(y){if(mt(y,2))return he(Y({replace:p},P(y.to),{state:typeof y.to=="object"?Y({},te,y.to.state):te,force:d}),D||v)}else y=zt(v,L,!0,p,te);return Pt(v,L,y),y})}function tt(C,D){const x=M(C,D);return x?Promise.reject(x):Promise.resolve()}function Nt(C){const D=pn.values().next().value;return D&&typeof D.runWithContext=="function"?D.runWithContext(C):C()}function nt(C,D){let x;const[L,te,d]=R_(C,D);x=fr(L.reverse(),"beforeRouteLeave",C,D);for(const g of L)g.leaveGuards.forEach(v=>{x.push(Lt(v,C,D))});const p=tt.bind(null,C,D);return x.push(p),Ue(x).then(()=>{x=[];for(const g of r.list())x.push(Lt(g,C,D));return x.push(p),Ue(x)}).then(()=>{x=fr(te,"beforeRouteUpdate",C,D);for(const g of te)g.updateGuards.forEach(v=>{x.push(Lt(v,C,D))});return x.push(p),Ue(x)}).then(()=>{x=[];for(const g of d)if(g.beforeEnter)if(et(g.beforeEnter))for(const v of g.beforeEnter)x.push(Lt(v,C,D));else x.push(Lt(g.beforeEnter,C,D));return x.push(p),Ue(x)}).then(()=>(C.matched.forEach(g=>g.enterCallbacks={}),x=fr(d,"beforeRouteEnter",C,D,Nt),x.push(p),Ue(x))).then(()=>{x=[];for(const g of o.list())x.push(Lt(g,C,D));return x.push(p),Ue(x)}).catch(g=>mt(g,8)?g:Promise.reject(g))}function Pt(C,D,x){l.list().forEach(L=>Nt(()=>L(C,D,x)))}function zt(C,D,x,L,te){const d=M(C,D);if(d)return d;const p=D===Dt,g=vn?history.state:{};x&&(L||p?i.replace(C.fullPath,Y({scroll:p&&g&&g.scroll},te)):i.push(C.fullPath,te)),a.value=C,it(C,D,x,p),Ot()}let st;function Vn(){st||(st=i.listen((C,D,x)=>{if(!Vs.listening)return;const L=O(C),te=Ee(L);if(te){he(Y(te,{replace:!0,force:!0}),L).catch(ls);return}c=L;const d=a.value;vn&&Yp(Kl(d.fullPath,x.delta),Wi()),nt(L,d).catch(p=>mt(p,12)?p:mt(p,2)?(he(Y(P(p.to),{force:!0}),L).then(g=>{mt(g,20)&&!x.delta&&x.type===bs.pop&&i.go(-1,!1)}).catch(ls),Promise.reject()):(x.delta&&i.go(-x.delta,!1),z(p,L,d))).then(p=>{p=p||zt(L,d,!1),p&&(x.delta&&!mt(p,8)?i.go(-x.delta,!1):x.type===bs.pop&&mt(p,20)&&i.go(-1,!1)),Pt(L,d,p)}).catch(ls)}))}let fn=Kn(),ge=Kn(),Z;function z(C,D,x){Ot(C);const L=ge.list();return L.length?L.forEach(te=>te(C,D,x)):console.error(C),Promise.reject(C)}function _t(){return Z&&a.value!==Dt?Promise.resolve():new Promise((C,D)=>{fn.add([C,D])})}function Ot(C){return Z||(Z=!C,Vn(),fn.list().forEach(([D,x])=>C?x(C):D()),fn.reset()),C}function it(C,D,x,L){const{scrollBehavior:te}=t;if(!vn||!te)return Promise.resolve();const d=!x&&Qp(Kl(C.fullPath,0))||(L||!x)&&history.state&&history.state.scroll||null;return xc().then(()=>te(C,D,d)).then(p=>p&&zp(p)).catch(p=>z(p,C,D))}const Ne=C=>i.go(C);let dn;const pn=new Set,Vs={currentRoute:a,listening:!0,addRoute:_,removeRoute:m,clearRoutes:e.clearRoutes,hasRoute:A,getRoutes:E,resolve:O,options:t,push:k,replace:ee,go:Ne,back:()=>Ne(-1),forward:()=>Ne(1),beforeEach:r.add,beforeResolve:o.add,afterEach:l.add,onError:ge.add,isReady:_t,install(C){const D=this;C.component("RouterLink",E_),C.component("RouterView",I_),C.config.globalProperties.$router=D,Object.defineProperty(C.config.globalProperties,"$route",{enumerable:!0,get:()=>ft(a)}),vn&&!dn&&a.value===Dt&&(dn=!0,k(i.location).catch(te=>{}));const x={};for(const te in Dt)Object.defineProperty(x,te,{get:()=>a.value[te],enumerable:!0});C.provide(Ro,D),C.provide(xo,Sc(x)),C.provide($r,a);const L=C.unmount;pn.add(C),C.unmount=function(){pn.delete(C),pn.size<1&&(c=Dt,st&&st(),st=null,a.value=Dt,dn=!1,Z=!1),L()}}};function Ue(C){return C.reduce((D,x)=>D.then(()=>Nt(x)),Promise.resolve())}return Vs}function R_(t,e){const n=[],s=[],i=[],r=Math.max(e.matched.length,t.matched.length);for(let o=0;o<r;o++){const l=e.matched[o];l&&(t.matched.find(c=>On(c,l))?s.push(l):n.push(l));const a=t.matched[o];a&&(e.matched.find(c=>On(c,a))||i.push(a))}return[n,s,i]}function Eu(t){return dt(xo)}const Bn=(t,e)=>{const n=t.__vccOpts||t;for(const[s,i]of e)n[s]=i;return n},x_={id:"poker-table-container"},A_={class:"vote-user"},N_={__name:"PokerTable",props:{votes:{type:Object,default:{}}},setup(t){return(e,n)=>(qe(),Ge("div",x_,[(qe(!0),Ge(Ve,null,Hc(t.votes,(s,i)=>(qe(),Ge("div",{class:"vote-container",key:i},[ce("div",{class:Ds(["vote-value",{voted:s.hasVoted===!0&&s.cardValue===""}])},_s(s.cardValue),3),ce("div",A_,_s(i),1)]))),128))]))}},bu=Bn(N_,[["__scopeId","data-v-9af2a568"]]),P_={id:"cards-deck-container"},O_=["onClick"],D_={__name:"CardsDeck",props:{values:{type:[String,Array],default:["default"]},selectedValue:{type:String,default:null}},setup(t){return(e,n)=>(qe(),Ge("div",P_,[(qe(!0),Ge(Ve,null,Hc(t.values,(s,i)=>(qe(),Ge("div",{class:Ds(["option-card",{selected:t.selectedValue===s}]),key:i,onClick:r=>e.$emit("selectCard",s)},_s(s),11,O_))),128))]))}},wu=Bn(D_,[["__scopeId","data-v-4110fd0d"]]),k_=()=>{};var aa={};/**
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
 */const Su={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const S=function(t,e){if(!t)throw Hn(e)},Hn=function(t){return new Error("Firebase Database ("+Su.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Iu=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},M_=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],l=t[n++],a=((i&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(a>>10)),e[s++]=String.fromCharCode(56320+(a&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ao={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,l=o?t[i+1]:0,a=i+2<t.length,c=a?t[i+2]:0,u=r>>2,h=(r&3)<<4|l>>4;let f=(l&15)<<2|c>>6,_=c&63;a||(_=64,o||(f=64)),s.push(n[u],n[h],n[f],n[_])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Iu(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):M_(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||l==null||c==null||h==null)throw new L_;const f=r<<2|l>>4;if(s.push(f),c!==64){const _=l<<4&240|c>>2;if(s.push(_),h!==64){const m=c<<6&192|h;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class L_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Tu=function(t){const e=Iu(t);return Ao.encodeByteArray(e,!0)},hi=function(t){return Tu(t).replace(/\./g,"")},Wr=function(t){try{return Ao.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function F_(t){return Ru(void 0,t)}function Ru(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!B_(n)||(t[n]=Ru(t[n],e[n]));return t}function B_(t){return t!=="__proto__"}/**
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
 */function H_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const $_=()=>H_().__FIREBASE_DEFAULTS__,W_=()=>{if(typeof process>"u"||typeof aa>"u")return;const t=aa.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},U_=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Wr(t[1]);return e&&JSON.parse(e)},xu=()=>{try{return k_()||$_()||W_()||U_()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},V_=t=>xu()?.emulatorHosts?.[t],j_=t=>{const e=V_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Au=()=>xu()?.config;/**
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
 */class Ui{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function No(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function q_(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function G_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[hi(JSON.stringify(n)),hi(JSON.stringify(o)),""].join(".")}const cs={};function K_(){const t={prod:[],emulator:[]};for(const e of Object.keys(cs))cs[e]?t.emulator.push(e):t.prod.push(e);return t}function z_(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let ca=!1;function Y_(t,e){if(typeof window>"u"||typeof document>"u"||!No(window.location.host)||cs[t]===e||cs[t]||ca)return;cs[t]=e;function n(f){return`__firebase__banner__${f}`}const s="__firebase__banner",r=K_().prod.length>0;function o(){const f=document.getElementById(s);f&&f.remove()}function l(f){f.style.display="flex",f.style.background="#7faaf0",f.style.position="fixed",f.style.bottom="5px",f.style.left="5px",f.style.padding=".5em",f.style.borderRadius="5px",f.style.alignItems="center"}function a(f,_){f.setAttribute("width","24"),f.setAttribute("id",_),f.setAttribute("height","24"),f.setAttribute("viewBox","0 0 24 24"),f.setAttribute("fill","none"),f.style.marginLeft="-6px"}function c(){const f=document.createElement("span");return f.style.cursor="pointer",f.style.marginLeft="16px",f.style.fontSize="24px",f.innerHTML=" &times;",f.onclick=()=>{ca=!0,o()},f}function u(f,_){f.setAttribute("id",_),f.innerText="Learn more",f.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",f.setAttribute("target","__blank"),f.style.paddingLeft="5px",f.style.textDecoration="underline"}function h(){const f=z_(s),_=n("text"),m=document.getElementById(_)||document.createElement("span"),E=n("learnmore"),A=document.getElementById(E)||document.createElement("a"),O=n("preprendIcon"),P=document.getElementById(O)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(f.created){const M=f.element;l(M),u(A,E);const k=c();a(P,O),M.append(P,m,A,k),document.body.appendChild(M)}r?(m.innerText="Preview backend disconnected.",P.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(P.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,m.innerText="Preview backend running in this workspace."),m.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
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
 */function Q_(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Nu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Q_())}function X_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function J_(){return Su.NODE_ADMIN===!0}function Z_(){try{return typeof indexedDB=="object"}catch{return!1}}function eg(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
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
 */const tg="FirebaseError";class Ls extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=tg,Object.setPrototypeOf(this,Ls.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Pu.prototype.create)}}class Pu{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?ng(r,s):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Ls(i,l,s)}}function ng(t,e){return t.replace(sg,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const sg=/\{\$([^}]+)}/g;/**
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
 */function ws(t){return JSON.parse(t)}function ve(t){return JSON.stringify(t)}/**
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
 */const Ou=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=ws(Wr(r[0])||""),n=ws(Wr(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},ig=function(t){const e=Ou(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},rg=function(t){const e=Ou(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function At(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function kn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function ua(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function fi(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function di(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(ha(r)&&ha(o)){if(!di(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function ha(t){return t!==null&&typeof t=="object"}/**
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
 */function og(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class lg{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)s[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const f=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=l^r&(o^l),u=1518500249):(c=r^o^l,u=1859775393):h<60?(c=r&o|l&(r|o),u=2400959708):(c=r^o^l,u=3395469782);const f=(i<<5|i>>>27)+c+a+u+s[h]&4294967295;a=l,l=o,o=(r<<30|r>>>2)&4294967295,r=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Po(t,e){return`${t} failed: ${e} argument `}/**
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
 */const ag=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,S(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Vi=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function Fs(t){return t&&t._delegate?t._delegate:t}class Ss{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Jt="[DEFAULT]";/**
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
 */class cg{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Ui;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(hg(e))try{this.getOrInitializeService({instanceIdentifier:Jt})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=Jt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Jt){return this.instances.has(e)}getOptions(e=Jt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);s===l&&o.resolve(i)}return i}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:ug(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Jt){return this.component?this.component.multipleInstances?e:Jt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ug(t){return t===Jt?void 0:t}function hg(t){return t.instantiationMode==="EAGER"}/**
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
 */class fg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new cg(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var oe;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(oe||(oe={}));const dg={debug:oe.DEBUG,verbose:oe.VERBOSE,info:oe.INFO,warn:oe.WARN,error:oe.ERROR,silent:oe.SILENT},pg=oe.INFO,_g={[oe.DEBUG]:"log",[oe.VERBOSE]:"log",[oe.INFO]:"info",[oe.WARN]:"warn",[oe.ERROR]:"error"},gg=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=_g[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Du{constructor(e){this.name=e,this._logLevel=pg,this._logHandler=gg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in oe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?dg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,oe.DEBUG,...e),this._logHandler(this,oe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,oe.VERBOSE,...e),this._logHandler(this,oe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,oe.INFO,...e),this._logHandler(this,oe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,oe.WARN,...e),this._logHandler(this,oe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,oe.ERROR,...e),this._logHandler(this,oe.ERROR,...e)}}const mg=(t,e)=>e.some(n=>t instanceof n);let fa,da;function yg(){return fa||(fa=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function vg(){return da||(da=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ku=new WeakMap,Ur=new WeakMap,Mu=new WeakMap,dr=new WeakMap,Oo=new WeakMap;function Cg(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Ht(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ku.set(n,t)}).catch(()=>{}),Oo.set(e,t),e}function Eg(t){if(Ur.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Ur.set(t,e)}let Vr={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ur.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Mu.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ht(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function bg(t){Vr=t(Vr)}function wg(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(pr(this),e,...n);return Mu.set(s,e.sort?e.sort():[e]),Ht(s)}:vg().includes(t)?function(...e){return t.apply(pr(this),e),Ht(ku.get(this))}:function(...e){return Ht(t.apply(pr(this),e))}}function Sg(t){return typeof t=="function"?wg(t):(t instanceof IDBTransaction&&Eg(t),mg(t,yg())?new Proxy(t,Vr):t)}function Ht(t){if(t instanceof IDBRequest)return Cg(t);if(dr.has(t))return dr.get(t);const e=Sg(t);return e!==t&&(dr.set(t,e),Oo.set(e,t)),e}const pr=t=>Oo.get(t);function Ig(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),l=Ht(o);return s&&o.addEventListener("upgradeneeded",a=>{s(Ht(o.result),a.oldVersion,a.newVersion,Ht(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{r&&a.addEventListener("close",()=>r()),i&&a.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const Tg=["get","getKey","getAll","getAllKeys","count"],Rg=["put","add","delete","clear"],_r=new Map;function pa(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(_r.get(e))return _r.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=Rg.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Tg.includes(n)))return;const r=async function(o,...l){const a=this.transaction(o,i?"readwrite":"readonly");let c=a.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&a.done]))[0]};return _r.set(e,r),r}bg(t=>({...t,get:(e,n,s)=>pa(e,n)||t.get(e,n,s),has:(e,n)=>!!pa(e,n)||t.has(e,n)}));/**
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
 */class xg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ag(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Ag(t){return t.getComponent()?.type==="VERSION"}const jr="@firebase/app",_a="0.14.4";/**
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
 */const It=new Du("@firebase/app"),Ng="@firebase/app-compat",Pg="@firebase/analytics-compat",Og="@firebase/analytics",Dg="@firebase/app-check-compat",kg="@firebase/app-check",Mg="@firebase/auth",Lg="@firebase/auth-compat",Fg="@firebase/database",Bg="@firebase/data-connect",Hg="@firebase/database-compat",$g="@firebase/functions",Wg="@firebase/functions-compat",Ug="@firebase/installations",Vg="@firebase/installations-compat",jg="@firebase/messaging",qg="@firebase/messaging-compat",Gg="@firebase/performance",Kg="@firebase/performance-compat",zg="@firebase/remote-config",Yg="@firebase/remote-config-compat",Qg="@firebase/storage",Xg="@firebase/storage-compat",Jg="@firebase/firestore",Zg="@firebase/ai",em="@firebase/firestore-compat",tm="firebase",nm="12.4.0";/**
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
 */const qr="[DEFAULT]",sm={[jr]:"fire-core",[Ng]:"fire-core-compat",[Og]:"fire-analytics",[Pg]:"fire-analytics-compat",[kg]:"fire-app-check",[Dg]:"fire-app-check-compat",[Mg]:"fire-auth",[Lg]:"fire-auth-compat",[Fg]:"fire-rtdb",[Bg]:"fire-data-connect",[Hg]:"fire-rtdb-compat",[$g]:"fire-fn",[Wg]:"fire-fn-compat",[Ug]:"fire-iid",[Vg]:"fire-iid-compat",[jg]:"fire-fcm",[qg]:"fire-fcm-compat",[Gg]:"fire-perf",[Kg]:"fire-perf-compat",[zg]:"fire-rc",[Yg]:"fire-rc-compat",[Qg]:"fire-gcs",[Xg]:"fire-gcs-compat",[Jg]:"fire-fst",[em]:"fire-fst-compat",[Zg]:"fire-vertex","fire-js":"fire-js",[tm]:"fire-js-all"};/**
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
 */const pi=new Map,im=new Map,Gr=new Map;function ga(t,e){try{t.container.addComponent(e)}catch(n){It.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function _i(t){const e=t.name;if(Gr.has(e))return It.debug(`There were multiple attempts to register component ${e}.`),!1;Gr.set(e,t);for(const n of pi.values())ga(n,t);for(const n of im.values())ga(n,t);return!0}function rm(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function om(t){return t==null?!1:t.settings!==void 0}/**
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
 */const lm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new Pu("app","Firebase",lm);/**
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
 */class am{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ss("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
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
 */const cm=nm;function Lu(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:qr,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw $t.create("bad-app-name",{appName:String(i)});if(n||(n=Au()),!n)throw $t.create("no-options");const r=pi.get(i);if(r){if(di(n,r.options)&&di(s,r.config))return r;throw $t.create("duplicate-app",{appName:i})}const o=new fg(i);for(const a of Gr.values())o.addComponent(a);const l=new am(n,s,o);return pi.set(i,l),l}function um(t=qr){const e=pi.get(t);if(!e&&t===qr&&Au())return Lu();if(!e)throw $t.create("no-app",{appName:t});return e}function Tn(t,e,n){let s=sm[t]??t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),It.warn(o.join(" "));return}_i(new Ss(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const hm="firebase-heartbeat-database",fm=1,Is="firebase-heartbeat-store";let gr=null;function Fu(){return gr||(gr=Ig(hm,fm,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Is)}catch(n){console.warn(n)}}}}).catch(t=>{throw $t.create("idb-open",{originalErrorMessage:t.message})})),gr}async function dm(t){try{const n=(await Fu()).transaction(Is),s=await n.objectStore(Is).get(Bu(t));return await n.done,s}catch(e){if(e instanceof Ls)It.warn(e.message);else{const n=$t.create("idb-get",{originalErrorMessage:e?.message});It.warn(n.message)}}}async function ma(t,e){try{const s=(await Fu()).transaction(Is,"readwrite");await s.objectStore(Is).put(e,Bu(t)),await s.done}catch(n){if(n instanceof Ls)It.warn(n.message);else{const s=$t.create("idb-set",{originalErrorMessage:n?.message});It.warn(s.message)}}}function Bu(t){return`${t.name}!${t.options.appId}`}/**
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
 */const pm=1024,_m=30;class gm{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new ym(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ya();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>_m){const i=vm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){It.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ya(),{heartbeatsToSend:n,unsentEntries:s}=mm(this._heartbeatsCache.heartbeats),i=hi(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return It.warn(e),""}}}function ya(){return new Date().toISOString().substring(0,10)}function mm(t,e=pm){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),va(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),va(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class ym{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Z_()?eg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await dm(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ma(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ma(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function va(t){return hi(JSON.stringify({version:2,heartbeats:t})).length}function vm(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
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
 */function Cm(t){_i(new Ss("platform-logger",e=>new xg(e),"PRIVATE")),_i(new Ss("heartbeat",e=>new gm(e),"PRIVATE")),Tn(jr,_a,t),Tn(jr,_a,"esm2020"),Tn("fire-js","")}Cm("");var Ca={};const Ea="@firebase/database",ba="1.1.0";/**
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
 */let Hu="";function Em(t){Hu=t}/**
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
 */class bm{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ve(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:ws(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class wm{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return At(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const $u=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new bm(e)}}catch{}return new wm},nn=$u("localStorage"),Sm=$u("sessionStorage");/**
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
 */const Rn=new Du("@firebase/database"),Im=(function(){let t=1;return function(){return t++}})(),Wu=function(t){const e=ag(t),n=new lg;n.update(e);const s=n.digest();return Ao.encodeByteArray(s)},Bs=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Bs.apply(null,s):typeof s=="object"?e+=ve(s):e+=s,e+=" "}return e};let us=null,wa=!0;const Tm=function(t,e){S(!0,"Can't turn on custom loggers persistently."),Rn.logLevel=oe.VERBOSE,us=Rn.log.bind(Rn)},Ie=function(...t){if(wa===!0&&(wa=!1,us===null&&Sm.get("logging_enabled")===!0&&Tm()),us){const e=Bs.apply(null,t);us(e)}},Hs=function(t){return function(...e){Ie(t,...e)}},Kr=function(...t){const e="FIREBASE INTERNAL ERROR: "+Bs(...t);Rn.error(e)},Tt=function(...t){const e=`FIREBASE FATAL ERROR: ${Bs(...t)}`;throw Rn.error(e),new Error(e)},Le=function(...t){const e="FIREBASE WARNING: "+Bs(...t);Rn.warn(e)},Rm=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Le("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Uu=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},xm=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Mn="[MIN_NAME]",on="[MAX_NAME]",$n=function(t,e){if(t===e)return 0;if(t===Mn||e===on)return-1;if(e===Mn||t===on)return 1;{const n=Sa(t),s=Sa(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},Am=function(t,e){return t===e?0:t<e?-1:1},zn=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ve(e))},Do=function(t){if(typeof t!="object"||t===null)return ve(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=ve(e[s]),n+=":",n+=Do(t[e[s]]);return n+="}",n},Vu=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function Fe(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ju=function(t){S(!Uu(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,l,a;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=l+s,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(a=n;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(a=0;a<64;a+=8){let f=parseInt(u.substr(a,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},Nm=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Pm=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Om(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const Dm=new RegExp("^-?(0*)\\d{1,10}$"),km=-2147483648,Mm=2147483647,Sa=function(t){if(Dm.test(t)){const e=Number(t);if(e>=km&&e<=Mm)return e}return null},Wn=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Le("Exception was thrown by user callback.",n),e},Math.floor(0))}},Lm=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},hs=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Fm{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,om(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Le(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class Bm{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ie("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Le(e)}}class ti{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ti.OWNER="owner";/**
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
 */const ko="5",qu="v",Gu="s",Ku="r",zu="f",Yu=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Qu="ls",Xu="p",zr="ac",Ju="websocket",Zu="long_polling";/**
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
 */class eh{constructor(e,n,s,i,r=!1,o="",l=!1,a=!1,c=null){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=nn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&nn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Hm(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function th(t,e,n){S(typeof e=="string","typeof type must == string"),S(typeof n=="object","typeof params must == object");let s;if(e===Ju)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Zu)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Hm(t)&&(n.ns=t.namespace);const i=[];return Fe(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class $m{constructor(){this.counters_={}}incrementCounter(e,n=1){At(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return F_(this.counters_)}}/**
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
 */const mr={},yr={};function Mo(t){const e=t.toString();return mr[e]||(mr[e]=new $m),mr[e]}function Wm(t,e){const n=t.toString();return yr[n]||(yr[n]=e()),yr[n]}/**
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
 */class Um{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Wn(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Ia="start",Vm="close",jm="pLPCommand",qm="pRTLPCB",nh="id",sh="pw",ih="ser",Gm="cb",Km="seg",zm="ts",Ym="d",Qm="dframe",rh=1870,oh=30,Xm=rh-oh,Jm=25e3,Zm=3e4;class Cn{constructor(e,n,s,i,r,o,l){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Hs(e),this.stats_=Mo(n),this.urlFn=a=>(this.appCheckToken&&(a[zr]=this.appCheckToken),th(n,Zu,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Um(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Zm)),xm(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Lo((...r)=>{const[o,l,a,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ia)this.id=l,this.password=a;else if(o===Vm)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const s={};s[Ia]="t",s[ih]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Gm]=this.scriptTagHolder.uniqueCallbackIdentifier),s[qu]=ko,this.transportSessionId&&(s[Gu]=this.transportSessionId),this.lastSessionId&&(s[Qu]=this.lastSessionId),this.applicationId&&(s[Xu]=this.applicationId),this.appCheckToken&&(s[zr]=this.appCheckToken),typeof location<"u"&&location.hostname&&Yu.test(location.hostname)&&(s[Ku]=zu);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Cn.forceAllow_=!0}static forceDisallow(){Cn.forceDisallow_=!0}static isAvailable(){return Cn.forceAllow_?!0:!Cn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Nm()&&!Pm()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ve(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Tu(n),i=Vu(s,Xm);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[Qm]="t",s[nh]=e,s[sh]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ve(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Lo{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Im(),window[jm+this.uniqueCallbackIdentifier]=e,window[qm+this.uniqueCallbackIdentifier]=n,this.myIFrame=Lo.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ie("frame writing exception"),l.stack&&Ie(l.stack),Ie(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ie("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[nh]=this.myID,e[sh]=this.myPW,e[ih]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+oh+s.length<=rh;){const o=this.pendingSegs.shift();s=s+"&"+Km+i+"="+o.seg+"&"+zm+i+"="+o.ts+"&"+Ym+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(Jm)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Ie("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const ey=16384,ty=45e3;let gi=null;typeof MozWebSocket<"u"?gi=MozWebSocket:typeof WebSocket<"u"&&(gi=WebSocket);class Ye{constructor(e,n,s,i,r,o,l){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Hs(this.connId),this.stats_=Mo(n),this.connURL=Ye.connectionURL_(n,o,l,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[qu]=ko,typeof location<"u"&&location.hostname&&Yu.test(location.hostname)&&(o[Ku]=zu),n&&(o[Gu]=n),s&&(o[Qu]=s),i&&(o[zr]=i),r&&(o[Xu]=r),th(e,Ju,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,nn.set("previous_websocket_failure",!0);try{let s;J_(),this.mySock=new gi(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Ye.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&gi!==null&&!Ye.forceDisallow_}static previouslyFailed(){return nn.isInMemoryStorage||nn.get("previous_websocket_failure")===!0}markConnectionHealthy(){nn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=ws(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(S(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=ve(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Vu(n,ey);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(ty))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ye.responsesRequiredToBeHealthy=2;Ye.healthyTimeout=3e4;/**
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
 */class Ts{static get ALL_TRANSPORTS(){return[Cn,Ye]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Ye&&Ye.isAvailable();let s=n&&!Ye.previouslyFailed();if(e.webSocketOnly&&(n||Le("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Ye];else{const i=this.transports_=[];for(const r of Ts.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Ts.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ts.globalTransportInitialized_=!1;/**
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
 */const ny=6e4,sy=5e3,iy=10*1024,ry=100*1024,vr="t",Ta="d",oy="s",Ra="r",ly="e",xa="o",Aa="a",Na="n",Pa="p",ay="h";class cy{constructor(e,n,s,i,r,o,l,a,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Hs("c:"+this.id+":"),this.transportManager_=new Ts(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=hs(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ry?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>iy?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(vr in e){const n=e[vr];n===Aa?this.upgradeIfSecondaryHealthy_():n===Ra?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===xa&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=zn("t",e),s=zn("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Pa,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Aa,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Na,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=zn("t",e),s=zn("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=zn(vr,e);if(Ta in e){const s=e[Ta];if(n===ay){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Na){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===oy?this.onConnectionShutdown_(s):n===Ra?this.onReset_(s):n===ly?Kr("Server Error: "+s):n===xa?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Kr("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),ko!==s&&Le("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),hs(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ny))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):hs(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(sy))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Pa,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(nn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class lh{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class ah{constructor(e){this.allowedEvents_=e,this.listeners_={},S(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){S(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class mi extends ah{static getInstance(){return new mi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Nu()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return S(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Oa=32,Da=768;class se{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function K(){return new se("")}function V(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Vt(t){return t.pieces_.length-t.pieceNum_}function le(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new se(t.pieces_,e)}function ch(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function uy(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function uh(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function hh(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new se(e,0)}function pe(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof se)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new se(n,0)}function q(t){return t.pieceNum_>=t.pieces_.length}function ke(t,e){const n=V(t),s=V(e);if(n===null)return e;if(n===s)return ke(le(t),le(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Fo(t,e){if(Vt(t)!==Vt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Qe(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Vt(t)>Vt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class hy{constructor(e,n){this.errorPrefix_=n,this.parts_=uh(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Vi(this.parts_[s]);fh(this)}}function fy(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Vi(e),fh(t)}function dy(t){const e=t.parts_.pop();t.byteLength_-=Vi(e),t.parts_.length>0&&(t.byteLength_-=1)}function fh(t){if(t.byteLength_>Da)throw new Error(t.errorPrefix_+"has a key path longer than "+Da+" bytes ("+t.byteLength_+").");if(t.parts_.length>Oa)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Oa+") or object contains a cycle "+Zt(t))}function Zt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class Bo extends ah{static getInstance(){return new Bo}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return S(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Yn=1e3,py=300*1e3,ka=30*1e3,_y=1.3,gy=3e4,my="server_kill",Ma=3;class bt extends lh{constructor(e,n,s,i,r,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=bt.nextPersistentConnectionId_++,this.log_=Hs("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Yn,this.maxReconnectDelay_=py,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Bo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&mi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(ve(r)),S(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new Ui,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),S(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const a=l.d,c=l.s;bt.warnOnListenWarnings_(a,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&At(e,"w")){const s=kn(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Le(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||rg(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ka)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=ig(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ve(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Kr("Unrecognized action received from server: "+ve(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){S(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Yn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Yn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>gy&&(this.reconnectDelay_=Yn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*_y)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+bt.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,s())},c=function(h){S(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(h)};this.realtime_={close:a,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Ie("getToken() completed but was canceled"):(Ie("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,l=new cy(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,_=>{Le(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(my)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Le(h),a())}}}interrupt(e){Ie("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ie("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ua(this.interruptReasons_)&&(this.reconnectDelay_=Yn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>Do(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new se(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){Ie("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ma&&(this.reconnectDelay_=ka,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ie("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ma&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Hu.replace(/\./g,"-")]=1,Nu()?e["framework.cordova"]=1:X_()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=mi.getInstance().currentlyOnline();return ua(this.interruptReasons_)&&e}}bt.nextPersistentConnectionId_=0;bt.nextConnectionId_=0;/**
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
 */class j{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new j(e,n)}}/**
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
 */class ji{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new j(Mn,e),i=new j(Mn,n);return this.compare(s,i)!==0}minPost(){return j.MIN}}/**
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
 */let Ks;class dh extends ji{static get __EMPTY_NODE(){return Ks}static set __EMPTY_NODE(e){Ks=e}compare(e,n){return $n(e.name,n.name)}isDefinedOn(e){throw Hn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return j.MIN}maxPost(){return new j(on,Ks)}makePost(e,n){return S(typeof e=="string","KeyIndex indexValue must always be a string."),new j(e,Ks)}toString(){return".key"}}const xn=new dh;/**
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
 */class zs{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ye{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??ye.RED,this.left=i??Me.EMPTY_NODE,this.right=r??Me.EMPTY_NODE}copy(e,n,s,i,r){return new ye(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Me.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Me.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ye.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ye.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ye.RED=!0;ye.BLACK=!1;class yy{copy(e,n,s,i,r){return this}insert(e,n,s){return new ye(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Me{constructor(e,n=Me.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Me(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ye.BLACK,null,null))}remove(e){return new Me(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ye.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new zs(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new zs(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new zs(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new zs(this.root_,null,this.comparator_,!0,e)}}Me.EMPTY_NODE=new yy;/**
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
 */function vy(t,e){return $n(t.name,e.name)}function Ho(t,e){return $n(t,e)}/**
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
 */let Yr;function Cy(t){Yr=t}const ph=function(t){return typeof t=="number"?"number:"+ju(t):"string:"+t},_h=function(t){if(t.isLeafNode()){const e=t.val();S(typeof e=="string"||typeof e=="number"||typeof e=="object"&&At(e,".sv"),"Priority must be a string or number.")}else S(t===Yr||t.isEmpty(),"priority of unexpected type.");S(t===Yr||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let La;class me{static set __childrenNodeConstructor(e){La=e}static get __childrenNodeConstructor(){return La}constructor(e,n=me.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,S(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),_h(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new me(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:me.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return q(e)?this:V(e)===".priority"?this.priorityNode_:me.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:me.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=V(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(S(s!==".priority"||Vt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,me.__childrenNodeConstructor.EMPTY_NODE.updateChild(le(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ph(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ju(this.value_):e+=this.value_,this.lazyHash_=Wu(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===me.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof me.__childrenNodeConstructor?-1:(S(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=me.VALUE_TYPE_ORDER.indexOf(n),r=me.VALUE_TYPE_ORDER.indexOf(s);return S(i>=0,"Unknown leaf type: "+n),S(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}me.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let gh,mh;function Ey(t){gh=t}function by(t){mh=t}class wy extends ji{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?$n(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return j.MIN}maxPost(){return new j(on,new me("[PRIORITY-POST]",mh))}makePost(e,n){const s=gh(e);return new j(n,new me("[PRIORITY-POST]",s))}toString(){return".priority"}}const fe=new wy;/**
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
 */const Sy=Math.log(2);class Iy{constructor(e){const n=r=>parseInt(Math.log(r)/Sy,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const yi=function(t,e,n,s){t.sort(e);const i=function(a,c){const u=c-a;let h,f;if(u===0)return null;if(u===1)return h=t[a],f=n?n(h):h,new ye(f,h.node,ye.BLACK,null,null);{const _=parseInt(u/2,10)+a,m=i(a,_),E=i(_+1,c);return h=t[_],f=n?n(h):h,new ye(f,h.node,ye.BLACK,m,E)}},r=function(a){let c=null,u=null,h=t.length;const f=function(m,E){const A=h-m,O=h;h-=m;const P=i(A+1,O),M=t[A],k=n?n(M):M;_(new ye(k,M.node,E,null,P))},_=function(m){c?(c.left=m,c=m):(u=m,c=m)};for(let m=0;m<a.count;++m){const E=a.nextBitIsOne(),A=Math.pow(2,a.count-(m+1));E?f(A,ye.BLACK):(f(A,ye.BLACK),f(A,ye.RED))}return u},o=new Iy(t.length),l=r(o);return new Me(s||e,l)};/**
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
 */let Cr;const gn={};class Et{static get Default(){return S(gn&&fe,"ChildrenNode.ts has not been loaded"),Cr=Cr||new Et({".priority":gn},{".priority":fe}),Cr}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=kn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Me?n:null}hasIndex(e){return At(this.indexSet_,e.toString())}addIndex(e,n){S(e!==xn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(j.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let l;i?l=yi(s,e.getCompare()):l=gn;const a=e.toString(),c={...this.indexSet_};c[a]=e;const u={...this.indexes_};return u[a]=l,new Et(u,c)}addToIndexes(e,n){const s=fi(this.indexes_,(i,r)=>{const o=kn(this.indexSet_,r);if(S(o,"Missing index implementation for "+r),i===gn)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(j.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),yi(l,o.getCompare())}else return gn;else{const l=n.get(e.name);let a=i;return l&&(a=a.remove(new j(e.name,l))),a.insert(e,e.node)}});return new Et(s,this.indexSet_)}removeFromIndexes(e,n){const s=fi(this.indexes_,i=>{if(i===gn)return i;{const r=n.get(e.name);return r?i.remove(new j(e.name,r)):i}});return new Et(s,this.indexSet_)}}/**
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
 */let Qn;class H{static get EMPTY_NODE(){return Qn||(Qn=new H(new Me(Ho),null,Et.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&_h(this.priorityNode_),this.children_.isEmpty()&&S(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Qn}updatePriority(e){return this.children_.isEmpty()?this:new H(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Qn:n}}getChild(e){const n=V(e);return n===null?this:this.getImmediateChild(n).getChild(le(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(S(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new j(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?Qn:this.priorityNode_;return new H(i,o,r)}}updateChild(e,n){const s=V(e);if(s===null)return n;{S(V(e)!==".priority"||Vt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(le(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(fe,(o,l)=>{n[o]=l.val(e),s++,r&&H.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ph(this.getPriority().val())+":"),this.forEachChild(fe,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Wu(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new j(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new j(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new j(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,j.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,j.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===$s?-1:0}withIndex(e){if(e===xn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new H(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===xn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(fe),i=n.getIterator(fe);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===xn?null:this.indexMap_.get(e.toString())}}H.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Ty extends H{constructor(){super(new Me(Ho),H.EMPTY_NODE,Et.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return H.EMPTY_NODE}isEmpty(){return!1}}const $s=new Ty;Object.defineProperties(j,{MIN:{value:new j(Mn,H.EMPTY_NODE)},MAX:{value:new j(on,$s)}});dh.__EMPTY_NODE=H.EMPTY_NODE;me.__childrenNodeConstructor=H;Cy($s);by($s);/**
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
 */const Ry=!0;function we(t,e=null){if(t===null)return H.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),S(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new me(n,we(e))}if(!(t instanceof Array)&&Ry){const n=[];let s=!1;if(Fe(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=we(l);a.isEmpty()||(s=s||!a.getPriority().isEmpty(),n.push(new j(o,a)))}}),n.length===0)return H.EMPTY_NODE;const r=yi(n,vy,o=>o.name,Ho);if(s){const o=yi(n,fe.getCompare());return new H(r,we(e),new Et({".priority":o},{".priority":fe}))}else return new H(r,we(e),Et.Default)}else{let n=H.EMPTY_NODE;return Fe(t,(s,i)=>{if(At(t,s)&&s.substring(0,1)!=="."){const r=we(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(we(e))}}Ey(we);/**
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
 */class xy extends ji{constructor(e){super(),this.indexPath_=e,S(!q(e)&&V(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?$n(e.name,n.name):r}makePost(e,n){const s=we(e),i=H.EMPTY_NODE.updateChild(this.indexPath_,s);return new j(n,i)}maxPost(){const e=H.EMPTY_NODE.updateChild(this.indexPath_,$s);return new j(on,e)}toString(){return uh(this.indexPath_,0).join("/")}}/**
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
 */class Ay extends ji{compare(e,n){const s=e.node.compareTo(n.node);return s===0?$n(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return j.MIN}maxPost(){return j.MAX}makePost(e,n){const s=we(e);return new j(n,s)}toString(){return".value"}}const Ny=new Ay;/**
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
 */function yh(t){return{type:"value",snapshotNode:t}}function Ln(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Rs(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function xs(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Py(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class $o{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){S(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(s.getChild(i))&&l.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Rs(n,l)):S(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Ln(n,s)):o.trackChildChange(xs(n,s,l))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(fe,(i,r)=>{n.hasChild(i)||s.trackChildChange(Rs(i,r))}),n.isLeafNode()||n.forEachChild(fe,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(xs(i,r,o))}else s.trackChildChange(Ln(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?H.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class As{constructor(e){this.indexedFilter_=new $o(e.getIndex()),this.index_=e.getIndex(),this.startPost_=As.getStartPost_(e),this.endPost_=As.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new j(n,s))||(s=H.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=H.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(H.EMPTY_NODE);const r=this;return n.forEachChild(fe,(o,l)=>{r.matches(new j(o,l))||(i=i.updateImmediateChild(o,H.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class Oy{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new As(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new j(n,s))||(s=H.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=H.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=H.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(H.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,H.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(f,_)=>h(_,f)}else o=this.index_.getCompare();const l=e;S(l.numChildren()===this.limit_,"");const a=new j(n,s),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),u=this.rangedFilter_.matches(a);if(l.hasChild(n)){const h=l.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||l.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const _=f==null?1:o(f,a);if(u&&!s.isEmpty()&&_>=0)return r?.trackChildChange(xs(n,s,h)),l.updateImmediateChild(n,s);{r?.trackChildChange(Rs(n,h));const E=l.updateImmediateChild(n,H.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r?.trackChildChange(Ln(f.name,f.node)),E.updateImmediateChild(f.name,f.node)):E}}else return s.isEmpty()?e:u&&o(c,a)>=0?(r!=null&&(r.trackChildChange(Rs(c.name,c.node)),r.trackChildChange(Ln(n,s))),l.updateImmediateChild(n,s).updateImmediateChild(c.name,H.EMPTY_NODE)):e}}/**
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
 */class Wo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=fe}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return S(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return S(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Mn}hasEnd(){return this.endSet_}getIndexEndValue(){return S(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return S(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:on}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return S(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===fe}copy(){const e=new Wo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Dy(t){return t.loadsAllData()?new $o(t.getIndex()):t.hasLimit()?new Oy(t):new As(t)}function Fa(t){const e={};if(t.isDefault())return e;let n;if(t.index_===fe?n="$priority":t.index_===Ny?n="$value":t.index_===xn?n="$key":(S(t.index_ instanceof xy,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ve(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=ve(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+ve(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=ve(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+ve(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Ba(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==fe&&(e.i=t.index_.toString()),e}/**
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
 */class vi extends lh{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(S(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Hs("p:rest:"),this.listens_={}}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=vi.getListenId_(e,s),l={};this.listens_[o]=l;const a=Fa(e._queryParams);this.restRequest_(r+".json",a,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),kn(this.listens_,o)===l){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const s=vi.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Fa(e._queryParams),s=e._path.toString(),i=new Ui;return this.restRequest_(s+".json",n,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(s,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+og(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(s&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=ws(l.responseText)}catch{Le("Failed to parse JSON response for "+o+": "+l.responseText)}s(null,a)}else l.status!==401&&l.status!==404&&Le("Got unsuccessful REST response for "+o+" Status: "+l.status),s(l.status);s=null}},l.open("GET",o,!0),l.send()})}}/**
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
 */class ky{constructor(){this.rootNode_=H.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function Ci(){return{value:null,children:new Map}}function vh(t,e,n){if(q(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=V(e);t.children.has(s)||t.children.set(s,Ci());const i=t.children.get(s);e=le(e),vh(i,e,n)}}function Qr(t,e,n){t.value!==null?n(e,t.value):My(t,(s,i)=>{const r=new se(e.toString()+"/"+s);Qr(i,r,n)})}function My(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
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
 */class Ly{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Fe(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
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
 */const Ha=10*1e3,Fy=30*1e3,By=300*1e3;class Hy{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Ly(e);const s=Ha+(Fy-Ha)*Math.random();hs(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;Fe(e,(i,r)=>{r>0&&At(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),hs(this.reportStats_.bind(this),Math.floor(Math.random()*2*By))}}/**
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
 */var Xe;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Xe||(Xe={}));function Ch(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Uo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Vo(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class Ei{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Xe.ACK_USER_WRITE,this.source=Ch()}operationForChild(e){if(q(this.path)){if(this.affectedTree.value!=null)return S(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new se(e));return new Ei(K(),n,this.revert)}}else return S(V(this.path)===e,"operationForChild called for unrelated child."),new Ei(le(this.path),this.affectedTree,this.revert)}}/**
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
 */class Ns{constructor(e,n){this.source=e,this.path=n,this.type=Xe.LISTEN_COMPLETE}operationForChild(e){return q(this.path)?new Ns(this.source,K()):new Ns(this.source,le(this.path))}}/**
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
 */class ln{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Xe.OVERWRITE}operationForChild(e){return q(this.path)?new ln(this.source,K(),this.snap.getImmediateChild(e)):new ln(this.source,le(this.path),this.snap)}}/**
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
 */class Ps{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Xe.MERGE}operationForChild(e){if(q(this.path)){const n=this.children.subtree(new se(e));return n.isEmpty()?null:n.value?new ln(this.source,K(),n.value):new Ps(this.source,K(),n)}else return S(V(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ps(this.source,le(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class an{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(q(e))return this.isFullyInitialized()&&!this.filtered_;const n=V(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class $y{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Wy(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Py(o.childName,o.snapshotNode))}),Xn(t,i,"child_removed",e,s,n),Xn(t,i,"child_added",e,s,n),Xn(t,i,"child_moved",r,s,n),Xn(t,i,"child_changed",e,s,n),Xn(t,i,"value",e,s,n),i}function Xn(t,e,n,s,i,r){const o=s.filter(l=>l.type===n);o.sort((l,a)=>Vy(t,l,a)),o.forEach(l=>{const a=Uy(t,l,r);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,t.query_))})})}function Uy(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Vy(t,e,n){if(e.childName==null||n.childName==null)throw Hn("Should only compare child_ events.");const s=new j(e.childName,e.snapshotNode),i=new j(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
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
 */function qi(t,e){return{eventCache:t,serverCache:e}}function fs(t,e,n,s){return qi(new an(e,n,s),t.serverCache)}function Eh(t,e,n,s){return qi(t.eventCache,new an(e,n,s))}function Xr(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function cn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let Er;const jy=()=>(Er||(Er=new Me(Am)),Er);class ae{static fromObject(e){let n=new ae(null);return Fe(e,(s,i)=>{n=n.set(new se(s),i)}),n}constructor(e,n=jy()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:K(),value:this.value};if(q(e))return null;{const s=V(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(le(e),n);return r!=null?{path:pe(new se(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(q(e))return this;{const n=V(e),s=this.children.get(n);return s!==null?s.subtree(le(e)):new ae(null)}}set(e,n){if(q(e))return new ae(n,this.children);{const s=V(e),r=(this.children.get(s)||new ae(null)).set(le(e),n),o=this.children.insert(s,r);return new ae(this.value,o)}}remove(e){if(q(e))return this.children.isEmpty()?new ae(null):new ae(null,this.children);{const n=V(e),s=this.children.get(n);if(s){const i=s.remove(le(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new ae(null):new ae(this.value,r)}else return this}}get(e){if(q(e))return this.value;{const n=V(e),s=this.children.get(n);return s?s.get(le(e)):null}}setTree(e,n){if(q(e))return n;{const s=V(e),r=(this.children.get(s)||new ae(null)).setTree(le(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new ae(this.value,o)}}fold(e){return this.fold_(K(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(pe(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,K(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(q(e))return null;{const r=V(e),o=this.children.get(r);return o?o.findOnPath_(le(e),pe(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,K(),n)}foreachOnPath_(e,n,s){if(q(e))return this;{this.value&&s(n,this.value);const i=V(e),r=this.children.get(i);return r?r.foreachOnPath_(le(e),pe(n,i),s):new ae(null)}}foreach(e){this.foreach_(K(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(pe(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
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
 */class Ze{constructor(e){this.writeTree_=e}static empty(){return new Ze(new ae(null))}}function ds(t,e,n){if(q(e))return new Ze(new ae(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=ke(i,e);return r=r.updateChild(o,n),new Ze(t.writeTree_.set(i,r))}else{const i=new ae(n),r=t.writeTree_.setTree(e,i);return new Ze(r)}}}function $a(t,e,n){let s=t;return Fe(n,(i,r)=>{s=ds(s,pe(e,i),r)}),s}function Wa(t,e){if(q(e))return Ze.empty();{const n=t.writeTree_.setTree(e,new ae(null));return new Ze(n)}}function Jr(t,e){return hn(t,e)!=null}function hn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ke(n.path,e)):null}function Ua(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(fe,(s,i)=>{e.push(new j(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new j(s,i.value))}),e}function Wt(t,e){if(q(e))return t;{const n=hn(t,e);return n!=null?new Ze(new ae(n)):new Ze(t.writeTree_.subtree(e))}}function Zr(t){return t.writeTree_.isEmpty()}function Fn(t,e){return bh(K(),t.writeTree_,e)}function bh(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(S(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=bh(pe(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(pe(t,".priority"),s)),n}}/**
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
 */function jo(t,e){return Th(e,t)}function qy(t,e,n,s,i){S(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=ds(t.visibleWrites,e,n)),t.lastWriteId=s}function Gy(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function Ky(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);S(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&zy(l,s.path)?i=!1:Qe(s.path,l.path)&&(r=!0)),o--}if(i){if(r)return Yy(t),!0;if(s.snap)t.visibleWrites=Wa(t.visibleWrites,s.path);else{const l=s.children;Fe(l,a=>{t.visibleWrites=Wa(t.visibleWrites,pe(s.path,a))})}return!0}else return!1}function zy(t,e){if(t.snap)return Qe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Qe(pe(t.path,n),e))return!0;return!1}function Yy(t){t.visibleWrites=wh(t.allWrites,Qy,K()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Qy(t){return t.visible}function wh(t,e,n){let s=Ze.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let l;if(r.snap)Qe(n,o)?(l=ke(n,o),s=ds(s,l,r.snap)):Qe(o,n)&&(l=ke(o,n),s=ds(s,K(),r.snap.getChild(l)));else if(r.children){if(Qe(n,o))l=ke(n,o),s=$a(s,l,r.children);else if(Qe(o,n))if(l=ke(o,n),q(l))s=$a(s,K(),r.children);else{const a=kn(r.children,V(l));if(a){const c=a.getChild(le(l));s=ds(s,K(),c)}}}else throw Hn("WriteRecord should have .snap or .children")}}return s}function Sh(t,e,n,s,i){if(!s&&!i){const r=hn(t.visibleWrites,e);if(r!=null)return r;{const o=Wt(t.visibleWrites,e);if(Zr(o))return n;if(n==null&&!Jr(o,K()))return null;{const l=n||H.EMPTY_NODE;return Fn(o,l)}}}else{const r=Wt(t.visibleWrites,e);if(!i&&Zr(r))return n;if(!i&&n==null&&!Jr(r,K()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(Qe(c.path,e)||Qe(e,c.path))},l=wh(t.allWrites,o,e),a=n||H.EMPTY_NODE;return Fn(l,a)}}}function Xy(t,e,n){let s=H.EMPTY_NODE;const i=hn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(fe,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=Wt(t.visibleWrites,e);return n.forEachChild(fe,(o,l)=>{const a=Fn(Wt(r,new se(o)),l);s=s.updateImmediateChild(o,a)}),Ua(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=Wt(t.visibleWrites,e);return Ua(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Jy(t,e,n,s,i){S(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=pe(e,n);if(Jr(t.visibleWrites,r))return null;{const o=Wt(t.visibleWrites,r);return Zr(o)?i.getChild(n):Fn(o,i.getChild(n))}}function Zy(t,e,n,s){const i=pe(e,n),r=hn(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=Wt(t.visibleWrites,i);return Fn(o,s.getNode().getImmediateChild(n))}else return null}function ev(t,e){return hn(t.visibleWrites,e)}function tv(t,e,n,s,i,r,o){let l;const a=Wt(t.visibleWrites,e),c=hn(a,K());if(c!=null)l=c;else if(n!=null)l=Fn(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const u=[],h=o.getCompare(),f=r?l.getReverseIteratorFrom(s,o):l.getIteratorFrom(s,o);let _=f.getNext();for(;_&&u.length<i;)h(_,s)!==0&&u.push(_),_=f.getNext();return u}else return[]}function nv(){return{visibleWrites:Ze.empty(),allWrites:[],lastWriteId:-1}}function bi(t,e,n,s){return Sh(t.writeTree,t.treePath,e,n,s)}function qo(t,e){return Xy(t.writeTree,t.treePath,e)}function Va(t,e,n,s){return Jy(t.writeTree,t.treePath,e,n,s)}function wi(t,e){return ev(t.writeTree,pe(t.treePath,e))}function sv(t,e,n,s,i,r){return tv(t.writeTree,t.treePath,e,n,s,i,r)}function Go(t,e,n){return Zy(t.writeTree,t.treePath,e,n)}function Ih(t,e){return Th(pe(t.treePath,e),t.writeTree)}function Th(t,e){return{treePath:t,writeTree:e}}/**
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
 */class iv{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;S(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),S(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,xs(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,Rs(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Ln(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,xs(s,e.snapshotNode,i.oldSnap));else throw Hn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class rv{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Rh=new rv;class Ko{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new an(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Go(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:cn(this.viewCache_),r=sv(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function ov(t){return{filter:t}}function lv(t,e){S(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),S(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function av(t,e,n,s,i){const r=new iv;let o,l;if(n.type===Xe.OVERWRITE){const c=n;c.source.fromUser?o=eo(t,e,c.path,c.snap,s,i,r):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!q(c.path),o=Si(t,e,c.path,c.snap,s,i,l,r))}else if(n.type===Xe.MERGE){const c=n;c.source.fromUser?o=uv(t,e,c.path,c.children,s,i,r):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=to(t,e,c.path,c.children,s,i,l,r))}else if(n.type===Xe.ACK_USER_WRITE){const c=n;c.revert?o=dv(t,e,c.path,s,i,r):o=hv(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===Xe.LISTEN_COMPLETE)o=fv(t,e,n.path,s,r);else throw Hn("Unknown operation type: "+n.type);const a=r.getChanges();return cv(e,o,a),{viewCache:o,changes:a}}function cv(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Xr(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(yh(Xr(e)))}}function xh(t,e,n,s,i,r){const o=e.eventCache;if(wi(s,n)!=null)return e;{let l,a;if(q(n))if(S(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=cn(e),u=c instanceof H?c:H.EMPTY_NODE,h=qo(s,u);l=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=bi(s,cn(e));l=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=V(n);if(c===".priority"){S(Vt(n)===1,"Can't have a priority with additional path components");const u=o.getNode();a=e.serverCache.getNode();const h=Va(s,n,u,a);h!=null?l=t.filter.updatePriority(u,h):l=o.getNode()}else{const u=le(n);let h;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const f=Va(s,n,o.getNode(),a);f!=null?h=o.getNode().getImmediateChild(c).updateChild(u,f):h=o.getNode().getImmediateChild(c)}else h=Go(s,c,e.serverCache);h!=null?l=t.filter.updateChild(o.getNode(),c,h,u,i,r):l=o.getNode()}}return fs(e,l,o.isFullyInitialized()||q(n),t.filter.filtersNodes())}}function Si(t,e,n,s,i,r,o,l){const a=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(q(n))c=u.updateFullNode(a.getNode(),s,null);else if(u.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(n,s);c=u.updateFullNode(a.getNode(),_,null)}else{const _=V(n);if(!a.isCompleteForPath(n)&&Vt(n)>1)return e;const m=le(n),A=a.getNode().getImmediateChild(_).updateChild(m,s);_===".priority"?c=u.updatePriority(a.getNode(),A):c=u.updateChild(a.getNode(),_,A,m,Rh,null)}const h=Eh(e,c,a.isFullyInitialized()||q(n),u.filtersNodes()),f=new Ko(i,h,r);return xh(t,h,n,i,f,l)}function eo(t,e,n,s,i,r,o){const l=e.eventCache;let a,c;const u=new Ko(i,e,r);if(q(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),a=fs(e,c,!0,t.filter.filtersNodes());else{const h=V(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),a=fs(e,c,l.isFullyInitialized(),l.isFiltered());else{const f=le(n),_=l.getNode().getImmediateChild(h);let m;if(q(f))m=s;else{const E=u.getCompleteChild(h);E!=null?ch(f)===".priority"&&E.getChild(hh(f)).isEmpty()?m=E:m=E.updateChild(f,s):m=H.EMPTY_NODE}if(_.equals(m))a=e;else{const E=t.filter.updateChild(l.getNode(),h,m,f,u,o);a=fs(e,E,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function ja(t,e){return t.eventCache.isCompleteForChild(e)}function uv(t,e,n,s,i,r,o){let l=e;return s.foreach((a,c)=>{const u=pe(n,a);ja(e,V(u))&&(l=eo(t,l,u,c,i,r,o))}),s.foreach((a,c)=>{const u=pe(n,a);ja(e,V(u))||(l=eo(t,l,u,c,i,r,o))}),l}function qa(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function to(t,e,n,s,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;q(n)?c=s:c=new ae(null).setTree(n,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,f)=>{if(u.hasChild(h)){const _=e.serverCache.getNode().getImmediateChild(h),m=qa(t,_,f);a=Si(t,a,new se(h),m,i,r,o,l)}}),c.children.inorderTraversal((h,f)=>{const _=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!u.hasChild(h)&&!_){const m=e.serverCache.getNode().getImmediateChild(h),E=qa(t,m,f);a=Si(t,a,new se(h),E,i,r,o,l)}}),a}function hv(t,e,n,s,i,r,o){if(wi(i,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(s.value!=null){if(q(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return Si(t,e,n,a.getNode().getChild(n),i,r,l,o);if(q(n)){let c=new ae(null);return a.getNode().forEachChild(xn,(u,h)=>{c=c.set(new se(u),h)}),to(t,e,n,c,i,r,l,o)}else return e}else{let c=new ae(null);return s.foreach((u,h)=>{const f=pe(n,u);a.isCompleteForPath(f)&&(c=c.set(u,a.getNode().getChild(f)))}),to(t,e,n,c,i,r,l,o)}}function fv(t,e,n,s,i){const r=e.serverCache,o=Eh(e,r.getNode(),r.isFullyInitialized()||q(n),r.isFiltered());return xh(t,o,n,s,Rh,i)}function dv(t,e,n,s,i,r){let o;if(wi(s,n)!=null)return e;{const l=new Ko(s,e,i),a=e.eventCache.getNode();let c;if(q(n)||V(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=bi(s,cn(e));else{const h=e.serverCache.getNode();S(h instanceof H,"serverChildren would be complete if leaf node"),u=qo(s,h)}u=u,c=t.filter.updateFullNode(a,u,r)}else{const u=V(n);let h=Go(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=a.getImmediateChild(u)),h!=null?c=t.filter.updateChild(a,u,h,le(n),l,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(a,u,H.EMPTY_NODE,le(n),l,r):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=bi(s,cn(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||wi(s,K())!=null,fs(e,c,o,t.filter.filtersNodes())}}/**
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
 */class pv{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new $o(s.getIndex()),r=Dy(s);this.processor_=ov(r);const o=n.serverCache,l=n.eventCache,a=i.updateFullNode(H.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(H.EMPTY_NODE,l.getNode(),null),u=new an(a,o.isFullyInitialized(),i.filtersNodes()),h=new an(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=qi(h,u),this.eventGenerator_=new $y(this.query_)}get query(){return this.query_}}function _v(t){return t.viewCache_.serverCache.getNode()}function gv(t,e){const n=cn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!q(e)&&!n.getImmediateChild(V(e)).isEmpty())?n.getChild(e):null}function Ga(t){return t.eventRegistrations_.length===0}function mv(t,e){t.eventRegistrations_.push(e)}function Ka(t,e,n){const s=[];if(n){S(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function za(t,e,n,s){e.type===Xe.MERGE&&e.source.queryId!==null&&(S(cn(t.viewCache_),"We should always have a full cache before handling merges"),S(Xr(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=av(t.processor_,i,e,n,s);return lv(t.processor_,r.viewCache),S(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Ah(t,r.changes,r.viewCache.eventCache.getNode(),null)}function yv(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(fe,(r,o)=>{s.push(Ln(r,o))}),n.isFullyInitialized()&&s.push(yh(n.getNode())),Ah(t,s,n.getNode(),e)}function Ah(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return Wy(t.eventGenerator_,e,n,i)}/**
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
 */let Ii;class vv{constructor(){this.views=new Map}}function Cv(t){S(!Ii,"__referenceConstructor has already been defined"),Ii=t}function Ev(){return S(Ii,"Reference.ts has not been loaded"),Ii}function bv(t){return t.views.size===0}function zo(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return S(r!=null,"SyncTree gave us an op for an invalid query."),za(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(za(o,e,n,s));return r}}function wv(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let l=bi(n,i?s:null),a=!1;l?a=!0:s instanceof H?(l=qo(n,s),a=!1):(l=H.EMPTY_NODE,a=!1);const c=qi(new an(l,a,!1),new an(s,i,!1));return new pv(e,c)}return o}function Sv(t,e,n,s,i,r){const o=wv(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),mv(o,n),yv(o,n)}function Iv(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const l=jt(t);if(i==="default")for(const[a,c]of t.views.entries())o=o.concat(Ka(c,n,s)),Ga(c)&&(t.views.delete(a),c.query._queryParams.loadsAllData()||r.push(c.query));else{const a=t.views.get(i);a&&(o=o.concat(Ka(a,n,s)),Ga(a)&&(t.views.delete(i),a.query._queryParams.loadsAllData()||r.push(a.query)))}return l&&!jt(t)&&r.push(new(Ev())(e._repo,e._path)),{removed:r,events:o}}function Nh(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function An(t,e){let n=null;for(const s of t.views.values())n=n||gv(s,e);return n}function Ph(t,e){if(e._queryParams.loadsAllData())return Gi(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Oh(t,e){return Ph(t,e)!=null}function jt(t){return Gi(t)!=null}function Gi(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Ti;function Tv(t){S(!Ti,"__referenceConstructor has already been defined"),Ti=t}function Rv(){return S(Ti,"Reference.ts has not been loaded"),Ti}let xv=1;class Ya{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ae(null),this.pendingWriteTree_=nv(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Dh(t,e,n,s,i){return qy(t.pendingWriteTree_,e,n,s,i),i?Ws(t,new ln(Ch(),e,n)):[]}function sn(t,e,n=!1){const s=Gy(t.pendingWriteTree_,e);if(Ky(t.pendingWriteTree_,e)){let r=new ae(null);return s.snap!=null?r=r.set(K(),!0):Fe(s.children,o=>{r=r.set(new se(o),!0)}),Ws(t,new Ei(s.path,r,n))}else return[]}function Ki(t,e,n){return Ws(t,new ln(Uo(),e,n))}function Av(t,e,n){const s=ae.fromObject(n);return Ws(t,new Ps(Uo(),e,s))}function Nv(t,e){return Ws(t,new Ns(Uo(),e))}function Pv(t,e,n){const s=Qo(t,n);if(s){const i=Xo(s),r=i.path,o=i.queryId,l=ke(r,e),a=new Ns(Vo(o),l);return Jo(t,r,a)}else return[]}function no(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||Oh(o,e))){const a=Iv(o,e,n,s);bv(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=a.removed;if(l=a.events,!i){const u=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(f,_)=>jt(_));if(u&&!h){const f=t.syncPointTree_.subtree(r);if(!f.isEmpty()){const _=kv(f);for(let m=0;m<_.length;++m){const E=_[m],A=E.query,O=Lh(t,E);t.listenProvider_.startListening(ps(A),Ri(t,A),O.hashFn,O.onComplete)}}}!h&&c.length>0&&!s&&(u?t.listenProvider_.stopListening(ps(e),null):c.forEach(f=>{const _=t.queryToTagMap.get(zi(f));t.listenProvider_.stopListening(ps(f),_)}))}Mv(t,c)}return l}function Ov(t,e,n,s){const i=Qo(t,s);if(i!=null){const r=Xo(i),o=r.path,l=r.queryId,a=ke(o,e),c=new ln(Vo(l),a,n);return Jo(t,o,c)}else return[]}function Dv(t,e,n,s){const i=Qo(t,s);if(i){const r=Xo(i),o=r.path,l=r.queryId,a=ke(o,e),c=ae.fromObject(n),u=new Ps(Vo(l),a,c);return Jo(t,o,u)}else return[]}function Qa(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,_)=>{const m=ke(f,i);r=r||An(_,m),o=o||jt(_)});let l=t.syncPointTree_.get(i);l?(o=o||jt(l),r=r||An(l,K())):(l=new vv,t.syncPointTree_=t.syncPointTree_.set(i,l));let a;r!=null?a=!0:(a=!1,r=H.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((_,m)=>{const E=An(m,K());E&&(r=r.updateImmediateChild(_,E))}));const c=Oh(l,e);if(!c&&!e._queryParams.loadsAllData()){const f=zi(e);S(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const _=Lv();t.queryToTagMap.set(f,_),t.tagToQueryMap.set(_,f)}const u=jo(t.pendingWriteTree_,i);let h=Sv(l,e,n,u,r,a);if(!c&&!o&&!s){const f=Ph(l,e);h=h.concat(Fv(t,e,f))}return h}function Yo(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=ke(o,e),c=An(l,a);if(c)return c});return Sh(i,e,r,n,!0)}function Ws(t,e){return kh(e,t.syncPointTree_,null,jo(t.pendingWriteTree_,K()))}function kh(t,e,n,s){if(q(t.path))return Mh(t,e,n,s);{const i=e.get(K());n==null&&i!=null&&(n=An(i,K()));let r=[];const o=V(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const c=n?n.getImmediateChild(o):null,u=Ih(s,o);r=r.concat(kh(l,a,c,u))}return i&&(r=r.concat(zo(i,t,s,n))),r}}function Mh(t,e,n,s){const i=e.get(K());n==null&&i!=null&&(n=An(i,K()));let r=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,c=Ih(s,o),u=t.operationForChild(o);u&&(r=r.concat(Mh(u,l,a,c)))}),i&&(r=r.concat(zo(i,t,s,n))),r}function Lh(t,e){const n=e.query,s=Ri(t,n);return{hashFn:()=>(_v(e)||H.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Pv(t,n._path,s):Nv(t,n._path);{const r=Om(i,n);return no(t,n,null,r)}}}}function Ri(t,e){const n=zi(e);return t.queryToTagMap.get(n)}function zi(t){return t._path.toString()+"$"+t._queryIdentifier}function Qo(t,e){return t.tagToQueryMap.get(e)}function Xo(t){const e=t.indexOf("$");return S(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new se(t.substr(0,e))}}function Jo(t,e,n){const s=t.syncPointTree_.get(e);S(s,"Missing sync point for query tag that we're tracking");const i=jo(t.pendingWriteTree_,e);return zo(s,n,i,null)}function kv(t){return t.fold((e,n,s)=>{if(n&&jt(n))return[Gi(n)];{let i=[];return n&&(i=Nh(n)),Fe(s,(r,o)=>{i=i.concat(o)}),i}})}function ps(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Rv())(t._repo,t._path):t}function Mv(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=zi(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function Lv(){return xv++}function Fv(t,e,n){const s=e._path,i=Ri(t,e),r=Lh(t,n),o=t.listenProvider_.startListening(ps(e),i,r.hashFn,r.onComplete),l=t.syncPointTree_.subtree(s);if(i)S(!jt(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,u,h)=>{if(!q(c)&&u&&jt(u))return[Gi(u).query];{let f=[];return u&&(f=f.concat(Nh(u).map(_=>_.query))),Fe(h,(_,m)=>{f=f.concat(m)}),f}});for(let c=0;c<a.length;++c){const u=a[c];t.listenProvider_.stopListening(ps(u),Ri(t,u))}}return o}/**
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
 */class Zo{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Zo(n)}node(){return this.node_}}class el{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=pe(this.path_,e);return new el(this.syncTree_,n)}node(){return Yo(this.syncTree_,this.path_)}}const Bv=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Xa=function(t,e,n){if(!t||typeof t!="object")return t;if(S(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Hv(t[".sv"],e,n);if(typeof t[".sv"]=="object")return $v(t[".sv"],e);S(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Hv=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:S(!1,"Unexpected server value: "+t)}},$v=function(t,e,n){t.hasOwnProperty("increment")||S(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&S(!1,"Unexpected increment value: "+s);const i=e.node();if(S(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},Wv=function(t,e,n,s){return tl(e,new el(n,t),s)},Fh=function(t,e,n){return tl(t,new Zo(e),n)};function tl(t,e,n){const s=t.getPriority().val(),i=Xa(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,l=Xa(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new me(l,we(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new me(i))),o.forEachChild(fe,(l,a)=>{const c=tl(a,e.getImmediateChild(l),n);c!==a&&(r=r.updateImmediateChild(l,c))}),r}}/**
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
 */class nl{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function sl(t,e){let n=e instanceof se?e:new se(e),s=t,i=V(n);for(;i!==null;){const r=kn(s.node.children,i)||{children:{},childCount:0};s=new nl(i,s,r),n=le(n),i=V(n)}return s}function Un(t){return t.node.value}function Bh(t,e){t.node.value=e,so(t)}function Hh(t){return t.node.childCount>0}function Uv(t){return Un(t)===void 0&&!Hh(t)}function Yi(t,e){Fe(t.node.children,(n,s)=>{e(new nl(n,t,s))})}function $h(t,e,n,s){n&&e(t),Yi(t,i=>{$h(i,e,!0)})}function Vv(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Us(t){return new se(t.parent===null?t.name:Us(t.parent)+"/"+t.name)}function so(t){t.parent!==null&&jv(t.parent,t.name,t)}function jv(t,e,n){const s=Uv(n),i=At(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,so(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,so(t))}/**
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
 */const qv=/[\[\].#$\/\u0000-\u001F\u007F]/,Gv=/[\[\].#$\u0000-\u001F\u007F]/,br=10*1024*1024,Wh=function(t){return typeof t=="string"&&t.length!==0&&!qv.test(t)},Uh=function(t){return typeof t=="string"&&t.length!==0&&!Gv.test(t)},Kv=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Uh(t)},zv=function(t,e,n,s){il(Po(t,"value"),e,n)},il=function(t,e,n){const s=n instanceof se?new hy(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Zt(s));if(typeof e=="function")throw new Error(t+"contains a function "+Zt(s)+" with contents = "+e.toString());if(Uu(e))throw new Error(t+"contains "+e.toString()+" "+Zt(s));if(typeof e=="string"&&e.length>br/3&&Vi(e)>br)throw new Error(t+"contains a string greater than "+br+" utf8 bytes "+Zt(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(Fe(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Wh(o)))throw new Error(t+" contains an invalid key ("+o+") "+Zt(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);fy(s,o),il(t,l,s),dy(s)}),i&&r)throw new Error(t+' contains ".value" child '+Zt(s)+" in addition to actual children.")}},Vh=function(t,e,n,s){if(!Uh(n))throw new Error(Po(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Yv=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Vh(t,e,n)},Qv=function(t,e){if(V(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Xv=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Wh(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Kv(n))throw new Error(Po(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class Jv{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function rl(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!Fo(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function jh(t,e,n){rl(t,n),qh(t,s=>Fo(s,e))}function Rt(t,e,n){rl(t,n),qh(t,s=>Qe(s,e)||Qe(e,s))}function qh(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(Zv(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Zv(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();us&&Ie("event: "+n.toString()),Wn(s)}}}/**
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
 */const eC="repo_interrupt",tC=25;class nC{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Jv,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ci(),this.transactionQueueTree_=new nl,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function sC(t,e,n){if(t.stats_=Mo(t.repoInfo_),t.forceRestClient_||Lm())t.server_=new vi(t.repoInfo_,(s,i,r,o)=>{Ja(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Za(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ve(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new bt(t.repoInfo_,e,(s,i,r,o)=>{Ja(t,s,i,r,o)},s=>{Za(t,s)},s=>{rC(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=Wm(t.repoInfo_,()=>new Hy(t.stats_,t.server_)),t.infoData_=new ky,t.infoSyncTree_=new Ya({startListening:(s,i,r,o)=>{let l=[];const a=t.infoData_.getNode(s._path);return a.isEmpty()||(l=Ki(t.infoSyncTree_,s._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),ll(t,"connected",!1),t.serverSyncTree_=new Ya({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(l,a)=>{const c=o(l,a);Rt(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function iC(t){const n=t.infoData_.getNode(new se(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ol(t){return Bv({timestamp:iC(t)})}function Ja(t,e,n,s,i){t.dataUpdateCount++;const r=new se(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const a=fi(n,c=>we(c));o=Dv(t.serverSyncTree_,r,a,i)}else{const a=we(n);o=Ov(t.serverSyncTree_,r,a,i)}else if(s){const a=fi(n,c=>we(c));o=Av(t.serverSyncTree_,r,a)}else{const a=we(n);o=Ki(t.serverSyncTree_,r,a)}let l=r;o.length>0&&(l=Qi(t,r)),Rt(t.eventQueue_,l,o)}function Za(t,e){ll(t,"connected",e),e===!1&&lC(t)}function rC(t,e){Fe(e,(n,s)=>{ll(t,n,s)})}function ll(t,e,n){const s=new se("/.info/"+e),i=we(n);t.infoData_.updateSnapshot(s,i);const r=Ki(t.infoSyncTree_,s,i);Rt(t.eventQueue_,s,r)}function Gh(t){return t.nextWriteId_++}function oC(t,e,n,s,i){al(t,"set",{path:e.toString(),value:n,priority:s});const r=ol(t),o=we(n,s),l=Yo(t.serverSyncTree_,e),a=Fh(o,l,r),c=Gh(t),u=Dh(t.serverSyncTree_,e,a,c,!0);rl(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(f,_)=>{const m=f==="ok";m||Le("set at "+e+" failed: "+f);const E=sn(t.serverSyncTree_,c,!m);Rt(t.eventQueue_,e,E),hC(t,i,f,_)});const h=Xh(t,e);Qi(t,h),Rt(t.eventQueue_,h,[])}function lC(t){al(t,"onDisconnectEvents");const e=ol(t),n=Ci();Qr(t.onDisconnect_,K(),(i,r)=>{const o=Wv(i,r,t.serverSyncTree_,e);vh(n,i,o)});let s=[];Qr(n,K(),(i,r)=>{s=s.concat(Ki(t.serverSyncTree_,i,r));const o=Xh(t,i);Qi(t,o)}),t.onDisconnect_=Ci(),Rt(t.eventQueue_,K(),s)}function aC(t,e,n){let s;V(e._path)===".info"?s=Qa(t.infoSyncTree_,e,n):s=Qa(t.serverSyncTree_,e,n),jh(t.eventQueue_,e._path,s)}function cC(t,e,n){let s;V(e._path)===".info"?s=no(t.infoSyncTree_,e,n):s=no(t.serverSyncTree_,e,n),jh(t.eventQueue_,e._path,s)}function uC(t){t.persistentConnection_&&t.persistentConnection_.interrupt(eC)}function al(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Ie(n,...e)}function hC(t,e,n,s){e&&Wn(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Kh(t,e,n){return Yo(t.serverSyncTree_,e,n)||H.EMPTY_NODE}function cl(t,e=t.transactionQueueTree_){if(e||Xi(t,e),Un(e)){const n=Yh(t,e);S(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&fC(t,Us(e),n)}else Hh(e)&&Yi(e,n=>{cl(t,n)})}function fC(t,e,n){const s=n.map(c=>c.currentWriteId),i=Kh(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const u=n[c];S(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=ke(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const l=r.val(!0),a=e;t.server_.put(a.toString(),l,c=>{al(t,"transaction put response",{path:a.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let f=0;f<n.length;f++)n[f].status=2,u=u.concat(sn(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&h.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Xi(t,sl(t.transactionQueueTree_,e)),cl(t,t.transactionQueueTree_),Rt(t.eventQueue_,e,u);for(let f=0;f<h.length;f++)Wn(h[f])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{Le("transaction at "+a.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}Qi(t,e)}},o)}function Qi(t,e){const n=zh(t,e),s=Us(n),i=Yh(t,n);return dC(t,i,s),s}function dC(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=ke(n,a.path);let u=!1,h;if(S(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)u=!0,h=a.abortReason,i=i.concat(sn(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=tC)u=!0,h="maxretry",i=i.concat(sn(t.serverSyncTree_,a.currentWriteId,!0));else{const f=Kh(t,a.path,o);a.currentInputSnapshot=f;const _=e[l].update(f.val());if(_!==void 0){il("transaction failed: Data returned ",_,a.path);let m=we(_);typeof _=="object"&&_!=null&&At(_,".priority")||(m=m.updatePriority(f.getPriority()));const A=a.currentWriteId,O=ol(t),P=Fh(m,f,O);a.currentOutputSnapshotRaw=m,a.currentOutputSnapshotResolved=P,a.currentWriteId=Gh(t),o.splice(o.indexOf(A),1),i=i.concat(Dh(t.serverSyncTree_,a.path,P,a.currentWriteId,a.applyLocally)),i=i.concat(sn(t.serverSyncTree_,A,!0))}else u=!0,h="nodata",i=i.concat(sn(t.serverSyncTree_,a.currentWriteId,!0))}Rt(t.eventQueue_,n,i),i=[],u&&(e[l].status=2,(function(f){setTimeout(f,Math.floor(0))})(e[l].unwatcher),e[l].onComplete&&(h==="nodata"?s.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):s.push(()=>e[l].onComplete(new Error(h),!1,null))))}Xi(t,t.transactionQueueTree_);for(let l=0;l<s.length;l++)Wn(s[l]);cl(t,t.transactionQueueTree_)}function zh(t,e){let n,s=t.transactionQueueTree_;for(n=V(e);n!==null&&Un(s)===void 0;)s=sl(s,n),e=le(e),n=V(e);return s}function Yh(t,e){const n=[];return Qh(t,e,n),n.sort((s,i)=>s.order-i.order),n}function Qh(t,e,n){const s=Un(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Yi(e,i=>{Qh(t,i,n)})}function Xi(t,e){const n=Un(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,Bh(e,n.length>0?n:void 0)}Yi(e,s=>{Xi(t,s)})}function Xh(t,e){const n=Us(zh(t,e)),s=sl(t.transactionQueueTree_,e);return Vv(s,i=>{wr(t,i)}),wr(t,s),$h(s,i=>{wr(t,i)}),n}function wr(t,e){const n=Un(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(S(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(S(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(sn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Bh(e,void 0):n.length=r+1,Rt(t.eventQueue_,Us(e),i);for(let o=0;o<s.length;o++)Wn(s[o])}}/**
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
 */function pC(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function _C(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Le(`Invalid query segment '${n}' in query '${t}'`)}return e}const ec=function(t,e){const n=gC(t),s=n.namespace;n.domain==="firebase.com"&&Tt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Tt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Rm();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new eh(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new se(n.pathString)}},gC=function(t){let e="",n="",s="",i="",r="",o=!0,l="https",a=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(l=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(i=pC(t.substring(u,h)));const f=_C(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")n="localhost";else if(_.split(".").length<=2)n=_;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),n=e.substring(m+1),r=s}"ns"in f&&(r=f.ns)}return{host:e,port:a,domain:n,subdomain:s,secure:o,scheme:l,pathString:i,namespace:r}};/**
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
 */class mC{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ve(this.snapshot.exportVal())}}class yC{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class vC{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return S(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class ul{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return q(this._path)?null:ch(this._path)}get ref(){return new Gt(this._repo,this._path)}get _queryIdentifier(){const e=Ba(this._queryParams),n=Do(e);return n==="{}"?"default":n}get _queryObject(){return Ba(this._queryParams)}isEqual(e){if(e=Fs(e),!(e instanceof ul))return!1;const n=this._repo===e._repo,s=Fo(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+uy(this._path)}}class Gt extends ul{constructor(e,n){super(e,n,new Wo,!1)}get parent(){const e=hh(this._path);return e===null?null:new Gt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class xi{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new se(e),s=io(this.ref,e);return new xi(this._node.getChild(n),s,fe)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new xi(i,io(this.ref,s),fe)))}hasChild(e){const n=new se(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function en(t,e){return t=Fs(t),t._checkNotDeleted("ref"),e!==void 0?io(t._root,e):t._root}function io(t,e){return t=Fs(t),V(t._path)===null?Yv("child","path",e):Vh("child","path",e),new Gt(t._repo,pe(t._path,e))}function ro(t,e){t=Fs(t),Qv("set",t._path),zv("set",e,t._path);const n=new Ui;return oC(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}class hl{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new mC("value",this,new xi(e.snapshotNode,new Gt(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new yC(this,e,n):null}matches(e){return e instanceof hl?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function CC(t,e,n,s,i){const r=new vC(n,void 0),o=new hl(r);return aC(t._repo,t,o),()=>cC(t._repo,t,o)}function Ys(t,e,n,s){return CC(t,"value",e)}Cv(Gt);Tv(Gt);/**
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
 */const EC="FIREBASE_DATABASE_EMULATOR_HOST",oo={};let bC=!1;function wC(t,e,n,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=No(r);t.repoInfo_=new eh(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function SC(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||Tt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ie("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=ec(r,i),l=o.repoInfo,a;typeof process<"u"&&Ca&&(a=Ca[EC]),a?(r=`http://${a}?ns=${l.namespace}`,o=ec(r,i),l=o.repoInfo):o.repoInfo.secure;const c=new Bm(t.name,t.options,e);Xv("Invalid Firebase Database URL",o),q(o.path)||Tt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=TC(l,t,c,new Fm(t,n));return new RC(u,t)}function IC(t,e){const n=oo[e];(!n||n[t.key]!==t)&&Tt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),uC(t),delete n[t.key]}function TC(t,e,n,s){let i=oo[e.name];i||(i={},oo[e.name]=i);let r=i[t.toURLString()];return r&&Tt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new nC(t,bC,n,s),i[t.toURLString()]=r,r}class RC{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(sC(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Gt(this._repo,K())),this._rootInternal}_delete(){return this._rootInternal!==null&&(IC(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Tt("Cannot call "+e+" on a deleted database.")}}function xC(t=um(),e){const n=rm(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=j_("database");s&&AC(n,...s)}return n}function AC(t,e,n,s={}){t=Fs(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&di(s,r.repoInfo_.emulatorOptions))return;Tt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&Tt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new ti(ti.OWNER);else if(s.mockUserToken){const l=typeof s.mockUserToken=="string"?s.mockUserToken:G_(s.mockUserToken,t.app.options.projectId);o=new ti(l)}No(e)&&(q_(e),Y_("Database",!0)),wC(r,i,s,o)}/**
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
 */function NC(t){Em(cm),_i(new Ss("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return SC(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),Tn(Ea,ba,t),Tn(Ea,ba,"esm2020")}bt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};bt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};NC();var PC="firebase",OC="12.4.0";/**
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
 */Tn(PC,OC,"app");const DC={apiKey:"AIzaSyAKZjbnfGPijASF9Kkl2O2BrZXWIgFMThs",authDomain:"planning-poker-f26ba.firebaseapp.com",projectId:"planning-poker-f26ba",storageBucket:"planning-poker-f26ba.firebasestorage.app",messagingSenderId:"1013855147171",appId:"1:1013855147171:web:ffa442f561b109d6c71b16",databaseURL:"https://planning-poker-f26ba-default-rtdb.europe-west1.firebasedatabase.app/"},kC=Lu(DC),tn=xC(kC),Ji="myName";function MC(){return localStorage.getItem(Ji)}function LC(t){localStorage.setItem(Ji,t)}async function Jh(){const t=MC();if(console.log(`Retrieved name: ${t}`),t===null){const e=Os.currentRoute.value.fullPath;console.log(`Current path: ${e}`),await Os.push({path:"your-name",query:{redirect:e}})}}const FC={id:"room-main-container"},BC={__name:"Room",setup(t){Jh();const e=Eu(),n=Ft([]),s=Ft(null),i=Ft({}),r=Ft(!1),o=e.query.id,l=localStorage.getItem(Ji);function a(){ro(en(tn,`rooms/${o}/votes/${l}`),{cardValue:"",hasVoted:!1})}function c(){const m=en(tn,`rooms/${o}/cardsValues`);Ys(m,E=>{const A=E.val();n.value=Array.isArray(A)?A:A?.split(",").map(O=>O.trim())||[]})}Fc(()=>{c(),a(),Ys(en(tn,`rooms/${o}`),m=>{const E=m.val();f(E)})});function u(m){const E=en(tn,`rooms/${o}/votes/${l}`);s.value=m.toString(),ro(E,{cardValue:m,hasVoted:!0})}function h(){r.value=!0;const m=en(tn,`rooms/${o}`);Ys(m,E=>{const A=E.val();i.value=A?.votes||{}})}function f(m,E=!1){!r.value&&m?.votes&&(i.value=Object.fromEntries(Object.keys(m.votes).map(A=>[A,{cardValue:"",hasVoted:E?!1:m.votes[A].hasVoted}])))}function _(){const m=en(tn,`rooms/${o}`);s.value=null,r.value=!1,Ys(m,E=>{const A=E.val();f(A,!0)})}return(m,E)=>(qe(),Ge("div",FC,[ce("h1",null,"Room "+_s(ft(e).query.name),1),_e(bu,{votes:i.value},null,8,["votes"]),ce("section",{id:"buttons-section"},[ce("input",{type:"button",value:"Reveal Votes",class:"button",onClick:h}),ce("input",{type:"button",value:"Clear Votes",class:"button",onClick:_})]),_e(wu,{values:n.value,selectedValue:s.value,onSelectCard:u},null,8,["values","selectedValue"])]))}},Zh=Bn(BC,[["__scopeId","data-v-d0eacfaf"]]),HC={};function $C(t,e){const n=bo("RouterLink");return qe(),Ge("main",null,[e[1]||(e[1]=ce("h1",null,"Planning Poker",-1)),_e(n,{to:"/create-room",id:"create-room-btn"},{default:ns(()=>[...e[0]||(e[0]=[iu("Create room",-1)])]),_:1})])}const ef=Bn(HC,[["render",$C],["__scopeId","data-v-fdbc4986"]]),WC={id:"create-room-main-container"},UC={__name:"CreateRoom",setup(t){Jh();const e=Math.random().toString(36).substring(2,8);let n=Ft(e),s=Ft([0,1,2,3,4,5,6,7,8,9,10,"?"]);async function i(r){r.preventDefault();const o=n.value||e,l=en(tn,`rooms/${e}`);await ro(l,{createdAt:Date.now(),votes:{},name:o,cardsValues:s.value}),await Os.push({path:`/room/${e}`,query:{name:o,id:e}})}return(r,o)=>(qe(),Ge("div",WC,[o[4]||(o[4]=ce("h1",null,"Create A Room",-1)),o[5]||(o[5]=ce("p",{class:"small-text"},"Use default values or personalise.",-1)),ce("form",null,[o[2]||(o[2]=ce("label",{for:"room-name-input"},"Room name:",-1)),Nr(ce("input",{type:"text",id:"room-name-input",name:"room-name-input","onUpdate:modelValue":o[0]||(o[0]=l=>Ce(n)?n.value=l:n=l)},null,512),[[Fr,ft(n)]]),o[3]||(o[3]=ce("label",{for:"cards-values-input"},"Cards values:",-1)),Nr(ce("input",{type:"text",id:"cards-values-input",name:"cards-values-input","onUpdate:modelValue":o[1]||(o[1]=l=>Ce(s)?s.value=l:s=l)},null,512),[[Fr,ft(s)]]),ce("input",{type:"submit",value:"Create",onClick:i,class:"button"})])]))}},tf=Bn(UC,[["__scopeId","data-v-e7410f61"]]),VC={id:"name-form"},jC=["placeholder"],qC={__name:"AddName",setup(t){const e=Ft(null),n=Eu(),{redirect:s}=n.query;console.log("Redirect to:",s);const i=Math.random().toString(36).slice(2);function r(o){o.preventDefault(),e?LC(e.value):(localStorage.setItem(Ji,i),console.log("Random userId generated and saved to localStorage:",i)),console.log(s),Os.push(s||"/")}return(o,l)=>(qe(),Ge("main",null,[l[2]||(l[2]=ce("h1",null,"Add Your Name",-1)),ce("form",VC,[l[1]||(l[1]=ce("label",{for:"name-input"},"Name:",-1)),Nr(ce("input",{type:"text",id:"name-input",name:"name","onUpdate:modelValue":l[0]||(l[0]=a=>e.value=a),placeholder:ft(i)},null,8,jC),[[Fr,e.value]]),ce("input",{type:"submit",value:"Save",onClick:r,class:"button"})])]))}},GC=[{path:"/",component:ef},{path:"/room/:roomId",component:Zh},{path:"/create-room",component:tf},{path:"/your-name",component:qC}],Os=T_({history:t_("/planning-poker/"),routes:GC}),KC={};function zC(t,e){const n=bo("RouterLink");return qe(),Ge("nav",null,[_e(n,{to:"/",class:"nav-item"},{default:ns(()=>[...e[0]||(e[0]=[ce("div",{class:"ni-text"},"Home",-1)])]),_:1}),_e(n,{to:"/create-room",class:"nav-item"},{default:ns(()=>[...e[1]||(e[1]=[ce("div",{class:"ni-text"},"Create Room",-1)])]),_:1}),_e(n,{to:"/your-name",class:"nav-item"},{default:ns(()=>[...e[2]||(e[2]=[ce("div",{class:"ni-text"},"Your Name",-1)])]),_:1})])}const nf=Bn(KC,[["render",zC],["__scopeId","data-v-c5d598a4"]]),YC={__name:"App",setup(t){return(e,n)=>{const s=bo("router-view");return qe(),Ge(Ve,null,[_e(nf),_e(s)],64)}}},Kt=Ep(YC);Kt.use(Os);Kt.component("room-item",Zh);Kt.component("create-room-item",tf);Kt.component("cards-deck-item",wu);Kt.component("poker-table-item",bu);Kt.component("home-item",ef);Kt.component("nav-item",nf);Kt.mount("#app");
