import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='p-4 font-poppins border-t border-primary-800 bg-white'>
      <section className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <section className='sm:flex sm:items-center sm:justify-between'>
          <Link to='/'>
            <span className='self-center text-xl text-primary-800 whitespace-nowrap'>
              MacroMates
            </span>
          </Link>
          <ul className='flex justify-around text-gray-500 md:justify-center md:gap-4'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/discover'>Discover</Link>
            </li>
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
          </ul>
        </section>
        <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center'>
          © {year}{" "}
          <Link
            to='/'
            className='hover:underline'>
            MacroMates™
          </Link>
          . All Rights Reserved.
        </span>
      </section>
    </footer>
  );
}

export default Footer;
