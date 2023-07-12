import { useEffect, useState } from "react";
import { useCartContext } from "@/context/cartContext";
import { Zoom, toast } from "react-toastify";

const useCartPurchase = () => {
  const { cartItems, removeItemFromCart, clearCart } = useCartContext();
  const [purchaseSuccessful, setPurchaseSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buyItems = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handlePurchase();
    }, 4000);
  };

  const handlePurchase = async () => {
    try {
      const items = cartItems.map(item => item.id);
      const data = {
        items,
      };

      const response = await fetch("http://localhost:3001/compras", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Compra realizada con éxito.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          transition: Zoom,
          theme: "dark",
          className: "text-xs",
        });
      }

      clearCart();
      cartItems.length = 0;
      removeItemFromCart(0);
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

  useEffect(() => {
    if (purchaseSuccessful) {
      setTimeout(() => {
        setPurchaseSuccessful(false);
      }, 4000);
    }
  }, [purchaseSuccessful]);

  return {
    buyItems,
    isLoading,
    purchaseSuccessful,
    setPurchaseSuccessful,
  };
};

export default useCartPurchase;
