import { useEffect, useRef } from "react";
import {
  useSignUpModalDispatch,
  useSignUpModalState,
} from "../../contexts/signup";
import SignUpForm from "./SignUpForm";

export default function SignUpModal() {
  const modalState = useSignUpModalState();
  const dispatch = useSignUpModalDispatch();
  const formRef = useRef<HTMLDivElement | null>(null);

  function toggleModal() {
    if (modalState === false) {
      dispatch({ type: "OPEN_MODAL" });
    } else {
      dispatch({ type: "CLOSE_MODAL" });
    }
  }

  useEffect(() => {
    // Function to close the signup modal when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        toggleModal();
      }
    };

    // Add event listener to detect clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // useEffect(() => {
  //   document.body.style.overflow = modalState ? "hidden" : "unset";
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [modalState]);

  return (
    <>
      {modalState && (
        <div className='fixed inset-0 z-40 bg-black bg-opacity-50'>
          <section
            id='signup-modal'
            tabIndex={-1}
            aria-hidden='true'
            className={`font-poppins overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div
              ref={formRef}
              className='max-w-fit max-h-fit mx-auto relative'>
              <SignUpForm
                toggleModal={toggleModal}
                isModalOpen={modalState}
              />
            </div>
          </section>
        </div>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
}
