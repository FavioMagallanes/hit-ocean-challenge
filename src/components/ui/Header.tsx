import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../../context/cartContext";

interface HeaderProps {
  onCartClick: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const { gems, cartItems } = useCartContext();

  const totalItems = cartItems.length;

  return (
    <div className="py-4 px-8 flex justify-between items-center sticky top-0 z-10 pt-6">
      <h1 className="text-white font-bold text-2xl tracking-tighter">
        🧙‍♂️ Potion Shop
      </h1>
      <div className="flex gap-4 items-center relative">
        <img
          src="/gem.png"
          alt="imagen de gema"
          className="w-6 h-6 self-center"
        />
        <span className="text-white text-xs tracking-tighter">{gems}</span>
        {totalItems > 0 && (
          <div className="absolute right-0 -top-3 rounded-full bg-red-500 text-white w-4 h-4 flex items-center justify-center text-xs">
            {totalItems}
          </div>
        )}
        <div className="relative">
          <ShoppingCart
            color="#fdfcfc"
            className="w-6 h-6 cursor-pointer"
            onClick={onCartClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
