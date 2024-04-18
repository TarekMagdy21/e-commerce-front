import {
  useGetFavoriteProductsQuery,
  useGetProductsQuery,
  useToggleFavoriteMutation,
} from "@/store/apis/productApi/productApi";
import { useState, FC, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RiArrowDownSFill } from "react-icons/ri";
import {
  FaUser,
  FaBars,
  FaHeart,
  FaRegUserCircle,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaRegHeart,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import oldWebLogo from "../../../assets/web/web-logo.svg";
// import webLogo from "../../../assets/logo/logo1_prev_ui.png";
import laptop from "../../../assets/web/nav-1.jpg";
import watch from "../../../assets/web/nav-2.jpg";
import printer from "../../../assets/web/nav-8.jpg";
import searchIcon from "../../../assets/mobile/search.svg";
import america from "../../../assets/america.svg";

import { deleteCookie, getCookies } from "cookies-next";
import { Input } from "@/components/ui/input";
import { WEBCATEGORIES } from "@/data/categories";
import { ProductProps } from "@/types/Product.interface";
import yellowDude from "../../../assets/web/yellow_dude.png";
import { motion, useInView } from "framer-motion";
const HomeWeb: FC<{ Products: ProductProps[] }> = ({ Products }) => {
  const userId = localStorage.getItem("userId");
  const [search, setSearch] = useState("");
  const { data: SearchProducts } = useGetProductsQuery(
    { title: search },
    { skip: search === "" }
  );
  const navigate = useNavigate();
  const [categoriesMenu, setCategoriesMenu] = useState(false);
  const categories = [
    "Computers",
    "Mini Gadgets",
    "Tablets",
    "Home TV",
    "Cameras",
    "Gaming",
    "Headphones",
    "Equipments",
  ];
  const ref = useRef(null);
  const ref2 = useRef(null);
  const isInView = useInView(ref);
  const isInView2 = useInView(ref2);
  const imageVariance = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  useEffect(() => {
    if (isInView) {
      setToggleOnce((prevToggleOnce) => ({ ...prevToggleOnce, ref1: true }));
    }
    if (isInView2) {
      setToggleOnce((prevToggleOnce) => ({ ...prevToggleOnce, ref2: true }));
    }
  }, [isInView, isInView2]);
  const [toggleOnce, setToggleOnce] = useState({
    ref1: false,
    ref2: false,
  });
  const [addToWishlist] = useToggleFavoriteMutation({});
  const { data: wishlist } = useGetFavoriteProductsQuery(
    { userId },
    { skip: userId == undefined || userId == null }
  );

  return (
    <div className="max-md:hidden ">
      {/* Top Nav */}
      <nav className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
        <div className="relative flex items-center justify-between gap-1 pt-4">
          <div className="flex items-center">
            <img
              src={oldWebLogo}
              alt="Logo"
              className="cursor-pointer "
              onClick={() => {
                navigate("/");
              }}
            />

            {/* <img
              src={oldWebLogo}
              width={100}
              alt="Logo"
              className="absolute text-blue-500 cursor-pointer -left-7 mix-blend-darken "
              onClick={() => {
                navigate("/");
              }}
            /> */}
            <p
              className="text-[#4A92FD] text-2xl mb-2 ml-1 font-bold cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Brand
            </p>
            <button
              onClick={() => {
                setCategoriesMenu((cat) => !cat);
              }}
              className="ml-10 flex items-center px-4 gap-2 bg-[#0d6efd] text-white py-[0.41rem] rounded-lg hover:bg-[#437ed6] transition ease-in-out duration-200"
            >
              <FaBars /> <span>Categories</span> <RiArrowDownSFill />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2 px-3 py-1 text-gray-500 border rounded hover:text-blue-600 hover:bg-gray-50">
              {getCookies().token ? (
                <>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
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
                  className="flex items-center gap-2 px-3 py-1 text-gray-500 border rounded hover:text-blue-600 hover:bg-gray-50"
                >
                  <FaHeart />
                  Wishlist
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 px-3 py-1 text-gray-500 border rounded hover:text-blue-600 hover:bg-gray-50"
                >
                  <FaCartShopping />
                  My cart
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1 text-gray-500 border rounded hover:text-blue-600 hover:bg-gray-50"
                >
                  <FaRegUserCircle />
                  Profile
                </Link>
              </>
            )}
          </div>
          {categoriesMenu && (
            <div className="grid grid-cols-2 w-[20rem] border gap-3 absolute top-[3.7rem] left-[9.7rem] z-10 bg-white p-5 rounded ">
              {categories.map((i, index) => (
                <Link
                  to={`/products/${i.replace(/\s/g, "")}`}
                  key={index}
                  className="p-1 rounded cursor-pointer hover:bg-blue-200 h-fit"
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
        <div className="relative px-5">
          <img
            src={searchIcon}
            alt="search"
            className="absolute h-10 ml-2 bg-white border border-l-2 rounded-r-sm w-7 right-5"
          />
          <Input
            placeholder="Search"
            name="search"
            value={search || ""}
            onChange={(e: any) => {
              setSearch(e.target.value);
            }}
            type="search"
            className="bg-gray-50 px-8  text-[1rem]"
          />
          <div
            className={`w-[97.5%] h-fit max-h-36 overflow-y-auto absolute z-10 bg-white  border ${
              search?.length == 0 && "hidden"
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
                  className="mt-1 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <img
                      src={product.images[0]}
                      alt="Laptop"
                      className="w-16 h-16 mx-5 mt-3 hover:bg-gray-100"
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
                  <hr className="mt-4 " />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <hr className="mt-4" />
      {/* MenuItems
      <div className="flex gap-4 my-[0.8rem] max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <p>menuItem1</p>
        <p>menuItem2</p>
        <p>menuItem3</p>
        <p>menuItem4</p>
      </div> */}
      {/* Main Image With Text In It */}
      <div className="relative ">
        <div className="   bg-[#00A1F1]   bg-cover  bg-center  ">
          <div className="relative flex flex-col justify-center h-full max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl py-36">
            <img
              src={yellowDude}
              alt=""
              className="absolute -right-48 "
              width={763}
            />
            <p className="text-5xl font-medium leading-snug text-white">
              Best products &<br /> brands in our store
            </p>
            <p className="my-2 font-semibold text-white text-md">
              Trendy Products, Factory Prices, Excellent Service
            </p>
            <div className="flex gap-1 mt-2">
              <Link
                to={"/products"}
                className="  text-white bg-[#ff8800] hover:bg-[#CF6900] px-5 py-2 rounded-lg text-base transition duration-300 ease-in-out"
              >
                Purchase now
              </Link>
              <Link
                to={"/products"}
                className="px-5 py-2 text-base transition duration-200 ease-in-out bg-white rounded-lg hover:text-blue-500"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Images with titles below the main image */}
      <div className="bg-gray-50">
        <div className="grid max-w-3xl grid-cols-4 gap-10 p-6 mx-auto lg:grid-cols-6 xl:grid-cols-8 place-items-center lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          {WEBCATEGORIES.map((item) => (
            <Link
              to={`/products/${item.name.replace(/\s/g, "")}`}
              key={item.id}
              className="flex flex-col items-center justify-center hover:underline hover:opacity-80 "
            >
              <img
                src={item.img}
                alt=""
                className="border rounded-full hover:border-blue-500"
              />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      {/* Recommended Items */}
      <div className="max-w-3xl px-5 mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
        <p className="py-4 text-3xl font-semibold">Recommended items</p>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {Products.map((item: ProductProps, index: number) => (
            <motion.div
              viewport={{ once: true }}
              ref={ref}
              initial="hidden"
              variants={imageVariance}
              animate={toggleOnce.ref1 ? "visible" : "hidden"}
              transition={{ duration: 0.2, delay: index * 0.2 }} // Adjust delay as needed
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
                <div key={item._id}>
                  <div>
                    <div
                      className="relative flex flex-column"
                      onClick={() => {
                        navigate(`/product/${item.category}/${item._id}`, {
                          state: { item: item },
                        });
                      }}
                    >
                      <img
                        className="object-fill w-full h-48 "
                        src={item.images[1]}
                        loading="lazy"
                        alt={""}
                      />
                    </div>
                    <div className="flex flex-col p-6 border-t">
                      <div
                        className="hover:text-[#0D6EFD] cursor-pointer truncate  "
                        onClick={() => {
                          navigate(`/product/${item.category}/${item._id}`, {
                            state: { item },
                          });
                        }}
                      >
                        {item.title}
                      </div>
                      <div className="flex items-center justify-between mt-2 font-semibold">
                        <p>${item.price}</p>
                        <p
                          onClick={() => {
                            addToWishlist({
                              userId: userId,
                              productId: item._id,
                            });
                          }}
                          className={`
                        ${userId ? "" : "hidden"}
                        w-fit p-2  border  rounded text-blue-600 border-blue-600
                          hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out  
                          `}
                        >
                          {wishlist?.wishlist.filter(
                            (i: any) => i._id == item._id
                          ).length > 0 ? (
                            <FaHeart />
                          ) : (
                            <FaRegHeart />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Banner in the middle of the screen */}
      <div className="relative max-w-3xl px-5 mx-auto mt-16 mb-10 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div className="bg-center bg-cover bg-techWide rounded-xl">
          <div className="flex flex-col justify-center h-full max-w-2xl py-10 mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
            <div className="ml-10">
              <p className="text-3xl font-semibold">
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
      <div className="max-w-3xl px-5 mx-auto mb-10 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
        <p className="py-4 text-3xl font-semibold">Continue browsing</p>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5 ">
          {Products.map((item: ProductProps, index: number) => (
            <motion.div
              ref={ref2}
              initial="hidden"
              variants={imageVariance}
              animate={toggleOnce.ref2 ? "visible" : "hidden"}
              transition={{ duration: 0.2, delay: index * 0.2 }} // Adjust delay as needed
              key={item._id}
            >
              <div
                key={item._id}
                className={`flex flex-col rounded overflow-hidden shadow-lg hover:shadow-xl hover:scale-110 transition duration-500 ${
                  index > 4 ? "hidden" : ""
                }`}
              >
                <div>
                  <div
                    className="relative flex flex-column"
                    onClick={() => {
                      navigate(`/product/${item.category}/${item._id}`, {
                        state: { item: item },
                      });
                    }}
                  >
                    <img
                      className="object-fill w-full h-48 "
                      src={item.images[1]}
                      loading="lazy"
                      alt={""}
                    />
                  </div>
                  <div className="flex flex-col p-6 border-t">
                    <div
                      className="hover:text-[#0D6EFD] cursor-pointer truncate  "
                      onClick={() => {
                        navigate(`/product/${item.category}/${item._id}`, {
                          state: { item },
                        });
                      }}
                    >
                      {item.title}
                    </div>
                    <div className="flex items-center justify-between mt-2 font-semibold">
                      <p>${item.price}</p>
                      <p
                        onClick={() => {
                          addToWishlist({
                            userId: userId,
                            productId: item._id,
                          });
                        }}
                        className={`
                        ${userId ? "" : "hidden"}
                        w-fit p-2  border  rounded text-blue-600 border-blue-600
                          hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out  
                          `}
                      >
                        {wishlist?.wishlist.filter(
                          (i: any) => i._id == item._id
                        ).length > 0 ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* 
        <div className="overflow-hidden rounded shadow-lg">
          <div className="flex flex-column">
            <img className="object-cover w-full h-48" src={img} loading="lazy" alt={""} />
            <div className="flex-1 p-6">
              <div className="">{name}</div>
            </div>
          </div>
        </div> 
        */}
      {/* Popular categories */}
      <div className="bg-gray-100">
        <div className="max-w-3xl p-5 mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
          <p className="py-4 text-3xl font-semibold">Popular categories</p>
          <div className="flex justify-between p-4 bg-white rounded-md">
            <div className="flex flex-col gap-1">
              <p className="font-semibold cursor-pointer hover:underline">
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
          <div className="flex justify-between p-4 my-10 bg-white rounded-md">
            <div className="flex flex-col gap-1">
              <p className="font-semibold cursor-pointer hover:underline">
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
          <div className="flex justify-between p-4 my-10 bg-white rounded-md">
            <div className="flex flex-col gap-1">
              <p className="font-semibold cursor-pointer hover:underline">
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
        <div className="max-w-3xl px-5 pt-10 mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
          <div className="flex flex-col items-start gap-4">
            <div className="flex">
              {" "}
              <img src={oldWebLogo} alt="Logo" />
              <p className="text-[#4A92FD] text-2xl mb-2 ml-1 font-bold">
                Matgary
              </p>
            </div>
            <p className="opacity-50">
              You might remember the Lenovo computer commercials in which a
              youth reports this exciting news to his friends.
            </p>
            <div className="flex gap-2 ">
              <Link
                to={"/"}
                className="p-2 text-gray-500 bg-white border rounded-lg cursor-pointer hover:text-blue-500"
              >
                <FaFacebookF />
              </Link>
              <Link
                to={"/"}
                className="p-2 text-gray-500 bg-white border rounded-lg cursor-pointer hover:text-blue-500"
              >
                <FaInstagram />
              </Link>
              <Link
                to={"/"}
                className="p-2 text-gray-500 bg-white border rounded-lg cursor-pointer hover:text-blue-500"
              >
                <FaYoutube />
              </Link>
              <Link
                to={"/"}
                className="p-2 text-gray-500 bg-white border rounded-lg cursor-pointer hover:text-blue-500"
              >
                <FaTwitter />
              </Link>
            </div>
            <div className="grid w-full grid-cols-3 justify-items-stretch">
              <div className="flex flex-col gap-1">
                <p className="font-semibold cursor-pointer hover:underline">
                  Store
                </p>
                <p className="blue-underline">About us</p>
                <p className="blue-underline">Find store</p>
                <p className="blue-underline">Categories</p>
                <p className="blue-underline">Blogs</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold cursor-pointer hover:underline">
                  Information
                </p>
                <p className="blue-underline">Help center</p>
                <p className="blue-underline">Money refund</p>
                <p className="blue-underline">Shipping info</p>
                <p className="blue-underline">Refunds</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold cursor-pointer hover:underline ">
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
          <div className="flex justify-between py-4 ">
            <p className="opacity-50">© 2020- 2023 HereGoesTheCredit.</p>
            <div className="flex items-center gap-3 pl-10">
              <img src={america} alt="" />
              English <RiArrowDownSFill className="rotate-180" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeWeb;
