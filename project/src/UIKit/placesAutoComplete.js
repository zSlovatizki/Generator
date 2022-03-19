import Autocomplete from "react-google-autocomplete";
import './placesAutoComplete.css';
import React,{ useState } from 'react';
import { red } from "@material-ui/core/colors";

export default function PlacesAutoComplete(props) {

  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="aa" style={{ zIndex: 10 },{marginBottom:"5px"}}>
      <Autocomplete className="autocomplete"

        apiKey="AIzaSyBwBhST7RvyHmk9JLlkMPHp8LAfY7AqIEw‏&libraries=places&language=iw"
        onPlaceSelected={(place) => {
          if (place != null)
            setShowWarning(false);

          props.onSelectionChanged(place);
        }}
        onKeyDown={()=>{
          props.onSelectionChanged(null);
          setShowWarning(true);
        }
        }
        options={{
          types: ['address'],
          componentRestrictions: { country: "il" },
        }}
        //defaultValue="בני ברק"
        // style={{ width: "80%" }}
        className="searchInput"
      style={{zIndex:10}}/>
      {showWarning && <p style={{color:"red"}}>אנא בחר ערך מהרשימה</p>}
    </div>
  )
}