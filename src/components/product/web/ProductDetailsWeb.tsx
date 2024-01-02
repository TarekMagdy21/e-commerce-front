import {Link, useLocation, useNavigate} from "react-router-dom";
import {  useState} from "react";
import {Rating} from "@mui/material";

import {FaHeart, FaRegHeart, FaShoppingBasket} from "react-icons/fa";
import {FaCheck} from "react-icons/fa6";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {FiMinus, FiPlus} from "react-icons/fi";
import {ProductProps} from "./../../../shared/Product.interface";
import {useAddToCartMutation} from "@/store/apis/cartApi/cartApi";
import {toast} from "react-toastify";
import {
  useGetFavoriteProductsQuery,
  useToggleFavoriteMutation,
} from "@/store/apis/productApi/productApi";
// Example Component Definition
interface ProductDetailsWebProps {
  similarProducts: any; // Adjust the type accordingly
  product: any;
}
const ProductDetailsWeb: React.FC<ProductDetailsWebProps> = ({
  similarProducts,
  product: productDetail,
}) => {
  const {state} = useLocation();
  let product = productDetail == undefined ? state : productDetail;

  const userId = localStorage.getItem("userId");
  const {data: wishlist} = useGetFavoriteProductsQuery({userId});
  const [addToWishlist] = useToggleFavoriteMutation({}); //ابقي غير الكلام ده وهات الداتا عن طريق الاي دي احسن من اللوكيشن لانها بتتمسح لو عمل ريستارت للصفحه
  const [addToCart] = useAddToCartMutation({});
  //WEB---------------------------------
  const [currentImage, setCurrentImage] = useState(product?.images[0]);
  // const [currentSize, setCurrentSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      {/* Web */}
      <div className="max-md:hidden">
        <div className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mb-4">
          <div className="flex flex-col justify-center my-4 ">
            <img
              src={currentImage}
              alt="12"
              className="w-full h-full max-w-[800px] max-h-[600px] p-[0.35rem] border rounded-md mx-auto"
            />{" "}
            <div className="flex gap-4 justify-center items-center my-2">
              {product?.images.map((p: any, index: any) => (
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
              <p className="text-3xl font-semibold">{product?.title}</p>
              <div className="flex items-center gap-3 my-2">
                <Rating value={product?.rating} readOnly />
                <p className="  bg-[#565656] bg-opacity-60 rounded-full w-[0.25rem] h-[0.25rem]"></p>
                <FaShoppingBasket className="text-[#9e9e9e]" />
                <span className="text-[#9e9e9e]">123 Order</span>
                <p className="  bg-[#565656] bg-opacity-60 rounded-full w-[0.25rem] h-[0.25rem]"></p>
                <span className="text-[#00a524]">In stock</span>
              </div>
              <div>
                <p className="my-3 text-[#212529] font-semibold text-xl">
                  ${product?.price.toFixed(2)}
                </p>
                <p>{product?.description}</p>
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
              <label>Quantity</label>
              <div className="  rounded-lg   flex items-center justify-center    mt-1 ">
                <button
                  onClick={() => {
                    if (quantity !== 1) {
                      setQuantity((prevState) => prevState - 1);
                    }
                  }}
                  className="hover:bg-gray-50 hover:border-[#565656] p-2 border rounded-l-md cursor-pointer  transition duration-300 ease-in-out">
                  <FiMinus />
                </button>
                <div className="hover:border-blue-500 p-1 px-4 border bg-gray-100 transition duration-300 ease-in-out">
                  {quantity}
                </div>
                <button
                  onClick={() => {
                    setQuantity((prevState) => prevState + 1);
                  }}
                  className=" cursor-pointer hover:bg-gray-50 hover:border-[#565656] p-2 border  rounded-r-md transition duration-300 ease-in-out">
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-5 my-4">
            <Link
              to="/cart"
              onClick={() => {
                addToCart({
                  userId,
                  items: [{product: product._id, quantity: 1}],
                });
              }}
              className="bg-[#ff8100] hover:bg-[#d96e00] text-white rounded p-2 px-3 transition duration-300 ease-in-out">
              Buy now
            </Link>
            <button
              onClick={() => {
                addToCart({
                  userId,
                  items: [{product: product._id, quantity}],
                })
                  .unwrap()
                  .then(() => {
                    toast.success(`Product Added to cart with quantity of ${quantity}`);
                  });
              }}
              className="p-2 px-3 bg-[#0d6efd]  hover:bg-[#0b5ed7] text-white rounded flex items-center gap-2">
              {" "}
              <FaShoppingBasket /> Add to cart
            </button>
            <button
              className={`group p-2 px-3 flex items-center gap-2 rounded border hover:bg-gray-50 transition duration-300 ease-in-out   `}
              onClick={() => {
                addToWishlist({userId: userId, productId: product._id});
              }}>
              {wishlist?.wishlist.filter((item: any) => item._id == product?._id).length > 0 ? (
                <>
                  <FaHeart className={` text-blue-500    `} />
                  Saved
                </>
              ) : (
                <>
                  <FaRegHeart className={`group-hover:text-blue-500 text-gray-400  `} /> Save
                </>
              )}
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
              {similarProducts.map((product: ProductProps) => (
                <div
                  onClick={() => {
                    navigate(`/product/${product.category}/${product._id}`, {
                      state: {product},
                    });
                  }}
                  key={product._id}>
                  <div className=" my-4 flex  gap-3">
                    <div className="border rounded-lg p-2 hover:border-gray-400 cursor-pointer">
                      <img
                        src={product.images[1]}
                        alt=""
                        className="aspect-video w-[160px] h-[120px]"
                      />
                    </div>
                    <div>
                      <p className="hover:underline cursor-pointer">{product.title}</p>
                      <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsWeb;
