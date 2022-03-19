import React, { Component } from 'react';
//  import { DrawingManager } from '@react-google-maps/api';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
  Circle
} from 'react-google-maps';
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Cables from './Mobx/Cables'
import Generator from './Mobx/Generator'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { CableOfPoint, loadToPointInCable, CalcLength, calcLoadByTypeAndThickness } from './services/Functions'
import PlacesAutoComplete from './UIKit/placesAutoComplete'
import Line from './UIKit/Line';
import AddGeneratorDrawer from './view/GeneratorDrawer'
import Select from './UIKit/Select'
import SimpleSelect from './UIKit/SimpleSelect'
import { AddCable, DeleteCable } from './connect to server/Connect'
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

export default observer(

  class Map extends Component {

    types = [1, 2];
    thicknessType1 = [1.5, 2.5, 4, 6, 10, 16, 25, 30, 35, 50, 70, 92, 120, 150, 240];
    thicknessType2 = [24, 50, 70, 65, 150, 240];
    IsAddCable = false;
    constructor(props) {
      super(props);
      this.mapRef = React.createRef();
      this.polRef = React.createRef();
      this.myButton = React.createRef();
      this.state = {
        path: toJS(Cables.cables),
        isLoadMessageOpen: false,
        centerCoords: { lat: -34.397, lng: 150.644 },
        address: 'search',
        infoWindowPosition: { lat: -34.397, lng: 150.644 },
        loadLeftForCurrentPoint: 0,
        polylinesArr: [],
        bounds: [],
        openDrawer: false,
        selectedAdrressCable: null,
        selectedAdrress: null,
        openDialog: false,
        //arrpolyline: [],
        newPolyline: null,
        newCable: null,
        selectedCableThickness: 0,
        selectedCableType: 1,
        thicknessArr: [this.thicknessType1, this.thicknessType2],
        showPolylineClick: false,
        loadForSelectedCable: 0,
        DeleteCable: -1,
        showCabelDeleteWarning: false
      };
    }

    path = "";

    colors = [
      { color: "#ff4444", thickness: 14 }, { color: "#ffbb33", thickness: 12 }, { color: "#00C851", thickness: 10 }, { color: "#33b5e5", thickness: 8 },
      { color: "#CC0000", thickness: 6 }, { color: "#FF8800", thickness: 4 }, { color: "#007E33", thickness: 1 }, { color: "#0099CC", thickness: 1 }
    ];

    componentWillMount() {
      if (this.props.polylinesArr != undefined) {
        this.setState({ ...this.state, polylinesArr: this.props.polylinesArr })
      }

      if (this.props.openDrawer != undefined) {
        this.setState({ ...this.setState, openDrawer: this.props.openDrawer })
      }

    }
    cancelDrawingShape = true;

    onPolylineComplete(polyline) {
      var flag = false;
      var generatorId = -1;
      var pol = polyline.getPath().getArray();
      toJS(Generator.generators).map(g => {
        if (window.google.maps.geometry.spherical.computeDistanceBetween(new window.google.maps.LatLng(pol[0].lat(), pol[0].lng()), new window.google.maps.LatLng(g.address.lat, g.address.lng)) <= 10) {
          flag = true;
          generatorId = g.generatorId;
        }
      })

      console.log(toJS(Cables.cables))
      toJS(Cables.cables).map(pt => {
        pt.coordinates.map((p, i) => {
          if (i != pt.coordinates.length - 1) {
            var startPoint = { lat: p.lat, lng: p.lng };
            var endPoint = { lat: pt.coordinates[i + 1].lat, lng: pt.coordinates[i + 1].lng };
            var coordinates = [startPoint, endPoint];
            var poll = new window.google.maps.Polyline({
              path: coordinates
            })
            if (window.google.maps.geometry.poly.isLocationOnEdge(new window.google.maps.LatLng(pol[0].lat(), pol[0].lng()), poll, 0.000001)) {
              flag = true;
              generatorId = pt.generatorId;
            }
          }
        })
      }
      )
      if (!flag)
        polyline.setMap(null);
      else {
        var pol = pol;
        this.setState({
          ...this.state, newPolyline: pol, openDialog: true, newCable: {
            generatorId: generatorId,
          }
        })
      }
    }

    handleAddressSelect = (event) => {
      const newBounds = new window.google.maps.LatLngBounds();
      event.target.value.path.map(c => {
        newBounds.extend(new window.google.maps.LatLng(c.lat(), c.lng()));
      });
      this.bounds = newBounds;
      this.props.setSelectedCable(event.target.value);
      this.fitBounds();
    }

    handlPlaceSelect = (address) => {
      if (address == null || address.geometry == null)
        return;

      this.setState({
        ...this.state,
        centerCoords: { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() }
      })
    }

    handleCloseCall = () => {
      this.state.isLoadMessageOpen = false;
    }

    style = {
      border: "#282c34 solid 1px"
    }

    polylineClick = (polyMouseEvent, id) => {
      console.log("show")
      var cable = CableOfPoint(polyMouseEvent.latLng.toJSON());
      var lengthFromStart = 0;
      cable.currentCable.map((point, i) => {
        if (i < cable.currentCable.length - 1 && i <= cable.index) {
          lengthFromStart += CalcLength(toJS(point), toJS(cable.currentCable[i + 1]));
        }
      })

      lengthFromStart += CalcLength(toJS(cable.currentCable[cable.index]), polyMouseEvent.latLng.toJSON());
      console.log("cab", cable)
      var loadForAllCable = calcLoadByTypeAndThickness(cable.type, cable.thickness);
      var loadLeftForCurrentPoint = loadToPointInCable(lengthFromStart, loadForAllCable);
      //this.setState({ ...this.state, infoWindowPosition: polyMouseEvent.latLng.toJSON(), loadLeftForCurrentPoint: loadLeftForCurrentPoint, isLoadMessageOpen: true });
      this.setState({ ...this.state, infoWindowPosition: polyMouseEvent.latLng.toJSON(), loadLeftForCurrentPoint: loadLeftForCurrentPoint, showPolylineClick: true, loadForSelectedCable: loadForAllCable, selectedCableId: id });

    }

    // shortRouteBetweenTwoPoints = () => {
    //   while (this.state.polylinesArr.length > 0) {
    //     this.state.polylinesArr.pop();
    //   }
    //   Cables.cables.map(c => {
    //     c.coordinates.map((cb, i) => {
    //       var length = (window.google.maps.geometry.spherical.computeDistanceBetween(cb, { lat: 32.0854098, lng: 34.84228530000001 }) / 1000).toFixed(2);
    //       this.state.polylinesArr.push({ path: [{ lat: 32.0854098, lng: 34.84228530000001 }, toJS(cb)], routeLength: length })
    //     }
    //     )
    //     this.setState({ ...this.state, polylinesArr: this.state.polylinesArr })
    //   })
    //   this.state.polylinesArr.sort((a, b) => (a.routeLength > b.routeLength) ? 1 : ((b.routeLength > a.routeLength) ? -1 : 0))
    //   //this.setState({ ...this.state, polylinesArr: this.state.polylinesArr })
    // }
    bounds = [];
    fitBounds = () => {
      this.mapRef.current.fitBounds(this.bounds);
    }

    handle = () => {
      var polyline = new window.google.maps.Polyline({
        path: this.path[0].coordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      })
    }

    addCableClick = async () => {
      var coordinatesAsString = "";
      this.state.newPolyline.map(point => coordinatesAsString += point.lat() + "," + point.lng() + " ")
      var cable = { ...this.state.newCable, path: coordinatesAsString, thickness: this.state.selectedCableThickness, type: parseInt(this.state.selectedCableType) }
      var id = await AddCable(cable).then(result => id = result.data);
      var polArr = [];
      this.state.newPolyline.map(p => polArr.push({ lat: p.lat(), lng: p.lng() }))
      console.log(toJS(Cables.cables))
      Cables.cables = [...toJS(Cables.cables), { ...cable, coordinates: polArr, id: id }]
      console.log(toJS(Cables.cables))
      this.setState({ ...this.setState, openDialog: false })
      this.IsAddCable = true;
    }

    deleteCable = async () => {
      var selectedCable;
      var hasCableOn = false;
      toJS(Cables.cables).map(cable => {
        if (cable.id == this.state.selectedCableId)
          selectedCable = cable;
      })

      var poll = new window.google.maps.Polyline({
        path: selectedCable.coordinates
      })
      toJS(Cables.cables).map(cable => {
        if (cable.id != selectedCable.id && window.google.maps.geometry.poly.isLocationOnEdge(new window.google.maps.LatLng(cable.coordinates[0].lat, cable.coordinates[0].lng), poll, 0.000001)) {
          hasCableOn = true;
          console.log("true");
        }
      })
      if (hasCableOn) {
        this.setState({ ...this.state, showPolylineClick: false, showCabelDeleteWarning: true })
        return;
      }
      var status = await DeleteCable(this.state.selectedCableId);
      if (status.data)
        Cables.removeCable(this.state.selectedCableId);
      this.setState({ ...this.state, showPolylineClick: false })

    }

    render() {
      const GoogleMapExample = observer(withGoogleMap(props =>
        this.state.centerCoords && <div>
          <GoogleMap
            ref={this.mapRef}
            center={{
              lat: this.state.centerCoords.lat,
              lng: this.state.centerCoords.lng,
            }}
            defaultZoom={80}>
            {
              this.state.newPolyline &&
              <Polyline
                path={this.state.newPolyline}
                geodesic={false}
                options={{
                  strokeOpacity: 1,
                  strokeWeight: 7,
                }}
                key={this.state.newPolyline}
              />
            }
            {/* <InfoWindow
              position={{lat: -34.397, lng: 150.644 }}
            >
              <div>
                <h1>InfoWindow</h1>
              </div>
            </InfoWindow> */}
            //#region הוספת גנרטור
            <AddGeneratorDrawer openDrawer={this.state.openDrawer} />
            //#endregion
            {<DrawingManager onPolylineComplete={(e) => { this.onPolylineComplete(e) }} onLoad={() => console.log("render drowing")}
              options={{
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
              }} />}
            //#region  ציור כבלים (הוספת כבל) התחלה
            {this.state.polylinesArr.length &&
              this.state.polylinesArr.map((c, i) =>
                <Polyline
                  path={c.path}
                  geodesic={false}
                  options={{
                    strokeColor: this.colors[i].color,
                    strokeOpacity: 1,
                    strokeWeight: this.colors[i].thickness,
                  }}
                  key={c.path} />
              )
            }
            //#endregion
            //#region  עומס על כבל התחלה 
            <Marker
              visible={false}
              position={this.state.infoWindowPosition}
            >
              {(
                this.state.isLoadMessageOpen && <InfoWindow onCloseClick={this.handleCloseCall}>
                  <p> {this.state.loadLeftForCurrentPoint}</p>
                </InfoWindow>
              )}
            </Marker>
            //#endregion
            //#region  ציור כבלים התחלה
            {toJS(Cables.cables).length &&
              toJS(Cables.cables).map(pt =>
                <Polyline ref={this.polRef} onRightClick={(e, k) => console.log(e, k, pt.id)} path={pt.coordinates} options={{ strokeColor: "black" }}
                  onClick={(polyline) => { this.polylineClick(polyline, pt.id) }}
                />
              )
            }
            //#endregion
            //#region  start generators
            {Generator.generators.length && Generator.generators.map(g => <Marker
              key={g.generatorId}
              position={g.address}
              icon={{
                path: "m 2.1801949,15.514566 c -0.081264,-0.127002 -0.096453,-0.261265 -0.077407,-0.684267 0.026223,-0.582457 0.1288407,-0.848139 0.4452148,-1.152682 l 0.188407,-0.181358 h 4.7133137 4.713315 l 0.188407,0.181358 c 0.316375,0.304544 0.418992,0.570225 0.445214,1.152682 0.04204,0.933977 0.624204,0.842272 -5.3469349,0.842272 -5.0611249,0 -5.1705242,-0.0033 -5.2695292,-0.158005 z M 3.0614906,7.9748695 V 3.17892 H 5.0846357 7.107781 V 7.9748695 12.77082 H 5.0846357 3.0614906 Z M 5.9354151,9.7424048 C 6.0515571,9.5781358 6.0495152,9.3155954 5.9306384,9.1298264 5.8484701,9.0014049 5.74079,8.982421 5.0945255,8.982421 c -0.6102747,0 -0.7602761,0.023653 -0.8460174,0.133396 -0.129608,0.1658966 -0.1336376,0.4124619 -0.00992,0.6058428 0.082348,0.1286959 0.1903098,0.1474049 0.8507795,0.1474049 0.6117056,0 0.7735986,-0.02424 0.846017,-0.1266648 z M 5.9207446,8.2041896 c 0.127904,-0.163713 0.1347603,-0.4567237 0.014671,-0.6265831 -0.1314323,-0.185891 -1.5701266,-0.185891 -1.7015589,0 -0.128535,0.1817952 -0.1106186,0.4881612 0.037116,0.6345057 0.1894504,0.1876816 1.5018968,0.1813777 1.6497897,-0.00792 z M 5.956581,6.6287795 C 6.0699389,6.4684516 6.0378485,6.1025711 5.8983071,5.9643352 5.801953,5.8688811 5.6187549,5.8388575 5.1326517,5.8388575 c -0.3514449,0 -0.7040612,0.034996 -0.7835875,0.077754 -0.1691738,0.090971 -0.2417346,0.3993793 -0.1506157,0.640177 0.060206,0.1591163 0.1101068,0.1687152 0.8767931,0.1687152 0.5563097,0 0.8345416,-0.030542 0.8813394,-0.096724 z m 1.8350804,1.34609 V 3.17892 H 9.8148065 11.837953 V 7.9748695 12.77082 H 9.8148065 7.7916614 Z m 2.4795266,0.9470996 c 0.432771,-1.1464408 0.412268,-1.4710265 -0.09292,-1.4710265 -0.154423,0 -0.2779721,-0.037261 -0.2779721,-0.083812 0,-0.046099 0.051282,-0.2260106 0.1139831,-0.399808 0.151413,-0.4197637 0.14371,-0.6135721 -0.03085,-0.775316 C 9.7432519,5.969429 9.5975833,6.1345894 9.3034212,6.962993 9.1615228,7.3625949 9.045429,7.7690189 9.045429,7.8661621 c 0,0.2970128 0.1614051,0.4714316 0.4362572,0.4714316 0.136197,0 0.2476241,0.035281 0.2476241,0.078446 0,0.043147 -0.055894,0.2411503 -0.1242012,0.4400059 -0.1034933,0.3013085 -0.1131987,0.3956913 -0.058217,0.5663859 0.052051,0.1615814 0.1073849,0.2048265 0.2620108,0.2048265 0.1881568,0 0.2067191,-0.02831 0.4622631,-0.7052847 z M 2.6625604,2.3728777 C 2.5253913,2.1788706 2.520047,2.0633425 2.6373037,1.8265834 2.7221962,1.6551646 2.7624419,1.6474397 3.5705818,1.6474397 h 0.844562 l 0.026682,-0.4554024 c 0.027283,-0.46547839 0.1288681,-0.67305646 0.329352,-0.67305646 0.2010467,0 0.302054,0.2074565 0.3295811,0.67691156 l 0.026945,0.4592571 0.2919139,-0.02399 0.2919139,-0.02399 0.029384,-0.4671946 C 5.7701513,0.67495048 5.840708,0.52285383 6.0283301,0.52024695 6.2247156,0.51752595 6.327153,0.72862849 6.3543272,1.1920696 l 0.026683,0.4554019 h 1.0677943 1.0677798 l 0.033704,-0.4616813 c 0.034001,-0.46619457 0.1313905,-0.66817441 0.3208406,-0.66554203 0.1876228,0.002599 0.258161,0.15470537 0.2874102,0.61972793 l 0.029389,0.4671944 H 9.501371 9.8148144 l 0.016544,-0.4433229 c 0.017185,-0.4605057 0.1051747,-0.64483381 0.3077856,-0.64483381 0.197973,0 0.331047,0.29161328 0.331047,0.72543801 v 0.4030187 h 0.851619 c 0.815433,0 0.855388,0.00764 0.940336,0.1791438 0.117251,0.2367586 0.111907,0.3522872 -0.02526,0.5462945 -0.112122,0.1585845 -0.189965,0.1612047 -4.7871621,0.1612047 -4.5971941,0 -4.6750342,-0.00262 -4.7871609,-0.1612047 z",
                fillColor: "white",
                fillOpacity: 0.9,
                scale: 2,
                strokeColor: "black",
                strokeWeight: 1,
                width: "100"
              }}
            >
              <Circle
                defaultCenter={{
                  lat: parseFloat(g.address.lat),
                  lng: parseFloat(g.address.lng)
                }}
                radius={10}
              // options={place.circle.options}
              />
            </Marker>)}
          //#endregion
          </GoogleMap>
          <Dialog open={this.state.openDialog}>
            <SimpleSelect v={this.state.selectedCableType}
              setV={(v) => this.setState({ ...this.state, selectedCableType: v, selectedCableThickness: this.state.thicknessArr[v - 1][0] })}
              arr={this.types}
              handleSelect={this.handleTypesSelect} />

            <SimpleSelect v={this.state.selectedCableThickness}
              setV={(v) => this.setState({ ...this.state, selectedCableThickness: v })}
              arr={this.state.thicknessArr[this.state.selectedCableType - 1]} />

            <button onClick={() => this.addCableClick()}>הוסף כבל</button>
            <button onClick={() => this.setState({ ...this.state, newPolyline: null, openDialog: false })}>בטל</button>
          </Dialog>
          <button onClick={this.handle} />
        </div>
      ))

      return (
        <div>
          <Dialog open={this.state.showPolylineClick} onBackdropClick={() => this.setState({ ...this.state, showPolylineClick: false })}>
            <p>point load:{this.state.loadLeftForCurrentPoint}</p>
            <p>
              cable load:{this.state.loadForSelectedCable}
            </p>
            <button onClick={this.deleteCable}>delete</button>
          </Dialog>
          <Dialog open={this.state.showCabelDeleteWarning}>
            <p>
              אין אפשרות למחוק כבל זה כי יש כבל אחר שתלוי בו או כתובת שתלויה בו
            </p>
            <button onClick={()=>this.setState({...this.state, showCabelDeleteWarning: false})}>אישור</button>
          </Dialog>
          <div style={{ width: "100%", position: "relative" }, { height: "100%" }, { zIndex: 1 }, { backgroundColor: "red" }, { margin: "30px" }}>
            <Line>
              <PlacesAutoComplete onSelectionChanged={this.handlPlaceSelect} />
              {this.props.addresses && <div>
                <Select arr={this.props.addresses} handleSelect={this.handleAddressSelect} />
              </div>}
            </Line>
            <GoogleMapExample
              containerElement={<div style={{ height: `500px`, width: '100%', position: "relative" }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
      );
    }
  }
)
