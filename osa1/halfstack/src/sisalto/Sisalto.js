import React from 'react';
import Osa from './Osa'

const Sisalto = (props) => {
    return (
        <div>
          <Osa osa={props.sisalto[0].nimi} tehtavia={props.sisalto[0].tehtavia} />
          <Osa osa={props.sisalto[1].nimi} tehtavia={props.sisalto[1].tehtavia} />
          <Osa osa={props.sisalto[2].nimi} tehtavia={props.sisalto[2].tehtavia} />
        </div>
      )
}

export default Sisalto;