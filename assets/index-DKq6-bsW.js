(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function yo(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const se={},wn=[],ft=()=>{},cc=()=>!1,Mi=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),vo=t=>t.startsWith("onUpdate:"),xe=Object.assign,Co=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},hf=Object.prototype.hasOwnProperty,X=(t,e)=>hf.call(t,e),V=Array.isArray,Sn=t=>Li(t)==="[object Map]",uc=t=>Li(t)==="[object Set]",$=t=>typeof t=="function",pe=t=>typeof t=="string",Yt=t=>typeof t=="symbol",ue=t=>t!==null&&typeof t=="object",hc=t=>(ue(t)||$(t))&&$(t.then)&&$(t.catch),fc=Object.prototype.toString,Li=t=>fc.call(t),ff=t=>Li(t).slice(8,-1),dc=t=>Li(t)==="[object Object]",Eo=t=>pe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,ss=yo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Fi=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},df=/-\w/g,qe=Fi(t=>t.replace(df,e=>e.slice(1).toUpperCase())),pf=/\B([A-Z])/g,hn=Fi(t=>t.replace(pf,"-$1").toLowerCase()),Bi=Fi(t=>t.charAt(0).toUpperCase()+t.slice(1)),ar=Fi(t=>t?`on${Bi(t)}`:""),Wt=(t,e)=>!Object.is(t,e),ni=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},pc=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},kr=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Sl;const Hi=()=>Sl||(Sl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function bo(t){if(V(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],i=pe(s)?yf(s):bo(s);if(i)for(const r in i)e[r]=i[r]}return e}else if(pe(t)||ue(t))return t}const _f=/;(?![^(]*\))/g,gf=/:([^]+)/,mf=/\/\*[^]*?\*\//g;function yf(t){const e={};return t.replace(mf,"").split(_f).forEach(n=>{if(n){const s=n.split(gf);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Hs(t){let e="";if(pe(t))e=t;else if(V(t))for(let n=0;n<t.length;n++){const s=Hs(t[n]);s&&(e+=s+" ")}else if(ue(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const vf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Cf=yo(vf);function _c(t){return!!t||t===""}const gc=t=>!!(t&&t.__v_isRef===!0),vs=t=>pe(t)?t:t==null?"":V(t)||ue(t)&&(t.toString===fc||!$(t.toString))?gc(t)?vs(t.value):JSON.stringify(t,mc,2):String(t),mc=(t,e)=>gc(e)?mc(t,e.value):Sn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,i],r)=>(n[cr(s,r)+" =>"]=i,n),{})}:uc(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>cr(n))}:Yt(e)?cr(e):ue(e)&&!V(e)&&!dc(e)?String(e):e,cr=(t,e="")=>{var n;return Yt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Le;class Ef{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Le,!e&&Le&&(this.index=(Le.scopes||(Le.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Le;try{return Le=this,e()}finally{Le=n}}}on(){++this._on===1&&(this.prevScope=Le,Le=this)}off(){this._on>0&&--this._on===0&&(Le=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function bf(){return Le}let re;const ur=new WeakSet;class yc{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Le&&Le.active&&Le.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ur.has(this)&&(ur.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Cc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Il(this),Ec(this);const e=re,n=Ze;re=this,Ze=!0;try{return this.fn()}finally{bc(this),re=e,Ze=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Io(e);this.deps=this.depsTail=void 0,Il(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ur.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Mr(this)&&this.run()}get dirty(){return Mr(this)}}let vc=0,is,rs;function Cc(t,e=!1){if(t.flags|=8,e){t.next=rs,rs=t;return}t.next=is,is=t}function wo(){vc++}function So(){if(--vc>0)return;if(rs){let e=rs;for(rs=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;is;){let e=is;for(is=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function Ec(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function bc(t){let e,n=t.depsTail,s=n;for(;s;){const i=s.prevDep;s.version===-1?(s===n&&(n=i),Io(s),wf(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}t.deps=e,t.depsTail=n}function Mr(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(wc(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function wc(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Cs)||(t.globalVersion=Cs,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Mr(t))))return;t.flags|=2;const e=t.dep,n=re,s=Ze;re=t,Ze=!0;try{Ec(t);const i=t.fn(t._value);(e.version===0||Wt(i,t._value))&&(t.flags|=128,t._value=i,e.version++)}catch(i){throw e.version++,i}finally{re=n,Ze=s,bc(t),t.flags&=-3}}function Io(t,e=!1){const{dep:n,prevSub:s,nextSub:i}=t;if(s&&(s.nextSub=i,t.prevSub=void 0),i&&(i.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)Io(r,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function wf(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Ze=!0;const Sc=[];function It(){Sc.push(Ze),Ze=!1}function Tt(){const t=Sc.pop();Ze=t===void 0?!0:t}function Il(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=re;re=void 0;try{e()}finally{re=n}}}let Cs=0;class Sf{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class To{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!re||!Ze||re===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==re)n=this.activeLink=new Sf(re,this),re.deps?(n.prevDep=re.depsTail,re.depsTail.nextDep=n,re.depsTail=n):re.deps=re.depsTail=n,Ic(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=re.depsTail,n.nextDep=void 0,re.depsTail.nextDep=n,re.depsTail=n,re.deps===n&&(re.deps=s)}return n}trigger(e){this.version++,Cs++,this.notify(e)}notify(e){wo();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{So()}}}function Ic(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Ic(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Lr=new WeakMap,ln=Symbol(""),Fr=Symbol(""),Es=Symbol("");function Te(t,e,n){if(Ze&&re){let s=Lr.get(t);s||Lr.set(t,s=new Map);let i=s.get(n);i||(s.set(n,i=new To),i.map=s,i.key=n),i.track()}}function Et(t,e,n,s,i,r){const o=Lr.get(t);if(!o){Cs++;return}const l=a=>{a&&a.trigger()};if(wo(),e==="clear")o.forEach(l);else{const a=V(t),c=a&&Eo(n);if(a&&n==="length"){const u=Number(s);o.forEach((h,f)=>{(f==="length"||f===Es||!Yt(f)&&f>=u)&&l(h)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),c&&l(o.get(Es)),e){case"add":a?c&&l(o.get("length")):(l(o.get(ln)),Sn(t)&&l(o.get(Fr)));break;case"delete":a||(l(o.get(ln)),Sn(t)&&l(o.get(Fr)));break;case"set":Sn(t)&&l(o.get(ln));break}}So()}function mn(t){const e=Q(t);return e===t?e:(Te(e,"iterate",Es),Ge(t)?e:e.map(we))}function Wi(t){return Te(t=Q(t),"iterate",Es),t}const If={__proto__:null,[Symbol.iterator](){return hr(this,Symbol.iterator,we)},concat(...t){return mn(this).concat(...t.map(e=>V(e)?mn(e):e))},entries(){return hr(this,"entries",t=>(t[1]=we(t[1]),t))},every(t,e){return yt(this,"every",t,e,void 0,arguments)},filter(t,e){return yt(this,"filter",t,e,n=>n.map(we),arguments)},find(t,e){return yt(this,"find",t,e,we,arguments)},findIndex(t,e){return yt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return yt(this,"findLast",t,e,we,arguments)},findLastIndex(t,e){return yt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return yt(this,"forEach",t,e,void 0,arguments)},includes(...t){return fr(this,"includes",t)},indexOf(...t){return fr(this,"indexOf",t)},join(t){return mn(this).join(t)},lastIndexOf(...t){return fr(this,"lastIndexOf",t)},map(t,e){return yt(this,"map",t,e,void 0,arguments)},pop(){return Yn(this,"pop")},push(...t){return Yn(this,"push",t)},reduce(t,...e){return Tl(this,"reduce",t,e)},reduceRight(t,...e){return Tl(this,"reduceRight",t,e)},shift(){return Yn(this,"shift")},some(t,e){return yt(this,"some",t,e,void 0,arguments)},splice(...t){return Yn(this,"splice",t)},toReversed(){return mn(this).toReversed()},toSorted(t){return mn(this).toSorted(t)},toSpliced(...t){return mn(this).toSpliced(...t)},unshift(...t){return Yn(this,"unshift",t)},values(){return hr(this,"values",we)}};function hr(t,e,n){const s=Wi(t),i=s[e]();return s!==t&&!Ge(t)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.done||(r.value=n(r.value)),r}),i}const Tf=Array.prototype;function yt(t,e,n,s,i,r){const o=Wi(t),l=o!==t&&!Ge(t),a=o[e];if(a!==Tf[e]){const h=a.apply(t,r);return l?we(h):h}let c=n;o!==t&&(l?c=function(h,f){return n.call(this,we(h),f,t)}:n.length>2&&(c=function(h,f){return n.call(this,h,f,t)}));const u=a.call(o,c,s);return l&&i?i(u):u}function Tl(t,e,n,s){const i=Wi(t);let r=n;return i!==t&&(Ge(t)?n.length>3&&(r=function(o,l,a){return n.call(this,o,l,a,t)}):r=function(o,l,a){return n.call(this,o,we(l),a,t)}),i[e](r,...s)}function fr(t,e,n){const s=Q(t);Te(s,"iterate",Es);const i=s[e](...n);return(i===-1||i===!1)&&Ao(n[0])?(n[0]=Q(n[0]),s[e](...n)):i}function Yn(t,e,n=[]){It(),wo();const s=Q(t)[e].apply(t,n);return So(),Tt(),s}const Rf=yo("__proto__,__v_isRef,__isVue"),Tc=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Yt));function xf(t){Yt(t)||(t=String(t));const e=Q(this);return Te(e,"has",t),e.hasOwnProperty(t)}class Rc{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const i=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return r;if(n==="__v_raw")return s===(i?r?Bf:Pc:r?Nc:Ac).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=V(e);if(!i){let a;if(o&&(a=If[n]))return a;if(n==="hasOwnProperty")return xf}const l=Reflect.get(e,n,Ee(e)?e:s);if((Yt(n)?Tc.has(n):Rf(n))||(i||Te(e,"get",n),r))return l;if(Ee(l)){const a=o&&Eo(n)?l:l.value;return i&&ue(a)?Hr(a):a}return ue(l)?i?Hr(l):Vi(l):l}}class xc extends Rc{constructor(e=!1){super(!1,e)}set(e,n,s,i){let r=e[n];if(!this._isShallow){const a=Gt(r);if(!Ge(s)&&!Gt(s)&&(r=Q(r),s=Q(s)),!V(e)&&Ee(r)&&!Ee(s))return a||(r.value=s),!0}const o=V(e)&&Eo(n)?Number(n)<e.length:X(e,n),l=Reflect.set(e,n,s,Ee(e)?e:i);return e===Q(i)&&(o?Wt(s,r)&&Et(e,"set",n,s):Et(e,"add",n,s)),l}deleteProperty(e,n){const s=X(e,n);e[n];const i=Reflect.deleteProperty(e,n);return i&&s&&Et(e,"delete",n,void 0),i}has(e,n){const s=Reflect.has(e,n);return(!Yt(n)||!Tc.has(n))&&Te(e,"has",n),s}ownKeys(e){return Te(e,"iterate",V(e)?"length":ln),Reflect.ownKeys(e)}}class Af extends Rc{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Nf=new xc,Pf=new Af,Of=new xc(!0);const Br=t=>t,Xs=t=>Reflect.getPrototypeOf(t);function Df(t,e,n){return function(...s){const i=this.__v_raw,r=Q(i),o=Sn(r),l=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,c=i[t](...s),u=n?Br:e?ai:we;return!e&&Te(r,"iterate",a?Fr:ln),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:l?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Js(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function kf(t,e){const n={get(i){const r=this.__v_raw,o=Q(r),l=Q(i);t||(Wt(i,l)&&Te(o,"get",i),Te(o,"get",l));const{has:a}=Xs(o),c=e?Br:t?ai:we;if(a.call(o,i))return c(r.get(i));if(a.call(o,l))return c(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!t&&Te(Q(i),"iterate",ln),i.size},has(i){const r=this.__v_raw,o=Q(r),l=Q(i);return t||(Wt(i,l)&&Te(o,"has",i),Te(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,a=Q(l),c=e?Br:t?ai:we;return!t&&Te(a,"iterate",ln),l.forEach((u,h)=>i.call(r,c(u),c(h),o))}};return xe(n,t?{add:Js("add"),set:Js("set"),delete:Js("delete"),clear:Js("clear")}:{add(i){!e&&!Ge(i)&&!Gt(i)&&(i=Q(i));const r=Q(this);return Xs(r).has.call(r,i)||(r.add(i),Et(r,"add",i,i)),this},set(i,r){!e&&!Ge(r)&&!Gt(r)&&(r=Q(r));const o=Q(this),{has:l,get:a}=Xs(o);let c=l.call(o,i);c||(i=Q(i),c=l.call(o,i));const u=a.call(o,i);return o.set(i,r),c?Wt(r,u)&&Et(o,"set",i,r):Et(o,"add",i,r),this},delete(i){const r=Q(this),{has:o,get:l}=Xs(r);let a=o.call(r,i);a||(i=Q(i),a=o.call(r,i)),l&&l.call(r,i);const c=r.delete(i);return a&&Et(r,"delete",i,void 0),c},clear(){const i=Q(this),r=i.size!==0,o=i.clear();return r&&Et(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=Df(i,t,e)}),n}function Ro(t,e){const n=kf(t,e);return(s,i,r)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?s:Reflect.get(X(n,i)&&i in s?n:s,i,r)}const Mf={get:Ro(!1,!1)},Lf={get:Ro(!1,!0)},Ff={get:Ro(!0,!1)};const Ac=new WeakMap,Nc=new WeakMap,Pc=new WeakMap,Bf=new WeakMap;function Hf(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Wf(t){return t.__v_skip||!Object.isExtensible(t)?0:Hf(ff(t))}function Vi(t){return Gt(t)?t:xo(t,!1,Nf,Mf,Ac)}function Oc(t){return xo(t,!1,Of,Lf,Nc)}function Hr(t){return xo(t,!0,Pf,Ff,Pc)}function xo(t,e,n,s,i){if(!ue(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=Wf(t);if(r===0)return t;const o=i.get(t);if(o)return o;const l=new Proxy(t,r===2?s:n);return i.set(t,l),l}function In(t){return Gt(t)?In(t.__v_raw):!!(t&&t.__v_isReactive)}function Gt(t){return!!(t&&t.__v_isReadonly)}function Ge(t){return!!(t&&t.__v_isShallow)}function Ao(t){return t?!!t.__v_raw:!1}function Q(t){const e=t&&t.__v_raw;return e?Q(e):t}function Vf(t){return!X(t,"__v_skip")&&Object.isExtensible(t)&&pc(t,"__v_skip",!0),t}const we=t=>ue(t)?Vi(t):t,ai=t=>ue(t)?Hr(t):t;function Ee(t){return t?t.__v_isRef===!0:!1}function Bt(t){return Dc(t,!1)}function $f(t){return Dc(t,!0)}function Dc(t,e){return Ee(t)?t:new Uf(t,e)}class Uf{constructor(e,n){this.dep=new To,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Q(e),this._value=n?e:we(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Ge(e)||Gt(e);e=s?e:Q(e),Wt(e,n)&&(this._rawValue=e,this._value=s?e:we(e),this.dep.trigger())}}function dt(t){return Ee(t)?t.value:t}const jf={get:(t,e,n)=>e==="__v_raw"?t:dt(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return Ee(i)&&!Ee(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};function kc(t){return In(t)?t:new Proxy(t,jf)}class Gf{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new To(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Cs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&re!==this)return Cc(this,!0),!0}get value(){const e=this.dep.track();return wc(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Kf(t,e,n=!1){let s,i;return $(t)?s=t:(s=t.get,i=t.set),new Gf(s,i,n)}const Zs={},ci=new WeakMap;let en;function zf(t,e=!1,n=en){if(n){let s=ci.get(n);s||ci.set(n,s=[]),s.push(t)}}function qf(t,e,n=se){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:a}=n,c=k=>i?k:Ge(k)||i===!1||i===0?bt(k,1):bt(k);let u,h,f,_,m=!1,E=!1;if(Ee(t)?(h=()=>t.value,m=Ge(t)):In(t)?(h=()=>c(t),m=!0):V(t)?(E=!0,m=t.some(k=>In(k)||Ge(k)),h=()=>t.map(k=>{if(Ee(k))return k.value;if(In(k))return c(k);if($(k))return a?a(k,2):k()})):$(t)?e?h=a?()=>a(t,2):t:h=()=>{if(f){It();try{f()}finally{Tt()}}const k=en;en=u;try{return a?a(t,3,[_]):t(_)}finally{en=k}}:h=ft,e&&i){const k=h,te=i===!0?1/0:i;h=()=>bt(k(),te)}const R=bf(),N=()=>{u.stop(),R&&R.active&&Co(R.effects,u)};if(r&&e){const k=e;e=(...te)=>{k(...te),N()}}let O=E?new Array(t.length).fill(Zs):Zs;const M=k=>{if(!(!(u.flags&1)||!u.dirty&&!k))if(e){const te=u.run();if(i||m||(E?te.some((be,he)=>Wt(be,O[he])):Wt(te,O))){f&&f();const be=en;en=u;try{const he=[te,O===Zs?void 0:E&&O[0]===Zs?[]:O,_];O=te,a?a(e,3,he):e(...he)}finally{en=be}}}else u.run()};return l&&l(M),u=new yc(h),u.scheduler=o?()=>o(M,!1):M,_=k=>zf(k,!1,u),f=u.onStop=()=>{const k=ci.get(u);if(k){if(a)a(k,4);else for(const te of k)te();ci.delete(u)}},e?s?M(!0):O=u.run():o?o(M.bind(null,!0),!0):u.run(),N.pause=u.pause.bind(u),N.resume=u.resume.bind(u),N.stop=N,N}function bt(t,e=1/0,n){if(e<=0||!ue(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Ee(t))bt(t.value,e,n);else if(V(t))for(let s=0;s<t.length;s++)bt(t[s],e,n);else if(uc(t)||Sn(t))t.forEach(s=>{bt(s,e,n)});else if(dc(t)){for(const s in t)bt(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&bt(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ws(t,e,n,s){try{return s?t(...s):t()}catch(i){$i(i,e,n)}}function _t(t,e,n,s){if($(t)){const i=Ws(t,e,n,s);return i&&hc(i)&&i.catch(r=>{$i(r,e,n)}),i}if(V(t)){const i=[];for(let r=0;r<t.length;r++)i.push(_t(t[r],e,n,s));return i}}function $i(t,e,n,s=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||se;if(e){let l=e.parent;const a=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const u=l.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](t,a,c)===!1)return}l=l.parent}if(r){It(),Ws(r,null,10,[t,a,c]),Tt();return}}Yf(t,n,i,s,o)}function Yf(t,e,n,s=!0,i=!1){if(i)throw t;console.error(t)}const Ne=[];let ut=-1;const Tn=[];let Mt=null,vn=0;const Mc=Promise.resolve();let ui=null;function Lc(t){const e=ui||Mc;return t?e.then(this?t.bind(this):t):e}function Qf(t){let e=ut+1,n=Ne.length;for(;e<n;){const s=e+n>>>1,i=Ne[s],r=bs(i);r<t||r===t&&i.flags&2?e=s+1:n=s}return e}function No(t){if(!(t.flags&1)){const e=bs(t),n=Ne[Ne.length-1];!n||!(t.flags&2)&&e>=bs(n)?Ne.push(t):Ne.splice(Qf(e),0,t),t.flags|=1,Fc()}}function Fc(){ui||(ui=Mc.then(Hc))}function Xf(t){V(t)?Tn.push(...t):Mt&&t.id===-1?Mt.splice(vn+1,0,t):t.flags&1||(Tn.push(t),t.flags|=1),Fc()}function Rl(t,e,n=ut+1){for(;n<Ne.length;n++){const s=Ne[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;Ne.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Bc(t){if(Tn.length){const e=[...new Set(Tn)].sort((n,s)=>bs(n)-bs(s));if(Tn.length=0,Mt){Mt.push(...e);return}for(Mt=e,vn=0;vn<Mt.length;vn++){const n=Mt[vn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Mt=null,vn=0}}const bs=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Hc(t){try{for(ut=0;ut<Ne.length;ut++){const e=Ne[ut];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ws(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ut<Ne.length;ut++){const e=Ne[ut];e&&(e.flags&=-2)}ut=-1,Ne.length=0,Bc(),ui=null,(Ne.length||Tn.length)&&Hc()}}let We=null,Wc=null;function hi(t){const e=We;return We=t,Wc=t&&t.type.__scopeId||null,e}function os(t,e=We,n){if(!e||t._n)return t;const s=(...i)=>{s._d&&pi(-1);const r=hi(e);let o;try{o=t(...i)}finally{hi(r),s._d&&pi(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function Wr(t,e){if(We===null)return t;const n=Ki(We),s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[r,o,l,a=se]=e[i];r&&($(r)&&(r={mounted:r,updated:r}),r.deep&&bt(o),s.push({dir:r,instance:n,value:o,oldValue:void 0,arg:l,modifiers:a}))}return t}function Jt(t,e,n,s){const i=t.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let a=l.dir[s];a&&(It(),_t(a,n,8,[t.el,l,t,e]),Tt())}}const Jf=Symbol("_vte"),Zf=t=>t.__isTeleport,ed=Symbol("_leaveCb");function Po(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Po(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Vc(t,e){return $(t)?xe({name:t.name},e,{setup:t}):t}function $c(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const fi=new WeakMap;function ls(t,e,n,s,i=!1){if(V(t)){t.forEach((m,E)=>ls(m,e&&(V(e)?e[E]:e),n,s,i));return}if(as(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&ls(t,e,n,s.component.subTree);return}const r=s.shapeFlag&4?Ki(s.component):s.el,o=i?null:r,{i:l,r:a}=t,c=e&&e.r,u=l.refs===se?l.refs={}:l.refs,h=l.setupState,f=Q(h),_=h===se?cc:m=>X(f,m);if(c!=null&&c!==a){if(xl(e),pe(c))u[c]=null,_(c)&&(h[c]=null);else if(Ee(c)){c.value=null;const m=e;m.k&&(u[m.k]=null)}}if($(a))Ws(a,l,12,[o,u]);else{const m=pe(a),E=Ee(a);if(m||E){const R=()=>{if(t.f){const N=m?_(a)?h[a]:u[a]:a.value;if(i)V(N)&&Co(N,r);else if(V(N))N.includes(r)||N.push(r);else if(m)u[a]=[r],_(a)&&(h[a]=u[a]);else{const O=[r];a.value=O,t.k&&(u[t.k]=O)}}else m?(u[a]=o,_(a)&&(h[a]=o)):E&&(a.value=o,t.k&&(u[t.k]=o))};if(o){const N=()=>{R(),fi.delete(t)};N.id=-1,fi.set(t,N),He(N,n)}else xl(t),R()}}}function xl(t){const e=fi.get(t);e&&(e.flags|=8,fi.delete(t))}Hi().requestIdleCallback;Hi().cancelIdleCallback;const as=t=>!!t.type.__asyncLoader,Uc=t=>t.type.__isKeepAlive;function td(t,e){jc(t,"a",e)}function nd(t,e){jc(t,"da",e)}function jc(t,e,n=Re){const s=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if(Ui(e,s,n),n){let i=n.parent;for(;i&&i.parent;)Uc(i.parent.vnode)&&sd(s,e,n,i),i=i.parent}}function sd(t,e,n,s){const i=Ui(e,t,s,!0);Kc(()=>{Co(s[e],i)},n)}function Ui(t,e,n=Re,s=!1){if(n){const i=n[t]||(n[t]=[]),r=e.__weh||(e.__weh=(...o)=>{It();const l=Vs(n),a=_t(e,n,t,o);return l(),Tt(),a});return s?i.unshift(r):i.push(r),r}}const At=t=>(e,n=Re)=>{(!Ss||t==="sp")&&Ui(t,(...s)=>e(...s),n)},id=At("bm"),Gc=At("m"),rd=At("bu"),od=At("u"),ld=At("bum"),Kc=At("um"),ad=At("sp"),cd=At("rtg"),ud=At("rtc");function hd(t,e=Re){Ui("ec",t,e)}const fd="components";function Oo(t,e){return pd(fd,t,!0,e)||t}const dd=Symbol.for("v-ndc");function pd(t,e,n=!0,s=!1){const i=We||Re;if(i){const r=i.type;{const l=sp(r,!1);if(l&&(l===e||l===qe(e)||l===Bi(qe(e))))return r}const o=Al(i[t]||r[t],e)||Al(i.appContext[t],e);return!o&&s?r:o}}function Al(t,e){return t&&(t[e]||t[qe(e)]||t[Bi(qe(e))])}function zc(t,e,n,s){let i;const r=n,o=V(t);if(o||pe(t)){const l=o&&In(t);let a=!1,c=!1;l&&(a=!Ge(t),c=Gt(t),t=Wi(t)),i=new Array(t.length);for(let u=0,h=t.length;u<h;u++)i[u]=e(a?c?ai(we(t[u])):we(t[u]):t[u],u,void 0,r)}else if(typeof t=="number"){i=new Array(t);for(let l=0;l<t;l++)i[l]=e(l+1,l,void 0,r)}else if(ue(t))if(t[Symbol.iterator])i=Array.from(t,(l,a)=>e(l,a,void 0,r));else{const l=Object.keys(t);i=new Array(l.length);for(let a=0,c=l.length;a<c;a++){const u=l[a];i[a]=e(t[u],u,a,r)}}else i=[];return i}const Vr=t=>t?du(t)?Ki(t):Vr(t.parent):null,cs=xe(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Vr(t.parent),$root:t=>Vr(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Yc(t),$forceUpdate:t=>t.f||(t.f=()=>{No(t.update)}),$nextTick:t=>t.n||(t.n=Lc.bind(t.proxy)),$watch:t=>Md.bind(t)}),dr=(t,e)=>t!==se&&!t.__isScriptSetup&&X(t,e),_d={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:a}=t;let c;if(e[0]!=="$"){const _=o[e];if(_!==void 0)switch(_){case 1:return s[e];case 2:return i[e];case 4:return n[e];case 3:return r[e]}else{if(dr(s,e))return o[e]=1,s[e];if(i!==se&&X(i,e))return o[e]=2,i[e];if((c=t.propsOptions[0])&&X(c,e))return o[e]=3,r[e];if(n!==se&&X(n,e))return o[e]=4,n[e];$r&&(o[e]=0)}}const u=cs[e];let h,f;if(u)return e==="$attrs"&&Te(t.attrs,"get",""),u(t);if((h=l.__cssModules)&&(h=h[e]))return h;if(n!==se&&X(n,e))return o[e]=4,n[e];if(f=a.config.globalProperties,X(f,e))return f[e]},set({_:t},e,n){const{data:s,setupState:i,ctx:r}=t;return dr(i,e)?(i[e]=n,!0):s!==se&&X(s,e)?(s[e]=n,!0):X(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(r[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:i,propsOptions:r,type:o}},l){let a,c;return!!(n[l]||t!==se&&l[0]!=="$"&&X(t,l)||dr(e,l)||(a=r[0])&&X(a,l)||X(s,l)||X(cs,l)||X(i.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:X(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Nl(t){return V(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let $r=!0;function gd(t){const e=Yc(t),n=t.proxy,s=t.ctx;$r=!1,e.beforeCreate&&Pl(e.beforeCreate,t,"bc");const{data:i,computed:r,methods:o,watch:l,provide:a,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:_,updated:m,activated:E,deactivated:R,beforeDestroy:N,beforeUnmount:O,destroyed:M,unmounted:k,render:te,renderTracked:be,renderTriggered:he,errorCaptured:nt,serverPrefetch:Pt,expose:st,inheritAttrs:Ot,components:Xt,directives:it,filters:zn}=e;if(c&&md(c,s,null),o)for(const Z in o){const q=o[Z];$(q)&&(s[Z]=q.bind(n))}if(i){const Z=i.call(n,n);ue(Z)&&(t.data=Vi(Z))}if($r=!0,r)for(const Z in r){const q=r[Z],mt=$(q)?q.bind(n,n):$(q.get)?q.get.bind(n,n):ft,Dt=!$(q)&&$(q.set)?q.set.bind(n):ft,rt=Qe({get:mt,set:Dt});Object.defineProperty(s,Z,{enumerable:!0,configurable:!0,get:()=>rt.value,set:De=>rt.value=De})}if(l)for(const Z in l)qc(l[Z],s,n,Z);if(a){const Z=$(a)?a.call(n):a;Reflect.ownKeys(Z).forEach(q=>{si(q,Z[q])})}u&&Pl(u,t,"c");function ye(Z,q){V(q)?q.forEach(mt=>Z(mt.bind(n))):q&&Z(q.bind(n))}if(ye(id,h),ye(Gc,f),ye(rd,_),ye(od,m),ye(td,E),ye(nd,R),ye(hd,nt),ye(ud,be),ye(cd,he),ye(ld,O),ye(Kc,k),ye(ad,Pt),V(st))if(st.length){const Z=t.exposed||(t.exposed={});st.forEach(q=>{Object.defineProperty(Z,q,{get:()=>n[q],set:mt=>n[q]=mt,enumerable:!0})})}else t.exposed||(t.exposed={});te&&t.render===ft&&(t.render=te),Ot!=null&&(t.inheritAttrs=Ot),Xt&&(t.components=Xt),it&&(t.directives=it),Pt&&$c(t)}function md(t,e,n=ft){V(t)&&(t=Ur(t));for(const s in t){const i=t[s];let r;ue(i)?"default"in i?r=pt(i.from||s,i.default,!0):r=pt(i.from||s):r=pt(i),Ee(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function Pl(t,e,n){_t(V(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function qc(t,e,n,s){let i=s.includes(".")?au(n,s):()=>n[s];if(pe(t)){const r=e[t];$(r)&&ii(i,r)}else if($(t))ii(i,t.bind(n));else if(ue(t))if(V(t))t.forEach(r=>qc(r,e,n,s));else{const r=$(t.handler)?t.handler.bind(n):e[t.handler];$(r)&&ii(i,r,t)}}function Yc(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=t.appContext,l=r.get(e);let a;return l?a=l:!i.length&&!n&&!s?a=e:(a={},i.length&&i.forEach(c=>di(a,c,o,!0)),di(a,e,o)),ue(e)&&r.set(e,a),a}function di(t,e,n,s=!1){const{mixins:i,extends:r}=e;r&&di(t,r,n,!0),i&&i.forEach(o=>di(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const l=yd[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const yd={data:Ol,props:Dl,emits:Dl,methods:ns,computed:ns,beforeCreate:Ae,created:Ae,beforeMount:Ae,mounted:Ae,beforeUpdate:Ae,updated:Ae,beforeDestroy:Ae,beforeUnmount:Ae,destroyed:Ae,unmounted:Ae,activated:Ae,deactivated:Ae,errorCaptured:Ae,serverPrefetch:Ae,components:ns,directives:ns,watch:Cd,provide:Ol,inject:vd};function Ol(t,e){return e?t?function(){return xe($(t)?t.call(this,this):t,$(e)?e.call(this,this):e)}:e:t}function vd(t,e){return ns(Ur(t),Ur(e))}function Ur(t){if(V(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Ae(t,e){return t?[...new Set([].concat(t,e))]:e}function ns(t,e){return t?xe(Object.create(null),t,e):e}function Dl(t,e){return t?V(t)&&V(e)?[...new Set([...t,...e])]:xe(Object.create(null),Nl(t),Nl(e??{})):e}function Cd(t,e){if(!t)return e;if(!e)return t;const n=xe(Object.create(null),t);for(const s in e)n[s]=Ae(t[s],e[s]);return n}function Qc(){return{app:null,config:{isNativeTag:cc,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ed=0;function bd(t,e){return function(s,i=null){$(s)||(s=xe({},s)),i!=null&&!ue(i)&&(i=null);const r=Qc(),o=new WeakSet,l=[];let a=!1;const c=r.app={_uid:Ed++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:rp,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&$(u.install)?(o.add(u),u.install(c,...h)):$(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!a){const _=c._ceVNode||me(s,i);return _.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),t(_,u,f),a=!0,c._container=u,u.__vue_app__=c,Ki(_.component)}},onUnmount(u){l.push(u)},unmount(){a&&(_t(l,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Rn;Rn=c;try{return u()}finally{Rn=h}}};return c}}let Rn=null;function si(t,e){if(Re){let n=Re.provides;const s=Re.parent&&Re.parent.provides;s===n&&(n=Re.provides=Object.create(s)),n[t]=e}}function pt(t,e,n=!1){const s=Jd();if(s||Rn){let i=Rn?Rn._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&t in i)return i[t];if(arguments.length>1)return n&&$(e)?e.call(s&&s.proxy):e}}const Xc={},Jc=()=>Object.create(Xc),Zc=t=>Object.getPrototypeOf(t)===Xc;function wd(t,e,n,s=!1){const i={},r=Jc();t.propsDefaults=Object.create(null),eu(t,e,i,r);for(const o in t.propsOptions[0])o in i||(i[o]=void 0);n?t.props=s?i:Oc(i):t.type.props?t.props=i:t.props=r,t.attrs=r}function Sd(t,e,n,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=t,l=Q(i),[a]=t.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(ji(t.emitsOptions,f))continue;const _=e[f];if(a)if(X(r,f))_!==r[f]&&(r[f]=_,c=!0);else{const m=qe(f);i[m]=jr(a,l,m,_,t,!1)}else _!==r[f]&&(r[f]=_,c=!0)}}}else{eu(t,e,i,r)&&(c=!0);let u;for(const h in l)(!e||!X(e,h)&&((u=hn(h))===h||!X(e,u)))&&(a?n&&(n[h]!==void 0||n[u]!==void 0)&&(i[h]=jr(a,l,h,void 0,t,!0)):delete i[h]);if(r!==l)for(const h in r)(!e||!X(e,h))&&(delete r[h],c=!0)}c&&Et(t.attrs,"set","")}function eu(t,e,n,s){const[i,r]=t.propsOptions;let o=!1,l;if(e)for(let a in e){if(ss(a))continue;const c=e[a];let u;i&&X(i,u=qe(a))?!r||!r.includes(u)?n[u]=c:(l||(l={}))[u]=c:ji(t.emitsOptions,a)||(!(a in s)||c!==s[a])&&(s[a]=c,o=!0)}if(r){const a=Q(n),c=l||se;for(let u=0;u<r.length;u++){const h=r[u];n[h]=jr(i,a,h,c[h],t,!X(c,h))}}return o}function jr(t,e,n,s,i,r){const o=t[n];if(o!=null){const l=X(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&$(a)){const{propsDefaults:c}=i;if(n in c)s=c[n];else{const u=Vs(i);s=c[n]=a.call(null,e),u()}}else s=a;i.ce&&i.ce._setProp(n,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===hn(n))&&(s=!0))}return s}const Id=new WeakMap;function tu(t,e,n=!1){const s=n?Id:e.propsCache,i=s.get(t);if(i)return i;const r=t.props,o={},l=[];let a=!1;if(!$(t)){const u=h=>{a=!0;const[f,_]=tu(h,e,!0);xe(o,f),_&&l.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!r&&!a)return ue(t)&&s.set(t,wn),wn;if(V(r))for(let u=0;u<r.length;u++){const h=qe(r[u]);kl(h)&&(o[h]=se)}else if(r)for(const u in r){const h=qe(u);if(kl(h)){const f=r[u],_=o[h]=V(f)||$(f)?{type:f}:xe({},f),m=_.type;let E=!1,R=!0;if(V(m))for(let N=0;N<m.length;++N){const O=m[N],M=$(O)&&O.name;if(M==="Boolean"){E=!0;break}else M==="String"&&(R=!1)}else E=$(m)&&m.name==="Boolean";_[0]=E,_[1]=R,(E||X(_,"default"))&&l.push(h)}}const c=[o,l];return ue(t)&&s.set(t,c),c}function kl(t){return t[0]!=="$"&&!ss(t)}const Do=t=>t==="_"||t==="_ctx"||t==="$stable",ko=t=>V(t)?t.map(ht):[ht(t)],Td=(t,e,n)=>{if(e._n)return e;const s=os((...i)=>ko(e(...i)),n);return s._c=!1,s},nu=(t,e,n)=>{const s=t._ctx;for(const i in t){if(Do(i))continue;const r=t[i];if($(r))e[i]=Td(i,r,s);else if(r!=null){const o=ko(r);e[i]=()=>o}}},su=(t,e)=>{const n=ko(e);t.slots.default=()=>n},iu=(t,e,n)=>{for(const s in e)(n||!Do(s))&&(t[s]=e[s])},Rd=(t,e,n)=>{const s=t.slots=Jc();if(t.vnode.shapeFlag&32){const i=e._;i?(iu(s,e,n),n&&pc(s,"_",i,!0)):nu(e,s)}else e&&su(t,e)},xd=(t,e,n)=>{const{vnode:s,slots:i}=t;let r=!0,o=se;if(s.shapeFlag&32){const l=e._;l?n&&l===1?r=!1:iu(i,e,n):(r=!e.$stable,nu(e,i)),o=e}else e&&(su(t,e),o={default:1});if(r)for(const l in i)!Do(l)&&o[l]==null&&delete i[l]},He=Ud;function Ad(t){return Nd(t)}function Nd(t,e){const n=Hi();n.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:a,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:_=ft,insertStaticContent:m}=t,E=(d,p,g,v=null,b=null,y=null,x=void 0,T=null,I=!!p.dynamicChildren)=>{if(d===p)return;d&&!Qn(d,p)&&(v=C(d),De(d,b,y,!0),d=null),p.patchFlag===-2&&(I=!1,p.dynamicChildren=null);const{type:w,ref:B,shapeFlag:P}=p;switch(w){case Gi:R(d,p,g,v);break;case Pn:N(d,p,g,v);break;case _r:d==null&&O(p,g,v,x);break;case Ue:Xt(d,p,g,v,b,y,x,T,I);break;default:P&1?te(d,p,g,v,b,y,x,T,I):P&6?it(d,p,g,v,b,y,x,T,I):(P&64||P&128)&&w.process(d,p,g,v,b,y,x,T,I,L)}B!=null&&b?ls(B,d&&d.ref,y,p||d,!p):B==null&&d&&d.ref!=null&&ls(d.ref,null,y,d,!0)},R=(d,p,g,v)=>{if(d==null)s(p.el=l(p.children),g,v);else{const b=p.el=d.el;p.children!==d.children&&c(b,p.children)}},N=(d,p,g,v)=>{d==null?s(p.el=a(p.children||""),g,v):p.el=d.el},O=(d,p,g,v)=>{[d.el,d.anchor]=m(d.children,p,g,v,d.el,d.anchor)},M=({el:d,anchor:p},g,v)=>{let b;for(;d&&d!==p;)b=f(d),s(d,g,v),d=b;s(p,g,v)},k=({el:d,anchor:p})=>{let g;for(;d&&d!==p;)g=f(d),i(d),d=g;i(p)},te=(d,p,g,v,b,y,x,T,I)=>{p.type==="svg"?x="svg":p.type==="math"&&(x="mathml"),d==null?be(p,g,v,b,y,x,T,I):Pt(d,p,b,y,x,T,I)},be=(d,p,g,v,b,y,x,T)=>{let I,w;const{props:B,shapeFlag:P,transition:F,dirs:W}=d;if(I=d.el=o(d.type,y,B&&B.is,B),P&8?u(I,d.children):P&16&&nt(d.children,I,null,v,b,pr(d,y),x,T),W&&Jt(d,null,v,"created"),he(I,d,d.scopeId,x,v),B){for(const ie in B)ie!=="value"&&!ss(ie)&&r(I,ie,null,B[ie],y,v);"value"in B&&r(I,"value",null,B.value,y),(w=B.onVnodeBeforeMount)&&ct(w,v,d)}W&&Jt(d,null,v,"beforeMount");const K=Pd(b,F);K&&F.beforeEnter(I),s(I,p,g),((w=B&&B.onVnodeMounted)||K||W)&&He(()=>{w&&ct(w,v,d),K&&F.enter(I),W&&Jt(d,null,v,"mounted")},b)},he=(d,p,g,v,b)=>{if(g&&_(d,g),v)for(let y=0;y<v.length;y++)_(d,v[y]);if(b){let y=b.subTree;if(p===y||uu(y.type)&&(y.ssContent===p||y.ssFallback===p)){const x=b.vnode;he(d,x,x.scopeId,x.slotScopeIds,b.parent)}}},nt=(d,p,g,v,b,y,x,T,I=0)=>{for(let w=I;w<d.length;w++){const B=d[w]=T?Lt(d[w]):ht(d[w]);E(null,B,p,g,v,b,y,x,T)}},Pt=(d,p,g,v,b,y,x)=>{const T=p.el=d.el;let{patchFlag:I,dynamicChildren:w,dirs:B}=p;I|=d.patchFlag&16;const P=d.props||se,F=p.props||se;let W;if(g&&Zt(g,!1),(W=F.onVnodeBeforeUpdate)&&ct(W,g,p,d),B&&Jt(p,d,g,"beforeUpdate"),g&&Zt(g,!0),(P.innerHTML&&F.innerHTML==null||P.textContent&&F.textContent==null)&&u(T,""),w?st(d.dynamicChildren,w,T,g,v,pr(p,b),y):x||q(d,p,T,null,g,v,pr(p,b),y,!1),I>0){if(I&16)Ot(T,P,F,g,b);else if(I&2&&P.class!==F.class&&r(T,"class",null,F.class,b),I&4&&r(T,"style",P.style,F.style,b),I&8){const K=p.dynamicProps;for(let ie=0;ie<K.length;ie++){const J=K[ie],ke=P[J],Me=F[J];(Me!==ke||J==="value")&&r(T,J,ke,Me,b,g)}}I&1&&d.children!==p.children&&u(T,p.children)}else!x&&w==null&&Ot(T,P,F,g,b);((W=F.onVnodeUpdated)||B)&&He(()=>{W&&ct(W,g,p,d),B&&Jt(p,d,g,"updated")},v)},st=(d,p,g,v,b,y,x)=>{for(let T=0;T<p.length;T++){const I=d[T],w=p[T],B=I.el&&(I.type===Ue||!Qn(I,w)||I.shapeFlag&198)?h(I.el):g;E(I,w,B,null,v,b,y,x,!0)}},Ot=(d,p,g,v,b)=>{if(p!==g){if(p!==se)for(const y in p)!ss(y)&&!(y in g)&&r(d,y,p[y],null,b,v);for(const y in g){if(ss(y))continue;const x=g[y],T=p[y];x!==T&&y!=="value"&&r(d,y,T,x,b,v)}"value"in g&&r(d,"value",p.value,g.value,b)}},Xt=(d,p,g,v,b,y,x,T,I)=>{const w=p.el=d?d.el:l(""),B=p.anchor=d?d.anchor:l("");let{patchFlag:P,dynamicChildren:F,slotScopeIds:W}=p;W&&(T=T?T.concat(W):W),d==null?(s(w,g,v),s(B,g,v),nt(p.children||[],g,B,b,y,x,T,I)):P>0&&P&64&&F&&d.dynamicChildren?(st(d.dynamicChildren,F,g,b,y,x,T),(p.key!=null||b&&p===b.subTree)&&ru(d,p,!0)):q(d,p,g,B,b,y,x,T,I)},it=(d,p,g,v,b,y,x,T,I)=>{p.slotScopeIds=T,d==null?p.shapeFlag&512?b.ctx.activate(p,g,v,x,I):zn(p,g,v,b,y,x,I):pn(d,p,I)},zn=(d,p,g,v,b,y,x)=>{const T=d.component=Xd(d,v,b);if(Uc(d)&&(T.ctx.renderer=L),Zd(T,!1,x),T.asyncDep){if(b&&b.registerDep(T,ye,x),!d.el){const I=T.subTree=me(Pn);N(null,I,p,g),d.placeholder=I.el}}else ye(T,d,p,g,b,y,x)},pn=(d,p,g)=>{const v=p.component=d.component;if(Vd(d,p,g))if(v.asyncDep&&!v.asyncResolved){Z(v,p,g);return}else v.next=p,v.update();else p.el=d.el,v.vnode=p},ye=(d,p,g,v,b,y,x)=>{const T=()=>{if(d.isMounted){let{next:P,bu:F,u:W,parent:K,vnode:ie}=d;{const lt=ou(d);if(lt){P&&(P.el=ie.el,Z(d,P,x)),lt.asyncDep.then(()=>{d.isUnmounted||T()});return}}let J=P,ke;Zt(d,!1),P?(P.el=ie.el,Z(d,P,x)):P=ie,F&&ni(F),(ke=P.props&&P.props.onVnodeBeforeUpdate)&&ct(ke,K,P,ie),Zt(d,!0);const Me=Ll(d),ot=d.subTree;d.subTree=Me,E(ot,Me,h(ot.el),C(ot),d,b,y),P.el=Me.el,J===null&&$d(d,Me.el),W&&He(W,b),(ke=P.props&&P.props.onVnodeUpdated)&&He(()=>ct(ke,K,P,ie),b)}else{let P;const{el:F,props:W}=p,{bm:K,m:ie,parent:J,root:ke,type:Me}=d,ot=as(p);Zt(d,!1),K&&ni(K),!ot&&(P=W&&W.onVnodeBeforeMount)&&ct(P,J,p),Zt(d,!0);{ke.ce&&ke.ce._def.shadowRoot!==!1&&ke.ce._injectChildStyle(Me);const lt=d.subTree=Ll(d);E(null,lt,g,v,d,b,y),p.el=lt.el}if(ie&&He(ie,b),!ot&&(P=W&&W.onVnodeMounted)){const lt=p;He(()=>ct(P,J,lt),b)}(p.shapeFlag&256||J&&as(J.vnode)&&J.vnode.shapeFlag&256)&&d.a&&He(d.a,b),d.isMounted=!0,p=g=v=null}};d.scope.on();const I=d.effect=new yc(T);d.scope.off();const w=d.update=I.run.bind(I),B=d.job=I.runIfDirty.bind(I);B.i=d,B.id=d.uid,I.scheduler=()=>No(B),Zt(d,!0),w()},Z=(d,p,g)=>{p.component=d;const v=d.vnode.props;d.vnode=p,d.next=null,Sd(d,p.props,v,g),xd(d,p.children,g),It(),Rl(d),Tt()},q=(d,p,g,v,b,y,x,T,I=!1)=>{const w=d&&d.children,B=d?d.shapeFlag:0,P=p.children,{patchFlag:F,shapeFlag:W}=p;if(F>0){if(F&128){Dt(w,P,g,v,b,y,x,T,I);return}else if(F&256){mt(w,P,g,v,b,y,x,T,I);return}}W&8?(B&16&&$e(w,b,y),P!==w&&u(g,P)):B&16?W&16?Dt(w,P,g,v,b,y,x,T,I):$e(w,b,y,!0):(B&8&&u(g,""),W&16&&nt(P,g,v,b,y,x,T,I))},mt=(d,p,g,v,b,y,x,T,I)=>{d=d||wn,p=p||wn;const w=d.length,B=p.length,P=Math.min(w,B);let F;for(F=0;F<P;F++){const W=p[F]=I?Lt(p[F]):ht(p[F]);E(d[F],W,g,null,b,y,x,T,I)}w>B?$e(d,b,y,!0,!1,P):nt(p,g,v,b,y,x,T,I,P)},Dt=(d,p,g,v,b,y,x,T,I)=>{let w=0;const B=p.length;let P=d.length-1,F=B-1;for(;w<=P&&w<=F;){const W=d[w],K=p[w]=I?Lt(p[w]):ht(p[w]);if(Qn(W,K))E(W,K,g,null,b,y,x,T,I);else break;w++}for(;w<=P&&w<=F;){const W=d[P],K=p[F]=I?Lt(p[F]):ht(p[F]);if(Qn(W,K))E(W,K,g,null,b,y,x,T,I);else break;P--,F--}if(w>P){if(w<=F){const W=F+1,K=W<B?p[W].el:v;for(;w<=F;)E(null,p[w]=I?Lt(p[w]):ht(p[w]),g,K,b,y,x,T,I),w++}}else if(w>F)for(;w<=P;)De(d[w],b,y,!0),w++;else{const W=w,K=w,ie=new Map;for(w=K;w<=F;w++){const Be=p[w]=I?Lt(p[w]):ht(p[w]);Be.key!=null&&ie.set(Be.key,w)}let J,ke=0;const Me=F-K+1;let ot=!1,lt=0;const qn=new Array(Me);for(w=0;w<Me;w++)qn[w]=0;for(w=W;w<=P;w++){const Be=d[w];if(ke>=Me){De(Be,b,y,!0);continue}let at;if(Be.key!=null)at=ie.get(Be.key);else for(J=K;J<=F;J++)if(qn[J-K]===0&&Qn(Be,p[J])){at=J;break}at===void 0?De(Be,b,y,!0):(qn[at-K]=w+1,at>=lt?lt=at:ot=!0,E(Be,p[at],g,null,b,y,x,T,I),ke++)}const El=ot?Od(qn):wn;for(J=El.length-1,w=Me-1;w>=0;w--){const Be=K+w,at=p[Be],bl=p[Be+1],wl=Be+1<B?bl.el||bl.placeholder:v;qn[w]===0?E(null,at,g,wl,b,y,x,T,I):ot&&(J<0||w!==El[J]?rt(at,g,wl,2):J--)}}},rt=(d,p,g,v,b=null)=>{const{el:y,type:x,transition:T,children:I,shapeFlag:w}=d;if(w&6){rt(d.component.subTree,p,g,v);return}if(w&128){d.suspense.move(p,g,v);return}if(w&64){x.move(d,p,g,L);return}if(x===Ue){s(y,p,g);for(let P=0;P<I.length;P++)rt(I[P],p,g,v);s(d.anchor,p,g);return}if(x===_r){M(d,p,g);return}if(v!==2&&w&1&&T)if(v===0)T.beforeEnter(y),s(y,p,g),He(()=>T.enter(y),b);else{const{leave:P,delayLeave:F,afterLeave:W}=T,K=()=>{d.ctx.isUnmounted?i(y):s(y,p,g)},ie=()=>{y._isLeaving&&y[ed](!0),P(y,()=>{K(),W&&W()})};F?F(y,K,ie):ie()}else s(y,p,g)},De=(d,p,g,v=!1,b=!1)=>{const{type:y,props:x,ref:T,children:I,dynamicChildren:w,shapeFlag:B,patchFlag:P,dirs:F,cacheIndex:W}=d;if(P===-2&&(b=!1),T!=null&&(It(),ls(T,null,g,d,!0),Tt()),W!=null&&(p.renderCache[W]=void 0),B&256){p.ctx.deactivate(d);return}const K=B&1&&F,ie=!as(d);let J;if(ie&&(J=x&&x.onVnodeBeforeUnmount)&&ct(J,p,d),B&6)Qs(d.component,g,v);else{if(B&128){d.suspense.unmount(g,v);return}K&&Jt(d,null,p,"beforeUnmount"),B&64?d.type.remove(d,p,g,L,v):w&&!w.hasOnce&&(y!==Ue||P>0&&P&64)?$e(w,p,g,!1,!0):(y===Ue&&P&384||!b&&B&16)&&$e(I,p,g),v&&_n(d)}(ie&&(J=x&&x.onVnodeUnmounted)||K)&&He(()=>{J&&ct(J,p,d),K&&Jt(d,null,p,"unmounted")},g)},_n=d=>{const{type:p,el:g,anchor:v,transition:b}=d;if(p===Ue){gn(g,v);return}if(p===_r){k(d);return}const y=()=>{i(g),b&&!b.persisted&&b.afterLeave&&b.afterLeave()};if(d.shapeFlag&1&&b&&!b.persisted){const{leave:x,delayLeave:T}=b,I=()=>x(g,y);T?T(d.el,y,I):I()}else y()},gn=(d,p)=>{let g;for(;d!==p;)g=f(d),i(d),d=g;i(p)},Qs=(d,p,g)=>{const{bum:v,scope:b,job:y,subTree:x,um:T,m:I,a:w}=d;Ml(I),Ml(w),v&&ni(v),b.stop(),y&&(y.flags|=8,De(x,d,p,g)),T&&He(T,p),He(()=>{d.isUnmounted=!0},p)},$e=(d,p,g,v=!1,b=!1,y=0)=>{for(let x=y;x<d.length;x++)De(d[x],p,g,v,b)},C=d=>{if(d.shapeFlag&6)return C(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const p=f(d.anchor||d.el),g=p&&p[Jf];return g?f(g):p};let D=!1;const A=(d,p,g)=>{d==null?p._vnode&&De(p._vnode,null,null,!0):E(p._vnode||null,d,p,null,null,null,g),p._vnode=d,D||(D=!0,Rl(),Bc(),D=!1)},L={p:E,um:De,m:rt,r:_n,mt:zn,mc:nt,pc:q,pbc:st,n:C,o:t};return{render:A,hydrate:void 0,createApp:bd(A)}}function pr({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Zt({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Pd(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function ru(t,e,n=!1){const s=t.children,i=e.children;if(V(s)&&V(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=Lt(i[r]),l.el=o.el),!n&&l.patchFlag!==-2&&ru(o,l)),l.type===Gi&&l.patchFlag!==-1&&(l.el=o.el),l.type===Pn&&!l.el&&(l.el=o.el)}}function Od(t){const e=t.slice(),n=[0];let s,i,r,o,l;const a=t.length;for(s=0;s<a;s++){const c=t[s];if(c!==0){if(i=n[n.length-1],t[i]<c){e[s]=i,n.push(s);continue}for(r=0,o=n.length-1;r<o;)l=r+o>>1,t[n[l]]<c?r=l+1:o=l;c<t[n[r]]&&(r>0&&(e[s]=n[r-1]),n[r]=s)}}for(r=n.length,o=n[r-1];r-- >0;)n[r]=o,o=e[o];return n}function ou(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ou(e)}function Ml(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Dd=Symbol.for("v-scx"),kd=()=>pt(Dd);function ii(t,e,n){return lu(t,e,n)}function lu(t,e,n=se){const{immediate:s,deep:i,flush:r,once:o}=n,l=xe({},n),a=e&&s||!e&&r!=="post";let c;if(Ss){if(r==="sync"){const _=kd();c=_.__watcherHandles||(_.__watcherHandles=[])}else if(!a){const _=()=>{};return _.stop=ft,_.resume=ft,_.pause=ft,_}}const u=Re;l.call=(_,m,E)=>_t(_,u,m,E);let h=!1;r==="post"?l.scheduler=_=>{He(_,u&&u.suspense)}:r!=="sync"&&(h=!0,l.scheduler=(_,m)=>{m?_():No(_)}),l.augmentJob=_=>{e&&(_.flags|=4),h&&(_.flags|=2,u&&(_.id=u.uid,_.i=u))};const f=qf(t,e,l);return Ss&&(c?c.push(f):a&&f()),f}function Md(t,e,n){const s=this.proxy,i=pe(t)?t.includes(".")?au(s,t):()=>s[t]:t.bind(s,s);let r;$(e)?r=e:(r=e.handler,n=e);const o=Vs(this),l=lu(i,r.bind(s),n);return o(),l}function au(t,e){const n=e.split(".");return()=>{let s=t;for(let i=0;i<n.length&&s;i++)s=s[n[i]];return s}}const Ld=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${qe(e)}Modifiers`]||t[`${hn(e)}Modifiers`];function Fd(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||se;let i=n;const r=e.startsWith("update:"),o=r&&Ld(s,e.slice(7));o&&(o.trim&&(i=n.map(u=>pe(u)?u.trim():u)),o.number&&(i=n.map(kr)));let l,a=s[l=ar(e)]||s[l=ar(qe(e))];!a&&r&&(a=s[l=ar(hn(e))]),a&&_t(a,t,6,i);const c=s[l+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,_t(c,t,6,i)}}const Bd=new WeakMap;function cu(t,e,n=!1){const s=n?Bd:e.emitsCache,i=s.get(t);if(i!==void 0)return i;const r=t.emits;let o={},l=!1;if(!$(t)){const a=c=>{const u=cu(c,e,!0);u&&(l=!0,xe(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!r&&!l?(ue(t)&&s.set(t,null),null):(V(r)?r.forEach(a=>o[a]=null):xe(o,r),ue(t)&&s.set(t,o),o)}function ji(t,e){return!t||!Mi(e)?!1:(e=e.slice(2).replace(/Once$/,""),X(t,e[0].toLowerCase()+e.slice(1))||X(t,hn(e))||X(t,e))}function Ll(t){const{type:e,vnode:n,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:a,render:c,renderCache:u,props:h,data:f,setupState:_,ctx:m,inheritAttrs:E}=t,R=hi(t);let N,O;try{if(n.shapeFlag&4){const k=i||s,te=k;N=ht(c.call(te,k,u,h,_,f,m)),O=l}else{const k=e;N=ht(k.length>1?k(h,{attrs:l,slots:o,emit:a}):k(h,null)),O=e.props?l:Hd(l)}}catch(k){us.length=0,$i(k,t,1),N=me(Pn)}let M=N;if(O&&E!==!1){const k=Object.keys(O),{shapeFlag:te}=M;k.length&&te&7&&(r&&k.some(vo)&&(O=Wd(O,r)),M=On(M,O,!1,!0))}return n.dirs&&(M=On(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&Po(M,n.transition),N=M,hi(R),N}const Hd=t=>{let e;for(const n in t)(n==="class"||n==="style"||Mi(n))&&((e||(e={}))[n]=t[n]);return e},Wd=(t,e)=>{const n={};for(const s in t)(!vo(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function Vd(t,e,n){const{props:s,children:i,component:r}=t,{props:o,children:l,patchFlag:a}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return s?Fl(s,o,c):!!o;if(a&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==s[f]&&!ji(c,f))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Fl(s,o,c):!0:!!o;return!1}function Fl(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(e[r]!==t[r]&&!ji(n,r))return!0}return!1}function $d({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const uu=t=>t.__isSuspense;function Ud(t,e){e&&e.pendingBranch?V(t)?e.effects.push(...t):e.effects.push(t):Xf(t)}const Ue=Symbol.for("v-fgt"),Gi=Symbol.for("v-txt"),Pn=Symbol.for("v-cmt"),_r=Symbol.for("v-stc"),us=[];let Ve=null;function Ke(t=!1){us.push(Ve=t?null:[])}function jd(){us.pop(),Ve=us[us.length-1]||null}let ws=1;function pi(t,e=!1){ws+=t,t<0&&Ve&&e&&(Ve.hasOnce=!0)}function Gd(t){return t.dynamicChildren=ws>0?Ve||wn:null,jd(),ws>0&&Ve&&Ve.push(t),t}function ze(t,e,n,s,i,r){return Gd(ce(t,e,n,s,i,r,!0))}function _i(t){return t?t.__v_isVNode===!0:!1}function Qn(t,e){return t.type===e.type&&t.key===e.key}const hu=({key:t})=>t??null,ri=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?pe(t)||Ee(t)||$(t)?{i:We,r:t,k:e,f:!!n}:t:null);function ce(t,e=null,n=null,s=0,i=null,r=t===Ue?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&hu(e),ref:e&&ri(e),scopeId:Wc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:We};return l?(Mo(a,n),r&128&&t.normalize(a)):n&&(a.shapeFlag|=pe(n)?8:16),ws>0&&!o&&Ve&&(a.patchFlag>0||r&6)&&a.patchFlag!==32&&Ve.push(a),a}const me=Kd;function Kd(t,e=null,n=null,s=0,i=null,r=!1){if((!t||t===dd)&&(t=Pn),_i(t)){const l=On(t,e,!0);return n&&Mo(l,n),ws>0&&!r&&Ve&&(l.shapeFlag&6?Ve[Ve.indexOf(t)]=l:Ve.push(l)),l.patchFlag=-2,l}if(ip(t)&&(t=t.__vccOpts),e){e=zd(e);let{class:l,style:a}=e;l&&!pe(l)&&(e.class=Hs(l)),ue(a)&&(Ao(a)&&!V(a)&&(a=xe({},a)),e.style=bo(a))}const o=pe(t)?1:uu(t)?128:Zf(t)?64:ue(t)?4:$(t)?2:0;return ce(t,e,n,s,i,o,r,!0)}function zd(t){return t?Ao(t)||Zc(t)?xe({},t):t:null}function On(t,e,n=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:a}=t,c=e?qd(i||{},e):i,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&hu(c),ref:e&&e.ref?n&&r?V(r)?r.concat(ri(e)):[r,ri(e)]:ri(e):r,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ue?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:a,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&On(t.ssContent),ssFallback:t.ssFallback&&On(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return a&&s&&Po(u,a.clone(u)),u}function fu(t=" ",e=0){return me(Gi,null,t,e)}function ht(t){return t==null||typeof t=="boolean"?me(Pn):V(t)?me(Ue,null,t.slice()):_i(t)?Lt(t):me(Gi,null,String(t))}function Lt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:On(t)}function Mo(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(V(e))n=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),Mo(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!Zc(e)?e._ctx=We:i===3&&We&&(We.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else $(e)?(e={default:e,_ctx:We},n=32):(e=String(e),s&64?(n=16,e=[fu(e)]):n=8);t.children=e,t.shapeFlag|=n}function qd(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=Hs([e.class,s.class]));else if(i==="style")e.style=bo([e.style,s.style]);else if(Mi(i)){const r=e[i],o=s[i];o&&r!==o&&!(V(r)&&r.includes(o))&&(e[i]=r?[].concat(r,o):o)}else i!==""&&(e[i]=s[i])}return e}function ct(t,e,n,s=null){_t(t,e,7,[n,s])}const Yd=Qc();let Qd=0;function Xd(t,e,n){const s=t.type,i=(e?e.appContext:t.appContext)||Yd,r={uid:Qd++,vnode:t,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ef(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:tu(s,i),emitsOptions:cu(s,i),emit:null,emitted:null,propsDefaults:se,inheritAttrs:s.inheritAttrs,ctx:se,data:se,props:se,attrs:se,slots:se,refs:se,setupState:se,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Fd.bind(null,r),t.ce&&t.ce(r),r}let Re=null;const Jd=()=>Re||We;let gi,Gr;{const t=Hi(),e=(n,s)=>{let i;return(i=t[n])||(i=t[n]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};gi=e("__VUE_INSTANCE_SETTERS__",n=>Re=n),Gr=e("__VUE_SSR_SETTERS__",n=>Ss=n)}const Vs=t=>{const e=Re;return gi(t),t.scope.on(),()=>{t.scope.off(),gi(e)}},Bl=()=>{Re&&Re.scope.off(),gi(null)};function du(t){return t.vnode.shapeFlag&4}let Ss=!1;function Zd(t,e=!1,n=!1){e&&Gr(e);const{props:s,children:i}=t.vnode,r=du(t);wd(t,s,r,e),Rd(t,i,n||e);const o=r?ep(t,e):void 0;return e&&Gr(!1),o}function ep(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,_d);const{setup:s}=n;if(s){It();const i=t.setupContext=s.length>1?np(t):null,r=Vs(t),o=Ws(s,t,0,[t.props,i]),l=hc(o);if(Tt(),r(),(l||t.sp)&&!as(t)&&$c(t),l){if(o.then(Bl,Bl),e)return o.then(a=>{Hl(t,a)}).catch(a=>{$i(a,t,0)});t.asyncDep=o}else Hl(t,o)}else pu(t)}function Hl(t,e,n){$(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ue(e)&&(t.setupState=kc(e)),pu(t)}function pu(t,e,n){const s=t.type;t.render||(t.render=s.render||ft);{const i=Vs(t);It();try{gd(t)}finally{Tt(),i()}}}const tp={get(t,e){return Te(t,"get",""),t[e]}};function np(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,tp),slots:t.slots,emit:t.emit,expose:e}}function Ki(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(kc(Vf(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in cs)return cs[n](t)},has(e,n){return n in e||n in cs}})):t.proxy}function sp(t,e=!0){return $(t)?t.displayName||t.name:t.name||e&&t.__name}function ip(t){return $(t)&&"__vccOpts"in t}const Qe=(t,e)=>Kf(t,e,Ss);function _u(t,e,n){try{pi(-1);const s=arguments.length;return s===2?ue(e)&&!V(e)?_i(e)?me(t,null,[e]):me(t,e):me(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&_i(n)&&(n=[n]),me(t,e,n))}finally{pi(1)}}const rp="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Kr;const Wl=typeof window<"u"&&window.trustedTypes;if(Wl)try{Kr=Wl.createPolicy("vue",{createHTML:t=>t})}catch{}const gu=Kr?t=>Kr.createHTML(t):t=>t,op="http://www.w3.org/2000/svg",lp="http://www.w3.org/1998/Math/MathML",Ct=typeof document<"u"?document:null,Vl=Ct&&Ct.createElement("template"),ap={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const i=e==="svg"?Ct.createElementNS(op,t):e==="mathml"?Ct.createElementNS(lp,t):n?Ct.createElement(t,{is:n}):Ct.createElement(t);return t==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:t=>Ct.createTextNode(t),createComment:t=>Ct.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Ct.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,i,r){const o=n?n.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===r||!(i=i.nextSibling)););else{Vl.innerHTML=gu(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const l=Vl.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},cp=Symbol("_vtc");function up(t,e,n){const s=t[cp];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const $l=Symbol("_vod"),hp=Symbol("_vsh"),fp=Symbol(""),dp=/(?:^|;)\s*display\s*:/;function pp(t,e,n){const s=t.style,i=pe(n);let r=!1;if(n&&!i){if(e)if(pe(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&oi(s,l,"")}else for(const o in e)n[o]==null&&oi(s,o,"");for(const o in n)o==="display"&&(r=!0),oi(s,o,n[o])}else if(i){if(e!==n){const o=s[fp];o&&(n+=";"+o),s.cssText=n,r=dp.test(n)}}else e&&t.removeAttribute("style");$l in t&&(t[$l]=r?s.display:"",t[hp]&&(s.display="none"))}const Ul=/\s*!important$/;function oi(t,e,n){if(V(n))n.forEach(s=>oi(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=_p(t,e);Ul.test(n)?t.setProperty(hn(s),n.replace(Ul,""),"important"):t[s]=n}}const jl=["Webkit","Moz","ms"],gr={};function _p(t,e){const n=gr[e];if(n)return n;let s=qe(e);if(s!=="filter"&&s in t)return gr[e]=s;s=Bi(s);for(let i=0;i<jl.length;i++){const r=jl[i]+s;if(r in t)return gr[e]=r}return e}const Gl="http://www.w3.org/1999/xlink";function Kl(t,e,n,s,i,r=Cf(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Gl,e.slice(6,e.length)):t.setAttributeNS(Gl,e,n):n==null||r&&!_c(n)?t.removeAttribute(e):t.setAttribute(e,r?"":Yt(n)?String(n):n)}function zl(t,e,n,s,i){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?gu(n):n);return}const r=t.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?t.getAttribute("value")||"":t.value,a=n==null?t.type==="checkbox"?"on":"":String(n);(l!==a||!("_value"in t))&&(t.value=a),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=_c(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(i||e)}function Cn(t,e,n,s){t.addEventListener(e,n,s)}function gp(t,e,n,s){t.removeEventListener(e,n,s)}const ql=Symbol("_vei");function mp(t,e,n,s,i=null){const r=t[ql]||(t[ql]={}),o=r[e];if(s&&o)o.value=s;else{const[l,a]=yp(e);if(s){const c=r[e]=Ep(s,i);Cn(t,l,c,a)}else o&&(gp(t,l,o,a),r[e]=void 0)}}const Yl=/(?:Once|Passive|Capture)$/;function yp(t){let e;if(Yl.test(t)){e={};let s;for(;s=t.match(Yl);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):hn(t.slice(2)),e]}let mr=0;const vp=Promise.resolve(),Cp=()=>mr||(vp.then(()=>mr=0),mr=Date.now());function Ep(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;_t(bp(s,n.value),e,5,[s])};return n.value=t,n.attached=Cp(),n}function bp(t,e){if(V(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>i=>!i._stopped&&s&&s(i))}else return e}const Ql=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,wp=(t,e,n,s,i,r)=>{const o=i==="svg";e==="class"?up(t,s,o):e==="style"?pp(t,n,s):Mi(e)?vo(e)||mp(t,e,n,s,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Sp(t,e,s,o))?(zl(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Kl(t,e,s,o,r,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!pe(s))?zl(t,qe(e),s,r,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Kl(t,e,s,o))};function Sp(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Ql(e)&&$(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=t.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Ql(e)&&pe(n)?!1:e in t}const Xl=t=>{const e=t.props["onUpdate:modelValue"]||!1;return V(e)?n=>ni(e,n):e};function Ip(t){t.target.composing=!0}function Jl(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const yr=Symbol("_assign"),zr={created(t,{modifiers:{lazy:e,trim:n,number:s}},i){t[yr]=Xl(i);const r=s||i.props&&i.props.type==="number";Cn(t,e?"change":"input",o=>{if(o.target.composing)return;let l=t.value;n&&(l=l.trim()),r&&(l=kr(l)),t[yr](l)}),n&&Cn(t,"change",()=>{t.value=t.value.trim()}),e||(Cn(t,"compositionstart",Ip),Cn(t,"compositionend",Jl),Cn(t,"change",Jl))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:i,number:r}},o){if(t[yr]=Xl(o),t.composing)return;const l=(r||t.type==="number")&&!/^0\d/.test(t.value)?kr(t.value):t.value,a=e??"";l!==a&&(document.activeElement===t&&t.type!=="range"&&(s&&e===n||i&&t.value.trim()===a)||(t.value=a))}},Tp=xe({patchProp:wp},ap);let Zl;function Rp(){return Zl||(Zl=Ad(Tp))}const xp=((...t)=>{const e=Rp().createApp(...t),{mount:n}=e;return e.mount=s=>{const i=Np(s);if(!i)return;const r=e._component;!$(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=n(i,!1,Ap(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e});function Ap(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Np(t){return pe(t)?document.querySelector(t):t}/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const En=typeof document<"u";function mu(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function Pp(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&mu(t.default)}const Y=Object.assign;function vr(t,e){const n={};for(const s in e){const i=e[s];n[s]=tt(i)?i.map(t):t(i)}return n}const hs=()=>{},tt=Array.isArray,yu=/#/g,Op=/&/g,Dp=/\//g,kp=/=/g,Mp=/\?/g,vu=/\+/g,Lp=/%5B/g,Fp=/%5D/g,Cu=/%5E/g,Bp=/%60/g,Eu=/%7B/g,Hp=/%7C/g,bu=/%7D/g,Wp=/%20/g;function Lo(t){return encodeURI(""+t).replace(Hp,"|").replace(Lp,"[").replace(Fp,"]")}function Vp(t){return Lo(t).replace(Eu,"{").replace(bu,"}").replace(Cu,"^")}function qr(t){return Lo(t).replace(vu,"%2B").replace(Wp,"+").replace(yu,"%23").replace(Op,"%26").replace(Bp,"`").replace(Eu,"{").replace(bu,"}").replace(Cu,"^")}function $p(t){return qr(t).replace(kp,"%3D")}function Up(t){return Lo(t).replace(yu,"%23").replace(Mp,"%3F")}function jp(t){return t==null?"":Up(t).replace(Dp,"%2F")}function Is(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const Gp=/\/$/,Kp=t=>t.replace(Gp,"");function Cr(t,e,n="/"){let s,i={},r="",o="";const l=e.indexOf("#");let a=e.indexOf("?");return l<a&&l>=0&&(a=-1),a>-1&&(s=e.slice(0,a),r=e.slice(a+1,l>-1?l:e.length),i=t(r)),l>-1&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=Qp(s??e,n),{fullPath:s+(r&&"?")+r+o,path:s,query:i,hash:Is(o)}}function zp(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function ea(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function qp(t,e,n){const s=e.matched.length-1,i=n.matched.length-1;return s>-1&&s===i&&Dn(e.matched[s],n.matched[i])&&wu(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Dn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function wu(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!Yp(t[n],e[n]))return!1;return!0}function Yp(t,e){return tt(t)?ta(t,e):tt(e)?ta(e,t):t===e}function ta(t,e){return tt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function Qp(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),i=s[s.length-1];(i===".."||i===".")&&s.push("");let r=n.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")r>1&&r--;else break;return n.slice(0,r).join("/")+"/"+s.slice(o).join("/")}const kt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var Ts;(function(t){t.pop="pop",t.push="push"})(Ts||(Ts={}));var fs;(function(t){t.back="back",t.forward="forward",t.unknown=""})(fs||(fs={}));function Xp(t){if(!t)if(En){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Kp(t)}const Jp=/^[^#]+#/;function Zp(t,e){return t.replace(Jp,"#")+e}function e_(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const zi=()=>({left:window.scrollX,top:window.scrollY});function t_(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;e=e_(i,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function na(t,e){return(history.state?history.state.position-e:-1)+t}const Yr=new Map;function n_(t,e){Yr.set(t,e)}function s_(t){const e=Yr.get(t);return Yr.delete(t),e}let i_=()=>location.protocol+"//"+location.host;function Su(t,e){const{pathname:n,search:s,hash:i}=e,r=t.indexOf("#");if(r>-1){let l=i.includes(t.slice(r))?t.slice(r).length:1,a=i.slice(l);return a[0]!=="/"&&(a="/"+a),ea(a,"")}return ea(n,t)+s+i}function r_(t,e,n,s){let i=[],r=[],o=null;const l=({state:f})=>{const _=Su(t,location),m=n.value,E=e.value;let R=0;if(f){if(n.value=_,e.value=f,o&&o===m){o=null;return}R=E?f.position-E.position:0}else s(_);i.forEach(N=>{N(n.value,m,{delta:R,type:Ts.pop,direction:R?R>0?fs.forward:fs.back:fs.unknown})})};function a(){o=n.value}function c(f){i.push(f);const _=()=>{const m=i.indexOf(f);m>-1&&i.splice(m,1)};return r.push(_),_}function u(){const{history:f}=window;f.state&&f.replaceState(Y({},f.state,{scroll:zi()}),"")}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:a,listen:c,destroy:h}}function sa(t,e,n,s=!1,i=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:i?zi():null}}function o_(t){const{history:e,location:n}=window,s={value:Su(t,n)},i={value:e.state};i.value||r(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(a,c,u){const h=t.indexOf("#"),f=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+a:i_()+t+a;try{e[u?"replaceState":"pushState"](c,"",f),i.value=c}catch(_){console.error(_),n[u?"replace":"assign"](f)}}function o(a,c){const u=Y({},e.state,sa(i.value.back,a,i.value.forward,!0),c,{position:i.value.position});r(a,u,!0),s.value=a}function l(a,c){const u=Y({},i.value,e.state,{forward:a,scroll:zi()});r(u.current,u,!0);const h=Y({},sa(s.value,a,null),{position:u.position+1},c);r(a,h,!1),s.value=a}return{location:s,state:i,push:l,replace:o}}function l_(t){t=Xp(t);const e=o_(t),n=r_(t,e.state,e.location,e.replace);function s(r,o=!0){o||n.pauseListeners(),history.go(r)}const i=Y({location:"",base:t,go:s,createHref:Zp.bind(null,t)},e,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function a_(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),l_(t)}function c_(t){return typeof t=="string"||t&&typeof t=="object"}function Iu(t){return typeof t=="string"||typeof t=="symbol"}const Tu=Symbol("");var ia;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(ia||(ia={}));function kn(t,e){return Y(new Error,{type:t,[Tu]:!0},e)}function vt(t,e){return t instanceof Error&&Tu in t&&(e==null||!!(t.type&e))}const ra="[^/]+?",u_={sensitive:!1,strict:!1,start:!0,end:!0},h_=/[.+*?^${}()[\]/\\]/g;function f_(t,e){const n=Y({},u_,e),s=[];let i=n.start?"^":"";const r=[];for(const c of t){const u=c.length?[]:[90];n.strict&&!c.length&&(i+="/");for(let h=0;h<c.length;h++){const f=c[h];let _=40+(n.sensitive?.25:0);if(f.type===0)h||(i+="/"),i+=f.value.replace(h_,"\\$&"),_+=40;else if(f.type===1){const{value:m,repeatable:E,optional:R,regexp:N}=f;r.push({name:m,repeatable:E,optional:R});const O=N||ra;if(O!==ra){_+=10;try{new RegExp(`(${O})`)}catch(k){throw new Error(`Invalid custom RegExp for param "${m}" (${O}): `+k.message)}}let M=E?`((?:${O})(?:/(?:${O}))*)`:`(${O})`;h||(M=R&&c.length<2?`(?:/${M})`:"/"+M),R&&(M+="?"),i+=M,_+=20,R&&(_+=-8),E&&(_+=-20),O===".*"&&(_+=-50)}u.push(_)}s.push(u)}if(n.strict&&n.end){const c=s.length-1;s[c][s[c].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function l(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const _=u[f]||"",m=r[f-1];h[m.name]=_&&m.repeatable?_.split("/"):_}return h}function a(c){let u="",h=!1;for(const f of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const _ of f)if(_.type===0)u+=_.value;else if(_.type===1){const{value:m,repeatable:E,optional:R}=_,N=m in c?c[m]:"";if(tt(N)&&!E)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const O=tt(N)?N.join("/"):N;if(!O)if(R)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${m}"`);u+=O}}return u||"/"}return{re:o,score:s,keys:r,parse:l,stringify:a}}function d_(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Ru(t,e){let n=0;const s=t.score,i=e.score;for(;n<s.length&&n<i.length;){const r=d_(s[n],i[n]);if(r)return r;n++}if(Math.abs(i.length-s.length)===1){if(oa(s))return 1;if(oa(i))return-1}return i.length-s.length}function oa(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const p_={type:0,value:""},__=/[a-zA-Z0-9_]/;function g_(t){if(!t)return[[]];if(t==="/")return[[p_]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${c}": ${_}`)}let n=0,s=n;const i=[];let r;function o(){r&&i.push(r),r=[]}let l=0,a,c="",u="";function h(){c&&(n===0?r.push({type:0,value:c}):n===1||n===2||n===3?(r.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:c,regexp:u,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=a}for(;l<t.length;){if(a=t[l++],a==="\\"&&n!==2){s=n,n=4;continue}switch(n){case 0:a==="/"?(c&&h(),o()):a===":"?(h(),n=1):f();break;case 4:f(),n=s;break;case 1:a==="("?n=2:__.test(a)?f():(h(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case 2:a===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:h(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&l--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),i}function m_(t,e,n){const s=f_(g_(t.path),n),i=Y(s,{record:t,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function y_(t,e){const n=[],s=new Map;e=ua({strict:!1,end:!0,sensitive:!1},e);function i(h){return s.get(h)}function r(h,f,_){const m=!_,E=aa(h);E.aliasOf=_&&_.record;const R=ua(e,h),N=[E];if("alias"in h){const k=typeof h.alias=="string"?[h.alias]:h.alias;for(const te of k)N.push(aa(Y({},E,{components:_?_.record.components:E.components,path:te,aliasOf:_?_.record:E})))}let O,M;for(const k of N){const{path:te}=k;if(f&&te[0]!=="/"){const be=f.record.path,he=be[be.length-1]==="/"?"":"/";k.path=f.record.path+(te&&he+te)}if(O=m_(k,f,R),_?_.alias.push(O):(M=M||O,M!==O&&M.alias.push(O),m&&h.name&&!ca(O)&&o(h.name)),xu(O)&&a(O),E.children){const be=E.children;for(let he=0;he<be.length;he++)r(be[he],O,_&&_.children[he])}_=_||O}return M?()=>{o(M)}:hs}function o(h){if(Iu(h)){const f=s.get(h);f&&(s.delete(h),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(h);f>-1&&(n.splice(f,1),h.record.name&&s.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function l(){return n}function a(h){const f=E_(h,n);n.splice(f,0,h),h.record.name&&!ca(h)&&s.set(h.record.name,h)}function c(h,f){let _,m={},E,R;if("name"in h&&h.name){if(_=s.get(h.name),!_)throw kn(1,{location:h});R=_.record.name,m=Y(la(f.params,_.keys.filter(M=>!M.optional).concat(_.parent?_.parent.keys.filter(M=>M.optional):[]).map(M=>M.name)),h.params&&la(h.params,_.keys.map(M=>M.name))),E=_.stringify(m)}else if(h.path!=null)E=h.path,_=n.find(M=>M.re.test(E)),_&&(m=_.parse(E),R=_.record.name);else{if(_=f.name?s.get(f.name):n.find(M=>M.re.test(f.path)),!_)throw kn(1,{location:h,currentLocation:f});R=_.record.name,m=Y({},f.params,h.params),E=_.stringify(m)}const N=[];let O=_;for(;O;)N.unshift(O.record),O=O.parent;return{name:R,path:E,params:m,matched:N,meta:C_(N)}}t.forEach(h=>r(h));function u(){n.length=0,s.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:l,getRecordMatcher:i}}function la(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function aa(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:v_(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function v_(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function ca(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function C_(t){return t.reduce((e,n)=>Y(e,n.meta),{})}function ua(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}function E_(t,e){let n=0,s=e.length;for(;n!==s;){const r=n+s>>1;Ru(t,e[r])<0?s=r:n=r+1}const i=b_(t);return i&&(s=e.lastIndexOf(i,s-1)),s}function b_(t){let e=t;for(;e=e.parent;)if(xu(e)&&Ru(t,e)===0)return e}function xu({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function w_(t){const e={};if(t===""||t==="?")return e;const s=(t[0]==="?"?t.slice(1):t).split("&");for(let i=0;i<s.length;++i){const r=s[i].replace(vu," "),o=r.indexOf("="),l=Is(o<0?r:r.slice(0,o)),a=o<0?null:Is(r.slice(o+1));if(l in e){let c=e[l];tt(c)||(c=e[l]=[c]),c.push(a)}else e[l]=a}return e}function ha(t){let e="";for(let n in t){const s=t[n];if(n=$p(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(tt(s)?s.map(r=>r&&qr(r)):[s&&qr(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function S_(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=tt(s)?s.map(i=>i==null?null:""+i):s==null?s:""+s)}return e}const I_=Symbol(""),fa=Symbol(""),Fo=Symbol(""),Bo=Symbol(""),Qr=Symbol("");function Xn(){let t=[];function e(s){return t.push(s),()=>{const i=t.indexOf(s);i>-1&&t.splice(i,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Ft(t,e,n,s,i,r=o=>o()){const o=s&&(s.enterCallbacks[i]=s.enterCallbacks[i]||[]);return()=>new Promise((l,a)=>{const c=f=>{f===!1?a(kn(4,{from:n,to:e})):f instanceof Error?a(f):c_(f)?a(kn(2,{from:e,to:f})):(o&&s.enterCallbacks[i]===o&&typeof f=="function"&&o.push(f),l())},u=r(()=>t.call(s&&s.instances[i],e,n,c));let h=Promise.resolve(u);t.length<3&&(h=h.then(c)),h.catch(f=>a(f))})}function Er(t,e,n,s,i=r=>r()){const r=[];for(const o of t)for(const l in o.components){let a=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(mu(a)){const u=(a.__vccOpts||a)[e];u&&r.push(Ft(u,n,s,o,l,i))}else{let c=a();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const h=Pp(u)?u.default:u;o.mods[l]=u,o.components[l]=h;const _=(h.__vccOpts||h)[e];return _&&Ft(_,n,s,o,l,i)()}))}}return r}function da(t){const e=pt(Fo),n=pt(Bo),s=Qe(()=>{const a=dt(t.to);return e.resolve(a)}),i=Qe(()=>{const{matched:a}=s.value,{length:c}=a,u=a[c-1],h=n.matched;if(!u||!h.length)return-1;const f=h.findIndex(Dn.bind(null,u));if(f>-1)return f;const _=pa(a[c-2]);return c>1&&pa(u)===_&&h[h.length-1].path!==_?h.findIndex(Dn.bind(null,a[c-2])):f}),r=Qe(()=>i.value>-1&&N_(n.params,s.value.params)),o=Qe(()=>i.value>-1&&i.value===n.matched.length-1&&wu(n.params,s.value.params));function l(a={}){if(A_(a)){const c=e[dt(t.replace)?"replace":"push"](dt(t.to)).catch(hs);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:s,href:Qe(()=>s.value.href),isActive:r,isExactActive:o,navigate:l}}function T_(t){return t.length===1?t[0]:t}const R_=Vc({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:da,setup(t,{slots:e}){const n=Vi(da(t)),{options:s}=pt(Fo),i=Qe(()=>({[_a(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[_a(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const r=e.default&&T_(e.default(n));return t.custom?r:_u("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},r)}}}),x_=R_;function A_(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function N_(t,e){for(const n in e){const s=e[n],i=t[n];if(typeof s=="string"){if(s!==i)return!1}else if(!tt(i)||i.length!==s.length||s.some((r,o)=>r!==i[o]))return!1}return!0}function pa(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const _a=(t,e,n)=>t??e??n,P_=Vc({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=pt(Qr),i=Qe(()=>t.route||s.value),r=pt(fa,0),o=Qe(()=>{let c=dt(r);const{matched:u}=i.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),l=Qe(()=>i.value.matched[o.value]);si(fa,Qe(()=>o.value+1)),si(I_,l),si(Qr,i);const a=Bt();return ii(()=>[a.value,l.value,t.name],([c,u,h],[f,_,m])=>{u&&(u.instances[h]=c,_&&_!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=_.leaveGuards),u.updateGuards.size||(u.updateGuards=_.updateGuards))),c&&u&&(!_||!Dn(u,_)||!f)&&(u.enterCallbacks[h]||[]).forEach(E=>E(c))},{flush:"post"}),()=>{const c=i.value,u=t.name,h=l.value,f=h&&h.components[u];if(!f)return ga(n.default,{Component:f,route:c});const _=h.props[u],m=_?_===!0?c.params:typeof _=="function"?_(c):_:null,R=_u(f,Y({},m,e,{onVnodeUnmounted:N=>{N.component.isUnmounted&&(h.instances[u]=null)},ref:a}));return ga(n.default,{Component:R,route:c})||R}}});function ga(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const O_=P_;function D_(t){const e=y_(t.routes,t),n=t.parseQuery||w_,s=t.stringifyQuery||ha,i=t.history,r=Xn(),o=Xn(),l=Xn(),a=$f(kt);let c=kt;En&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=vr.bind(null,C=>""+C),h=vr.bind(null,jp),f=vr.bind(null,Is);function _(C,D){let A,L;return Iu(C)?(A=e.getRecordMatcher(C),L=D):L=C,e.addRoute(L,A)}function m(C){const D=e.getRecordMatcher(C);D&&e.removeRoute(D)}function E(){return e.getRoutes().map(C=>C.record)}function R(C){return!!e.getRecordMatcher(C)}function N(C,D){if(D=Y({},D||a.value),typeof C=="string"){const g=Cr(n,C,D.path),v=e.resolve({path:g.path},D),b=i.createHref(g.fullPath);return Y(g,v,{params:f(v.params),hash:Is(g.hash),redirectedFrom:void 0,href:b})}let A;if(C.path!=null)A=Y({},C,{path:Cr(n,C.path,D.path).path});else{const g=Y({},C.params);for(const v in g)g[v]==null&&delete g[v];A=Y({},C,{params:h(g)}),D.params=h(D.params)}const L=e.resolve(A,D),ne=C.hash||"";L.params=u(f(L.params));const d=zp(s,Y({},C,{hash:Vp(ne),path:L.path})),p=i.createHref(d);return Y({fullPath:d,hash:ne,query:s===ha?S_(C.query):C.query||{}},L,{redirectedFrom:void 0,href:p})}function O(C){return typeof C=="string"?Cr(n,C,a.value.path):Y({},C)}function M(C,D){if(c!==C)return kn(8,{from:D,to:C})}function k(C){return he(C)}function te(C){return k(Y(O(C),{replace:!0}))}function be(C){const D=C.matched[C.matched.length-1];if(D&&D.redirect){const{redirect:A}=D;let L=typeof A=="function"?A(C):A;return typeof L=="string"&&(L=L.includes("?")||L.includes("#")?L=O(L):{path:L},L.params={}),Y({query:C.query,hash:C.hash,params:L.path!=null?{}:C.params},L)}}function he(C,D){const A=c=N(C),L=a.value,ne=C.state,d=C.force,p=C.replace===!0,g=be(A);if(g)return he(Y(O(g),{state:typeof g=="object"?Y({},ne,g.state):ne,force:d,replace:p}),D||A);const v=A;v.redirectedFrom=D;let b;return!d&&qp(s,L,A)&&(b=kn(16,{to:v,from:L}),rt(L,L,!0,!1)),(b?Promise.resolve(b):st(v,L)).catch(y=>vt(y)?vt(y,2)?y:Dt(y):q(y,v,L)).then(y=>{if(y){if(vt(y,2))return he(Y({replace:p},O(y.to),{state:typeof y.to=="object"?Y({},ne,y.to.state):ne,force:d}),D||v)}else y=Xt(v,L,!0,p,ne);return Ot(v,L,y),y})}function nt(C,D){const A=M(C,D);return A?Promise.reject(A):Promise.resolve()}function Pt(C){const D=gn.values().next().value;return D&&typeof D.runWithContext=="function"?D.runWithContext(C):C()}function st(C,D){let A;const[L,ne,d]=k_(C,D);A=Er(L.reverse(),"beforeRouteLeave",C,D);for(const g of L)g.leaveGuards.forEach(v=>{A.push(Ft(v,C,D))});const p=nt.bind(null,C,D);return A.push(p),$e(A).then(()=>{A=[];for(const g of r.list())A.push(Ft(g,C,D));return A.push(p),$e(A)}).then(()=>{A=Er(ne,"beforeRouteUpdate",C,D);for(const g of ne)g.updateGuards.forEach(v=>{A.push(Ft(v,C,D))});return A.push(p),$e(A)}).then(()=>{A=[];for(const g of d)if(g.beforeEnter)if(tt(g.beforeEnter))for(const v of g.beforeEnter)A.push(Ft(v,C,D));else A.push(Ft(g.beforeEnter,C,D));return A.push(p),$e(A)}).then(()=>(C.matched.forEach(g=>g.enterCallbacks={}),A=Er(d,"beforeRouteEnter",C,D,Pt),A.push(p),$e(A))).then(()=>{A=[];for(const g of o.list())A.push(Ft(g,C,D));return A.push(p),$e(A)}).catch(g=>vt(g,8)?g:Promise.reject(g))}function Ot(C,D,A){l.list().forEach(L=>Pt(()=>L(C,D,A)))}function Xt(C,D,A,L,ne){const d=M(C,D);if(d)return d;const p=D===kt,g=En?history.state:{};A&&(L||p?i.replace(C.fullPath,Y({scroll:p&&g&&g.scroll},ne)):i.push(C.fullPath,ne)),a.value=C,rt(C,D,A,p),Dt()}let it;function zn(){it||(it=i.listen((C,D,A)=>{if(!Qs.listening)return;const L=N(C),ne=be(L);if(ne){he(Y(ne,{replace:!0,force:!0}),L).catch(hs);return}c=L;const d=a.value;En&&n_(na(d.fullPath,A.delta),zi()),st(L,d).catch(p=>vt(p,12)?p:vt(p,2)?(he(Y(O(p.to),{force:!0}),L).then(g=>{vt(g,20)&&!A.delta&&A.type===Ts.pop&&i.go(-1,!1)}).catch(hs),Promise.reject()):(A.delta&&i.go(-A.delta,!1),q(p,L,d))).then(p=>{p=p||Xt(L,d,!1),p&&(A.delta&&!vt(p,8)?i.go(-A.delta,!1):A.type===Ts.pop&&vt(p,20)&&i.go(-1,!1)),Ot(L,d,p)}).catch(hs)}))}let pn=Xn(),ye=Xn(),Z;function q(C,D,A){Dt(C);const L=ye.list();return L.length?L.forEach(ne=>ne(C,D,A)):console.error(C),Promise.reject(C)}function mt(){return Z&&a.value!==kt?Promise.resolve():new Promise((C,D)=>{pn.add([C,D])})}function Dt(C){return Z||(Z=!C,zn(),pn.list().forEach(([D,A])=>C?A(C):D()),pn.reset()),C}function rt(C,D,A,L){const{scrollBehavior:ne}=t;if(!En||!ne)return Promise.resolve();const d=!A&&s_(na(C.fullPath,0))||(L||!A)&&history.state&&history.state.scroll||null;return Lc().then(()=>ne(C,D,d)).then(p=>p&&t_(p)).catch(p=>q(p,C,D))}const De=C=>i.go(C);let _n;const gn=new Set,Qs={currentRoute:a,listening:!0,addRoute:_,removeRoute:m,clearRoutes:e.clearRoutes,hasRoute:R,getRoutes:E,resolve:N,options:t,push:k,replace:te,go:De,back:()=>De(-1),forward:()=>De(1),beforeEach:r.add,beforeResolve:o.add,afterEach:l.add,onError:ye.add,isReady:mt,install(C){const D=this;C.component("RouterLink",x_),C.component("RouterView",O_),C.config.globalProperties.$router=D,Object.defineProperty(C.config.globalProperties,"$route",{enumerable:!0,get:()=>dt(a)}),En&&!_n&&a.value===kt&&(_n=!0,k(i.location).catch(ne=>{}));const A={};for(const ne in kt)Object.defineProperty(A,ne,{get:()=>a.value[ne],enumerable:!0});C.provide(Fo,D),C.provide(Bo,Oc(A)),C.provide(Qr,a);const L=C.unmount;gn.add(C),C.unmount=function(){gn.delete(C),gn.size<1&&(c=kt,it&&it(),it=null,a.value=kt,_n=!1,Z=!1),L()}}};function $e(C){return C.reduce((D,A)=>D.then(()=>Pt(A)),Promise.resolve())}return Qs}function k_(t,e){const n=[],s=[],i=[],r=Math.max(e.matched.length,t.matched.length);for(let o=0;o<r;o++){const l=e.matched[o];l&&(t.matched.find(c=>Dn(c,l))?s.push(l):n.push(l));const a=t.matched[o];a&&(e.matched.find(c=>Dn(c,a))||i.push(a))}return[n,s,i]}function Au(t){return pt(Bo)}const Vn=(t,e)=>{const n=t.__vccOpts||t;for(const[s,i]of e)n[s]=i;return n},M_={id:"poker-table-container"},L_={class:"vote-user"},F_={__name:"PokerTable",props:{votes:{type:Object,default:{}},revealVotes:{type:Boolean,default:!1}},setup(t){return(e,n)=>(Ke(),ze("div",M_,[(Ke(!0),ze(Ue,null,zc(t.votes,(s,i)=>(Ke(),ze("div",{class:"vote-container",key:i},[ce("div",{class:Hs(["vote-value",{voted:s.hasVoted===!0&&t.revealVotes===!1}])},vs(t.revealVotes?s.cardValue:""),3),ce("div",L_,vs(i),1)]))),128))]))}},Nu=Vn(F_,[["__scopeId","data-v-a83177ee"]]),B_={id:"cards-deck-container"},H_=["onClick"],W_={__name:"CardsDeck",props:{values:{type:[String,Array],default:["default"]},selectedValue:{type:String,default:null}},setup(t){return(e,n)=>(Ke(),ze("div",B_,[(Ke(!0),ze(Ue,null,zc(t.values,(s,i)=>(Ke(),ze("div",{class:Hs(["option-card",{selected:t.selectedValue===s}]),key:i,onClick:r=>e.$emit("selectCard",s)},vs(s),11,H_))),128))]))}},Pu=Vn(W_,[["__scopeId","data-v-2589401a"]]),V_=()=>{};var ma={};/**
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
 */const Ou={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const S=function(t,e){if(!t)throw $n(e)},$n=function(t){return new Error("Firebase Database ("+Ou.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Du=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},$_=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],l=t[n++],a=((i&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(a>>10)),e[s++]=String.fromCharCode(56320+(a&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ho={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,l=o?t[i+1]:0,a=i+2<t.length,c=a?t[i+2]:0,u=r>>2,h=(r&3)<<4|l>>4;let f=(l&15)<<2|c>>6,_=c&63;a||(_=64,o||(f=64)),s.push(n[u],n[h],n[f],n[_])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Du(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):$_(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||l==null||c==null||h==null)throw new U_;const f=r<<2|l>>4;if(s.push(f),c!==64){const _=l<<4&240|c>>2;if(s.push(_),h!==64){const m=c<<6&192|h;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class U_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ku=function(t){const e=Du(t);return Ho.encodeByteArray(e,!0)},mi=function(t){return ku(t).replace(/\./g,"")},Xr=function(t){try{return Ho.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function j_(t){return Mu(void 0,t)}function Mu(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!G_(n)||(t[n]=Mu(t[n],e[n]));return t}function G_(t){return t!=="__proto__"}/**
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
 */function K_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const z_=()=>K_().__FIREBASE_DEFAULTS__,q_=()=>{if(typeof process>"u"||typeof ma>"u")return;const t=ma.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Y_=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Xr(t[1]);return e&&JSON.parse(e)},Lu=()=>{try{return V_()||z_()||q_()||Y_()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Q_=t=>Lu()?.emulatorHosts?.[t],X_=t=>{const e=Q_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Fu=()=>Lu()?.config;/**
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
 */class $s{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Wo(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function J_(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Z_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[mi(JSON.stringify(n)),mi(JSON.stringify(o)),""].join(".")}const ds={};function eg(){const t={prod:[],emulator:[]};for(const e of Object.keys(ds))ds[e]?t.emulator.push(e):t.prod.push(e);return t}function tg(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let ya=!1;function ng(t,e){if(typeof window>"u"||typeof document>"u"||!Wo(window.location.host)||ds[t]===e||ds[t]||ya)return;ds[t]=e;function n(f){return`__firebase__banner__${f}`}const s="__firebase__banner",r=eg().prod.length>0;function o(){const f=document.getElementById(s);f&&f.remove()}function l(f){f.style.display="flex",f.style.background="#7faaf0",f.style.position="fixed",f.style.bottom="5px",f.style.left="5px",f.style.padding=".5em",f.style.borderRadius="5px",f.style.alignItems="center"}function a(f,_){f.setAttribute("width","24"),f.setAttribute("id",_),f.setAttribute("height","24"),f.setAttribute("viewBox","0 0 24 24"),f.setAttribute("fill","none"),f.style.marginLeft="-6px"}function c(){const f=document.createElement("span");return f.style.cursor="pointer",f.style.marginLeft="16px",f.style.fontSize="24px",f.innerHTML=" &times;",f.onclick=()=>{ya=!0,o()},f}function u(f,_){f.setAttribute("id",_),f.innerText="Learn more",f.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",f.setAttribute("target","__blank"),f.style.paddingLeft="5px",f.style.textDecoration="underline"}function h(){const f=tg(s),_=n("text"),m=document.getElementById(_)||document.createElement("span"),E=n("learnmore"),R=document.getElementById(E)||document.createElement("a"),N=n("preprendIcon"),O=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(f.created){const M=f.element;l(M),u(R,E);const k=c();a(O,N),M.append(O,m,R,k),document.body.appendChild(M)}r?(m.innerText="Preview backend disconnected.",O.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(O.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function sg(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Bu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(sg())}function ig(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rg(){return Ou.NODE_ADMIN===!0}function og(){try{return typeof indexedDB=="object"}catch{return!1}}function lg(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
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
 */const ag="FirebaseError";class Us extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=ag,Object.setPrototypeOf(this,Us.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Hu.prototype.create)}}class Hu{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?cg(r,s):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Us(i,l,s)}}function cg(t,e){return t.replace(ug,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const ug=/\{\$([^}]+)}/g;/**
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
 */function Rs(t){return JSON.parse(t)}function ge(t){return JSON.stringify(t)}/**
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
 */const Wu=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=Rs(Xr(r[0])||""),n=Rs(Xr(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},hg=function(t){const e=Wu(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},fg=function(t){const e=Wu(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function gt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Mn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function va(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function yi(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function vi(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(Ca(r)&&Ca(o)){if(!vi(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function Ca(t){return t!==null&&typeof t=="object"}/**
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
 */function dg(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class pg{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)s[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const f=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=l^r&(o^l),u=1518500249):(c=r^o^l,u=1859775393):h<60?(c=r&o|l&(r|o),u=2400959708):(c=r^o^l,u=3395469782);const f=(i<<5|i>>>27)+c+a+u+s[h]&4294967295;a=l,l=o,o=(r<<30|r>>>2)&4294967295,r=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function qi(t,e){return`${t} failed: ${e} argument `}/**
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
 */const _g=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,S(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Yi=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function Un(t){return t&&t._delegate?t._delegate:t}class xs{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const tn="[DEFAULT]";/**
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
 */class gg{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new $s;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(yg(e))try{this.getOrInitializeService({instanceIdentifier:tn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tn){return this.instances.has(e)}getOptions(e=tn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);s===l&&o.resolve(i)}return i}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:mg(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=tn){return this.component?this.component.multipleInstances?e:tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function mg(t){return t===tn?void 0:t}function yg(t){return t.instantiationMode==="EAGER"}/**
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
 */class vg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new gg(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var le;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(le||(le={}));const Cg={debug:le.DEBUG,verbose:le.VERBOSE,info:le.INFO,warn:le.WARN,error:le.ERROR,silent:le.SILENT},Eg=le.INFO,bg={[le.DEBUG]:"log",[le.VERBOSE]:"log",[le.INFO]:"info",[le.WARN]:"warn",[le.ERROR]:"error"},wg=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=bg[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Vu{constructor(e){this.name=e,this._logLevel=Eg,this._logHandler=wg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in le))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Cg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,le.DEBUG,...e),this._logHandler(this,le.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,le.VERBOSE,...e),this._logHandler(this,le.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,le.INFO,...e),this._logHandler(this,le.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,le.WARN,...e),this._logHandler(this,le.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,le.ERROR,...e),this._logHandler(this,le.ERROR,...e)}}const Sg=(t,e)=>e.some(n=>t instanceof n);let Ea,ba;function Ig(){return Ea||(Ea=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Tg(){return ba||(ba=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const $u=new WeakMap,Jr=new WeakMap,Uu=new WeakMap,br=new WeakMap,Vo=new WeakMap;function Rg(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Vt(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&$u.set(n,t)}).catch(()=>{}),Vo.set(e,t),e}function xg(t){if(Jr.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Jr.set(t,e)}let Zr={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Jr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Uu.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Vt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ag(t){Zr=t(Zr)}function Ng(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(wr(this),e,...n);return Uu.set(s,e.sort?e.sort():[e]),Vt(s)}:Tg().includes(t)?function(...e){return t.apply(wr(this),e),Vt($u.get(this))}:function(...e){return Vt(t.apply(wr(this),e))}}function Pg(t){return typeof t=="function"?Ng(t):(t instanceof IDBTransaction&&xg(t),Sg(t,Ig())?new Proxy(t,Zr):t)}function Vt(t){if(t instanceof IDBRequest)return Rg(t);if(br.has(t))return br.get(t);const e=Pg(t);return e!==t&&(br.set(t,e),Vo.set(e,t)),e}const wr=t=>Vo.get(t);function Og(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),l=Vt(o);return s&&o.addEventListener("upgradeneeded",a=>{s(Vt(o.result),a.oldVersion,a.newVersion,Vt(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{r&&a.addEventListener("close",()=>r()),i&&a.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const Dg=["get","getKey","getAll","getAllKeys","count"],kg=["put","add","delete","clear"],Sr=new Map;function wa(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Sr.get(e))return Sr.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=kg.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Dg.includes(n)))return;const r=async function(o,...l){const a=this.transaction(o,i?"readwrite":"readonly");let c=a.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&a.done]))[0]};return Sr.set(e,r),r}Ag(t=>({...t,get:(e,n,s)=>wa(e,n)||t.get(e,n,s),has:(e,n)=>!!wa(e,n)||t.has(e,n)}));/**
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
 */class Mg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Lg(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Lg(t){return t.getComponent()?.type==="VERSION"}const eo="@firebase/app",Sa="0.14.4";/**
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
 */const Rt=new Vu("@firebase/app"),Fg="@firebase/app-compat",Bg="@firebase/analytics-compat",Hg="@firebase/analytics",Wg="@firebase/app-check-compat",Vg="@firebase/app-check",$g="@firebase/auth",Ug="@firebase/auth-compat",jg="@firebase/database",Gg="@firebase/data-connect",Kg="@firebase/database-compat",zg="@firebase/functions",qg="@firebase/functions-compat",Yg="@firebase/installations",Qg="@firebase/installations-compat",Xg="@firebase/messaging",Jg="@firebase/messaging-compat",Zg="@firebase/performance",em="@firebase/performance-compat",tm="@firebase/remote-config",nm="@firebase/remote-config-compat",sm="@firebase/storage",im="@firebase/storage-compat",rm="@firebase/firestore",om="@firebase/ai",lm="@firebase/firestore-compat",am="firebase",cm="12.4.0";/**
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
 */const to="[DEFAULT]",um={[eo]:"fire-core",[Fg]:"fire-core-compat",[Hg]:"fire-analytics",[Bg]:"fire-analytics-compat",[Vg]:"fire-app-check",[Wg]:"fire-app-check-compat",[$g]:"fire-auth",[Ug]:"fire-auth-compat",[jg]:"fire-rtdb",[Gg]:"fire-data-connect",[Kg]:"fire-rtdb-compat",[zg]:"fire-fn",[qg]:"fire-fn-compat",[Yg]:"fire-iid",[Qg]:"fire-iid-compat",[Xg]:"fire-fcm",[Jg]:"fire-fcm-compat",[Zg]:"fire-perf",[em]:"fire-perf-compat",[tm]:"fire-rc",[nm]:"fire-rc-compat",[sm]:"fire-gcs",[im]:"fire-gcs-compat",[rm]:"fire-fst",[lm]:"fire-fst-compat",[om]:"fire-vertex","fire-js":"fire-js",[am]:"fire-js-all"};/**
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
 */const Ci=new Map,hm=new Map,no=new Map;function Ia(t,e){try{t.container.addComponent(e)}catch(n){Rt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ei(t){const e=t.name;if(no.has(e))return Rt.debug(`There were multiple attempts to register component ${e}.`),!1;no.set(e,t);for(const n of Ci.values())Ia(n,t);for(const n of hm.values())Ia(n,t);return!0}function fm(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function dm(t){return t==null?!1:t.settings!==void 0}/**
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
 */const pm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new Hu("app","Firebase",pm);/**
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
 */class _m{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new xs("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
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
 */const gm=cm;function ju(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:to,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw $t.create("bad-app-name",{appName:String(i)});if(n||(n=Fu()),!n)throw $t.create("no-options");const r=Ci.get(i);if(r){if(vi(n,r.options)&&vi(s,r.config))return r;throw $t.create("duplicate-app",{appName:i})}const o=new vg(i);for(const a of no.values())o.addComponent(a);const l=new _m(n,s,o);return Ci.set(i,l),l}function mm(t=to){const e=Ci.get(t);if(!e&&t===to&&Fu())return ju();if(!e)throw $t.create("no-app",{appName:t});return e}function xn(t,e,n){let s=um[t]??t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rt.warn(o.join(" "));return}Ei(new xs(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const ym="firebase-heartbeat-database",vm=1,As="firebase-heartbeat-store";let Ir=null;function Gu(){return Ir||(Ir=Og(ym,vm,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(As)}catch(n){console.warn(n)}}}}).catch(t=>{throw $t.create("idb-open",{originalErrorMessage:t.message})})),Ir}async function Cm(t){try{const n=(await Gu()).transaction(As),s=await n.objectStore(As).get(Ku(t));return await n.done,s}catch(e){if(e instanceof Us)Rt.warn(e.message);else{const n=$t.create("idb-get",{originalErrorMessage:e?.message});Rt.warn(n.message)}}}async function Ta(t,e){try{const s=(await Gu()).transaction(As,"readwrite");await s.objectStore(As).put(e,Ku(t)),await s.done}catch(n){if(n instanceof Us)Rt.warn(n.message);else{const s=$t.create("idb-set",{originalErrorMessage:n?.message});Rt.warn(s.message)}}}function Ku(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Em=1024,bm=30;class wm{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Im(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ra();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>bm){const i=Tm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Rt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ra(),{heartbeatsToSend:n,unsentEntries:s}=Sm(this._heartbeatsCache.heartbeats),i=mi(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Rt.warn(e),""}}}function Ra(){return new Date().toISOString().substring(0,10)}function Sm(t,e=Em){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),xa(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),xa(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Im{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return og()?lg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Cm(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ta(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ta(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function xa(t){return mi(JSON.stringify({version:2,heartbeats:t})).length}function Tm(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
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
 */function Rm(t){Ei(new xs("platform-logger",e=>new Mg(e),"PRIVATE")),Ei(new xs("heartbeat",e=>new wm(e),"PRIVATE")),xn(eo,Sa,t),xn(eo,Sa,"esm2020"),xn("fire-js","")}Rm("");var Aa={};const Na="@firebase/database",Pa="1.1.0";/**
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
 */let zu="";function xm(t){zu=t}/**
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
 */class Am{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ge(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Rs(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class Nm{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return gt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const qu=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Am(e)}}catch{}return new Nm},on=qu("localStorage"),Pm=qu("sessionStorage");/**
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
 */const An=new Vu("@firebase/database"),Om=(function(){let t=1;return function(){return t++}})(),Yu=function(t){const e=_g(t),n=new pg;n.update(e);const s=n.digest();return Ho.encodeByteArray(s)},js=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=js.apply(null,s):typeof s=="object"?e+=ge(s):e+=s,e+=" "}return e};let ps=null,Oa=!0;const Dm=function(t,e){S(!0,"Can't turn on custom loggers persistently."),An.logLevel=le.VERBOSE,ps=An.log.bind(An)},Se=function(...t){if(Oa===!0&&(Oa=!1,ps===null&&Pm.get("logging_enabled")===!0&&Dm()),ps){const e=js.apply(null,t);ps(e)}},Gs=function(t){return function(...e){Se(t,...e)}},so=function(...t){const e="FIREBASE INTERNAL ERROR: "+js(...t);An.error(e)},xt=function(...t){const e=`FIREBASE FATAL ERROR: ${js(...t)}`;throw An.error(e),new Error(e)},Oe=function(...t){const e="FIREBASE WARNING: "+js(...t);An.warn(e)},km=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Oe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},$o=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Mm=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Ln="[MIN_NAME]",an="[MAX_NAME]",fn=function(t,e){if(t===e)return 0;if(t===Ln||e===an)return-1;if(e===Ln||t===an)return 1;{const n=Da(t),s=Da(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},Lm=function(t,e){return t===e?0:t<e?-1:1},Jn=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ge(e))},Uo=function(t){if(typeof t!="object"||t===null)return ge(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=ge(e[s]),n+=":",n+=Uo(t[e[s]]);return n+="}",n},Qu=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function Ie(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Xu=function(t){S(!$o(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,l,a;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=l+s,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(a=n;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(a=0;a<64;a+=8){let f=parseInt(u.substr(a,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},Fm=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Bm=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Hm(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const Wm=new RegExp("^-?(0*)\\d{1,10}$"),Vm=-2147483648,$m=2147483647,Da=function(t){if(Wm.test(t)){const e=Number(t);if(e>=Vm&&e<=$m)return e}return null},jn=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Oe("Exception was thrown by user callback.",n),e},Math.floor(0))}},Um=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},_s=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class jm{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,dm(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Oe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class Gm{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Se("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Oe(e)}}class li{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}li.OWNER="owner";/**
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
 */const jo="5",Ju="v",Zu="s",eh="r",th="f",nh=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,sh="ls",ih="p",io="ac",rh="websocket",oh="long_polling";/**
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
 */class lh{constructor(e,n,s,i,r=!1,o="",l=!1,a=!1,c=null){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=on.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&on.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Km(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function ah(t,e,n){S(typeof e=="string","typeof type must == string"),S(typeof n=="object","typeof params must == object");let s;if(e===rh)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===oh)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Km(t)&&(n.ns=t.namespace);const i=[];return Ie(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class zm{constructor(){this.counters_={}}incrementCounter(e,n=1){gt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return j_(this.counters_)}}/**
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
 */const Tr={},Rr={};function Go(t){const e=t.toString();return Tr[e]||(Tr[e]=new zm),Tr[e]}function qm(t,e){const n=t.toString();return Rr[n]||(Rr[n]=e()),Rr[n]}/**
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
 */class Ym{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&jn(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const ka="start",Qm="close",Xm="pLPCommand",Jm="pRTLPCB",ch="id",uh="pw",hh="ser",Zm="cb",ey="seg",ty="ts",ny="d",sy="dframe",fh=1870,dh=30,iy=fh-dh,ry=25e3,oy=3e4;class bn{constructor(e,n,s,i,r,o,l){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Gs(e),this.stats_=Go(n),this.urlFn=a=>(this.appCheckToken&&(a[io]=this.appCheckToken),ah(n,oh,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Ym(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(oy)),Mm(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ko((...r)=>{const[o,l,a,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ka)this.id=l,this.password=a;else if(o===Qm)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const s={};s[ka]="t",s[hh]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Zm]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Ju]=jo,this.transportSessionId&&(s[Zu]=this.transportSessionId),this.lastSessionId&&(s[sh]=this.lastSessionId),this.applicationId&&(s[ih]=this.applicationId),this.appCheckToken&&(s[io]=this.appCheckToken),typeof location<"u"&&location.hostname&&nh.test(location.hostname)&&(s[eh]=th);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){bn.forceAllow_=!0}static forceDisallow(){bn.forceDisallow_=!0}static isAvailable(){return bn.forceAllow_?!0:!bn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Fm()&&!Bm()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ge(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=ku(n),i=Qu(s,iy);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[sy]="t",s[ch]=e,s[uh]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ge(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Ko{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Om(),window[Xm+this.uniqueCallbackIdentifier]=e,window[Jm+this.uniqueCallbackIdentifier]=n,this.myIFrame=Ko.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Se("frame writing exception"),l.stack&&Se(l.stack),Se(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Se("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[ch]=this.myID,e[uh]=this.myPW,e[hh]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+dh+s.length<=fh;){const o=this.pendingSegs.shift();s=s+"&"+ey+i+"="+o.seg+"&"+ty+i+"="+o.ts+"&"+ny+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(ry)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Se("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const ly=16384,ay=45e3;let bi=null;typeof MozWebSocket<"u"?bi=MozWebSocket:typeof WebSocket<"u"&&(bi=WebSocket);class Xe{constructor(e,n,s,i,r,o,l){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Gs(this.connId),this.stats_=Go(n),this.connURL=Xe.connectionURL_(n,o,l,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[Ju]=jo,typeof location<"u"&&location.hostname&&nh.test(location.hostname)&&(o[eh]=th),n&&(o[Zu]=n),s&&(o[sh]=s),i&&(o[io]=i),r&&(o[ih]=r),ah(e,rh,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,on.set("previous_websocket_failure",!0);try{let s;rg(),this.mySock=new bi(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Xe.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&bi!==null&&!Xe.forceDisallow_}static previouslyFailed(){return on.isInMemoryStorage||on.get("previous_websocket_failure")===!0}markConnectionHealthy(){on.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Rs(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(S(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=ge(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Qu(n,ly);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(ay))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Xe.responsesRequiredToBeHealthy=2;Xe.healthyTimeout=3e4;/**
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
 */class Ns{static get ALL_TRANSPORTS(){return[bn,Xe]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Xe&&Xe.isAvailable();let s=n&&!Xe.previouslyFailed();if(e.webSocketOnly&&(n||Oe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Xe];else{const i=this.transports_=[];for(const r of Ns.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Ns.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ns.globalTransportInitialized_=!1;/**
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
 */const cy=6e4,uy=5e3,hy=10*1024,fy=100*1024,xr="t",Ma="d",dy="s",La="r",py="e",Fa="o",Ba="a",Ha="n",Wa="p",_y="h";class gy{constructor(e,n,s,i,r,o,l,a,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Gs("c:"+this.id+":"),this.transportManager_=new Ns(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=_s(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>fy?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>hy?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(xr in e){const n=e[xr];n===Ba?this.upgradeIfSecondaryHealthy_():n===La?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Fa&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Jn("t",e),s=Jn("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Wa,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ba,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ha,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Jn("t",e),s=Jn("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Jn(xr,e);if(Ma in e){const s=e[Ma];if(n===_y){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Ha){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===dy?this.onConnectionShutdown_(s):n===La?this.onReset_(s):n===py?so("Server Error: "+s):n===Fa?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):so("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),jo!==s&&Oe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),_s(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(cy))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):_s(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(uy))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Wa,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(on.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class ph{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class _h{constructor(e){this.allowedEvents_=e,this.listeners_={},S(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){S(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class wi extends _h{static getInstance(){return new wi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Bu()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return S(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Va=32,$a=768;class ee{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function z(){return new ee("")}function U(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Kt(t){return t.pieces_.length-t.pieceNum_}function ae(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new ee(t.pieces_,e)}function zo(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function my(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ps(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function gh(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new ee(e,0)}function fe(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof ee)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new ee(n,0)}function G(t){return t.pieceNum_>=t.pieces_.length}function Pe(t,e){const n=U(t),s=U(e);if(n===null)return e;if(n===s)return Pe(ae(t),ae(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function yy(t,e){const n=Ps(t,0),s=Ps(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=fn(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function qo(t,e){if(Kt(t)!==Kt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function je(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Kt(t)>Kt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class vy{constructor(e,n){this.errorPrefix_=n,this.parts_=Ps(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Yi(this.parts_[s]);mh(this)}}function Cy(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Yi(e),mh(t)}function Ey(t){const e=t.parts_.pop();t.byteLength_-=Yi(e),t.parts_.length>0&&(t.byteLength_-=1)}function mh(t){if(t.byteLength_>$a)throw new Error(t.errorPrefix_+"has a key path longer than "+$a+" bytes ("+t.byteLength_+").");if(t.parts_.length>Va)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Va+") or object contains a cycle "+nn(t))}function nn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class Yo extends _h{static getInstance(){return new Yo}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return S(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Zn=1e3,by=300*1e3,Ua=30*1e3,wy=1.3,Sy=3e4,Iy="server_kill",ja=3;class St extends ph{constructor(e,n,s,i,r,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=St.nextPersistentConnectionId_++,this.log_=Gs("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Zn,this.maxReconnectDelay_=by,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Yo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&wi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(ge(r)),S(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new $s,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),S(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const a=l.d,c=l.s;St.warnOnListenWarnings_(a,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&gt(e,"w")){const s=Mn(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Oe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||fg(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ua)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=hg(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ge(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):so("Unrecognized action received from server: "+ge(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){S(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Sy&&(this.reconnectDelay_=Zn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*wy)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+St.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,s())},c=function(h){S(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(h)};this.realtime_={close:a,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Se("getToken() completed but was canceled"):(Se("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,l=new gy(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,_=>{Oe(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(Iy)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Oe(h),a())}}}interrupt(e){Se("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Se("Resuming connection for reason: "+e),delete this.interruptReasons_[e],va(this.interruptReasons_)&&(this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>Uo(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new ee(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){Se("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ja&&(this.reconnectDelay_=Ua,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Se("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ja&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+zu.replace(/\./g,"-")]=1,Bu()?e["framework.cordova"]=1:ig()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=wi.getInstance().currentlyOnline();return va(this.interruptReasons_)&&e}}St.nextPersistentConnectionId_=0;St.nextConnectionId_=0;/**
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
 */class Qi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new j(Ln,e),i=new j(Ln,n);return this.compare(s,i)!==0}minPost(){return j.MIN}}/**
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
 */let ei;class yh extends Qi{static get __EMPTY_NODE(){return ei}static set __EMPTY_NODE(e){ei=e}compare(e,n){return fn(e.name,n.name)}isDefinedOn(e){throw $n("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return j.MIN}maxPost(){return new j(an,ei)}makePost(e,n){return S(typeof e=="string","KeyIndex indexValue must always be a string."),new j(e,ei)}toString(){return".key"}}const Nn=new yh;/**
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
 */class ti{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ce{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??Ce.RED,this.left=i??Fe.EMPTY_NODE,this.right=r??Fe.EMPTY_NODE}copy(e,n,s,i,r){return new Ce(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Fe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Fe.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ce.RED=!0;Ce.BLACK=!1;class Ty{copy(e,n,s,i,r){return this}insert(e,n,s){return new Ce(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Fe{constructor(e,n=Fe.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Fe(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ce.BLACK,null,null))}remove(e){return new Fe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ce.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ti(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new ti(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new ti(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new ti(this.root_,null,this.comparator_,!0,e)}}Fe.EMPTY_NODE=new Ty;/**
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
 */function Ry(t,e){return fn(t.name,e.name)}function Qo(t,e){return fn(t,e)}/**
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
 */let ro;function xy(t){ro=t}const vh=function(t){return typeof t=="number"?"number:"+Xu(t):"string:"+t},Ch=function(t){if(t.isLeafNode()){const e=t.val();S(typeof e=="string"||typeof e=="number"||typeof e=="object"&&gt(e,".sv"),"Priority must be a string or number.")}else S(t===ro||t.isEmpty(),"priority of unexpected type.");S(t===ro||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Ga;class ve{static set __childrenNodeConstructor(e){Ga=e}static get __childrenNodeConstructor(){return Ga}constructor(e,n=ve.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,S(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Ch(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ve(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ve.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return G(e)?this:U(e)===".priority"?this.priorityNode_:ve.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:ve.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=U(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(S(s!==".priority"||Kt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,ve.__childrenNodeConstructor.EMPTY_NODE.updateChild(ae(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+vh(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Xu(this.value_):e+=this.value_,this.lazyHash_=Yu(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ve.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ve.__childrenNodeConstructor?-1:(S(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=ve.VALUE_TYPE_ORDER.indexOf(n),r=ve.VALUE_TYPE_ORDER.indexOf(s);return S(i>=0,"Unknown leaf type: "+n),S(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}ve.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Eh,bh;function Ay(t){Eh=t}function Ny(t){bh=t}class Py extends Qi{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?fn(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return j.MIN}maxPost(){return new j(an,new ve("[PRIORITY-POST]",bh))}makePost(e,n){const s=Eh(e);return new j(n,new ve("[PRIORITY-POST]",s))}toString(){return".priority"}}const de=new Py;/**
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
 */const Oy=Math.log(2);class Dy{constructor(e){const n=r=>parseInt(Math.log(r)/Oy,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Si=function(t,e,n,s){t.sort(e);const i=function(a,c){const u=c-a;let h,f;if(u===0)return null;if(u===1)return h=t[a],f=n?n(h):h,new Ce(f,h.node,Ce.BLACK,null,null);{const _=parseInt(u/2,10)+a,m=i(a,_),E=i(_+1,c);return h=t[_],f=n?n(h):h,new Ce(f,h.node,Ce.BLACK,m,E)}},r=function(a){let c=null,u=null,h=t.length;const f=function(m,E){const R=h-m,N=h;h-=m;const O=i(R+1,N),M=t[R],k=n?n(M):M;_(new Ce(k,M.node,E,null,O))},_=function(m){c?(c.left=m,c=m):(u=m,c=m)};for(let m=0;m<a.count;++m){const E=a.nextBitIsOne(),R=Math.pow(2,a.count-(m+1));E?f(R,Ce.BLACK):(f(R,Ce.BLACK),f(R,Ce.RED))}return u},o=new Dy(t.length),l=r(o);return new Fe(s||e,l)};/**
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
 */let Ar;const yn={};class wt{static get Default(){return S(yn&&de,"ChildrenNode.ts has not been loaded"),Ar=Ar||new wt({".priority":yn},{".priority":de}),Ar}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Mn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Fe?n:null}hasIndex(e){return gt(this.indexSet_,e.toString())}addIndex(e,n){S(e!==Nn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(j.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let l;i?l=Si(s,e.getCompare()):l=yn;const a=e.toString(),c={...this.indexSet_};c[a]=e;const u={...this.indexes_};return u[a]=l,new wt(u,c)}addToIndexes(e,n){const s=yi(this.indexes_,(i,r)=>{const o=Mn(this.indexSet_,r);if(S(o,"Missing index implementation for "+r),i===yn)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(j.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),Si(l,o.getCompare())}else return yn;else{const l=n.get(e.name);let a=i;return l&&(a=a.remove(new j(e.name,l))),a.insert(e,e.node)}});return new wt(s,this.indexSet_)}removeFromIndexes(e,n){const s=yi(this.indexes_,i=>{if(i===yn)return i;{const r=n.get(e.name);return r?i.remove(new j(e.name,r)):i}});return new wt(s,this.indexSet_)}}/**
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
 */let es;class H{static get EMPTY_NODE(){return es||(es=new H(new Fe(Qo),null,wt.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Ch(this.priorityNode_),this.children_.isEmpty()&&S(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||es}updatePriority(e){return this.children_.isEmpty()?this:new H(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?es:n}}getChild(e){const n=U(e);return n===null?this:this.getImmediateChild(n).getChild(ae(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(S(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new j(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?es:this.priorityNode_;return new H(i,o,r)}}updateChild(e,n){const s=U(e);if(s===null)return n;{S(U(e)!==".priority"||Kt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(ae(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(de,(o,l)=>{n[o]=l.val(e),s++,r&&H.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+vh(this.getPriority().val())+":"),this.forEachChild(de,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Yu(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new j(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new j(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new j(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,j.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,j.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Ks?-1:0}withIndex(e){if(e===Nn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new H(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Nn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(de),i=n.getIterator(de);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Nn?null:this.indexMap_.get(e.toString())}}H.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ky extends H{constructor(){super(new Fe(Qo),H.EMPTY_NODE,wt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return H.EMPTY_NODE}isEmpty(){return!1}}const Ks=new ky;Object.defineProperties(j,{MIN:{value:new j(Ln,H.EMPTY_NODE)},MAX:{value:new j(an,Ks)}});yh.__EMPTY_NODE=H.EMPTY_NODE;ve.__childrenNodeConstructor=H;xy(Ks);Ny(Ks);/**
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
 */const My=!0;function _e(t,e=null){if(t===null)return H.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),S(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new ve(n,_e(e))}if(!(t instanceof Array)&&My){const n=[];let s=!1;if(Ie(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=_e(l);a.isEmpty()||(s=s||!a.getPriority().isEmpty(),n.push(new j(o,a)))}}),n.length===0)return H.EMPTY_NODE;const r=Si(n,Ry,o=>o.name,Qo);if(s){const o=Si(n,de.getCompare());return new H(r,_e(e),new wt({".priority":o},{".priority":de}))}else return new H(r,_e(e),wt.Default)}else{let n=H.EMPTY_NODE;return Ie(t,(s,i)=>{if(gt(t,s)&&s.substring(0,1)!=="."){const r=_e(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(_e(e))}}Ay(_e);/**
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
 */class Ly extends Qi{constructor(e){super(),this.indexPath_=e,S(!G(e)&&U(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?fn(e.name,n.name):r}makePost(e,n){const s=_e(e),i=H.EMPTY_NODE.updateChild(this.indexPath_,s);return new j(n,i)}maxPost(){const e=H.EMPTY_NODE.updateChild(this.indexPath_,Ks);return new j(an,e)}toString(){return Ps(this.indexPath_,0).join("/")}}/**
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
 */class Fy extends Qi{compare(e,n){const s=e.node.compareTo(n.node);return s===0?fn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return j.MIN}maxPost(){return j.MAX}makePost(e,n){const s=_e(e);return new j(n,s)}toString(){return".value"}}const By=new Fy;/**
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
 */function wh(t){return{type:"value",snapshotNode:t}}function Fn(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Os(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Ds(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Hy(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class Xo{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){S(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(s.getChild(i))&&l.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Os(n,l)):S(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Fn(n,s)):o.trackChildChange(Ds(n,s,l))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(de,(i,r)=>{n.hasChild(i)||s.trackChildChange(Os(i,r))}),n.isLeafNode()||n.forEachChild(de,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Ds(i,r,o))}else s.trackChildChange(Fn(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?H.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class ks{constructor(e){this.indexedFilter_=new Xo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ks.getStartPost_(e),this.endPost_=ks.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new j(n,s))||(s=H.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=H.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(H.EMPTY_NODE);const r=this;return n.forEachChild(de,(o,l)=>{r.matches(new j(o,l))||(i=i.updateImmediateChild(o,H.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class Wy{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new ks(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new j(n,s))||(s=H.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=H.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=H.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(H.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,H.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(f,_)=>h(_,f)}else o=this.index_.getCompare();const l=e;S(l.numChildren()===this.limit_,"");const a=new j(n,s),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),u=this.rangedFilter_.matches(a);if(l.hasChild(n)){const h=l.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||l.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const _=f==null?1:o(f,a);if(u&&!s.isEmpty()&&_>=0)return r?.trackChildChange(Ds(n,s,h)),l.updateImmediateChild(n,s);{r?.trackChildChange(Os(n,h));const E=l.updateImmediateChild(n,H.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r?.trackChildChange(Fn(f.name,f.node)),E.updateImmediateChild(f.name,f.node)):E}}else return s.isEmpty()?e:u&&o(c,a)>=0?(r!=null&&(r.trackChildChange(Os(c.name,c.node)),r.trackChildChange(Fn(n,s))),l.updateImmediateChild(n,s).updateImmediateChild(c.name,H.EMPTY_NODE)):e}}/**
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
 */class Jo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=de}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return S(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return S(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ln}hasEnd(){return this.endSet_}getIndexEndValue(){return S(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return S(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:an}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return S(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===de}copy(){const e=new Jo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Vy(t){return t.loadsAllData()?new Xo(t.getIndex()):t.hasLimit()?new Wy(t):new ks(t)}function Ka(t){const e={};if(t.isDefault())return e;let n;if(t.index_===de?n="$priority":t.index_===By?n="$value":t.index_===Nn?n="$key":(S(t.index_ instanceof Ly,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ge(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=ge(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+ge(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=ge(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+ge(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function za(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==de&&(e.i=t.index_.toString()),e}/**
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
 */class Ii extends ph{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(S(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Gs("p:rest:"),this.listens_={}}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ii.getListenId_(e,s),l={};this.listens_[o]=l;const a=Ka(e._queryParams);this.restRequest_(r+".json",a,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),Mn(this.listens_,o)===l){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const s=Ii.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Ka(e._queryParams),s=e._path.toString(),i=new $s;return this.restRequest_(s+".json",n,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(s,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+dg(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(s&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=Rs(l.responseText)}catch{Oe("Failed to parse JSON response for "+o+": "+l.responseText)}s(null,a)}else l.status!==401&&l.status!==404&&Oe("Got unsuccessful REST response for "+o+" Status: "+l.status),s(l.status);s=null}},l.open("GET",o,!0),l.send()})}}/**
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
 */class $y{constructor(){this.rootNode_=H.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function Ti(){return{value:null,children:new Map}}function Sh(t,e,n){if(G(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=U(e);t.children.has(s)||t.children.set(s,Ti());const i=t.children.get(s);e=ae(e),Sh(i,e,n)}}function oo(t,e,n){t.value!==null?n(e,t.value):Uy(t,(s,i)=>{const r=new ee(e.toString()+"/"+s);oo(i,r,n)})}function Uy(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
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
 */class jy{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Ie(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
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
 */const qa=10*1e3,Gy=30*1e3,Ky=300*1e3;class zy{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new jy(e);const s=qa+(Gy-qa)*Math.random();_s(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;Ie(e,(i,r)=>{r>0&&gt(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),_s(this.reportStats_.bind(this),Math.floor(Math.random()*2*Ky))}}/**
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
 */var Je;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Je||(Je={}));function Zo(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function el(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function tl(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class Ri{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Je.ACK_USER_WRITE,this.source=Zo()}operationForChild(e){if(G(this.path)){if(this.affectedTree.value!=null)return S(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new ee(e));return new Ri(z(),n,this.revert)}}else return S(U(this.path)===e,"operationForChild called for unrelated child."),new Ri(ae(this.path),this.affectedTree,this.revert)}}/**
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
 */class Ms{constructor(e,n){this.source=e,this.path=n,this.type=Je.LISTEN_COMPLETE}operationForChild(e){return G(this.path)?new Ms(this.source,z()):new Ms(this.source,ae(this.path))}}/**
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
 */class cn{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Je.OVERWRITE}operationForChild(e){return G(this.path)?new cn(this.source,z(),this.snap.getImmediateChild(e)):new cn(this.source,ae(this.path),this.snap)}}/**
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
 */class Bn{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Je.MERGE}operationForChild(e){if(G(this.path)){const n=this.children.subtree(new ee(e));return n.isEmpty()?null:n.value?new cn(this.source,z(),n.value):new Bn(this.source,z(),n)}else return S(U(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Bn(this.source,ae(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class zt{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(G(e))return this.isFullyInitialized()&&!this.filtered_;const n=U(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class qy{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Yy(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Hy(o.childName,o.snapshotNode))}),ts(t,i,"child_removed",e,s,n),ts(t,i,"child_added",e,s,n),ts(t,i,"child_moved",r,s,n),ts(t,i,"child_changed",e,s,n),ts(t,i,"value",e,s,n),i}function ts(t,e,n,s,i,r){const o=s.filter(l=>l.type===n);o.sort((l,a)=>Xy(t,l,a)),o.forEach(l=>{const a=Qy(t,l,r);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,t.query_))})})}function Qy(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Xy(t,e,n){if(e.childName==null||n.childName==null)throw $n("Should only compare child_ events.");const s=new j(e.childName,e.snapshotNode),i=new j(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
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
 */function Xi(t,e){return{eventCache:t,serverCache:e}}function gs(t,e,n,s){return Xi(new zt(e,n,s),t.serverCache)}function Ih(t,e,n,s){return Xi(t.eventCache,new zt(e,n,s))}function xi(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function un(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let Nr;const Jy=()=>(Nr||(Nr=new Fe(Lm)),Nr);class oe{static fromObject(e){let n=new oe(null);return Ie(e,(s,i)=>{n=n.set(new ee(s),i)}),n}constructor(e,n=Jy()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:z(),value:this.value};if(G(e))return null;{const s=U(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(ae(e),n);return r!=null?{path:fe(new ee(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(G(e))return this;{const n=U(e),s=this.children.get(n);return s!==null?s.subtree(ae(e)):new oe(null)}}set(e,n){if(G(e))return new oe(n,this.children);{const s=U(e),r=(this.children.get(s)||new oe(null)).set(ae(e),n),o=this.children.insert(s,r);return new oe(this.value,o)}}remove(e){if(G(e))return this.children.isEmpty()?new oe(null):new oe(null,this.children);{const n=U(e),s=this.children.get(n);if(s){const i=s.remove(ae(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new oe(null):new oe(this.value,r)}else return this}}get(e){if(G(e))return this.value;{const n=U(e),s=this.children.get(n);return s?s.get(ae(e)):null}}setTree(e,n){if(G(e))return n;{const s=U(e),r=(this.children.get(s)||new oe(null)).setTree(ae(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new oe(this.value,o)}}fold(e){return this.fold_(z(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(fe(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,z(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(G(e))return null;{const r=U(e),o=this.children.get(r);return o?o.findOnPath_(ae(e),fe(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,z(),n)}foreachOnPath_(e,n,s){if(G(e))return this;{this.value&&s(n,this.value);const i=U(e),r=this.children.get(i);return r?r.foreachOnPath_(ae(e),fe(n,i),s):new oe(null)}}foreach(e){this.foreach_(z(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(fe(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
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
 */class et{constructor(e){this.writeTree_=e}static empty(){return new et(new oe(null))}}function ms(t,e,n){if(G(e))return new et(new oe(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=Pe(i,e);return r=r.updateChild(o,n),new et(t.writeTree_.set(i,r))}else{const i=new oe(n),r=t.writeTree_.setTree(e,i);return new et(r)}}}function lo(t,e,n){let s=t;return Ie(n,(i,r)=>{s=ms(s,fe(e,i),r)}),s}function Ya(t,e){if(G(e))return et.empty();{const n=t.writeTree_.setTree(e,new oe(null));return new et(n)}}function ao(t,e){return dn(t,e)!=null}function dn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Pe(n.path,e)):null}function Qa(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(de,(s,i)=>{e.push(new j(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new j(s,i.value))}),e}function Ut(t,e){if(G(e))return t;{const n=dn(t,e);return n!=null?new et(new oe(n)):new et(t.writeTree_.subtree(e))}}function co(t){return t.writeTree_.isEmpty()}function Hn(t,e){return Th(z(),t.writeTree_,e)}function Th(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(S(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=Th(fe(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(fe(t,".priority"),s)),n}}/**
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
 */function Ji(t,e){return Nh(e,t)}function Zy(t,e,n,s,i){S(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=ms(t.visibleWrites,e,n)),t.lastWriteId=s}function ev(t,e,n,s){S(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=lo(t.visibleWrites,e,n),t.lastWriteId=s}function tv(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function nv(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);S(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&sv(l,s.path)?i=!1:je(s.path,l.path)&&(r=!0)),o--}if(i){if(r)return iv(t),!0;if(s.snap)t.visibleWrites=Ya(t.visibleWrites,s.path);else{const l=s.children;Ie(l,a=>{t.visibleWrites=Ya(t.visibleWrites,fe(s.path,a))})}return!0}else return!1}function sv(t,e){if(t.snap)return je(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&je(fe(t.path,n),e))return!0;return!1}function iv(t){t.visibleWrites=Rh(t.allWrites,rv,z()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function rv(t){return t.visible}function Rh(t,e,n){let s=et.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let l;if(r.snap)je(n,o)?(l=Pe(n,o),s=ms(s,l,r.snap)):je(o,n)&&(l=Pe(o,n),s=ms(s,z(),r.snap.getChild(l)));else if(r.children){if(je(n,o))l=Pe(n,o),s=lo(s,l,r.children);else if(je(o,n))if(l=Pe(o,n),G(l))s=lo(s,z(),r.children);else{const a=Mn(r.children,U(l));if(a){const c=a.getChild(ae(l));s=ms(s,z(),c)}}}else throw $n("WriteRecord should have .snap or .children")}}return s}function xh(t,e,n,s,i){if(!s&&!i){const r=dn(t.visibleWrites,e);if(r!=null)return r;{const o=Ut(t.visibleWrites,e);if(co(o))return n;if(n==null&&!ao(o,z()))return null;{const l=n||H.EMPTY_NODE;return Hn(o,l)}}}else{const r=Ut(t.visibleWrites,e);if(!i&&co(r))return n;if(!i&&n==null&&!ao(r,z()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(je(c.path,e)||je(e,c.path))},l=Rh(t.allWrites,o,e),a=n||H.EMPTY_NODE;return Hn(l,a)}}}function ov(t,e,n){let s=H.EMPTY_NODE;const i=dn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(de,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=Ut(t.visibleWrites,e);return n.forEachChild(de,(o,l)=>{const a=Hn(Ut(r,new ee(o)),l);s=s.updateImmediateChild(o,a)}),Qa(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=Ut(t.visibleWrites,e);return Qa(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function lv(t,e,n,s,i){S(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=fe(e,n);if(ao(t.visibleWrites,r))return null;{const o=Ut(t.visibleWrites,r);return co(o)?i.getChild(n):Hn(o,i.getChild(n))}}function av(t,e,n,s){const i=fe(e,n),r=dn(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=Ut(t.visibleWrites,i);return Hn(o,s.getNode().getImmediateChild(n))}else return null}function cv(t,e){return dn(t.visibleWrites,e)}function uv(t,e,n,s,i,r,o){let l;const a=Ut(t.visibleWrites,e),c=dn(a,z());if(c!=null)l=c;else if(n!=null)l=Hn(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const u=[],h=o.getCompare(),f=r?l.getReverseIteratorFrom(s,o):l.getIteratorFrom(s,o);let _=f.getNext();for(;_&&u.length<i;)h(_,s)!==0&&u.push(_),_=f.getNext();return u}else return[]}function hv(){return{visibleWrites:et.empty(),allWrites:[],lastWriteId:-1}}function Ai(t,e,n,s){return xh(t.writeTree,t.treePath,e,n,s)}function nl(t,e){return ov(t.writeTree,t.treePath,e)}function Xa(t,e,n,s){return lv(t.writeTree,t.treePath,e,n,s)}function Ni(t,e){return cv(t.writeTree,fe(t.treePath,e))}function fv(t,e,n,s,i,r){return uv(t.writeTree,t.treePath,e,n,s,i,r)}function sl(t,e,n){return av(t.writeTree,t.treePath,e,n)}function Ah(t,e){return Nh(fe(t.treePath,e),t.writeTree)}function Nh(t,e){return{treePath:t,writeTree:e}}/**
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
 */class dv{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;S(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),S(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,Ds(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,Os(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Fn(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,Ds(s,e.snapshotNode,i.oldSnap));else throw $n("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class pv{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Ph=new pv;class il{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new zt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return sl(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:un(this.viewCache_),r=fv(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function _v(t){return{filter:t}}function gv(t,e){S(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),S(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function mv(t,e,n,s,i){const r=new dv;let o,l;if(n.type===Je.OVERWRITE){const c=n;c.source.fromUser?o=uo(t,e,c.path,c.snap,s,i,r):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!G(c.path),o=Pi(t,e,c.path,c.snap,s,i,l,r))}else if(n.type===Je.MERGE){const c=n;c.source.fromUser?o=vv(t,e,c.path,c.children,s,i,r):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=ho(t,e,c.path,c.children,s,i,l,r))}else if(n.type===Je.ACK_USER_WRITE){const c=n;c.revert?o=bv(t,e,c.path,s,i,r):o=Cv(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===Je.LISTEN_COMPLETE)o=Ev(t,e,n.path,s,r);else throw $n("Unknown operation type: "+n.type);const a=r.getChanges();return yv(e,o,a),{viewCache:o,changes:a}}function yv(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=xi(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(wh(xi(e)))}}function Oh(t,e,n,s,i,r){const o=e.eventCache;if(Ni(s,n)!=null)return e;{let l,a;if(G(n))if(S(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=un(e),u=c instanceof H?c:H.EMPTY_NODE,h=nl(s,u);l=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Ai(s,un(e));l=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=U(n);if(c===".priority"){S(Kt(n)===1,"Can't have a priority with additional path components");const u=o.getNode();a=e.serverCache.getNode();const h=Xa(s,n,u,a);h!=null?l=t.filter.updatePriority(u,h):l=o.getNode()}else{const u=ae(n);let h;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const f=Xa(s,n,o.getNode(),a);f!=null?h=o.getNode().getImmediateChild(c).updateChild(u,f):h=o.getNode().getImmediateChild(c)}else h=sl(s,c,e.serverCache);h!=null?l=t.filter.updateChild(o.getNode(),c,h,u,i,r):l=o.getNode()}}return gs(e,l,o.isFullyInitialized()||G(n),t.filter.filtersNodes())}}function Pi(t,e,n,s,i,r,o,l){const a=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(G(n))c=u.updateFullNode(a.getNode(),s,null);else if(u.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(n,s);c=u.updateFullNode(a.getNode(),_,null)}else{const _=U(n);if(!a.isCompleteForPath(n)&&Kt(n)>1)return e;const m=ae(n),R=a.getNode().getImmediateChild(_).updateChild(m,s);_===".priority"?c=u.updatePriority(a.getNode(),R):c=u.updateChild(a.getNode(),_,R,m,Ph,null)}const h=Ih(e,c,a.isFullyInitialized()||G(n),u.filtersNodes()),f=new il(i,h,r);return Oh(t,h,n,i,f,l)}function uo(t,e,n,s,i,r,o){const l=e.eventCache;let a,c;const u=new il(i,e,r);if(G(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),a=gs(e,c,!0,t.filter.filtersNodes());else{const h=U(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),a=gs(e,c,l.isFullyInitialized(),l.isFiltered());else{const f=ae(n),_=l.getNode().getImmediateChild(h);let m;if(G(f))m=s;else{const E=u.getCompleteChild(h);E!=null?zo(f)===".priority"&&E.getChild(gh(f)).isEmpty()?m=E:m=E.updateChild(f,s):m=H.EMPTY_NODE}if(_.equals(m))a=e;else{const E=t.filter.updateChild(l.getNode(),h,m,f,u,o);a=gs(e,E,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function Ja(t,e){return t.eventCache.isCompleteForChild(e)}function vv(t,e,n,s,i,r,o){let l=e;return s.foreach((a,c)=>{const u=fe(n,a);Ja(e,U(u))&&(l=uo(t,l,u,c,i,r,o))}),s.foreach((a,c)=>{const u=fe(n,a);Ja(e,U(u))||(l=uo(t,l,u,c,i,r,o))}),l}function Za(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function ho(t,e,n,s,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;G(n)?c=s:c=new oe(null).setTree(n,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,f)=>{if(u.hasChild(h)){const _=e.serverCache.getNode().getImmediateChild(h),m=Za(t,_,f);a=Pi(t,a,new ee(h),m,i,r,o,l)}}),c.children.inorderTraversal((h,f)=>{const _=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!u.hasChild(h)&&!_){const m=e.serverCache.getNode().getImmediateChild(h),E=Za(t,m,f);a=Pi(t,a,new ee(h),E,i,r,o,l)}}),a}function Cv(t,e,n,s,i,r,o){if(Ni(i,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(s.value!=null){if(G(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return Pi(t,e,n,a.getNode().getChild(n),i,r,l,o);if(G(n)){let c=new oe(null);return a.getNode().forEachChild(Nn,(u,h)=>{c=c.set(new ee(u),h)}),ho(t,e,n,c,i,r,l,o)}else return e}else{let c=new oe(null);return s.foreach((u,h)=>{const f=fe(n,u);a.isCompleteForPath(f)&&(c=c.set(u,a.getNode().getChild(f)))}),ho(t,e,n,c,i,r,l,o)}}function Ev(t,e,n,s,i){const r=e.serverCache,o=Ih(e,r.getNode(),r.isFullyInitialized()||G(n),r.isFiltered());return Oh(t,o,n,s,Ph,i)}function bv(t,e,n,s,i,r){let o;if(Ni(s,n)!=null)return e;{const l=new il(s,e,i),a=e.eventCache.getNode();let c;if(G(n)||U(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Ai(s,un(e));else{const h=e.serverCache.getNode();S(h instanceof H,"serverChildren would be complete if leaf node"),u=nl(s,h)}u=u,c=t.filter.updateFullNode(a,u,r)}else{const u=U(n);let h=sl(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=a.getImmediateChild(u)),h!=null?c=t.filter.updateChild(a,u,h,ae(n),l,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(a,u,H.EMPTY_NODE,ae(n),l,r):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ai(s,un(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Ni(s,z())!=null,gs(e,c,o,t.filter.filtersNodes())}}/**
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
 */class wv{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Xo(s.getIndex()),r=Vy(s);this.processor_=_v(r);const o=n.serverCache,l=n.eventCache,a=i.updateFullNode(H.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(H.EMPTY_NODE,l.getNode(),null),u=new zt(a,o.isFullyInitialized(),i.filtersNodes()),h=new zt(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=Xi(h,u),this.eventGenerator_=new qy(this.query_)}get query(){return this.query_}}function Sv(t){return t.viewCache_.serverCache.getNode()}function Iv(t){return xi(t.viewCache_)}function Tv(t,e){const n=un(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!G(e)&&!n.getImmediateChild(U(e)).isEmpty())?n.getChild(e):null}function ec(t){return t.eventRegistrations_.length===0}function Rv(t,e){t.eventRegistrations_.push(e)}function tc(t,e,n){const s=[];if(n){S(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function nc(t,e,n,s){e.type===Je.MERGE&&e.source.queryId!==null&&(S(un(t.viewCache_),"We should always have a full cache before handling merges"),S(xi(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=mv(t.processor_,i,e,n,s);return gv(t.processor_,r.viewCache),S(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Dh(t,r.changes,r.viewCache.eventCache.getNode(),null)}function xv(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(de,(r,o)=>{s.push(Fn(r,o))}),n.isFullyInitialized()&&s.push(wh(n.getNode())),Dh(t,s,n.getNode(),e)}function Dh(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return Yy(t.eventGenerator_,e,n,i)}/**
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
 */let Oi;class kh{constructor(){this.views=new Map}}function Av(t){S(!Oi,"__referenceConstructor has already been defined"),Oi=t}function Nv(){return S(Oi,"Reference.ts has not been loaded"),Oi}function Pv(t){return t.views.size===0}function rl(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return S(r!=null,"SyncTree gave us an op for an invalid query."),nc(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(nc(o,e,n,s));return r}}function Mh(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let l=Ai(n,i?s:null),a=!1;l?a=!0:s instanceof H?(l=nl(n,s),a=!1):(l=H.EMPTY_NODE,a=!1);const c=Xi(new zt(l,a,!1),new zt(s,i,!1));return new wv(e,c)}return o}function Ov(t,e,n,s,i,r){const o=Mh(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Rv(o,n),xv(o,n)}function Dv(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const l=qt(t);if(i==="default")for(const[a,c]of t.views.entries())o=o.concat(tc(c,n,s)),ec(c)&&(t.views.delete(a),c.query._queryParams.loadsAllData()||r.push(c.query));else{const a=t.views.get(i);a&&(o=o.concat(tc(a,n,s)),ec(a)&&(t.views.delete(i),a.query._queryParams.loadsAllData()||r.push(a.query)))}return l&&!qt(t)&&r.push(new(Nv())(e._repo,e._path)),{removed:r,events:o}}function Lh(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function jt(t,e){let n=null;for(const s of t.views.values())n=n||Tv(s,e);return n}function Fh(t,e){if(e._queryParams.loadsAllData())return Zi(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Bh(t,e){return Fh(t,e)!=null}function qt(t){return Zi(t)!=null}function Zi(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Di;function kv(t){S(!Di,"__referenceConstructor has already been defined"),Di=t}function Mv(){return S(Di,"Reference.ts has not been loaded"),Di}let Lv=1;class sc{constructor(e){this.listenProvider_=e,this.syncPointTree_=new oe(null),this.pendingWriteTree_=hv(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Hh(t,e,n,s,i){return Zy(t.pendingWriteTree_,e,n,s,i),i?Gn(t,new cn(Zo(),e,n)):[]}function Fv(t,e,n,s){ev(t.pendingWriteTree_,e,n,s);const i=oe.fromObject(n);return Gn(t,new Bn(Zo(),e,i))}function Ht(t,e,n=!1){const s=tv(t.pendingWriteTree_,e);if(nv(t.pendingWriteTree_,e)){let r=new oe(null);return s.snap!=null?r=r.set(z(),!0):Ie(s.children,o=>{r=r.set(new ee(o),!0)}),Gn(t,new Ri(s.path,r,n))}else return[]}function zs(t,e,n){return Gn(t,new cn(el(),e,n))}function Bv(t,e,n){const s=oe.fromObject(n);return Gn(t,new Bn(el(),e,s))}function Hv(t,e){return Gn(t,new Ms(el(),e))}function Wv(t,e,n){const s=ll(t,n);if(s){const i=al(s),r=i.path,o=i.queryId,l=Pe(r,e),a=new Ms(tl(o),l);return cl(t,r,a)}else return[]}function ki(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||Bh(o,e))){const a=Dv(o,e,n,s);Pv(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=a.removed;if(l=a.events,!i){const u=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(f,_)=>qt(_));if(u&&!h){const f=t.syncPointTree_.subtree(r);if(!f.isEmpty()){const _=Uv(f);for(let m=0;m<_.length;++m){const E=_[m],R=E.query,N=Uh(t,E);t.listenProvider_.startListening(ys(R),Ls(t,R),N.hashFn,N.onComplete)}}}!h&&c.length>0&&!s&&(u?t.listenProvider_.stopListening(ys(e),null):c.forEach(f=>{const _=t.queryToTagMap.get(er(f));t.listenProvider_.stopListening(ys(f),_)}))}jv(t,c)}return l}function Wh(t,e,n,s){const i=ll(t,s);if(i!=null){const r=al(i),o=r.path,l=r.queryId,a=Pe(o,e),c=new cn(tl(l),a,n);return cl(t,o,c)}else return[]}function Vv(t,e,n,s){const i=ll(t,s);if(i){const r=al(i),o=r.path,l=r.queryId,a=Pe(o,e),c=oe.fromObject(n),u=new Bn(tl(l),a,c);return cl(t,o,u)}else return[]}function fo(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,_)=>{const m=Pe(f,i);r=r||jt(_,m),o=o||qt(_)});let l=t.syncPointTree_.get(i);l?(o=o||qt(l),r=r||jt(l,z())):(l=new kh,t.syncPointTree_=t.syncPointTree_.set(i,l));let a;r!=null?a=!0:(a=!1,r=H.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((_,m)=>{const E=jt(m,z());E&&(r=r.updateImmediateChild(_,E))}));const c=Bh(l,e);if(!c&&!e._queryParams.loadsAllData()){const f=er(e);S(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const _=Gv();t.queryToTagMap.set(f,_),t.tagToQueryMap.set(_,f)}const u=Ji(t.pendingWriteTree_,i);let h=Ov(l,e,n,u,r,a);if(!c&&!o&&!s){const f=Fh(l,e);h=h.concat(Kv(t,e,f))}return h}function ol(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=Pe(o,e),c=jt(l,a);if(c)return c});return xh(i,e,r,n,!0)}function $v(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(c,u)=>{const h=Pe(c,n);s=s||jt(u,h)});let i=t.syncPointTree_.get(n);i?s=s||jt(i,z()):(i=new kh,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new zt(s,!0,!1):null,l=Ji(t.pendingWriteTree_,e._path),a=Mh(i,e,l,r?o.getNode():H.EMPTY_NODE,r);return Iv(a)}function Gn(t,e){return Vh(e,t.syncPointTree_,null,Ji(t.pendingWriteTree_,z()))}function Vh(t,e,n,s){if(G(t.path))return $h(t,e,n,s);{const i=e.get(z());n==null&&i!=null&&(n=jt(i,z()));let r=[];const o=U(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const c=n?n.getImmediateChild(o):null,u=Ah(s,o);r=r.concat(Vh(l,a,c,u))}return i&&(r=r.concat(rl(i,t,s,n))),r}}function $h(t,e,n,s){const i=e.get(z());n==null&&i!=null&&(n=jt(i,z()));let r=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,c=Ah(s,o),u=t.operationForChild(o);u&&(r=r.concat($h(u,l,a,c)))}),i&&(r=r.concat(rl(i,t,s,n))),r}function Uh(t,e){const n=e.query,s=Ls(t,n);return{hashFn:()=>(Sv(e)||H.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Wv(t,n._path,s):Hv(t,n._path);{const r=Hm(i,n);return ki(t,n,null,r)}}}}function Ls(t,e){const n=er(e);return t.queryToTagMap.get(n)}function er(t){return t._path.toString()+"$"+t._queryIdentifier}function ll(t,e){return t.tagToQueryMap.get(e)}function al(t){const e=t.indexOf("$");return S(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new ee(t.substr(0,e))}}function cl(t,e,n){const s=t.syncPointTree_.get(e);S(s,"Missing sync point for query tag that we're tracking");const i=Ji(t.pendingWriteTree_,e);return rl(s,n,i,null)}function Uv(t){return t.fold((e,n,s)=>{if(n&&qt(n))return[Zi(n)];{let i=[];return n&&(i=Lh(n)),Ie(s,(r,o)=>{i=i.concat(o)}),i}})}function ys(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Mv())(t._repo,t._path):t}function jv(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=er(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function Gv(){return Lv++}function Kv(t,e,n){const s=e._path,i=Ls(t,e),r=Uh(t,n),o=t.listenProvider_.startListening(ys(e),i,r.hashFn,r.onComplete),l=t.syncPointTree_.subtree(s);if(i)S(!qt(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,u,h)=>{if(!G(c)&&u&&qt(u))return[Zi(u).query];{let f=[];return u&&(f=f.concat(Lh(u).map(_=>_.query))),Ie(h,(_,m)=>{f=f.concat(m)}),f}});for(let c=0;c<a.length;++c){const u=a[c];t.listenProvider_.stopListening(ys(u),Ls(t,u))}}return o}/**
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
 */class ul{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new ul(n)}node(){return this.node_}}class hl{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=fe(this.path_,e);return new hl(this.syncTree_,n)}node(){return ol(this.syncTree_,this.path_)}}const zv=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},ic=function(t,e,n){if(!t||typeof t!="object")return t;if(S(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return qv(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Yv(t[".sv"],e);S(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},qv=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:S(!1,"Unexpected server value: "+t)}},Yv=function(t,e,n){t.hasOwnProperty("increment")||S(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&S(!1,"Unexpected increment value: "+s);const i=e.node();if(S(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},jh=function(t,e,n,s){return fl(e,new hl(n,t),s)},Gh=function(t,e,n){return fl(t,new ul(e),n)};function fl(t,e,n){const s=t.getPriority().val(),i=ic(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,l=ic(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new ve(l,_e(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new ve(i))),o.forEachChild(de,(l,a)=>{const c=fl(a,e.getImmediateChild(l),n);c!==a&&(r=r.updateImmediateChild(l,c))}),r}}/**
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
 */class dl{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function pl(t,e){let n=e instanceof ee?e:new ee(e),s=t,i=U(n);for(;i!==null;){const r=Mn(s.node.children,i)||{children:{},childCount:0};s=new dl(i,s,r),n=ae(n),i=U(n)}return s}function Kn(t){return t.node.value}function Kh(t,e){t.node.value=e,po(t)}function zh(t){return t.node.childCount>0}function Qv(t){return Kn(t)===void 0&&!zh(t)}function tr(t,e){Ie(t.node.children,(n,s)=>{e(new dl(n,t,s))})}function qh(t,e,n,s){n&&e(t),tr(t,i=>{qh(i,e,!0)})}function Xv(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function qs(t){return new ee(t.parent===null?t.name:qs(t.parent)+"/"+t.name)}function po(t){t.parent!==null&&Jv(t.parent,t.name,t)}function Jv(t,e,n){const s=Qv(n),i=gt(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,po(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,po(t))}/**
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
 */const Zv=/[\[\].#$\/\u0000-\u001F\u007F]/,eC=/[\[\].#$\u0000-\u001F\u007F]/,Pr=10*1024*1024,_l=function(t){return typeof t=="string"&&t.length!==0&&!Zv.test(t)},Yh=function(t){return typeof t=="string"&&t.length!==0&&!eC.test(t)},tC=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Yh(t)},nC=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!$o(t)||t&&typeof t=="object"&&gt(t,".sv")},sC=function(t,e,n,s){nr(qi(t,"value"),e,n)},nr=function(t,e,n){const s=n instanceof ee?new vy(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+nn(s));if(typeof e=="function")throw new Error(t+"contains a function "+nn(s)+" with contents = "+e.toString());if($o(e))throw new Error(t+"contains "+e.toString()+" "+nn(s));if(typeof e=="string"&&e.length>Pr/3&&Yi(e)>Pr)throw new Error(t+"contains a string greater than "+Pr+" utf8 bytes "+nn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(Ie(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!_l(o)))throw new Error(t+" contains an invalid key ("+o+") "+nn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Cy(s,o),nr(t,l,s),Ey(s)}),i&&r)throw new Error(t+' contains ".value" child '+nn(s)+" in addition to actual children.")}},iC=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=Ps(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!_l(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(yy);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&je(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},rC=function(t,e,n,s){const i=qi(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];Ie(e,(o,l)=>{const a=new ee(o);if(nr(i,l,fe(n,a)),zo(a)===".priority"&&!nC(l))throw new Error(i+"contains an invalid value for '"+a.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(a)}),iC(i,r)},Qh=function(t,e,n,s){if(!Yh(n))throw new Error(qi(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},oC=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Qh(t,e,n)},lC=function(t,e){if(U(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},aC=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!_l(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!tC(n))throw new Error(qi(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class cC{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function sr(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!qo(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function Xh(t,e,n){sr(t,n),Jh(t,s=>qo(s,e))}function Ye(t,e,n){sr(t,n),Jh(t,s=>je(s,e)||je(e,s))}function Jh(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(uC(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function uC(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();ps&&Se("event: "+n.toString()),jn(s)}}}/**
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
 */const hC="repo_interrupt",fC=25;class dC{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new cC,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ti(),this.transactionQueueTree_=new dl,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function pC(t,e,n){if(t.stats_=Go(t.repoInfo_),t.forceRestClient_||Um())t.server_=new Ii(t.repoInfo_,(s,i,r,o)=>{rc(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>oc(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ge(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new St(t.repoInfo_,e,(s,i,r,o)=>{rc(t,s,i,r,o)},s=>{oc(t,s)},s=>{gC(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=qm(t.repoInfo_,()=>new zy(t.stats_,t.server_)),t.infoData_=new $y,t.infoSyncTree_=new sc({startListening:(s,i,r,o)=>{let l=[];const a=t.infoData_.getNode(s._path);return a.isEmpty()||(l=zs(t.infoSyncTree_,s._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),gl(t,"connected",!1),t.serverSyncTree_=new sc({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(l,a)=>{const c=o(l,a);Ye(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function _C(t){const n=t.infoData_.getNode(new ee(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ir(t){return zv({timestamp:_C(t)})}function rc(t,e,n,s,i){t.dataUpdateCount++;const r=new ee(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const a=yi(n,c=>_e(c));o=Vv(t.serverSyncTree_,r,a,i)}else{const a=_e(n);o=Wh(t.serverSyncTree_,r,a,i)}else if(s){const a=yi(n,c=>_e(c));o=Bv(t.serverSyncTree_,r,a)}else{const a=_e(n);o=zs(t.serverSyncTree_,r,a)}let l=r;o.length>0&&(l=Wn(t,r)),Ye(t.eventQueue_,l,o)}function oc(t,e){gl(t,"connected",e),e===!1&&CC(t)}function gC(t,e){Ie(e,(n,s)=>{gl(t,n,s)})}function gl(t,e,n){const s=new ee("/.info/"+e),i=_e(n);t.infoData_.updateSnapshot(s,i);const r=zs(t.infoSyncTree_,s,i);Ye(t.eventQueue_,s,r)}function ml(t){return t.nextWriteId_++}function mC(t,e,n){const s=$v(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=_e(i).withIndex(e._queryParams.getIndex());fo(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=zs(t.serverSyncTree_,e._path,r);else{const l=Ls(t.serverSyncTree_,e);o=Wh(t.serverSyncTree_,e._path,r,l)}return Ye(t.eventQueue_,e._path,o),ki(t.serverSyncTree_,e,n,null,!0),r},i=>(Ys(t,"get for query "+ge(e)+" failed: "+i),Promise.reject(new Error(i))))}function yC(t,e,n,s,i){Ys(t,"set",{path:e.toString(),value:n,priority:s});const r=ir(t),o=_e(n,s),l=ol(t.serverSyncTree_,e),a=Gh(o,l,r),c=ml(t),u=Hh(t.serverSyncTree_,e,a,c,!0);sr(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(f,_)=>{const m=f==="ok";m||Oe("set at "+e+" failed: "+f);const E=Ht(t.serverSyncTree_,c,!m);Ye(t.eventQueue_,e,E),_o(t,i,f,_)});const h=vl(t,e);Wn(t,h),Ye(t.eventQueue_,h,[])}function vC(t,e,n,s){Ys(t,"update",{path:e.toString(),value:n});let i=!0;const r=ir(t),o={};if(Ie(n,(l,a)=>{i=!1,o[l]=jh(fe(e,l),_e(a),t.serverSyncTree_,r)}),i)Se("update() called with empty data.  Don't do anything."),_o(t,s,"ok",void 0);else{const l=ml(t),a=Fv(t.serverSyncTree_,e,o,l);sr(t.eventQueue_,a),t.server_.merge(e.toString(),n,(c,u)=>{const h=c==="ok";h||Oe("update at "+e+" failed: "+c);const f=Ht(t.serverSyncTree_,l,!h),_=f.length>0?Wn(t,e):e;Ye(t.eventQueue_,_,f),_o(t,s,c,u)}),Ie(n,c=>{const u=vl(t,fe(e,c));Wn(t,u)}),Ye(t.eventQueue_,e,[])}}function CC(t){Ys(t,"onDisconnectEvents");const e=ir(t),n=Ti();oo(t.onDisconnect_,z(),(i,r)=>{const o=jh(i,r,t.serverSyncTree_,e);Sh(n,i,o)});let s=[];oo(n,z(),(i,r)=>{s=s.concat(zs(t.serverSyncTree_,i,r));const o=vl(t,i);Wn(t,o)}),t.onDisconnect_=Ti(),Ye(t.eventQueue_,z(),s)}function EC(t,e,n){let s;U(e._path)===".info"?s=fo(t.infoSyncTree_,e,n):s=fo(t.serverSyncTree_,e,n),Xh(t.eventQueue_,e._path,s)}function bC(t,e,n){let s;U(e._path)===".info"?s=ki(t.infoSyncTree_,e,n):s=ki(t.serverSyncTree_,e,n),Xh(t.eventQueue_,e._path,s)}function wC(t){t.persistentConnection_&&t.persistentConnection_.interrupt(hC)}function Ys(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Se(n,...e)}function _o(t,e,n,s){e&&jn(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Zh(t,e,n){return ol(t.serverSyncTree_,e,n)||H.EMPTY_NODE}function yl(t,e=t.transactionQueueTree_){if(e||rr(t,e),Kn(e)){const n=tf(t,e);S(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&SC(t,qs(e),n)}else zh(e)&&tr(e,n=>{yl(t,n)})}function SC(t,e,n){const s=n.map(c=>c.currentWriteId),i=Zh(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const u=n[c];S(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=Pe(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const l=r.val(!0),a=e;t.server_.put(a.toString(),l,c=>{Ys(t,"transaction put response",{path:a.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let f=0;f<n.length;f++)n[f].status=2,u=u.concat(Ht(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&h.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();rr(t,pl(t.transactionQueueTree_,e)),yl(t,t.transactionQueueTree_),Ye(t.eventQueue_,e,u);for(let f=0;f<h.length;f++)jn(h[f])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{Oe("transaction at "+a.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}Wn(t,e)}},o)}function Wn(t,e){const n=ef(t,e),s=qs(n),i=tf(t,n);return IC(t,i,s),s}function IC(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=Pe(n,a.path);let u=!1,h;if(S(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)u=!0,h=a.abortReason,i=i.concat(Ht(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=fC)u=!0,h="maxretry",i=i.concat(Ht(t.serverSyncTree_,a.currentWriteId,!0));else{const f=Zh(t,a.path,o);a.currentInputSnapshot=f;const _=e[l].update(f.val());if(_!==void 0){nr("transaction failed: Data returned ",_,a.path);let m=_e(_);typeof _=="object"&&_!=null&&gt(_,".priority")||(m=m.updatePriority(f.getPriority()));const R=a.currentWriteId,N=ir(t),O=Gh(m,f,N);a.currentOutputSnapshotRaw=m,a.currentOutputSnapshotResolved=O,a.currentWriteId=ml(t),o.splice(o.indexOf(R),1),i=i.concat(Hh(t.serverSyncTree_,a.path,O,a.currentWriteId,a.applyLocally)),i=i.concat(Ht(t.serverSyncTree_,R,!0))}else u=!0,h="nodata",i=i.concat(Ht(t.serverSyncTree_,a.currentWriteId,!0))}Ye(t.eventQueue_,n,i),i=[],u&&(e[l].status=2,(function(f){setTimeout(f,Math.floor(0))})(e[l].unwatcher),e[l].onComplete&&(h==="nodata"?s.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):s.push(()=>e[l].onComplete(new Error(h),!1,null))))}rr(t,t.transactionQueueTree_);for(let l=0;l<s.length;l++)jn(s[l]);yl(t,t.transactionQueueTree_)}function ef(t,e){let n,s=t.transactionQueueTree_;for(n=U(e);n!==null&&Kn(s)===void 0;)s=pl(s,n),e=ae(e),n=U(e);return s}function tf(t,e){const n=[];return nf(t,e,n),n.sort((s,i)=>s.order-i.order),n}function nf(t,e,n){const s=Kn(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);tr(e,i=>{nf(t,i,n)})}function rr(t,e){const n=Kn(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,Kh(e,n.length>0?n:void 0)}tr(e,s=>{rr(t,s)})}function vl(t,e){const n=qs(ef(t,e)),s=pl(t.transactionQueueTree_,e);return Xv(s,i=>{Or(t,i)}),Or(t,s),qh(s,i=>{Or(t,i)}),n}function Or(t,e){const n=Kn(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(S(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(S(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Ht(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Kh(e,void 0):n.length=r+1,Ye(t.eventQueue_,qs(e),i);for(let o=0;o<s.length;o++)jn(s[o])}}/**
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
 */function TC(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function RC(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Oe(`Invalid query segment '${n}' in query '${t}'`)}return e}const lc=function(t,e){const n=xC(t),s=n.namespace;n.domain==="firebase.com"&&xt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&xt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||km();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new lh(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new ee(n.pathString)}},xC=function(t){let e="",n="",s="",i="",r="",o=!0,l="https",a=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(l=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(i=TC(t.substring(u,h)));const f=RC(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")n="localhost";else if(_.split(".").length<=2)n=_;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),n=e.substring(m+1),r=s}"ns"in f&&(r=f.ns)}return{host:e,port:a,domain:n,subdomain:s,secure:o,scheme:l,pathString:i,namespace:r}};/**
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
 */class AC{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ge(this.snapshot.exportVal())}}class NC{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class sf{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return S(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Cl{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return G(this._path)?null:zo(this._path)}get ref(){return new Nt(this._repo,this._path)}get _queryIdentifier(){const e=za(this._queryParams),n=Uo(e);return n==="{}"?"default":n}get _queryObject(){return za(this._queryParams)}isEqual(e){if(e=Un(e),!(e instanceof Cl))return!1;const n=this._repo===e._repo,s=qo(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+my(this._path)}}class Nt extends Cl{constructor(e,n){super(e,n,new Jo,!1)}get parent(){const e=gh(this._path);return e===null?null:new Nt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Fs{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new ee(e),s=go(this.ref,e);return new Fs(this._node.getChild(n),s,de)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Fs(i,go(this.ref,s),de)))}hasChild(e){const n=new ee(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function sn(t,e){return t=Un(t),t._checkNotDeleted("ref"),e!==void 0?go(t._root,e):t._root}function go(t,e){return t=Un(t),U(t._path)===null?oC("child","path",e):Qh("child","path",e),new Nt(t._repo,fe(t._path,e))}function rf(t,e){t=Un(t),lC("set",t._path),sC("set",e,t._path);const n=new $s;return yC(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Dr(t,e){rC("update",e,t._path);const n=new $s;return vC(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function PC(t){t=Un(t);const e=new sf(()=>{}),n=new or(e);return mC(t._repo,t,n).then(s=>new Fs(s,new Nt(t._repo,t._path),t._queryParams.getIndex()))}class or{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new AC("value",this,new Fs(e.snapshotNode,new Nt(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new NC(this,e,n):null}matches(e){return e instanceof or?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function OC(t,e,n,s,i){const r=new sf(n,void 0),o=new or(r);return EC(t._repo,t,o),()=>bC(t._repo,t,o)}function DC(t,e,n,s){return OC(t,"value",e)}Av(Nt);kv(Nt);/**
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
 */const kC="FIREBASE_DATABASE_EMULATOR_HOST",mo={};let MC=!1;function LC(t,e,n,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Wo(r);t.repoInfo_=new lh(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function FC(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||xt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Se("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=lc(r,i),l=o.repoInfo,a;typeof process<"u"&&Aa&&(a=Aa[kC]),a?(r=`http://${a}?ns=${l.namespace}`,o=lc(r,i),l=o.repoInfo):o.repoInfo.secure;const c=new Gm(t.name,t.options,e);aC("Invalid Firebase Database URL",o),G(o.path)||xt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=HC(l,t,c,new jm(t,n));return new WC(u,t)}function BC(t,e){const n=mo[e];(!n||n[t.key]!==t)&&xt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),wC(t),delete n[t.key]}function HC(t,e,n,s){let i=mo[e.name];i||(i={},mo[e.name]=i);let r=i[t.toURLString()];return r&&xt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new dC(t,MC,n,s),i[t.toURLString()]=r,r}class WC{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(pC(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Nt(this._repo,z())),this._rootInternal}_delete(){return this._rootInternal!==null&&(BC(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&xt("Cannot call "+e+" on a deleted database.")}}function VC(t=mm(),e){const n=fm(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=X_("database");s&&$C(n,...s)}return n}function $C(t,e,n,s={}){t=Un(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&vi(s,r.repoInfo_.emulatorOptions))return;xt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&xt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new li(li.OWNER);else if(s.mockUserToken){const l=typeof s.mockUserToken=="string"?s.mockUserToken:Z_(s.mockUserToken,t.app.options.projectId);o=new li(l)}Wo(e)&&(J_(e),ng("Database",!0)),LC(r,i,s,o)}/**
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
 */function UC(t){xm(gm),Ei(new xs("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return FC(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),xn(Na,Pa,t),xn(Na,Pa,"esm2020")}St.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};St.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};UC();var jC="firebase",GC="12.4.0";/**
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
 */xn(jC,GC,"app");const KC={apiKey:"AIzaSyAKZjbnfGPijASF9Kkl2O2BrZXWIgFMThs",authDomain:"planning-poker-f26ba.firebaseapp.com",projectId:"planning-poker-f26ba",storageBucket:"planning-poker-f26ba.firebasestorage.app",messagingSenderId:"1013855147171",appId:"1:1013855147171:web:ffa442f561b109d6c71b16",databaseURL:"https://planning-poker-f26ba-default-rtdb.europe-west1.firebasedatabase.app/"},zC=ju(KC),rn=VC(zC),lr="myName";function qC(){return localStorage.getItem(lr)}function YC(t){localStorage.setItem(lr,t)}async function of(){const t=qC();if(console.log(`Retrieved name: ${t}`),t===null){const e=Bs.currentRoute.value.fullPath;console.log(`Current path: ${e}`),await Bs.push({path:"your-name",query:{redirect:e}})}}async function ac(t){return(await PC(t)).val()}const QC={id:"room-main-container"},XC={__name:"Room",setup(t){of();const e=Au(),n=Bt([]),s=Bt(null),i=Bt({}),r=Bt(!1),o=e.query.id,l=localStorage.getItem(lr);let a=o;function c(){rf(sn(rn,`rooms/${o}/votes/${l}`),{cardValue:"",hasVoted:!1})}function u(){const E=sn(rn,`rooms/${o}/cardsValues`);ac(E).then(R=>{n.value=Array.isArray(R)?R:R?.split(",").map(N=>N.trim())||[]})}Gc(()=>{u(),c(),DC(sn(rn,`rooms/${o}`),E=>{const R=E.val();r.value=R?.revealVotes||!1,i.value=R.votes||{},a=R.name})});function h(E){console.log("voting ",E);const R=sn(rn,`rooms/${o}/votes/${l}`);s.value=E.toString(),Dr(R,{cardValue:E,hasVoted:!0})}function f(){const E=sn(rn,`rooms/${o}`);Dr(E,{revealVotes:!0})}function _(E){return Object.fromEntries(Object.keys(E.votes).map(R=>[R,{cardValue:"",hasVoted:!1}]))}function m(){const E=sn(rn,`rooms/${o}`);s.value=null,ac(E).then(R=>{let N=_(R);i.value=N,Dr(E,{votes:N,revealVotes:!1})})}return(E,R)=>(Ke(),ze("div",QC,[ce("h1",null,vs(dt(a)),1),me(Nu,{votes:i.value,revealVotes:r.value},null,8,["votes","revealVotes"]),ce("section",{id:"buttons-section"},[ce("input",{type:"button",value:"Reveal Votes",class:"button",onClick:f}),ce("input",{type:"button",value:"Clear Votes",class:"button",onClick:m})]),me(Pu,{values:n.value,selectedValue:s.value,onSelectCard:h},null,8,["values","selectedValue"])]))}},lf=Vn(XC,[["__scopeId","data-v-b2259d04"]]),JC={};function ZC(t,e){const n=Oo("RouterLink");return Ke(),ze("main",null,[e[1]||(e[1]=ce("h1",null,"Planning Poker",-1)),me(n,{to:"/create-room",id:"create-room-btn"},{default:os(()=>[...e[0]||(e[0]=[fu("Create room",-1)])]),_:1})])}const af=Vn(JC,[["render",ZC],["__scopeId","data-v-fdbc4986"]]),eE={id:"create-room-main-container"},tE={__name:"CreateRoom",setup(t){of();const e=Math.random().toString(36).substring(2,8);let n=Bt(`Room ${e}`),s=Bt([0,1,2,3,4,5,6,7,8,9,10,"?"]);async function i(r){r.preventDefault();const o=sn(rn,`rooms/${e}`);await rf(o,{createdAt:Date.now(),votes:{},name:n.value,cardsValues:s.value,revealVotes:!1}),await Bs.push({path:`/room/${e}`,query:{id:e}})}return(r,o)=>(Ke(),ze("div",eE,[o[4]||(o[4]=ce("h1",null,"Create A Room",-1)),o[5]||(o[5]=ce("p",{class:"small-text"},"Use default values or personalise.",-1)),ce("form",null,[o[2]||(o[2]=ce("label",{for:"room-name-input"},"Room name:",-1)),Wr(ce("input",{type:"text",id:"room-name-input",name:"room-name-input","onUpdate:modelValue":o[0]||(o[0]=l=>Ee(n)?n.value=l:n=l)},null,512),[[zr,dt(n)]]),o[3]||(o[3]=ce("label",{for:"cards-values-input"},"Cards values:",-1)),Wr(ce("input",{type:"text",id:"cards-values-input",name:"cards-values-input","onUpdate:modelValue":o[1]||(o[1]=l=>Ee(s)?s.value=l:s=l)},null,512),[[zr,dt(s)]]),ce("input",{type:"submit",value:"Create",onClick:i,class:"button"})])]))}},cf=Vn(tE,[["__scopeId","data-v-b76384ab"]]),nE={id:"name-form"},sE=["placeholder"],iE={__name:"AddName",setup(t){const e=Bt(null),n=Au(),{redirect:s}=n.query;console.log("Redirect to:",s);const i=Math.random().toString(36).slice(2);function r(o){o.preventDefault(),e?YC(e.value):(localStorage.setItem(lr,i),console.log("Random userId generated and saved to localStorage:",i)),console.log(s),Bs.push(s||"/")}return(o,l)=>(Ke(),ze("main",null,[l[2]||(l[2]=ce("h1",null,"Add Your Name",-1)),ce("form",nE,[l[1]||(l[1]=ce("label",{for:"name-input"},"Name:",-1)),Wr(ce("input",{type:"text",id:"name-input",name:"name","onUpdate:modelValue":l[0]||(l[0]=a=>e.value=a),placeholder:dt(i)},null,8,sE),[[zr,e.value]]),ce("input",{type:"submit",value:"Save",onClick:r,class:"button"})])]))}},rE=[{path:"/",component:af},{path:"/room/:roomId",component:lf},{path:"/create-room",component:cf},{path:"/your-name",component:iE}],Bs=D_({history:a_("/planning-poker/"),routes:rE}),oE={};function lE(t,e){const n=Oo("RouterLink");return Ke(),ze("nav",null,[me(n,{to:"/",class:"nav-item"},{default:os(()=>[...e[0]||(e[0]=[ce("div",{class:"ni-text"},"Home",-1)])]),_:1}),me(n,{to:"/create-room",class:"nav-item"},{default:os(()=>[...e[1]||(e[1]=[ce("div",{class:"ni-text"},"Create Room",-1)])]),_:1}),me(n,{to:"/your-name",class:"nav-item"},{default:os(()=>[...e[2]||(e[2]=[ce("div",{class:"ni-text"},"Your Name",-1)])]),_:1})])}const uf=Vn(oE,[["render",lE],["__scopeId","data-v-c5d598a4"]]),aE={__name:"App",setup(t){return(e,n)=>{const s=Oo("router-view");return Ke(),ze(Ue,null,[me(uf),me(s)],64)}}},Qt=xp(aE);Qt.use(Bs);Qt.component("room-item",lf);Qt.component("create-room-item",cf);Qt.component("cards-deck-item",Pu);Qt.component("poker-table-item",Nu);Qt.component("home-item",af);Qt.component("nav-item",uf);Qt.mount("#app");
