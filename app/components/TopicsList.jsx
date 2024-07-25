"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/topics", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await res.json();
        setTopics(data.topics);
      } catch (error) {
        console.log("Error loading topics", error);
      }
    };

    getTopics();
  }, []);

  return (
    // <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
    //   <div>
    //     <h2 className="font-bold text-2xl">Topic Title</h2>
    //     <div>Topic Description</div>
    //   </div>
    //   <div className="flex gap-2">
    //     <RemoveBtn />
    //     <Link href={"/editTopic/123"}>
    //       <HiPencilAlt size={24} />
    //     </Link>
    //   </div>
    // </div>

    <div className="">
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start bg-black bg-opacity-85"
        >
          <div>
            <h2 className="font-bold text-2xl text-white">{t.title}</h2>
            <div className="text-white">{t.description}</div>
          </div>
          <div className="flex gap-2 text-white">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} className="hover:text-yellow-500" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
