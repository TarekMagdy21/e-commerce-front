import {Link} from "react-router-dom";
import {useGetCurrentUserQuery, useUpdateUserMutation} from "@/store/apis/userApi/usersApiSlice";
import profilePic from "../../../assets/Avatar.svg";
import {RiPencilFill} from "react-icons/ri";
import {useEffect, useState} from "react";
import {useGetOrdersQuery, useUpdateOrderMutation} from "@/store/apis/orderApi/orderApi";
import {RxDotFilled} from "react-icons/rx";
import moment from "moment";
import {useForm} from "react-hook-form";
import TextFieldHookForm from "@/components/shared/TextFieldHookForm";

const ProfileWeb = () => {
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
        email: userData.email,
        firstName: userData.personalInfo.firstName,
        lastName: userData.personalInfo.lastName,
        phoneNumber: userData.personalInfo.phoneNumber,
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
    return (
      <div className="text-center my-10">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 font-inter">
      <div className=" max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl  py-10">
        <div className="bg-white rounded-lg p-5 border">
          <p className=" font-[600] text-xl  mb-4">Personal info</p>
          <div className="flex gap-4 ">
            <img src={profilePic} alt="profilePic" className="w-16 mb-auto " />
            {edit ? (
              <div>
                <div className="grid grid-cols-2 gap-3  ">
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
                  className="w-full mt-4 p-3 bg-blue-500 hover:bg-blue-600  border rounded   text-white"
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
            <div className="grid grid-cols-3 gap-4">
              {orders?.orders.map((order: any, index: number) => (
                <div className="  border-blue-500 border rounded-md p-5 mt-4" key={order._id}>
                  <div>
                    <h1 className="font-semibold flex items-center  ">
                      Order ID: {index + 1} <RxDotFilled className="text-gray-400 w-4 h-3" />{" "}
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
                          className="px-3 duration-300 transition ease-in-out hover:bg-red-500 hover:text-white border border-red-500 text-red-500 p-2 rounded-lg">
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
    </div>
  );
};

export default ProfileWeb;
