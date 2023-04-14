import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

function handleEvent(type, data) {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, status, content } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
}

app.post("/api/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  res.send({ status: "OK " });
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(8002, async () => {
  console.log(`Query service running on port ${8002}...`);

  const res = await axios.get("http://localhost:8005/events");
  for (let event of res.data) {
    console.log("Processing event", event.type);

    handleEvent(event.type, event.data);
  }
});
