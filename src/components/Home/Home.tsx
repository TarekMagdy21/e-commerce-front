import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CATEGORIES } from "../../data/categories";
import { DEALS } from "../../data/deals";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import {} from "react-icons";
import { useState } from "react";
import menuSVG from "/src/assets/mobile/menu.svg";
import logoSymbol from "/src/assets/mobile/logo-symbol.svg";
import brand from "/src/assets/mobile/brand.svg";
import shoppingCart from "/src/assets/mobile/shopping_cart.svg";
import person from "/src/assets/mobile/person.svg";
import search from "/src/assets/mobile/search.svg";
import avatar from "/src/assets/Avatar.svg";
import home from "/src/assets/mobile/sidebaricons/home.svg"
const Home = () => {
  const navigate = useNavigate();
  const { hour, minute, second } = useCountdownTimer();
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden font-inter  ">
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
              <img src={avatar} alt="" width={50} />
              <p className="my-2">
                <Link to={"/login"}>Sign in</Link> |
                <Link to={"/register"}> Register</Link>
              </p>
            </div>
            {/* First Menu */}
            <div className="px-5 pt-5 w-[80%]  ">
              <Link to={"/"} className="flex items-center gap-3 ">
                <img src={home} alt="" />{" "}
                Home
              </Link>
              <Link to={"/"} className="flex items-center gap-3 pt-4">
                <img src="/src/assets/mobile/sidebaricons/list.svg" alt="" />{" "}
                Categories
              </Link>
              <Link to={"/"} className="flex items-center gap-3 pt-4">
                <img
                  src="/src/assets/mobile/sidebaricons/favorite_border.svg"
                  alt=""
                />{" "}
                Favorites
              </Link>
              <Link to={"/"} className="flex items-center gap-3 pt-4">
                <img
                  src="/src/assets/mobile/sidebaricons/inventory_2.svg"
                  alt=""
                />{" "}
                My orders
              </Link>
            </div>
            <hr className="w-[95%] mx-auto mt-5" />
            {/* Second Menu */}
            <div className="px-5 pt-5 w-[80%]  ">
              <Link to={"/"} className="flex items-center gap-3">
                <img
                  src="/src/assets/mobile/sidebaricons/language.svg"
                  alt=""
                />{" "}
                English | USD
              </Link>
              <Link to={"/"} className="flex items-center gap-3 pt-4">
                <img
                  src="/src/assets/mobile/sidebaricons/headset_mic.svg"
                  alt=""
                />{" "}
                Contact us
              </Link>
              <Link to={"/"} className="flex items-center gap-3 pt-4">
                <img
                  src="/src/assets/mobile/sidebaricons/business.svg"
                  alt=""
                />{" "}
                About
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
              <img
                src={logoSymbol}
                alt="logo"
                className="max-w-full"
              />
              <img
                src={brand}
                alt="logo"
                className="max-w-full"
              />
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
          </div>
        </nav>
        {/* Search */}
        <form className="">
          <div className="px-5 relative">
            <img
              src={search}
              alt="search"
              className="absolute left-7 top-2.5"
            />
            <Input
              placeholder="Search"
              name="search"
              type="search"
              className="bg-gray-50 px-8  text-[1rem]"
            />
          </div>
        </form>
        {/* Scroll categories */}
        <div className="pl-5 pt-3 overflow-x-auto whitespace-nowrap scrollbar-none">
          {CATEGORIES.map((item) => (
            <Button
              key={item?.id} // Added key prop for React list items
              id={item?.id}
              size="sm"
              className="bg-gray-200 mr-2 text-[#0D6EFD] overflow-x-scroll"
              asChild
            >
              <Link to={`/products/${item?.url}`}>{item?.name}</Link>
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
          <div className="flex  items-center py-3 border-b-[1px]">
            <div className="pl-5">
              <p className=" text-zinc-900 text-[1.125rem] font-semibold">
                Deals and offers
              </p>
              <p className="-mt-1 text-neutral-600 text-[0.8125rem]">
                Electronic equipments
              </p>
            </div>
            <div className="flex gap-3 m-auto  ">
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
            {DEALS.map((item, index) => (
              <Link
                to={`/products/${item.url}`}
                className={`border-r-[1px]   flex flex-col justify-center items-center gap-2 p-4 ${
                  index == 0 ? "pl-1" : ""
                }`}
              >
                <img src={item.img} alt={item.name} width={50} />
                <p className="w-fit">{item.name}</p>
                <p className="text-red-600 bg-red-100   rounded-full w-fit px-3 py-1 ">
                  -25%
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
            {DEALS.map((item, index) => (
              <Link
                to={`/products/${item.url}`}
                className={`border-r-[1px]   flex flex-col justify-center items-center   p-4 ${
                  index == 0 ? "pl-1" : ""
                }`}
              >
                <img src={item.img} alt={item.name} width={50} />
                <p className="w-fit">{item.name}</p>
                <p className=" text-center text-gray-400 text-[13px] font-normal ">
                  From USD 19
                </p>
              </Link>
            ))}
          </div>
          <p className="flex px-5 py-3 items-center gap-1 text-blue-600 text-base font-medium">
            Source now <img src="/src/assets/arrow_forward.svg" alt="" />
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
            <Link to={`/`}>Send inquiry</Link>
          </Button>
        </div>
        <div className="h-4 bg-gray-100" />
        {/* Footer */}
        <footer>
          <p className="flex p-5 items-center gap-1">
            <img
              src="/src/assets/mobile/logo-symbol.svg"
              alt="logo"
              className="max-w-full"
            />
            <img
              src="/src/assets/mobile/brand.svg"
              alt="logo"
              className="max-w-full"
            />
          </p>
          <p className="text-neutral-600 text-base font-normal px-5">
            Best information about the company gies here but now lorem ipsum is
          </p>
          <div className="flex px-5 py-2 gap-2">
            <img src="/src/assets/facebook3.svg" alt="" />
            <img src="/src/assets/twitter3.svg" alt="" />
            <img src="/src/assets/linkedin3.svg" alt="" />
            <img src="/src/assets/instagram3.svg" alt="" />
            <img src="/src/assets/youtube3.svg" alt="" />
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
              <img src="/src/assets/america.svg" alt="" />
              English
            </span>
          </p>
        </footer>
      </div>
      {/* Web */}
      {/* <div className=" max-lg:hidden ">Web</div> */}
    </>
  );
};

export default Home;
