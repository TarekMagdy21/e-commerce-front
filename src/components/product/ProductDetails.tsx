import {Link, useNavigate} from "react-router-dom";
// import {Button} from '../ui/button';
// import {Input} from "../ui/input";
// import {CATEGORIES} from "../../data/categories";
// Images
import logoSymbol from "../../assets/mobile/logo-symbol.svg";
import brand from "../../assets/mobile/Brand.svg";
import shoppingCart from "../../assets/mobile/shopping_cart.svg";
import person from "../../assets/mobile/person.svg";
// import search from "../../assets/mobile/search.svg";
import arrowBack from "../../assets/mobile/arrow_back.svg";
import facebook from "../../assets/facebook3.svg";
import instagram from "../../assets/instagram3.svg";
import linkedin from "../../assets/linkedin3.svg";
import youtube from "../../assets/youtube3.svg";
import twitter from "../../assets/twitter3.svg";
import america from "../../assets/america.svg";
import {BsArrowRightShort, BsArrowLeftShort} from "react-icons/bs";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import {Rating} from "@mui/material";
import {RxDotFilled} from "react-icons/rx";
import {TfiCommentAlt} from "react-icons/tfi";
import {MdOutlineShoppingBasket} from "react-icons/md";
import {FaRegHeart, FaHeart} from "react-icons/fa6";
import {GoShieldCheck} from "react-icons/go";
import {GrLanguage} from "react-icons/gr";
import Flag from "react-world-flags";
import profilePic from "../../assets/profilePic.jpg";
import {PRODUCTS} from "../../data/products";
import {FaShoppingBasket} from "react-icons/fa";
import {FaCheck} from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {FiMinus, FiPlus} from "react-icons/fi";

 

