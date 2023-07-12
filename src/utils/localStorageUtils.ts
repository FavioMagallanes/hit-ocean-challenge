import { ShowCart } from "@/App";
import { CartItem } from "@/context/cartContext";

export const saveCartItemsToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

export const saveGemsToLocalStorage = (gems: number) => {
  localStorage.setItem("gems", gems.toString());
};

export const saveComponentToLocalStorage = (component: ShowCart) => {
  localStorage.setItem("showCart", JSON.stringify(component));
};
