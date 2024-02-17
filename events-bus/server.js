import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:8000/api/events", event); //post service
  // axios.post("http://localhost:8001/api/events", event); //comment service
  // axios.post("http://localhost:8002/api/events", event); // query service
  // axios.post("http://localhost:8003/api/events", event); // moderation service

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(8005, () => {
  console.log(`events-bus server running on port ${8005}...`);
});
