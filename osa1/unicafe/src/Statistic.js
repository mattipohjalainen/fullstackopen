import React from "react";

const Statistic = (props) => {
    if (props.name === "positiivisia") {
        return (
            <p>{props.name} {props.number}%</p>
        );
    } else {
        return (
            <p>{props.name} {props.number}</p>
        );
    }

  };
  
  export default Statistic;