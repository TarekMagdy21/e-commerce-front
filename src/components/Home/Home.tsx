import {Link, useNavigate} from "react-router-dom";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {WEBCATEGORIES} from "../../data/categories";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

// Images for mobile
import menuSVG from "../../assets/mobile/menu.svg";
import logoSymbol from "../../assets/mobile/logo-symbol.svg";
import brand from "../../assets/mobile/Brand.svg";
import shoppingCart from "../../assets/mobile/shopping_cart.svg";
import person from "../../assets/mobile/person.svg";
import searchIcon from "../../assets/mobile/search.svg";
import home from "../../assets/mobile/sidebaricons/home.svg";
import list from "../..//assets/mobile/sidebaricons/list.svg";
import favBorder from "../../assets/mobile/sidebaricons/favorite_border.svg";
import inventory from "../../assets/mobile/sidebaricons/inventory_2.svg";
import headset from "../../assets/mobile/sidebaricons/headset_mic.svg";
import languageIcon from "../../assets/mobile/sidebaricons/language.svg";
import business from "../../assets/mobile/sidebaricons/business.svg";
import arrowForward from "../../assets/arrow_forward.svg";
import facebook from "../../assets/facebook3.svg";
import instagram from "../../assets/instagram3.svg";
import linkedin from "../../assets/linkedin3.svg";
import youtube from "../../assets/youtube3.svg";
import twitter from "../../assets/twitter3.svg";
import america from "../../assets/america.svg";
//  for web
import webLogo from "../../assets/web/web-logo.svg";
import {RiArrowDownSFill} from "react-icons/ri";
import {FaUser, FaBars, FaHeart, FaRegHeart, FaRegUserCircle} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import laptop from "../../assets/web/nav-1.jpg";
import watch from "../../assets/web/nav-2.jpg";
import printer from "../../assets/web/nav-8.jpg";

import {FaFacebookF, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa";
import {useGetProductsQuery} from "@/store/apis/productApi/productApi";
import HomeWeb from "./web/HomeWeb";
import HomeMobile from "./mobile/HomeMobile";
import LoadingSpinner from "../shared/LoadingSpinner";

const Home = () => {
  const {data: Products, isLoading} = useGetProductsQuery({page: 1, limit: 9});
  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }
  return (
    <>
      {/* Mobile */}
      <HomeMobile Products={Products?.products} />
      {/* ---------------------------------------------------------------------------------------------------------------------- */}
      {/* Web */}
      <HomeWeb Products={Products?.products}/>
    </>
  );
};

export default Home;
