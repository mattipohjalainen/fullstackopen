import React, { Component } from "react";
import "./App.css";
import Button from "./Button";
import Statistics from "./Statistics";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hyvat: 0,
      neutraalit: 0,
      huonot: 0
    };
  }

  asetaArvoon = (propertyName, arvo) => {
    return () => {
      this.setState({ [propertyName]: arvo })
    }
  }

  render() {

    return (
      <div className="App">
        <h1>anna palautetta</h1>

        <Button name="hyvä" handleClick={this.asetaArvoon('hyvat', this.state.hyvat + 1)} />
        <Button name="neutraali" handleClick={this.asetaArvoon('neutraalit', this.state.neutraalit + 1)} />
        <Button name="huono" handleClick={this.asetaArvoon('huonot', this.state.huonot + 1)} />

        <Statistics state={this.state} />

       
      </div>
    );
  }
}

export default App;
