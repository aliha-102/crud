import connectMongoDB from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  const topic = await Topic.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );

  if (!topic) {
    return NextResponse.json({ message: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Topic updated", topic },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}

async function fetchTopics() {
  if (process.env.NODE_ENV === "production") {
    const response = await fetch("/api/topics");
    return await response.json();
  } else {
    return mockTopics;
  }
}
