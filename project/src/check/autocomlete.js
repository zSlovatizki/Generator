import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from 'react-google-maps';
// import Map from './Map';

const MapView = () => {
  const MapLoader = withScriptjs(Mapp);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};

// export default MapView;







import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class Mapp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      coords: { lat: 40.756795, lng: -73.954298 },
      address: ''
    };
  }
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          coords: latLng
        })
      )
      .catch(error => console.error('Error', error));
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
      </GoogleMap>
    ));

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
                  placeholder: 'Search Places ...',
                  className: 'location-search-input'
                })}
              />
              <div className="autocomplete-dropdown-container">
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
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                      key={suggestion.placeId}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: '500px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Mapp;