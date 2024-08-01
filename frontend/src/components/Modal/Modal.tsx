import { useEffect, useRef } from "react";
import {
  useSignUpModalDispatch,
  useSignUpModalState,
} from "../../contexts/signup";
import SignUpForm from "../SignUp/SignUpForm";
import LoginForm from "../Login/LoginForm";

type CurrentForm = {
  type: "login" | "signup";
};

export default function SignUpModal() {
  const { isSignUpOpen, isLoginOpen } = useSignUpModalState();
  const dispatch = useSignUpModalDispatch();
  const formRef = useRef<HTMLDivElement | null>(null);

  function toggleModal(state: CurrentForm) {
    if (state.type === "signup") {
      if (isSignUpOpen === false) {
        dispatch({ type: "OPEN_SIGNUP" });
      } else {
        dispatch({ type: "CLOSE_SIGNUP" });
      }
    }
    if (state.type === "login") {
      if (isLoginOpen === false) {
        dispatch({ type: "OPEN_LOGIN" });
      } else {
        dispatch({ type: "CLOSE_LOGIN" });
      }
    }
  }

  useEffect(() => {
    // Function to close the signup modal when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        if (isSignUpOpen) toggleModal({ type: "signup" });
        if (isLoginOpen) toggleModal({ type: "login" });
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
    // disallow scrolling while modal is open
    document.body.style.overflow =
      isSignUpOpen || isLoginOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSignUpOpen, isLoginOpen]);

  return (
    <>
      {(isSignUpOpen || isLoginOpen) && (
        <div className='fixed inset-0 z-40 bg-black bg-opacity-50'>
          <section
            id='signup-modal'
            tabIndex={-1}
            aria-hidden='true'
            className={`font-poppins overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <section
              id='modal'
              ref={formRef}
              className='max-w-fit max-h-fit mx-auto relative'>
              {isSignUpOpen && (
                <SignUpForm
                  toggleModal={() => toggleModal({ type: "signup" })}
                  isModalOpen={isSignUpOpen}
                />
              )}
              {isLoginOpen && (
                <LoginForm
                  toggleModal={() => toggleModal({ type: "login" })}
                  isModalOpen={isLoginOpen}
                />
              )}
            </section>
          </section>
        </div>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
}