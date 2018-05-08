import React from "react";

const Osa = ({ osa }) => {
  return (
    <li>
      {osa.nimi} {osa.tehtavia}
    </li>
  );
};

export default Osa;
