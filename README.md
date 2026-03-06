# StockBeacon

StockBeacon is a Node.js web application that allows users to track stock prices and view trending stocks using the Alpha Vantage API.

The application fetches real-time stock data, displays key financial metrics, and visualizes historical price trends using interactive charts.

---

## Features

- View **trending stocks** on the homepage
- **Search any stock symbol** (AAPL, TSLA, MSFT, etc.)
- Display **real-time stock quote**
- Show **key market statistics** (Open, High, Low, Volume)
- Interactive **30-day stock price chart** using Chart.js
- **Green/Red indicators** for stock gains and losses
- Clean **dark themed UI**

---

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- Axios
- Chart.js
- Bootstrap
- Alpha Vantage API

---

## Project Structure

- Axios
- Chart.js
- Bootstrap
- Alpha Vantage API

---

## Project Structure

```bash
StockBeacon
│
├── index.js
├── package.json
├── package-lock.json
├── .env
├── README.md
│
├── public
│ ├── styles
│ │ └── main.css
│ └── images
│
├── views
│ ├── index.ejs
│ ├── stock.ejs
│ └── partials
│ ├── header.ejs
│ └── footer.ejs
│
└── node_modules
```


---

## Installation

### 1. Clone the repository
git clone https://github.com/Siddharth-Singh-28/stockbeacon.git


### 2. Navigate to the project folder
cd stockbeacon


### 3. Install dependencies
npm install


### 4. Create a `.env` file

Add your Alpha Vantage API key:
ALPHA_VANTAGE_API_KEY=your_api_key_here


### 5. Start the server
node index.js


Or using nodemon:
nodemon index.js


### 6. Open the application
http://localhost:3000


---

## API Used

Alpha Vantage Stock Market API

https://www.alphavantage.co/documentation/

Endpoints used:

- `GLOBAL_QUOTE`
- `TIME_SERIES_DAILY`
- `SYMBOL_SEARCH`

---

## Author

Siddharth Singh  
B.Tech Computer Science Engineering 
VIT Bhopal University

---

## License

This project is created for educational purposes.
