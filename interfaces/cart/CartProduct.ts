import { Brand } from "../Brand";
import { Category } from "../Category";
import { SubCategory } from "../SubCategory";

export interface Product {
_id: string;
id?: string;
title: string;
slug: string;
quantity: number;
imageCover: string;
category: Category;
subcategory: SubCategory[];
brand: Brand;
ratingsAverage: number;
}

export interface CartProduct {
_id: string;
count: number;
price: number;
product: Product;
}

export interface GetUserCartResponse {
status: string;
numOfCartItems: number;
data: {
    products: CartProduct[];
    totalCartPrice: number;
};
}