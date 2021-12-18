import Autocomplete from "react-google-autocomplete";

export default function placesAutoComplete(props) {

  return (
    <div style={{ zIndex: 10 }}>
      <Autocomplete
        apiKey="AIzaSyBw1O0w3i7M3WhVhge2UldEhP62AEIJKqc&libraries=places"
        onPlaceSelected={(place) => {
          props.onSelectionChanged(place);
        }}
        options={{
          types: ['address'],
          componentRestrictions: { country: "il" },
        }}
        defaultValue="Amsterdam"
        style={{ width: "80%" }}
      />
    </div>
  )
}