var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors');
const path = require('path');
const axios = require('axios');


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
// When you have your own Client ID and secret, put down their values here:
app.use('/getNFTs', async (req, res) => {
    const { accountId, NFTContractAddress } = req.body;
    const data = await axios.get(
        `https://api-v2-mainnet.paras.id/token?owner_id=${accountId}&contract_id=${NFTContractAddress}&__limit=2000`,
    )
    console.log(data.data.data)
    if (data) {
        return res.json({ status: true, data: data.data.data })
    } else {
        return res.json({ status: false, data: 'err' });
    }
})

app.use(express.static(path.join(__dirname, '/src')));

app.listen('3000', () => { console.log('server listen 3000 port!') });
