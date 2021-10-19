const {Router} = require('express');
const router = Router();
const handlerDocuments = require('../handler/filehandler.js')

function serverRouter(app){

  app.use("/api/productos", router);

  router.get('/', async (req, res)=>{

    let response = await handlerDocuments.getAll();
    res.json(response);
  })
  router.get('/:id', async (req, res)=>{

    let response = await handlerDocuments.getById(req.params.id);
    res.json(response);
  })
  router.post('/', async (req, res)=>{
    
    let response = await handlerDocuments.writeNewProduct(req.body);
    res.json(response)
  })
  router.put('/:id', async (req, res)=>{
  
    let response = await handlerDocuments.updateNewProduct(req.body.id, req.body);
    res.json(response);
  })
  
  router.delete('/:id', async (req, res)=>{
  
    let response = await handlerDocuments.deleteProduct(req.params.id);
  
  res.json(response);
  
})
}

module.exports = serverRouter;