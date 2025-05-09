"use client";

import { ArrowLeft, ArrowRight, Building, Edit, Loader2 } from "lucide-react";

const AddressListItem = ({ addr, setAddressToEdit, setAddressFormIsOpen }) => {
    return (
        <li className="flex items-end justify-between gap-4 flex-wrap border-gray-200 border bg-white p-2 rounded text-sm text-gray-700">
            <section>
                <div className="font-medium">
                    {addr.first_name} {addr.last_name}
                </div>
                <div>{addr.address_line_1}</div>
                {addr.address_line_2 && <div>{addr.address_line_2}</div>}
                <div>
                    {addr.city}, {addr.state} {addr.postal_code}
                </div>
                <div>{addr.country}</div>
                <div className="text-xs text-gray-500">
                    {addr.email_address} • {addr.phone_number}
                </div>
            </section>
            <section className="grid grid-cols-[auto_auto] gap-4 place-content-end">
                <button
                    onClick={() => {
                        setAddressToEdit(addr);
                        setAddressFormIsOpen(true);
                    }}
                    type="submit"
                    className="cursor-pointer bg-sky-500 text-white font-bold flex items-center space-x-2 px-4 py-2 rounded-lg transition hover:scale-105 active:scale-100 disabled:cursor-not-allowed"
                >
                    <Edit />
                    <span>Update</span>
                </button>
                {/* <button
                    type="submit"
                    className="cursor-pointer bg-red-500 text-white font-bold flex items-center space-x-2 px-4 py-2 rounded-lg transition hover:scale-105 active:scale-100 disabled:cursor-not-allowed"
                >
                    Delete
                </button> */}
            </section>
        </li>
    );
}

export default function AddressesList({
    loading,
    addresses,
    setPage,
    page,
    limit,
    totalItems,
    totalPages,
    setAddressToEdit,
    setAddressFormIsOpen
}) {
    const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
    const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

    const start = (page - 1) * limit + 1;
    const end = Math.min(start + addresses.length - 1, totalItems);

    return (
        <>
            <ul className="space-y-2 h-[275px] overflow-y-auto">
                {loading && <Loader2 className="animate-spin text-zinc-500" />}
                {!loading && addresses.length === 0 && (
                    <div className="flex items-center space-x-2 text-zinc-500">
                        <Building />
                        <span>No addresses yet.</span>
                    </div>
                )}
                {!loading &&
                    addresses.map((addr) => (
                        <AddressListItem
                            key={addr.id}
                            addr={addr}
                            setAddressToEdit={setAddressToEdit}
                            setAddressFormIsOpen={setAddressFormIsOpen}
                        />
                    ))}
            </ul>

            {!loading && (
                <div className="w-max gap-4 flex justify-between items-center mt-4 text-sm text-gray-600">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="cursor-pointer px-2 py-1 rounded disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ArrowLeft />
                    </button>
                    <span>
                        Showing {start}–{end} of {totalItems}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className="cursor-pointer px-2 py-1 rounded disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ArrowRight />
                    </button>
                </div>
            )}
        </>
    );
}