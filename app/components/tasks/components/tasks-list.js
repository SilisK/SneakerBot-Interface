"use client";

import { ArrowLeft, ArrowRight, Box, Building, CircleDollarSignIcon, Loader2, ShoppingCart, Workflow } from "lucide-react";

const TaskListItem = ({ task, onDelete }) => {
    return (
        <li className="grid gap-4 md:grid-cols-2 border-gray-200 border bg-white p-2 rounded text-sm text-gray-700">
            <section>
            </section>
            <section className="h-full flex gap-4 flex-col justify-between">
                <div className="grid grid-cols-[auto_auto] gap-4 place-content-end">
                    <button
                        onClick={() => onDelete(task.id)}
                        type="submit"
                        className="cursor-pointer bg-red-500 text-white font-bold flex items-center space-x-2 px-4 py-2 rounded-lg transition hover:scale-105 active:scale-100 disabled:cursor-not-allowed"
                    >
                        Delete
                    </button>
                </div>
            </section>
        </li>
    );
}

export default function TasksList({
    loading,
    tasks,
    setPage,
    page,
    limit,
    totalItems,
    totalPages,
    setTaskToEdit,
    setTaskFormIsOpen,
    onDelete
}) {
    const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
    const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

    const start = (page - 1) * limit + 1;
    const end = Math.min(start + tasks.length - 1, totalItems);

    return (
        <>
            <ul className="space-y-2 h-[275px] overflow-y-auto">
                {loading && <Loader2 className="animate-spin text-zinc-500" />}
                {!loading && tasks.length === 0 && (
                    <div className="flex items-center space-x-2 text-zinc-500">
                        <ShoppingCart />
                        <span>No tasks yet.</span>
                    </div>
                )}
                {!loading &&
                    tasks.map((task) => (
                        <taskessListItem
                            key={task.id}
                            task={task}
                            setTaskToEdit={setTaskToEdit}
                            setTaskFormIsOpen={setTaskFormIsOpen}
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