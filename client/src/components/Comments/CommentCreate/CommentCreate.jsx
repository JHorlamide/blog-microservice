import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `http://localhost:8001/posts/${postId}/comments`,
        {
          content: comment,
        }
      );
      setComment("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full px-1 my-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="comment" className="text-white">
            New Comment
          </label>
          <input
            type="text"
            value={comment}
            name="comment"
            className="w-full px-1 py-2 border rounded-md focus:outline-gray-300"
            onChange={handleChange}
          />
        </div>

        <button className="px-1 py-1 mt-2 bg-gray-400 rounded-md" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
