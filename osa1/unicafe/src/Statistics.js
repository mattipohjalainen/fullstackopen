import React from "react";
//import Statistic from "./Statistic";

const Statistics = props => {
  const state = props.state;

  const paivitaKeskiarvo = () => {
    // jos yhtään palautetta ei ole annettu, ei mennä tänne edes -> ei tarvita nollatutkimusta
    return (
      Math.round(
        (state.hyvat - state.huonot) /
          (state.hyvat + state.neutraalit + state.huonot) *
          100
      ) / 100
    );
  };

  const positiivisia = () => {
    return (
      Math.round(
        state.hyvat /
          (state.hyvat + state.neutraalit + state.huonot) *
          100 *
          100
      ) / 100 // prosenttiin 2 desimaalin tarkkuus
    );
  };

 /* { <Statistic name="hyvä" number={state.hyvat} />
  <Statistic name="neutraali" number={state.neutraalit} />
  <Statistic name="huono" number={state.huonot} />
  <Statistic name="keskiarvo" number={paivitaKeskiarvo()} />
  <Statistic name="positiivisia" number={positiivisia()} /> } */

  if (state.hyvat === 0 && state.neutraalit === 0 && state.huonot === 0) {
    return (
      <div>
        <h1>statistiikka</h1>
        <p>ei yhtään palautetta annettu</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistiikka</h1>

        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{state.hyvat}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{state.neutraalit}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{state.huonot}</td>
            </tr>
            <tr>
              <td>keskiarvo</td>
              <td>{paivitaKeskiarvo()}</td>
            </tr>
            <tr>
              <td>positiivisia</td>
              <td>{positiivisia()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Statistics;
