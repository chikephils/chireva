import React from "react";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`block md:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((item, index) => (
          <div className="flex" key={index}>
            <Link
              to={item.url}
              className={`${
                active === index + 1
                  ? "text-lime-600 md:text-white"
                  : "text-gray-700"
              } text-[16px] lg:text-base font-[500] px-2 lg:px-6 cursor-pointer ${
                item.title === "Best Selling" ? "whitespace-nowrap" : ""
              } mb-5 md:mb-0 md:px-2 `}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
