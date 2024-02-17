import express from "express";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

const app = express();

app.use(cors());
app.use(express.json());

// In-memory Database
const commentsByPostId = {};

app.post("/api/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  // Send created comment to the event bus
  await axios.post("http://localhost:8005/events", {
    type: "CommentCreated",
    data: {
      content,
      id: commentId,
      postId: req.params.id,
      status: "pending"
    },
  });

  res.status(201).send(comments);
});

app.post("/api/events", async (req, res) => {
  console.log("Received Event: ", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http:event-bus-srv:8005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content
      }
    })
  }

  res.send({ status: "OK" });
});

app.get("/api/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.listen(8001, () => {
  console.log(`Comments service running on port ${8001}...`);
});
