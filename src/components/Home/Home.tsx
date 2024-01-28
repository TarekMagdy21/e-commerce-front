import {useGetProductsQuery} from "@/store/apis/productApi/productApi";
import HomeWeb from "./web/HomeWeb";
import HomeMobile from "./mobile/HomeMobile";
import LoadingSpinner from "../shared/LoadingSpinner";

const Home = () => {
  const {data: Products, isLoading} = useGetProductsQuery({page: 1, limit: 9});
  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }
  return (
    <>
      {/* Mobile */}
      <HomeMobile Products={Products?.products} />
      {/* ---------------------------------------------------------------------------------------------------------------------- */}
      {/* Web */}
      <HomeWeb Products={Products?.products}/>
    </>
  );
};

export default Home;
