import mysql from "mysql";

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xxxxxxxxxxxxx",
  database: "student_walker_db",
});

// Koneksi ke database
db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err);
  } else {
    console.log("Terhubung ke database!");
  }
});

export default db;
