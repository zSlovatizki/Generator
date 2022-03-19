import { connect } from 'react-redux'
import List from '../list/list'
import React from 'react'
import Header from '../header/header'
import Maps from '../maps/maps'


const MyApp = (props) => {
    const {filterArray,lat,lon,id}=props;
    return (
        <>
        <Header/>
        <List/>
        <Maps stores={filterArray} lat={lat} lon={lon} id={id}/>
        </>
    )
}
export default connect(
    (state)=>{
        return{
            lat:state.currentLat,
            lon:state.currentLon,
            id:state.currentCity,
            filterArray:state.filterArray
        }
    }
)( MyApp);