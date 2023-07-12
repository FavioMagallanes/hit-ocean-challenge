import { FC, useState, useEffect } from "react";
import { CartContext, CartItem } from "./cartContext";
import {
  saveCartItemsToLocalStorage,
  saveGemsToLocalStorage,
} from "../utils/localStorageUtils";
import { CartContextType } from "../types/interfaces";

interface CartProviderProps {
  children: React.ReactNode;
}
export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const storedCartItems = localStorage.getItem("cartItems");
  const initialCartItems: CartItem[] = storedCartItems
    ? JSON.parse(storedCartItems)
    : [];

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const storedGems = localStorage.getItem("gems");
  const initialGems: number = storedGems ? parseInt(storedGems) : 3;

  const [gems, setGems] = useState(initialGems);

  useEffect(() => {
    saveCartItemsToLocalStorage(cartItems);
    saveGemsToLocalStorage(gems);
  }, [cartItems, gems]);

  const addItemToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.id === item.id,
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].cantidad += item.cantidad;
        return updatedItems;
      } else {
        return [...prevItems, item];
      }
    });

    setGems(prevGems => prevGems - item.precio * item.cantidad);
  };

  const removeItemFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    const removedItem = cartItems.find(item => item.id === itemId);

    if (removedItem)
      setGems(prevGems => prevGems + removedItem.precio * removedItem.cantidad);
  };

  const clearCart = () => {
    setCartItems([]);
    setGems(3);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveCartItemsToLocalStorage(cartItems);
      saveGemsToLocalStorage(gems);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems, gems]);

  const cartContextValue: CartContextType = {
    cartItems,
    gems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
