import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiPaypal } from 'react-icons/si';
import { MdPayment } from 'react-icons/md';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-4">NEWSLETTER</h3>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-l-md text-black w-96"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Other Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Our Company Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">OUR COMPANY</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/stories">Our Stories</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/sitemap">Sitemap</Link></li>
            </ul>
          </div>

          {/* Our Policies Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">OUR POLICIES</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-hub">Privacy Hub</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/payment-terms">Payment Terms</Link></li>
              <li><Link href="/corporate-purchases">Corporate & Bulk Purchases</Link></li>
            </ul>
          </div>

          {/* Placeholder for Alignment */}
          <div className="hidden lg:block"></div>

          {/* Connect With Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">CONNECT WITH US</h3>
            <p className="mb-4">info@bidhaasphia.online</p>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl"><FaFacebook /></a>
              <a href="#" className="text-2xl"><FaTwitter /></a>
              <a href="#" className="text-2xl"><FaInstagram /></a>
              <a href="#" className="text-2xl"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Earn Rewards Everytime You Shop</h3>
            </div>

            {/* Payment Methods */}
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Payment Methods</h4>
              <div className="flex space-x-4">
                {/* PayPal Icon */}
                <a href="#" className="text-2xl"><SiPaypal /></a>
                {/* Mpesa Icon (custom) */}
                <a href="#" className="text-2xl"><MdPayment /></a>
                {/* Airtel Money Icon (custom) */}
                <a href="#" className="text-2xl"><MdPayment /></a>
              </div>
            </div>

            {/* Copyright Section */}
            <div className="w-full md:w-1/3 text-sm">
              <p>&copy; 2025 BidhaaSphia Limited. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
