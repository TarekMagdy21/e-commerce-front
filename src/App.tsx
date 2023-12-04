import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

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
      </Routes>
    </ThemeProvider>
  );
}

export default App;
