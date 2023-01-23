const express = require("express");
const router = express.Router();
const path = require("path");
const database = require(path.join(__dirname, "../database"));

router.post("", (req, res, next) => {
   database.query(
      `SELECT teacher_id FROM teacher WHERE teacher_id = '${req.body.teacher_id}';`,
      (err, result) => {
         if (err) {
            return res.status(400).send(err);
         }
         if (!result || result.length === 0) {
            return res.status(400).send({ message: "Wrong teacher data" });
         }
         let query = "INSERT INTO classroom (grade, grade_index,teacher_id) VALUES  (?) ;";
         let values = [[req.body.grade, req.body.grade_index,req.body.teacher_id]];
         console.log(values);
         database.query(query, values, (err, result) => {
            if (err) {
               res.status(400).send({ message: "Cant POST" });
               return console.log(err);
            }
            console.log(result);
         });
         res.redirect("/classrooms");
      },
   );
});

router.get("", (req, res, next) => {
   database.query("SELECT * FROM classroom", (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send(result);
   });
});

router.get("/add", (req, res, next) => {
   res.status(200).sendFile(path.join(__dirname, "../public/pages/classroom.html"));
});
module.exports = router;
