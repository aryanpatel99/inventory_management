"use client"
import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ChartData {
  week: string;
  products: number
}

// const ProductsChart = ({data}:{data:ChartData[]}) => {
//   console.log(data)
//   return (
//     <div>ProductsChart</div>
//   )
// }

// export default ProductsChart


const ProductChart = ({data}:{data:ChartData[]}) => {
  return (
    <div className='h-48 w-full'>
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3"  stroke='#f1f1f1'/>
                <XAxis dataKey="week" stroke='#666' fontSize={12} tickLine={false} axisLine={true}/>
                <YAxis stroke='#666' fontSize={12} tickLine={false} axisLine={true} allowDecimals={false}/>

                <Area type="monotone" dataKey="products" stroke="#8b5cf6" fill="#8884d8" fillOpacity={0.3} strokeWidth={1} dot={true} />
                <Tooltip contentStyle={{
                    backgroundColor:"white",
                    border:"1px solid #e5e7eb",
                    borderRadius:"8px",
                    boxShadow:"0 4px 6px -1px rgba(0,0,0,0.1)"
                }} 
                
                labelStyle={{color:"#374151", fontWeight:"500"}}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default ProductChart