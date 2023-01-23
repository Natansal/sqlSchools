const mysql = require("mysql");

const database = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "z10mz10m",
   database: "Schools",
});

database.connect((err) => {
   if (err) {
      throw err;
   }
   console.log("Connection to DB successfull!");
});

module.exports = database;
