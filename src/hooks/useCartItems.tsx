import { useEffect, useState } from "react";

import { Zoom, toast } from "react-toastify";
import { Cart, CartItem } from "../types/interfaces";
import { useCartContext } from "../context/cartContext";

const useCartItems = (): Cart => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const { addItemToCart, cartItems, gems } = useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/productos");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        toast.error("Hubo un error, intente nuevamente", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          transition: Zoom,
          theme: "dark",
          className: "text-xs",
        });
      }
    };

    fetchProducts();
  }, []);

  const addItemsToCart = (id: number) => {
    const currentProduct = products.find(product => product.id === id);
    if (!currentProduct) return;

    const categoryItemInCart = cartItems.find(
      item => item.categoria === currentProduct.categoria,
    );

    if (gems < currentProduct.precio) {
      toast.warn("No tienes suficientes gemas para comprar este producto.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        transition: Zoom,
        theme: "dark",
        className: "text-xs",
      });
      return;
    }

    if (categoryItemInCart) return;

    const item = {
      ...currentProduct,
      cantidad: 1,
    };

    addItemToCart(item);
  };

  const isCategoryItemInCart = (categoria: string) => {
    return cartItems.some(item => item.categoria === categoria);
  };

  return {
    addItemsToCart,
    isCategoryItemInCart,
    products,
  };
};

export default useCartItems;
