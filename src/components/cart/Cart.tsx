import { useEffect } from "react";
import { useCartContext } from "../../context/cartContext";
import useCartPurchase from "../../hooks/usePurchase";
import Button from "../ui/Button";
import ProductItemInToCart from "../product/ProductItemInToCart";
import { Undo2 } from "lucide-react";

interface CartProps {
  handleShowCart: () => void;
}

const Cart = ({ handleShowCart }: CartProps) => {
  const { cartItems, removeItemFromCart, clearCart } = useCartContext();
  const { buyItems, isLoading, purchaseSuccessful } = useCartPurchase();

  useEffect(() => {
    if (purchaseSuccessful) {
      setTimeout(() => {
        clearCart();
      }, 4000);
    }
  }, [purchaseSuccessful]);

  return (
    <div className="max-w-screen-sm mx-auto">
      <Button
        className="bg-purple-500 flex items-center gap-2 hover:bg-purple-600 text-white font-light text-xs py-2 px-4 rounded mb-12"
        onClick={handleShowCart}
        icon={Undo2}>
        Volver
      </Button>
      <div className="rounded-md flex flex-col gap-2">
        {cartItems.map(item => (
          <ProductItemInToCart
            key={item.id}
            item={item}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </div>

      {cartItems.length > 0 ? (
        isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mt-12 border-purple-500"></div>
          </div>
        ) : (
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white font-light text-xs py-2 px-4 w-1/4 mb-4 rounded mt-6"
            disabled={cartItems.length === 0 || isLoading}
            onClick={buyItems}>
            {isLoading ? "Comprando..." : "Comprar"}
          </Button>
        )
      ) : (
        <p className="text-white text-center">No hay gemas en el carrito</p>
      )}
    </div>
  );
};

export default Cart;
