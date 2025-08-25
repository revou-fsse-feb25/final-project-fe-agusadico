import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-yellow-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-12 pb-6 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/images/ramen-president-logo-footer.png" alt="Logo" width={151} height={42} />
          </div>
          <div className="text-sm mb-4 dark:text-gray-300">Keadilan Rasa untuk Seluruh Rakyat</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="fa-solid fa-location-dot"></span>
            <span className="text-xs dark:text-gray-300">Jl. Prof. DR. Satrio No.164, Karet Semanggi, Kecamatan Setiabudi, Jakarta, Kota Jakarta Selatan</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="fa-brands fa-whatsapp"></span>
            <span className="text-xs dark:text-gray-300">+62812 3456 7890</span>
          </div>
          <div className="flex gap-2">
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"><span className="fa-brands fa-facebook"></span></a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"><span className="fa-brands fa-instagram"></span></a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"><span className="fa-brands fa-tiktok"></span></a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"><span className="fa-brands fa-linkedin"></span></a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <div className="font-bold mb-3 dark:text-white">Quick Links</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline dark:text-gray-300 dark:hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:underline dark:text-gray-300 dark:hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/event" className="hover:underline dark:text-gray-300 dark:hover:text-white transition-colors">Event</Link></li>
            <li><Link href="/menu" className="hover:underline dark:text-gray-300 dark:hover:text-white transition-colors">Menu</Link></li>
            <li><Link href="/contact" className="hover:underline dark:text-gray-300 dark:hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:underline dark:text-gray-300 dark:hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:underline dark:text-gray-300 dark:hover:text-white transition-colors">Partnership & Sponsorship</Link></li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <div className="font-bold mb-3 dark:text-white">Sign Up Newsletter</div>
          <form className="flex mb-3">
            <input type="email" placeholder="Type Your E-mail" className="rounded-l px-3 py-2 bg-amber-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-colors" />
            <button type="submit" className="restaurant-bg px-4 rounded-r text-white font-bold hover:bg-red-700 transition-colors">→</button>
          </form>
          <div className="text-xs mb-2 dark:text-gray-300">Download App on Mobile :<br /><span className="text-xs mb-2 font-bold dark:text-gray-300">15% discount on your first purchase</span></div>
          <div className="flex gap-2">
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"><span className="fa-brands fa-google-play"></span></a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"><span className="fa-brands fa-app-store"></span></a>
          </div>
        </div>
      </div>
      <div className="border-t border-red-700 dark:border-gray-700 border-opacity-20 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="text-xs dark:text-gray-400">© 2025 Ramen President. All rights reserved. This task was completed by Agus Purwadi as Final Project of RevoU</div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <span className="fa-brands fa-paypal text-gray-800 dark:text-gray-400"></span>
          <span className="fa-brands fa-cc-visa text-gray-800 dark:text-gray-400"></span>
          <span className="fa-brands fa-cc-mastercard text-gray-800 dark:text-gray-400"></span>      
        </div>
      </div>
    </footer>
  );
}