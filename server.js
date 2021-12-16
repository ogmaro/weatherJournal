const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
let projectData = [];
// db83fefb74880671054af406b9df1364;
app
  .use(express.urlencoded({ extended: false }))

  .use(express.json())
  .use(cors())
  .use(express.static("public"));

app.get("/userData", getUserData);

app.post("/userData", postUserData);

app.listen(PORT, listen);

//Functions
function listen() {
  console.log(`server listening at port ${PORT}`);
}
function getUserData(req, res) {
  res.send(projectData);
//   console.log(projectData);
}
function postUserData(req, res) {
  let newData = {
    temp: req.body.temperature,
    date: req.body.date,
    message: req.body.userMessage,
    city: req.body.city,
  };
  projectData.push(newData);
  res.json("POST RECEIVED");
}
