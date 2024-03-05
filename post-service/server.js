import express from "express";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

const app = express();

app.use(cors());
app.use(express.json());

// In-memory Database
const posts = {};

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  // Send created post to the event bus
  await axios.post("http://event-bus-srv:8005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send({ status: "OK", postId: posts[id] });
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Received Event: ", req.body.type);
  res.send({ status: "OK" });
});

app.listen(8000, () => {
  console.log(`Post service running on port ${8000}...`);
});
