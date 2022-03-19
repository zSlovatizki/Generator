// import React from 'react';
// import { withGoogleMap, withScriptjs, GoogleMap, Marker,Polyline } from 'react-google-maps'

// function Map (){
// <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places"/>
// function initMap() {
//     const map = new window.google.maps.Map(document.getElementById("map"), {
//       center: { lat: 40.749933, lng: -73.98633 },
//       zoom: 13,
//     });
//     const card = document.getElementById("pac-card");
//     const input = document.getElementById("pac-input");
//     const biasInputElement = document.getElementById("use-location-bias");
//     const strictBoundsInputElement = document.getElementById("use-strict-bounds");
//     const options = {
//       componentRestrictions: { country: "us" },
//       fields: ["formatted_address", "geometry", "name"],
//       strictBounds: false,
//       types: ["establishment"],
//     };
//     map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);
//     const autocomplete = new window.google.maps.places.Autocomplete(input, options);
//     // Bind the map's bounds (viewport) property to the autocomplete object,
//     // so that the autocomplete requests use the current map bounds for the
//     // bounds option in the request.
//     autocomplete.bindTo("bounds", map);
//     const infowindow = new window.google.maps.InfoWindow();
//     const infowindowContent = document.getElementById("infowindow-content");
//     infowindow.setContent(infowindowContent);
//     const marker = new window.google.maps.Marker({
//       map,
//       anchorPoint: new window.google.maps.Point(0, -29),
//     });
//     autocomplete.addListener("place_changed", () => {
//       infowindow.close();
//       marker.setVisible(false);
//       const place = autocomplete.getPlace();
  
//       if (!place.geometry || !place.geometry.location) {
//         // User entered the name of a Place that was not suggested and
//         // pressed the Enter key, or the Place Details request failed.
//         window.alert("No details available for input: '" + place.name + "'");
//         return;
//       }
  
//       // If the place has a geometry, then present it on a map.
//       if (place.geometry.viewport) {
//         map.fitBounds(place.geometry.viewport);
//       } else {
//         map.setCenter(place.geometry.location);
//         map.setZoom(17);
//       }
//       marker.setPosition(place.geometry.location);
//       marker.setVisible(true);
//       infowindowContent.children["place-name"].textContent = place.name;
//       infowindowContent.children["place-address"].textContent =
//         place.formatted_address;
//       infowindow.open(map, marker);
//     });
  
//     // Sets a listener on a radio button to change the filter type on Places
//     // Autocomplete.
//     function setupClickListener(id, types) {
//       const radioButton = document.getElementById(id);
//       radioButton.addEventListener("click", () => {
//         autocomplete.setTypes(types);
//         input.value = "";
//       });
//     }
//     setupClickListener("changetype-all", []);
//     setupClickListener("changetype-address", ["address"]);
//     setupClickListener("changetype-establishment", ["establishment"]);
//     setupClickListener("changetype-geocode", ["geocode"]);
//     biasInputElement.addEventListener("change", () => {
//       if (biasInputElement.checked) {
//         autocomplete.bindTo("bounds", map);
//       } else {
//         // User wants to turn off location bias, so three things need to happen:
//         // 1. Unbind from map
//         // 2. Reset the bounds to whole world
//         // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
//         autocomplete.unbind("bounds");
//         autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
//         strictBoundsInputElement.checked = biasInputElement.checked;
//       }
//       input.value = "";
//     });
//     strictBoundsInputElement.addEventListener("change", () => {
//       autocomplete.setOptions({
//         strictBounds: strictBoundsInputElement.checked,
//       });
  
//       if (strictBoundsInputElement.checked) {
//         biasInputElement.checked = strictBoundsInputElement.checked;
//         autocomplete.bindTo("bounds", map);
//       }
//       input.value = "";
//     });
//   }
//  var str=[];
//  const route="18.55996,-68.388832 18.558028,-68.388971";
//  str=route.split(' ');
// console.log(str);
//  const path = [
//     { lat: 18.55996, lng: -68.388832 },
//     { lat: 18.558028, lng: -68.388971 }
//   ];
//     return (
//       <GoogleMap
//         defaultZoom={16}
//         defaultCenter={{ lat: 18.559008, lng: -68.388881 }}
//         >
//           <Marker position={{
//             lat: 18.559024,
//             lng: -68.388886,
//           }} />
//                   <Polyline path={path} options={{ strokeColor: "#FF0000 " }} />
                  
//       </GoogleMap>
//     )
  
// }

// const MapComponent = withScriptjs(withGoogleMap(Map))

// export default () => (
//   <MapComponent
//   googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
//   loadingElement={<div style={{ height: `100%` }} />}
//   containerElement={<div style={{ height: `400px`, width: '500px' }} />}
//   mapElement={<div style={{ height: `100%` }} />}
//   />
// )
import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap,Polyline } from 'react-google-maps'
import {content} from '../connect to server/Connect'
function Map (props){





  
  var path=[];
   var str=[];
 const route="18.55996,-68.388832 20.55996,-80.388832 20.558038,20.558038";
 console.log("aaaaaaaaaa");
 var str2=[];
 console.log(props.c);

 str2=props.c;
 str=route.split(' ');
//console.log(str);
str[0].indexOf(",");

  path = [
    {lat:0,lng:0},
    {lat:0,lng:0},
    {lat:0,lng:0},

  ];
  path.map((point,index)=>{ path[index]={lat:parseFloat(str[index].substring(0,str[index].indexOf(","))),lng:parseFloat(str[index].substring(str[index].indexOf(",")+1,str[index].indexOf(",")+11))}});
  //path.map((p,index)=>{path[index]={lat:path[index].lat,lng:path[index].lng}})
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 18.559008, lng: -68.388881 }}
        >
                  <Polyline path={path} options={{ strokeColor: "#FF0000 " }} />
                  {/* <Polyline path={path[1]} options={{ strokeColor: "#FF0000 " }} /> */}
      </GoogleMap>
    )
  
}

const MapComponent = withScriptjs(withGoogleMap(Map))

export default () => (
  <MapComponent
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px`, width: '500px' }} />}
  mapElement={<div style={{ height: `100%` }} />}
  />
)