import React from "react";
import SignUpForm from "../../components/SignUp/SignUpForm";

function SignUp() {
  return (
    <section className='relative md:flex'>
      <div className='md:w-2/5'>
        <img
          className='md:h-full md:max-h-[623px] md:object-cover md:w-[-webkit-fill-available] md:w-[-moz-available]'
          src='https://images.pexels.com/photos/8176601/pexels-photo-8176601.jpeg?auto=compress&cs=tinysrgb&w=800'
          alt='cook looking at recipe book on counter'
        />
      </div>
      <div className='relative -top-20 mx-auto flex justify-center md:top-0 md:flex-col'>
        <h1 className='hidden font-poppins text-xl font-semibold pt-4 px-4 md:inline-block'>
          Sign Up
        </h1>
        <SignUpForm />
      </div>
    </section>
  );
}

export default SignUp;
