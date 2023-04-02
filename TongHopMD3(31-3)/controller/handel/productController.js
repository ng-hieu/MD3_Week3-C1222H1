const fs = require('fs')
const productService = require('../../service/productService');
const categoryService = require('../../service/categoryService')
const qs = require('qs')

class ProductController {
    getHtmlProduct = (products, indexHtml) => {
        let productHtml = '';
        products.map(values => {
            productHtml += `<tr>
                <th scope="row">${values.id}</th>
                <td>${values.name_product}</td>
                <td>${values.price}</td>
                <td>${values.id_category}</td>
                <td>${values.name_category}</td>
                <td>
                    <a type="button" class="btn btn-outline-info" href="/edit/${values.id}">Sửa</a>
                </td>
                <td>
                    <form method="POST">
                    <input type="text" name="idDelete" value="${values.id}">
                    <button type="submit" class="btn btn-outline-warning">Xóa</button>
                    </form>
                </td>
             </tr>`
        })
        indexHtml = indexHtml.replace('{products}', productHtml);
        return indexHtml;
    }
    showHome = async (req, res) => {
        if(req.method==='GET'){
            fs.readFile('./view/index.html', "utf-8", async (err, indexHtml) => {
            let products = await productService.findAll()
            indexHtml = this.getHtmlProduct(products, indexHtml);
            res.write(indexHtml);
            res.end();
        })}
        if(req.method==='POST'){
            let data = ''
            req.on('data', chunk=>{
                data += chunk;
            })
            req.on('end', async ()=>{
                let infor = qs.parse(data);
                let idProduct = await productService.findById();
                await productService.deleteProduct(idProduct);
                res.writeHead(301, {'location': '/home'})
                res.end();
            })
        }
    }
    editProduct = async (req, res, id) => {
        if (req.method === 'GET') {
            fs.readFile('./view/product/edit.html', "utf-8", async (err, editHtml) => {
                let product = await productService.findById(id);
                let category = await categoryService.findAll();
                editHtml = editHtml.replace('{name}', product.name_product);
                editHtml = editHtml.replace('{price}', product.price);
                editHtml = editHtml.replace('{description}', product.description);
                let htmlCategory = '';
                category.map(item => {
                    htmlCategory += `<option value="${item.id}">${item.name_category}</option>`
                })
                editHtml = editHtml.replace('{categories}', htmlCategory);
                res.write(editHtml);
                res.end();
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {
                let afterEdit = qs.parse(data);
                await productService.updateById(id, afterEdit.name_product, afterEdit.price, afterEdit.description, afterEdit.id_category);
                res.writeHead(301, {'location': '/home'})
                res.end();
            })
        }
    }
    addProduct = async (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./view/product/add.html', "utf-8", async (err, addHtml) => {
                let category = await categoryService.findAll();
                let htmlCategory = '';
                category.map(item => {
                    htmlCategory += `<option value="${item.id}">${item.name_category}</option>`
                })
                addHtml = addHtml.replace('{categories}', htmlCategory);
                res.write(addHtml);
                res.end();
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {
                let addNewProduct = qs.parse(data);
                await productService.addProduct(addNewProduct);
                res.writeHead(301, {'location': '/home'})
                res.end();
            })
        }
    }
}

module.exports = new ProductController();