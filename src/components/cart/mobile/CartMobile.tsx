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
import {FaMinus, FaPlus} from "react-icons/fa6";
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
import {FaRegHeart} from "react-icons/fa";
import {loadStripe} from "@stripe/stripe-js";
import {NEW_BASE_URL} from "@/config/dataService";
const CartMobile = () => {
  const userId = localStorage.getItem("userId");
  const {data: CartProducts, isLoading} = useGetCartItemsQuery({userId});
  const {data: wishlist} = useGetFavoriteProductsQuery({userId});
  const [addToWishlist] = useToggleFavoriteMutation({});
  const [removeFromCart] = useRemoveFromCartMutation({});
  const [addToCart] = useAddToCartMutation({});
  const [reduceQuantity] = useReduceQuantityMutation({});

  const navigate = useNavigate();
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OTXBAAJkYjdYQ2NgoMONM0ohugxJnXzXVLcKsQ05tAZjKdiyicYtjbbBH68q4qirLYCpwRFGyXcsaPsAJHEK0h500HSpDroc1",
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
    <div className="font-inter  ">
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
          <h1 className="text-zinc-900 text-lg font-semibold">Shopping cart</h1>
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
      {CartProducts?.items.length == 0 ? (
        <h1 className="text-center mt-5">
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
                  <div className="bg-gray-100 w-fit p-2 border rounded">
                    <img src={item.product.images[0]} alt="1" className="w-40 h-20" />
                  </div>
                  <div>
                    <p className="">{item.product.title}</p>
                    <p className="text-gray-400 text-[0.8rem]">
                      {item.product.size && `Size: ${item.product.size},`}
                      {item.product.color && `Color: ${item.product.color},`}
                      {item.product.material && `Material: ${item.product.material}`}
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
                      }}>
                      <FaMinus />
                    </div>
                    <p className="border-x-2 py-2 px-6 text-zinc-900 text-base font-bold">
                      {item.quantity}
                    </p>
                    <div
                      className="px-2"
                      onClick={() => {
                        addToCart({
                          userId,
                          items: [{product: item.product._id, quantity: 1}],
                        });
                      }}>
                      <FaPlus />
                    </div>
                  </div>
                  <p className="text-zinc-900 text-base font-bold leading-snug">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="p-5 border-b-2">
            <p className="flex text-gray-400 text-base">
              Items ({CartProducts?.items.length}):
              <span className="ml-auto text-zinc-900 text-base font-medium">
                ${CartProducts?.totalPriceBeforeDiscount.toFixed(2)}
              </span>
            </p>
            <p className="flex mt-2 text-gray-400 text-base">
              Discount:
              <span className="ml-auto text-[#FA3434]  text-base font-medium">
                -$
                {CartProducts?.totalPriceBeforeDiscount.toFixed(2) -
                  CartProducts?.totalPriceAfterDiscount.toFixed(2)}
              </span>
            </p>
            <p className="flex mt-2 text-gray-400 text-base">
              Shipping:
              <span className="ml-auto text-[#00B517] text-base font-medium">
                ${CartProducts.items.length > 0 ? 10.0 : 0}
              </span>
            </p>
            <p className="flex mt-2 text-gray-400 text-base">
              Tax:
              <span className="ml-auto text-[#00B517] text-base font-medium">
                {" "}
                ${CartProducts.items.length > 0 ? 7.0 : 0}
              </span>
            </p>
            <p className="flex mt-2 text-zinc-900 text-lg font-semibold ">
              Total:
              <span className="ml-auto ">
                $
                {CartProducts.items.length > 0
                  ? (CartProducts?.totalPriceAfterDiscount + 10 + 7).toFixed(2)
                  : 0}
              </span>
            </p>
            <div
              className={`text-center ${
                CartProducts.items.length == 0 ? "bg-gray-400" : "bg-[#00B517]"
              }  flex justify-center py-2 mt-2 rounded w-full`}>
              <button
                onClick={makePayment}
                className="text-white disabled:bg-gray-400"
                disabled={CartProducts.items.length == 0}>
                Checkout ({CartProducts?.items.length} items)
              </button>
            </div>
          </div>
        </>
      )}

      {wishlist?.wishlist.length > 0 && (
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

export default CartMobile;
