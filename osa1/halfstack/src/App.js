import React from 'react';
import './App.css';
import Otsikko from './otsikko/Otsikko'
import Sisalto from './sisalto/Sisalto'
import Yhteensa from './yhteensa/Yhteensa'

const App = () => {
  const kurssiNimi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  const osa1Olio = {
    nimi: osa1,
    tehtavia: tehtavia1
  }
  const osa2Olio = {
    nimi: osa2,
    tehtavia: tehtavia2
  }
  const osa3Olio = {
    nimi: osa3,
    tehtavia: tehtavia3
  }

  const osat = [
    osa1Olio,
    osa2Olio,
    osa3Olio
  ]

  const kurssi = {
    nimi: kurssiNimi,
    osat: osat
  }

  return (
    <div>
      <Otsikko otsikko={kurssiNimi} />

      <Sisalto sisalto={osat} />

      <Yhteensa tehtavia={tehtavia1 + tehtavia2 + tehtavia3} />
    </div>
  )
}

export default App;
