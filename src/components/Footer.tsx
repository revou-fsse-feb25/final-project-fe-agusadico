import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-yellow-500 text-gray-800 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/images/ramen-president-logo-footer.png" alt="Logo" width={151} height={42} />
          </div>
          <div className="text-sm mb-4">Keadilan Rasa untuk Seluruh Rakyat</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="fa-solid fa-location-dot"></span>
            <span className="text-xs">Jl. Prof. DR. Satrio No.164, Karet Semanggi, Kecamatan Setiabudi, Jakarta, Kota Jakarta Selatan</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="fa-brands fa-whatsapp"></span>
            <span className="text-xs">+62812 3456 7890</span>
          </div>
          <div className="flex gap-2">
            <a href="#"><span className="fa-brands fa-facebook"></span></a>
            <a href="#"><span className="fa-brands fa-instagram"></span></a>
            <a href="#"><span className="fa-brands fa-tiktok"></span></a>
            <a href="#"><span className="fa-brands fa-linkedin"></span></a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <div className="font-bold mb-3">Quick Links</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/event" className="hover:underline">Event</Link></li>
            <li><Link href="/menu" className="hover:underline">Menu</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/contact" className="hover:underline">Partnership & Sponsorship</Link></li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <div className="font-bold mb-3">Sign Up Newsletter</div>
          {/* <div className="text-sm mb-2">When an unknown printer took a galley of type and scrambled</div> */}
          <form className="flex mb-3">
            <input type="email" placeholder="Type Your E-mail" className="rounded-l px-3 py-2 bg-amber-100 text-black focus:outline-none" />
            <button type="submit" className="restaurant-bg px-4 rounded-r text-black font-bold">→</button>
          </form>
          <div className="text-xs mb-2">Download App on Mobile :<br /><span className="font-bold">15% discount on your first purchase</span></div>
          <div className="flex gap-2">
            <a href="#"><span className="fa-brands fa-google-play"></span></a>
            <a href="#"><span className="fa-brands fa-app-store"></span></a>
          </div>
        </div>
      </div>
      <div className="border-t border-red-700 border-opacity-20 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="text-xs">© 2025 Ramen President. All rights reserved. This task was completed by Agus Purwadi as Final Project of RevoU</div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <span className="fa-brands fa-paypal"></span>
          <span className="fa-brands fa-cc-visa"></span>
          <span className="fa-brands fa-cc-mastercard"></span>      
        </div>
      </div>
    </footer>
  );
}