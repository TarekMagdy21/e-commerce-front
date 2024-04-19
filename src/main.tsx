import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/src/sweetalert2.scss";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home/Home.tsx";
import Test from "./components/test/Test.tsx";
import CartResult from "./components/cart/cartResult/CartResult.tsx";
import Login from "./components/auth/Login.tsx";
import SignUp from "./components/auth/SignUp.tsx";
import ProductsUI from "./components/product/ProductsUI.tsx";
import ProductsTable from "./components/product/ProductsTable.tsx";
import ProductUI from "./components/product/ProductUI.tsx";
import ProductDetails from "./components/product/ProductDetails.tsx";
import Cart from "./components/cart/Cart.tsx";
import WishList from "./components/wishlist/WishList.tsx";
import Profile from "./components/profile/Profile.tsx";
import ErrorPage from "./ErrorPage.tsx";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/test", element: <Test /> },
  { path: "/cancel", element: <CartResult /> },
  { path: "/success", element: <CartResult /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignUp /> },
  {
    path: "/products",
    element: <ProductsUI />,
    children: [
      { index: true, element: <ProductsTable /> },
      { path: "/products/:category", element: <ProductsTable /> },
    ],
  },
  {
    path: "/product",
    element: <ProductUI />,
    children: [{ path: ":category/:id", element: <ProductDetails /> }],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
  { path: "*", element: <Navigate to="/404" replace /> },
]);

if (process.env.NODE_ENV === "production") disableReactDevTools();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ToastContainer />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
