// ErrorPage.js

import {Link} from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-md shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">404 Not Found</h1>
        <p className="text-gray-600">
          The page you are looking for might be under construction or does not exist.
        </p>
        <div className="">
          <Link to="/" className="block mt-4 text-blue-500 hover:underline">
            Home Page
          </Link>
          <Link to="/products" className="block mt-4 text-blue-500 hover:underline">
            Products Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
