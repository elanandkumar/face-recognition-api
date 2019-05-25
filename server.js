const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "Anand",
      email: "elanandkumar@gmail.com",
      password: "Passw0rd",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Khushi",
      email: "khushi.jha@outlook.com",
      password: "Passw0rd",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "elanandkumar@gmail.com"
    }
  ]
};

const getUserById = id => {
  console.log("getUserById: ", id, typeof id);
  const users = database.users.filter(user => {
    console.log(user.id, typeof user.id);
    return user.id === id;
  });
  return users[0] || null;
};

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const users = database.users.filter(
    user => user.email === email && user.password === password
  );

  if (users.length <= 0) {
    res.status(400).json("Error logging in!");
  } else {
    res.json(users[0]);
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "125",
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);
  if (!user) {
    res.status(404).json("No such user!");
  } else {
    res.json(user);
  }
});

app.put("/image", (req, res) => {
  console.log("/image: ", req.body);
  const { id } = req.body;
  const user = getUserById(id);
  if (!user) {
    res.status(404).json("No such user!");
  } else {
    user.entries++;
    return res.json(user.entries);
  }
});
/*
bcrypt.hash("bacon", null, null, (err, hash) => {
  //store hash in your password db
});

// Load your password from DB
bcrypt.compare("bacon", hash, (err, hash) => {
  // res = true
});

bcrypt.compare("veggies", hash, (err, hash) => {
  // res = false
});
*/
app.listen(3000, () => {
  console.log("App is running on port 3000.");
});

/*
 / --> res = this is working
 /signin --> POST = success/fail
 /register --> POST = user
 /profile/:userId --> GET = user
 /image --> PUT  --> user
 */
