"use client";

import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function EditToDoForm({ id, title, description }) {
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDescription, setNewDescription] = React.useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (res.ok) {
        // Use Swal for success message
        Swal.fire(
          "Success",
          "To Do List updated successfully!",
          "success"
        ).then(() => {
          router.refresh();
          router.push("/");
        });
      } else {
        // Use Swal for error message
        Swal.fire("Error", "Failed to update the To Do List", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="border border-slate-500 px-8 py-2 text-black"
          type="text"
          placeholder="To Do Title"
        />
        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className="border border-slate-500 px-8 py-2 text-black"
          type="text"
          placeholder="To Do Description"
        />

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-lg">
          Edit To Do
        </button>
      </form>
    </>
  );
}
