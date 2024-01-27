import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ProductsUI from "./components/product/ProductsUI";
import ProductsTable from "./components/product/ProductsTable";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import ProductUI from "./components/product/ProductUI";
import WishList from "./components/wishlist/WishList";
import Profile from "./components/profile/Profile";
import ErrorPage from "./ErrorPage";
import Test from "./components/test/Test";
import CartResult from "./components/cart/cartResult/CartResult";

const Layout = () => {
  return <Outlet />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Specify the element for the nested route */}
          <Route index element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/cancel" element={<CartResult />} />
          <Route path="/success" element={<CartResult />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
        <Route path="/products" element={<ProductsUI />}>
          <Route index element={<ProductsTable />} />
          <Route path="/products/:category" element={<ProductsTable />} />
        </Route>
        <Route path="/product" element={<ProductUI />}>
          <Route path="/product/:category/:id" element={<ProductDetails />} />
        </Route>
        <Route path="/cart">
          <Route index element={<Cart />} />
        </Route>
        <Route path="/wishlist">
          <Route index element={<WishList />} />
        </Route>
        <Route path="/profile">
          <Route index element={<Profile />} />
        </Route>
        <Route path="/404">
          <Route index element={<ErrorPage />} />
        </Route>
        {/* Redirect to home page for unknown routes */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
