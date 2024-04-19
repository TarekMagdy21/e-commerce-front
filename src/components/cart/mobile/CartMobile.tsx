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
import { Link, useNavigate } from "react-router-dom";
// import {Button} from "../ui/button";
// import {Input} from "../ui/input";
// import {CATEGORIES} from "../../data/categories";
// Images
import shoppingCart from "../../../assets/mobile/shopping_cart.svg";
import person from "../../../assets/mobile/person.svg";
import arrowBack from "../../../assets/mobile/arrow_back.svg";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  useAddToCartMutation,
  useGetCartItemsQuery,
  useReduceQuantityMutation,
  useRemoveFromCartMutation,
} from "@/store/apis/cartApi/cartApi";
import {
  useGetFavoriteProductsQuery,
  useToggleFavoriteMutation,
} from "@/store/apis/productApi/productApi";
import Swal from "sweetalert2";
import { FaRegHeart } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { NEW_BASE_URL } from "@/config/dataService";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
const CartMobile = () => {
  const userId = localStorage.getItem("userId");
  const { data: CartProducts, isLoading } = useGetCartItemsQuery({ userId });
  const { data: wishlist } = useGetFavoriteProductsQuery({ userId });
  const [addToWishlist] = useToggleFavoriteMutation({});
  const [removeFromCart] = useRemoveFromCartMutation({});
  const [addToCart] = useAddToCartMutation({});
  const [reduceQuantity] = useReduceQuantityMutation({});

  const navigate = useNavigate();
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OTXBAAJkYjdYQ2NgoMONM0ohugxJnXzXVLcKsQ05tAZjKdiyicYtjbbBH68q4qirLYCpwRFGyXcsaPsAJHEK0h500HSpDroc1"
    );
    const body = {
      products: CartProducts?.items,
      // totalPrice: CartProducts?.totalPriceAfterDiscount,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`${NEW_BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();

    stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="font-inter ">
      <nav className="flex justify-between px-5 pt-5 pb-3 border-b-2">
        <div className="flex gap-4">
          <img
            src={arrowBack}
            alt="menu"
            className="max-w-full"
            onClick={() => {
              navigate("/products");
            }}
          />
          <h1 className="text-lg font-semibold text-zinc-900">Shopping cart</h1>
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
      {CartProducts == undefined || CartProducts?.items.length == 0 ? (
        <h1 className="mt-5 text-center">
          Cart is Empty <br />
          <Link to={"/"} className="text-blue-500 hover:underline ">
            {" "}
            Home
          </Link>
        </h1>
      ) : (
        <>
          {CartProducts?.items.map((item: any) => (
            <div className="p-4 border-b-[1px]" key={item._id}>
              <div className="">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 border rounded w-fit">
                    <img
                      src={item.product.images[0]}
                      alt="1"
                      className="w-40 h-20"
                    />
                  </div>
                  <div>
                    <p className="">{item.product.title}</p>
                    <p className="text-gray-400 text-[0.8rem]">
                      {item.product.size && `Size: ${item.product.size},`}
                      {item.product.color && `Color: ${item.product.color},`}
                      {item.product.material &&
                        `Material: ${item.product.material}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded">
                    <div
                      className="px-2"
                      onClick={() => {
                        if (item.quantity !== 1) {
                          reduceQuantity({
                            userId,
                            productId: item.product._id,
                            quantity: 1,
                          });
                        } else {
                          Swal.fire({
                            title: "Do you want to remove this product?",
                            showDenyButton: true,
                            confirmButtonText: "Yes",
                            denyButtonText: `No`,
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                              removeFromCart({
                                userId,
                                productId: item.product._id,
                              });
                              Swal.fire("Saved!", "", "success");
                            }
                          });
                        }
                      }}
                    >
                      <FaMinus />
                    </div>
                    <p className="px-6 py-2 text-base font-bold border-x-2 text-zinc-900">
                      {item.quantity}
                    </p>
                    <div
                      className="px-2"
                      onClick={() => {
                        addToCart({
                          userId,
                          items: [{ product: item.product._id, quantity: 1 }],
                        });
                      }}
                    >
                      <FaPlus />
                    </div>
                  </div>
                  <p className="text-base font-bold leading-snug text-zinc-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="p-5 border-b-2">
            <p className="flex text-base text-gray-400">
              Items ({CartProducts?.items.length}):
              <span className="ml-auto text-base font-medium text-zinc-900">
                ${CartProducts?.totalPriceBeforeDiscount.toFixed(2)}
              </span>
            </p>
            <p className="flex mt-2 text-base text-gray-400">
              Discount:
              <span className="ml-auto text-[#FA3434]  text-base font-medium">
                -$
                {CartProducts?.totalPriceBeforeDiscount.toFixed(2) -
                  CartProducts?.totalPriceAfterDiscount.toFixed(2)}
              </span>
            </p>
            <p className="flex mt-2 text-base text-gray-400">
              Shipping:
              <span className="ml-auto text-[#00B517] text-base font-medium">
                ${CartProducts?.items.length > 0 ? 10.0 : 0}
              </span>
            </p>
            <p className="flex mt-2 text-base text-gray-400">
              Tax:
              <span className="ml-auto text-[#00B517] text-base font-medium">
                {" "}
                ${CartProducts?.items.length > 0 ? 7.0 : 0}
              </span>
            </p>
            <p className="flex mt-2 text-lg font-semibold text-zinc-900 ">
              Total:
              <span className="ml-auto ">
                $
                {CartProducts?.items.length > 0
                  ? (CartProducts?.totalPriceAfterDiscount + 10 + 7).toFixed(2)
                  : 0}
              </span>
            </p>
            <div
              className={`text-center ${
                CartProducts?.items.length == 0 ? "bg-gray-400" : "bg-[#00B517]"
              }  flex justify-center py-2 mt-2 rounded w-full`}
            >
              <button
                onClick={makePayment}
                className="text-white disabled:bg-gray-400"
                disabled={
                  CartProducts == undefined || CartProducts?.items.length == 0
                }
              >
                Checkout ({CartProducts?.items.length} items)
              </button>
            </div>
          </div>
        </>
      )}

      {wishlist?.wishlist.length > 0 && (
        <div className="">
          <h1 className="p-4 text-lg font-semibold bg-gray-100 text-zinc-900">
            Saved for later
          </h1>

          {wishlist?.wishlist.map((item: any) => (
            <div
              className="flex flex-col border-x-8 border-b-[16px] border-gray-100 "
              key={item._id}
            >
              <div className="flex flex-col items-start gap-2 px-2 border border-gray-300 rounded-lg ">
                <div className="flex items-center gap-2 ">
                  <div className="flex gap-4 px-4 pt-4">
                    <img
                      src={item.images[0]}
                      alt="1"
                      className="w-20 h-20 rounded"
                    />
                    <div>
                      <p className="text-[#505050]">{item.title}</p>
                      <p className="mt-1 font-semibold">${item.price}</p>
                      <div className="flex gap-4 mt-1 ">
                        <button
                          onClick={() => {
                            addToWishlist({
                              userId: userId,
                              productId: item._id,
                            });
                            addToCart({
                              userId,
                              items: [{ product: item._id, quantity: 1 }],
                            });
                          }}
                          className="text-[#0d6efd] border-2 px-2 whitespace-nowrap rounded-lg font-medium text-[0.9rem]"
                        >
                          Move to cart
                        </button>
                        <button
                          onClick={() => {
                            addToWishlist({
                              userId: userId,
                              productId: item._id,
                            });
                          }}
                          className="text-[#FA3434] border-2 px-2 whitespace-nowrap rounded-lg font-medium text-[0.9rem]"
                        >
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
      )}

      <footer className="">
        <p className="flex items-center gap-1 p-5">
          <img src={logoSymbol} alt="logo" className="max-w-full" />
          <img src={brand} alt="logo" className="max-w-full" />
        </p>
        <p className="px-5 text-base font-normal text-neutral-600 ">
          Best information about the company gies here but now lorem ipsum is
        </p>
        <div className="flex gap-2 px-5 py-2">
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={youtube} alt="" />
          <img src={instagram} alt="" />
          <img src={linkedin} alt="" />
        </div>
        <div className="flex  p-5 w-[90%] text-gray-400 text-base font-normal   leading-normal">
          <ol className="m-auto">
            <li className="pb-2 text-base font-medium leading-snug text-zinc-900">
              About
            </li>
            <li>About Us</li>
            <li>Find store</li>
            <li>Categories</li>
            <li>Blogs</li>
          </ol>
          <ol className="m-auto">
            <li className="pb-2 text-base font-medium leading-snug text-zinc-900">
              Partnership
            </li>
            <li>About Us</li>
            <li>Find store</li>
            <li>Categories</li>
            <li>Blogs</li>
          </ol>
        </div>
        <div className="flex  p-5 w-[85%] text-gray-400 text-base font-normal   leading-normal">
          <ol className="m-auto">
            <li className="pb-2 text-base font-medium leading-snug text-zinc-900">
              Information
            </li>
            <li>Help Center</li>
            <li>Money Refund</li>
            <li>Shipping</li>
            <li>Contact us</li>
          </ol>
          <ol className="m-auto">
            <li className="pb-2 text-base font-medium leading-snug text-zinc-900">
              For users
            </li>
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
        <p className="flex items-center gap-4 py-5 bg-gray-100 justify-evenly">
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

export default CartMobile;
