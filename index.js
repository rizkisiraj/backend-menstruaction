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
    res.status(200).json('already gettin');
});

app.post('/api', (req, res) => {
    const midtransClient = require('midtrans-client');
    const SERVER_KEY = 'SB-Mid-server-uOc21Fq7lkWdBObS_PkRiWSj';

// Create Snap API instance
let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : SERVER_KEY
    });

    snap.createTransaction(req.body)
     .then((transaction)=>{
        // transaction token
        res.status(200).json(transaction);
    }).catch(e => {
        res.status(400).json(e);
    });
});


app.listen(port, ()=>{
    console.log('server started');
})