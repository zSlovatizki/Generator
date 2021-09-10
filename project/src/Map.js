
import MenuItem from '@material-ui/core/MenuItem';
import React, { Component } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline
} from 'react-google-maps';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { Select } from '@material-ui/core';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      coords: { lat: 18.55996, lng: -68.388832 },
      address: 'search',
    };
  }

  handleChange = address => {
    this.setState({ address });
    console.log("handlechange")
  };

  handleSelect = address => {
    console.log("handleselect")
    console.log(this.state.address);
    console.log(this.state.coords);
    console.log("handleselect")

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          coords: latLng
        })
      )
      .catch(error => console.error('Error', error));
    this.setState({
      address: address
    })
    console.log("handleselect")
    console.log("address state:", address)
    console.log(this.state.coords);
    console.log("handleselect")
  };

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  };
  style = {
    border: "#282c34 solid 1px"
  }
  path = [
    { lat: 32.0855141, lng: 34.8441714 },
    { lat: 32.0859428, lng: 34.8442113 },
  ];
  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap defaultCenter={this.state.coords} defaultZoom={13}>
        <Marker
          key={this.props.index}
          position={this.state.coords}
          onClick={() => this.handleToggleOpen()}
        >
          {this.state.isOpen && (
            <InfoWindow
              onCloseClick={this.props.handleCloseCall}
              options={{ maxWidth: 100 }}
            >
              <span>This is InfoWindow message!</span>
            </InfoWindow>
          )}
        </Marker>
        <Polyline path={this.path} options={{ strokeColor: "#FF0000 " }} />
      </GoogleMap>
    ));

    const styleWidth = {
      width: "100%"
    }
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
              <div>
                <input
                  {...getInputProps({
                    //placeholder: this.state.address,
                    // className: 'location-search-input'
                  })}
                  text={this.state.address}
                  placeholder={this.state.address}
                />
                <div className="autocomplete-dropdown-container" style={this.style}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <MenuItem
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                        key={suggestion.placeId}
                      >
                        <span>{suggestion.description}</span>
                      </MenuItem>
                    );
                  })}
                </div>
              </div>
            )}
        </PlacesAutocomplete>
        <GoogleMapExample
          style={this.styleWidth}
          containerElement={<div style={{ height: `500px`, width: '100%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;