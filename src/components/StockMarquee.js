import React, { Component } from "react";
import "../App.css";

class StockMarquee extends Component {
  state = {
    symbols:["GOOG","TSLA","MSFT","AAPL","AMZN","EBAY","NKE","PFE","BAC","NOK","INTC","C","GE","FOX","T","WFC",
              "RAD","VZ","ORCL","MS","TWTR","BABA","XOM","KO","MRK","GM","INFY","HES","DIS","GG","MET","HAL","WMT",
              "CVX","BB","X","BX","DAL","MGM","AIG","JCI","HPE","ATUS","WPX","CVS"],
    marqueeData: [],
    newData: [],
    isReloaded: true
  };

  componentDidMount() {
    let symbols = this.state.symbols.join(",")
      fetch(`https://api.robinhood.com/quotes/?symbols=${symbols}`)
      .then(res =>res.json())
      .then(stocks => this.setState({
        marqueeData: stocks.results
      }))
      setInterval(()=>{
      fetch(`https://api.robinhood.com/quotes/?symbols=${symbols}`)
      .then(res =>res.json())
      .then(stocks => this.setState({
        newData: stocks.results
      }))},4000)

       setInterval(()=>{
      fetch(`https://api.robinhood.com/quotes/?symbols=${symbols}`)
      .then(res =>res.json())
      .then(stocks => this.setState({
        marqueeData: stocks.results
      }))},5000)

     }

  getData = () => {
    if (this.state.newData.length > 1 && this.state.marqueeData.length > 1) {
      let data = this.state.newData.map(eachStock => {
        console.log(eachStock);
        let price = parseFloat(eachStock.last_trade_price).toFixed(2);
        let index = this.state.newData.indexOf(eachStock);
        let marqueeDataPrice = parseFloat(
          this.state.marqueeData[index].adjusted_previous_close
        ).toFixed(2);
        let newDataPrice = parseFloat(
          this.state.newData[index].last_trade_price
        ).toFixed(2);
        if (marqueeDataPrice > newDataPrice) {
          return (
            <span className="down" key={eachStock.symbol}>
              {" "}
              | {eachStock.symbol} {price} |{" "}
            </span>
          );
        } else if (marqueeDataPrice < newDataPrice) {
          return (
            <span className="up" key={eachStock.symbol}>
              {" "}
              | {eachStock.symbol} {price} |{" "}
            </span>
          );
        } else {
          return (
            <span className="same" key={eachStock.symbol}>
              {" "}
              | {eachStock.symbol} {price} |{" "}
            </span>
          );
        }
      });

      return data;
    } else if (this.state.marqueeData.length > 0) {
      let data = this.state.marqueeData.map(eachStock => {
        let price = parseFloat(eachStock.last_trade_price).toFixed(2);
        let index = this.state.marqueeData.indexOf(eachStock);
        if (
          this.state.marqueeData[index].last_trade_price >
          eachStock.last_trade_price
        ) {
          return (
            <span className="down" key={eachStock.symbol}>
              {" "}
              | {eachStock.symbol} {price} |{" "}
            </span>
          );
        } else if (
          this.state.marqueeData[index].last_trade_price ===
          eachStock.last_trade_price
        ) {
          return (
            <span className="same" key={eachStock.symbol}>
              {" "}
              | {eachStock.symbol} {price} |{" "}
            </span>
          );
        } else if (
          this.state.marqueeData[index].last_trade_price <
          eachStock.last_trade_price
        ) {
          return (
            <span className="up" key={eachStock.symbol}>
              {" "}
              | {eachStock.symbol} {price} |{" "}
            </span>
          );
        }
      });
      return data;
    } else {
      return <h1>Loading...</h1>;
    }
  };

  render() {
    console.log(this.state.marqueeData);
    return (
      <div>
        <marquee className="up"> {this.getData()} </marquee>
      </div>
    );
  }
}

export default StockMarquee;
