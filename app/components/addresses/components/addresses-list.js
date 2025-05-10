"use client";

import { ArrowLeft, ArrowRight, Box, Building, CircleDollarSignIcon, DollarSign, Edit, Loader2, LucideDelete } from "lucide-react";

const AddressListItem = ({ addr, setAddressToEdit, setAddressFormIsOpen, onDelete }) => {
    return (
        <li className="grid gap-4 md:grid-cols-2 border-gray-200 border bg-white p-2 rounded text-sm text-gray-700">
            <section>
                <div className="font-medium">
                    {addr.first_name} {addr.last_name}
                </div>
                <div>{addr.address_line_1}{addr.address_line_2 && <span> • {addr.address_line_2}</span>}</div>
                <div>
                    {addr.city}, {addr.state} {addr.postal_code}
                </div>
                <div>{addr.country}</div>
                <div className="text-xs text-gray-500">
                    {addr.email_address} • {addr.phone_number}
                </div>
            </section>
            <section className="h-full flex gap-4 text-xs md:flex-col justify-between">
                <div className="flex justify-end">
                    {addr.type == "shipping" && (
                        <div className="flex items-center space-x-2 bg-sky-200 text-zinc-500 px-4 py-2 rounded-3xl w-max">
                            <Box size={15} />
                            <span className="font-semibold">Shipping Addr</span>
                        </div>
                    )}
                    {addr.type == "billing" && (
                        <div className="flex items-center space-x-2 bg-green-100 text-zinc-500 px-4 py-2 rounded-3xl w-max">
                            <CircleDollarSignIcon size={15} />
                            <span className="font-semibold">Billing Addr</span>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-[auto_auto] gap-4 place-content-end">
                    <button
                        onClick={() => {
                            setAddressToEdit(addr);
                            setAddressFormIsOpen(true);
                        }}
                        type="submit"
                        className="cursor-pointer font-bold flex items-center space-x-2 transition hover:scale-105 active:scale-100 disabled:cursor-not-allowed"
                    >
                        <Edit size={20} />
                        <span>Update</span>
                    </button>
                    <button
                        onClick={() => onDelete(addr.id)}
                        type="submit"
                        className="cursor-pointer font-bold flex items-center space-x-2 text-red-500 transition hover:scale-105 active:scale-100 disabled:cursor-not-allowed"
                    >
                        <LucideDelete size={20} />
                        <span>Delete</span>
                    </button>
                </div>
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
    setAddressFormIsOpen,
    onDelete
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
                            onDelete={onDelete}
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