"use client";

import { PlusCircle } from "lucide-react";

export default function TasksHeader({ onClickAddTask }) {
    return (
        <header className="grid lg:grid-cols-[1fr_auto] gap-4">
            <div className="space-y-2">
                <h1 className="text-3xl">Tasks</h1>
                <p className="text-sm text-zinc-500">
                    This is how you can pre-store tasks and start checkouts.
                </p>
            </div>
            <div className="grid lg:place-items-center">
                <button
                    onClick={onClickAddTask}
                    className="h-max w-max cursor-pointer bg-orange-500 text-white font-bold flex items-center space-x-2 px-6 py-4 rounded-lg transition hover:scale-105 active:scale-100">
                    <PlusCircle />
                    <span>Add a task</span>
                </button>
            </div>
        </header>
    );
}