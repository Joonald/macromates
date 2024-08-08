import React, { useEffect } from "react";

type ClickOutsideProps = {
  ref: React.RefObject<HTMLDivElement> | null;
  callback: () => void;
};

function useClickOutside({ ref, callback }: ClickOutsideProps) {
  // Function to close the element when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref!.current && !ref!.current.contains(event.target as Node)) {
        callback();
      }
    };
    // Add event listener to detect clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
