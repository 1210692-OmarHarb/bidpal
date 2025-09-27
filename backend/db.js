import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // your XAMPP username
  password: "", // your XAMPP password
  database: "bidpaltest",
});

export default pool;
