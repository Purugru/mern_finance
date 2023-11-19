import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./../context/auth.context";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && event.target && 'contains' in dropdownRef.current) {
        if (!(dropdownRef.current).contains(event.target)) {
          closeDropdown();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex justify-center w-full border-b-2 select-none fixed bg-white z-50`}>
      <div className='flex items-center justify-between w-[1200px] gap-4 md:gap-0 mx-6 my-2 pt-2'>
        <div className='flex items-center space-x-2 cursor-pointer'>
          <a href="/" className={`sm:text-[15px] no-underline text-black text-[10px] font-extrabold uppercase leading-[24.2px] tracking-widest`}>Check Returns</a>
        </div>
        <div className='relative' ref={dropdownRef}>
          <div className='flex flex-row items-center gap-3'>

            <a href='/balance' className='text-bold border-2 select-none no-underline text-black hover:bg-gray-200 border-neutral-200  px-3 py-1 rounded-lg cursor-pointer' >
              Balance
            </a>

            <div onClick={toggleOpen} className='md:py-2 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' >
              <div className="block">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg" height={30} width={30} />
              </div>
            </div>

            {isOpen && (
              <div className='absolute z-50 rounded-xl shadow-md w-[40vw]  md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm hover:cursor-pointer border-2'>
                <div>
                  {isLoggedIn ? (
                    <>
                      <a href="/expense" className='px-2.5 block no-underline text-black py-2.5 hover:bg-neutral-300 transition font-semibold cursor-pointer'>My Expense</a>
                      <a href="/income" className='px-2.5 block no-underline text-black py-2.5 hover:bg-neutral-300 transition font-semibold cursor-pointer'>My Income</a>
                      <div onClick={logOutUser} className='px-2.5 block no-underline text-black py-2.5 hover:bg-neutral-300 transition font-semibold cursor-pointer'>Sign Out</div>
                    </>

                  ) : (
                    <>
                      <a href="/auth/login" className='px-2.5 block no-underline text-black py-2.5 hover:bg-neutral-100 transition font-semibold cursor-pointer'>Login</a>
                      <a href="/auth/signup" className='px-2.5 block no-underline text-black py-2.5 hover:bg-neutral-100 transition font-semibold cursor-pointer'>Register</a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;