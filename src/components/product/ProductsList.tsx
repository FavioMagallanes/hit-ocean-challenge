import useCartItems from "../../hooks/useCartItems";
import ProductItem from "./ProductItem";

const ProductsList = () => {
  const { products, addItemsToCart, isCategoryItemInCart } = useCartItems();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          isCategoryItemInCart={isCategoryItemInCart}
          addItemsToCart={addItemsToCart}
        />
      ))}
    </div>
  );
};

export default ProductsList;
