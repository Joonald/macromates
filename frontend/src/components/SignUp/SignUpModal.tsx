import { useEffect, useRef, useState } from "react";
import {
  useSignUpModalDispatch,
  useSignUpModalState,
} from "../../contexts/signup";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { NewUser } from "../../interfaces/signup-interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface CustomError {
  response: {
    data: {
      field: string[];
      message: string;
    };
  };
}

export default function SignUpModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewUser>();
  const userPassword = watch("password", "");
  const modalState = useSignUpModalState();
  const dispatch = useSignUpModalDispatch();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [usernameError, setUsernameError] = useState<string | undefined>(
    undefined
  );

  function toggleModal() {
    if (modalState === false) {
      dispatch({ type: "OPEN_MODAL" });
    } else {
      dispatch({ type: "CLOSE_MODAL" });
    }
  }

  async function onSubmit(signUpData: NewUser) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/users/signup",
        signUpData
      );
      toggleModal();
      console.log("Account was created");
    } catch (error) {
      const typedError = error as CustomError;
      if (typedError.response?.data.field[0] === "email") {
        setEmailError(typedError.response?.data.message);
      }
      if (typedError.response?.data.field[0] === "username") {
        setUsernameError(typedError.response?.data.message);
      }
      console.log("Account was not created");
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

  useEffect(() => {
    document.body.style.overflow = modalState ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalState]);

  return (
    <>
      {modalState && (
        <div className='fixed inset-0 z-40 bg-black bg-opacity-50'>
          <section
            id='signup-modal'
            tabIndex={-1}
            aria-hidden='true'
            className={`font-poppins overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className='relative p-4 w-full max-w-md max-h-full mx-auto'>
              {/* <!-- Modal content --> */}
              <div
                ref={formRef}
                id='sign-up-form'
                className='relative bg-white rounded-lg shadow z-50'>
                {/* <!-- Modal header --> */}
                <div className='border-b rounded-t'>
                  <div className='flex items-center justify-between px-4 pt-4 pb-2 md:p-5'>
                    <p className='text-xl text-primary-800'>Logo</p>
                    <button
                      onClick={toggleModal}
                      type='button'
                      className='end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
                      data-modal-hide='signup-modal'>
                      <svg
                        className='w-3 h-3'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 14'>
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                        />
                      </svg>
                      <span className='sr-only'>Close modal</span>
                    </button>
                  </div>
                  <div className='text-center pb-4 px-4 md:px-5'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                      Welcome to Macromates
                    </h3>
                    <p>Find new recipes to try</p>
                  </div>
                </div>
                {/* <!-- Modal body --> */}
                <div className='p-4 md:p-5'>
                  {/* <p>{error}</p> */}
                  <form
                    className='space-y-4'
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className='relative'>
                      <label
                        htmlFor='username'
                        className='block mb-1 text-sm font-medium text-gray-900'>
                        Username
                      </label>
                      <input
                        {...register("username", {
                          required: {
                            value: true,
                            message: "Username is required",
                          },
                        })}
                        type='text'
                        name='username'
                        id='username'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5'
                        autoComplete='username'
                      />
                      {errors.username?.message && (
                        <p className='text-xs text-red-500 mt-1'>
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className='mr-1'
                          />
                          {errors.username?.message}
                        </p>
                      )}
                      {usernameError && (
                        <p className='text-xs text-red-500 mt-1'>
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className='mr-1'
                          />
                          {usernameError}
                        </p>
                      )}
                    </div>
                    <div className='flex gap-2'>
                      <div className='w-full'>
                        <label
                          htmlFor='firstName'
                          className='block mb-1 text-sm font-medium text-gray-900'>
                          First Name
                        </label>
                        <input
                          {...register("firstName", {
                            required: {
                              value: true,
                              message: "First name is required",
                            },
                          })}
                          type='text'
                          name='firstName'
                          id='firstName'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5'
                          autoComplete='first name'
                        />
                        {errors.firstName?.message ? (
                          <p className='text-xs text-red-500 mt-1'>
                            <FontAwesomeIcon
                              icon={faCircleExclamation}
                              className='mr-1'
                            />
                            {errors.firstName?.message}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className='w-full'>
                        <label
                          htmlFor='lastName'
                          className='block mb-1 text-sm font-medium text-gray-900'>
                          Last Name
                        </label>
                        <input
                          {...register("lastName", {
                            required: {
                              value: true,
                              message: "Last name is required",
                            },
                          })}
                          type='text'
                          name='lastName'
                          id='lastName'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5'
                          autoComplete='last name'
                        />
                        {errors.lastName?.message && (
                          <p className='text-xs text-red-500 mt-1'>
                            <FontAwesomeIcon
                              icon={faCircleExclamation}
                              className='mr-1'
                            />
                            {errors.lastName?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block mb-1 text-sm font-medium text-gray-900'>
                        Email
                      </label>
                      <input
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email",
                          },
                        })}
                        type='email'
                        name='email'
                        id='email'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5'
                        placeholder='name@company.com'
                        autoComplete='new email'
                      />
                      {errors.email?.message && (
                        <p className='text-xs text-red-500 mt-1'>
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className='mr-1'
                          />
                          {errors.email?.message}
                        </p>
                      )}
                      {emailError && (
                        <p className='text-xs text-red-500 mt-1'>
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className='mr-1'
                          />
                          {emailError}
                        </p>
                      )}
                    </div>
                    <div className='flex gap-2'>
                      <div className='w-full'>
                        <label
                          htmlFor='password'
                          className='block mb-1 text-sm font-medium text-gray-900'>
                          Password
                        </label>
                        <input
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Password required",
                            },
                          })}
                          type='password'
                          name='password'
                          id='password'
                          placeholder='••••••••'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5'
                          autoComplete='new-password'
                        />
                        {errors.password?.message && (
                          <p className='text-xs text-red-500 mt-1'>
                            <FontAwesomeIcon
                              icon={faCircleExclamation}
                              className='mr-1'
                            />
                            {errors.password?.message}
                          </p>
                        )}
                      </div>
                      <div className='w-full'>
                        <label
                          htmlFor='passwordConfirm'
                          className='block mb-1 text-sm font-medium text-gray-900 text-nowrap'>
                          Confirm Password
                        </label>
                        <input
                          {...register("passwordConfirm", {
                            required: {
                              value: true,
                              message: "Password required",
                            },
                            validate: {
                              confirmPw: (fieldValue) => {
                                if (fieldValue !== userPassword) {
                                  return "Passwords do not match";
                                }
                              },
                            },
                          })}
                          type='password'
                          name='passwordConfirm'
                          id='passwordConfirm'
                          placeholder='••••••••'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5'
                          autoComplete='new-password'
                        />
                        {errors.passwordConfirm?.message && (
                          <p className='text-xs text-red-500 mt-1'>
                            <FontAwesomeIcon
                              icon={faCircleExclamation}
                              className='mr-1'
                            />
                            {errors.passwordConfirm?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='w-full text-white bg-primary-800 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                      Create your account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
}
