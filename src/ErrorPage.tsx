// ErrorPage.js

import {Link} from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 Not Found</h1>
        <p className="text-gray-600">
          The page you are looking for might be under construction or does not exist.
        </p>
        <div className="">
          <Link to="/" className="text-blue-500 hover:underline mt-4 block">
            Home Page
          </Link>
          <Link to="/products" className="text-blue-500 hover:underline mt-4 block">
            Products Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
