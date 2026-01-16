"use client";
import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Upload, Loader2, Home, MapPin, IndianRupee } from "lucide-react";
import Image from "next/image";

export default function EditRoom({ params }: { params: Promise<{ id: string }> }) {
    const { user } = useAuth();
    const router = useRouter();
    const resolvedParams = use(params);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        property_type: "1 BHK",
        tenant_preference: "Any",
        contact_phone: "",
    });

    useEffect(() => {
        const fetchRoom = async () => {
            if (!user) return;

            const { data, error } = await supabase
                .from('rooms')
                .select('*')
                .eq('id', resolvedParams.id)
                .single();

            if (error) {
                console.error("Error fetching room:", error);
                alert("Error fetching room details");
                router.push("/dashboard/my-rooms");
                return;
            }

            if (data.owner_id !== user.id) {
                alert("You are not authorized to edit this room");
                router.push("/dashboard/my-rooms");
                return;
            }

            setFormData({
                title: data.title,
                description: data.description || "",
                price: data.price.toString(),
                location: data.location,
                property_type: data.property_type,
                tenant_preference: data.tenant_preference,
                contact_phone: data.contact_phone || "",
            });
            setCurrentImageUrl(data.image_url || "");
            setLoading(false);
        };

        fetchRoom();
    }, [user, resolvedParams.id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let imageUrl = currentImageUrl;

            // 1. Upload New Image if selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${user!.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('room-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('room-images')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // 2. Update Room Data
            const { error: updateError } = await supabase
                .from('rooms')
                .update({
                    title: formData.title,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    location: formData.location,
                    property_type: formData.property_type,
                    tenant_preference: formData.tenant_preference,
                    contact_phone: formData.contact_phone,
                    image_url: imageUrl,
                })
                .eq('id', resolvedParams.id);

            if (updateError) throw updateError;

            alert("Room updated successfully!");
            router.push("/dashboard/my-rooms");
            router.refresh();

        } catch (error: any) {
            console.error("Error updating room:", error);
            alert(error.message || "Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-600" /></div>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Edit Property</h1>
                <p className="text-gray-500">Update your property details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="e.g. Spacious 2 BHK near Metro Station"
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Property Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                        <div className="relative">
                            <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                name="property_type"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none appearance-none"
                                value={formData.property_type}
                                onChange={handleChange}
                            >
                                <option value="1 BHK">1 BHK</option>
                                <option value="2 BHK">2 BHK</option>
                                <option value="3 BHK">3 BHK</option>
                                <option value="Single Room">Single Room</option>
                                <option value="PG">PG</option>
                                <option value="Villa">Villa</option>
                            </select>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent (₹)</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                name="price"
                                required
                                placeholder="15000"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="location"
                            required
                            placeholder="Area, City (e.g. Koramangala, Bangalore)"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        placeholder="Tell us more about the property, amenities, rules etc."
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none resize-none"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Tenant Preference */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tenant Preference</label>
                        <select
                            name="tenant_preference"
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                            value={formData.tenant_preference}
                            onChange={handleChange}
                        >
                            <option value="Any">Any</option>
                            <option value="Family">Family</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Girls Only">Girls Only</option>
                            <option value="Boys Only">Boys Only</option>
                        </select>
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                        <input
                            type="tel"
                            name="contact_phone"
                            required
                            placeholder="9876543210"
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                            value={formData.contact_phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Image</label>

                    {currentImageUrl && !imageFile && (
                        <div className="mb-4 relative w-full h-48 rounded-xl overflow-hidden">
                            <Image src={currentImageUrl} alt="Current" fill className="object-cover" />
                        </div>
                    )}

                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">
                            {imageFile ? imageFile.name : "Click to change image"}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
