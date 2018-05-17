import React from 'react';

const ShowPersons = (props) => {
    const persons = props.persons
    const filtteri = props.filtteri

    const personsToShow = () => {
      if (filtteri === '') {
        console.log("tyhjä filtteri")
        console.log(persons)
        return persons
      }
      const subset = persons.filter(person => {
        return person.name.toLowerCase().startsWith(filtteri.toLowerCase())
      }
      )
  
      console.log("filtteröity ", subset)
      return subset
  
    }
  
    return (
        <div>
          <h2>Numerot</h2>
        <ul>
          {personsToShow().map(person => (
            <li key={person.id}>
            {person.name} {person.number} <button onClick={props.poista(person.id, person.name)}>Poista</button>

            </li>
          ))}
        </ul>
        </div>
      )
};

export default ShowPersons