const ProductDetails = () => {
  //ابقي غير الكلام ده وهات الداتا عن طريق الاي دي احسن من اللوكيشن لانها بتتمسح لو عمل ريستارت للصفحه
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state?.product;
  const [favorite, setFavorite] = useState(false);
  const initialText = product.description;
  const maxLength = 100;
  const [showMore, setShowMore] = useState(false);
  const toggleText = () => {
    setShowMore(!showMore);
  };

  //WEB---------------------------------
  const [currentImage, setCurrentImage] = useState(product.images[4]);
  const [currentSize, setCurrentSize] = useState("");
  console.log(currentSize)
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden font-inter   ">
        <nav className="flex justify-between px-5 pt-5 pb-3">
          <div className="flex gap-4">
            <img
              src={arrowBack}
              alt="menu"
              className="max-w-full"
              onClick={() => {
                navigate(-1);
              }}
            />
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
        <div>
          <div className="relative">
            <img src={product.thumbnail} alt="thumbnail" />
            <span className=" flex gap-2 bg-gray-200 w-fit p-1 text-white rounded-3xl absolute right-3 bottom-2 bg-opacity-60">
              <BsArrowLeftShort />
              <BsArrowRightShort />
            </span>
          </div>
          <p className="px-1 py-2 flex items-center">
            <Rating name="read-only" value={product.rating} readOnly />{" "}
            <RxDotFilled className="text-gray-300 w-6 h-6" />
            <TfiCommentAlt className="text-gray-500 mr-2 " />
            {Math.floor(Math.random() * 100) + 1} reviews
            <RxDotFilled className="text-gray-300 w-6 h-6" />
            <MdOutlineShoppingBasket className="text-gray-500  mr-2" />
            {Math.floor(Math.random() * 100) + 1} Sold
          </p>
          <p className="px-2 text-zinc-900 text-base font-medium leading-snug">{product.title}</p>
          <p className="p-2 text-base font-semibold text-red-500">
            ${product.price}
            <span className="text-gray-400 text-[0.8rem] font-normal ml-1">(50-100 pcs)</span>
          </p>
          <div className=" flex items-center px-2">
            <div className="w-full h-10 px-4 bg-gradient-to-b from-blue-600 to-blue-600 rounded-md flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="text-center text-white text-base font-medium ">Send inquiry</div>
              </div>
            </div>
            <span
              className="border-2 border-zinc-200 p-[.6rem] ml-2 rounded text-blue-600"
              onClick={() => {
                setFavorite((fav) => !fav);
              }}>
              {favorite ? <FaHeart /> : <FaRegHeart />}
            </span>
          </div>
          <div className="p-2 flex flex-col gap-2">
            <div className="grid grid-cols-3 items-center gap-7 ">
              <p className="text-gray-400 text-base font-normal leading-snug">Condition</p>
              <p className="ml-8 text-neutral-600 col-span-2">Brand new</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-7 ">
              <p className="text-gray-400 text-base font-normal leading-snug">Material</p>
              <p className="ml-8 text-neutral-600 col-span-2">Plastic</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-7 ">
              <p className="text-gray-400 text-base font-normal leading-snug">Condition</p>
              <p className="ml-8 text-neutral-600 col-span-2">Electronics, gadgets</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-7 ">
              <p className="text-gray-400 text-base font-normal leading-snug">Condition</p>
              <p className="ml-8 text-neutral-600 col-span-2">23421</p>
            </div>
          </div>
          <div className="max-w-md     p-2 ">
            <p>
              {showMore ? initialText : initialText.slice(0, maxLength)}
              {initialText.length > maxLength && !showMore && <span id="dots">...</span>}
            </p>

            {initialText.length > maxLength && (
              <button onClick={toggleText} className="mt-3 px-5 py-2 text-blue-600 duration-300  ">
                {showMore ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>
        <div className="h-4 bg-gray-100" />
        <div className="">
          <div className="flex flex-col border-x-8 border-b-8 border-gray-100">
            <div className="flex flex-col items-start gap-2 px-2 border rounded-lg border-gray-300 ">
              <div className="flex items-center gap-2 ">
                <div className="px-4 pt-4">
                  <img src={profilePic} alt="1" className="rounded w-16 h-16" />
                </div>
                <p className="text-neutral-600 text-base font-normal leading-normal">
                  <span>Supplier</span>
                  <br />
                  Guanjoi Trading LLC
                </p>
              </div>
              <hr className="w-[96%] ml-1 " />
              <div className="flex items-center gap-2 px-4 pb-4">
                <Flag code="de" fallback={<span>Unknown</span>} className="w-5" />
                Germany <GoShieldCheck className="w-8" /> Verified <GrLanguage className="w-8" />
                Language
              </div>
            </div>
          </div>
          <h1 className="text-zinc-900 text-lg font-semibold bg-gray-100 px-4 pb-2">
            Similar Products
          </h1>
          <div>
            <div className="bg-gray-100 p-4 ">
              <div className="flex overflow-x-auto  gap-2  scrollbar-none ">
                {PRODUCTS.map((item) => (
                  <div
                    className="flex flex-col flex-shrink-0 w-1/2  gap-2 px-4 pt-4   bg-white border rounded-xl "
                    key={item.id}>
                    <img src={item.thumbnail} alt="1" className="rounded w-32 h-32" />
                    <p className="text-zinc-900 text-base font-bold leading-snug">${item.price}</p>
                    <p className="text-gray-400 text-sm whitespace-normal">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
      <div className="max-md:hidden">
        <div className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mb-4">
          <div className="flex flex-col justify-center my-4">
            <img
              src={currentImage}
              alt="12"
              className="w-full h-full max-w-[800px] max-h-[600px] p-[0.35rem] border rounded-md"
            />{" "}
            <div className="flex gap-4 justify-center items-center my-2">
              {product.images.map((p: any, index: any) => (
                <img
                  key={index}
                  src={p}
                  alt={`p-${p}`}
                  onClick={() => {
                    setCurrentImage(p);
                  }}
                  className={`rounded w-20 h-w-20 border p-1
                  
                  hover:opacity-70
                  hover:border-gray-400
                  ${currentImage === p ? "border-blue-500" : ""}`}
                />
              ))}
            </div>
            <div>
              <p className="text-3xl font-semibold">{product.title}</p>
              <div className="flex items-center gap-3 my-2">
                <Rating value={product.rating} readOnly />
                <p className="  bg-[#565656] bg-opacity-60 rounded-full w-[0.25rem] h-[0.25rem]"></p>
                <FaShoppingBasket className="text-[#9e9e9e]" />
                <span className="text-[#9e9e9e]">123 Order</span>
                <p className="  bg-[#565656] bg-opacity-60 rounded-full w-[0.25rem] h-[0.25rem]"></p>
                <span className="text-[#00a524]">In stock</span>
              </div>
              <div>
                <p className="my-3 text-[#212529] font-semibold text-xl">
                  ${product.price.toFixed(2)}
                </p>
                <p>{product.description}</p>
              </div>
              <div>
                <p className="text-[#9da1a7] grid grid-cols-3 mt-2">
                  Type<span className="text-[#565656]">Regular</span>
                </p>
                <p className="text-[#9da1a7] grid grid-cols-3 mt-2">
                  Color<span className="text-[#565656]">Silver white</span>
                </p>
                <p className="text-[#9da1a7] grid grid-cols-3 mt-2">
                  Material<span className="text-[#565656]">Metallic, waterproof</span>
                </p>
                <p className="text-[#9da1a7] grid grid-cols-3 mt-2">
                  Brand<span className="text-[#565656]">Samsung</span>
                </p>
              </div>
              <hr className="mt-4" />
            </div>
          </div>
          <div className="flex  gap-4">
            <div>
              <label htmlFor="">Size</label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Small" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    onClick={() => {
                      setCurrentSize("small");
                    }}
                    value="small">
                    Small
                  </SelectItem>
                  <SelectItem
                    onClick={() => {
                      setCurrentSize("medium");
                    }}
                    value="medium">
                    Medium
                  </SelectItem>
                  <SelectItem
                    onClick={() => {
                      setCurrentSize("large");
                    }}
                    value="large">
                    Large
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="">Quantity</label>
              <div className="  rounded-lg   flex items-center justify-center    mt-1 ">
                <div className="hover:bg-gray-50 hover:border-[#565656] p-2 border rounded-l-md cursor-pointer  transition duration-300 ease-in-out">
                  <FiMinus />
                </div>
                <div className="hover:border-blue-500 p-1 px-4 border bg-gray-100 transition duration-300 ease-in-out">
                  2
                </div>
                <div className=" cursor-pointer hover:bg-gray-50 hover:border-[#565656] p-2 border  rounded-r-md transition duration-300 ease-in-out">
                  <FiPlus />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 my-4">
            <button className="bg-[#ff8100] hover:bg-[#d96e00] text-white rounded p-2 px-3 transition duration-300 ease-in-out">
              Buy now
            </button>
            <button className="p-2 px-3 bg-[#0d6efd]  hover:bg-[#0b5ed7] text-white rounded flex items-center gap-2">
              {" "}
              <FaShoppingBasket /> Add to cart
            </button>
            <button className="group p-2 px-3 flex items-center gap-2 rounded border hover:bg-gray-50 transition duration-300 ease-in-out">
              {" "}
              <FaHeart className="group-hover:text-blue-500 text-gray-400 " />
              Save
            </button>
          </div>
          <div>
            <div className="flex g-gray-100 bg-gray-100 items-center  border-x border-t rounded-t-lg border-b-2 justify-between">
              <p
                onClick={() => {
                  setCurrentTab(0);
                }}
                className={` cursor-pointer
               p-3 mx-2 mt-2 
              ${currentTab == 0 ? "bg-white rounded-t-lg border-t-2 border-x-2" : " "}
              `}>
                Specification
              </p>
              <p
                onClick={() => {
                  setCurrentTab(1);
                }}
                className={` cursor-pointer
               p-3 mx-2 mt-2 
              ${currentTab == 1 ? "bg-white rounded-t-lg border-t-2 border-x-2" : " "}
              `}>
                Warranty info
              </p>
              <p
                onClick={() => {
                  setCurrentTab(2);
                }}
                className={` cursor-pointer
               p-3 mx-2 mt-2 
              ${currentTab == 2 ? "bg-white rounded-t-lg border-t-2 border-x-2" : " "}
              `}>
                Shipping info
              </p>
              <p
                onClick={() => {
                  setCurrentTab(3);
                }}
                className={` cursor-pointer
               p-3 mx-2 mt-2 
              ${currentTab == 3 ? "bg-white rounded-t-lg border-t-2 border-x-2" : ""}
              `}>
                Seller profile
              </p>
            </div>
            <div className="border-x border-b rounded py-4">
              {currentTab == 0 && (
                <div className="px-5 text-gray-500">
                  With supporting text below as a natural lead-in to additional content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <p className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Some great feature name here
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Easy fast and ver good
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Lorem ipsum dolor sit amet, consectetur
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Some great feature name here
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Duis aute irure dolor in reprehenderit
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Modern style and design
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Optical heart sensor
                    </p>
                  </div>
                  <div className="grid grid-cols-2 mt-5 hover:bg-gray-100 p-2 cursor-default">
                    <p className="font-semibold text-[#565656]">Display: </p>
                    <span> 13.3-inch LED-backlit display with IPS</span>
                  </div>
                  <hr className="" />
                  <div className="grid grid-cols-2   hover:bg-gray-100 p-2 cursor-default">
                    <p className="font-semibold text-[#565656]">Processor capacity: </p>
                    <span>2.3GHz dual-core Intel Core i5</span>
                  </div>
                  <hr className="" />
                  <div className="grid grid-cols-2   hover:bg-gray-100 p-2 cursor-default">
                    <p className="font-semibold text-[#565656]">Camera quality: </p>
                    <span> 720p FaceTime HD camera</span>
                  </div>
                  <hr className="" />
                  <div className="grid grid-cols-2   hover:bg-gray-100 p-2 cursor-default">
                    <p className="font-semibold text-[#565656]">Memory </p>
                    <span>8 GB RAM or 16 GB RAM</span>
                  </div>
                  <hr className="" />
                  <div className="grid grid-cols-2   hover:bg-gray-100 p-2 cursor-default">
                    <p className="font-semibold text-[#565656]">Graphics </p>
                    <span>Intel Iris Plus Graphics 640</span>
                  </div>
                  <hr className="mb-4" />
                </div>
              )}
              {currentTab == 1 && (
                <div className="px-5 text-gray-500">
                  Tab content or sample information now Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                </div>
              )}
              {currentTab == 2 && (
                <div className="px-5 text-gray-500">
                  Another tab content or sample information now Dolor sit amet, consectetur
                  adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum.
                </div>
              )}
              {currentTab == 3 && (
                <div className="px-5 text-gray-500">
                  Some other tab content or sample information now Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum.
                </div>
              )}
            </div>
            <div className="border  p-5">
              <p className="font-semibold">Similar items</p>
              {PRODUCTS.map((product) => (
                <div key={product.id}>
                  {product.id <= 4 ? (
                    <div className=" my-4 flex  gap-3">
                      <div className="border rounded-lg p-2 hover:border-gray-400 cursor-pointer">
                        <img
                          src={product.thumbnail}
                          alt=""
                          className="aspect-video w-[160px] h-[90px]"
                        />
                      </div>
                      <div>
                        <p className="hover:underline cursor-pointer">{product.title}</p>
                        <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
