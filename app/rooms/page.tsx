import { createClient } from "@supabase/supabase-js";
import FilterBar from "@/components/FilterBar";
import RoomCard, { Room } from "@/components/RoomCard";
import { Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from 'react';

export const dynamic = "force-dynamic";

// Using a separate component for the listings to safe-guard useSearchParams usage in Suspense
async function RoomList({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

    // We recreate client here for server component to avoid caching stale auth (though public read doesn't matte much)
    const supabase = createClient(supabaseUrl, supabaseKey);

    const loc = typeof params.location === 'string' ? params.location : null;
    const type = typeof params.type === 'string' ? params.type : null;
    const pref = typeof params.pref === 'string' ? params.pref : null;

    let query = supabase.from("rooms").select("*");

    if (loc) query = query.ilike("location", `%${loc}%`);
    if (type) query = query.eq("property_type", type);
    if (pref) query = query.eq("tenant_preference", pref);

    let data = null;
    let error = null;

    try {
        const result = await query;
        data = result.data;
        error = result.error;
    } catch (err) {
        console.log("Supabase connection failed (using mock data):", err);
        error = { message: "Connection failed" };
    }

    let rooms: Room[] = [];

    if (error || !data) {
        console.log("Supabase error (expected if table missing):", error);
        // Fallback Mock Data for Demo
        rooms = [
            {
                id: "1",
                title: "Spacious 2 BHK in Indiranagar",
                price: 25000,
                location: "Indiranagar, Bangalore",
                property_type: "2 BHK",
                tenant_preference: "Family",
                image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
                contact_phone: "9876543210"
            },
            {
                id: "2",
                title: "Cozy Studio near Koramangala",
                price: 12000,
                location: "Koramangala, Bangalore",
                property_type: "1 BHK",
                tenant_preference: "Bachelor",
                image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
                contact_phone: "9123456780"
            },
            {
                id: "3",
                title: "Luxury Villa Room",
                price: 18000,
                location: "Whitefield, Bangalore",
                property_type: "Villa",
                tenant_preference: "Any",
                image_url: "https://images.unsplash.com/photo-1502005229762-cf1afd38088d",
                contact_phone: "9988776655"
            }
        ];
        // Simple client-side filter for mock data
        if (loc) rooms = rooms.filter(r => r.location.toLowerCase().includes(loc.toLowerCase()));
        if (type) rooms = rooms.filter(r => r.property_type === type);
        if (pref) rooms = rooms.filter(r => r.tenant_preference === pref);

    } else {
        rooms = data as Room[];
    }

    if (rooms.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Search className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No rooms found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search for a different location.</p>
                <Link href="/rooms" className="text-primary-600 font-medium hover:underline">Clear all filters</Link>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    );
}

export default function RoomsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Available Rooms</h1>
                    <p className="text-gray-500 mt-1">Find your next home from our verified listings.</p>
                </div>
                <div className="hidden md:block">
                    {/* Sort or simplified count could go here */}
                </div>
            </div>

            <Suspense fallback={<div className="h-20 bg-gray-50 rounded-xl animate-pulse"></div>}>
                <FilterBar />
            </Suspense>

            <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading rooms...</div>}>
                <RoomList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
