// Images
import logoSymbol from "../../../assets/mobile/logo-symbol.svg";
import brand from "../../../assets/mobile/Brand.svg";
// import search from "../../assets/mobile/search.svg";
import facebook from "../../../assets/facebook3.svg";
import instagram from "../../../assets/instagram3.svg";
import linkedin from "../../../assets/linkedin3.svg";
import youtube from "../../../assets/youtube3.svg";
import twitter from "../../../assets/twitter3.svg";
import america from "../../../assets/america.svg";
import {Link, useNavigate} from "react-router-dom";
// import {Button} from "../ui/button";
// import {Input} from "../ui/input";
// import {CATEGORIES} from "../../data/categories";
// Images
import shoppingCart from "../../../assets/mobile/shopping_cart.svg";
import person from "../../../assets/mobile/person.svg";
import arrowBack from "../../../assets/mobile/arrow_back.svg";
import {
  useAddToCartMutation, 
} from "@/store/apis/cartApi/cartApi";
import {
  useGetFavoriteProductsQuery,
  useToggleFavoriteMutation,
} from "@/store/apis/productApi/productApi";
import {FaRegHeart} from "react-icons/fa";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const WishListMobile = () => {
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
    <div className="font-inter  ">
      <nav className="flex justify-between px-5 pt-5 pb-3 border-b-2">
        <div className="flex items-center gap-4">
          <img
            src={arrowBack}
            alt="menu"
            className="max-w-full"
            onClick={() => {
              navigate("/products");
            }}
          />
          <h1 className="text-zinc-900 text-lg font-semibold">Wish List</h1>
        </div>

        <div className="flex gap-5">
          <img
            src={shoppingCart}
            alt="cart"
            className="max-w-full"
            onClick={() => {
              navigate("/cart");
            }}
          />

          <img
            src={person}
            alt="profile"
            onClick={() => {
              navigate("/profile");
            }}
          />

          <FaRegHeart
            size="22"
            className="mt-1"
            onClick={() => {
              navigate("/wishlist");
            }}
          />
        </div>
      </nav>

      {wishlist?.wishlist.length > 0 ? (
        <div className="  ">
          <h1 className="text-zinc-900 text-lg font-semibold bg-gray-100 p-4">Saved for later</h1>

          {wishlist?.wishlist.map((item: any) => (
            <div
              className="flex flex-col border-x-8 border-b-[16px] border-gray-100 "
              key={item._id}>
              <div className="flex flex-col items-start gap-2 px-2 border rounded-lg border-gray-300 ">
                <div className="flex items-center gap-2 ">
                  <div className="px-4 pt-4 flex gap-4">
                    <img src={item.images[0]} alt="1" className="rounded w-20 h-20" />
                    <div>
                      <p className="text-[#505050]">{item.title}</p>
                      <p className="font-semibold mt-1">${item.price}</p>
                      <div className=" flex gap-4 mt-1">
                        <button
                          onClick={() => {
                            addToWishlist({userId: userId, productId: item._id});
                            addToCart({
                              userId,
                              items: [{product: item._id, quantity: 1}],
                            });
                          }}
                          className="text-[#0d6efd] border-2 px-2 whitespace-nowrap rounded-lg font-medium text-[0.9rem]">
                          Move to cart
                        </button>
                        <button
                          onClick={() => {
                            addToWishlist({userId: userId, productId: item._id});
                          }}
                          className="text-[#FA3434] border-2 px-2 whitespace-nowrap rounded-lg font-medium text-[0.9rem]">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="w-[96%] ml-1 " />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="bg-gray-50 p-5">
            <h1 className="p-5 font-bold">There are no saved items</h1>
            <div className="flex flex-col gap-2 py-4 px-5">
              <Link to={"/"} className="w-fit   text-blue-500 hover:underline">
                Home Page{" "}
              </Link>
              <Link to={"/products"} className=" w-fit  text-blue-500 hover:underline ">
                Products Page{" "}
              </Link>
            </div>
          </div>
        </>
      )}

      <footer className="">
        <p className="flex p-5 items-center gap-1">
          <img src={logoSymbol} alt="logo" className="max-w-full" />
          <img src={brand} alt="logo" className="max-w-full" />
        </p>
        <p className="text-neutral-600 text-base font-normal px-5 ">
          Best information about the company gies here but now lorem ipsum is
        </p>
        <div className="flex px-5 py-2 gap-2">
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={youtube} alt="" />
          <img src={instagram} alt="" />
          <img src={linkedin} alt="" />
        </div>
        <div className="flex  p-5 w-[90%] text-gray-400 text-base font-normal   leading-normal">
          <ol className="m-auto">
            <li className="pb-2 text-zinc-900 text-base font-medium   leading-snug">About</li>
            <li>About Us</li>
            <li>Find store</li>
            <li>Categories</li>
            <li>Blogs</li>
          </ol>
          <ol className="m-auto">
            <li className="pb-2 text-zinc-900 text-base font-medium   leading-snug">Partnership</li>
            <li>About Us</li>
            <li>Find store</li>
            <li>Categories</li>
            <li>Blogs</li>
          </ol>
        </div>
        <div className="flex  p-5 w-[85%] text-gray-400 text-base font-normal   leading-normal">
          <ol className="m-auto">
            <li className="pb-2 text-zinc-900 text-base font-medium   leading-snug">Information</li>
            <li>Help Center</li>
            <li>Money Refund</li>
            <li>Shipping</li>
            <li>Contact us</li>
          </ol>
          <ol className="m-auto">
            <li className="pb-2 text-zinc-900 text-base font-medium   leading-snug">For users</li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/orders">My Orders</Link>
            </li>
          </ol>
        </div>
        <p className="flex bg-gray-100 justify-evenly items-center gap-4 py-5">
          © 2023 Ecommerce.
          <span className="flex gap-3">
            <img src={america} alt="" />
            English
          </span>
        </p>
      </footer>
    </div>
  );
};

export default WishListMobile;
