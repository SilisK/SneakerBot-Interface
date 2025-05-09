"use client";

import { useEffect, useState } from "react";
import AddressesHeader from "./components/addresses-header";
import ModalWrapper from "../modal-wrapper";
import AddressForm from "./components/address-form";
import AddressesList from "./components/addresses-list";

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 3;

    const fetchAddresses = async (page = 1) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 250));
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/addresses?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            const json = await res.json();

            setAddresses(json.data?.addresses || []);
            setTotalPages(json.data?.totalPages || 1);
            setTotalItems(json.data?.total || 0);
        } catch (err) {
            console.error("Failed to fetch addresses", err);
        } finally {
            setLoading(false);
        }
    };

    // Add an address
    const [isAddressFormModalOpen, setIsAddressFormModalOpen] = useState(false);
    const [isProcessingAddress, setIsProcessingAddress] = useState(false);
    const openModal = () => setIsAddressFormModalOpen(true);
    const closeModal = () => setIsAddressFormModalOpen(false);

    // Edit an address
    const [addressToEdit, setAddressToEdit] = useState(null);

    const onSubmitAddressForm = async (submission) => {
        setIsProcessingAddress(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { data: formData, method } = submission;
        const endpoint = process.env.NEXT_PUBLIC_API_URL + "/addresses" + (method == "PATCH" ? ("/" + formData.id) : "");
        delete formData.id;
        console.log(formData, method, endpoint);

        const request = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(formData)
        });
        const response = await request.json();
        console.log(response);

        setIsProcessingAddress(false);
        setIsAddressFormModalOpen(false);
    }

    useEffect(() => {
        fetchAddresses(page);
    }, [page, isProcessingAddress]);

    return (
        <>
            <ModalWrapper
                isOpen={isAddressFormModalOpen}
                onClose={() => {
                    if (isProcessingAddress) {
                        return;
                    }

                    setAddressToEdit(null);
                    closeModal();
                }}
            >
                <AddressForm
                    onSubmit={onSubmitAddressForm}
                    isProcessing={isProcessingAddress}
                    // ↓ Edit Intent
                    initialData={addressToEdit || {}}
                />
            </ModalWrapper>
            <div className="grid gap-4 border-gray-200 border bg-white rounded-lg p-4">
                <AddressesHeader onClickAddAddress={openModal} />
                <AddressesList
                    addresses={addresses}
                    loading={loading}
                    // ↓ Pagination
                    setPage={setPage}
                    page={page}
                    limit={limit}
                    totalItems={totalItems}
                    totalPages={totalPages}
                    // ↓ Edit Intent
                    setAddressToEdit={setAddressToEdit}
                    setAddressFormIsOpen={setIsAddressFormModalOpen}
                />
            </div>
        </>
    );
}
