// Images
import logoSymbol from "../../../assets/mobile/logo-symbol.svg";
import brand from "../../../assets/mobile/Brand.svg";
// import search from "../../assets/mobile/search.svg";
import facebook from "../../../assets/facebook3.svg";
import instagram from "../../../assets/instagram3.svg";
import linkedin from "../../../assets/linkedin3.svg";
import youtube from "../../../assets/youtube3.svg";
import twitter from "../../../assets/twitter3.svg";
import america from "../../../assets/america.svg";
import {Link, useNavigate} from "react-router-dom";
// import {Button} from "../ui/button";
// import {Input} from "../ui/input";
// import {CATEGORIES} from "../../data/categories";
// Images
import shoppingCart from "../../../assets/mobile/shopping_cart.svg";
import person from "../../../assets/mobile/person.svg";
import arrowBack from "../../../assets/mobile/arrow_back.svg";

import {FaRegHeart} from "react-icons/fa";
import {useGetCurrentUserQuery, useUpdateUserMutation} from "@/store/apis/userApi/usersApiSlice";
import profilePic from "../../../assets/Avatar.svg";
import {RiPencilFill} from "react-icons/ri";
import {useEffect, useState} from "react";
import {useGetOrdersQuery, useUpdateOrderMutation} from "@/store/apis/orderApi/orderApi";
import {RxDotFilled} from "react-icons/rx";
import moment from "moment";
import {useForm} from "react-hook-form";
import TextFieldHookForm from "@/components/shared/TextFieldHookForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ProfileMobile = () => {
  const {watch, reset, control} = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    mode: "all",
    // resolver: yupResolver(schema),
  });
  const userId = localStorage.getItem("userId");
  const {data: userData, isLoading} = useGetCurrentUserQuery({userId});
  const [updateUser, {isLoading: userUpdateLoading}] = useUpdateUserMutation();
  const {data: orders} = useGetOrdersQuery({userId});
  const [updateOrder] = useUpdateOrderMutation({});
  console.log("Orders", orders);
  useEffect(() => {
    if (userData) {
      reset({
        email: userData?.email,
        firstName: userData?.personalInfo?.firstName,
        lastName: userData?.personalInfo?.lastName,
        phoneNumber: userData?.personalInfo?.phoneNumber,
      });
    }
  }, [userData]);

  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (userUpdateLoading) {
      window.location.reload();
    }
  }, [userUpdateLoading]);
  if (isLoading) {
    return (
      <LoadingSpinner />

    );
  }
  return (
    <div className="font-inter ">
      <nav className="flex justify-between px-5 pt-5 pb-3 border-b-2">
        <div className="flex gap-4">
          <img
            src={arrowBack}
            alt="menu"
            className="max-w-full"
            onClick={() => {
              navigate("/products");
            }}
          />
          <h1 className="text-lg font-semibold text-zinc-900">Profile</h1>
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
      <div className="p-2 pt-6 pb-10 bg-gray-100">
        <div className="p-5 bg-white border rounded-lg">
          <p className=" font-[600] text-xl  mb-4">Personal info</p>
          <div className="flex gap-4 ">
            <img src={profilePic} alt="profilePic" className="w-16 mb-auto " />
            {edit ? (
              <div>
                <div className="grid grid-cols-2 gap-3 ">
                  <div>
                    <TextFieldHookForm
                      name="firstName"
                      control={control}
                      label="First Name"
                      errors={""}
                    />
                  </div>
                  <div>
                    <TextFieldHookForm
                      name="lastName"
                      control={control}
                      label="Last Name"
                      errors={""}
                    />
                  </div>
                  <div>
                    <TextFieldHookForm name="email" control={control} label="E-mail" errors={""} />
                  </div>
                  <div>
                    <TextFieldHookForm
                      name="phoneNumber"
                      control={control}
                      label="Phone Number"
                      errors={""}
                    />
                  </div>
                </div>
                <button
                  className="w-full p-3 mt-4 text-white bg-blue-500 border rounded hover:bg-blue-600"
                  onClick={() => {
                    setEdit(false);
                    updateUser({
                      id: userId,
                      email: watch("email"),
                      personalInfo: {
                        firstName: watch("firstName"),
                        lastName: watch("lastName"),
                        phoneNumber: watch("phoneNumber"),
                      },
                    });
                  }}>
                  Confirm
                </button>
              </div>
            ) : (
              <div>
                <p className="">
                  {userData?.personalInfo?.firstName
                    ? `${userData?.personalInfo?.firstName} ${userData?.personalInfo?.lastName}`
                    : "Add Your Name"}
                </p>
                <p>
                  Email: {userData?.email}
                  <br /> Phone:
                  {userData?.personalInfo?.phoneNumber
                    ? `+2${userData?.personalInfo?.phoneNumber}`
                    : ` `}
                  <RiPencilFill
                    color="#2c32f6"
                    size="20"
                    className="cursor-َpointer"
                    onClick={() => {
                      setEdit(true);
                    }}
                  />
                </p>
              </div>
            )}
          </div>
          <hr className="my-3" />
          <div>
            <h1 className="text-lg text-[#212529] leading-6 ">My recent orders</h1>
            <div className="">
              {orders?.orders.map((order: any, index: number) => (
                <div className="p-5 mt-4 border border-blue-500 rounded-md " key={order._id}>
                  <div>
                    <h1 className="flex items-center font-semibold ">
                      Order ID: {index + 1} <RxDotFilled className="w-4 h-3 text-gray-400" />{" "}
                      <span
                        className={` font-normal ${
                          order.status == "Pending" ? "text-[#FF8100]" : "text-[#00A524]"
                        }`}>
                        {order.status}
                      </span>
                    </h1>
                    <p className="text-[#9DA1A7]">
                      Date:
                      {moment(order?.createdAt).format("D MMMM YYYY")}
                    </p>
                    {order.status == "Cancelled" ? (
                      ""
                    ) : (
                      <div className="flex items-center gap-1 font-normal">
                        <button
                          onClick={() => {
                            updateOrder({
                              orderId: order._id,
                              status: "Cancelled",
                            });
                          }}
                          className="p-2 px-3 text-red-500 transition duration-300 ease-in-out border border-red-500 rounded-lg hover:bg-red-500 hover:text-white">
                          Cancel order
                        </button>
                        <button
                          onClick={() => {
                            updateOrder({
                              orderId: order._id,
                              status: "Processing",
                            });
                            setTimeout(() => {
                              updateOrder({
                                orderId: order._id,
                                status: "Shipped",
                              });
                            }, 5000);
                          }}
                          className="px-3 duration-300 transition ease-in-out border  hover:bg-blue-800  bg-[#0D6EFD] text-white p-2 rounded-lg">
                          Track order
                        </button>
                      </div>
                    )}
                    <hr className="my-3" />
                    <p className="text-[#9DA1A7]">Contact:</p>
                    <p>
                      {userData.personalInfo.firstName + " " + userData.personalInfo.lastName}{" "}
                      <br /> Phone: {userData.personalInfo.phoneNumber} <br /> Email:{" "}
                      {userData.email}
                    </p>
                    <p className="text-[#9DA1A7]">Shipping address:</p>
                    <p>{order?.shippingAddress}</p>
                    <p className="text-[#9DA1A7]">Payment:</p>
                    <p>Shipping fee: $14</p>
                    <p> Total paid: ${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              {orders == undefined && <Link to={"/cart"}>No Orders Yet</Link>}
            </div>
          </div>
        </div>
      </div>

      <footer className="">
        <p className="flex items-center gap-1 p-5">
          <img src={logoSymbol} alt="logo" className="max-w-full" />
          <img src={brand} alt="logo" className="max-w-full" />
        </p>
        <p className="px-5 text-base font-normal text-neutral-600 ">
          Best information about the company lies here but now lorem ipsum is
        </p>
        <div className="flex gap-2 px-5 py-2">
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={youtube} alt="" />
          <img src={instagram} alt="" />
          <img src={linkedin} alt="" />
        </div>
        <div className="flex  p-5 w-[90%] text-gray-400 text-base font-normal   leading-normal">
          <ol className="m-auto">
            <li className="pb-2 text-base font-medium leading-snug text-zinc-900">About</li>
            <li>About Us</li>
            <li>Find store</li>
            <li>Categories</li>
            <li>Blogs</li>
          </ol>
          <ol className="m-auto">
            <li className="pb-2 text-base font-medium leading-snug text-zinc-900">Partnership</li>
            <li>About Us</li>
            <li>Find store</li>
            <li>Categories</li>
            <li>Blogs</li>
          </ol>
        </div>
        <div className="flex  p-5 w-[85%] text-gray-400 text-base font-normal   leading-normal">
          <ol className="m-auto">
            <li className="pb-2 text-base font-medium leading-snug text-zinc-900">Information</li>
            <li>Help Center</li>
            <li>Money Refund</li>
            <li>Shipping</li>
            <li>Contact us</li>
          </ol>
          <ol className="m-auto">
            <li className="pb-2 text-base font-medium leading-snug text-zinc-900">For users</li>
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
        <p className="flex items-center gap-4 py-5 bg-gray-100 justify-evenly">
          © 2023 Ecommerce.
          <span className="flex gap-3">
            <img src={america} alt="" />
            English
          </span>
        </p>
      </footer>
    </div>
  );
};

export default ProfileMobile;
