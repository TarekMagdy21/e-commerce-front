import { Link, useNavigate } from "react-router-dom";
import webLogo from "../../../assets/web/web-logo.svg";
import { FC, useState } from "react";
import {
  FaBars,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaRegUserCircle,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { RiArrowDownSFill } from "react-icons/ri";
import { deleteCookie, getCookies } from "cookies-next";
import { FaCartShopping } from "react-icons/fa6";
import { WEBCATEGORIES, categories } from "@/data/categories";
import searchIcon from "../../../assets/mobile/search.svg";
import { Input } from "@/components/ui/input";
import { useGetProductsQuery } from "@/store/apis/productApi/productApi";
import { ProductProps } from "@/shared/Product.interface";

import laptop from "../../../assets/web/nav-1.jpg";
import watch from "../../../assets/web/nav-2.jpg";
import printer from "../../../assets/web/nav-8.jpg";
import america from "../../../assets/america.svg";
import { MdLanguage } from "react-icons/md";
import backgroundMan from "../../../assets/general/yellow-man.png";
const HomeWeb: FC<{ Products: ProductProps[] }> = ({ Products }) => {
  const navigate = useNavigate();
  const [categoriesMenu, setCategoriesMenu] = useState(false);
  const [search, setSearch] = useState("");
  const { data: SearchProducts } = useGetProductsQuery({ title: search });
  return (
    <>
      {/* Web */}
      <div className="max-md:hidden ">
        {/* Top Nav */}
        <nav className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
          <div className="flex items-center justify-between gap-1 pt-4 relative">
            <div className="flex items-center">
              <img
                src={webLogo}
                alt="Logo"
                className="cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              />
              <p
                className="text-[#4A92FD] text-2xl mb-2 ml-1 font-bold cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                {t("nav.brand")}
              </p>
              <button
                onClick={() => {
                  setCategoriesMenu((cat: unknown) => !cat);
                }}
                className="ml-10 flex items-center px-4 gap-2 bg-[#0d6efd] text-white py-[0.41rem] rounded-lg hover:bg-[#437ed6] transition ease-in-out duration-200"
              >
                <FaBars /> <span>Categories</span> <RiArrowDownSFill />
              </button>
            </div>
            <div className="flex gap-1 items-center">
              <div className="border rounded px-3 py-1 flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50">
                {getCookies().token ? (
                  <>
                    <div
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        location.reload();
                        deleteCookie("token");
                        localStorage.removeItem("userId");
                      }}
                    >
                      <FaUser />
                      Log out
                    </div>
                  </>
                ) : (
                  <Link to={"/login"} className="flex items-center gap-2">
                    <FaUser />
                    Sign in
                  </Link>
                )}
              </div>
              {getCookies().token && (
                <>
                  <Link
                    to="/wishlist"
                    className="border rounded px-3 py-1 flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                  >
                    <FaHeart />
                    Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    className="border rounded px-3 py-1 flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                  >
                    <FaCartShopping />
                    My cart
                  </Link>
                  <Link
                    to="/profile"
                    className="border rounded px-3 py-1 flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                  >
                    <FaRegUserCircle />
                    Profile
                  </Link>
                  <div className="cursor-pointer border rounded px-3 py-1 flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50">
                    <MdLanguage />
                    Language
                  </div>
                </>
              )}
            </div>
            {categoriesMenu && (
              <div className="grid grid-cols-2 w-[20rem] border gap-3 absolute top-[3.7rem] left-[9.7rem] z-10 bg-white p-5 rounded ">
                {categories.map((i, index) => (
                  <Link
                    to={`/products/${i.replace(/\s/g, "")}`}
                    key={index}
                    className="hover:bg-blue-200 rounded p-1 cursor-pointer h-fit"
                  >
                    {i}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        {/* Search */}
        <form className="max-w-[45rem] m-auto mt-4 lg:max-w-[60rem] xl:max-w-[68rem] 2xl:max-w-[82.5rem]">
          <div className="px-5  relative">
            <img
              src={searchIcon}
              alt="search"
              className="absolute w-7 ml-2 right-5 border-l-2 h-10 bg-white border rounded-r-sm"
            />
            <Input
              placeholder="Search"
              name="search"
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
              }}
              type="search"
              className="bg-gray-50 px-8  text-[1rem]"
            />
            <div
              className={`w-[97.5%] h-fit max-h-36 overflow-y-auto absolute z-10 bg-white  border ${
                search.length == 0 && "hidden"
              }`}
            >
              <div>
                {SearchProducts?.products.map((product: ProductProps) => (
                  <div
                    onClick={() => {
                      navigate(`/product/${product.category}/${product._id}`, {
                        state: { product },
                      });
                    }}
                    key={product._id}
                    className="mt-1 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt="Laptop"
                        className="w-16 h-16 mt-3 hover:bg-gray-100 mx-5"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.title}
                        </p>
                        <p className="font-semibold text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    <hr className="  mt-4 " />
                  </div>
                ))}
              </div>
            </div>
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
        {/* Main Image With Text In It */}
        <div className=" relative">
          <div className=" bg-[#00A1F1]  relative  bg-cover  bg-center ">
            <img
              src={backgroundMan}
              className="absolute right-28"
              width={762}
              alt=""
            />
            <div className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl flex flex-col h-full py-36 justify-center">
              <p className="text-white text-5xl leading-snug font-medium">
                Best products &<br /> brands in our store
              </p>
              <p className="text-white text-md font-semibold my-2">
                Trendy Products, Factory Prices, Excellent Service
              </p>
              <div className="mt-2 flex gap-1">
                <Link
                  to={"/products"}
                  className="  text-white bg-[#ff8800] hover:bg-[#CF6900] px-5 py-2 rounded-lg text-base transition duration-300 ease-in-out"
                >
                  Purchase now
                </Link>
                <Link
                  to={"/products"}
                  className=" bg-white hover:text-blue-500 px-5 py-2 rounded-lg text-base  transition duration-200 ease-in-out"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Images with titles below the main image */}
        <div className="bg-gray-50">
          <div className=" grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 place-items-center p-6 gap-10  max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
            {WEBCATEGORIES.map((item) => (
              <Link
                to={`/products/${item.name.replace(/\s/g, "")}`}
                key={item.id}
                className="flex items-center justify-center flex-col hover:underline hover:opacity-80"
              >
                <img src={item.img} alt="" className="rounded-full" />
                <p>{item.name}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* Recommended Items */}
        <div className="max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl px-5 ">
          <p className="text-3xl py-4 font-semibold">Recommended items</p>
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {Products.map((item: ProductProps, index: number) => (
              // <div key={item._id} className="flex flex-col justify-between">
              //   {index === 5 ? (
              //     <div className="bg-[#0D6EFD] rounded h-full p-4 text-white">
              //       <p className="text-2xl font-semibold">Huge White Sale savings</p>
              //       <p className="font-light opacity-50 mt-4 w-[80%]">
              //         Get up to 70% off bedding and bath.
              //       </p>
              //     </div>
              //   ) : (
              //     <div
              //       onClick={() => {
              //         navigate(`/product/${item.category}/${item._id}`, {
              //           state: {product: item},
              //         });
              //       }}>
              //       <img
              //         src={item.images[0]}
              //         alt=""
              //         className="bg-gray-100 p-4   cursor-pointer w-48 h-48" // Set a fixed height
              //       />
              //       <div className="flex flex-col items-start">
              //         <p className="font-semibold my-2">${item.price}</p>
              //         <p className="hover:text-[#0D6EFD] cursor-pointer whitespace-nowrap">
              //           {item.title}
              //         </p>
              //       </div>
              //     </div>
              //   )}
              // </div>
              <div
                key={item._id}
                className={`flex flex-col rounded overflow-hidden shadow-lg hover:shadow-xl hover:scale-110 transition duration-500`}
              >
                {index === 5 ? (
                  <div className="bg-[#0D6EFD] rounded h-full p-4 text-white">
                    <p className="text-2xl font-semibold">
                      Huge White Sale savings
                    </p>
                    <p className="font-light opacity-50 mt-4 w-[80%]">
                      Get up to 70% off bedding and bath.
                    </p>
                  </div>
                ) : (
                  <Link
                    to={"/"}
                    // to={`/product/${item.category}/${item._id}`}
                    state={item}
                  >
                    <div className="flex flex-column">
                      <img
                        className="w-full h-48 object-fill  "
                        src={item.images[1]}
                        loading="lazy"
                        alt={""}
                      />
                    </div>
                    <div className="flex flex-col p-6">
                      <div className="hover:text-[#0D6EFD] cursor-pointer  ">
                        {item.title}
                      </div>
                      <div className="font-semibold mt-2">${item.price}</div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Banner in the middle of the screen */}
        <div className=" relative max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl px-5 mt-16 mb-10 ">
          <div className="   bg-techWide  bg-cover bg-center rounded-xl">
            <div className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl flex flex-col h-full py-10 justify-center ">
              <div className="ml-10">
                <p className="font-semibold text-3xl">
                  Live luxuriously <br /> every day
                </p>
                <p className="my-2 text-[#565656]">
                  Indulge in the finer things, from timepieces to handbags.
                </p>
                <button className="  text-white bg-[#ff8800] hover:bg-[#CF6900] px-5 py-2 rounded-lg text-base transition duration-300 ease-in-out">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Continue Browsing */}
        <div className="max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl px-5 mb-10 ">
          <p className="text-3xl py-4 font-semibold">Continue browsing</p>
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5 ">
            {Products.map((item: ProductProps, index: number) => (
              <Link
                key={item._id}
                to={`/product/${item.category}/${item._id}`}
                state={item}
                className={`flex flex-col rounded overflow-hidden shadow-lg hover:shadow-xl hover:scale-110 transition duration-500 ${
                  index > 4 ? "hidden" : ""
                }`}
              >
                <div className="flex flex-column">
                  <img
                    className="w-full h-48 object-fill  "
                    src={item.images[0]}
                    loading="lazy"
                    alt={""}
                  />
                </div>
                <div className="flex flex-col p-6">
                  <div className="hover:text-[#0D6EFD] cursor-pointer  ">
                    {item.title}
                  </div>
                  <div className="font-semibold mt-2">${item.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* 
        <div className="rounded overflow-hidden shadow-lg">
          <div className="flex flex-column">
            <img className="w-full h-48 object-cover" src={img} loading="lazy" alt={""} />
            <div className="flex-1 p-6">
              <div className="">{name}</div>
            </div>
          </div>
        </div> 
        */}
        {/* Popular categories */}
        <div className="bg-gray-100">
          <div className="max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl  p-5   ">
            <p className="text-3xl py-4 font-semibold">Popular categories</p>
            <div className="flex justify-between bg-white rounded-md p-4">
              <div className="flex flex-col gap-1">
                <p className="font-semibold hover:underline cursor-pointer">
                  Notebooks
                </p>
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
                <p className="font-semibold hover:underline cursor-pointer">
                  Accessories
                </p>
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
                <p className="font-semibold hover:underline cursor-pointer">
                  Office tech
                </p>
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
                <p className="text-[#4A92FD] text-2xl mb-2 ml-1 font-bold">
                  Brand
                </p>
              </div>
              <p className="opacity-50">
                You might remember the Lenovo computer commercials in which a
                youth reports this exciting news to his friends.
              </p>
              <div className="flex gap-2 ">
                <Link
                  to={"/"}
                  className="bg-white border p-2 rounded-lg text-gray-500 hover:text-blue-500 cursor-pointer"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to={"/"}
                  className="bg-white border p-2 rounded-lg text-gray-500 hover:text-blue-500 cursor-pointer"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to={"/"}
                  className="bg-white border p-2 rounded-lg text-gray-500 hover:text-blue-500 cursor-pointer"
                >
                  <FaYoutube />
                </Link>
                <Link
                  to={"/"}
                  className="bg-white border p-2 rounded-lg text-gray-500 hover:text-blue-500 cursor-pointer"
                >
                  <FaTwitter />
                </Link>
              </div>
              <div className="grid grid-cols-3 justify-items-stretch w-full">
                <div className="flex flex-col gap-1">
                  <p className=" font-semibold hover:underline cursor-pointer">
                    Store
                  </p>
                  <p className="blue-underline">About us</p>
                  <p className="blue-underline">Find store</p>
                  <p className="blue-underline">Categories</p>
                  <p className="blue-underline">Blogs</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-semibold hover:underline cursor-pointer">
                    Information
                  </p>
                  <p className="blue-underline">Help center</p>
                  <p className="blue-underline">Money refund</p>
                  <p className="blue-underline">Shipping info</p>
                  <p className="blue-underline">Refunds</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold hover:underline cursor-pointer ">
                    Support
                  </p>
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

export default HomeWeb;
