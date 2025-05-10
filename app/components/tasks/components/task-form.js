"use client";

import { useState } from "react";
import { Loader2, PlusCircle, Save } from "lucide-react";
import TaskAddressDropdown from "./task-address-dropdown";
import SizeDropdown from "./size-dropdown";

export default function TaskForm({ onSubmit, initialData = {}, isProcessing = false }) {
    const [formData, setFormData] = useState({
        site_id: initialData.site_id || "",
        url: initialData.url || "",
        style_index: initialData.style_index || "",
        size: initialData.size || "",
        shipping_speed_index: initialData.shipping_speed_index || "",
        billing_address_id: initialData.billing_address_id || "",
        shipping_address_id: initialData.shipping_address_id || "",
        notification_email_address: initialData.notification_email_address || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Edit or Create intent
        if (initialData.id) {
            onSubmit({ data: { id: initialData.id, ...formData }, method: "PATCH" });
            return;
        }
        onSubmit({ data: formData, method: "POST" });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl max-h-[768px] overflow-y-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="site_id" className="block text-gray-700 font-medium mb-2">
                        Site ID
                    </label>
                    <input
                        type="number"
                        id="site_id"
                        name="site_id"
                        value={formData.site_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                <div className="col-span-2 space-y-2">
                    <label htmlFor="url" className="block text-gray-700 font-medium">
                        Product URL
                    </label>
                    <p className="text-zinc-500">This can be on nike.com, a shopify store, etc...</p>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="style_index" className="block text-gray-700 font-medium mb-2">
                        Style Index
                    </label>
                    <input
                        type="number"
                        id="style_index"
                        name="style_index"
                        value={formData.style_index}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                <div>
                    <SizeDropdown
                        value={formData.size}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="shipping_speed_index" className="block text-gray-700 font-medium mb-2">
                        Shipping Speed Index
                    </label>
                    <input
                        type="number"
                        id="shipping_speed_index"
                        name="shipping_speed_index"
                        value={formData.shipping_speed_index}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>

                <div className="grid gap-4">
                    <TaskAddressDropdown
                        name="billing_address_id"
                        label="Billing Address"
                        value={formData.billing_address_id}
                        onChange={handleChange}
                        required
                    />

                    <TaskAddressDropdown
                        name="shipping_address_id"
                        label="Shipping Address"
                        value={formData.shipping_address_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-span-2 space-y-2">
                    <label htmlFor="notification_email_address" className="block text-gray-700 font-medium">
                        Notification Email
                    </label>
                    <p className="text-zinc-500">You'll receive updates about your tasks at the provided email address.</p>
                    <input
                        type="email"
                        id="notification_email_address"
                        name="notification_email_address"
                        value={formData.notification_email_address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button
                    disabled={isProcessing}
                    type="submit"
                    className="cursor-pointer bg-orange-500 text-white font-bold flex items-center space-x-2 px-6 py-4 rounded-lg transition hover:scale-105 active:scale-100 disabled:cursor-not-allowed"
                >
                    {initialData.id ? (
                        <>
                            {isProcessing ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            <span>Update Task</span>
                        </>
                    ) : (
                        <>
                            {isProcessing ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
                            <span>Add Task</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
