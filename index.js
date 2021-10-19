const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const serverRouter = require("./routes/routes")

const PORT = 8080;
app.use("/inicio", express.static(path.join(__dirname, 'public')));

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/', (req, res)=>{
  console.log('estamos en el raiz del server');
  res.json(true)
})

serverRouter(app)

app.listen(PORT, console.log(`servidor activo en puerto ${PORT}`))