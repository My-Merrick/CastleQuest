// import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About Us</h2>
            <p className="text-sm">
              Your Real Estate is a leading provider of real estate services,
              including buying, selling, and renting properties.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-400">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://www.tiktok.com/@hero_mode?_t=8n26UniLOHF&_r=1"
                className="text-white hover:text-gray-400"
              >
                <FaTiktok className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Quick Links</h2>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm hover:text-gray-400">
                Home
              </Link>
              <Link to="/properties" className="text-sm hover:text-gray-400">
                Properties
              </Link>
              <Link to="/about" className="text-sm hover:text-gray-400">
                About Us
              </Link>
              <Link to="/contactus" className="text-sm hover:text-gray-400">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="text-sm">123 North Legon Street</p>
            <p className="text-sm">Ghana, Accra, +233</p>
            <p className="text-sm">Phone: +233 (053) 906-4002</p>
            <p className="text-sm">Email: unihomes154@gmail.com</p>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-600 mt-8"></div>

        {/* Bottom Text */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">
            © 2024 UniHomes Real Estate. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <Link to="/privacy-policy" className="text-sm hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-sm hover:text-gray-400"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
