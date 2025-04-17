// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Again and Again World!");
});


const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
    };

const findUserByJob = (job) => {
    return users["users_list"].filter ((user) => user["job"] === job);
};

const findUserByJobandName = (job, name) => {
    let result = users["users_list"].filter((user) => user["name"] === name);
    return result.filter ((user) => user.job === job);
};

app.get("/users", (req, res) => {
const name = req.query.name;
const job = req.query.job;

if (name != undefined && job != undefined) {
    let bothresult = findUserByJobandName(job, name);
    bothresult = { users_list: bothresult };
    res.send(bothresult)
}

else if (name != undefined) {
    let nameresult = findUserByName(name);
    nameresult = { users_list: nameresult };
    res.send(nameresult)
}

else if (job != undefined) {
    let jobresult = findUserByJob(job);
    jobresult = { users_list: jobresult}
    res.send(jobresult)
}

else{
    res.send(users)
}

});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
app.get("/users/:id", (req, res) => {
const id = req.params["id"]; //or req.params.id
let result = findUserById(id);
if (result === undefined) {
    res.status(404).send("Resource not found.");
} else {
    res.send(result);
}
});

const addUser = (user) => {
users["users_list"].push(user);
return user;
};

app.post("/users", (req, res) => {
const userToAdd = req.body;
const id = Math.random(); // ask if I should check that the id is truly unique, no need
userToAdd["id"] = String(id);
addUser(userToAdd);
res.status(201).send(userToAdd);
});


const deleteUserById = (id) => {
    users["users_list"] = users["users_list"].filter((user) => user.id !== id);
};

app.delete("/users/:id", (req, res) => { // this is insecure but also fine, however to make it more secure have the id in the body and have it read it that way
const id = req.params.id;
//console.log(id);
let result = findUserById(id);
if (result === undefined) {
    res.status(404).send("Resource not found.");
}
else{
    deleteUserById(id);
    res.status(204).send();
}

});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});