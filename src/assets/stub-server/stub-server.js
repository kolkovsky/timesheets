const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const importFile = require("../mocks/import");
const listenPort = "3001";
const adminPassword = "admin";
const adminLogin = "admin";

server.use(bodyParser.json());
server.listen(listenPort, () => {
  console.log("Express server started!!!!");
});

server.post(
  "/api/v1/ttp-administrator/time-tables/import",
  (request, response) => {
    setTimeout(() => {
      const isError = Math.random() * Math.floor(10);
      if (isError > 5) {
        response.send(importFile);
      } else {
        response.status(422).send("Error");
      }
    }, 5000);
  }
);

server.post("/api/login", (request, response) => {
  setTimeout(() => {
    const isError = Math.random() * Math.floor(10);
    if (isError > 5) {
      const userLogin = request.body.login;
      const userPassword = request.body.password;
      if (userLogin === adminLogin && userPassword === adminPassword) {
        response.send({ isSuccess: true });
      } else {
        response.status(401).send({ isSuccess: false });
      }
    } else {
      response.status(500).send("Error");
    }
  }, 5000);
});

server.get("/api/get/timetable", (request, response) => {
  setTimeout(() => {
    const isError = Math.random() * Math.floor(10);
    if (isError > 5) {
      response.send(importFile);
    } else {
      response.status(422).send("Error");
    }
  }, 5000);
});

server.get("/api/v1/ttp-administrator/uploaded-files", (request, response) => {
  setTimeout(() => {
    const isError = Math.random() * Math.floor(10);
    const uploadedFiles = [];
    response.send(uploadedFiles);
  }, 5000);
});
