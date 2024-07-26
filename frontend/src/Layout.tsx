import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import SignUpModal from "./components/SignUp/SignUpModal";

function Layout() {
  return (
    <ScrollToTop>
      <Header />
      {/* <SignUpModal /> */}
      <Outlet />
      <Footer />
    </ScrollToTop>
  );
}

export default Layout;
