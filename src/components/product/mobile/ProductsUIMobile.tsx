import {Link, Outlet, useNavigate} from "react-router-dom";
// import {Button} from "../ui/button";
import {Input} from "../../ui/input";
 // Images
import logoSymbol from "../../../assets/mobile/logo-symbol.svg";
import brand from "../../../assets/mobile/Brand.svg";
import shoppingCart from "../../../assets/mobile/shopping_cart.svg";
import person from "../../../assets/mobile/person.svg";
import searchIcon from "../../../assets/mobile/search.svg";
import arrowBack from "../../../assets/mobile/arrow_back.svg";
import facebook from "../../../assets/facebook3.svg";
import instagram from "../../../assets/instagram3.svg";
import linkedin from "../../../assets/linkedin3.svg";
import youtube from "../../../assets/youtube3.svg";
import twitter from "../../../assets/twitter3.svg";
import america from "../../../assets/america.svg";
import {Button} from "@mui/material";
import {useState} from "react";
import {useGetProductsQuery} from "@/store/apis/productApi/productApi";
import {ProductProps} from "@/shared/Product.interface";
import {FaRegHeart} from "react-icons/fa";

const ProductsUIMobile = () => {
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
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {data: SearchProducts} = useGetProductsQuery({title: search});
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
                navigate("/");
              }}
            />
            <h1 className="text-zinc-900 text-lg font-semibold">Products</h1>
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
        {/* Search */}
        <form className="">
          <div className="px-5 relative">
            <img src={searchIcon} alt="search" className="absolute left-7 top-2.5" />
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
              className={`w-[88%] h-fit max-h-36 overflow-y-auto absolute z-10 bg-white  border ${
                search.length == 0 && "hidden"
              }`}>
              <div>
                {SearchProducts?.products.map((product: ProductProps) => (
                  <div
                    onClick={() => {
                      navigate(`/product/${product.category}/${product._id}`, {state: {product}});
                    }}
                    key={product._id}
                    className="mt-1 hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt="Laptop"
                        className="w-16 h-16 mt-3 hover:bg-gray-100 mx-5"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{product.title}</p>
                        <p className="font-semibold text-gray-500">${product.price}</p>
                      </div>
                    </div>
                    <hr className="  mt-4 " />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
        {/* Scroll categories */}
        <div className="pl-5 mb-5 pt-3 overflow-x-auto whitespace-nowrap scrollbar-none">
          {categories.map((item) => (
            <Button
              key={item} // Added key prop for React list items
              id={item}
              size="small"
              className="bg-gray-200 mr-2 text-[#0D6EFD] overflow-x-scroll">
              <Link to={`/products/${item.replace(/\s/g, "")}`}>{item}</Link>
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
    </>
  );
};

export default ProductsUIMobile;
