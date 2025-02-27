const mysql = require(`mysql`)

const db = mysql.createConnection({
    user: "root",
    password: "",
    host : "localhost",
    database : "db_express_latihan1"
})

db.connect((err) => {
    if(err) return console.log(err)
        return console.log("Berhasil Terkoneksi")
})

module.exports = db