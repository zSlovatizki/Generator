import Autocomplete from "react-google-autocomplete";
import './placesAutoComplete.css';

export default function placesAutoComplete(props) {

  return (
    <div className="aa" style={{ zIndex: 10 },{marginBottom:"5px"}}>
      <Autocomplete className="autocomplete"

        apiKey="AIzaSyBwBhST7RvyHmk9JLlkMPHp8LAfY7AqIEw&libraries=places&language=iw"
        onPlaceSelected={(place) => {
          props.onSelectionChanged(place);
        }}
        onKeyDown={()=>{
          props.onSelectionChanged(null);
        }
        }
        options={{
          types: ['address'],
          componentRestrictions: { country: "il" },
        }}
        defaultValue="בני ברק"
        // style={{ width: "80%" }}
        className="searchInput"
      style={{zIndex:10}}/>
    </div>
  )
}