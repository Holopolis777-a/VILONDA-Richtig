import{r as n,j as e,B as d,m}from"./index-xKrTDA7N.js";import{B as o}from"./Badge-v6lJ1hQp.js";import{f as x}from"./dateUtils-DFVphTDA.js";import{C as u}from"./check-circle-DFIg8aHR.js";function h(){const[s,t]=n.useState([]),[l,a]=n.useState(0);return n.useEffect(()=>{const i=[{id:"1",title:"Neue Bestellung",message:"Eine neue Bestellung wurde eingereicht",type:"info",read:!1,timestamp:new Date},{id:"2",title:"Bestellung bestätigt",message:"Ihre Bestellung wurde erfolgreich bestätigt",type:"success",read:!1,timestamp:new Date(Date.now()-36e5)}];t(i),a(i.filter(r=>!r.read).length)},[]),{notifications:s,unreadCount:l,markAsRead:async i=>{t(r=>r.map(c=>c.id===i?{...c,read:!0}:c)),a(r=>Math.max(0,r-1))}}}function p({notification:s,onMarkAsRead:t}){return e.jsx("div",{className:`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${s.read?"":"border-l-4 border-l-primary-400"}`,children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("h3",{className:"font-semibold",children:s.title}),e.jsx(o,{variant:s.type==="success"?"success":"info",children:s.type==="success"?"Erfolg":"Info"})]}),e.jsx("p",{className:"text-gray-600",children:s.message}),e.jsx("p",{className:"text-sm text-gray-500",children:x(s.timestamp)})]}),!s.read&&e.jsxs(d,{variant:"ghost",size:"sm",onClick:()=>t(s.id),children:[e.jsx(u,{className:"w-4 h-4 mr-2"}),"Als gelesen markieren"]})]})})}function w(){const{notifications:s,markAsRead:t}=h(),l=async a=>{await t(a)};return e.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-8 space-y-6",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("div",{className:"p-3 bg-primary-400 rounded-xl",children:e.jsx(m,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"Benachrichtigungen"}),e.jsx("p",{className:"text-gray-500",children:"Ihre aktuellen Mitteilungen und Updates"})]})]}),e.jsx("div",{className:"space-y-4",children:s.map(a=>e.jsx(p,{notification:a,onMarkAsRead:l},a.id))})]})}export{w as default};
