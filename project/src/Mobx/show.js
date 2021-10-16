import React from 'react'
import Cables from './cables'
import {observer} from 'mobx-react'
export default observer( function Show() {
   return(
       <>
       <p>show</p>
       <p>{Cables.markerAdd}</p>
       </>
   )
})