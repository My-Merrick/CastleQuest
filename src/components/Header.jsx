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
    <div className="bg-gray-800 text-white border-b shadow-sm sticky top-0 z-50 ">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <span
            className="h-5 text-4xl mb-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Uni
          </span>
          <span
            className="h-5 text-red-700 text-4xl mb-5 cursor-pointer align-middle"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 h-1/2 w-1/2 bg-gray-800 text-white transition-transform transform md:relative md:translate-x-0 md:flex md:items-center md:w-auto md:h-auto`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 focus:outline-none md:hidden"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="flex flex-col items-center justify-start mt-3 mb-3 space-y-4 md:flex-row md:space-y-0 md:space-x-10 cursor-pointer align-middle">
            <li
              className={`py-0 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent align-middle ${
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
