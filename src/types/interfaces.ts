export interface Data {
  productos: Product[];
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
}

export interface Cart {
  addItemsToCart: (id: number) => void;
  isCategoryItemInCart: (category: string) => boolean;
  products: Product[];
}

export interface CartItem extends Product {
  cantidad: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  gems: number;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: number) => void;
  clearCart: () => void;
}
