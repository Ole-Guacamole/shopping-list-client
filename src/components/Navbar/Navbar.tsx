import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useTheme } from "../../context/theme.context";
import { FaHome, FaUser } from 'react-icons/fa';

//import logo from "../../assets/images/logo.png";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext) ?? {};
  const navigate = useNavigate();

  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Function to close dropdown
  const closeDropdown = () => setDropdownOpen(false);

  // Function to handle logout
  const handleLogout = () => {
    if (logOutUser) {
      logOutUser();
    }
    navigate("/login");
  };

  // Theme context
  const { theme, toggleTheme } = useTheme();

   // Function to handle theme change
   const handleThemeChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTheme();
  };

  return (
    <nav className="relative w-full top-0 left-0 right-0 p-4">
      <div className="navbar bg-base-200 rounded-lg w-full ">
      <div className="navbar-start">
          <a href="/" className="btn btn-ghost btn-circle">
            <FaHome className="h-7 w-7" />
          </a>
        </div>
        <div className="navbar-center w-40">
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="synthwave"
              checked={theme === "dracula"}
              onChange={handleThemeChange}
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={toggleDropdown}
            >
              <FaUser className="h-7 w-7" />
            </div>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {!isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/login"
                        onClick={closeDropdown}
                        className="hover:text-white"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        onClick={closeDropdown}
                        className="hover:text-white"
                      >
                        Sign up
                      </Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        onClick={closeDropdown}
                        className="hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
