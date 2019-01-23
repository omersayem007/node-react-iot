import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer } from './data';

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      data:''
    }
    
  }

  componentDidMount(){

    subscribeToTimer((err, data) => this.setState({ 
      data:data
    }));

  }

  render() {
    return (
      <div className="App">
      <h1>construction going</h1>
      {this.state.data}
       
      </div>
    );
  }
}

export default App;
