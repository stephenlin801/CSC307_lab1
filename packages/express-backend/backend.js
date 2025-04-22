// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";
import mongoose from "mongoose"; // for error handling bad inputs

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Again and Again World!");
});


app.get("/users", (req, res) => {
const name = req.query.name;
const job = req.query.job;

userServices.getUsers(name, job).then((users) => {
  res.send(users);
})
.catch((error) => {console.log(error);});
});

  
app.get("/users/:id", (req, res) => {
const id = req.params["id"]; //or req.params.id
//console.log(id);
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).send("invalid ID");
}

userServices.findUserById(id).then((result) => {
  if (result === undefined) {
    res.status(404).send("Resource not found.");
} else {
    res.send(result);
}
})
.catch((error) => {console.log(error);});

});


app.post("/users", (req, res) => {
const userToAdd = req.body;
userServices.addUser(userToAdd).then((result) => {res.status(201).send(result);})
.catch((error) => {console.log(error);});

});


app.delete("/users/:id", (req, res) => { // this is insecure but also fine, however to make it more secure have the id in the body and have it read it that way
const id = req.params.id;
console.log(id);
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).send("invalid ID");
}
userServices.deleteUserById(id).then((result) => {
  if (result === undefined) {
    res.status(404).send("Resource not found.");
}
else{
    res.status(204).send();
}})
.catch((error) => {console.log(error);});

});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});