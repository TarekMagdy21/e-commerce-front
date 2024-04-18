import {useLocation} from "react-router-dom";
import {useGetProductsQuery} from "@/store/apis/productApi/productApi";
import ProductDetailsWeb from "./web/ProductDetailsWeb";
import ProductDetailsMobile from "./mobile/ProductDetailsMobile";
import LoadingSpinner from "../shared/LoadingSpinner";
const ProductDetails = () => {
  const {data: AllProducts, isLoading} = useGetProductsQuery({page: 2, limit: 4});
  const {state} = useLocation();
  if (isLoading) {
    return (
      <LoadingSpinner />

    );
  }
  return (
    <>
      {/* Mobile */}
      <ProductDetailsMobile similarProducts={AllProducts?.products} product={state?.product} />
      {/* Web */}
      <ProductDetailsWeb similarProducts={AllProducts?.products} product={state?.product} />
    </>
  );
};

export default ProductDetails;
