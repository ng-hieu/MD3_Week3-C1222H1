const connection = require('../entity/connection')
class CategoryService{
    connect;
    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection();
    }
    findAll = () =>{
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from categories ;`, (err, categories)=>{
                if(err) {
                    reject(err);
                } else {
                    resolve(categories);
                }
            })
        })
    }
}

module.exports = new CategoryService();
