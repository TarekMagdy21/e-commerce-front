import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/store/apis/auth/authApiSlice";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});
const Login = () => {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form data.
    // ✅ This will be type-safe and validated.
    try {
      await loginUser(data)
        .unwrap()
        .then((payload) => {
          setCookie("token", payload?.accessToken);
          localStorage.setItem("userId", payload?.userId);
        });
      navigate("/");
      toast.success("Successfully Signed in");
    } catch (err: any) {
      if (!err.status) {
        toast.error("No Server Response");
      } else if (err.data?.message) {
        toast.error(err.data?.message);
      } else if (err.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.status === 401) {
        toast.error("Unauthorized");
      }
    }
  };

  return (
    <section className="w-screen h-screen bg-chair bg-cover bg-left flex items-center justify-center md:justify-end md:pr-10 lg:pr-[15rem] font-poppins  ">
      <div className="p-6 pt-10 mt-5 bg-white bg-opacity-75 border rounded-xl ">
        <div className="flex gap-4 ">
          <p>
            Welcome to <span className="text-[#4C85BD]">MATGARY</span>
          </p>
          <p>
            No Account? <br />
            <span
              className="text-[#4C85BD] cursor-pointer "
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </span>
          </p>
        </div>
        <p className="my-10 text-5xl ">Sign in</p>
        {/* <div className="flex items-center ">
         <div className="flex p-4 w-fit items-center gap-3 text-[#4285F4]  rounded bg-[#E9F1FF]">
            <FcGoogle size={20} /> Sign in with Google
          </div>
          <div className="p-4 ml-2 bg-white rounded ">
            <FaFacebook color={"blue"} size={20} />
          </div> 
        </div> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col mt-4 space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="ml-3">
                    {" "}
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "password" : "text"}
                        placeholder="Password"
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer">
                        {showPassword ? (
                          <Eye
                            className="w-6 h-6"
                            onClick={() => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeOff
                            className="w-6 h-6"
                            onClick={() => {
                              setShowPassword(true);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size={"lg"} type="submit" className="ml-auto bg-[#4285F4]">
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
