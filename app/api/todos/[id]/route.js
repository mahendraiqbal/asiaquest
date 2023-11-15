import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const { id } = params;
    const {newTitle: title, newDescription: description, newStatus: status} = await request.json();
    await connectMongoDB();
    await Todo.findByIdAndUpdate(id, { title, description, status });
    return NextResponse.json({ message: "Todo updated" }, {status: 200});
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const todo = await Todo.findOne({ _id: id});
    return NextResponse.json({ todo }, {status: 200});
}