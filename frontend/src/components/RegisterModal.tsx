// import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { ModalContext, ModalDispatchContext } from "../utils/modalProvider";
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
  const modalState = useContext(ModalContext);
  const dispatch = useContext(ModalDispatchContext);
  const [formData, setFormData] = useState<IRegisterUser>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<boolean>(true);

  function closeModal() {
    dispatch("CLOSE_MODAL");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (formData.password !== formData.passwordConfirm) {
        setConfirmPassword(false);
      } else {
        const response = await axios.post(
          "http://127.0.0.1:4000/api/v1/users/signup",
          formData
        );
        setConfirmPassword(true);
        console.log(response.data);
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  console.log(
    confirmPassword,
    "Password:" + formData.password,
    "Password Confirm:" + formData.passwordConfirm
  );

  return (
    <>
      <Modal
        show={modalState}
        size='md'
        onClose={closeModal}
        popup>
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
              Sign in to our platform
            </h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-2'>
                <div className='mb-2 block'>
                  <Label
                    htmlFor='username'
                    value='Username'
                  />
                </div>
                <TextInput
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex justify-between'>
                <div className='mb-2'>
                  <div className='mb-2 block'>
                    <Label
                      htmlFor='first-name'
                      value='First Name'
                    />
                  </div>
                  <TextInput
                    id='first-name'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='mb-2'>
                  <div className='mb-2 block'>
                    <Label
                      htmlFor='last-name'
                      value='Last Name'
                    />
                  </div>
                  <TextInput
                    id='last-name'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='mb-2'>
                <div className='mb-2 block'>
                  <Label
                    htmlFor='email'
                    value='Email'
                  />
                </div>
                <TextInput
                  id='email'
                  name='email'
                  placeholder='name@company.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-2'>
                <div className='mb-2 block'>
                  <Label
                    htmlFor='password'
                    value='Password'
                  />
                </div>
                {confirmPassword ? (
                  ""
                ) : (
                  <span className='text-white'>Passwords do not match.</span>
                )}
                <TextInput
                  id='password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-2'>
                <div className='mb-2 block'>
                  <Label
                    htmlFor='password-confirm'
                    value='Confirm Password'
                  />
                </div>
                <TextInput
                  id='password-confirm'
                  type='password'
                  name='passwordConfirm'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='w-full'>
                <Button type='submit'>Create Account</Button>
              </div>
            </form>
            <div className='flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300'>
              Already have an account?&nbsp;
              <a
                href='#'
                className='text-cyan-700 hover:underline dark:text-cyan-500'>
                Sign In
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
