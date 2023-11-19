import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

function SignupPage(props) {
  const navigate = useNavigate();

  // Use State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Handle Event Changes
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  // Handle Signup Submit
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    authService.signup(requestBody)
      .then((response) => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className='h-screen bg-gradient-to-r from-[#f1f7f1] to-[#ebf4f8] pt-8'>
      <div className='flex flex-col justify-center items-center pt-8 '>
        <div className='bg-gradient-to-r text-[20px] font-extrabold uppercase leading-[24.2px] tracking-widest md:text-[26px] md:leading-[30px] lg:leading-[36px] bg-clip-text mb-4 text-[#414141] lg:text-[32px]'>
          CHECK RETURNS
        </div>
        <div className={`sm:text-[40px] text-[20px] font-bold text-[#414141] mx-3`}>
          <span className='inline-block bg-clip-text text-transparent bg-gradient-to-l from-[#5A32A3] to-[#D03592] dark:to-[#D03592] mx-2'>
            Signup
          </span>
          to continue
        </div>

        <div className='w-[90%] mt-4 mb-8 border md:w-[460px] rounded-2xl pt-8 pb-6 px-7.5 border-gray-400 bg-white'>
          <form onSubmit={handleSignupSubmit} className='px-4'>
            <div className='text-left mt-2 w-full text-gray-400 select-none dark:text-dark-gray-400 text-xs font-semibold uppercase truncate ml-3.5'>
              Email
            </div>
            <input
              className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg text-gray-900 w-full'
              type='email'
              id='email'
              value={email}
              onChange={handleEmail}
              name='email'
              placeholder='Email Address'
              required
            />

            <div className='text-left mt-2 w-full text-gray-400 select-none dark:text-dark-gray-400 text-xs font-semibold uppercase truncate ml-3.5'>
              Password
            </div>
            <input
              className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg text-gray-900 w-full'
              type='password'
              id='password'
              value={password}
              onChange={handlePassword}
              name='password'
              placeholder='Enter Password'
              required
            />

            <div className='text-left mt-2 w-full text-gray-400 select-none dark:text-dark-gray-400 text-xs font-semibold uppercase truncate ml-3.5'>
              Name
            </div>
            <input
              className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg text-gray-900 w-full'
              type='text'
              id='name'
              value={name}
              onChange={handleName}
              name='name'
              placeholder='Your Name'
              required
            />

            <button
              type='submit'
              className='flex justify-center items-center w-full my-3'
            >
              <div className='w-fit px-5 py-1 text-[18px] rounded-lg bg-[#29ABE2] hover:bg-[#88d4f5] text-white font-semibold select-none'>
                Sign Up
              </div>
            </button>
          </form>

          {errorMessage && <div className='text-red-500'>{errorMessage}</div>}

          <div className='flex justify-center space-x-2 items-center my-3 p-2'>
            <div className='flex text-md text-gray-600 dark:text-dark-gray-600 select-none'>
              Already have an account?
            </div>
            <div className='inline-flex text-md items-center font-semibold ml-3 text-[#29abe2] cursor-pointer'>
              <Link to={'/auth/login'}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
