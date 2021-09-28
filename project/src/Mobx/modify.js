import React from 'react'
import Data from './class'

export default function Modify() {
    
    function handle() {
        Data.setHeaders(7);
        console.log("modify", Data.id)
    }
    return (
        <>
            <button onClick={handle}>modify</button>
        </>
    )
}
