import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [pageState, setPageState] = useState("sign in");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("profile");
      } else {
        setPageState("sign in");
      }
    });
  }, [auth]);

  function pathMatchRoute(route) {
    return route === location.pathname;
  }

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <div className="bg-gray-800 text-white border-b shadow-sm sticky top-0 z-50 py-5">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <span
            className="h-5 text-4xl mb-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Uni
          </span>
          <span
            className="h-5 text-red-700 text-4xl mb-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Homes
          </span>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center`}
        >
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 cursor-pointer">
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-white border-b-red-500"
              }`}
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-white border-b-red-500"
              }`}
              onClick={() => {
                navigate("/offers");
                setMenuOpen(false);
              }}
            >
              Offers
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/signIn") || pathMatchRoute("/profile")) &&
                "text-white border-b-red-500"
              }`}
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
