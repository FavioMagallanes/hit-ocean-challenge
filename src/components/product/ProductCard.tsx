import { CartItem, useCartContext } from "../../context/cartContext";
import { Product } from "../../types/interfaces";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Button from "../ui/Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItemToCart, cartItems, gems } = useCartContext();

  const addItemsToCart = () => {
    const categoryItemInCart = cartItems.find(
      item => item.categoria === product.categoria,
    );
    if (categoryItemInCart) return;

    const item: CartItem = {
      ...product,
      cantidad: 1,
    };

    if (gems < product.precio) {
      toast.warn("No tienes suficientes gemas para comprar este producto.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    addItemToCart(item);
  };

  const isCategoryItemInCart = (categoria: string) => {
    return cartItems.some(item => item.categoria === categoria);
  };

  return (
    <div className="bg-stone-700 border-stone-700 border p-4 pb-6 shadow flex flex-col gap-3 justify-between rounded-lg overflow-hidden hover:border hover:border-purple-500">
      <div className="flex items-start justify-between">
        <img
          className="w-12 h-12 object-cover mb-4 self-center"
          src={product.imagen}
          alt={product.nombre}
        />
        <p className="text-[10px] inline-block bg-green-500 py-1 px-2 rounded-xl text-white">
          {product.precio} {product.precio === 1 ? "Gem" : "Gems"}
        </p>
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <h2 className="text-base text-white font-medium mb-2">
          {product.nombre}
        </h2>
        <p className="text-gray-400 mb-2 text-xs overflow-hidden">
          {product.descripcion}
        </p>
        <p className="text-gray-500 text-xs mt-12 mb-2">
          <span className="text-gray-300">Categoría</span> - {product.categoria}
        </p>

        <Button
          className={`bg-purple-500 hover:bg-purple-600 text-white font-light text-xs py-2 w-full rounded-full ${
            isCategoryItemInCart(product.categoria)
              ? "opacity-50 bg-stone-500 cursor-not-allowed"
              : ""
          }`}
          onClick={addItemsToCart}
          disabled={
            gems < product.precio || isCategoryItemInCart(product.categoria)
          }>
          Agregar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
