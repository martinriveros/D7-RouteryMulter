const fs = require('fs');
const path = require('path')

class Handler {
  constructor(){
    this.absoluteroute = path.resolve(__dirname, '../resources','productos.txt')
    console.log(this.absoluteroute)
  }

  async getAll(){

    try {
      return JSON.parse(await fs.promises.readFile(`${this.absoluteroute}`, 'utf-8'))
    } catch (error) {console.log('error en getall' + err)
      
    }
  }
    async getById(id) {
      
      const products = await this.getAll();
      const product = products.find(element=> element.id===Number(id))
      if(product===undefined){
        return {error:'producto no encontrado'}
      } else {
        return product
      }
  }   
  async writeNewProduct(product){
    
    const products = await this.getAll();
  
    if(products.length===0){
      product.id=1
    } else {
      product.id = products[products.length-1].id+1
    }
    products.push(product)
    let newData = JSON.stringify(products, null, 2)
    await this.writeFile(newData)
    return product
  };


  async updateNewProduct(id, newProductData){;


    const products = await this.getAll();
    let updatedProducts = products.map(element => {
      
      if(element.id===id){
            
        return newProductData}
        
        else {return element}      
    });
    
    let newData = JSON.stringify(updatedProducts, null, 2)

    await this.writeFile(newData)
}

  async deleteProduct(id){

    const products = await this.getAll();
    const product = products.find(element=> element.id===Number(id))
      if(product===undefined){
        return {error:'producto no encontrado'}}
    
    let updatedProducts = products.filter(element=>{if(element.id!=id){
     
       return element}})
    
    let newData = JSON.stringify(updatedProducts, null, 2)

    await this.writeFile(newData)
  } 
  
  async writeFile(data){
    
    try {
      await fs.promises.writeFile(`${this.absoluteroute}`, data, 'utf-8')
 
    } catch (err) {
      console.log('error al escribir' + err)
    }
  }







}

module.exports = new Handler()