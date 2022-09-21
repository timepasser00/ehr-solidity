const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const router=require('./routes/route');



const app = express();
// app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const port = 3001
app.use((req,res,next) =>{
    next();
})

app.use('/',router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})