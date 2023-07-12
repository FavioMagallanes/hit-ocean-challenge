import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartProvider";
import Header from "./components/ui/Header";
import Cart from "./components/cart/Cart";
import ProductsList from "./components/product/ProductsList";
import { saveComponentToLocalStorage } from "./utils/localStorageUtils";

export interface ShowCart {
  showCart: boolean;
}

function App() {
  const storedShowCart = localStorage.getItem("showCart");
  const [showCart, setShowCart] = useState<ShowCart>(
    storedShowCart ? JSON.parse(storedShowCart) : { showCart: false },
  );

  const handleShowCart = () => {
    setShowCart(prevShowCart => ({
      showCart: !prevShowCart.showCart,
    }));
  };

  useEffect(() => {
    saveComponentToLocalStorage(showCart);
  }, [showCart]);

  return (
    <CartProvider>
      <div className="min-h-full bg-fixed bg-no-repeat bg">
        <Header onCartClick={handleShowCart} />
        <main className="flex justify-center min-h-full">
          <div className="max-w-5xl w-full py-16">
            {showCart.showCart ? (
              <Cart handleShowCart={handleShowCart} />
            ) : (
              <ProductsList />
            )}
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
