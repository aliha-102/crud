"use client";

import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      setLoading(true);
      try {
        const res = await fetch(`/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete the topic");
        }


        // Refresh the page or the data after deleting the topic
        router.push("/");
        router.refresh();
      } catch (error) {
        alert("Error deleting topic. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={removeTopic}
      disabled={loading}
      className={`text-red-400 ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:text-red-600"
      } transition duration-200`}
    >
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
