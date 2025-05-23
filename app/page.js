"use client";

import { useEffect } from "react";
import Addresses from "./components/addresses/addresses";
import { Bot } from "lucide-react";
import Tasks from "./components/tasks/tasks";

export default function Home() {
  const initializeData = async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const request = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "GET"
    });
    const response = await request.json();
    console.log(response);
  }
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <div>
      <main className="overflow-y-auto container mx-auto p-4 space-y-4 h-screen">
        {/* <h1 className="flex items-center space-x-2 text-5xl font-semibold">
          <Bot size={55} />
          <span>Sneaker Bot</span>
        </h1> */}
        <Addresses />
        <Tasks />
      </main>
    </div>
  );
}
