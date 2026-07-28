"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import ProductCard from "../shop/ProductCard";

interface Props{
category:string;
currentId:number;
}

export default function RelatedProducts({
category,
currentId,
}:Props){

const [products,setProducts]=useState<any[]>([]);

useEffect(()=>{
fetchProducts();
},[]);

async function fetchProducts(){

const {data}=await supabase
.from("products")
.select("*")
.eq("category",category)
.neq("id",currentId)
.limit(4);

if(data){
setProducts(data);
}

}

if(products.length===0){
return null;
}

return(

<section className="mt-24">

<h2 className="mb-10 text-4xl font-serif text-[#143D60]">
You May Also Like
</h2>

<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

{products.map((product)=>(

<ProductCard
key={product.id}
product={product}
/>

))}

</div>

</section>

)

}