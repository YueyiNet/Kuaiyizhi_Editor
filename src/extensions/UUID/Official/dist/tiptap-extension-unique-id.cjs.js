"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@tiptap/core"),e=require("@tiptap/pm/model"),n=require("@tiptap/pm/state"),r=require("uuid");function o(t){return function(t,e=JSON.stringify){const n={};return t.filter((t=>{const r=e(t);return!Object.prototype.hasOwnProperty.call(n,r)&&(n[r]=!0)}))}(t.filter(((e,n)=>t.indexOf(e)!==n)))}const i=t.Extension.create({name:"uniqueID",priority:1e4,addOptions:()=>({attributeName:"id",types:[],generateID:()=>r.v4(),filterTransaction:null}),addGlobalAttributes(){return[{types:this.options.types,attributes:{[this.options.attributeName]:{default:null,parseHTML:t=>t.getAttribute(`data-${this.options.attributeName}`),renderHTML:t=>t[this.options.attributeName]?{[`data-${this.options.attributeName}`]:t[this.options.attributeName]}:{}}}}]},onCreate(){if(this.editor.extensionManager.extensions.find((t=>"collaboration"===t.name)))return;const{view:e,state:n}=this.editor,{tr:r,doc:o}=n,{types:i,attributeName:a,generateID:s}=this.options;t.findChildren(o,(t=>i.includes(t.type.name)&&null===t.attrs[a])).forEach((({node:t,pos:e})=>{r.setNodeMarkup(e,void 0,{...t.attrs,[a]:s()})})),r.setMeta("addToHistory",!1),e.dispatch(r)},addProseMirrorPlugins(){let r=null,i=!1;return[new n.Plugin({key:new n.PluginKey("uniqueID"),appendTransaction:(e,n,r)=>{const i=e.some((t=>t.docChanged))&&!n.doc.eq(r.doc),a=this.options.filterTransaction&&e.some((t=>{var e,n;return!(null===(n=(e=this.options).filterTransaction)||void 0===n?void 0:n.call(e,t))})),s=e.find((t=>t.getMeta("y-sync$")));if(s)return;if(!i||a)return;const{tr:d}=r,{types:u,attributeName:p,generateID:l}=this.options,c=t.combineTransactionSteps(n.doc,e),{mapping:f}=c;return t.getChangedRanges(c).forEach((({newRange:e})=>{const n=t.findChildrenInRange(r.doc,e,(t=>u.includes(t.type.name))),i=n.map((({node:t})=>t.attrs[p])).filter((t=>null!==t));n.forEach((({node:t,pos:e},r)=>{var a;const s=null===(a=d.doc.nodeAt(e))||void 0===a?void 0:a.attrs[p];if(null===s)return void d.setNodeMarkup(e,void 0,{...t.attrs,[p]:l()});const u=n[r+1];if(u&&0===t.content.size){if(d.setNodeMarkup(u.pos,void 0,{...u.node.attrs,[p]:s}),i[r+1]=s,u.node.attrs[p])return;const n=l();return d.setNodeMarkup(e,void 0,{...t.attrs,[p]:n}),i[r]=n,d}const c=o(i),{deleted:m}=f.invert().mapResult(e);m&&c.includes(s)&&d.setNodeMarkup(e,void 0,{...t.attrs,[p]:l()})}))})),d.steps.length?d:void 0},view(t){const e=e=>{var n;r=(null===(n=t.dom.parentElement)||void 0===n?void 0:n.contains(e.target))?t.dom.parentElement:null};return window.addEventListener("dragstart",e),{destroy(){window.removeEventListener("dragstart",e)}}},props:{handleDOMEvents:{drop:(t,e)=>{var n;return r===t.dom.parentElement&&"copy"!==(null===(n=e.dataTransfer)||void 0===n?void 0:n.effectAllowed)||(r=null,i=!0),!1},paste:()=>(i=!0,!1)},transformPasted:t=>{if(!i)return t;const{types:n,attributeName:r}=this.options,o=t=>{const i=[];return t.forEach((t=>{if(t.isText)return void i.push(t);if(!n.includes(t.type.name))return void i.push(t.copy(o(t.content)));const e=t.type.create({...t.attrs,[r]:null},o(t.content),t.marks);i.push(e)})),e.Fragment.from(i)};return i=!1,new e.Slice(o(t.content),t.openStart,t.openEnd)}}})]}});exports.UniqueID=i,exports.default=i;