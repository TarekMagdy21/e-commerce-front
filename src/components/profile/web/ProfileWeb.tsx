import { Link } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "@/store/apis/userApi/usersApiSlice";
import profilePic from "../../../assets/Avatar.svg";
import { RiPencilFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/store/apis/orderApi/orderApi";
import { RxDotFilled } from "react-icons/rx";
import moment from "moment";
import { useForm } from "react-hook-form";
import TextFieldHookForm from "@/components/shared/TextFieldHookForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ProfileWeb = () => {
  // const ordersData = [
  //   {
  //     _id: "1",
  //     status: "pending",
  //     createdAt: new Date(),
  //     totalPrice: 200,
  //     shippingAddress: "asdasd",
  //   },
  // ];
  const { watch, reset, control } = useForm({
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
  const { data: userData, isLoading } = useGetCurrentUserQuery({ userId });
  const [updateUser, { isLoading: userUpdateLoading }] =
    useUpdateUserMutation();
  const { data: orders } = useGetOrdersQuery({ userId });
  const [updateOrder] = useUpdateOrderMutation({});
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

  useEffect(() => {
    if (userUpdateLoading) {
      window.location.reload();
    }
  }, [userUpdateLoading]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div
      className={`bg-gray-100 font-inter ${
        orders?.orders?.length === 0 && "h-[48.6vh]"
      }`}
    >
      <div className="max-w-2xl py-10 mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
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
                    <TextFieldHookForm
                      name="email"
                      control={control}
                      label="E-mail"
                      errors={""}
                    />
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
                  }}
                >
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
            <h1 className="text-lg text-[#212529] leading-6 ">
              My recent orders
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {orders?.orders.map((order: any, index: number) => (
                <div
                  className="p-5 mt-4 border border-blue-500 rounded-md "
                  key={order._id}
                >
                  <div>
                    <h1 className="flex items-center font-semibold ">
                      Order ID: {index + 1}{" "}
                      <RxDotFilled className="w-4 h-3 text-gray-400" />{" "}
                      <span
                        className={` font-normal ${
                          order.status == "Pending"
                            ? "text-[#FF8100]"
                            : "text-[#00A524]"
                        }`}
                      >
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
                          className="p-2 px-3 text-red-500 transition duration-300 ease-in-out border border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                        >
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
                          className="px-3 duration-300 transition ease-in-out border  hover:bg-blue-800  bg-[#0D6EFD] text-white p-2 rounded-lg"
                        >
                          Track order
                        </button>
                      </div>
                    )}
                    <hr className="my-3" />
                    <p className="text-[#9DA1A7]">Contact:</p>
                    <p>
                      {userData?.personalInfo?.firstName +
                        " " +
                        userData?.personalInfo?.lastName}{" "}
                      <br /> Phone: {userData.personalInfo.phoneNumber} <br />{" "}
                      Email: {userData?.email}
                    </p>
                    <p className="text-[#9DA1A7]">Shipping address:</p>
                    <p>{order?.shippingAddress}</p>
                    <p className="text-[#9DA1A7]">Payment:</p>
                    <p>Shipping fee: $14</p>
                    <p> Total paid: ${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              {orders == undefined && (
                <div>
                  <p>No Orders Yet</p>
                  <Link to={"/cart"} className="text-blue-500">
                    Go To Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWeb;
