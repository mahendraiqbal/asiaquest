import React from "react";
import EditToDoForm from "@/components/EditToDoForm";

const getTodoById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch To Do List");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const { todo } = await getTodoById(id);
  const { title, description } = todo;
  return (
    <>
      <EditToDoForm id={id} title={title} description={description} />
    </>
  );
}
