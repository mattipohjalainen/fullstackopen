import React from 'react'
import Osa from './Osa'

const Sisalto = ( props ) => {
    const kurssi  = props.sisalto

    const yht = kurssi.osat.map(koulutus => koulutus.tehtavia).reduce((accumulator, currentValue) => accumulator + currentValue)
    console.log("yhteensä", yht)
  
    return (
        <div>
          <ul>
              {kurssi.osat.map(osa=><Osa key={osa.id} osa={osa}/>)}
          </ul>

          <p>yhteensä {yht}</p>
          </div>
      )
}

export default Sisalto