import React from 'react'
import Cables from './cables'

export default function Modify() {
    
    function handle() {
        Cables.markerAdd=0;
        console.log("modify", Cables.markerAdd)
    }
    return (
        <>
            <button onClick={handle}>modify</button>
        </>
    )
}
