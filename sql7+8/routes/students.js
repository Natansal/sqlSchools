const express = require("express");
const router = express.Router();
const path = require("path");
const database = require(path.join(__dirname, "../database"));

router.post("", (req, res, next) => {
   database.query(
      `SELECT classroom_id FROM classroom WHERE classroom_id = ${req.body.classroom_id};`,
      (err, result) => {
         if (err) {
            return res.status(400).send(err);
         }
         if (!result || result.length === 0) {
            return res.status(400).send({ message: "Wrong classroom data" });
         }
         let query = "INSERT INTO student (student_name, student_password, classroom_id) VALUES  (?) ;";
         let values = [[req.body.student_name, req.body.student_password, req.body.classroom_id]];
         console.log(values);
         database.query(query, values, (err, result) => {
            if (err) {
               res.status(400).send({ message: "Cant POST" });
               return console.log(err);
            }
            console.log(result);
         });
         res.redirect("/students");
      },
   );
});

router.get("", (req, res, next) => {
   const { school_code, classroom_id } = req.query;
   let query = "";
   if (school_code && classroom_id) {
      query = `SELECT s.student_name AS 'Student Name'
      FROM student s
      JOIN classroom c
      ON s.classroom_id = c.classroom_id
      JOIN teacher t
      ON t.teacher_id = c.teacher_id
      JOIN school sc
      ON sc.school_id = t.school_id
      WHERE s.classroom_id='${classroom_id}' AND sc.school_code = '${school_code}'`;
      database.query(query, (err, result) => {
         if (err) {
            return res.status(400).send(err);
         }
         return res.status(200).send(result);
      });
   } else {
      database.query("SELECT * FROM student", (err, result) => {
         if (err) {
            return res.status(400).send(err);
         }
         res.status(200).send(result);
      });
   }
});

router.get("/add", (req, res, next) => {
   res.status(200).sendFile(path.join(__dirname, "../public/pages/student.html"));
});

module.exports = router;
