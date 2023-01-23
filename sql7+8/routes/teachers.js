const express = require("express");
const router = express.Router();
const path = require("path");
const database = require(path.join(__dirname, "../database"));

router.post("", (req, res, next) => {
   console.log("body: ", req.body);
   let query = "INSERT INTO teacher (teacher_name, teacher_password, email, school_id) VALUES  (?) ;";
   let values = [[req.body.teacher_name, req.body.teacher_password, req.body.email, req.body.school_id]];
   console.log(values);
   database.query(query, values, (err, result) => {
      if (err) {
         res.status(400).send({ message: "Cant POST" });
         return console.log(err);
      }
      console.log(result);
   });
   res.redirect("/teachers");
});

router.get("", (req, res, next) => {
   database.query("SELECT * FROM teacher", (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send(result);
   });
});

router.get("/add", (req, res, next) => {
   res.status(200).sendFile(path.join(__dirname, "../public/pages/teacher.html"));
});
module.exports = router;
