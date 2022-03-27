import React from 'react'
import Cables from './Cables'
import {observer} from 'mobx-react'
export default observer( function Show() {
   return(
       <>
       <p>show</p>
       <p>{Cables.markerAdd}</p>
       </>
   )
})