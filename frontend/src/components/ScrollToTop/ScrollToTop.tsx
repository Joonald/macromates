import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop(props: React.PropsWithChildren) {
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathName]);

  return <>{props.children}</>;
}

export default ScrollToTop;
