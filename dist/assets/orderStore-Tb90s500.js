import{e as g}from"./index-xKrTDA7N.js";const c=g((a,n)=>({orders:[],loading:!1,error:null,createOrder:async(o,r,t,e)=>{a({loading:!0});try{const s=`ORD-${Date.now().toString(36).toUpperCase()}`,d=new Date;d.setDate(d.getDate()+30);const l={id:Date.now().toString(),userId:r,vehicleId:o,orderNumber:s,status:"pending",createdAt:new Date,estimatedDeliveryDate:d,configuration:t,vehicle:{make:e.make,model:e.model,year:e.year,image:e.images[0]},totalMonthlyRate:t.monthlyRate};a(i=>({orders:[...i.orders,l],loading:!1}))}catch{a({error:"Failed to create order",loading:!1})}},updateOrderStatus:async(o,r)=>{a({loading:!0});try{a(t=>({orders:t.orders.map(e=>e.id===o?{...e,status:r}:e),loading:!1}))}catch{a({error:"Failed to update order status",loading:!1})}},getOrders:o=>n().orders.filter(r=>r.userId===o).sort((r,t)=>t.createdAt.getTime()-r.createdAt.getTime())}));export{c as u};
