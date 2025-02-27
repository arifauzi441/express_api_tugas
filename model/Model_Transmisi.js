const db = require(`../config/db`)

class Model_Transmisi{
    static async getAll(){
        return new Promise((resolve, reject) => {
            db.query("Select * from transmisi", (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
    static async storeData(data){
        return new Promise((resolve, reject) => {
            db.query("insert into transmisi set ?",[data], (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
    static async getById(id){
        return new Promise((resolve, reject) => {
            db.query("Select * from transmisi where id_transmisi = ?",[id], (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
    static async update(id, data){
        return new Promise((resolve, reject) => {
            db.query("update transmisi set ? where id_transmisi = ?",[data,id], (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
    static async delete(id){
        return new Promise((resolve, reject) => {
            db.query("delete from transmisi where id_transmisi = ?",[id], (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
}

module.exports = Model_Transmisi