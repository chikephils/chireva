import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assests/img/logo.png";
import { categoriesData } from "../../static/data";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import styles from "../../styles/styles";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "../Layout/DropDown";
import Navbar from "../Layout/Navbar";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import WishList from "../WishList/WishList";
import { itemsInCart } from "../../features/cart/cartSlice";
import { selectWishListItems } from "../../features/wishlist/wishlistSlice";

const Header = ({ activeHeading }) => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const user = useSelector((state) => state?.user.user);
  const [openMenu, setOpenMenu] = useState(false);
  const cartItems = useSelector(itemsInCart);
  const products = useSelector((state) => state.products.products);
  const wishList = useSelector(selectWishListItems);
  const seller = useSelector((state) => state.shop.seller);


  const navigate = useNavigate();

  const dropDownToogle = () => {
    setDropDown(!dropDown);
  };

  const menuToggle = () => {
    setOpenMenu(!openMenu);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filteredProducts =
      products &&
      products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  return (
    <>
      <div className={`  fixed w-full top-0 z-50 scroll-pb-10`}>
        <div className=" hidden md:h-[45px] md:flex items-center w-full p-4 justify-between  bg-lime-600 border border-b-1 border-white ">
          <div>
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className=" w-10 h-10 my-1"
                onClick={() => setDropDown(false)}
              />
            </Link>
          </div>

          {/*Search Bar */}
          <div className="w-[40%] lg:w-[50%] relative">
            <input
              type="search"
              placeholder={`\u{1F50D} Search Products...`}
              value={search}
              onFocus={() => setDropDown(false)}
              onChange={handleSearch}
              className="h-[30px] w-full px-2 border-lime-500 border-[2px] rounded-md cursor-pointer"
            />

            {search && searchData.length !== 0 ? (
              <div className="absolute max-h-[60vh] bg-slate-50 shadow-sm z-50 p-4 overflow-y-scroll scrollbar-thin w-full border border-black pb-2">
                {searchData &&
                  searchData.map((data) => {
                    const displayName =
                      data.name.length > 35
                        ? data.name.slice(0, 30) + "..."
                        : data.name;
                    return (
                      <Link key={data._id} to={`/product/${data._id}`}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={`${data?.images[0]?.url}`}
                            alt="log"
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{displayName}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button} !h-[35px] !w-max p-2`}>
            {seller ? (
              <Link to={`/shop/${seller._id}`}>
                <p className="text-white flex items-center">
                  Go to Shop <IoIosArrowForward className="ml-1" />
                </p>
              </Link>
            ) : (
              <div onClick={() => navigate("/create-shop")}>
                <p className="text-white flex items-center">
                  Become a Seller <IoIosArrowForward className="ml-1" />
                </p>
              </div>
            )}
          </div>
        </div>
        <div className=" hidden md:flex shadow-sm items-center justify-between w-full bg-lime-600 h-[55px]">
          <div
            className={`w-full lg:w-11/12 lg:mx-auto mx-2 relative ${styles.normalFlex} justify-between`}
          >
            {/* categories */}
            <div onClick={dropDownToogle}>
              <div className="hidden md:block relative h-[40px] md:w-[200px] lg:w-[270px]">
                <BiMenuAltLeft
                  size={30}
                  className="absolute top-1 left-2 cursor-pointer"
                />
                <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-md">
                  All Categories
                </button>
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={dropDownToogle}
                />
                {dropDown ? (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>

            {/*Navbar */}
            <div className={`${styles.normalFlex}`}>
              <Navbar active={activeHeading} />
            </div>
            <div className="flex">
              <div className={`${styles.normalFlex}`}>
                <div
                  className="relative cursor-pointer mr-[10px] lg:mr-[15px] "
                  onClick={() => setOpenWishList(!openWishList)}
                >
                  <AiOutlineHeart size={30} color="white" />
                  {wishList?.length > 0 && (
                    <div className=" absolute -top-2 -right-3 w-6 h-6 rounded-full bg-black flex items-center justify-center">
                      <p className="text-xs text-white font-semibold">
                        {wishList?.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className={`${styles.normalFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px] "
                  onClick={() => setOpenCart(!openCart)}
                >
                  <AiOutlineShoppingCart size={30} color="white" />
                  {cartItems?.length > 0 && (
                    <div className=" absolute -top-2 -right-3 w-6 h-6 rounded-full bg-black flex items-center justify-center">
                      <p className="text-xs text-white font-semibold">
                        {cartItems?.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className={`${styles.normalFlex}`}>
                <div className="relative cursor-pointer">
                  {user ? (
                    <Link to="/profile">
                      <img
                        src={`${user?.avatar?.url}`}
                        className=" w-[40px] h-[40px] rounded-full"
                        alt="bmg"
                      />
                    </Link>
                  ) : (
                    <div onClick={() => navigate("/login")}>
                      <CgProfile size={28} color="white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/*Wishlist popUp */}
              {openWishList ? (
                <WishList setOpenWishList={setOpenWishList} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className=" flex md:hidden shadow-sm items-center justify-between w-full bg-lime-600 h-[70px] fixed top-0 z-50">
        <div className={`${styles.section}`}>
          <header className="w-full flex items-center justify-between">
            {/* Left Section */}
            <div className="w-1/4 flex flex-col justify-start">
              <BiMenuAltLeft
                size={40}
                color="white"
                className="cursor-pointer"
                onClick={menuToggle}
              />
              <div
                className="block md:hidden relative h-[27px] pb-1 ml-2"
                onClick={dropDownToogle}
              >
                <button className="h-[100%] p-2 flex justify-between items-center bg-white font-sans text-[12px] font-medium select-none rounded-md">
                  Categories <IoIosArrowDown size={20} />
                </button>
                {dropDown ? (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>

            {/* Center Section */}
            <div className="w-1/4 flex justify-center">
              <Link to="/">
                <img
                  src={Logo}
                  alt="logo"
                  className="cursor-pointer w-[50px] h-[55px]"
                  onClick={() => setOpenMenu(false)}
                />
              </Link>
            </div>

            {/* Right Section */}
            <div className="w-1/4 flex items-center justify-end">
              <div className="relative">
                <AiOutlineShoppingCart
                  size={30}
                  color="white"
                  className="cursor-pointer mr-2"
                  onClick={() => setOpenCart(!openCart)}
                />
                {cartItems.length > 0 && (
                  <div className=" absolute -top-3 -right-1 w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <p className="text-xs text-white font-semibold">
                      {cartItems.length}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>

        {/* Header Side-Bar */}
        {openMenu && (
          <div className="fixed w-full bg-[#0000005f] z-50 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-slate-50 h-screen top-0 z-10 rounded-lg overflow-y-auto scrollbar-thin">
              <div className="w-full flex justify-between pr-3">
                <div>
                  <div
                    className="relative mr-[15px] cursor-pointer"
                    onClick={() => setOpenWishList(!openWishList)}
                  >
                    <AiOutlineHeart size={30} className="ml-4 mt-5" />
                    <span className="absolute right-0 top-0 rounded-full bg-lime-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {wishList.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5 cursor-pointer"
                  onClick={menuToggle}
                />
                {/*Wishlist popUp */}
                {openWishList ? (
                  <WishList setOpenWishList={setOpenWishList} />
                ) : null}
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder={`\u{1F50D} Search Products...`}
                  value={search}
                  onChange={handleSearch}
                  className="h-[40px] w-full px-2 border-lime-500 border-[2px] rounded-md cursor-pointer"
                />
                {search && searchData.length !== 0 ? (
                  <div className="absolute max-h-[60vh] bg-slate-200 shadow-sm z-20 p-2 w-full overflow-y-scroll scrollbar-thin">
                    {searchData &&
                      searchData.map((data) => {
                        const displayName =
                          data.name.length > 35
                            ? data.name.slice(0, 35) + "..."
                            : data.name;
                        return (
                          <Link key={data._id} to={`/product/${data._id}`}>
                            <div className="w-full flex items-start py-3">
                              <img
                                src={`${data?.images[0]?.url}`}
                                alt="log"
                                className="w-[40px] h-[40px] mr-2"
                              />
                              <p className="text-[12px]">{displayName}</p>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>

              {/*Navbar */}
              <div className={`${styles.section}`}>
                <Navbar active={activeHeading} />
              </div>
              <br />
              <div
                className={`${styles.section} flex items-center justify-center`}
              >
                <div className={`${styles.button}`}>
                  {seller ? (
                    <Link to={`/shop/${seller?._id}`}>
                      <p className="text-white flex items-center">
                        Go to Shop <IoIosArrowForward className="ml-1" />
                      </p>
                    </Link>
                  ) : (
                    <div onClick={() => navigate("/create-shop")}>
                      <p className="text-white flex items-center">
                        Become a Seller <IoIosArrowForward className="ml-1" />
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <br />
              <div className="flex w-full justify-center">
                {user ? (
                  <>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        className=" w-[60px] h-[60px] rounded-full border-[1.5px] border-lime-500"
                        alt="bmg"
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[16px] pr-[10px] text-black"
                    >
                      Login /
                    </Link>
                    <Link to="/register" className="text-[16px]  text-black">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
