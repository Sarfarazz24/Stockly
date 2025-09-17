import React, { act, useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const menuClass = "menu";
  const activateMenuClass = "menu selected";

  const handleProfileClick = (index) => [
    setIsProfileDropdownOpen(!isProfileDropdownOpen),
  ];
  return (
    <>
      <div className="menu-container">
        <img src="logo.png" style={{ width: "50px" }} />
        <div className="menus">
          <ul>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                to="/dashboard"
                onClick={() => handleMenuClick(0)}
              >
                <p
                  className={selectedMenu === 0 ? activateMenuClass : menuClass}
                >
                  Dashboard
                </p>
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                to="/orders"
                onClick={() => handleMenuClick(1)}
              >
                <p
                  className={selectedMenu === 1 ? activateMenuClass : menuClass}
                >
                  Orders
                </p>
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                to="/holdings"
                onClick={() => handleMenuClick(2)}
              >
                <p
                  className={selectedMenu === 2 ? activateMenuClass : menuClass}
                >
                  Holdings
                </p>
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                to="/positions"
                onClick={() => handleMenuClick(3)}
              >
                <p
                  className={selectedMenu === 3 ? activateMenuClass : menuClass}
                >
                  Positions
                </p>
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                to="/funds"
                onClick={() => handleMenuClick(4)}
              >
                <p
                  className={selectedMenu === 4 ? activateMenuClass : menuClass}
                >
                  Funds
                </p>
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                to="/apps"
                onClick={() => handleMenuClick(6)}
              >
                <p
                  className={selectedMenu === 6 ? activateMenuClass : menuClass}
                >
                  Apps
                </p>
              </Link>
            </li>
          </ul>
          <hr />
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">ZU</div>
            <p className="username">USERID</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
