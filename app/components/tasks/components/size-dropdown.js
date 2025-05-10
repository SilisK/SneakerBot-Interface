"use client";

import { sizeOptions } from "@/app/utils/size-map";
import clsx from "clsx";
import { useState } from "react";

export default function SizeSelector({
    value,
    onChange,
    name = "size",
    label = "Select Shoe Size (U.S.)",
    required = false,
}) {
    const [filter, setFilter] = useState("m"); // "m" for men, "w" for women

    const handleSelect = (sizeValue) => {
        const syntheticEvent = {
            target: {
                name,
                value: sizeValue,
            },
        };
        onChange(syntheticEvent);
    };

    const sizeGroups = {
        m: sizeOptions.men.map((size) => ({ label: `US M ${size}`, value: `M ${size}` })),
        w: sizeOptions.women.map((size) => ({ label: `US W ${size}`, value: `W ${size}` })),
    };

    return (
        <div>
            <label className="block text-gray-700 font-medium mb-2">
                {label}{required ? " *" : ""}
            </label>

            {/* Gender toggle */}
            <div className="mb-4 flex gap-2">
                <button
                    type="button"
                    className={clsx(
                        "px-4 py-2 rounded-full border text-sm font-medium transition",
                        filter === "m"
                            ? "bg-orange-500 text-white border-orange-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
                    )}
                    onClick={() => setFilter("m")}
                >
                    Men
                </button>
                <button
                    type="button"
                    className={clsx(
                        "px-4 py-2 rounded-full border text-sm font-medium transition",
                        filter === "w"
                            ? "bg-orange-500 text-white border-orange-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
                    )}
                    onClick={() => setFilter("w")}
                >
                    Women
                </button>
            </div>

            {/* Size selection */}
            <div className="max-h-[200px] overflow-y-auto flex flex-wrap gap-2">
                {sizeGroups[filter].map(({ label, value: sizeValue }) => (
                    <button
                        key={sizeValue}
                        type="button"
                        onClick={() => handleSelect(sizeValue)}
                        className={clsx(
                            "px-4 py-2 rounded-full border text-sm font-medium transition",
                            value === sizeValue
                                ? "bg-orange-500 text-white border-orange-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {required && !value && (
                <p className="text-red-500 text-sm mt-2">Size is required.</p>
            )}
        </div>
    );
}
