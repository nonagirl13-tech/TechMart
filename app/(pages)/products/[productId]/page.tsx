import { apiServices } from '@/services/api';
import React from 'react'

export default async function ProductDetails({
    params,
}: {
    params: Promise<{productId:string}>;
}) {
    const productId = await params.then ((res) => res.productId );
    
    const product = await apiServices.getProductDetails(productId)
    console.log(product);
    return 
    <div>ProductDetails</div>;

}

