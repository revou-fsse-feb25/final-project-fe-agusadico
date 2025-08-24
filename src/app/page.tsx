'use client'
import Image from "next/image";
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import Link from "next/link";

export default function Home() {
  return (
    <div className="restaurant-bg min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />
      
      {/* Search Bar */}
      <SearchBar />

      {/* Hero Section */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
          {/* Food Image with Discount */}
          <div className="relative mb-4 md:mb-0 w-full md:w-1/2">
            <div className="relative">
              <Image 
                src="/images/ramen-president-banner.png" 
                alt="Delicious Food" 
                width={600} 
                height={600}
                className="rounded-full mx-auto"
              />
            </div>
          </div>
          
          {/* Hero Text */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <h2 className="text-5xl font-bold mb-4 text-white">"Keadilan Rasa untuk Seluruh Rakyat"</h2>
            <p className="mb-8 text-lg text-white">
              <b>Taste Justice, Enjoyment for All!</b> Every bowl from Ramen President is crafted with championship flavor, serving up taste equality in every bite. Savor authentic ramen and Japanese specialties made for everyone.
            </p>
            <Link href="/menu" className="bg-yellow-400 text-red-800 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Our Menu Section */}
      <MenuCard />

      {/* Main Footer */}
      <Footer />
    </div>
  );
}
