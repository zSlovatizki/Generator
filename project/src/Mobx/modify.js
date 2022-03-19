import React from 'react'
import Cables from './cables'

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
