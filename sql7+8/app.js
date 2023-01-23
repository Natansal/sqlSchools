const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database");
const app = express();
const port = 8000;
const hostname = "localhost";

const classes = require("./routes/classrooms")
const teachers = require("./routes/teachers");
const schools = require("./routes/schools");
const student = require("./routes/students");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/classrooms", classes);
app.use("/students", student);
app.use("/teachers", teachers);
app.use("/schools", schools);

app.listen(port, hostname, () => {
   console.log(`Server listening on: http://${hostname}:${port}`);
});
