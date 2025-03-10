import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [loggdIn, setIsLoggedIn] = useState<boolean>(false);

  // Handle scroll effect for header
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    // { id: "login", label: "Login" }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMenuOpen(false);
  };

  return (
    <header
      className={`w-full p-4 fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-gray-900/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            LinkShort
          </h1>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none p-1 rounded-full bg-gray-800 border border-gray-700 active:scale-90 transition-transform duration-200"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`w-5 h-0.5 bg-white block transition-all duration-300 mb-1.5 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-white block transition-all duration-300 mb-1.5 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-white block transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-lg shadow-xl p-2 border border-gray-700 overflow-hidden transition-all duration-300">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id} className="overflow-hidden">
                    <a
                      href={`#${item.id}`}
                      className={`block py-2 px-4 rounded-md transition-colors ${
                        activePage === item.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {!loggdIn && (
                  <a
                    href={"/"}
                    className={`block py-2 px-4 rounded-md transition-colors ${
                      activePage === "login"
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => handleNavClick("login")}
                  >
                    Login
                  </a>
                )}
                <li className="pt-2 mt-2 border-t border-gray-700">
                  {loggdIn ? (
                    <a className="block py-2 px-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium">
                      Animesh Singh
                    </a>
                  ) : (
                    <a
                      href="#signup"
                      className="block py-2 px-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up Free
                    </a>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <div className="flex space-x-1 mr-4">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  activePage === item.id
                    ? "text-blue-400"
                    : "text-gray-200 hover:text-white"
                } hover:-translate-y-1`} // Added hover:-translate-y-1 here
                onClick={() => setActivePage(item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {!loggdIn && (
            <a
              href="#signup"
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-md shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              Sign Up Free
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
