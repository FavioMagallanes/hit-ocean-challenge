import { useState } from "react";
import Cart from "./components/cart/Cart";
import ProductsList from "./components/product/ProductsList";
import Header from "./components/ui/Header";

export interface ShowCart {
  showCart: boolean;
}

function App() {
  const [showCart, setShowCart] = useState<ShowCart>({ showCart: false });

  const handleShowCart = () => {
    setShowCart(prevShowCart => ({
      showCart: !prevShowCart.showCart,
    }));
  };
  return (
    <div className="min-h-full bg-fixed bg-no-repeat bg">
      <Header />
      <main className="flex justify-center min-h-full">
        <div className="max-w-5xl w-full py-16">
          {showCart.showCart ? <Cart /> : <ProductsList />}
        </div>
      </main>
    </div>
  );
}

export default App;
