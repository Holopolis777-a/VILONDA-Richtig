import{c as b,j as e,R as g,I as f,B as o,X as A,F as M,a as w,u as L,_ as N,n as p}from"./index-xKrTDA7N.js";import{u as y}from"./newsStore-dv9sXhGx.js";import{C as k}from"./Checkbox-CgYu5-DF.js";import{I}from"./ImageUpload-BBo6YDMe.js";import{P as C}from"./plus-By_5y3b0.js";import{L as T}from"./link-DWxs9j0D.js";import{f as B}from"./dateUtils-DFVphTDA.js";import{B as v}from"./Badge-v6lJ1hQp.js";import{P as F}from"./pen-C89hxg5V.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=b("Archive",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=b("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=b("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);function z({content:s,htmlContent:d,useHtml:a,onChange:l}){return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(k,{id:"use-html",checked:a,onChange:c=>l({useHtml:c})}),e.jsxs("label",{htmlFor:"use-html",className:"flex items-center text-sm text-gray-700",children:[e.jsx(H,{className:"w-4 h-4 mr-2"}),"HTML-Editor verwenden"]})]}),a?e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"HTML-Inhalt"}),e.jsx("textarea",{value:d,onChange:c=>l({htmlContent:c.target.value}),rows:12,className:"w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500",placeholder:"<p>Ihr HTML-Inhalt hier...</p>"})]}):e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Text-Inhalt"}),e.jsx("textarea",{value:s,onChange:c=>l({content:c.target.value}),rows:8,className:"w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"})]})]})}function O({images:s,onChange:d}){return e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Bilder"}),e.jsx(I,{images:s,onUpload:d,maxFiles:4,acceptedFileTypes:["image/jpeg","image/png"]}),e.jsx("p",{className:"text-sm text-gray-500",children:"Laden Sie bis zu 4 Bilder hoch (JPG, PNG). Maximale Größe: 5MB pro Bild."})]})}function V({links:s,onChange:d}){const[a,l]=g.useState({url:"",text:""}),c=()=>{a.url&&a.text&&(d([...s,a]),l({url:"",text:""}))},h=r=>{d(s.filter((n,m)=>m!==r))};return e.jsxs("div",{className:"space-y-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Links"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(f,{placeholder:"Link-Text",value:a.text,onChange:r=>l({...a,text:r.target.value})}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(f,{placeholder:"URL",value:a.url,onChange:r=>l({...a,url:r.target.value})}),e.jsx(o,{type:"button",onClick:c,disabled:!a.url||!a.text,className:"flex-shrink-0",children:e.jsx(C,{className:"w-4 h-4"})})]})]}),s.length>0&&e.jsx("div",{className:"space-y-2",children:s.map((r,n)=>e.jsxs("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded-lg",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(T,{className:"w-4 h-4 text-gray-400"}),e.jsx("span",{className:"font-medium",children:r.text}),e.jsxs("span",{className:"text-sm text-gray-500",children:["(",r.url,")"]})]}),e.jsx("button",{type:"button",onClick:()=>h(n),className:"text-red-500 hover:text-red-700",children:e.jsx(A,{className:"w-4 h-4"})})]},n))})]})}const _=[{value:"broker",label:"Makler"},{value:"member",label:"Mitglieder"},{value:"employer",label:"Arbeitgeber"},{value:"employee",label:"Arbeitnehmer"},{value:"salary-employee",label:"Arbeitnehmer Gehaltsumwandlung"}];function R({initialData:s,onSubmit:d,onCancel:a}){const[l,c]=g.useState({title:(s==null?void 0:s.title)||"",content:(s==null?void 0:s.content)||"",htmlContent:(s==null?void 0:s.htmlContent)||"",useHtml:(s==null?void 0:s.useHtml)||!1,targetAudiences:(s==null?void 0:s.targetAudiences)||[],publishDate:s!=null&&s.publishDate?new Date(s.publishDate).toISOString().slice(0,16):new Date().toISOString().slice(0,16),status:(s==null?void 0:s.status)||"draft",images:(s==null?void 0:s.images)||[],links:(s==null?void 0:s.links)||[]}),[h,r]=g.useState(!1),n=async(t,i=!1)=>{t.preventDefault();try{await d({...l,status:i?"draft":"published",publishDate:new Date(l.publishDate)})}catch(u){console.error("Error submitting form:",u)}},m=(t,i)=>{c(u=>({...u,targetAudiences:i?[...u.targetAudiences,t]:u.targetAudiences.filter(j=>j!==t)}))};return h?e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-gray-50 p-6 rounded-lg",children:[e.jsx("h3",{className:"text-xl font-semibold mb-2",children:l.title}),e.jsxs("div",{className:"text-sm text-gray-500 mb-4",children:["Veröffentlichung: ",new Date(l.publishDate).toLocaleString()]}),l.images.length>0&&e.jsx("div",{className:"grid grid-cols-2 gap-4 mb-4",children:l.images.map((t,i)=>e.jsx("img",{src:t,alt:`Bild ${i+1}`,className:"w-full h-48 object-cover rounded-lg"},i))}),l.useHtml?e.jsx("div",{className:"prose max-w-none",dangerouslySetInnerHTML:{__html:l.htmlContent}}):e.jsx("div",{className:"prose max-w-none whitespace-pre-wrap",children:l.content})]}),e.jsx(o,{onClick:()=>r(!1),className:"w-full",children:"Zurück zum Bearbeiten"})]}):e.jsxs("form",{onSubmit:t=>n(t),className:"space-y-6",children:[e.jsx(f,{label:"Titel",value:l.title,onChange:t=>c({...l,title:t.target.value}),required:!0}),e.jsx(O,{images:l.images,onChange:t=>c({...l,images:t})}),e.jsx(z,{content:l.content,htmlContent:l.htmlContent,useHtml:l.useHtml,onChange:t=>c(i=>({...i,...t}))}),e.jsx(V,{links:l.links,onChange:t=>c({...l,links:t})}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Zielgruppen"}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:_.map(t=>e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(k,{id:`audience-${t.value}`,checked:l.targetAudiences.includes(t.value),onChange:i=>m(t.value,i)}),e.jsx("label",{htmlFor:`audience-${t.value}`,className:"text-sm text-gray-700",children:t.label})]},t.value))})]}),e.jsx(f,{type:"datetime-local",label:"Veröffentlichungsdatum",value:l.publishDate,onChange:t=>c({...l,publishDate:t.target.value}),required:!0}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 pt-6 border-t",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(o,{type:"button",variant:"outline",onClick:a,className:"w-full",children:"Abbrechen"}),e.jsxs(o,{type:"button",variant:"outline",onClick:()=>r(!0),className:"w-full",children:[e.jsx(P,{className:"w-4 h-4 mr-2"}),"Vorschau"]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs(o,{type:"button",variant:"outline",onClick:t=>n(t,!0),className:"w-full",children:[e.jsx(M,{className:"w-4 h-4 mr-2"}),"Entwurf"]}),e.jsx(o,{type:"submit",className:"w-full",children:"Veröffentlichen"})]})]})]})}function U({onEdit:s,onArchive:d}){const{news:a}=y(),{user:l}=w(),c=(l==null?void 0:l.role)==="admin",h=[...a].filter(r=>!r.archived).sort((r,n)=>n.publishDate.getTime()-r.publishDate.getTime());return h.length===0?e.jsx("div",{className:"text-center py-12",children:e.jsx("p",{className:"text-gray-500",children:"Keine Nachrichten verfügbar"})}):e.jsx("div",{className:"space-y-4",children:h.map(r=>e.jsx("div",{className:"bg-white p-6 rounded-lg shadow-sm border border-gray-200",children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-lg font-semibold",children:r.title}),e.jsxs("div",{className:"flex items-center space-x-2 text-sm text-gray-500",children:[e.jsx("span",{children:B(r.publishDate)}),e.jsx("span",{children:"•"}),e.jsx(v,{variant:r.status==="published"?"success":"warning",children:r.status==="published"?"Veröffentlicht":"Entwurf"}),e.jsx("span",{children:"•"}),e.jsx(v,{variant:"info",children:r.targetAudience==="all"?"Alle":r.targetAudience==="broker"?"Nur Makler":"Nur Mitglieder"})]})]}),r.images&&r.images.length>0&&e.jsx("div",{className:"mt-4 grid grid-cols-2 gap-4",children:r.images.map((n,m)=>e.jsx("img",{src:n,alt:`Bild ${m+1}`,className:"w-full h-48 object-cover rounded-lg"},m))}),e.jsx("div",{className:"mt-4 text-gray-600 whitespace-pre-wrap",children:r.content})]}),c&&e.jsxs("div",{className:"flex space-x-2 ml-4",children:[e.jsx(o,{variant:"ghost",size:"sm",onClick:()=>s==null?void 0:s(r),title:"Bearbeiten",children:e.jsx(F,{className:"w-4 h-4"})}),e.jsx(o,{variant:"ghost",size:"sm",onClick:()=>{window.confirm("Möchten Sie diese Nachricht wirklich archivieren?")&&(d==null||d(r.id))},title:"Archivieren",children:e.jsx(E,{className:"w-4 h-4 text-red-500"})})]})]})},r.id))})}function Y(){const{user:s}=w(),{news:d,addNews:a,updateNews:l,archiveNews:c}=y(),[h,r]=g.useState(!1),[n,m]=g.useState(null),t=L();if(g.useEffect(()=>{(s==null?void 0:s.role)!=="admin"&&t("/dashboard")},[s,t]),(s==null?void 0:s.role)!=="admin")return null;const i=async x=>{try{n?(await l(n.id,x),p.success("Neuigkeit erfolgreich aktualisiert")):(await a(x),p.success("Neuigkeit erfolgreich erstellt")),r(!1),m(null)}catch{p.error("Fehler beim Speichern")}},u=x=>{m(x),r(!0)},j=async x=>{try{await c(x),p.success("Neuigkeit erfolgreich archiviert")}catch{p.error("Fehler beim Archivieren")}};return e.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-8 space-y-6",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"News Management"}),e.jsxs(o,{onClick:()=>r(!0),children:[e.jsx(C,{className:"w-4 h-4 mr-2"}),"Neue Nachricht"]})]}),e.jsx(U,{onEdit:u,onArchive:j}),e.jsx(N,{open:h,onClose:()=>{r(!1),m(null)},className:"fixed inset-0 z-50 overflow-y-auto",children:e.jsxs("div",{className:"flex items-center justify-center min-h-screen p-4",children:[e.jsx(N.Overlay,{className:"fixed inset-0 bg-black/30"}),e.jsxs("div",{className:"relative bg-white rounded-xl max-w-2xl w-full p-6",children:[e.jsx(N.Title,{className:"text-xl font-semibold mb-6",children:n?"Nachricht bearbeiten":"Neue Nachricht erstellen"}),e.jsx(R,{initialData:n,onSubmit:i,onCancel:()=>{r(!1),m(null)}})]})]})})]})}export{Y as default};
