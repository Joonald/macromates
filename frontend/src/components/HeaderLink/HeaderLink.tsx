import React from "react";
import { NavLink } from "react-router-dom";
import { NavLinkProps } from "../../interfaces/HeaderInterface";

function HeaderLink({ mobile = false, toggleNavbar, to = "" }: NavLinkProps) {
  return (
    <NavLink
      onClick={() => {
        if (mobile) {
          if (toggleNavbar) toggleNavbar();
        }
      }}
      className={({ isActive }) =>
        isActive ? "text-green-600" : "text-black-800"
      }
      to={`/${to.replace(" ", "")}`}>
      {to === "" ? "Home" : to.toUpperCase()}
    </NavLink>
  );
}

export default HeaderLink;
