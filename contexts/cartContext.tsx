"use client";

import apiServices from "@/services/api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";


interface CartContextType {
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
}

export const cartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
  isLoading: true,
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function getCart() {
    try {
      setIsLoading(true);
      console.log("FETCHING CART API...");
    

      const response = await apiServices.getCart();

      setCartCount(response.numOfCartItems || 0);

    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <cartContext.Provider value={{ cartCount, setCartCount, isLoading }}>
      {children}
    </cartContext.Provider>
  );
}