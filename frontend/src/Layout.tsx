import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import RegisterModal from "./components/RegisterModal";

function Layout() {
  return (
    <ScrollToTop>
      <Header />
      <RegisterModal />
      <Outlet />
      <Footer />
    </ScrollToTop>
  );
}

export default Layout;
