const express = require("express");
const listenPort = "3000";
const server = express();
const courses = require("./mocks/courses");
const group = require("./mocks/group");
const groups = require("./mocks/groups");

server.get("/api/get/courses", (request, response) => {
  response.header("Content-Type", "application/json");
  response.send(JSON.stringify(courses));
});

server.get("/api/get/groups", (request, response) => {
  response.header("Content-Type", "application/json");
  response.send(JSON.stringify(groups));
});

server.get("/api/get/timetable", (request, response) => {
  response.header("Content-Type", "application/json");
  response.send(JSON.stringify(group));
});

server.listen(listenPort, () => {
  console.log("Express server started!!!!");
});
