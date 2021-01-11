/*
  //App Name: Stock Ticker
  //App Details: 
  //The app integrates with the backend service API, 
  //shows selection between two objects,
  //with seamless auto refresh 


  //Code Written By: Tanisha Bhatti
  //Date: 8/4/2018
  //Copyright Reserved © Tanisha Bhatti
*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  /*
  //constructor for the app
  //this.state object with name, price, date
  */
  constructor(){
    super();
    //initialize state
    this.state = {
      name: "",
      price: "",
      date : "",
      colors: ""
    }
  }

  /*
  //getTimeSeriesDailyAPI method accepts a stock name from user
  //otherwise if left empty, advices the user to input a stock name

  //method fetches the data from API
  //data is sent to getStockInfo method for processing
  */
  getTimeSeriesDailyAPI(newStockName){
    (newStockName===""||newStockName===undefined)?alert("Please enter a stock name"):
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${newStockName}&apikey=demo`)
      .then(res=>{this.getStockInfo(res, 'Time Series (Daily)', 'blue', newStockName)});
  }
  /*
  //getTimeSeriesMonthlyAPI method accepts a stock name from user
  //otherwise if left empty, advices the user to input a stock name

  //method fetches the data from API
  //data is sent to getStockInfo method for processing
  */
 getTimeSeriesMonthlyAPI(newStockName){
  (newStockName===""||newStockName===undefined)?alert("Please enter a stock name"):
  axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${newStockName}&apikey=demo`)
    .then(res=>{this.getStockInfo(res, 'Monthly Time Series', 'purple', newStockName)});
}
  /*
  //getStockInfo method fetches the data for that stock name based on latest date
  //sends the data to the setStockInfo method
  //otherwise notifies user their stock is not available
  */
  getStockInfo(json, stockQueryParam, colorParam, newStockName){
    const stockreq = json.data[stockQueryParam];
    (stockreq===undefined)?alert("Sorry stock not available"):this.setStockInfo(Object.entries(stockreq)[0],colorParam,newStockName);
  }
  /*
  //setStockInfo method sets the state to:
  //1. stock name,
  //2. price: closing price from the API 
  //3. timestamp: latest quote date from the API
  */
  setStockInfo([key,value],colorParam,stockName){  
    this.setState({
            name: stockName,
            price: value['2. high'], 
            date: key,
            colors: colorParam,
    });        
  }

  /*
  //render method for JSX
  //on the web browser:
  //1. the user can input the stock symbol
  //2. the user can hit the Get Price button
  //on click:
  //1. the response is the sent to the server with getTimeSeriesDailyAPI method
  //2. the getTimeSeriesDailyAPI or getTimeSeriesMonthlyAPI method will provide the stock data to user - price and timestamp
  // (getTimeSeriesDailyAPI) or (getTimeSeriesMonthlyAPI) method documentation provides details
  */
  render() {
    const classesOutput = `output ${this.state.colors}`;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Stock Ticker</h1>
          <p><i>Stock Ticker - shows selection between two stocks quote API types (daily vs monthly) and auto refresh seamlessly</i></p><br/>
        </header>
        <br/>
        <p>&nbsp;</p>
       <label>
       <input type="text" name="Enter Stock Name" placeholder="Enter Stock Name - IBM" ref={(input)=>{this.state.name=input;}}/></label><br/>
        
        <button onClick={()=>this.getTimeSeriesDailyAPI(this.state.name.value.toUpperCase())}> Get Price (Daily Latest, High Price) </button>
        <button className="purple-button" onClick={()=>this.getTimeSeriesMonthlyAPI(this.state.name.value.toUpperCase())}> Get Price (Monthly, High Price) </button><br/><br/>
        <h1> Stock: <span className={classesOutput}>{this.state.name}</span></h1>
        <h1>High Price:  <span className={classesOutput}>${this.state.price}</span><br/></h1>
        Date of Stock Price:  <span className={classesOutput}>{this.state.date}</span><br/>
       
       <p className="copyright"><br/><br/><br/>Copyright Reserved © Tanisha Bhatti<br/><br/>This material and code is subject to copyright.<br/> Copying is strictly prohibited. </p>

      </div>
    );
  }
}

export default App;
/*
////Copyright Reserved © Tanisha Bhatti
*/