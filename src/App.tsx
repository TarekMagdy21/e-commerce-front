import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Outlet} from "react-router-dom";
import Home from "./components/Home/Home";
import {ThemeProvider} from "./components/theme-provider";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ProductsUI from "./components/product/ProductsUI";
import ProductsTable from "./components/product/ProductsTable";
import TagTest from "./components/product/TagTest";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import ProductUI from "./components/product/ProductUI";
 
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
        <Route path="/products" element={<ProductsUI />}>
          <Route index element={<ProductsTable />} />
          <Route path="/products/test" element={<TagTest />} />
        </Route>
        <Route path="/product"  element={<ProductUI />}>
          <Route path="/product/:category/:id" element={<ProductDetails />} />
        </Route>
        <Route path="/cart">
          <Route index element={<Cart />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
