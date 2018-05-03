import React from 'react';
import './Otsikko.css';

const Otsikko = (props) => {
    return (
        <div>
          <h1>{props.otsikko}</h1>
        </div>
      )
}

export default Otsikko;