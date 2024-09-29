import { FC, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
import { updateModal } from "../redux/features/authSlice";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import CustomPopup from "./CustomPopup";
import { updateDarkMode } from "../redux/features/homeSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );
  const username = useAppSelector((state) => state.authReducer.username);
  const isDarkMode = useAppSelector((state) => state.homeReducer.isDarkMode);
  const { requireAuth } = useAuth();
  
  const [isMenuOpen, setMenuOpen] = useState(false);

  const showCart = () => {
    requireAuth(() => dispatch(setCartState(true)));
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="py-4 bg-white dark:bg-slate-800 top-0 sticky z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white"
            data-test="main-logo"
          >
            Shopify
          </Link>

          {/* Search bar (hidden on small screens) */}
          <div className="hidden lg:flex w-full max-w-[500px]">
            <input
              type="text"
              placeholder="Search for a product..."
              className="border-2 border-blue-500 px-6 py-2 w-full dark:text-white dark:bg-slate-800"
            />
            <div className="bg-blue-500 text-white text-[26px] grid place-items-center px-4">
              <BsSearch />
            </div>
          </div>

          {/* Icons and links */}
          <div className="flex gap-4 md:gap-8 items-center dark:text-white">
            {/* Hamburger menu (visible on mobile) */}
            <button className="lg:hidden text-2xl" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navigation links */}
            <div
              className={`lg:flex flex-col lg:flex-row items-center gap-4 lg:gap-8 ${
                isMenuOpen ? "block" : "hidden"
              } lg:block absolute lg:static top-full left-0 w-full lg:w-auto bg-white dark:bg-slate-800 lg:bg-transparent p-4 lg:p-0 z-50`}
            >
              <Link
                to="/products"
                className="text-xl font-bold"
                data-test="main-products"
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-xl font-bold"
                data-test="main-categories"
              >
                Categories
              </Link>
            </div>

            {/* User section */}
            <div className="flex items-center gap-2">
              {username !== "" ? (
                <img
                  src="https://robohash.org/Terry.png?set=set4"
                  alt="avatar"
                  className="w-6"
                />
              ) : (
                <FaUser className="text-gray-500 text-2xl dark:text-white" />
              )}
              <div className="text-gray-500 text-2xl">
                {username !== "" ? (
                  <CustomPopup />
                ) : (
                  <span
                    className="cursor-pointer hover:opacity-85 dark:text-white"
                    onClick={() => dispatch(updateModal(true))}
                    data-test="login-btn"
                  >
                    Login
                  </span>
                )}
              </div>
            </div>

            {/* Cart icon */}
            <div
              className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
              onClick={showCart}
              data-test="cart-btn"
            >
              <AiOutlineShoppingCart className="dark:text-white" />
              <div
                className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
                data-test="cart-item-count"
              >
                {cartCount}
              </div>
            </div>

            {/* Dark mode toggle */}
            <div
              onClick={() => {
                dispatch(updateDarkMode(!isDarkMode));
                document.body.classList.toggle("dark");
              }}
            >
              {isDarkMode ? (
                <MdOutlineLightMode className="cursor-pointer" size={30} />
              ) : (
                <MdOutlineDarkMode className="cursor-pointer" size={30} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
