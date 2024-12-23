import React from "react";

const Searchbar = () => {
  return (
    <div className="pt-20 px-5 md:pt-32 md:px-10">
      {/* Heading */}
      <h1 className="font-extrabold text-xl md:text-2xl font-Montserrat text-white">
        Find Customer Records Here
      </h1>
      <h4 className="font-Montserrat font-light text-white text-sm md:text-base">
        We are glad to have you around. Feel <br className="hidden md:block" />
        free to browse the application
      </h4>

      {/* Search Input */}
      <div className="pt-4 relative">
        <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 hover:text-blue-500 transition duration-200 ease-in-out transform hover:scale-110 mt-4"
            fill="none"
            viewBox="0 0 25 25"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search Here"
          className="md:w-0/1.8 h-10 border border-gray-300 rounded-3xl px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 shadow-lg"
        />
      </div>
    </div>
  );
};

export default Searchbar;
