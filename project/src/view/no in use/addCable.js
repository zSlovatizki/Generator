import Autocomplete from "react-google-autocomplete";
import { useState } from "react";
import Genrator from '../Mobx/generator'

export default function AddCable() {
  ///   const  geocoder = window.google.maps.Geocoder();

  // function geocode(request) {
  //   Geocoder
  //     .geocode(request)
  //     .then((result) => {
  //       const { results } = result;

  //       //map.setCenter(results[0].geometry.location);
  //       //marker.setPosition(results[0].geometry.location);
  //       //marker.setMap(map);
  //       // responseDiv.style.display = "block";
  //       // response.innerText = JSON.stringify(result, null, 2);
  //       return results;
  //     })
  //     .catch((e) => {
  //       alert("Geocode was not successful for the following reason: " + e);
  //     });
  // }
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [showWarning, setshowWarning] = useState(false);

  function onSelect(address) {
    console.log("onselect", address.geometry.location.lat())
    var coordinateA = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() }
    setSelectedCoordinate(coordinateA);
    //CalcLength(coordinateA,coordinateA);
  }
  // function cancelClick()
  // {
  //   console.log("cancelClick")
  //   Cables.setHeaders(null);
  //   console.log(Cables.markerAdd)
  // }

  // function  addClick() {
  //   Cables.setHeaders(5);
  //   console.log(Cables.markerAdd)


  // }
  const AddGeneratorClick = () => {
    if (amount != null && amount != "")
      Genrator.addGenerator(selectedCoordinate, amount);
    else setshowWarning(true);
  }

  const updateInputValue = (event) => {
    if (event.target.value != "") {
      setAmount(event.target.value);
      setshowWarning(false)
    }
    else
      setshowWarning(true)

  }
  return (
    <div style={{ zIndex: 10 }}>
      <Autocomplete
        apiKey="AIzaSyBw1O0w3i7M3WhVhge2UldEhP62AEIJKqc&libraries=places"
        onPlaceSelected={(place) => {
          onSelect(place);
        }}
        options={{
          types: ['address'],
          componentRestrictions: { country: "il" },
        }}
        defaultValue="Amsterdam"
        style={{ width: "80%" }}
      />
      <br />
      anout amper:<input value={amount} onChange={updateInputValue} />
      {showWarning && <p style={{ color: "red" }}>you must fill the amount</p>}
      <button onClick={AddGeneratorClick} >add genrator</button>
      {/* <button onClick={addClick}>add</button>
      <button onClick={cancelClick}>cancel</button> */}
    </div>
  )
}


