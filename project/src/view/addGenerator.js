import { useState } from "react";
import Genrator from '../Mobx/Generator'
import PlacesAutoComplete from '../UIKit/placesAutoComplete'
import {AddGenerator} from '../connect to server/Connect'
import User from '../Mobx/User'
import { toJS } from "mobx";

export default function AddCable(props) {

  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [showWarning, setshowWarning] = useState(false);

  function onSelect(address) {
    if (address == null)
      return;
    //if (amount != null && amount != "" && address != null)
      setshowWarning(false);
    var coordinateA = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() }
    setSelectedCoordinate(coordinateA);
  }
  
  const AddGeneratorClick = () => {
    if (amount != null && amount != "" && selectedCoordinate != null)
    {
      Genrator.addGenerator(selectedCoordinate, amount);
      var generatorDetails ={
        userID:toJS(User).currentUser.id,
        address:selectedCoordinate.lat + " " + selectedCoordinate.lng,
        amperAmount:amount       
      }

      AddGenerator(generatorDetails);
    }
    else setshowWarning(true);
  }

  const updateInputValue = (event) => {
    setAmount(event.target.value);
    if (event.target.value != "") {
      setshowWarning(false)
    }
    else
      setshowWarning(true)

  }

  const onPlaceSelected=(place) => {
    onSelect(place);
  }

  const onChange=()=>{
   setSelectedCoordinate(null);
  }

  return (
    <div style={{ zIndex: 10 }}>
      <PlacesAutoComplete onChange={onChange} onSelectionChanged={onPlaceSelected}/>
      כמות אמפר:<input value={amount} onChange={updateInputValue} />
      {showWarning && <p style={{ color: "red", marginTop:0, marginBottom:0 }}>אחד או יותר מהשדות לא מלאים!</p>}
      <br/>
      <button onClick={AddGeneratorClick} >add genrator</button>
    </div>
  )
}