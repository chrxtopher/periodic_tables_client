import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <a className="navbar-brand" href="/">
        Periodic Tables
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <nav className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Dashboard
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              New
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/tables/new">
                Table
              </a>
              <a class="dropdown-item" href="/reservations/new">
                Reservation
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/search">
              Search
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
