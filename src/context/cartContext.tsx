import { createContext, useContext } from "react";
import { Product } from "../types/interfaces";

export interface CartItem extends Product {
  cantidad: number;
}

interface CartContextType {
  cartItems: CartItem[];
  gems: number;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  gems: 3,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
});

export const useCartContext = () => useContext(CartContext);
