import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
  const API_URL = "https://www.alphavantage.co/query";
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  const symbols = ["AAPL", "TSLA", "MSFT", "NVDA"];
  const stocks = [];
  try {
    for (const symbol of symbols) {
      const response = await axios.get(API_URL, {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: API_KEY
        }
      });
      const quote = response.data["Global Quote"];
      if (quote && quote["01. symbol"]) {
        stocks.push(quote);
      }
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    res.render("index.ejs", { stocks });
  } catch (error) {
    console.error(error.message);
    res.render("index.ejs", { stocks: [] });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})