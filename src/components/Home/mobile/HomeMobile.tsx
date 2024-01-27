import menuSVG from "../../../assets/mobile/menu.svg";
import logoSymbol from "../../../assets/mobile/logo-symbol.svg";
import brand from "../../../assets/mobile/Brand.svg";
import shoppingCart from "../../../assets/mobile/shopping_cart.svg";
import person from "../../../assets/mobile/person.svg";
import searchIcon from "../../../assets/mobile/search.svg";
import home from "../../../assets/mobile/sidebaricons/home.svg";
import list from "../../..//assets/mobile/sidebaricons/list.svg";
import favBorder from "../../../assets/mobile/sidebaricons/favorite_border.svg";
import inventory from "../../../assets/mobile/sidebaricons/inventory_2.svg";
import headset from "../../../assets/mobile/sidebaricons/headset_mic.svg";
import languageIcon from "../../../assets/mobile/sidebaricons/language.svg";
import business from "../../../assets/mobile/sidebaricons/business.svg";
import arrowForward from "../../../assets/arrow_forward.svg";
import facebook from "../../../assets/facebook3.svg";
import instagram from "../../../assets/instagram3.svg";
import linkedin from "../../../assets/linkedin3.svg";
import youtube from "../../../assets/youtube3.svg";
import twitter from "../../../assets/twitter3.svg";
import america from "../../../assets/america.svg";
import { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteCookie, getCookies } from "cookies-next";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { FaRegHeart } from "react-icons/fa";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import { ProductProps } from "@/shared/Product.interface";

