import{c as x,j as e,I as o,R as h,B as p,X as k,F as w,o as C,g as f,n as b,_ as N}from"./index-xKrTDA7N.js";import{S as j}from"./Select-DSiwQjuV.js";import{B as F,F as V,P as q}from"./VehicleGrid-Cnl27RSR.js";import{C as z,a as S}from"./Checkbox-CgYu5-DF.js";import{P}from"./plus-By_5y3b0.js";import{S as R}from"./shield-Dkc3ZdED.js";import{W as v,S as T,T as E}from"./wrench-Dfbb8ocB.js";import{I as A}from"./ImageUpload-BMu4ucjn.js";import{u as B}from"./vehicleStore-j7f6udb0.js";import{C as I}from"./calendar-CHRCL5nd.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=x("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=x("Ban",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=x("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=x("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=x("Gauge",[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=x("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);function W({data:s,onChange:l}){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Grundinformationen"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(o,{label:"Marke *",value:s.make,onChange:r=>l({make:r.target.value}),required:!0}),e.jsx(o,{label:"Modell *",value:s.model,onChange:r=>l({model:r.target.value}),required:!0})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(o,{label:"Ausstattungsvariante *",value:s.equipmentVariant,onChange:r=>l({equipmentVariant:r.target.value}),placeholder:"z.B. Sport Line, M-Paket, Avantgarde",required:!0}),e.jsx(o,{label:"Bruttolistenpreis (€) *",type:"number",min:0,step:"0.01",value:s.grossListPrice||"",onChange:r=>l({grossListPrice:Number(r.target.value)}),placeholder:"z.B. 45000",required:!0})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(o,{label:"Lieferzeit (Monate) *",type:"number",min:1,max:24,value:s.deliveryTime,onChange:r=>l({deliveryTime:Number(r.target.value)}),required:!0}),e.jsx(o,{label:"Fahrgestellnummer (VIN)",value:s.vin,onChange:r=>l({vin:r.target.value})})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(o,{label:"Baujahr *",type:"number",min:1900,max:new Date().getFullYear()+1,value:s.year,onChange:r=>l({year:Number(r.target.value)}),required:!0}),e.jsxs(j,{label:"Fahrzeugtyp *",value:s.type,onChange:r=>l({type:r.target.value}),required:!0,children:[e.jsx("option",{value:"limousine",children:"Limousine"}),e.jsx("option",{value:"kombi",children:"Kombi"}),e.jsx("option",{value:"suv",children:"SUV"}),e.jsx("option",{value:"coupe",children:"Coupé"}),e.jsx("option",{value:"cabrio",children:"Cabriolet"})]})]})]})}function Z({value:s,onChange:l,required:r}){return e.jsxs("div",{className:"relative",children:[e.jsx(o,{label:"Elektrische Reichweite (km) *",type:"number",min:1,value:s||"",onChange:t=>l(Number(t.target.value)),required:r,className:"pl-10"}),e.jsx(F,{className:"absolute left-3 top-9 text-gray-400 w-5 h-5"})]})}function U({data:s,onChange:l}){const r=s.fuelType==="elektro",t=n=>{const a=n.target.value;l({fuelType:a,...a!=="elektro"&&{electricRange:void 0}})};return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Technische Daten"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs(j,{label:"Kraftstoffart *",value:s.fuelType,onChange:t,required:!0,children:[e.jsx("option",{value:"benzin",children:"Benzin"}),e.jsx("option",{value:"diesel",children:"Diesel"}),e.jsx("option",{value:"elektro",children:"Elektro"}),e.jsx("option",{value:"hybrid",children:"Hybrid"})]}),e.jsxs(j,{label:"Getriebe *",value:s.transmission,onChange:n=>l({transmission:n.target.value}),required:!0,children:[e.jsx("option",{value:"automatik",children:"Automatik"}),e.jsx("option",{value:"manuell",children:"Manuell"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(o,{label:"Leistung (PS) *",type:"number",min:1,value:s.power,onChange:n=>l({power:Number(n.target.value)}),required:!0}),r?e.jsx(Z,{value:s.electricRange||0,onChange:n=>l({electricRange:n}),required:!0}):e.jsx(o,{label:"Hubraum (ccm)",type:"number",min:0,value:s.engineSize,onChange:n=>l({engineSize:Number(n.target.value)})})]})]})}function J({data:s,onChange:l,type:r}){var a,d,i,c,u,g;const t=(m,y,L)=>{const M=`${m}_${y}`;l({leasingRates:{...s.leasingRates,[M]:Number(L)}})},n=m=>{l({monthlyStartingRate:Number(m.target.value)})};return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Preismatrix"}),r==="salary"&&e.jsxs("div",{className:"mb-6",children:[e.jsx(o,{label:"Monatlich ab (€) *",type:"number",min:"0",step:"0.01",value:s.monthlyStartingRate||"",onChange:m=>l({monthlyStartingRate:Number(m.target.value)}),placeholder:"Monatliche Rate eingeben",required:!0,className:"max-w-xs"}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Diese Rate wird als Startpreis angezeigt"})]}),r==="salary"&&e.jsxs("div",{className:"mb-6",children:[e.jsx(o,{label:"Monatlich ab (€) *",type:"number",min:"0",step:"0.01",value:s.monthlyStartingRate||"",onChange:n,placeholder:"Monatliche Rate eingeben",required:!0,className:"max-w-xs"}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Diese Rate wird als Startpreis angezeigt"})]}),e.jsxs("div",{className:"bg-gray-50 p-6 rounded-lg",children:[e.jsxs("div",{className:"grid grid-cols-4 gap-4 mb-4",children:[e.jsx("div",{className:"font-medium",children:"Laufzeit"}),e.jsx("div",{className:"font-medium text-center",children:"10.000 km/Jahr"}),e.jsx("div",{className:"font-medium text-center",children:"15.000 km/Jahr"}),e.jsx("div",{className:"font-medium text-center",children:"20.000 km/Jahr"})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-4 mb-4 items-center",children:[e.jsx("div",{className:"font-medium",children:"36 Monate"}),e.jsx(o,{type:"number",min:0,value:(a=s.leasingRates)==null?void 0:a["36_10000"],onChange:m=>t(36,1e4,m.target.value),placeholder:"€"}),e.jsx(o,{type:"number",min:0,value:(d=s.leasingRates)==null?void 0:d["36_15000"],onChange:m=>t(36,15e3,m.target.value),placeholder:"€"}),e.jsx(o,{type:"number",min:0,value:(i=s.leasingRates)==null?void 0:i["36_20000"],onChange:m=>t(36,2e4,m.target.value),placeholder:"€"})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-4 items-center",children:[e.jsx("div",{className:"font-medium",children:"48 Monate"}),e.jsx(o,{type:"number",min:0,value:(c=s.leasingRates)==null?void 0:c["48_10000"],onChange:m=>t(48,1e4,m.target.value),placeholder:"€"}),e.jsx(o,{type:"number",min:0,value:(u=s.leasingRates)==null?void 0:u["48_15000"],onChange:m=>t(48,15e3,m.target.value),placeholder:"€"}),e.jsx(o,{type:"number",min:0,value:(g=s.leasingRates)==null?void 0:g["48_20000"],onChange:m=>t(48,2e4,m.target.value),placeholder:"€"})]})]}),e.jsx("p",{className:"text-sm text-gray-500",children:"Alle Preise verstehen sich als monatliche Rate inkl. MwSt."})]})}function O({customEquipment:s=[],onChange:l}){const[r,t]=h.useState(""),n=()=>{r.trim()&&(l([...s,r.trim()]),t(""))},a=i=>{l(s.filter((c,u)=>u!==i))},d=i=>{i.key==="Enter"&&(i.preventDefault(),n())};return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Zusätzliche Ausstattung"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(o,{value:r,onChange:i=>t(i.target.value),onKeyPress:d,placeholder:"z.B. Panoramadach, Head-up Display",className:"flex-1"}),e.jsxs(p,{type:"button",onClick:n,disabled:!r.trim(),children:[e.jsx(P,{className:"w-4 h-4 mr-2"}),"Hinzufügen"]})]})]}),s.length>0&&e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2",children:s.map((i,c)=>e.jsxs("div",{className:"flex items-center justify-between p-2 bg-gray-50 rounded-lg",children:[e.jsx("span",{className:"text-sm text-gray-700",children:i}),e.jsx("button",{type:"button",onClick:()=>a(c),className:"p-1 text-gray-400 hover:text-gray-600",children:e.jsx(k,{className:"w-4 h-4"})})]},c))})]})}const Y=[{id:"ledHeadlights",label:"LED Scheinwerfer"},{id:"navigation",label:"Navigation"},{id:"leatherSeats",label:"Ledersitze"},{id:"heatedSeats",label:"Sitzheizung"},{id:"bluetooth",label:"Bluetooth"},{id:"parkingSensors",label:"Einparkhilfe"},{id:"cruiseControl",label:"Tempomat"},{id:"allWheelDrive",label:"Allradantrieb"},{id:"sunroof",label:"Panoramadach"},{id:"climateControl",label:"Klimaautomatik"},{id:"keylessEntry",label:"Keyless Entry"},{id:"electricMirrors",label:"Elektrische Außenspiegel"}];function X({data:s,onChange:l}){const r=(n,a)=>{const d=a?[...s.features,n]:s.features.filter(i=>i!==n);l({features:d})},t=n=>{l({standardEquipment:n.target.value})};return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Ausstattungsmerkmale"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Serienausstattung *"}),e.jsx("textarea",{value:s.standardEquipment||"",onChange:t,rows:6,placeholder:"Geben Sie hier die Serienausstattung ein (z.B. Klimaanlage, Zentralverriegelung, etc.)",className:"w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500",required:!0}),e.jsx("p",{className:"text-sm text-gray-500",children:"Bitte geben Sie die Serienausstattung zeilenweise ein"})]}),e.jsxs("div",{className:"border-t border-gray-200 pt-6",children:[e.jsx("h4",{className:"text-lg font-medium mb-4",children:"Zusatzausstattung"}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-4",children:Y.map(n=>e.jsxs("div",{className:"flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100",children:[e.jsx(z,{id:n.id,checked:s.features.includes(n.id),onChange:a=>r(n.id,a)}),e.jsx("label",{htmlFor:n.id,className:"text-sm font-medium text-gray-900 cursor-pointer",children:n.label})]},n.id))}),e.jsx("div",{className:"mt-8 pt-6 border-t border-gray-200",children:e.jsx(O,{customEquipment:s.customEquipment,onChange:n=>l({customEquipment:n})})})]})]})}function Q({data:s,onChange:l}){const r=[{id:"insurance",label:"Vollkasko- & Haftpflichtversicherung",icon:R,description:"Inkl. Vollkasko, Teilkasko und Haftpflicht"},{id:"maintenance",label:"Wartung & Verschleiß",icon:v},{id:"winterTires",label:"Winterreifen",icon:T,description:"Inkl. Einlagerung und Wechsel"},{id:"gap",label:"GAP Deckung Premium",icon:w},{id:"roadside",label:"KFZ-Schutzbrief & Pannenhilfe",icon:v},{id:"damageManagement",label:"Schadensmanagement",icon:C},{id:"delivery",label:"Überführung & Zulassung",icon:f}],t=(a,d)=>{l({services:{...s.services,[a]:d}})},n=(a,d)=>{l({servicePrices:{...s.servicePrices,[a]:Number(d)}})};return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Inklusive Leistungen"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:r.map(({id:a,label:d,icon:i,description:c})=>{var u,g;return e.jsxs("div",{className:"flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100",children:[e.jsx(z,{id:a,checked:((u=s.services)==null?void 0:u[a])||!1,onChange:m=>t(a,m)}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(i,{className:"w-5 h-5 text-gray-600"}),e.jsx("label",{htmlFor:a,className:"text-sm font-medium text-gray-900 cursor-pointer",children:d})]}),c&&e.jsx("p",{className:"mt-1 text-sm text-gray-500",children:c}),a!=="delivery"&&e.jsxs("div",{className:"mt-2",children:[e.jsx(o,{type:"number",min:"0",step:"0.01",placeholder:"Monatlicher Preis",value:((g=s.servicePrices)==null?void 0:g[a])||"",onChange:m=>n(a,m.target.value),className:"w-full"}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"€/Monat"})]})]})]},a)})})]})}function D({images:s,onChange:l}){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Fahrzeugbilder"}),e.jsx(A,{images:s,onUpload:l,maxFiles:5,acceptedFileTypes:["image/jpeg","image/png"]}),e.jsx("p",{className:"text-sm text-gray-500",children:"Laden Sie bis zu 5 Bilder hoch. Erlaubte Formate: JPG, PNG"})]})}function ee({data:s,onChange:l}){var i;const[r,t]=h.useState({name:"",code:"",type:"solid",price:0}),n=()=>{if(!r.name||!r.code)return;const c=[...s.availableColors||[],r];l({availableColors:c,color:s.color||r.name}),t({name:"",code:"",type:"solid",price:0})},a=c=>{var g;const u=s.availableColors.filter((m,y)=>y!==c);l({availableColors:u,color:s.color===s.availableColors[c].name?((g=u[0])==null?void 0:g.name)||"":s.color})},d=c=>{l({color:c})};return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Verfügbare Farben"}),((i=s.availableColors)==null?void 0:i.length)>0&&e.jsx("div",{className:"grid gap-4 mb-6",children:s.availableColors.map((c,u)=>e.jsxs("div",{className:`flex items-center space-x-4 p-4 bg-white rounded-lg border ${s.color===c.name?"border-gray-900":"border-gray-200"}`,onClick:()=>d(c.name),children:[e.jsx("div",{className:"w-8 h-8 rounded-full border border-gray-200",style:{backgroundColor:c.code}}),e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"font-medium",children:c.name}),e.jsxs("div",{className:"text-sm text-gray-500",children:[c.type.charAt(0).toUpperCase()+c.type.slice(1),c.price?` • +${c.price.toFixed(2)}€`:""]})]}),e.jsx("button",{type:"button",onClick:g=>{g.stopPropagation(),a(u)},className:"p-1 text-gray-400 hover:text-gray-600",children:e.jsx(k,{className:"w-4 h-4"})})]},u))}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg",children:[e.jsx(o,{label:"Farbname",value:r.name,onChange:c=>t({...r,name:c.target.value}),placeholder:"z.B. Alpinweiß"}),e.jsx(o,{label:"Farbcode",value:r.code,onChange:c=>t({...r,code:c.target.value}),placeholder:"#FFFFFF oder RGB"}),e.jsxs(j,{label:"Typ",value:r.type,onChange:c=>t({...r,type:c.target.value}),children:[e.jsx("option",{value:"solid",children:"Uni-Lackierung"}),e.jsx("option",{value:"metallic",children:"Metallic-Lackierung"}),e.jsx("option",{value:"pearl",children:"Perleffekt-Lackierung"})]}),e.jsx(o,{type:"number",label:"Aufpreis (€)",value:r.price||"",onChange:c=>t({...r,price:Number(c.target.value)}),placeholder:"0.00"}),e.jsx("div",{className:"col-span-2",children:e.jsxs(p,{type:"button",onClick:n,disabled:!r.name||!r.code,className:"w-full",children:[e.jsx(P,{className:"w-4 h-4 mr-2"}),"Farbe hinzufügen"]})})]})]})}function se({vehicleId:s,onCancel:l,vehicle:r}){const{updateVehicle:t}=B(),[n,a]=h.useState(!1),d=async()=>{if(s&&confirm("Sind Sie sicher, dass Sie dieses Fahrzeug deaktivieren möchten?")){a(!0);try{await t(s,{status:"maintenance"}),b.success("Fahrzeug wurde deaktiviert"),l()}catch{b.error("Fehler beim Deaktivieren des Fahrzeugs")}finally{a(!1)}}};return e.jsxs("div",{className:"flex justify-between items-center",children:[s&&e.jsxs(p,{type:"button",variant:"outline",onClick:d,disabled:n||(r==null?void 0:r.status)==="maintenance",className:"text-red-600 hover:text-red-700 hover:bg-red-50",children:[e.jsx(_,{className:"w-4 h-4 mr-2"}),(r==null?void 0:r.status)==="maintenance"?"Deaktiviert":"Fahrzeug deaktivieren"]}),e.jsxs("div",{className:"flex space-x-3 ml-auto",children:[e.jsx(p,{type:"button",variant:"outline",onClick:l,children:"Abbrechen"}),e.jsx(p,{type:"submit",children:"Änderungen speichern"})]})]})}function re({costs:s,onChange:l}){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Einmalkosten"}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"bg-white p-4 rounded-lg border border-gray-200",children:[e.jsxs("div",{className:"flex items-center space-x-3 mb-3",children:[e.jsx("div",{className:"p-2 bg-blue-50 rounded-lg",children:e.jsx(w,{className:"w-5 h-5 text-blue-600"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Zulassungskosten"}),e.jsx(o,{type:"number",min:"0",step:"0.01",value:s.registration||"",onChange:r=>l({...s,registration:Number(r.target.value)}),placeholder:"0.00",className:"mt-1"})]})]}),e.jsx("p",{className:"text-sm text-gray-500 ml-12",children:"Kosten für die Fahrzeugzulassung und Kennzeichen"})]}),e.jsxs("div",{className:"bg-white p-4 rounded-lg border border-gray-200",children:[e.jsxs("div",{className:"flex items-center space-x-3 mb-3",children:[e.jsx("div",{className:"p-2 bg-green-50 rounded-lg",children:e.jsx(E,{className:"w-5 h-5 text-green-600"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Haustürlieferung"}),e.jsx(o,{type:"number",min:"0",step:"0.01",value:s.homeDelivery||"",onChange:r=>l({...s,homeDelivery:Number(r.target.value)}),placeholder:"0.00",className:"mt-1"})]})]}),e.jsx("p",{className:"text-sm text-gray-500 ml-12",children:"Kosten für die Lieferung zum Kunden"})]}),e.jsxs("div",{className:"bg-white p-4 rounded-lg border border-gray-200",children:[e.jsxs("div",{className:"flex items-center space-x-3 mb-3",children:[e.jsx("div",{className:"p-2 bg-purple-50 rounded-lg",children:e.jsx(f,{className:"w-5 h-5 text-purple-600"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Überführungskosten"}),e.jsx(o,{type:"number",min:"0",step:"0.01",value:s.transfer||"",onChange:r=>l({...s,transfer:Number(r.target.value)}),placeholder:"0.00",className:"mt-1"})]})]}),e.jsx("p",{className:"text-sm text-gray-500 ml-12",children:"Kosten für die Überführung vom Händler"})]})]}),e.jsx("div",{className:"mt-4 p-4 bg-gray-50 rounded-lg",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"font-medium",children:"Gesamtkosten:"}),e.jsxs("span",{className:"text-lg font-semibold",children:[(s.registration+s.homeDelivery+s.transfer).toFixed(2),"€"]})]})})]})}function le({initialData:s,onSubmit:l,onCancel:r,type:t="regular"}){const[n,a]=h.useState({make:(s==null?void 0:s.make)||"",model:(s==null?void 0:s.model)||"",electricRange:s==null?void 0:s.electricRange,standardEquipment:(s==null?void 0:s.standardEquipment)||"",year:(s==null?void 0:s.year)||new Date().getFullYear(),type:(s==null?void 0:s.type)||"limousine",fuelType:(s==null?void 0:s.fuelType)||"benzin",transmission:(s==null?void 0:s.transmission)||"automatik",power:(s==null?void 0:s.power)||0,engineSize:(s==null?void 0:s.engineSize)||0,mileage:(s==null?void 0:s.mileage)||0,color:(s==null?void 0:s.color)||"",features:(s==null?void 0:s.features)||[],services:(s==null?void 0:s.services)||{maintenance:!0,delivery:!0,winterTires:!0,gap:!0,roadside:!0,damageManagement:!0,insurance:!0},servicePrices:(s==null?void 0:s.servicePrices)||{insurance:89,maintenance:0,winterTires:0,gap:0,roadside:0,damageManagement:0},images:(s==null?void 0:s.images)||[],leasingRates:(s==null?void 0:s.leasingRates)||{"36_10000":0,"36_15000":0,"36_20000":0,"48_10000":0,"48_15000":0,"48_20000":0},equipmentVariant:(s==null?void 0:s.equipmentVariant)||"",deliveryTime:(s==null?void 0:s.deliveryTime)||3,customEquipment:(s==null?void 0:s.customEquipment)||[],availableColors:(s==null?void 0:s.availableColors)||[],customFeatures:(s==null?void 0:s.customFeatures)||{},oneTimeCosts:(s==null?void 0:s.oneTimeCosts)||{registration:0,homeDelivery:0,transfer:0},grossListPrice:(s==null?void 0:s.grossListPrice)||0}),d=h.useCallback(c=>{a(u=>({...u,...c}))},[]),i=async c=>{if(c.preventDefault(),!n.make||!n.model||!n.year){toast.error("Bitte füllen Sie alle Pflichtfelder aus");return}if(!Object.values(n.leasingRates).some(m=>m>0)){toast.error("Bitte geben Sie mindestens eine gültige Leasingrate ein");return}const g={...n,electricRange:n.fuelType==="elektro"?n.electricRange:void 0};await l({...g,id:t==="pool"?`pool-${Date.now()}`:`vehicle-${Date.now()}`})};return e.jsxs("form",{onSubmit:i,className:"space-y-8",children:[e.jsx(W,{data:n,onChange:d}),e.jsx(U,{data:n,onChange:d}),e.jsx(ee,{data:n,onChange:d}),e.jsx(J,{data:n,onChange:d}),e.jsx(X,{data:n,onChange:d,standardEquipment:n.standardEquipment}),e.jsx(Q,{data:n,onChange:d}),e.jsx(re,{costs:n.oneTimeCosts,onChange:c=>d({oneTimeCosts:c})}),e.jsx(D,{images:n.images,onChange:c=>d({images:c})}),e.jsx(se,{vehicleId:s==null?void 0:s.id,onCancel:r,vehicle:s})]})}function pe({isOpen:s,onClose:l,type:r="regular",store:t}){const n=async a=>{var d;try{const c=Object.entries({make:"Marke",model:"Modell",year:"Baujahr",type:"Fahrzeugtyp",fuelType:"Kraftstoffart",transmission:"Getriebe",power:"Leistung",grossListPrice:"Bruttolistenpreis"}).filter(([u])=>!a[u]).map(([,u])=>u);if(c.length>0)throw new Error(`Bitte füllen Sie folgende Pflichtfelder aus: ${c.join(", ")}`);await t.addVehicle({...a,standardEquipment:((d=a.standardEquipment)==null?void 0:d.trim())||"",mileage:a.mileage??0,images:a.images??[],features:a.features??[],customFeatures:a.customFeatures??{},availableColors:a.availableColors??[],services:{insurance:!0,maintenance:!0,delivery:!0,winterTires:!0,gap:!0,roadside:!0,damageManagement:!0,...a.services??{}},servicePrices:{insurance:89,maintenance:59,winterTires:39,gap:19,roadside:15,damageManagement:29,...a.servicePrices??{}},leasingRates:a.leasingRates||{"36_10000":0,"36_15000":0,"36_20000":0,"48_10000":0,"48_15000":0,...a.leasingRates??{}},oneTimeCosts:{registration:0,homeDelivery:0,transfer:0,...a.oneTimeCosts??{}}}),b.success(`${r==="pool"?"Pool-Fahrzeug":"Fahrzeug"} erfolgreich angelegt`),l()}catch(i){const c=i instanceof Error?i.message:"Unbekannter Fehler";b.error(c),console.error("Error creating vehicle:",i)}};return e.jsx(N,{open:s,onClose:l,className:"fixed inset-0 z-50 overflow-y-auto",children:e.jsxs("div",{className:"flex items-center justify-center min-h-screen p-4",children:[e.jsx(N.Overlay,{className:"fixed inset-0 bg-black/30"}),e.jsxs("div",{className:"relative bg-white rounded-xl max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx(N.Title,{className:"text-xl font-semibold",children:r==="pool"?"Neues Pool-Fahrzeug anlegen":"Neues Fahrzeug anlegen"}),e.jsx("button",{onClick:l,className:"p-2 text-gray-400 hover:text-gray-500 rounded-full",children:e.jsx(k,{className:"w-6 h-6"})})]}),e.jsx(le,{onSubmit:n,onCancel:l,type:r})]})]})})}function be({vehicle:s}){return e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center space-x-3 mb-2",children:[e.jsx("div",{className:"w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center",children:e.jsx(f,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsxs("h1",{className:"text-3xl font-bold text-gray-900",children:[s.make," ",s.model]}),e.jsxs("div",{className:"flex items-center space-x-2 text-gray-600",children:[e.jsx("span",{children:s.type}),e.jsx("span",{children:"•"}),e.jsx("span",{children:s.year}),s.vin&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsxs("span",{children:["VIN: ",s.vin]})]})]})]})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("span",{className:"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800",children:s.status}),s.licensePlate&&e.jsx("span",{className:"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800",children:s.licensePlate})]})]})}function je({images:s}){const[l,r]=h.useState(0),t=()=>{r(a=>a===s.length-1?0:a+1)},n=()=>{r(a=>a===0?s.length-1:a-1)};return e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"aspect-w-16 aspect-h-9 rounded-lg overflow-hidden",children:e.jsx("img",{src:s[l],alt:"Fahrzeugbild",className:"w-full h-full object-cover"})}),s.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:n,className:"absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md",children:e.jsx(K,{className:"w-6 h-6"})}),e.jsx("button",{onClick:t,className:"absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md",children:e.jsx($,{className:"w-6 h-6"})})]}),e.jsx("div",{className:"flex gap-2 mt-4",children:s.map((a,d)=>e.jsx("button",{onClick:()=>r(d),className:`w-20 h-20 rounded-lg overflow-hidden ${d===l?"ring-2 ring-gray-900":""}`,children:e.jsx("img",{src:a,alt:`Thumbnail ${d+1}`,className:"w-full h-full object-cover"})},d))})]})}function ve({vehicle:s}){const l=s.fuelType==="elektro",r=[{icon:I,label:"Baujahr",value:s.year},{icon:G,label:"Kilometerstand",value:`${s.mileage.toLocaleString()} km`},{icon:V,label:"Kraftstoff",value:s.fuelType},{icon:C,label:"Getriebe",value:s.transmission},{icon:q,label:"Leistung",value:`${s.power} PS`},...l&&s.electricRange?[{icon:F,label:"Elektrische Reichweite",value:`${s.electricRange} km`,highlight:!0}]:[],{icon:f,label:"Farbe",value:s.color}];return e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Technische Daten"}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:r.map(({icon:t,label:n,value:a,highlight:d})=>e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`p-2 ${d?"bg-green-50":"bg-gray-100"} rounded-lg`,children:e.jsx(t,{className:`w-5 h-5 ${d?"text-green-600":"text-gray-600"}`})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:n}),e.jsx("p",{className:`font-medium ${d?"text-green-600":""}`,children:a})]})]},n))})]})}const ne={ledHeadlights:"LED Scheinwerfer",navigation:"Navigation",leatherSeats:"Ledersitze",heatedSeats:"Sitzheizung",bluetooth:"Bluetooth",parkingSensors:"Einparkhilfe",cruiseControl:"Tempomat",allWheelDrive:"Allradantrieb",sunroof:"Panoramadach",climateControl:"Klimaautomatik",keylessEntry:"Keyless Entry",electricMirrors:"Elektrische Außenspiegel"};function fe({features:s,customFeatures:l={},standardEquipment:r}){const t=h.useMemo(()=>(r==null?void 0:r.split(`
`).filter(i=>i.trim()))||[],[r]),n=s.filter(i=>!i.startsWith("custom_")),a=s.filter(i=>i.startsWith("custom_")),d=[...n.map(i=>({id:i,label:ne[i]||i})),...a.map(i=>({id:i,label:l[i]||i}))];return e.jsxs("div",{className:"space-y-4",children:[r&&t.length>0&&e.jsxs("div",{className:"space-y-2 border-t border-gray-200 pt-4 mt-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Serienausstattung"}),e.jsx("div",{className:"bg-gray-50 p-4 rounded-lg",children:e.jsx("ul",{className:"space-y-2",children:t.map((i,c)=>e.jsxs("li",{className:"flex items-start space-x-2 text-gray-700",children:[e.jsx(S,{className:"w-5 h-5 text-green-500 flex-shrink-0"}),e.jsx("span",{children:i.trim()})]},c))})})]}),d.length>0&&e.jsxs("div",{className:"space-y-2 border-t border-gray-200 pt-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Zusatzausstattung"}),e.jsx("div",{className:"grid grid-cols-2 gap-3",children:d.map(({id:i,label:c})=>e.jsxs("div",{className:"flex items-center space-x-2 text-gray-700",children:[e.jsx(S,{className:"w-5 h-5 text-green-500 flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:c})]},i))})]})]})}function ye({colors:s=[],selectedColor:l,onColorSelect:r}){return!s||s.length===0?null:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(H,{className:"w-5 h-5 text-gray-600"}),e.jsx("h3",{className:"text-lg font-semibold",children:"Verfügbare Farben"})]}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:s.map(t=>e.jsxs("button",{onClick:()=>r==null?void 0:r(t),className:`flex items-center space-x-3 p-4 rounded-lg border transition-all ${l===t.name?"border-gray-900 bg-gray-50 shadow-sm":"border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`,children:[e.jsx("div",{className:"w-8 h-8 rounded-full border border-gray-200 shadow-inner",style:{backgroundColor:t.code}}),e.jsxs("div",{className:"flex-1 text-left",children:[e.jsx("div",{className:"font-medium text-gray-900",children:t.name}),e.jsxs("div",{className:"text-sm text-gray-500 flex items-center space-x-2",children:[e.jsx("span",{children:t.type.charAt(0).toUpperCase()+t.type.slice(1)}),t.price?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsxs("span",{className:"font-medium text-gray-900",children:["+",t.price.toFixed(2),"€"]})]}):null]})]})]},t.name))})]})}function Ne({services:s}){const r=[{id:"insurance",icon:R,title:"Vollkasko- & Haftpflichtversicherung",description:"Inkl. Vollkasko, Teilkasko und Haftpflicht",enabled:s.insurance},{id:"maintenance",icon:v,title:"Wartung & Verschleiß",enabled:s.maintenance},{id:"winterTires",icon:T,title:"Winterreifen",description:"Inkl. Einlagerung und Wechsel",enabled:s.winterTires},{id:"gap",icon:w,title:"GAP Deckung Premium",enabled:s.gap},{id:"roadside",icon:v,title:"KFZ-Schutzbrief & Pannenhilfe",enabled:s.roadside},{id:"damageManagement",icon:C,title:"Schadensmanagement",enabled:s.damageManagement},{id:"delivery",icon:E,title:"Überführung & Zulassung",enabled:s.delivery}].filter(t=>t.enabled);return r.length===0?null:e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Inklusive Leistungen"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:r.map(t=>e.jsx("div",{className:"bg-white p-4 rounded-lg border border-gray-200 shadow-sm",children:e.jsxs("div",{className:"flex items-start space-x-4",children:[e.jsx("div",{className:"p-2 bg-gray-50 rounded-lg",children:e.jsx(t.icon,{className:"w-5 h-5 text-gray-600"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h4",{className:"font-medium text-gray-900",children:t.title}),t.description&&e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:t.description})]})]})},t.id))})]})}function ke({selectedMonths:s,onChange:l}){return e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-4",children:"Laufzeit"}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:[36,48].map(r=>e.jsxs("button",{onClick:()=>l(r),className:`p-4 border rounded-lg text-center transition-colors ${s===r?"border-black bg-gray-50":"border-gray-200"}`,children:[e.jsx("span",{className:"block font-medium",children:r}),e.jsx("span",{className:"text-sm text-gray-500",children:"Monate"})]},r))})]})}function we({selectedKilometers:s,onChange:l}){return e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-4",children:"Inklusivkilometer pro Jahr"}),e.jsx("div",{className:"grid grid-cols-3 gap-4",children:[1e4,15e3,2e4].map(r=>e.jsxs("button",{onClick:()=>l(r),className:`p-4 border rounded-lg text-center transition-colors ${s===r?"border-black bg-gray-50":"border-gray-200"}`,children:[e.jsx("span",{className:"block font-medium",children:r.toLocaleString()}),e.jsx("span",{className:"text-sm text-gray-500",children:"km/Jahr"})]},r))}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"Zusatz-km werden mit 0,99€ pro km berechnet"})]})}export{xe as A,ke as D,Ne as I,we as K,pe as V,be as a,je as b,ve as c,ye as d,fe as e,le as f};
