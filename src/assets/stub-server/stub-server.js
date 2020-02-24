const express = require("express");
const listenPort = "3000";
const server = express();
const importFile = require("../mocks/import");

server.post("/api/v1/ttp-administrator/time-tables/import", (request, response) => {
  if (request) {
    response.header("Content-Type", "application/json");
    response.send(JSON.stringify(importFile));
  } else {
    response.send("Error when uploading file!");
  }
});

server.listen(listenPort, () => {
  console.log("Express server started!!!!");
});
