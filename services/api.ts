

import { Product } from "@/interfaces/Product";
import { ProductCard } from "@/components/ui/e-commerce-product-details"; // عدلي المسار لو مختلف

class ApiServices {
#BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

#headers = {
    "Content-Type": "application/json",
    token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDc4ZjJkYjhhMjA2MmNhZmVhMWI4NCIsIm5hbWUiOiJBaG1lZCBuYXNzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3NTczNDU3NCwiZXhwIjoxNzgzNTEwNTc0fQ._4AnD2R900ed2JR1cUqd2jAjBdL9ZypcGTV-fbYABQM",
};

  async getProduct(): Promise<Product[]> {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    const { data: products } = await response.json();
    return products;
  }

  async getProductDetails(productId: string): Promise<Product> {
    const response = await fetch(
      `${this.#BASE_URL}/api/v1/products/${productId}`
    );
    const { data: product } = await response.json();
    return product;
  }

 async addProductToCart(
  productId: string
): Promise<any> {
  const response = await fetch(`${this.#BASE_URL}/api/v2/cart`, {
    method: "POST",
    headers: this.#headers,
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();
  return data;
}

  async getCart() {
    const response = await fetch(`${this.#BASE_URL}/api/v2/cart`, {
      headers: this.#headers,
    });

    const data = await response.json();
    return data;
  }

  async removeProductFromCart(productId: string) {
    const response = await fetch(
      `${this.#BASE_URL}/api/v2/cart/${productId}`,
      {
        method: "DELETE",
        headers: this.#headers,
      }
    );

    const data = await response.json();
    return data;
  }

  async clearCart(): Promise<string> {
    const response = await fetch(`${this.#BASE_URL}/api/v2/cart`, {
      method: "DELETE",
      headers: this.#headers,
    });

    const data = await response.json();
    return data;
  }

  async updateProductCount(
  productId: string,
  count: number
): Promise<any> {
  const response = await fetch(
    `${this.#BASE_URL}/api/v2/cart/${productId}`,
    {
      method: "PUT",
      headers: this.#headers,
      body: JSON.stringify({ count }),
    }
  );

  const data = await response.json();
  return data;
}
async createOrder(shippingAddress: {
  details: string;
  phone: string;
  city: string;
}) {
  
  const response = await fetch(`${this.#BASE_URL}/api/v2/orders`, {
    method: "POST",
    headers: this.#headers,
    body: JSON.stringify({
      shippingAddress,
    }),
  });

  const data = await response.json();
  return data;
}

async getCategories() {
  const res = await fetch(`${this.#BASE_URL}/api/v1/categories`);
  const data = await res.json();
  return data.data;
}

async getBrands() {
  const res = await fetch(`${this.#BASE_URL}/api/v1/brands`);
  const data = await res.json();
  return data.data;
}





}

export const apiServices = new ApiServices();
export default apiServices;