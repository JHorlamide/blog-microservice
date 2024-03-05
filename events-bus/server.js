import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:8000/events", event); //post service
  axios.post("http://comments-srv:8001/events", event); //comment service
  axios.post("http://query-srv:8002/events", event); // query service
  axios.post("http://moderation-srv:8003/events", event); // moderation service

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(8005, () => {
  console.log(`events-bus server running on port ${8005}...`);
});
