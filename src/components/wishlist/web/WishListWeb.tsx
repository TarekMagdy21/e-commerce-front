import {ProductProps} from "@/shared/Product.interface";
import {
  useGetFavoriteProductsQuery,
  useToggleFavoriteMutation,
} from "@/store/apis/productApi/productApi";
import {Link, useNavigate} from "react-router-dom";
import {FaHeart, FaLock, FaPhone, FaTruck, FaShoppingCart} from "react-icons/fa";
import {useAddToCartMutation} from "@/store/apis/cartApi/cartApi";

const WishListWeb = () => {
  const userId = localStorage.getItem("userId");
  const {data: wishlist, isLoading} = useGetFavoriteProductsQuery({userId});
  const [addToWishlist] = useToggleFavoriteMutation({});
  const [addToCart] = useAddToCartMutation({});
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="text-center my-10">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
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
