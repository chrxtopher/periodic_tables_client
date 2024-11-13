import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const Layout = () => {
  ///
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: "",
    children: [],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
