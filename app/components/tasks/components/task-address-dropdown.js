"use client";

import { useEffect, useState } from "react";

export default function TaskAddressDropdown({
    value,
    onChange,
    label = "Select Address",
    name,
    required = false,
}) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            setLoading(true);
            try {
                const type = name.includes("billing") ? "billing" : "shipping";
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/addresses?page=1&limit=100&type=${type}`,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );
                const json = await res.json();
                setAddresses(json.data?.addresses || []);
            } catch (err) {
                console.error("Failed to fetch addresses", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                <option value="">{loading ? "Loading addresses..." : "Select an address"}</option>
                {addresses.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                        {addr.first_name} {addr.last_name} — {addr.address_line_1}
                    </option>
                ))}
            </select>
        </div>
    );
}
