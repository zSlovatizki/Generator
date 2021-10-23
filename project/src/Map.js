
import MenuItem from '@material-ui/core/MenuItem';
import React, { Component } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from 'react-google-maps';
import Cables from './Mobx/cables'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { Select } from '@material-ui/core';
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { CableOfPoint, loadToPointInCable, CalcLength, calcLoadByTypeAndThickness } from './services/functions'
import cables from './Mobx/cables';

export default observer(
  class Map extends Component {
    path = toJS(Cables.cablesStringArr);

    constructor(props) {
      super(props);
      console.log("render")
      this.state = {
        isOpen: false,
        coords: { lat: 20.55996, lng: -88.388832 },
        address: 'search',
        addarker: Cables.addarker == null,
        InfoWindowPosition: { lat: 0, lng: 0 },
        loadLeftForCurrentPoint: 0
      };
    }

    handleChange = address => {
      this.setState({ ...this.state, address: address });
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
        ...this.state,
        address: address
      })
      console.log("handleselect")
      console.log("address state:", address)
      console.log(this.state.coords);
      console.log("handleselect")
    };

    // handleToggleOpen = () => {
    //   this.setState({
    //     ...this.state,
    //     isOpen: true
    //   });
    // };

    // handleToggleClose = () => {
    //   this.setState({
    //     ...this.state,
    //     isOpen: false
    //   });
    //   console.log("close")
    // };
    handleCloseCall = () => {
      this.state.isOpen = false;
    }

    style = {
      border: "#282c34 solid 1px"
    }

    polylineClick = (polyMouseEvent) => {
      var cable = CableOfPoint(polyMouseEvent.latLng.toJSON());
      var lengthFromStart = 0;
      console.log(toJS(cables.cablesStringArr), "cBLESTRINGarr");
      cable.currentCable.map((point, i) => {
        if (i < cable.currentCable.length - 1 && i <= cable.index) {
          lengthFromStart += CalcLength(toJS(point), toJS(cable.currentCable[i + 1]));
        }
      })

      lengthFromStart += CalcLength(toJS(cable.currentCable[cable.index]), polyMouseEvent.latLng.toJSON());
      var loadForAllCable = calcLoadByTypeAndThickness(cable.typeId, cable.thickness);
      var loadLeftForCurrentPoint = loadToPointInCable(lengthFromStart, loadForAllCable);
      console.log("loadForAllCable", cable.thickness);

      this.setState({ ...this.state, InfoWindowPosition: polyMouseEvent.latLng.toJSON(), loadLeftForCurrentPoint: loadLeftForCurrentPoint, isOpen: true });
    }
    render() {
      const GoogleMapExample = observer(withGoogleMap(props => (
        <>
          <GoogleMap defaultCenter={this.state.coords} defaultZoom={80}>

            <div position={this.state.InfoWindowPosition}></div>

            {this.state.InfoWindowPosition.lat != 0 &&
              this.state.isOpen == true && <Marker
                position={this.state.InfoWindowPosition}
                //onClick={() => this.handleToggleOpen()}
                visible={false}
              >
                {(
                  <InfoWindow
                    onCloseClick={this.handleCloseCall}
                    // position={this.state.InfoWindowPosition}
                  //options={{ pixelOffset: this.google.maps.Size(0, -30) }}
                  >
                    <p> {this.state.loadLeftForCurrentPoint}</p>
                  </InfoWindow>
                )}
              </Marker>


            }
            {
              this.path.map(pt =>
                <Polyline path={pt.coordinates} options={{ strokeColor: "#aqua " }} onClick={this.polylineClick} />
              )
            }
          </GoogleMap>
        </>
      )))

      const styleWidth = {
        width: "100%"
      }

      return (
        <div style={{ width: "50%" }}>
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
          //addMarker={Cables.markerAdd}
          />
        </div>
      );
    }
  }
)
