import { useState, useEffect } from "react";
import { Link, useNavigation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp, FaReddit } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import Loader from "./Loader"; // Import the Loader component
// import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // React Router navigation state

  let timeoutId; // Delay closing dropdown

  // const { i18n } = useTranslation();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  // Show loader when navigation is happening
  useEffect(() => {
    if (navigation.state === "loading") {
      setIsLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300); // Small delay to allow animations to complete
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Clear any existing timeouts
    setIsTeamOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsTeamOpen(false);
    }, 200); // Small delay before closing
  };

  const top = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Loader */}
      {isLoading && <Loader />}
      {/* Navbar */}
      <div className="fixed w-full backdrop-blur z-40">
        <div className="px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-0">
          <div className="relative flex items-center z-50 justify-between">
            <a
              href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center"
            >
              {/* Hide "Foundation" text when menu is open on mobile */}
              {/* <span
                className={`ml-2 text-xl font-bold tracking-wide text-black uppercase transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              >
                <img className=" text-[12px]" src={logo} alt="" />
              </span> */}

              <img
                className={`ml-2 h-12 w-14 lg:h-[70px] lg:w-20 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
                src={logo}
                alt=""
              />
            </a>
            <ul className="items-center hidden space-x-16 lg:flex">
              <li>
                <Link
                  to="/"
                  onClick={top}
                  className="font-bold text-[13px] tracking-wide text-[#050960] duration-500 hover:text-amber-600"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/blogpage"
                  onClick={top}
                  className="font-bold text-[13px] tracking-wide text-black duration-500 hover:text-amber-600"
                >
                  BLOG
                </Link>
              </li>
              {/* Dropdown for Our Team */}
              <li
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="font-bold text-[13px] tracking-wide text-black duration-500 hover:text-amber-600">
                  OUR TEAM
                </button>
                <ul
                  className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-44  backdrop-blur-lg border border-gray-200 rounded-lg shadow-xl transition-all duration-300 ease-in-out ${
                    isTeamOpen
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                  }`}
                >
                  <li>
                    <Link className="block px-4 py-3 text-md font-medium text-fuchsia-950 hover:bg-gray-100 transition duration-200">
                      Leaders
                    </Link>
                  </li>
                  <li>
                    <Link className="block px-4 py-3 text-md font-medium text-fuchsia-950 hover:bg-gray-100 transition duration-200">
                      Members
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  to="/regForm"
                  onClick={top}
                  className="flex justify-center gap-2 items-center mx-auto text-[15px] bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 border-amber-200 hover:bg-green-600 ease-linear duration-400 px-[22px] py-[7px] overflow-hidden border-2 rounded-full group"
                >
                  Registration
                  <svg
                    className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="fill-gray-800 hover:fill-gray-800"
                    ></path>
                  </svg>
                </Link>
              </li>

              {/* <li>
                <button onClick={() => changeLanguage("en")}>English</button>
                <button onClick={() => changeLanguage("bn")}>বাংলা</button>
              </li> */}
              <li>
                <div className="relative group">
                  {/* Main Button */}
                  <div className=" cursor-pointer text-white p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 16 16"
                      className="group-hover:fill-blue-500 transition-all duration-300"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                  </div>

                  {/* Tooltips Container */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex space-x-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-2 transition-all duration-300">
                    {/* Twitter */}
                    <div className="bg-white p-2 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
                      <FaTwitter
                        className="text-blue-500 hover:text-white"
                        size={20}
                      />
                    </div>

                    {/* Facebook */}
                    <div className="bg-white p-2 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition-all duration-300">
                      <FaFacebook
                        className="text-blue-700 hover:text-white"
                        size={20}
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-all duration-300">
                      <FaWhatsapp
                        className="text-green-500 hover:text-white"
                        size={20}
                      />
                    </div>

                    {/* Discord */}
                    {/* <div className="bg-white p-2 rounded-lg shadow-md hover:bg-purple-500 hover:text-white transition-all duration-300">
                      <FaDiscord
                        className="text-purple-500 hover:text-white"
                        size={20}
                      />
                    </div> */}

                    {/* Pinterest
                    <div className="bg-white p-2 rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all duration-300">
                      <FaPinterest
                        className="text-red-600 hover:text-white"
                        size={20}
                      />
                    </div> */}

                    {/* GitHub */}
                    {/* <div className="bg-white p-2 rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300">
                      <FaGithub
                        className="text-black hover:text-white"
                        size={20}
                      />
                    </div> */}

                    {/* Reddit */}
                    {/* <div className="bg-white p-2 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-all duration-300">
                      <FaReddit
                        className="text-orange-500 hover:text-white"
                        size={20}
                      />
                    </div> */}
                  </div>
                </div>
              </li>
            </ul>
            <div className="lg:hidden">
              <button
                aria-label="Open Menu"
                title="Open Menu"
                className="p-2 -mr-1 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full  backdrop-blur-lg z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-end mt-3">
            <div>
              <button
                aria-label="Close Menu"
                title="Close Menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-xs tracking-wide text-black transition-colors duration-200 hover:text-amber-600"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-xs tracking-wide text-black transition-colors duration-200 hover:text-amber-600"
                >
                  BLOG
                </Link>
              </li>
              <li
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="font-bold text-xs tracking-wide text-black transition duration-200 hover:text-amber-600">
                  OUR TEAM
                </button>
                <ul
                  className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-44  backdrop-blur-lg border border-gray-200 rounded-lg shadow-xl transition-all duration-300 ease-in-out ${
                    isTeamOpen
                      ? "opacity-100 translate-y-0 scale-100 z-10"
                      : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                  }`}
                >
                  <li>
                    <Link className="block px-4 py-3  text-md font-medium text-fuchsia-950  hover:bg-gray-100 transition duration-200">
                      Leaders
                    </Link>
                  </li>
                  <li>
                    <Link className="block px-4 py-3  text-md font-medium text-fuchsia-950  hover:bg-gray-100 transition duration-200">
                      Members
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div className="relative group">
                  {/* Main Button */}
                  <div className=" cursor-pointer text-white  pt-3 pb-3   ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 16 16"
                      className="group-hover:fill-blue-500 transition-all duration-300 "
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                  </div>

                  {/* Tooltips Container */}
                  <div className="absolute top-full z-20 left-1/2 -translate-x-1/2 mt-2 flex space-x-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-2 transition-all duration-300">
                    {/* Twitter */}
                    <div className="bg-white p-2 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
                      <FaTwitter
                        className="text-blue-500 hover:text-white"
                        size={20}
                      />
                    </div>

                    {/* Facebook */}
                    <div className="bg-white p-2 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition-all duration-300">
                      <FaFacebook
                        className="text-blue-700 hover:text-white"
                        size={20}
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="bg-white p-2 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-all duration-300">
                      <FaWhatsapp
                        className="text-green-500 hover:text-white"
                        size={20}
                      />
                    </div>

                    {/* Discord */}
                    {/* <div className="bg-white p-2 rounded-lg shadow-md hover:bg-purple-500 hover:text-white transition-all duration-300">
                      <FaDiscord
                        className="text-purple-500 hover:text-white"
                        size={20}
                      />
                    </div> */}

                    {/* Pinterest */}
                    {/* <div className="bg-white p-2 rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all duration-300">
                      <FaPinterest
                        className="text-red-600 hover:text-white"
                        size={20}
                      />
                    </div> */}

                    {/* GitHub */}
                    {/* <div className="bg-white p-2 rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300">
                      <FaGithub
                        className="text-black hover:text-white"
                        size={20}
                      />
                    </div> */}

                    {/* Reddit */}
                    {/* <div className="bg-white p-2 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-all duration-300">
                      <FaReddit
                        className="text-orange-500 hover:text-white"
                        size={20}
                      />
                    </div> */}
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="/regForm"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex justify-center gap-2 items-center mx-auto w-46 h-13 text-[15px] bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative border-amber-200 hover:bg-green-600 ease-linear duration-400 px-[22px] py-[7px] overflow-hidden border-2 rounded-full group"
                >
                  Registration
                  <svg
                    className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="fill-gray-800 hover:fill-gray-800"
                    ></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
    </div>
  );
};

export default Navbar;
