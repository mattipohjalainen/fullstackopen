import React from "react";
import "./App.css";
import ShowPersons from "./components/ShowPersons.js";
import AddPerson from "./components/AddPerson.js";
import Notification from './components/Notification'

import personService from "./services/persons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      filtteri: "",
      message: null,
      messageType: null
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("will mount");
    personService.getAll().then(response => {
      console.log("promise fulfilled");
      this.setState({ persons: response.data });
    });
  }

  lisaaHenkilo = henkilo => {

    if (
      this.state.persons.map(item => item.name).includes(henkilo.name) ===
      true
    ) {
      console.log(henkilo.name, " on jo mukana");
      const message = "Muutetaanko henkilön " + henkilo.name + " numeroksi " + henkilo.number + "?"
      if (window.confirm(message)) { 
        const persons = this.state.persons.slice()
        const personIndex = persons.findIndex(per => per.name === henkilo.name)

        console.log("löytyi ", persons[personIndex])
        persons[personIndex].number = henkilo.number
        personService.update(persons[personIndex].id, persons[personIndex]).then(response => {

          this.setState({
            persons,
            filtteri: "",
            message: `Henkilön '${henkilo.name}' numeroksi muutettiin ${henkilo.number}`,
            messageType: 'insert'
          });
          setTimeout(() => {
            this.setState({message: null,
            messageType: null})
          }, 5000)
        })
      }
      return;
    }
    personService.create(henkilo).then(response => {
      console.log(response);
      const persons = this.state.persons.concat(response.data);
      this.setState({
        persons,
        filtteri: "",
        message: `Henkilö '${henkilo.name}' lisättiin`,
        messageType: 'insert'
      });
      setTimeout(() => {
        this.setState({message: null,
        messageType: null})
      }, 5000)
    });
  };

  poistaHenkilo = (id, name) => {
    return () => {
      const message = "Poistetaanko " + name + "?"
      if (window.confirm(message)) { 
        personService.remove(id).then(response => {
          console.log(response);
          const persons = this.state.persons
          persons.splice(persons.indexOf(per => per.id === id), 1);
          this.setState({
            persons,
            filtteri: "",
            message: `Henkilö '${name}' poistettiin`,
        messageType: 'removal'
          });
          setTimeout(() => {
            this.setState({message: null,
            messageType: null})
          }, 5000)
        });   
      }      
    };
  };

  handleFilterChange = event => {
    console.log(event.target.value);
    this.setState({ filtteri: event.target.value });
  };

  render() {
    console.log("render");
    return (
      <div>
        <h2>Puhelinluettelo</h2>

        <Notification message={this.state.message} messageType={this.state.messageType}/>

        <div>
          Rajaa näytettäviä
          <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>

        <AddPerson persons={this.state.persons} addPerson={this.lisaaHenkilo} />

        <ShowPersons
          persons={this.state.persons}
          filtteri={this.state.filtteri}
          poista={this.poistaHenkilo}
        />
      </div>
    );
  }
}

export default App;
