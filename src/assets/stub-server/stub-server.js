const express = require("express");
const listenPort = "3000";
const server = express();
const multer  = require("multer");
const upload = multer({ dest:"files" });
const importFile = require("../mocks/import");

server.post("/api/v1/ttp-administrator/time-tables/import", upload.single("file"), (request, response) => {
  if (request) {
   response.send({upload: 'success'})
  } else {
    response.send("Error when uploading file!");
  }
});

server.listen(listenPort, () => {
  console.log("Express server started!!!!");
});
