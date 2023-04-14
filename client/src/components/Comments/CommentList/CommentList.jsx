import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div className="py-2 text-white">
      <div className="">
        {comments.map((comment) => {
          let content;

          if (comment.status === "approved") {
            content = comment.content;
          }

          if (comment.status === "pending") {
            content = "This comment is await moderation";
          }

          if (comment.status === "rejected") {
            content = "This comment has been rejected";
          }
          
          return <li key={comment.id}>{content}</li>;
        })}
      </div>
    </div>
  );
};

export default CommentList;
