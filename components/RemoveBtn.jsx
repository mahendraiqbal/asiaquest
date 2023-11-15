"use client";

import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function RemoveBtn({ id }) {
  const removeTodo = async () => {
    // Use Swal2 to show a confirmation dialog
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed) {
      const res = await fetch(`http://localhost:3000/api/todos?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Use Swal2 to show a success message
        Swal.fire({
          title: "Deleted!",
          text: "Your todo has been deleted.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } else {
        // Use Swal2 to show an error message
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the todo.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <button className="text-red-400" onClick={removeTodo}>
        <HiOutlineTrash size={24} />
      </button>
    </>
  );
}

export default RemoveBtn;