const HomeMobile: FC<{ Products: ProductProps[] }> = ({ Products }) => {
  const { hour, minute, second } = useCountdownTimer();
  const [activeMenu, setActiveMenu] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden font-inter ">
        {/* SideMenu */}
        <div
          className={`bg-zinc-600 h-screen w-screen absolute z-10 transition-transform duration-300 ease-in-out ${
            activeMenu ? "" : "transform -translate-x-full"
          }`}
          onClick={() => {
            setActiveMenu((prev) => !prev);
          }}
        >
          <div className="w-[80%] h-screen bg-white flex flex-col ">
            <div className=" bg-gray-200 px-5 pt-5 pb-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="my-2">
                {getCookies().token ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      location.reload();
                      deleteCookie("token");
                      localStorage.removeItem("userId");
                    }}
                  >
                    Log out
                  </div>
                ) : (
                  <>
                    <Link to={"/login"}>Sign in</Link>
                    <span className="mx-2">|</span>
                    <Link className=" " to={"/register"}>
                      {" "}
                      Sign up
                    </Link>
                  </>
                )}{" "}
              </div>
            </div>
            {/* First Menu */}
            <div className="px-5 pt-5 w-[80%]  ">
              <Link to={"/"} className="flex items-center gap-3 ">
                <img src={home} alt="" /> Home
              </Link>
              <Link to={"/products"} className="flex items-center gap-3 pt-4">
                <img src={list} alt="list" /> Products
              </Link>
              <Link to={"/wishlist"} className="flex items-center gap-3 pt-4">
                <img src={favBorder} alt="favBorder" /> Favorites
              </Link>
              <Link to={"/"} className="flex items-center gap-3 pt-4">
                <img src={inventory} alt="inventory" /> My orders
              </Link>
            </div>
            <hr className="w-[95%] mx-auto mt-5" />
            {/* Second Menu */}
            <div className="px-5 pt-5 w-[80%]  ">
              <Link to={"/"} className="flex items-center gap-3">
                <img src={languageIcon} alt="languageIcon" /> English | USD
              </Link>
              <Link to={"/"} className="flex items-center gap-3 pt-4">
                <img src={headset} alt="headset" /> Contact us
              </Link>
              <Link to={"/"} className="flex items-center gap-3 pt-4">
                <img src={business} alt="business" /> About
              </Link>
            </div>
            <hr className="w-[95%] mx-auto mt-5" />
            {/* Third Menu */}
            <div className="px-5 pt-5 w-[80%] flex flex-col gap-3 pl-14  ">
              <Link to={"/"} className="    ">
                User agreement
              </Link>
              <Link to={"/"} className="     ">
                Partnership
              </Link>
              <Link to={"/"} className="     ">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
        {/* navBar */}
        <nav className="flex justify-between px-5 pt-5 pb-3">
          <div className="flex gap-4">
            <img
              src={menuSVG}
              alt="menu"
              className="max-w-full"
              onClick={() => {
                setActiveMenu((prev) => !prev);
              }}
            />
            <p className="flex items-center gap-1">
              <img src={logoSymbol} alt="logo" className="max-w-full" />
              <img src={brand} alt="logo" className="max-w-full" />
            </p>
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
              size="27"
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
            <img
              src={searchIcon}
              alt="search"
              className="absolute left-7 top-2.5"
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
          </div>
        </form>
        {/* Scroll categories */}
        <div className="pl-5 pt-3 overflow-x-auto whitespace-nowrap scrollbar-none">
          {categories.map((i: any, index: number) => (
            <Button
              key={index} // Added key prop for React list is
              id={i}
              size="sm"
              className="bg-gray-200 mr-2 text-[#0D6EFD] overflow-x-scroll"
              asChild
            >
              <Link to={`/products/${i.replace(/\s/g, "")}`}>{i}</Link>
            </Button>
          ))}
        </div>
        {/* main image */}
        <div className="flex flex-col gap-4  p-9 mt-4 bg-headphones bg-cover pb-14 ">
          <p className=" text-[1.125rem]">
            Latest trending <br />{" "}
            <span className="font-semibold">Electronic items</span>
          </p>
          <Button
            size="sm"
            className=" bg-white mr-2 text-[#0D6EFD] w-[35%] font-medium  "
            asChild
          >
            <Link to={`/products`}>Learn more</Link>
          </Button>
        </div>
        {/* gray part */}
        <div className="h-4 bg-gray-100" />
        {/* deals and offers */}
        <div>
          <div className="flex justify-evenly  items-center py-3 border-b-[1px] flex-wrap">
            <div className="pl-5">
              <p className=" text-zinc-900 text-[1.125rem] font-semibold">
                Deals and offers
              </p>
              <p className="-mt-1 text-neutral-600 text-[0.8125rem]">
                Electronic equipments
              </p>
            </div>
            <div className="flex gap-3    ">
              <p className="   text-center text-gray-400  p-1 bg-gray-100 ">
                <span className=" font-semibold px-2">{hour}</span>
                <br />
                Hour
              </p>
              <p className="   text-center text-gray-400  p-1 bg-gray-100 ">
                <span className=" font-semibold px-2">{minute}</span>
                <br />
                Min
              </p>
              <p className="   text-center text-gray-400  p-1 bg-gray-100 ">
                <span className=" font-semibold px-3">{second}</span>
                <br />
                Sec
              </p>
            </div>
          </div>
          <div className="  flex  overflow-x-auto whitespace-nowrap border-b-[1px] scrollbar-none ">
            {Products.map((item: ProductProps, index: number) => (
              <Link
                state={item}
                key={item._id}
                to={`/product/${item.category}/${item._id}`}
                className={`border-r-[1px] ${
                  item.discountPercentage == 0 ? "hidden" : ""
                }   flex flex-col justify-center items-center gap-2 p-4 ${
                  index == 0 ? "pl-1" : ""
                }`}
              >
                <img
                  src={item.images[1]}
                  alt={item.title}
                  className="w-10 h-10"
                />
                <p className="w-fit">{item.title}</p>
                <p className="text-red-600 bg-red-100   rounded-full w-fit px-3 py-1 ">
                  -{item.discountPercentage}%
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="h-2 bg-gray-100" />
        {/* Home and outdoor */}
        <div>
          <div className="flex  items-center py-3 border-b-[1px]">
            <div className="pl-5">
              <p className=" text-zinc-900 text-[1.125rem] font-semibold">
                Home and outdoor
              </p>
            </div>
          </div>
          <div className="  flex  overflow-x-auto whitespace-nowrap border-b-[1px] scrollbar-none ">
            {Products.map((item: ProductProps, index: number) => (
              <Link
                state={item}
                key={item._id}
                to={`/product/${item.category}/${item._id}`}
                className={`border-r-[1px] ${
                  index < 4 ? "hidden" : ""
                }    flex flex-col justify-center items-center   p-4 ${
                  index == 0 ? "pl-1" : ""
                }`}
              >
                <img
                  src={item.images[1]}
                  alt={item.title}
                  className="w-10 g-10"
                />
                <p className="w-fit">{item.title}</p>
                <p className=" text-center text-gray-400 text-[13px] font-normal ">
                  From USD 19
                </p>
              </Link>
            ))}
          </div>
          <p className="flex px-5 py-3 items-center gap-1 text-blue-600 text-base font-medium">
            Source now <img src={arrowForward} alt="" />
          </p>
        </div>
        {/* gray part */}
        <div className="h-4 bg-gray-100" />
        {/* Second Big Image */}
        <div className="flex flex-col gap-4  p-7     bg-cargo bg-cover   ">
          <p className=" text-white text-lg font-semibold">
            An easy way to send <br />
            requests to all suppliers
          </p>
          <Button
            size="sm"
            className=" text-white mr-2 bg-[#0D6EFD] w-[35%] font-medium  "
            asChild
          >
            <Link to={`/cart`}>Send inquiry</Link>
          </Button>
        </div>
        <div className="h-4 bg-gray-100" />
        {/* Footer */}
        <footer>
          <p className="flex p-5 items-center gap-1">
            <img src={logoSymbol} alt="logo" className="max-w-full" />
            <img src={brand} alt="logo" className="max-w-full" />
          </p>
          <p className="text-neutral-600 text-base font-normal px-5">
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
              <li className="pb-2 text-zinc-900 text-base font-medium   leading-snug">
                About
              </li>
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
              <li className="pb-2 text-zinc-900 text-base font-medium   leading-snug">
                For users
              </li>
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

export default HomeMobile;
