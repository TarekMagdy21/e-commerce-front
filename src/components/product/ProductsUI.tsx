import ProductsUIMobile from "./mobile/ProductsUIMobile";
import ProductsUIWeb from "./web/ProductsUIWeb";

const ProductsUI = () => {
  return (
    <>
      {/* Mobile */}
      <ProductsUIMobile />
      {/* Web */}
      <ProductsUIWeb />
    </>
  );
};

export default ProductsUI;
