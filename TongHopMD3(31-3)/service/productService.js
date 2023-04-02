const connection = require('../entity/connection')
class ProductService{
    connect;
    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection();
    }
    findAll = () =>{
        return new Promise((resolve, reject) => {
            this.connect.query(`select p.*, c.name_category from products p join categories c on c.id = p.id_category;`, (err, products)=>{
                if(err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }
    findById = (id) =>{
        return new Promise((resolve, reject) => {
            this.connect.query(`select p.*, c.name_category from
                products p join categories c on c.id = p.id_category where p.id = ${id};`, (err, product)=>{
                if(err) {
                    reject(err);
                } else {
                    resolve(product[0]);
                }
            })
        })
    }
    updateById = (idProduct, nameProduct, priceProduct, descriptionProduct, idCategory) => {
        return new Promise((resolve, reject)=>{
            this.connect.query(`UPDATE products p SET p.name_product = '${nameProduct}', p.price = '${priceProduct}', p.description = '${descriptionProduct}', p.id_category = '${idCategory}' WHERE (id = '${idProduct}');`, (err, product)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(product);
                }
            })
        })
    }
}

module.exports = new ProductService();
