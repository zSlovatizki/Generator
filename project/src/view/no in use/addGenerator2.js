import { useState } from "react";
import Genrator from '../../Mobx/generator'
import PlacesAutoComplete from '../../UIKit/placesAutoComplete'

export default function AddGenerator(props) {

  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [showWarning, setshowWarning] = useState(false);

  function onSelect(address) {
    console.log("onselect", address.geometry.location.lat())
    var coordinateA = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() }
    setSelectedCoordinate(coordinateA);
  }
  
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
      <PlacesAutoComplete onSelectionChanged={onSelect}/>
      <br />
      anout amper:<input value={amount} onChange={updateInputValue} />
      {showWarning && <p style={{ color: "red" }}>you must fill the amount</p>}
      <button onClick={AddGeneratorClick} >add genrator</button>
    </div>
  )
}