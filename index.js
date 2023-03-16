const express = require('express')
const app = express();


const port = process.env.PORT || 5002


// addData()
// app.use(cors())

//middleware
app.use(express.json())
// app.disable('view cache');

//router 
app.get("/", (req,res)=>{
    res.send( 'hw' );
})


app.listen(port, ()=>{
    console.log('server started');
})