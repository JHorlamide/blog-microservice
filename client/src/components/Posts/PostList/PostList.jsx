import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "../../Comments/CommentCreate/CommentCreate";
import CommentList from "../../Comments/CommentList/CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("http://localhost:8002/posts");
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex justify-between space-x-3">
      {Object.values(posts).map((post) => (
        <div
          key={post.id}
          className="px-5 py-5 bg-gray-800 border-gray-700 rounded-md w-72"
        >
          <h1 className="text-white">{post.title}</h1>
          <CommentList postId={post.id} comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      ))}
    </div>
    // <div className="flex justify-between space-x-3">
    //   {Object.values(posts).map((post) => (
    //     <div
    //       key={post.id}
    //       className="px-5 py-5 bg-gray-800 border-gray-700 rounded-md w-72"
    //     >
    //       <h1 className="text-white">{post.title}</h1>
    //       <CommentList postId={post.id} />
    //       <CommentCreate postId={post.id} />
    //     </div>
    //   ))}
    // </div>
  );
};

export default PostList;
