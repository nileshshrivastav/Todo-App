const express = require("express");
const cors = require("cors");
const Todo = require('./app/models/ToDo.model')
let mongoose = require("mongoose");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb+srv://nileshshrivastav2351:pQn4Jz5tjLCfEBMK@cluster0.8snzsox.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// create todo
app.post("/createTodo", (req, res) => {
  const todoMessage = req.body;
  console.log(todoMessage, '-todoMessage-');
  Todo.create(todoMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

//delete todo

app.delete("/todo/:id", async(req, res) => {
    try {
    const deleteTodo  = await Todo.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.status(200).send(deleteTodo);
  } catch (error) {
    res.status(500).send(error);
  }

 });
  
//get api
app.get("/todo", (req, res) => {
  Todo.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
