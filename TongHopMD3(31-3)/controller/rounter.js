const productControler = require('./handel/productController')
const rounter = {
    'home' : productControler.showHome,
    'edit' : productControler.editProduct,
};

module.exports = rounter;