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
      date : ""
    }
  }

  /*
  //getBatchStockAPI method accepts a stock name from user
  //otherwise if left empty, advices the user to input a stock name

  //method fetches the data from API
  //data is sent to getStockInfo method for processing
  */
  getBatchStockAPI(newStockName){
    (newStockName===""||newStockName===undefined)?alert("Please enter a stock name"):
          axios.get(axios.get('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL&apikey=demo')
          .then(res=>{this.getStockInfo(res,newStockName)})
        )
    
  }
  /*
  //getStockInfo method fetches the data for that stock name
  //sends the data to the setStockInfo method
  //otherwise notifies user their stock is not available
  */
  getStockInfo(json,newStockName){
   
          const stockreq = json.data['Stock Quotes'].filter((stock) => [{symbol: stock['1. symbol']}]).find(stock => stock['1. symbol'] === newStockName);
          (stockreq===undefined)?alert("Sorry stock not available"):this.setStockInfo(stockreq,newStockName)
      
  }
  /*
  //setStockInfo method sets the state to:
  //1. stock name,
  //2. price from the API 
  //3. timestamp from the API
  */
  setStockInfo(userStockRequest, stockName){       
          this.setState({
                  name: stockName,
                  price: userStockRequest['2. price'], 
                  date: userStockRequest['4. timestamp']    
          });
          
  }

  /*
  //render method for JSX
  //on the web browser:
  //1. the user can input the stock symbol
  //2. the user can hit the Get Price button
  //on click:
  //1. the response is the sent to the server with getBatchStockAPI method
  //2. the getBatchStockAPI method will provide the stock data to user - price and timestamp
  // (getBatchStockAPI) method documentation provides details
  */
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/>
        <p>Stock Ticker - shows selection between two stocks and auto refresh seamlessly</p>
        <p>FB, MSFT, AAPL</p>
       <label>
       <input type="text" name="Enter Stock Name" placeholder="Enter Stock Name" ref={(input)=>{this.state.name=input;}}/></label>
        
        <button onClick={()=>this.getBatchStockAPI(this.state.name.value.toUpperCase())}> Get Price </button>
        <h1> Stock: {this.state.name}</h1>
        <h1>Price: ${this.state.price}<br/></h1>
        Time of Stock Price: {this.state.date}<br/>
       
       <p><br/><br/><br/>Copyright Reserved © Tanisha Bhatti<br/><br/>This material and code is subject to copyright.<br/> Copying is strictly prohibited. </p>

      </div>
    );
  }
}

export default App;
/*
////Copyright Reserved © Tanisha Bhatti
*/