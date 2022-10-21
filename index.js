var http = require("http");
var express = require("express");
var app = express();
var cors = require("cors");
const path = require("path");
const axios = require("axios");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
// When you have your own Client ID and secret, put down their values here:
app.use("/getCollections", async (req, res) => {
  const { sort } = req.body;
  try {
    const data = await axios.get(
      `https://stats-mainnet.magiceden.io/collection_stats/popular_collections/sol?limit=1000&window=${sort}`
    );

    if (data) {
      return res.send(data.data);
    } else {
      return res.json({ status: false, data: "err" });
    }
  } catch (error) {
    console.log(error)
    return res.send('err')
  }
});
app.use("/getNFTs", async (req, res) => {
  const { address } = req.body;
  try {
    const data = await axios.get(
      `https://api-devnet.magiceden.dev/v2/wallets/${address}/tokens?offset=0&limit=500&listStatus=both`,
    );

    if (data) {
      return res.send(data.data);
    } else {
      return res.json({ status: false, data: "err" });
    }
  } catch (error) {
    console.log(error)
    return res.send('err')
  }

});

app.use(express.static(path.join(__dirname, "/src")));

app.listen("8900", () => {
  console.log("server listen 8900 port!");
});
