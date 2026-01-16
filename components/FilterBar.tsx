"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [type, setType] = useState(searchParams.get("type") || "");
    const [pref, setPref] = useState(searchParams.get("pref") || "");

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (type) params.set("type", type);
        if (pref) params.set("pref", pref);

        router.push(`/rooms?${params.toString()}`);
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search location (e.g. Indiranagar)"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none text-gray-700"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex w-full md:w-auto gap-4">
                <select
                    className="w-full md:w-40 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none text-gray-700 appearance-none cursor-pointer"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Any Type</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="Single Room">Single Room</option>
                    <option value="PG">PG</option>
                </select>

                <select
                    className="w-full md:w-40 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none text-gray-700 appearance-none cursor-pointer"
                    value={pref}
                    onChange={(e) => setPref(e.target.value)}
                >
                    <option value="">Any Pref</option>
                    <option value="Family">Family</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Girls Only">Girls Only</option>
                    <option value="Boys Only">Boys Only</option>
                </select>
            </div>

            <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
                <Search className="w-5 h-5" />
                Search
            </button>
        </div>
    );
}
