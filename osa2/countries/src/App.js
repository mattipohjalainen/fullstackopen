import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filtteri: ''
    };
    console.log('constructor')
  }

  componentDidMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
        
      })
  }
  handleFilterChange = event => {
    console.log(event.target.value);
    this.setState({ filtteri: event.target.value });
  };

  countriesToShow = () => {
    if (this.state.filtteri === '') {
      console.log("tyhjä filtteri")
      return ''
    }
    const re = new RegExp(this.state.filtteri.toLowerCase())
    const subset = this.state.countries.filter(country => re.test(country.name.toLowerCase()))
    console.log("matches: ", subset.length)

    if (subset.length === 1) {
      const name = subset[0].name
      const capital = subset[0].capital
      const population = subset[0].population
      const flag = subset[0].flag

      return (
        <div>
          <h2>{name}</h2>
          <p>{capital}</p>
          <p>{population}</p>
          <img alt="" src={flag} />
        </div>
      )

    }
    if (subset.length > 1 && subset.length < 11) {
      return (
        <ul>
          {subset.map(country => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      )
    }

    return 'too many matches, speficy another filter'
  }

  render() {
    console.log('render')
    console.log(this.state.countries)
    return (
      <div>
      <div>
          Find countries:  
          <input
              value={this.state.filter}
              onChange={this.handleFilterChange}
            />
            <div>
            {this.countriesToShow()}
            </div>
        </div>
        
      </div>
    );
  }
}

export default App;
