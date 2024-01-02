import {Link, useNavigate} from "react-router-dom";
// import {Button} from '../ui/button';
// import {Input} from "../ui/input";
// import {CATEGORIES} from "../../data/categories";
// Images
import logoSymbol from "../../../assets/mobile/logo-symbol.svg";
import brand from "../../../assets/mobile/Brand.svg";
import shoppingCart from "../../../assets/mobile/shopping_cart.svg";
import person from "../../../assets/mobile/person.svg";
// import search from "../../../assets/mobile/search.svg";
import arrowBack from "../../../assets/mobile/arrow_back.svg";
import facebook from "../../../assets/facebook3.svg";
import instagram from "../../../assets/instagram3.svg";
import linkedin from "../../../assets/linkedin3.svg";
import youtube from "../../../assets/youtube3.svg";
import twitter from "../../../assets/twitter3.svg";
import america from "../../../assets/america.svg";
import {BsArrowRightShort, BsArrowLeftShort} from "react-icons/bs";
import {useState} from "react";
import {Rating} from "@mui/material";
import {RxDotFilled} from "react-icons/rx";
import {TfiCommentAlt} from "react-icons/tfi";
import {MdOutlineShoppingBasket} from "react-icons/md";
import {FaRegHeart, FaHeart} from "react-icons/fa6";
import {GoShieldCheck} from "react-icons/go";
import {GrLanguage} from "react-icons/gr";
import Flag from "react-world-flags";
import profilePic from "../../../assets/profilePic.jpg";

import {
  useGetFavoriteProductsQuery,
  useToggleFavoriteMutation,
} from "@/store/apis/productApi/productApi";
import {ProductProps} from "./../../../shared/Product.interface";
import {useAddToCartMutation} from "@/store/apis/cartApi/cartApi";
interface ProductDetailsMobileProps {
  similarProducts: any; // Adjust the type accordingly
  product: any;
}
const ProductDetailsMobile: React.FC<ProductDetailsMobileProps> = ({similarProducts, product}) => {
  const userId = localStorage.getItem("userId");
  const {data: wishlist} = useGetFavoriteProductsQuery({userId});
  const [addToCart] = useAddToCartMutation({});

  const [addToWishlist] = useToggleFavoriteMutation({}); //ابقي غير الكلام ده وهات الداتا عن طريق الاي دي احسن من اللوكيشن لانها بتتمسح لو عمل ريستارت للصفحه
  const navigate = useNavigate();
  const maxLength = 100;
  const [showMore, setShowMore] = useState(false);

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
            <FaRegHeart
              size="22"
              className="mt-1"
              onClick={() => {
                navigate("/wishlist");
              }}
            />
          </div>
        </nav>
        <div>
          <div className="relative">
            <img src={product?.images[0]} alt="thumbnail" />
            <span className=" flex gap-2 bg-gray-200 w-fit p-1 text-white rounded-3xl absolute right-3 bottom-2 bg-opacity-60">
              <BsArrowLeftShort />
              <BsArrowRightShort />
            </span>
          </div>
          <p className="px-1 py-2 flex items-center">
            <Rating name="read-only" value={product?.rating} readOnly />{" "}
            <RxDotFilled className="text-gray-300 w-6 h-6" />
            <TfiCommentAlt className="text-gray-500 mr-2 " />
            {product?.stock} stock
            <RxDotFilled className="text-gray-300 w-6 h-6" />
            <MdOutlineShoppingBasket className="text-gray-500  mr-2" />
            {product?.numberOfOrders} Sold
          </p>
          <p className="px-2 text-zinc-900 text-base font-medium leading-snug">{product?.title}</p>
          <p className="p-2 text-base font-semibold text-red-500">
            ${product?.price}
            <span className="text-gray-400 text-[0.8rem] font-normal ml-1">(50-100 pcs)</span>
          </p>
          <div
            className=" flex items-center px-2"
            onClick={() => {
              addToCart({
                userId,
                items: [{product: product._id, quantity: 1}],
              })
                .unwrap()
                .then(() => {
                  navigate("/cart");
                });
            }}>
            <div className="cursor-pointer w-full h-10 px-4 bg-gradient-to-b from-blue-600 to-blue-600 rounded-md flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className=" text-center text-white text-base font-medium ">Send inquiry</div>
              </div>
            </div>
            <span
              className="border-2 border-zinc-200 p-[.6rem] ml-2 rounded text-blue-600 cursor-pointer"
              onClick={() => {
                addToWishlist({userId: userId, productId: product?._id});
              }}>
              {wishlist?.wishlist.filter((item: any) => item?._id == product?._id).length > 0 ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
            </span>
          </div>
          <div className="p-2 flex flex-col gap-2">
            <div className="grid grid-cols-3 items-center gap-7 ">
              <p className="text-gray-400 text-base font-normal leading-snug">Condition</p>
              <p className="ml-8 text-neutral-600 col-span-2">Brand new</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-7 ">
              <p className="text-gray-400 text-base font-normal leading-snug">Material</p>
              <p className="ml-8 text-neutral-600 col-span-2">{product?.material}</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-7 ">
              <p className="text-gray-400 text-base font-normal leading-snug">Category</p>
              <p className="ml-8 text-neutral-600 col-span-2">{product?.category}</p>
            </div>
          </div>
          <div className="max-w-md     p-2 ">
            <p>
              {showMore ? product?.description : product?.description.slice(0, maxLength)}
              {product?.description.length > maxLength && !showMore && <span id="dots">...</span>}
            </p>

            {product?.description.length > maxLength && (
              <button
                onClick={() => {
                  setShowMore(!showMore);
                }}
                className="mt-3 px-5 py-2 text-blue-600 duration-300  ">
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
                {similarProducts.map((item: ProductProps) => (
                  <div
                    className="flex  flex-col flex-shrink-0 w-1/2  gap-2 px-4 pt-4   bg-white border rounded-xl "
                    key={item._id}>
                    <img src={item.images[0]} alt="1" className="rounded w-full  h-32" />
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
    </>
  );
};

export default ProductDetailsMobile;
