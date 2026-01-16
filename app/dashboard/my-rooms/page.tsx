"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { Room } from "@/components/RoomCard";
import Image from "next/image";
import { Trash2, Edit2, MapPin } from "lucide-react";
import Link from "next/link";

export default function MyRooms() {
    const { user } = useAuth();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMyRooms();
        }
    }, [user]);

    const fetchMyRooms = async () => {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('owner_id', user!.id);

        if (data) setRooms(data as Room[]);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this listing?")) return;

        const { error } = await supabase
            .from('rooms')
            .delete()
            .eq('id', id);

        if (!error) {
            setRooms(rooms.filter(r => r.id !== id));
        } else {
            alert("Error deleting room");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading your listings...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                <Link href="/dashboard/add-room" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                    + Add New
                </Link>
            </div>

            {rooms.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-500 mb-4">You haven't listed any rooms yet.</p>
                    <Link href="/dashboard/add-room" className="text-primary-600 font-bold hover:underline">
                        List your first property
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {rooms.map((room) => (
                        <div key={room.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-center shadow-sm">
                            <div className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                {room.image_url ? (
                                    <Image src={room.image_url} alt={room.title} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 truncate">{room.title}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {room.location}
                                </p>
                                <p className="text-primary-600 font-bold mt-1">₹{room.price.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link href={`/dashboard/edit-room/${room.id}`} className="px-3 py-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors">
                                    <Edit2 className="w-4 h-4" /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(room.id)}
                                    className="px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
