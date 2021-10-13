// import React,{useState, useEffect} from 'react'
// import PlacesAutocomplete, {
//     geocodeByAddress,
//     getLatLng
//   } from 'react-places-autocomplete';
//   import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from "react-google-autocomplete";
import Geocoder from 'react-google-maps'
import { red } from "@material-ui/core/colors";
export default function f()
{
///   const  geocoder = window.google.maps.Geocoder();

  function geocode(request) {
    Geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;
  
        //map.setCenter(results[0].geometry.location);
        //marker.setPosition(results[0].geometry.location);
        //marker.setMap(map);
        // responseDiv.style.display = "block";
        // response.innerText = JSON.stringify(result, null, 2);
        return results;
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }
function onSelect(address)
{
      console.log("onselect",address.geometry.location.lat())
    
}

    return(
      <div style={{color:red},{background:red}}>
        <Autocomplete
        apiKey="AIzaSyCKLoEzJ7BScxRKW3vQVXWhzgm4VwtZPag&libraries=places"
        style={{ width: "90%" }}
        onPlaceSelected={(place) => {
          onSelect(place);
        }}
        options={{
          types: ["(regions)"],
          //componentRestrictions: { country: "ru" },
        }}
        defaultValue="Amsterdam"
      />
      </div>
    )
}