import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { setCookie, getCookie } from "cookies-next/client";

// import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const [loggedInUser, setLoggedInUser] = useState(null);
  // const [loggedInUser, setLoggedInUser] = useState(null); //() => {
    // const loggedInUser = useRef(null);
  //   const user_id = getCookie("user_id");
  //   return user_id || null; // Return user_id if present, otherwise null
  // });
  const router = useRouter();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [hydrated, setHydrated] = useState(false); // To track hydration

  // useEffect(() => {
  //   setHydrated(true); // Mark hydration as complete
  //   const user_id = getCookie("user_id");
  //   setLoggedInUser(user_id || null);
  // }, []);

  useEffect(() => {
    fetchCurrentUser()
  }, []);
  
  const fetchCurrentUser = async () => {
    try {
      const user_id = getCookie("user_id"); 
      console.log(user_id);
      if (user_id) {
        console.log("user logged in", user_id);
      }
      setLoggedInUser(user_id);
      // loggedInUser.current = user_id;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // loggedInUser.current = null;
      setLoggedInUser(null); // Handle errors by resetting to null
    }
  };

  useEffect(() => {
    console.log("loggedInUser", loggedInUser);
  }, [loggedInUser]);

  const handleLogout = () => {
    
    document.cookie = `user_id=; path=/; max-age=0`;
    setCookie("user_id", null);
    setLoggedInUser(null);
    // loggedInUser.current = null;
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <header className="bg-neutral text-neutral-content shadow-md">
      <div className="mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-slate-300">
          Scholar Connect
        </Link>
        
        <button
          className="block lg:hidden text-gray-300 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        <nav className="hidden lg:block">
          <ul className="flex space-x-4 text-gray-300">
            <li>
              <Link href="/" className="hover:text-cyan-400">Home</Link>
            </li>
            <li>
              <Link href="/userprofiles" className="hover:text-cyan-400">User Profiles</Link>
            </li>
            <li>
              <Link href="/proposaldashboard" className="hover:text-cyan-400">Proposal Dashboard</Link>
            </li>
            <li>
              <Link href="/collaborationtools" className="hover:text-cyan-400">Collaboration Tools</Link>
            </li>
            <li>
              <Link href="/grantsandfunding" className="hover:text-cyan-400">Grants and Funding</Link>
            </li>
            <li>
              <Link href="/eventsdashboard" className="hover:text-cyan-400">Events Dashboard</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-cyan-400">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-cyan-400">Contact</Link>
            </li>

            {!loggedInUser && (
              <>
                <li>
                  <Link href="/register" className="hover:text-cyan-400">Register</Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-cyan-400">Login</Link>
                </li>
              </>
            )}

            {loggedInUser && (
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-cyan-400 bg-transparent border-none cursor-pointer text-gray-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {isMobileMenuOpen && (
          <nav className="lg:hidden absolute top-16 left-0 w-full bg-neutral text-gray-300">
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <Link href="/" className="hover:text-cyan-400" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li>
                <a href="https://digitalrepositorygroup7.wordpress.com/2024/10/13/introducing-the-digital-repository/" onClick={toggleMobileMenu} className="hover:text-cyan-400">WordPress Blog</a>
              </li>
              <li>
                <Link href="/userprofiles" className="hover:text-cyan-400" onClick={toggleMobileMenu}>User Profiles</Link>
              </li>
              <li>
                <Link href="/proposaldashboard" className="hover:text-cyan-400" onClick={toggleMobileMenu}>Proposal Dashboard</Link>
              </li>
              <li>
                <Link href="/collaborationtools" className="hover:text-cyan-400" onClick={toggleMobileMenu}>Collaboration Tools</Link>
              </li>
              <li>
                <Link href="/grantsandfunding" className="hover:text-cyan-400" onClick={toggleMobileMenu}>Grants and Funding</Link>
              </li>
              <li>
                <Link href="/eventsdashboard" className="hover:text-cyan-400" onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400" onClick={toggleMobileMenu}>Contact</Link>
              </li>

              {!loggedInUser && (
                <>
                  <li>
                    <Link href="/register" className="hover:text-cyan-400" onClick={toggleMobileMenu}>Register</Link>
                  </li>
                  <li>
                    <Link href="/login" className="hover:text-cyan-400" onClick={toggleMobileMenu}>Login</Link>
                  </li>
                </>
              )}

              {loggedInUser && (
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="hover:text-cyan-400 bg-transparent border-none cursor-pointer text-gray-300"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;