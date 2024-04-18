import {
  useClearCartMutation,
  useGetCartItemsQuery,
} from "@/store/apis/cartApi/cartApi";
import { useAddOrderMutation } from "@/store/apis/orderApi/orderApi";
import { useGetCurrentUserQuery } from "@/store/apis/userApi/usersApiSlice";
import { getCookies } from "cookies-next";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CartResult = () => {
  const userId = localStorage.getItem("userId");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [clearCart] = useClearCartMutation();
  const [addOrder] = useAddOrderMutation();
  const { data } = useGetCartItemsQuery({ userId });
  const { data: userData } = useGetCurrentUserQuery({ userId });
  console.log("pathname", pathname);
  console.log("pathname", data?.items.length);
  useEffect(() => {
    if (!getCookies().token) {
      navigate("/login");
    }
    if (pathname == "/success" && data?.items.length > 0) {
      addOrder({
        userId,
        cartId: data?.id,
        shippingAddress: userData?.personalInfo?.address || "Your Address",
        totalPrice: data?.totalPriceAfterDiscount.toFixed(2),
        products: data?.items.map((item: any) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      });
      clearCart({ userId: localStorage.getItem("userId") });
    }
  }, [data]);

  let content;
  if (pathname === "/success") {
    content = (
      <div className="p-4 text-center bg-green-200 rounded-md">
        <p className="text-green-800">Successfully purchased!</p>
        <Link to="/" className="font-semibold text-blue-500 hover:underline">
          {" "}
          back to home
        </Link>
      </div>
    );
  } else if (pathname === "/cancel") {
    content = (
      <div className="p-4 text-center bg-red-200 rounded-md">
        <p className="text-red-800">Payment canceled.</p>
        <Link to="/" className="font-semibold text-blue-500 hover:underline">
          {" "}
          back to home
        </Link>
      </div>
    );
  } else {
    // Default or invalid path
    content = (
      <div className="p-4 bg-yellow-200 rounded-md">
        <p className="text-yellow-800">Invalid page.</p>
      </div>
    );
  }

  return <div className="mt-8">{content}</div>;
};

export default CartResult;
