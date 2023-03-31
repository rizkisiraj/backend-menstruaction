const express = require('express')
const app = express();
const cors = require('cors');
const { firebaseHelpers } = require('./firebase-functions');
const port = process.env.PORT || 5002


//middleware
app.use(cors());
app.use(express.json());
// app.disable('view cache');

//router
app.get("/", (req,res)=>{
    res.status(200).json('already gettin');
});

app.post('/api', (req, res) => {
    const midtransClient = require('midtrans-client');
    const SERVER_KEY = process.env.SERVER_KEY;
    
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

app.post('/api/notification', async (req, res) => {
    const transaction_status = req.body.transaction_status;

    try {
        if(transaction_status === 'capture' || 'settlement') {
          await firebaseHelpers.updateDonors(req.body.order_id);
          console.log(transaction_status);
        }
        res.status(200).json({response: "ok"});
    } catch(e) {
        res.status(400).json({response: e});
    }

 } )


app.listen(port, ()=>{
    console.log('server started');
})