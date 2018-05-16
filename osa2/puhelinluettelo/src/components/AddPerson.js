import React from "react";

class AddPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          persons: props.persons,
          newName: '',
          newNumber: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
      }

      addPerson = event => {
        event.preventDefault();
        console.log("nappia painettu ", this.state.newName);
        console.log(this.state.persons);
    
        if (
          this.state.persons.map(item => item.name).includes(this.state.newName) ===
          true
        ) {
          console.log(this.state.newName, " on jo mukana");
          return;
        }
    
        const personObject = {
          name: this.state.newName,
          number: this.state.newNumber
        };
    
        const persons = this.state.persons.concat(personObject);
    
        this.setState({
          persons,
          newName: "",
          newNumber: ""
        });

        this.props.addPerson(personObject)
      };

      handleNameChange = event => {
        console.log(event.target.value);
        this.setState({ newName: event.target.value });
      };

      handleNumberChange = event => {
        console.log(event.target.value)
        this.setState({ newNumber: event.target.value });
      }

      render() {
          return (
    <form onSubmit={this.addPerson}>
      <div>
        <h2>Lisää uusi</h2>
        nimi:{" "}
        <input value={this.state.newName} onChange={this.handleNameChange} />
      </div>
      <div>
        numero:
        <input
          value={this.state.newNumber}
          onChange={this.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
}
};

export default AddPerson;
