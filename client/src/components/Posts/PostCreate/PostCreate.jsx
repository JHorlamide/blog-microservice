import React, { useState } from "react";
import axios from "axios";

const Posts = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/posts", { title });
      setTitle("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="container py-12 mx-auto">
      <form className="flex flex-col w-full space-y-5" onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold">Create New Post</h1>
        <div className="flex flex-col space-y-5">
          <label htmlFor="post">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-gray-300"
            onChange={handleChange}
            name="post"
            value={title}
            placeholder="Enter post"
          />

          <button className="px-3 py-2 text-white bg-gray-700 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Posts;
