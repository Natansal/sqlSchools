const fs = require("fs-extra");
const mysql = require("mysql");
const path = require("path");
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

async function createTables() {
   const files = await fs.readdir(path.join(__dirname, "entities"));
   const tablesNames = files.map((table) => table.split(".").shift());
   files.forEach((file, index) => {
      getJson(file).then((res) => createTable(tablesNames[index], res));
   });
}

async function getJson(file) {
   const json = fs.readJson(path.join(__dirname, "entities", file));
   return json;
}

function createTable(name, json) {
   let query = `CREATE TABLE ${name} (\n`;
   for (let key in json) {
      let obj = json[key];
      query += `${key} ${obj.type} ${obj["NOT NULL"] ? "NOT NULL" : ""} ${obj.key} ${
         obj["AUTO_INCREMENT"] ? "AUTO_INCREMENT" : ""
      },\n`;
   }
   query = query.substring(0, query.length - 2) + "\n);";
   database.query(query, (err, res) => {
      if (err) {
         return console.log(err);
      }
      console.log(res);
   });
}

function create2admins() {
   console.log("Connected!");
   var sql = "INSERT INTO admin (admin_name, admin_password, school_id) VALUES ?";
   var values = [
      ["John", "Highway71", 1],
      ["Peter", "Lowstreet4", 2],
   ];
   database.query(sql, [values], function (err, result) {
      if (err) {
         throw err;
      }
      console.log(result);
   });
}
