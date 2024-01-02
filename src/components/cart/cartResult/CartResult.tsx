import {useClearCartMutation, useGetCartItemsQuery} from "@/store/apis/cartApi/cartApi";
import {useAddOrderMutation} from "@/store/apis/orderApi/orderApi";
import {useGetCurrentUserQuery} from "@/store/apis/userApi/usersApiSlice";
import {getCookies} from "cookies-next";
import {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

const CartResult = () => {
  const userId = localStorage.getItem("userId");
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const [clearCart] = useClearCartMutation();
  const [addOrder] = useAddOrderMutation();
  const {data} = useGetCartItemsQuery({userId});
  const {data: userData} = useGetCurrentUserQuery({userId});
  useEffect(() => {
    if (pathname == "/success" && data?.items.length > 0) {
      addOrder({
        userId,
        cartId: data?.id,
        shippingAddress: userData?.personalInfo?.address,
        totalPrice: data?.totalPriceAfterDiscount.toFixed(2),
        products: data?.items.map((item: any) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      });
      clearCart({userId: localStorage.getItem("userId")});
    }  
    if (!getCookies().token) {
      navigate("/login");
    }
  }, [data]);

  let content;
  if (pathname === "/success") {
    content = (
      <div className="bg-green-200 p-4 rounded-md text-center">
        <p className="text-green-800">Successfully purchased!</p>
        <Link to="/" className="font-semibold hover:underline text-blue-500">
          {" "}
          back to home
        </Link>
      </div>
    );
  } else if (pathname === "/cancel") {
    content = (
      <div className="bg-red-200 p-4 rounded-md text-center">
        <p className="text-red-800">Payment canceled.</p>
        <Link to="/" className="font-semibold hover:underline text-blue-500">
          {" "}
          back to home
        </Link>
      </div>
    );
  } else {
    // Default or invalid path
    content = (
      <div className="bg-yellow-200 p-4 rounded-md">
        <p className="text-yellow-800">Invalid page.</p>
      </div>
    );
  }

  return <div className="mt-8">{content}</div>;
};

export default CartResult;
