import{R as u,j as e,I as r,B as m,_ as j,n as x}from"./index-xKrTDA7N.js";import{u as f}from"./brokerStore-BG-dfO2t.js";import{S as v}from"./Select-DSiwQjuV.js";import{P as N}from"./plus-By_5y3b0.js";function w({broker:s,onSubmit:p,onCancel:o}){var n,d,c,h;const[t,l]=u.useState({name:(s==null?void 0:s.name)||"",email:(s==null?void 0:s.email)||"",phone:(s==null?void 0:s.phone)||"",company:(s==null?void 0:s.company)||"",address:{street:((n=s==null?void 0:s.address)==null?void 0:n.street)||"",city:((d=s==null?void 0:s.address)==null?void 0:d.city)||"",postalCode:((c=s==null?void 0:s.address)==null?void 0:c.postalCode)||"",country:((h=s==null?void 0:s.address)==null?void 0:h.country)||"Deutschland"},status:(s==null?void 0:s.status)||"active"}),g=async a=>{a.preventDefault(),await p(t)};return e.jsxs("form",{onSubmit:g,className:"space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(r,{label:"Name *",value:t.name,onChange:a=>l({...t,name:a.target.value}),required:!0}),e.jsx(r,{label:"E-Mail *",type:"email",value:t.email,onChange:a=>l({...t,email:a.target.value}),required:!0})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(r,{label:"Telefon *",value:t.phone,onChange:a=>l({...t,phone:a.target.value}),required:!0}),e.jsx(r,{label:"Unternehmen *",value:t.company,onChange:a=>l({...t,company:a.target.value}),required:!0})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Adresse"}),e.jsx(r,{label:"Straße *",value:t.address.street,onChange:a=>l({...t,address:{...t.address,street:a.target.value}}),required:!0}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(r,{label:"Stadt *",value:t.address.city,onChange:a=>l({...t,address:{...t.address,city:a.target.value}}),required:!0}),e.jsx(r,{label:"PLZ *",value:t.address.postalCode,onChange:a=>l({...t,address:{...t.address,postalCode:a.target.value}}),required:!0})]})]}),e.jsxs(v,{label:"Status",value:t.status,onChange:a=>l({...t,status:a.target.value}),children:[e.jsx("option",{value:"active",children:"Aktiv"}),e.jsx("option",{value:"inactive",children:"Inaktiv"})]}),e.jsxs("div",{className:"flex justify-end space-x-3",children:[e.jsx(m,{type:"button",variant:"outline",onClick:o,children:"Abbrechen"}),e.jsx(m,{type:"submit",children:s?"Speichern":"Hinzufügen"})]})]})}function q(){const{brokers:s,loading:p,addBroker:o,updateBroker:t,deleteBroker:l}=f(),[g,n]=u.useState(!1),[d,c]=u.useState(null);u.useEffect(()=>{(async()=>{try{await f.getState().fetchBrokers()}catch{x.error("Fehler beim Laden der Makler")}})()},[]);const h=async i=>{try{d?(await t(d.id,i),x.success("Makler erfolgreich aktualisiert")):(await o(i),x.success("Makler erfolgreich hinzugefügt")),n(!1),c(null)}catch{x.error("Fehler beim Speichern des Maklers")}},a=async i=>{if(confirm("Sind Sie sicher, dass Sie diesen Makler löschen möchten?"))try{await l(i),x.success("Makler erfolgreich gelöscht")}catch{x.error("Fehler beim Löschen des Maklers")}};return p?e.jsx("div",{className:"flex justify-center items-center h-64",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"})}):e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"Makler"}),e.jsxs(m,{onClick:()=>n(!0),children:[e.jsx(N,{className:"w-4 h-4 mr-2"}),"Makler hinzufügen"]})]}),e.jsx("div",{className:"bg-white shadow-md rounded-lg overflow-hidden",children:e.jsxs("table",{className:"min-w-full divide-y divide-gray-200",children:[e.jsx("thead",{className:"bg-gray-50",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Name"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Unternehmen"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Kontakt"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Mitglieder"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Aktive Bestellungen"}),e.jsx("th",{className:"px-6 py-3 relative",children:e.jsx("span",{className:"sr-only",children:"Aktionen"})})]})}),e.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:s.map(i=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("div",{className:"text-sm font-medium text-gray-900",children:i.name})}),e.jsxs("td",{className:"px-6 py-4 whitespace-nowrap",children:[e.jsx("div",{className:"text-sm text-gray-900",children:i.company}),e.jsxs("div",{className:"text-sm text-gray-500",children:[i.address.city,", ",i.address.country]})]}),e.jsxs("td",{className:"px-6 py-4 whitespace-nowrap",children:[e.jsx("div",{className:"text-sm text-gray-900",children:i.email}),e.jsx("div",{className:"text-sm text-gray-500",children:i.phone})]}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("span",{className:`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${i.status==="active"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:i.status==="active"?"Aktiv":"Inaktiv"})}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:i.membersCount}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:i.activeOrders}),e.jsxs("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:[e.jsx(m,{variant:"ghost",size:"sm",onClick:()=>{c(i),n(!0)},children:"Bearbeiten"}),e.jsx(m,{variant:"ghost",size:"sm",onClick:()=>a(i.id),className:"text-red-600 hover:text-red-900",children:"Löschen"})]})]},i.id))})]})}),e.jsx(j,{open:g,onClose:()=>{n(!1),c(null)},className:"fixed inset-0 z-50 overflow-y-auto",children:e.jsxs("div",{className:"flex items-center justify-center min-h-screen p-4",children:[e.jsx(j.Overlay,{className:"fixed inset-0 bg-black/30"}),e.jsxs("div",{className:"relative bg-white rounded-xl max-w-2xl w-full p-6",children:[e.jsx(j.Title,{className:"text-xl font-semibold mb-6",children:d?"Makler bearbeiten":"Neuen Makler hinzufügen"}),e.jsx(w,{broker:d||void 0,onSubmit:h,onCancel:()=>{n(!1),c(null)}})]})]})})]})}export{q as default};
