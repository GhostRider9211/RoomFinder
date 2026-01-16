import Link from "next/link";
import { Search, MapPin, Home as HomeIcon, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary-900 text-white py-20 px-6 sm:px-12 text-center md:text-left">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-4xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Find your perfect <br className="hidden md:block" />
            <span className="text-primary-300">rental space</span> in seconds.
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl">
            Explore verified listings, connect directly with owners, and move in stress-free. No hidden fees, just great rooms.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Search className="w-5 h-5" />
              Browse Rooms
            </Link>
            <Link
              href="/dashboard/add-room"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary-400 text-white font-bold px-8 py-4 rounded-full hover:bg-primary-800 transition-all"
            >
              <HomeIcon className="w-5 h-5" />
              List Property
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Smart Search</h3>
          <p className="text-gray-500">Filter by location, price, property type, and tenant preference to find exactly what you need.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Verified Listings</h3>
          <p className="text-gray-500">All listings are reviewed to ensure authentic photos and accurate details for peace of mind.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Prime Locations</h3>
          <p className="text-gray-500">Access thousands of rental options in top neighborhoods and upcoming areas near you.</p>
        </div>
      </section>
    </div>
  );
}
