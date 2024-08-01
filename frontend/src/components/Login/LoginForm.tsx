import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { LoginUser } from "../../interfaces/UserAuthInterfaces";
import { ModalProps, LoginError } from "../../interfaces/UserAuthInterfaces";
import Spinner from "../Spinner";

function LoginForm({ toggleModal, isModalOpen }: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const { register, handleSubmit } = useForm<LoginUser>();

  async function onSubmit(loginData: LoginUser) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/users/login",
        loginData
      );
      setIsLoading(false);
      if (toggleModal) {
        toggleModal();
      }
      console.log("You are logged in.", response);
    } catch (error) {
      console.log(error, "Could not log you in.");
      const typedError = error as LoginError;
      setLoginError(typedError.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className='absolute w-full h-full z-20 bg-black bg-opacity-50 '>
          <Spinner />
        </div>
      )}
      <div className='p-4 w-full max-w-md max-h-full'>
        {/* <!-- Sign Up Form content --> */}
        <div
          id='sign-up-form'
          className='relative bg-white rounded-lg shadow border border-gray-200'>
          {/* <!-- Sign Up Form header --> */}
          <div className='border-b rounded-t'>
            <div className='flex items-center justify-between px-4 pt-4 pb-2 md:p-5'>
              <p className='text-xl text-primary-800'>Logo</p>
              {isModalOpen && (
                <button
                  onClick={toggleModal}
                  type='button'
                  className='end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'>
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
              )}
            </div>
            <div className='text-center pb-4 px-4 md:px-5'>
              <h3 className='text-xl font-semibold text-gray-900'>
                Welcome to Macromates
              </h3>
              <p>Sign into your account</p>
            </div>
          </div>
          {/* <!-- Sign Up Form body --> */}
          <div className='p-4 md:p-5'>
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
              </div>
              <div>
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
                </div>
              </div>
              {loginError && (
                <p className='text-xs text-red-500 mt-1'>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className='mr-1'
                  />
                  {loginError}
                </p>
              )}
              <button
                type='submit'
                className='w-full text-white bg-primary-800 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
