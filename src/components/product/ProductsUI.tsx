import {Link, Outlet, useNavigate} from "react-router-dom";
// import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {CATEGORIES} from "../../data/categories";
// Images
import logoSymbol from "../../assets/mobile/logo-symbol.svg";
import brand from "../../assets/mobile/Brand.svg";
import shoppingCart from "../../assets/mobile/shopping_cart.svg";
import person from "../../assets/mobile/person.svg";
import search from "../../assets/mobile/search.svg";
import arrowBack from "../../assets/mobile/arrow_back.svg";
import facebook from "../../assets/facebook3.svg";
import instagram from "../../assets/instagram3.svg";
import linkedin from "../../assets/linkedin3.svg";
import youtube from "../../assets/youtube3.svg";
import twitter from "../../assets/twitter3.svg";
import america from "../../assets/america.svg";
//  for web
import webLogo from "../../assets/web/web-logo.svg";
import {RiArrowDownSFill} from "react-icons/ri";
import {FaUser, FaBars, FaHeart, FaFacebookF, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import {HOMEPRODUCTS} from "@/data/products";
import laptop from "../../assets/web/nav-1.jpg";
import watch from "../../assets/web/nav-2.jpg";
import printer from "../../assets/web/nav-8.jpg";
import {useState} from "react";
import {Breadcrumbs, Button, Stack, Typography} from "@mui/material";

const ProductsUI = () => {
  const navigate = useNavigate();
  const [categoriesMenu, setCategoriesMenu] = useState(false);
  const categories = [
    "Laptops",
    "Cameras",
    "Gadgets",
    "Accessories",
    "Smartphones",
    "Smartwatches",
    "Headsets",
    "Gamings",
    "Apple",
    "Lacetti",
    "Toyota",
    "Hyundai",
    "Mercedes",
    "Chevrolet",
    "Lacetti",
    "Hyundai",
    "Office tech",
    "Home equipments",
  ];
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden font-inter   ">
        <nav className="flex justify-between px-5 pt-5 pb-3">
          <div className="flex gap-4">
            <img src={arrowBack} alt="menu" className="max-w-full" />
            <h1 className="text-zinc-900 text-lg font-semibold">Mobile accessories</h1>
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
        {/* Search */}
        <form className="">
          <div className="px-5 relative">
            <img src={search} alt="search" className="absolute left-7 top-2.5" />
            <Input
              placeholder="Search"
              name="search"
              type="search"
              className="bg-gray-50 px-8  text-[1rem]"
            />
          </div>
        </form>
        {/* Scroll categories */}
        <div className="pl-5 mb-5 pt-3 overflow-x-auto whitespace-nowrap scrollbar-none">
          {CATEGORIES.map((item) => (
            <Button
              key={item?.id} // Added key prop for React list items
              id={item?.id}
              size="sm"
              className="bg-gray-200 mr-2 text-[#0D6EFD] overflow-x-scroll"
               >
              <Link to={`/products/${item?.url}`}>{item?.name}</Link>
            </Button>
          ))}
        </div>

        <Outlet />
        {/* Footer */}
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
              <li className="pb-2 text-zinc-900 text-base font-medium   leading-snug">
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
              <li className="pb-2 text-zinc-900 text-base font-medium   leading-snug">
                Information
              </li>
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
      {/* Web */}
      <div className=" max-md:hidden ">
        <nav className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
          <div className="flex items-center justify-between gap-1 pt-4 relative">
            <div className="flex items-center">
              <img src={webLogo} alt="Logo" />
              <p className="text-[#4A92FD] text-2xl mb-2 ml-1 font-bold">Brand</p>
              <button
                onClick={() => {
                  setCategoriesMenu((cat) => !cat);
                }}
                className="ml-10 flex items-center px-4 gap-2 bg-[#0d6efd] text-white py-[0.41rem] rounded-lg hover:bg-[#437ed6] transition ease-in-out duration-200">
                <FaBars /> <span>Categories</span> <RiArrowDownSFill />
              </button>
            </div>
            <div className="flex gap-1 items-center">
              <button className="border rounded px-3 py-1 flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50">
                <FaUser />
                Sign in
              </button>
              <button className="border rounded px-3 py-1 flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50">
                <FaHeart />
                Wishlist
              </button>
              <button className="border rounded px-3 py-1 flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50">
                <FaCartShopping />
                My cart
              </button>
            </div>
            {categoriesMenu && (
              <div className="grid grid-cols-2 lg:grid-cols-3 lg:w-[30rem]  w-[20rem] border gap-3 absolute top-[3.7rem] left-[9.7rem] z-10 bg-white p-5 rounded ">
                {categories.map((i, index) => (
                  <div
                    key={index}
                    className="hover:bg-blue-200 rounded p-1 cursor-pointer h-fit"
                    onClick={() => {
                      console.log(i);
                    }}>
                    {i}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
        {/* Search */}
        <form className="max-w-[45rem] m-auto mt-4 lg:max-w-[60rem] xl:max-w-[68rem] 2xl:max-w-[82.5rem]">
          <div className="px-5  relative">
            <img
              src={search}
              alt="search"
              className="absolute w-7 ml-2 right-5 border-l-2 h-10 bg-white border rounded-r-sm"
            />
            <Input
              placeholder="Search"
              name="search"
              type="search"
              className="bg-gray-50 px-4  text-[1rem]"
            />
          </div>
        </form>
        <hr className="mt-4" />
        {/* MenuItems */}
        <div className="flex gap-4 my-[0.8rem] max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          <p>menuItem1</p>
          <p>menuItem2</p>
          <p>menuItem3</p>
          <p>menuItem4</p>
        </div>
        <hr className="mt-4" />
        <Outlet />
        {/* Popular categories */}
        <div className="bg-gray-100">
          <div className="max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl  p-5   ">
            <p className="text-3xl py-4 font-semibold">Popular categories</p>
            <div className="flex justify-between bg-white rounded-md p-4">
              <div className="flex flex-col gap-1">
                <p className="font-semibold hover:underline cursor-pointer">Notebooks</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Asus laptops
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Macbooks
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Gaming laptops
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Lenovo
                </p>
              </div>
              <img src={laptop} alt="" />
            </div>
            <div className="flex justify-between bg-white rounded-md p-4 my-10">
              <div className="flex flex-col gap-1">
                <p className="font-semibold hover:underline cursor-pointer">Accessories</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Smartwatches
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Keyboards
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Cables HDML, USB{" "}
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Others
                </p>
              </div>
              <img src={watch} alt="" />
            </div>
            <div className="flex justify-between bg-white rounded-md p-4 my-10">
              <div className="flex flex-col gap-1">
                <p className="font-semibold hover:underline cursor-pointer">Office tech</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Printers
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Lighting
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  {" "}
                  TV boxes{" "}
                </p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer text-[#565656]">
                  Lorem ipsum
                </p>
              </div>
              <img src={printer} alt="" />
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-[#e9ecef]">
          <div className="max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl px-5  pt-10 ">
            <div className="flex flex-col items-start gap-4">
              <div className="flex">
                {" "}
                <img src={webLogo} alt="Logo" />
                <p className="text-[#4A92FD] text-2xl mb-2 ml-1 font-bold">Brand</p>
              </div>
              <p className="opacity-50">
                You might remember the Lenovo computer commercials in which a youth reports this
                exciting news to his friends.
              </p>
              <div className="flex gap-2 ">
                <Link
                  to={"/"}
                  className="bg-white border p-2 rounded-lg text-gray-500 hover:text-blue-500 cursor-pointer">
                  <FaFacebookF />
                </Link>
                <Link
                  to={"/"}
                  className="bg-white border p-2 rounded-lg text-gray-500 hover:text-blue-500 cursor-pointer">
                  <FaInstagram />
                </Link>
                <Link
                  to={"/"}
                  className="bg-white border p-2 rounded-lg text-gray-500 hover:text-blue-500 cursor-pointer">
                  <FaYoutube />
                </Link>
                <Link
                  to={"/"}
                  className="bg-white border p-2 rounded-lg text-gray-500 hover:text-blue-500 cursor-pointer">
                  <FaTwitter />
                </Link>
              </div>
              <div className="grid grid-cols-3 justify-items-stretch w-full">
                <div className="flex flex-col gap-1">
                  <p className=" font-semibold hover:underline cursor-pointer">Store</p>
                  <p className="blue-underline">About us</p>
                  <p className="blue-underline">Find store</p>
                  <p className="blue-underline">Categories</p>
                  <p className="blue-underline">Blogs</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-semibold hover:underline cursor-pointer">Information</p>
                  <p className="blue-underline">Help center</p>
                  <p className="blue-underline">Money refund</p>
                  <p className="blue-underline">Shipping info</p>
                  <p className="blue-underline">Refunds</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold hover:underline cursor-pointer ">Support</p>
                  <p className="blue-underline">Help center</p>
                  <p className="blue-underline">Documents</p>
                  <p className="blue-underline">Account restore</p>
                  <p className="blue-underline">My Orders</p>
                </div>
              </div>
              <hr className="w-full h-[0.125rem]    bg-[#cac9c9]" />
            </div>
            <div className="flex justify-between  py-4 ">
              <p className="opacity-50">© 2020- 2023 HereGoesTheCredit.</p>
              <div className="flex  gap-3 items-center pl-10">
                <img src={america} alt="" />
                English <RiArrowDownSFill className="rotate-180" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProductsUI;
