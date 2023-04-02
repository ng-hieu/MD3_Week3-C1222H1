const productControler = require('./handel/productController')
const rounter = {
    'home' : productControler.showHome,
    'edit' : productControler.editProduct,
    'add' : productControler.addProduct,
};

module.exports = rounter;