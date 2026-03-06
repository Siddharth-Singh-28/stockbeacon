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

      console.log(response.data);
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

app.post("/stock", async (req, res) => {

  const symbol = req.body.symbol.toUpperCase();
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  const API_URL = "https://www.alphavantage.co/query";

  try {

    // current quote
    const quoteResponse = await axios.get(API_URL, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol,
        apikey: API_KEY
      }
    });

    const quote = quoteResponse.data["Global Quote"];

    if (!quote || !quote["01. symbol"]) {
      return res.render("stock.ejs", { error: "Stock not found", quote: null, history: null });
    }

    // wait 1 second for API rate limit
    await new Promise(r => setTimeout(r, 1200));

    // historical data
    const historyResponse = await axios.get(API_URL, {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol: symbol,
        apikey: API_KEY
      }
    });

    const history = historyResponse.data["Time Series (Daily)"];

    res.render("stock.ejs", {
      quote: quote,
      history: history,
      error: null
    });

  } catch (error) {

    console.log(error.message);

    res.render("stock.ejs", {
      error: "Unable to fetch stock data",
      quote: null,
      history: null
    });

  }

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})