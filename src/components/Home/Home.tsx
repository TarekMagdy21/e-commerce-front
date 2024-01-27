import { useGetProductsQuery } from "@/store/apis/productApi/productApi";
import LoadingSpinner from "../shared/LoadingSpinner";
import HomeWeb from "./web/HomeWeb";
import HomeMobile from "./mobile/HomeMobile";
const Home = () => {
  const { data: Products, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 9,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <HomeMobile Products={Products} />

      {/* ---------------------------------------------------------------------------------------------------------------------- */}
      <HomeWeb Products={Products?.products} />
    </>
  );
};

export default Home;
