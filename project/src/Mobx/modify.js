import React from 'react'
import Cables from './Cables'

export default function Modify() {
    
    function handle() {
        Cables.markerAdd=0;
    }
    return (
        <>
            <button onClick={handle}>modify</button>
        </>
    )
}
