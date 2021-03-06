import { useState, useRef } from "react";
import Genrator from '../Mobx/Generator'
import PlacesAutoComplete from '../UIKit/placesAutoComplete'
import { AddGenerator } from '../connect to server/Connect'
import User from '../Mobx/User'
import { toJS } from "mobx";
import Button from "@material-ui/core/Button";
import '../Map.css';
import { Toast } from 'primereact/toast';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

export default function AddCable(props) {

  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [showWarning, setshowWarning] = useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  function onSelect(address) {
    if (address == null)
      return;
    //if (amount != null && amount != "" && address != null)
    setshowWarning(false);
    var coordinateA = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() }
    setSelectedCoordinate(coordinateA);
  }

  const AddGeneratorClick = () => {
    if (amount != null && amount != "" && selectedCoordinate != null) {
      Genrator.addGenerator(selectedCoordinate, amount);
      var generatorDetails = {
        userID: toJS(User).currentUser.id,

        address: selectedCoordinate.lat + "," + selectedCoordinate.lng,
        amperAmount: amount
      }
      AddGenerator(generatorDetails);
      setOpenSuccessMessage(true);
      setAmount(0);
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

  const onPlaceSelected = (place) => {
    onSelect(place);
  }

  const onChange = () => {
    setSelectedCoordinate(null);
  }

  return (
    <div style={{ zIndex: 10 }}>
      <PlacesAutoComplete onChange={onChange} onSelectionChanged={onPlaceSelected} />
      <div style={{textAlign:'right', width:'250px', margin: 'auto'}}>
      <span className="spanAmount">???????? ????????:</span>
      </div>
      <input className = "inputAmount" value={amount} onChange={updateInputValue} />
      {showWarning && <p style={{ color: "red", marginTop: '5px', marginBottom: '-15px' }}>?????? ???? ???????? ???????????? ???? ??????????!</p>}
      <br />
      {/* <button onClick={AddGeneratorClick} >add genrator</button> */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={AddGeneratorClick}
        style={{ backgroundColor: 'rgb(88,88,90)', color: 'white', width: '80%', marginTop: '15px'}}
      >
        ?????????? ????????????
      </Button>
      <Snackbar variant="outlined" autoHideDuration={6000} open={openSuccessMessage} onClose={() => setOpenSuccessMessage(false)} >
        <Alert severity="success" sx={{ width: '100%' }}>
          ?????????????? ???????? ????????????!
        </Alert>
      </Snackbar>
    </div>
  )
}