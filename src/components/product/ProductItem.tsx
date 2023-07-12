import { Product } from "../../types/interfaces";
import Button from "../ui/Button";

interface ProductItemProps {
  product: Product;
  isCategoryItemInCart: (category: string) => boolean;
  addItemsToCart: (productId: number) => void;
}

const ProductItem = ({
  product,
  isCategoryItemInCart,
  addItemsToCart,
}: ProductItemProps) => {
  return (
    <div
      key={product.id}
      className="bg-stone-700 border-stone-700 border p-4 pb-6 shadow flex flex-col gap-3 justify-between rounded-lg overflow-hidden hover:border hover:border-purple-500">
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
          className={`bg-purple-500 hover:bg-purple-600 text-white text-sm font-normal py-2 w-full rounded-full ${
            isCategoryItemInCart(product.categoria)
              ? "opacity-50 bg-stone-500 cursor-not-allowed"
              : ""
          }`}
          onClick={() => addItemsToCart(product.id)}>
          Agregar
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
