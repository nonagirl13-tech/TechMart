import { apiServices } from "@/services/api";
import InnerCart from "./InnerCart";
import React from "react";

export default async function Cart() {
  const cart = await apiServices.getCart();
  
  return <InnerCart cartData={cart} />;
}
