"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, Home, User, LogOut, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { user, signOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
                    <Home className="w-6 h-6" />
                    <span>RoomFinder</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/rooms" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                        Find Rooms
                    </Link>

                    {user ? (
                        <>
                            <Link href="/dashboard/add-room" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium transition-colors">
                                <PlusCircle className="w-4 h-4" />
                                List Room
                            </Link>
                            <Link href="/dashboard/my-rooms" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                                My Listings
                            </Link>
                            <div className="h-6 w-px bg-gray-200" />
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm">Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-medium transition-colors"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white p-4 space-y-4">
                    <Link href="/rooms" className="block text-gray-600 font-medium py-2">
                        Find Rooms
                    </Link>
                    {user ? (
                        <>
                            <Link href="/dashboard/add-room" className="block text-gray-600 font-medium py-2">
                                List a Room
                            </Link>
                            <Link href="/dashboard/my-rooms" className="block text-gray-600 font-medium py-2">
                                My Listings
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 text-red-500 font-medium py-2 w-full"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            <Link href="/login" className="block text-center text-gray-600 font-medium py-2 border border-gray-200 rounded-lg">
                                Log In
                            </Link>
                            <Link href="/signup" className="block text-center bg-primary-600 text-white font-medium py-3 rounded-lg">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
