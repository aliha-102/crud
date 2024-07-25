import React from "react";
import EditTopicForm from "../../components/EditTopicForm";
import connectMongoDB from "../../../libs/mongodb";
import Topic from "../../../models/topic";

const getTopicById = async (id) => {
  await connectMongoDB();
  const topic = await Topic.findById(id);
  return topic;
};

const Page = async ({ params }) => {
  const { id } = params;
  const topic = await getTopicById(id);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  const { title, description } = topic;

  return <EditTopicForm id={id} title={title} description={description} />;
};

export default Page;
