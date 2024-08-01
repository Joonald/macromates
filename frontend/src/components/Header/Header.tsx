import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSignUpModalDispatch } from "../../contexts/modal";

function HeaderLinks() {
  return (
    <ul className='md:w-full md:justify-between md:flex md: gap-8'>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-green-600" : "text-black-800"
          }
          to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-green-600" : "text-black-800"
          }
          to='/about'>
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-green-600" : "text-black-800"
          }
          to='/discover'>
          Discover
        </NavLink>
      </li>
    </ul>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useSignUpModalDispatch();

  function openModal(type: string) {
    if (type === "signup") {
      dispatch({ type: "OPEN_SIGNUP" });
    }
    if (type === "login") {
      dispatch({ type: "OPEN_LOGIN" });
    }
  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className=' box-content h-12 font-poppins sticky top-0 z-30 mx-auto flex flex-wrap items-center justify-between md:justify-between border-b border-primary-800 uppercase p-4 bg-white'>
      <Link to='/'>
        <h1 className='text-xl text-primary-800'>MacroMates</h1>
      </Link>
      <div className='flex justify-between items-center gap-4'>
        <nav className='hidden  md:flex'>
          <HeaderLinks />
        </nav>
        <div className='order-2'>
          <button
            onClick={() => openModal("login")}
            className='hidden py-2 px-4 rounded-2xl bg-gray-200 text-sm md:inline md: mr-2'>
            Log In
          </button>
          <button
            onClick={() => openModal("signup")}
            className='py-2 px-4 bg-primary-800 rounded-2xl text-sm text-slate-50'>
            Sign Up
          </button>
        </div>
        <div className='md:hidden order-last'>
          <button onClick={toggleNavbar}>
            {isOpen ? (
              <FontAwesomeIcon
                icon={faX}
                size='2x'
                fixedWidth
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                size='2x'
                fixedWidth
              />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav
          className={`flex basis-full flex-col items-center transition-all duration-300 ease-out border-t border-primary-800 pt-4 pb-4 absolute left-0 right-0 top-20 z-5 bg-white border-b ${
            isOpen ? "animate-fadeIn" : "animate-fadeOut hidden"
          }`}>
          <HeaderLinks />
        </nav>
      )}
    </header>
  );
}

export default Header;
