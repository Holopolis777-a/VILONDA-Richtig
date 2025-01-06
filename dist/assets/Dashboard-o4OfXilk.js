import{a as x,j as e,g as l,F as d}from"./index-xKrTDA7N.js";import{f as o}from"./dateUtils-DFVphTDA.js";import{C as i}from"./clock-CXsEwfTr.js";import{S as t}from"./shield-Dkc3ZdED.js";function j(){const{user:a}=x(),s={activeRequests:2,approvedRequests:5,nextService:new Date("2024-06-15"),insuranceCoverage:"100%"},c=[{icon:l,label:"Neue Fahrzeuganfrage",path:"/employee/vehicles"},{icon:i,label:"Anfragen verwalten",path:"/employee/requests"},{icon:d,label:"Dokumente einsehen",path:"/employee/documents"},{icon:t,label:"Versicherungsdetails",path:"/employee/insurance"}];return e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("h1",{className:"text-2xl font-semibold text-gray-900",children:["Willkommen zurück, ",a==null?void 0:a.name]})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsx("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-gray-200",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"p-2 bg-blue-50 rounded-lg",children:e.jsx(i,{className:"w-5 h-5 text-blue-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Aktive Anfragen"}),e.jsx("p",{className:"text-2xl font-semibold",children:s.activeRequests})]})]})}),e.jsx("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-gray-200",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"p-2 bg-green-50 rounded-lg",children:e.jsx(l,{className:"w-5 h-5 text-green-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Genehmigte Anfragen"}),e.jsx("p",{className:"text-2xl font-semibold",children:s.approvedRequests})]})]})}),e.jsx("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-gray-200",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"p-2 bg-purple-50 rounded-lg",children:e.jsx(d,{className:"w-5 h-5 text-purple-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Nächster Service"}),e.jsx("p",{className:"text-2xl font-semibold",children:o(s.nextService)})]})]})}),e.jsx("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-gray-200",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"p-2 bg-indigo-50 rounded-lg",children:e.jsx(t,{className:"w-5 h-5 text-indigo-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Versicherungsschutz"}),e.jsx("p",{className:"text-2xl font-semibold",children:s.insuranceCoverage})]})]})})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:c.map((r,n)=>e.jsx("button",{onClick:()=>window.location.href=r.path,className:"bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow",children:e.jsxs("div",{className:"flex flex-col items-center text-center space-y-3",children:[e.jsx("div",{className:"p-3 bg-gray-50 rounded-lg",children:e.jsx(r.icon,{className:"w-6 h-6 text-gray-600"})}),e.jsx("span",{className:"font-medium text-gray-900",children:r.label})]})},n))})]})}export{j as default};
