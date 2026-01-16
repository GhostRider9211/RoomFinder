"use client";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Bed, User, Phone, Home } from "lucide-react";

export type Room = {
    id: string;
    title: string;
    price: number;
    location: string;
    property_type: string;
    tenant_preference: string;
    image_url: string;
    contact_phone: string;
    description?: string;
};

export default function RoomCard({ room }: { room: Room }) {
    const [showContact, setShowContact] = useState(false);
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-56 w-full bg-gray-200">
                {/* Use a placeholder if image load fails or is empty, simplified for now */}
                {room.image_url ? (
                    <Image
                        src={room.image_url}
                        alt={room.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Home className="w-12 h-12" />
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-700 uppercase tracking-wider shadow-sm">
                    {room.property_type}
                </div>
            </div>

            <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{room.title}</h3>
                    <p className="font-bold text-primary-600 shrink-0">₹{room.price.toLocaleString()}<span className="text-gray-400 text-sm font-normal">/mo</span></p>
                </div>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="line-clamp-1">{room.location}</span>
                </div>

                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-primary-500" />
                        <span>{room.tenant_preference}</span>
                    </div>
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowContact(!showContact);
                        }}
                        className="bg-gray-50 rounded-lg p-2 flex items-center justify-center text-primary-600 font-medium text-sm cursor-pointer hover:bg-primary-50 transition-colors"
                    >
                        <Phone className="w-4 h-4 mr-2" />
                        {showContact ? room.contact_phone : "Show Contact"}
                    </div>
                </div>
            </div>
        </div>
    );
}
