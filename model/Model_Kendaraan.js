const db = require(`../config/db`)

class Model_Kendaraan{
    static async getAll(){
        return new Promise((resolve, reject) => {
            db.query("Select * from kendaraan", (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
    static async storeData(data){
        return new Promise((resolve, reject) => {
            db.query("insert into kendaraan set ?",[data], (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
    static async getById(id){
        return new Promise((resolve, reject) => {
            db.query("Select * from kendaraan where no_pol = ?",[id], (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
    static async update(id, data){
        return new Promise((resolve, reject) => {
            db.query("update kendaraan set ? where no_pol = ?",[data,id], (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
    static async delete(id){
        return new Promise((resolve, reject) => {
            db.query("delete from kendaraan where no_pol = ?",[id], (err, rows) => {
                if(err) return reject(err)
                return resolve(rows)
            })
        })
    }
}

module.exports = Model_Kendaraan