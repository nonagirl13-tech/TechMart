
import {apiServices} from "@/services/api";
import {ProductCard} from "@/components/products/ProductCard";


export default async function Products() {

const products = await apiServices.getProduct();
console.log (products);

return (
<div>
    <h1>Products</h1>
    <div className="grid grid-cols-4">
    {products.map((product) => (
    <ProductCard 
    id={product._id}
    name={product.title}
    images={product.images}
    rating={product.ratingsAverage}
    reviewCount={product.ratingsQuantity}
    price={product.price} 
    originalPrice={product.price + 100}/>
))}
    </div>
        </div>

    );
}




