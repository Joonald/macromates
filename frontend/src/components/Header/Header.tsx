import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSignUpModalDispatch } from "../../contexts/modal";
import { useAuth } from "../../contexts/auth";
import useClickOutside from "../../hooks/useClickOutside";
import HeaderLink from "../HeaderLink/HeaderLink";
import { HeaderLinkProps } from "../../interfaces/HeaderInterface";

function HeaderLinks({ mobile = false, toggleNavbar }: HeaderLinkProps) {
  const { isAuthenticated } = useAuth();

  return (
    <ul className='md:w-full md:justify-between md:flex md: gap-8'>
      <li>
        <HeaderLink
          mobile={mobile}
          toggleNavbar={toggleNavbar}
        />
      </li>
      <li>
        <HeaderLink
          mobile={mobile}
          toggleNavbar={toggleNavbar}
          to='about'
        />
      </li>
      <li>
        <HeaderLink
          mobile={mobile}
          toggleNavbar={toggleNavbar}
          to='discover'
        />
      </li>
      {mobile && (
        <li>
          <HeaderLink
            mobile={mobile}
            toggleNavbar={toggleNavbar}
            to='sign up'
          />
        </li>
      )}
      {isAuthenticated && (
        <li>
          <HeaderLink
            mobile={mobile}
            toggleNavbar={toggleNavbar}
            to='profile'
          />
        </li>
      )}
    </ul>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useSignUpModalDispatch();
  const { isAuthenticated, logout } = useAuth();
  const navRef = useRef<HTMLDivElement | null>(null);

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

  useClickOutside({
    ref: navRef,
    callback: () => {
      if (isOpen) toggleNavbar();
    },
  });

  return (
    <header
      ref={navRef}
      className=' box-content h-12 font-poppins sticky top-0 z-30 mx-auto flex flex-wrap items-center justify-between md:justify-between border-b border-primary-800 uppercase p-4 bg-white'>
      <Link to='/'>
        <h1 className='text-xl text-primary-800'>MacroMates</h1>
      </Link>
      <div className='flex justify-between items-center gap-4'>
        <nav className='hidden  md:flex'>
          <HeaderLinks />
        </nav>
        {isAuthenticated ? (
          <div>
            <button
              onClick={logout}
              className='py-2 px-4 rounded-2xl bg-gray-200 text-sm md:inline md: mr-2'>
              Log Out
            </button>
          </div>
        ) : (
          <div className='order-2'>
            <button
              onClick={() => openModal("login")}
              className='py-2 px-4 rounded-2xl bg-gray-200 text-sm md: mr-2'>
              Log In
            </button>
            <button
              onClick={() => openModal("signup")}
              className='hidden py-2 px-4 bg-primary-800 rounded-2xl text-sm text-slate-50 md:inline'>
              Sign Up
            </button>
          </div>
        )}
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
          <HeaderLinks
            mobile={true}
            toggleNavbar={toggleNavbar}
          />
        </nav>
      )}
    </header>
  );
}

export default Header;
