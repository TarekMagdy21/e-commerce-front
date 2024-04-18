import {useEffect, useState} from "react";
import CartMobile from "./mobile/CartMobile";
import CartWeb from "./web/CartWeb";
import {useNavigate} from "react-router-dom";
import {deleteCookie, getCookies} from "cookies-next";
import {RiArrowDownSFill} from "react-icons/ri";
import {Link} from "react-router-dom";
import webLogo from "../../assets/web/web-logo.svg";
import {FaUser, FaBars, FaHeart} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import {FaFacebookF, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa";
import america from "../../assets/america.svg";
import {FaRegUserCircle} from "react-icons/fa";

const Cart = () => {
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
  const [categoriesMenu, setCategoriesMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookies().token) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden">
        <CartMobile />
      </div>
      {/* Web */}
      <div className="max-md:hidden">
        {/* Web */}
        <div className="max-md:hidden ">
          {/* Top Nav */}
          <nav className="max-w-4xl pb-3 mx-auto xl:max-w-5xl 2xl:max-w-7xl">
            <div className="relative flex items-center justify-between gap-1 pt-4 mx-2">
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
                  }}>
                  Matgary
                </p>
                <button
                  onClick={() => {
                    setCategoriesMenu((cat) => !cat);
                  }}
                  className="ml-10 flex items-center px-4 gap-2 bg-[#0d6efd] text-white py-[0.41rem] rounded-lg hover:bg-[#437ed6] transition ease-in-out duration-200">
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
                        }}>
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
                      className="flex items-center gap-2 px-3 py-1 text-gray-500 border rounded hover:text-blue-600 hover:bg-gray-50">
                      <FaHeart />
                      Wishlist
                    </Link>
                    <Link
                      to="/cart"
                      className="flex items-center gap-2 px-3 py-1 text-gray-500 border rounded hover:text-blue-600 hover:bg-gray-50">
                      <FaCartShopping />
                      My cart
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-1 text-gray-500 border rounded hover:text-blue-600 hover:bg-gray-50">
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
                      className="p-1 rounded cursor-pointer hover:bg-blue-200 h-fit">
                      {i}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <CartWeb />

          {/* Footer */}
          <footer className="bg-[#e9ecef]">
            <div className="max-w-3xl px-5 pt-10 mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
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
                    className="p-2 text-gray-500 bg-white border rounded-lg cursor-pointer hover:text-blue-500">
                    <FaFacebookF />
                  </Link>
                  <Link
                    to={"/"}
                    className="p-2 text-gray-500 bg-white border rounded-lg cursor-pointer hover:text-blue-500">
                    <FaInstagram />
                  </Link>
                  <Link
                    to={"/"}
                    className="p-2 text-gray-500 bg-white border rounded-lg cursor-pointer hover:text-blue-500">
                    <FaYoutube />
                  </Link>
                  <Link
                    to={"/"}
                    className="p-2 text-gray-500 bg-white border rounded-lg cursor-pointer hover:text-blue-500">
                    <FaTwitter />
                  </Link>
                </div>
                <div className="grid w-full grid-cols-3 justify-items-stretch">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold cursor-pointer hover:underline">Store</p>
                    <p className="blue-underline">About us</p>
                    <p className="blue-underline">Find store</p>
                    <p className="blue-underline">Categories</p>
                    <p className="blue-underline">Blogs</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold cursor-pointer hover:underline">Information</p>
                    <p className="blue-underline">Help center</p>
                    <p className="blue-underline">Money refund</p>
                    <p className="blue-underline">Shipping info</p>
                    <p className="blue-underline">Refunds</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold cursor-pointer hover:underline ">Support</p>
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
      </div>
    </div>
  );
};

export default Cart;
