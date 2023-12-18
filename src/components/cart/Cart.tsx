// Images
import logoSymbol from "../../assets/mobile/logo-symbol.svg";
import brand from "../../assets/mobile/Brand.svg";
import search from "../../assets/mobile/search.svg";
import facebook from "../../assets/facebook3.svg";
import instagram from "../../assets/instagram3.svg";
import linkedin from "../../assets/linkedin3.svg";
import youtube from "../../assets/youtube3.svg";
import twitter from "../../assets/twitter3.svg";
import america from "../../assets/america.svg";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {CATEGORIES} from "../../data/categories";
// Images
import shoppingCart from "../../assets/mobile/shopping_cart.svg";
import person from "../../assets/mobile/person.svg";
import arrowBack from "../../assets/mobile/arrow_back.svg";
import {FaMinus, FaPlus} from "react-icons/fa6";
import america1 from "../../assets/profilePic.jpg";
const Cart = () => {
  const manga = [{id: 1}, {id: 2}, {id: 3}];
  const navigate = useNavigate();
  return (
    <div className="font-inter md:hidden">
      <nav className="flex justify-between px-5 pt-5 pb-3 border-b-2">
        <div className="flex gap-4">
          <img src={arrowBack} alt="menu" className="max-w-full" onClick={()=>{navigate('/products')}}/>
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
        </div>
      </nav>
      {manga.map((i) => (
        <div className="p-4 border-b-[1px]" key={i.id}>
          <div className="">
            <div className="flex gap-2">
              <div className="bg-gray-100 w-fit p-2 border rounded">
                <img src={america1} alt="1" width={50} />
              </div>
              <div>
                <p className="">T-shirts with multiple colors for men</p>
                <p className="text-gray-400 text-[0.8rem]">
                  Size: <span>medium</span>, Color: <span>blue</span>, Setler:{" "}
                  <span>Artel Market</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center border rounded">
                <div className="px-2">
                  <FaMinus />
                </div>
                <p className="border-x-2 py-2 px-6 text-zinc-900 text-base font-bold">2</p>
                <div className="px-2">
                  <FaPlus />
                </div>
              </div>
              <p className="text-zinc-900 text-base font-bold leading-snug">$78.99</p>
            </div>
          </div>
        </div>
      ))}
      <div className="p-5 border-b-2">
        <p className="flex text-gray-400 text-base">
          Items ({manga.length}):
          <span className="ml-auto text-zinc-900 text-base font-medium">$32.00</span>
        </p>
        <p className="flex mt-2 text-gray-400 text-base">
          Shipping:<span className="ml-auto text-zinc-900 text-base font-medium">$10.00</span>
        </p>
        <p className="flex mt-2 text-gray-400 text-base">
          Tax:<span className="ml-auto text-zinc-900 text-base font-medium">$7.00</span>
        </p>
        <p className="flex mt-2 text-zinc-900 text-lg font-semibold ">
          Total:<span className="ml-auto ">$220.00</span>
        </p>
        <div className="text-center bg-[#00B517]  flex justify-center py-2 mt-2 rounded w-full">
          <button className="text-white">Checkout ({manga.length} items)</button>
        </div>
      </div>
      <h1 className="text-zinc-900 text-lg font-semibold bg-gray-100 p-4">Saved for later</h1>

      {manga.map((i) => (
        <div className="flex flex-col border-x-8 border-b-8 border-gray-100" key={i.id}>
          <div className="flex flex-col items-start gap-2 px-2 border rounded-lg border-gray-300 ">
            <div className="flex items-center gap-2 ">
              <div className="px-4 pt-4 flex gap-4">
                <img src={america1} alt="1" className="rounded w-20 h-20" />
                <div>
                  <p className="text-[#505050]">Regular Fit Resort Shirt</p>
                  <p className="font-semibold mt-1">$57.70</p>
                  <div className=" flex gap-4 mt-1">
                    <button className="text-[#0d6efd] border-2 px-2 whitespace-nowrap rounded-lg font-medium text-[0.9rem]">
                      Move to cart
                    </button>
                    <button className="text-[#FA3434] border-2 px-2 whitespace-nowrap rounded-lg font-medium text-[0.9rem]">
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

      <footer>
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

export default Cart;
