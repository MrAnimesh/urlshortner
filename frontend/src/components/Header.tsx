import React, {useState} from 'react'

interface Profile{
    isDropdownOpen: boolean,
    setIsDropdownOpen: any
};

const ProfileButton:React.FC<Profile> = ({isDropdownOpen, setIsDropdownOpen}) => {
    return(
        <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-sm bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-full"
                >
                  {/* <span>Profile</span> */}
                  <img src="/src/assets/profile.jpg" alt="user photo" className='rounded-full h-10 w-10' />
                  {/* <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg> */}
                </button>
              </div>
    );
}


const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="bg-white shadow-lg">
        <div className="w-full mx-auto px-4 font-semibold">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="text-xl font-bold text-gray-800">
                Logo
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 ">
              <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-500">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-500">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-500">Contact</a>
              
              {/* Profile Dropdown */}
              <ProfileButton setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen}/>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isOpen ? (
                  "X"
                ) : (
                  <ProfileButton setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen}/>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Positioned below navbar */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-48 right-0 top-16 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-50">
              Home
            </a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-50">
              About
            </a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-50">
              Services
            </a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-50">
              Contact
            </a>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-left px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
            >
              Profile
            </button>
            {isDropdownOpen && (
              <div className="bg-gray-50">
                <a href="#" className="block px-8 py-2 text-gray-600 hover:text-blue-500">
                  Your Profile
                </a>
                <a href="#" className="block px-8 py-2 text-gray-600 hover:text-blue-500">
                  Settings
                </a>
                <a href="#" className="block px-8 py-2 text-gray-600 hover:text-blue-500">
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Dropdown - Positioned below profile button */}
      {isDropdownOpen && (
        <div className="hidden md:block absolute right-4 top-16 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Your Profile
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header