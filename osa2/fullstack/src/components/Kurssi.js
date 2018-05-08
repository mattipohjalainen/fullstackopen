import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'

const Kurssi = ( props ) => {
    const { kurssi } = props

    return (
        <div>
          <Otsikko otsikko={kurssi.nimi} />
          <Sisalto sisalto={ kurssi } />
        </div>
      )
}

export default Kurssi