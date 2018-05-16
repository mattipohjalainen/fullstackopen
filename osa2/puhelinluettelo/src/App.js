import React, { Component } from "react";
import axios from 'axios'
import "./App.css";
import ShowPersons from './components/ShowPersons.js'
import AddPerson from './components/AddPerson.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      filtteri: ''
    };
    console.log('constructor')
  }

  componentDidMount() {
    console.log('will mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }
  
  lisaaHenkilo = (henkilo) => {
    const persons = this.state.persons.concat(henkilo);
    this.setState({
      persons,
      newName: "",
      newNumber: "",
      filtteri: ''
    });
  }

  handleFilterChange = event => {
    console.log(event.target.value);
    this.setState({ filtteri: event.target.value });
  };

  render() {
    console.log('render')
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          Rajaa näytettäviä 
          <input
              value={this.state.filter}
              onChange={this.handleFilterChange}
            />
        </div>

        <AddPerson persons={this.state.persons} 
        addPerson={this.lisaaHenkilo} />
        
        <ShowPersons persons={this.state.persons} 
        filtteri={this.state.filtteri}
        />
      </div>
    );
  }
}

/*
{ name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
*/

export default App;
