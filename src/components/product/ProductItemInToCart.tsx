import { Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  imagen: string;
  nombre: string;
  categoria: string;
  precio: number;
}

interface ProductItemProps {
  item: CartItem;
  removeItemFromCart: (itemId: number) => void;
}

const ProductItemInToCart = ({
  item,
  removeItemFromCart,
}: ProductItemProps) => {
  return (
    <div
      key={item.id}
      className="bg-stone-700 flex items-center justify-between border rounded-md border-purple-400 p-2 hover:bg-stone-600">
      <div className="flex items-center">
        <div className="rounded-full bg-stone-500 border-2 border-purple-500">
          <img
            src={item.imagen}
            alt={item.nombre}
            className="w-10 h-10 object-cover rounded"
          />
        </div>
        <div className="flex items-center divide-white">
          {" "}
          <span className="text-white text-base ml-4 tracking-tighter">
            {item.nombre}
          </span>
          <div className="border-l border h-8 ml-4 border-white"></div>
          <span className="text-gray-400 text-[11px] ml-4">
            Categoría - {item.categoria}
          </span>
          <span className="text-gray-400 text-[11px] ml-4 flex items-center gap-1">
            Precio: {item.precio}{" "}
            <img
              src="/gem.png"
              alt="imagen de gema"
              className="w-4 h-4 self-center ml-1"
            />
          </span>
        </div>
      </div>
      <div className="flex justify-end mr-3">
        <Trash2
          className="w-5 h-5 cursor-pointer text-white hover:text-red-500"
          onClick={() => removeItemFromCart(item.id)}
        />
      </div>
    </div>
  );
};

export default ProductItemInToCart;
