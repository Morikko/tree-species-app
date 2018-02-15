import React, { Component } from 'react';
import logo from './icon-tree.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: []
    }
  }

  render() {
    let species = this.state.species.map((sp, index)=>{
      return(
        <li key={"sp"+index}>{sp}</li>
      );
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tree Species</h1>
        </header>
        <ul>
          {species}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    fetch('/api/species')
      .then(res => res.json())
      .then(res => {
        this.setState({species: res });
      })
      .catch ((error) => {
          console.log(error);
      });
  }
}

export default App;
