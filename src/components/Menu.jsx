import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new">
              New Table
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
