import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {store} from "./store/store.ts";
import {Provider} from "react-redux";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";
import "react-toastify/dist/ReactToastify.css";
import 'sweetalert2/src/sweetalert2.scss'

if (process.env.NODE_ENV === "production") disableReactDevTools();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
