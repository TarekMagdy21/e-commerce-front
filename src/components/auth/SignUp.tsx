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
import { useAddNewUserMutation } from "@/store/apis/userApi/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
const SignUp = () => {
  const navigate = useNavigate();
  const [register] = useAddNewUserMutation();
  const [showPassword, setShowPassword] = useState(true);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form data.
    // ✅ This will be type-safe and validated.
    console.log(data);
    try {
      const result = await register(data).unwrap();
      console.log("Result", result);
      navigate("/login");
      toast.success("Account Successfully Created");
    } catch (err: any) {
      if (!err.status) {
        toast.error("No Server Response");
      } else if (err.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error(err.data?.message);
      }
    }
  };
  return (
    <section className="w-screen h-screen bg-chair bg-cover bg-left flex items-center justify-center md:justify-end md:pr-10 lg:pr-[15rem] font-poppins ">
      <div className="bg-white bg-opacity-75 border rounded-xl mt-5 p-3 lg:p-10 pt-10  ">
        <div className="flex gap-4 ">
          <p>
            Welcome to <span className="text-[#4C85BD]">MATGARY</span>
          </p>
          <p>
            Have an Account? <br />
            <span
              className="text-[#4C85BD] cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </span>
          </p>
        </div>
        <p className="text-5xl my-10 ">Sign up</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">User name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                        {showPassword ? (
                          <Eye
                            className="h-6 w-6"
                            onClick={() => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeOff
                            className="h-6 w-6"
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
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SignUp;
