const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
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
        res.status(400).json(e.message);
    });
});

app.get('/', (req,res) => {
  res.status(200).json('already showing');
});
