"use client";

import { useState } from "react";
import { Loader2, PlusCircle, Save } from "lucide-react";

export default function AddressForm({ onSubmit, initialData = {}, isProcessing = false }) {
    const [formData, setFormData] = useState({
        type: initialData.type || "",
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        address_line_1: initialData.address_line_1 || "",
        address_line_2: initialData.address_line_2 || "",
        city: initialData.city || "",
        state: initialData.state || "",
        postal_code: initialData.postal_code || "",
        country: initialData.country || "",
        email_address: initialData.email_address || "",
        phone_number: initialData.phone_number || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ↓ Edit Intent
        if (initialData.id) {
            onSubmit({ data: { id: initialData.id, ...formData }, method: "PATCH" });
            return;
        }
        // ↓ Create Intent
        onSubmit({ data: formData, method: "POST" });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address Type */}
                <div className="col-span-2">
                    <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
                        Address Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="billing">Billing</option>
                        <option value="shipping">Shipping</option>
                    </select>
                </div>

                {/* First Name */}
                <div>
                    <label htmlFor="first_name" className="block text-gray-700 font-medium mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="last_name" className="block text-gray-700 font-medium mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                {/* Address Line 1 */}
                <div className="col-span-2">
                    <label htmlFor="address_line_1" className="block text-gray-700 font-medium mb-2">
                        Address Line 1
                    </label>
                    <input
                        type="text"
                        id="address_line_1"
                        name="address_line_1"
                        value={formData.address_line_1}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                {/* Address Line 2 */}
                <div className="col-span-2">
                    <label htmlFor="address_line_2" className="block text-gray-700 font-medium mb-2">
                        Address Line 2 (Optional)
                    </label>
                    <input
                        type="text"
                        id="address_line_2"
                        name="address_line_2"
                        value={formData.address_line_2}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* City */}
                <div>
                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                {/* State */}
                <div>
                    <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                        State/Province
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                {/* Postal Code */}
                <div>
                    <label htmlFor="postal_code" className="block text-gray-700 font-medium mb-2">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                {/* Country */}
                <div>
                    <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                {/* Email Address */}
                <div>
                    <label htmlFor="email_address" className="block text-gray-700 font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email_address"
                        name="email_address"
                        value={formData.email_address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phone_number" className="block text-gray-700 font-medium mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
                <button
                    disabled={isProcessing}
                    type="submit"
                    className="cursor-pointer bg-orange-500 text-white font-bold flex items-center space-x-2 px-6 py-4 rounded-lg transition hover:scale-105 active:scale-100 disabled:cursor-not-allowed"
                >
                    {initialData.id ? (
                        <>
                            {isProcessing ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            <span>Update Address</span>
                        </>
                    ) : (
                        <>
                            {isProcessing ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
                            <span>Add Address</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}