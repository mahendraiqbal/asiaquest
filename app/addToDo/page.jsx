"use client";

import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AddToDo() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        // Use Swal for success message
        Swal.fire(
          "Success",
          "To Do List created successfully!",
          "success"
        ).then(() => {
          router.push("/");
        });
      } else {
        // Use Swal for error message
        Swal.fire("Error", "Failed to create a To Do List", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-8 py-2 text-black"
          type="text"
          placeholder="To Do Title"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py-2 text-black"
          type="text"
          placeholder="To Do Description"
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-lg"
        >
          Add To Do
        </button>
      </form>
    </>
  );
}
