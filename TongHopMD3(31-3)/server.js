const http = require('http');
const router = require('./controller/rounter');
const handleError = require('./controller/handel/ErrorController')
const server = http.createServer((req, res) => {
    let url = req.url;
    let arrPath = url.split('/');
    let path = '';
    let id = -1
    let chosenHandle;
    if(arrPath.length>2){
        path = arrPath[1];
        id = arrPath[2];
    }
    if(arrPath.length<=2){
        path = arrPath[1];
    }
    if(router[path]!==undefined){
        chosenHandle = router[path];
    } else {
        chosenHandle = handleError.showNotFound;
    }
    chosenHandle(req, res, id);
})
server.listen(8020, 'localhost', ()=>{
    console.log('8020 dang chay');
})