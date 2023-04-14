import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

app.post("/api/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    axios.post("http://localhost:8005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }

  res.send({ status: "OK" });
});

app.listen(8003, () => {
  console.log("Moderation service running on port 8003...");
});
