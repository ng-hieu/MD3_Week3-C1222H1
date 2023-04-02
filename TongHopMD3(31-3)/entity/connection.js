const mysql = require('mysql')
class Connection{
    configToMySQL = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'store'
    }
    getConnection= () =>{
        return mysql.createConnection(this.configToMySQL)
    }

    connectToMySQL = () =>{
        this.getConnection().connect((err)=>{
            if(err){
                console.log(err)
            } else {
                console.log('Connection database success')
            }
        })
    }
}

module.exports = new Connection();


