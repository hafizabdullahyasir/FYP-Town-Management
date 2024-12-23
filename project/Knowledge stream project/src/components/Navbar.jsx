import React from "react";
import { MdOutlineRoofing } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          px-4
          text-lg text-white
          bg-transparent
        "
      >
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-white text-[2rem] gap-2 flex items-center justify-center"
          >
            <MdOutlineRoofing />
            <span className="text-[1rem] font-bold font-Montserrat">
              Chaudhary Developers
            </span>
          </Link>
        </div>

        {/* Menu Section */}
        <div
          className="w-full md:flex md:items-center md:w-auto hidden md:block"
          id="menu"
        >
          <ul
            className="
            pt-4
            text-base text-gray-700
            md:flex
            md:justify-between 
            md:pt-0
            font-semibold
          "
          >
            {/* Home Link */}
            <li>
              <Link
                to="/"
                className="md:p-4 py-2 block text-white hover:text-blue-900 transition duration-200 ease-in-out transform hover:scale-110 font-Montserrat"
              >
                Home
              </Link>
            </li>

            {/* Towns Link */}
            <li>
              <Link
                to="/towns"
                className="md:p-4 py-2 block text-white hover:text-blue-900 transition duration-200 ease-in-out transform hover:scale-110 font-Montserrat"
              >
                Towns
              </Link>
            </li>

            {/* Ledger Book Link */}
            <li>
              <Link
                to="/leadger-book"
                className="md:p-4 py-2 block text-white hover:text-blue-900 transition duration-200 ease-in-out transform hover:scale-110 font-Montserrat"
              >
                Leadger Book
              </Link>
            </li>

            {/* Receipt Link */}
            <li>
              <Link
                to="/recipet"
                className="md:p-4 py-2 block text-white hover:text-blue-900 transition duration-200 ease-in-out transform hover:scale-110 font-Montserrat"
              >
                Receipt
              </Link>
            </li>

            {/* Signup Link
            <li>
              <Link
                to="/signup"
                className="md:p-4 py-2 block text-white hover:text-blue-900 transition duration-200 ease-in-out transform hover:scale-110 font-Montserrat"
              >
                Sign Up
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
