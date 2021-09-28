import React from 'react'
import Data from './class'
import {observer} from 'mobx-react'
import { observe } from 'mobx'
export default observer( function Show() {
   return(
       <>
       <p>show</p>
       <p>{Data.id}</p>
       </>
   )
})