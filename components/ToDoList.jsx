"use client";

import React, { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

async function getTodos() {
  try {
    const res = await fetch("http://localhost:3000/api/todos", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    return res.json();
  } catch (error) {
    console.log("error loading todos: ", error);
  }
}

async function updateTodoStatus(todoId, newStatus) {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      throw new Error("Failed to update todo status");
    }
  } catch (error) {
    console.log("error updating todo status: ", error);
  }
}

function ToDoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const data = await getTodos();
      if (data) {
        setTodos(data.todos);
      }
    }
    fetchTodos();
  }, []);

  const handleCheckboxClick = async (todo) => {
    const newStatus = todo.status === "Completed" ? "Pending" : "Completed";
    const updatedTodo = { ...todo, status: newStatus };
    await updateTodoStatus(todo._id, newStatus);

    // Update the status in the local state
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t._id === todo._id ? updatedTodo : t))
    );
  };

  return (
    <>
      {todos.map((t) => (
        <div
          className={`p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start ${
            t.status === "Completed" ? "bg-red-900" : ""
          }`}
          key={t._id}
        >
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id={`checkbox-${t._id}`}
              onChange={() => handleCheckboxClick(t)}
              checked={t.status === "Completed"}
            />
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editToDo/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
      <div className="fixed bottom-20 right-20 flex items-center">
        <Link href="/addToDo">
          <div
            className="bg-white p-2 text-black rounded-full flex items-center justify-center"
            style={{ width: "40px", height: "40px" }}
          >
            <span className="text-xl font-bold">+</span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ToDoList;
