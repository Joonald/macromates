// import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { useModalDispatch, useModalState } from "../contexts/signup";
import axios from "axios";

interface IRegisterUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterModal() {
  const modalState = useModalState();
  const dispatch = useModalDispatch();
  // const [formData, setFormData] = useState<IRegisterUser>({
  //   username: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   passwordConfirm: "",
  // });

  // const [confirmPassword, setConfirmPassword] = useState<boolean>(true);

  function toggleModal() {
    if (modalState === false) {
      dispatch({ type: "OPEN_MODAL" });
    } else {
      dispatch({ type: "CLOSE_MODAL" });
    }
  }

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // }

  // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   try {
  //     if (formData.password !== formData.passwordConfirm) {
  //       setConfirmPassword(false);
  //     } else {
  //       const response = await axios.post(
  //         "http://127.0.0.1:4000/api/v1/users/signup",
  //         formData
  //       );
  //       setConfirmPassword(true);
  //       console.log(response.data);
  //       closeModal();
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // }

  // console.log(
  //   confirmPassword,
  //   "Password:" + formData.password,
  //   "Password Confirm:" + formData.passwordConfirm
  // );

  return (
    <>
      {/* <!-- Main modal --> */}
      {modalState && (
        <div className='fixed inset-0 z-40 bg-black bg-opacity-50'></div>
      )}
      <div
        id='signup-modal'
        tabIndex={-1}
        aria-hidden='true'
        className={`${
          modalState ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className='relative p-4 w-full max-w-md max-h-full mx-auto top-1/4'>
          {/* <!-- Modal content --> */}
          <div className='relative bg-white rounded-lg shadow'>
            {/* <!-- Modal header --> */}
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Sign in to our platform
              </h3>
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
            {/* <!-- Modal body --> */}
            <div className='p-4 md:p-5'>
              <form
                className='space-y-4'
                action='#'>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900'>
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    placeholder='name@company.com'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900'>
                    Your password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    required
                  />
                </div>
                <div className='flex justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        type='checkbox'
                        value=''
                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300'
                        required
                      />
                    </div>
                    <label
                      htmlFor='remember'
                      className='ms-2 text-sm font-medium text-gray-900'></label>
                  </div>
                  <a
                    href='#'
                    className='text-sm text-blue-700 hover:underline'>
                    Lost Password?
                  </a>
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                  Login to your account
                </button>
                <div className='text-sm font-medium text-gray-500'>
                  Not registered?{" "}
                  <a
                    href='#'
                    className='text-blue-700 hover:underline'>
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
