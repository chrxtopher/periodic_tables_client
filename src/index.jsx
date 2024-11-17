import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Menu from "./components/Menu.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SearchReservation from "./pages/SearchReservation.jsx";
import NewReservation from "./pages/NewReservation.jsx";
import SeatReservation from "./pages/SeatReservation.jsx";

const Layout = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 side-bar min-vh-100">
            <Menu />
          </div>
          <div className="col-md">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/search",
        element: <SearchReservation />,
      },
      {
        path: "/reservations",
        element: <App />,
      },
      {
        path: "/reservations/new",
        element: <NewReservation updating={false} />,
      },
      {
        path: "/reservations/:reservation_id/seat",
        element: <SeatReservation />,
      },
      {
        path: "/reservations/:reservation_id/edit",
        element: <NewReservation updating={true} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
