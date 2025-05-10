"use client";

import { useEffect, useState } from "react";
import TasksHeader from "./components/tasks-header";
import TasksList from "./components/tasks-list";
import TaskForm from "./components/task-form";
import ModalWrapper from "../modal-wrapper";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 5;

    const fetchTasks = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks?page=${page}&limit=${limit}`,
                {
                    headers: { Accept: "application/json" },
                }
            );
            const json = await res.json();
            setTasks(json.data?.tasks || []);
            setTotalPages(json.data?.totalPages || 1);
            setTotalItems(json.data?.total || 0);
        } catch (err) {
            console.error("Failed to fetch tasks", err);
        } finally {
            setLoading(false);
        }
    };

    const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
    const [isProcessingTask, setIsProcessingTask] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const openModal = () => setIsTaskFormModalOpen(true);
    const closeModal = () => setIsTaskFormModalOpen(false);

    const onSubmitTaskForm = async ({ data, method }) => {
        setIsProcessingTask(true);
        const endpoint =
            `${process.env.NEXT_PUBLIC_API_URL}/tasks` +
            (method === "PATCH" ? `/${data.id}` : "");
        if (method === "PATCH") delete data.id;

        try {
            await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } catch (err) {
            console.error("Failed to submit task", err);
        } finally {
            setIsProcessingTask(false);
            closeModal();
            setTaskToEdit(null);
        }
    };

    const onDeleteTask = async (id) => {
        setIsProcessingTask(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
        } catch (err) {
            console.error("Failed to delete task", err);
        } finally {
            setIsProcessingTask(false);
        }
    };

    useEffect(() => {
        fetchTasks(page);
    }, [page, isProcessingTask]);

    return (
        <>
            <ModalWrapper
                isOpen={isTaskFormModalOpen}
                onClose={() => {
                    if (isProcessingTask) return;
                    setTaskToEdit(null);
                    closeModal();
                }}
            >
                <TaskForm
                    onSubmit={onSubmitTaskForm}
                    isProcessing={isProcessingTask}
                    initialData={taskToEdit || {}}
                />
            </ModalWrapper>

            <div className="grid gap-4 border-gray-200 border bg-white rounded-lg p-4">
                <TasksHeader onClickAddTask={openModal} />
                <TasksList
                    tasks={tasks}
                    loading={loading}
                    setPage={setPage}
                    page={page}
                    limit={limit}
                    totalItems={totalItems}
                    totalPages={totalPages}
                    setTaskToEdit={setTaskToEdit}
                    setTaskFormIsOpen={setIsTaskFormModalOpen}
                    onDelete={onDeleteTask}
                />
            </div>
        </>
    );
}
