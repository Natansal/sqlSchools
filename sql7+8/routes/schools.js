const express = require("express");
const router = express.Router();
const path = require("path");
const database = require(path.join(__dirname, "../database"));

router.post("", (req, res, next) => {
   const { admin_name, admin_password } = req.body;
   database.query(
      `SELECT admin_id FROM admin WHERE admin_name = '${admin_name}' AND admin_password = '${admin_password}';`,
      (err, result) => {
         if (err) {
            return res.status(400).send(err);
         }
         if (!result || result.length === 0) {
            return res.status(400).send({ message: "Wrong admin data" });
         }
         let query = "INSERT INTO school (school_name, school_code) VALUES  (?) ;";
         let values = [[req.body.school_name, req.body.school_code]];
         console.log(values);
         database.query(query, values, (err, result) => {
            if (err) {
               res.status(400).send({ message: "Cant POST" });
               return console.log(err);
            }
            console.log(result);
         });
         res.redirect("/schools");
      },
   );
});

router.get("", (req, res, next) => {
   database.query("SELECT * FROM school", (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send(result);
   });
});

router.get("/admin", (req, res, next) => {
   const query = `SELECT s.school_name AS 'School Name', a.admin_name AS 'Admin Name'
   FROM school s
   JOIN admin a
   ON a.school_id = s.school_id`;

   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send(result);
   });
});
router.get("/add", (req, res, next) => {
   res.status(200).sendFile(path.join(__dirname, "../public/pages/school.html"));
});
module.exports = router;
