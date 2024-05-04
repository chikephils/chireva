import React from "react";
import Logo from "../../Assests/img/logo.png";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className=" md:flex md:justify-between md:items-center sm:px-12 px-4 bg-lime-600 py-3">
        <h1 className="xl:text-xl text-lg sm:text-xl md:mb-0 mb-6 800px:leading-normal font-semibold md-w-2/5 text-black">
          <span className=" text-white text-xl sm:text-3xl">Subscribe</span>{" "}
          <br />
          with us to get news <br />
          events and offers
        </h1>

        <div>
          <input
            type="text"
            required
            placeholder="Enter your Email"
            className="text-gray-800 sm:w-72 w-full sm:mr-1 800px:mb-0 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-blue-700 hover:bg-blue-800 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full mt-3">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 800px:grid-cols-4 gap-6 sm:px-5 px-5 py-6 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src={Logo}
            alt="logo"
            className=" brightness-0 filter-none invert-1 w-18 h-16"
          />
          <p>The home of beautiful products</p>
          <div className=" flex items-center mt-[15px]">
            <AiFillFacebook size={25} className=" cursor-pointer" />
            <AiOutlineTwitter size={25} className="ml-[15px] cursor-pointer" />
            <AiFillInstagram size={25} className="ml-[15px] cursor-pointer" />
            <AiFillYoutube size={25} className="ml-[15px] cursor-pointer" />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold"> Company </h1>
          {footerProductLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold"> Shop </h1>
          {footercompanyLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold"> Support </h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 800px:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8 sm:mr-4">
        <span>&copy;2022 GOT. All rights reserved. </span>
        <span>Terms Privacy Policy</span>
        <div className="flex justify-center items-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
