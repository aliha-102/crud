"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function addTopic() {

      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");

      const router = useRouter();

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
          alert("Title and Description are required.");
          return;
        }

        try {
          const res = await fetch("http://localhost:3000/api/topics", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
          });
          if (res.ok) {
            router.push("/");
            router.refresh();
          } else {
            throw new Error("Failed to create a topic");
          }
        } catch (error) {
          console.log(error);
        }
      };


    return (
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-500 px-8 py2"
          value={title}
          type="text"
          placeholder="Topic Title"
        />

        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py2"
          type="text"
          placeholder="Topic Description"
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Add Topic
        </button>
      </form>
    );
}