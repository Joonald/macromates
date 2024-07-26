import { useEffect, useRef } from "react";
import SignUpForm from "./SignUpForm";
import { SignUpProps } from "../../interfaces/signup-interface";
// import {
//   useSignUpModalDispatch,
//   useSignUpModalState,
// } from "../../contexts/signup";

export default function SignUpModal({ isModalOpen, toggleModal }: SignUpProps) {
  // const modalState = useSignUpModalState();
  // const dispatch = useSignUpModalDispatch();
  const formRef = useRef<HTMLDivElement | null>(null);

  // function toggleModal() {
  //   if (modalState === false) {
  //     dispatch({ type: "OPEN_MODAL" });
  //   } else {
  //     dispatch({ type: "CLOSE_MODAL" });
  //   }
  // }

  useEffect(() => {
    // Function to close the signup modal when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        if (toggleModal) {
          toggleModal();
        }
      }
    };

    // Add event listener to detect clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div className='fixed inset-0 z-40 bg-black bg-opacity-50'>
          <section
            id='signup-modal'
            tabIndex={-1}
            aria-hidden='true'
            className={`font-poppins overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div
              ref={formRef}
              className='z-50'>
              <SignUpForm
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
              />
            </div>
          </section>
        </div>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
}
