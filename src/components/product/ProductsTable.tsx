//?Mui
import Typography from "@mui/material/Typography/Typography";
import { Link, useLocation } from "react-router-dom";
//web
// import {Transition} from "@headlessui/react";
import ProductsTableMobile from "./mobile/ProductsTableMobile";
import ProductsTableWeb from "./web/ProductsTableWeb";

const ProductsTable = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/");

  let breadcrumbs;
  if (pathname === "/products") {
    breadcrumbs = [
      <Link
        key="1"
        color="inherit"
        to="/"
        className="hover:underline  text-[#ABAEB3]"
      >
        Home
      </Link>,
      <Typography key="2" className=" text-[#ABAEB3]">
        Products
      </Typography>,
    ];
  } else {
    breadcrumbs = [
      <Link
        key="1"
        color="inherit"
        to="/"
        className="hover:underline  text-[#ABAEB3]"
      >
        Home
      </Link>,
      <Link
        key="2"
        color="inherit"
        to="/products"
        className="hover:underline  text-[#ABAEB3]"
      >
        Products
      </Link>,
      <Typography key="3" className=" text-[#ABAEB3]">
        {pathname.split("products/")[1]}
      </Typography>,
    ];
  }
  const otherCats = [
    "Computers",
    "Mini Gadgets",
    "Tablets",
    "Home TV",
    "Cameras",
    "Gaming",
    "Headphones",
    "Equipments",
  ].filter((cat) => cat.replace(/\s/g, "") !== pathname.split("products/")[1]);

  return (
    <>
      {/* //? Mobile eeeeeeeeeeeeeeeeeeee */}
      {/* <ProductsTableMobile /> */}
      {/* //! Web  bbbbbbbbbbbbbbbbbbbbbbbbbb*/}
      <div className="max-md:hidden">
        <ProductsTableWeb
          CategoriesFilter={otherCats}
          breadcrumbs={breadcrumbs}
          currentCategory={parts[2]}
        />
      </div>
    </>
  );
};

export default ProductsTable;
