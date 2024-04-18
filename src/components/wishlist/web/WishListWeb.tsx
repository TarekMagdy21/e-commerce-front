import {ProductProps} from "@/types/Product.interface";
import {
  useGetFavoriteProductsQuery,
  useToggleFavoriteMutation,
} from "@/store/apis/productApi/productApi";
import {Link, useNavigate} from "react-router-dom";
import {FaHeart, FaLock, FaPhone, FaTruck, FaShoppingCart} from "react-icons/fa";
import {useAddToCartMutation} from "@/store/apis/cartApi/cartApi";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const WishListWeb = () => {
  const userId = localStorage.getItem("userId");
  const {data: wishlist, isLoading} = useGetFavoriteProductsQuery({userId});
  const [addToWishlist] = useToggleFavoriteMutation({});
  const [addToCart] = useAddToCartMutation({});
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <LoadingSpinner />

    );
  }
  return (
    <div className="bg-[#F8F9FA] border-y pt-10 pb-[10rem]">
      <div className="  mx-auto  max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        {/* Saved Items (WishList)*/}
        <div className="border rounded-lg my-4 bg-white">
          <div className="flex items-center gap-3 p-5">
            <FaHeart color="#9DA1A7" size="25" />{" "}
            <p className="font-semibold text-2xl">Your saved items</p>
          </div>
          {wishlist.wishlist.length == 0 ? (
            <>
              <h1 className="p-5 font-medium">There are no saved items</h1>
              <div className="flex flex-col gap-2 py-4 px-5">
                <Link to={"/"} className="w-fit   text-blue-500 hover:underline">
                  Home Page{" "}
                </Link>
                <Link to={"/products"} className=" w-fit  text-blue-500 hover:underline ">
                  Products Page{" "}
                </Link>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mb-5   ">
              {wishlist?.wishlist.map((item: ProductProps) => (
                <div key={item._id} className="grid gap-2   mx-2 mb-4">
                  <div className="border rounded-lg p-4">
                    <img
                      src={item.images[0]}
                      alt={`Image-${item._id}`}
                      className="w-40 h-40 rounded-lg cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${item.category}/${item._id}`, {
                          state: {product: item},
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Link
                      to={`/product/${item.category}/${item._id}`}
                      state={{product: item}}
                      className="hover:text-blue-500 cursor-pointer">{`${item.title.substring(
                      0,
                      22,
                    )}...`}</Link>
                    <p className="text-[#9DA1A7]">${item.price}</p>
                  </div>
                  <button
                    className="border px-4 rounded-lg py-1 flex items-center gap-4 text-blue-500 hover:bg-gray-100 duration-300 transition ease-in-out"
                    onClick={() => {
                      addToWishlist({userId: userId, productId: item._id});
                      addToCart({
                        userId,
                        items: [{product: item._id, quantity: 1}],
                      });
                    }}>
                    <FaShoppingCart className="hover:text-[#0d9dfd]" /> Move to cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* The gray area with delivery and stuff */}
        <div className="p-4 rounded-xl bg-[#E9ECEF] mt-5">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex gap-4 items-center">
              <div className="bg-[#CCD1D6] p-4 rounded-full">
                <FaLock size="25 " color="#565656" />
              </div>
              <p className="text-[#565656]">
                Secure Payment
                <span className="text-[#9DA1A7]">
                  <br />
                  pay with ease and relief
                </span>
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-[#CCD1D6] p-4 rounded-full">
                <FaPhone size="25 " color="#565656" />
              </div>
              <p className="text-[#565656]">
                Customer Support
                <span className="text-[#9DA1A7]">
                  <br />
                  Customer Support 24/7
                </span>
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-[#CCD1D6] p-4 rounded-full">
                <FaTruck size="25 " color="#565656" />
              </div>
              <p className="text-[#565656]">
                Free Delivery
                <span className="text-[#9DA1A7]">
                  <br />
                  Free Delivery With Subscription
                </span>
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-[#CCD1D6] p-4 rounded-full">
                <FaTruck size="25 " color="#565656" />
              </div>
              <p className="text-[#565656]">
                Free Delivery
                <span className="text-[#9DA1A7]">
                  <br />
                  Free Delivery With Subscription
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListWeb;
