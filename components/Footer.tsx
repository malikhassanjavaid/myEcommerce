import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">MyEcommerce</h2>
            <p className="text-gray-400">
              Premium fashion for modern style
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
              Home
            </Link>
            <Link href="/products" className="text-gray-400 hover:text-white transition-colors duration-300">
              Products
            </Link>
            <Link href="/checkout" className="text-gray-400 hover:text-white transition-colors duration-300">
              Checkout
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
              Contact
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-4">
            <Link
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300 group"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300 group"
              aria-label="Twitter"
            >
              <FaTwitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300 group"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MyEcommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}