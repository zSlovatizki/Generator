// import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline, Circle } from 'react-google-maps';
// import Dialog from '@material-ui/core/Dialog'
// import Cables from './Mobx/Cables'
// import Generator from './Mobx/Generator'
// import { toJS } from 'mobx'
// import { observer } from 'mobx-react'
// import { CableOfPoint, loadToPointInCable, CalcLength, loadToPointInCable2, calcLoadByTypeAndThickness, getLatLngFromString, lengthForCable } from './services/Functions'
// import PlacesAutoComplete from './UIKit/placesAutoComplete'
// import Line from './UIKit/Line';
// import AddGeneratorDrawer from './view/GeneratorDrawer'
// import Select from './UIKit/Select'
// import SimpleSelect from './UIKit/SimpleSelect'
// import { AddCable, DeleteCable } from './connect to server/Connect'
// const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

// //export default observer(

//   export default class Map extends Component {

//     types = [1, 2];
//     thicknessType1 = [1.5, 2.5, 4, 6, 10, 16, 25, 30, 35, 50, 70, 92, 120, 150, 240];
//     thicknessType2 = [24, 50, 70, 65, 150, 240];
//     IsAddCable = false;

//     constructor(props) {
//       super(props);
//       this.mapRef = React.createRef();
//       var addressPropsCoordinates;
//       if (this.props.address)
//         addressPropsCoordinates = this.props.address.lat ? this.props.address : getLatLngFromString(this.props.address.address);

//       this.state = {
//         isLoadMessageOpen: false,
//         centerCoords: addressPropsCoordinates ? addressPropsCoordinates : { lat: -34.397, lng: 150.644 },
//         address: 'search',
//         infoWindowPosition: { lat: -34.397, lng: 150.644 },
//         loadLeftForCurrentPoint: 0,
//         polylinesArr: [],
//         openDrawer: false,
//         openDialog: false,
//         newPolyline: null,
//         newCable: null,
//         selectedCableThickness: 1.5,
//         selectedCableType: 1,
//         thicknessArr: [this.thicknessType1, this.thicknessType2],
//         showPolylineClick: false,
//         loadForSelectedCable: 0,
//         DeleteCable: -1,
//         showCabelDeleteWarning: false,
//         addressToAddCableTo: addressPropsCoordinates,
//         showLowLoadWarning: false
//       };
//     }

//     colors = [
//       { color: "#ff4444", thickness: 14 }, { color: "#ffbb33", thickness: 12 }, { color: "#00C851", thickness: 10 }, { color: "#33b5e5", thickness: 8 },
//       { color: "#CC0000", thickness: 6 }, { color: "#FF8800", thickness: 4 }
//     ];


   

//     componentWillMount() {
//       if (this.props.polylinesArr != undefined)
//         this.setState({ ...this.state, polylinesArr: this.props.polylinesArr })

//       if (this.props.openDrawer != undefined)
//         this.setState({ ...this.setState, openDrawer: this.props.openDrawer })
//     }

//     onPolylineComplete(polyline) {

//       console.log("address", this.props.address);

//       var connectToCableOrGenerator = false;
//       var startOnSelectedAddress = false;
//       var generatorId = -1;
//       var pol = polyline.getPath().getArray();
//       var addressPointIndex = -1;
//       if (this.props.address) {

//         var centerCirclePoint = new window.google.maps.LatLng(this.state.addressToAddCableTo.lat, this.state.addressToAddCableTo.lng);

//         if (window.google.maps.geometry.spherical.computeDistanceBetween(pol[0], centerCirclePoint) <= 3) {
//           startOnSelectedAddress = true;
//           addressPointIndex = 0;
//         }
//         else if (window.google.maps.geometry.spherical.computeDistanceBetween(pol[pol.length - 1], centerCirclePoint) <= 3) {
//           startOnSelectedAddress = true;
//           addressPointIndex = 1;
//         }

//         var pointToConnect = addressPointIndex == 0 ? pol[1] :
//           addressPointIndex == 1 ? pol[0] :
//             null;
//       }

//       var point = this.state.addressToAddCableTo && pointToConnect != null ? pointToConnect : pol[0];
      
//       toJS(Generator.generators).map(g => {
//         if (window.google.maps.geometry.spherical.computeDistanceBetween(point, new window.google.maps.LatLng(g.address.lat, g.address.lng)) <= 10) {
//           connectToCableOrGenerator = true;
//           generatorId = g.generatorId;
//         }
//       })

//       toJS(Cables.cables).map(cable => {
//         cable.coordinates.map((p, i) => {
//           if (i != cable.coordinates.length - 1) {
//             var startPoint = { lat: p.lat, lng: p.lng };
//             var endPoint = { lat: cable.coordinates[i + 1].lat, lng: cable.coordinates[i + 1].lng };
//             var coordinates = [startPoint, endPoint];
//             var poll = new window.google.maps.Polyline({
//               path: coordinates
//             })

//             if (window.google.maps.geometry.poly.isLocationOnEdge(point, poll, 0.0001)) {
//               connectToCableOrGenerator = true;
//               generatorId = cable.generatorId;
//             }
//           }
//         })
//       })

//       if (!connectToCableOrGenerator && !this.props.address || (this.props.address && (!connectToCableOrGenerator || !startOnSelectedAddress)))
//         polyline.setMap(null);
//       else {
//         var pol = pol;
//         this.setState({
//           ...this.state,
//           newPolyline: pol,
//           openDialog: true,
//           newCable: { generatorId: generatorId, }
//         })
//       }
//     }

//     handleAddressSelect = (event) => {
//       const newBounds = new window.google.maps.LatLngBounds();
//       event.target.value.path.map(c => {
//         newBounds.extend(new window.google.maps.LatLng(c.lat(), c.lng()));
//       });
//       this.bounds = newBounds;
//       this.props.setSelectedCable(event.target.value);
//       this.fitBounds();
//     }

//     handlPlaceSelect = (address) => {
//       if (address == null || address.geometry == null)
//         return;

//       this.setState({
//         ...this.state,
//         centerCoords: { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() }
//       })
//     }

//     handleCloseCall = () => {
//       this.state.isLoadMessageOpen = false;
//     }

//     style = {
//       border: "#282c34 solid 1px"
//     }

//     polylineClick = (polyMouseEvent, id) => {
//       var cable = CableOfPoint(polyMouseEvent.latLng.toJSON());
//       var lengthFromStart = 0;
//       cable.currentCable.map((point, i) => {
//         if (i < cable.currentCable.length - 1 && i <= cable.index) {
//           lengthFromStart += CalcLength(toJS(point), toJS(cable.currentCable[i + 1]));
//         }
//       })

//       lengthFromStart += CalcLength(toJS(cable.currentCable[cable.index]), polyMouseEvent.latLng.toJSON());
//       var loadForAllCable = calcLoadByTypeAndThickness(cable.type, cable.thickness);
//       var loadLeftForCurrentPoint = loadToPointInCable(lengthFromStart, loadForAllCable);
//       this.setState({ ...this.state, infoWindowPosition: polyMouseEvent.latLng.toJSON(), loadLeftForCurrentPoint: loadLeftForCurrentPoint, isLoadMessageOpen: true, selectedCableId: id });
//     }

//     bounds = [];
//     fitBounds = () => {
//       this.mapRef.current.fitBounds(this.bounds);
//     }

//     addCableClick = async () => {
//       if (this.props.address) {
//         var length = lengthForCable(this.state.newPolyline);
//         var loadByTypeAndThickness = calcLoadByTypeAndThickness(this.state.selectedCableType, this.state.selectedCableThickness);
//         var load = loadToPointInCable2(length, loadByTypeAndThickness);
//         console.log("load", load)
//         if (load < this.props.amperTpAdd) {
//           this.setState({ ...this.state, showLowLoadWarning: true })
//           return;
//         }

//         var cable = {
//           thickness: this.state.selectedCableThickness,
//           type: this.state.selectedCableType,
//           path: this.state.newPolyline,
//           load: load,
//           routeLength: length,
//           generatorId: this.state.newCable.generatorId
//         }
//         this.props.setSelectedCable(cable);
//         this.setState({ ...this.setState, openDialog: false })
//         this.IsAddCable = true;
//         return;
//       }

//       var coordinatesAsString = "";
//       this.state.newPolyline.map(point => coordinatesAsString += point.lat() + "," + point.lng() + " ")
//       var cable = { ...this.state.newCable, path: coordinatesAsString, thickness: this.state.selectedCableThickness, type: parseInt(this.state.selectedCableType) }
//       var id = await AddCable(cable).then(result => id = result.data);
//       var polArr = [];
//       this.state.newPolyline.map(p => polArr.push({ lat: p.lat(), lng: p.lng() }))
//       Cables.cables = [...toJS(Cables.cables), { ...cable, coordinates: polArr, id: id }]
//       this.setState({ ...this.setState, openDialog: false })
//       this.IsAddCable = true;
//     }

//     deleteCable = async () => {
//       var selectedCable;
//       var hasCableOn = false;
//       toJS(Cables.cables).map(cable => {
//         if (cable.id == this.state.selectedCableId)
//           selectedCable = cable;
//       })

//       var poll = new window.google.maps.Polyline({
//         path: selectedCable.coordinates
//       })
//       toJS(Cables.cables).map(cable => {
//         if (cable.id != selectedCable.id && window.google.maps.geometry.poly.isLocationOnEdge(new window.google.maps.LatLng(cable.coordinates[0].lat, cable.coordinates[0].lng), poll, 0.000001)) {
//           hasCableOn = true;
//         }
//       })
//       if (hasCableOn) {
//         this.setState({ ...this.state, showPolylineClick: false, showCabelDeleteWarning: true })
//         return;
//       }
//       var status = await DeleteCable(this.state.selectedCableId);
//       if (status.data)
//         Cables.removeCable(this.state.selectedCableId);
//       this.setState({ ...this.state, isLoadMessageOpen: false });
//     }

//     lengthForNewDrawnCable() {
//       if (!this.state.newPolyline)
//         return "";
//       return (window.google.maps.geometry.spherical.computeDistanceBetween(this.state.newPolyline[0], this.state.newPolyline[1])).toFixed(2);
//     }

//     render() {
//       const GoogleMapExample = observer(withGoogleMap(props =>
//         this.state.centerCoords && <div>
//           <GoogleMap
//             ref={this.mapRef}
//             center={{
//               lat: this.state.centerCoords.lat,
//               lng: this.state.centerCoords.lng,
//             }}
//             defaultZoom={17}>
//             {
//               this.state.newPolyline &&
//               <Polyline
//                 path={this.state.newPolyline}
//                 geodesic={false}
//                 options={{
//                   strokeOpacity: 1,
//                   strokeWeight: 7,
//                 }}
//                 key={this.state.newPolyline}
//               />
//             }
//             //#region הוספת גנרטור
//             <AddGeneratorDrawer openDrawer={this.state.openDrawer} />
//             //#endregion
//             {<DrawingManager onPolylineComplete={(e) => { this.onPolylineComplete(e) }} onLoad={() => console.log("render drowing")}
//               options={{
//                 position: window.google.maps.ControlPosition.TOP_CENTER,
//                 drawingModes: ['polyline']
//               }} />}
//             {this.props.address && <Marker position={this.state.addressToAddCableTo} />}
//             //#region  ציור כבלים (הוספת כבל) התחלה
//             {this.state.polylinesArr.length &&
//               this.state.polylinesArr.map((c, i) =>
//                 <Polyline
//                   path={c.path}
//                   geodesic={false}
//                   options={{
//                     strokeColor: this.colors[i].color,
//                     strokeOpacity: 1,
//                     strokeWeight: this.colors[i].thickness,
//                   }}
//                   key={c.path} />
//               )
//             }
//             //#endregion
//             //#region  עומס על כבל התחלה 
//             {(
//               this.state.isLoadMessageOpen && <InfoWindow position={this.state.infoWindowPosition} onCloseClick={this.handleCloseCall}>
//                 <div>
//                   <p> {this.state.loadLeftForCurrentPoint}</p>
//                   <button onClick={this.deleteCable}>delete</button>
//                 </div>
//               </InfoWindow>
//             )}
//             //#endregion
//             //#region  ציור כבלים התחלה
//             {toJS(Cables.cables).length &&
//               toJS(Cables.cables).map(pt =>
//                 <Polyline onRightClick={(e, k) => console.log(e, k, pt.id)} path={pt.coordinates} options={{ strokeColor: "black" }}
//                   onClick={(polyline) => { this.polylineClick(polyline, pt.id) }} />
//               )
//             }
//             //#endregion
//             //#region  start generators
//             {Generator.generators.length && Generator.generators.map(g =>
//               <Circle
//                 key={g.generatorId}
//                 defaultCenter={{
//                   lat: parseFloat(g.address.lat),
//                   lng: parseFloat(g.address.lng)
//                 }}
//                 radius={10}
//               />
//             )}
//             //#endregion
//             {
//               this.state.addressToAddCableTo && <Circle
//                 defaultCenter={{
//                   lat: this.state.addressToAddCableTo.lat,
//                   lng: this.state.addressToAddCableTo.lng
//                 }}
//                 options={{
//                   fillColor: 'red',
//                   strokeColor: 'red'
//                 }}
//                 radius={3}
//               />
//             }
//           </GoogleMap>
//           <Dialog open={this.state.openDialog}>
//             <h>אורך כבל: {this.lengthForNewDrawnCable()}</h>
//             <h>סוג כבל:</h>
//             <SimpleSelect v={this.state.selectedCableType}
//               setV={(v) => this.setState({ ...this.state, selectedCableType: v, selectedCableThickness: this.state.thicknessArr[v - 1][0], showLowLoadWarning: false })}
//               arr={this.types}
//               handleSelect={this.handleTypesSelect} />
//             <h>עובי כבל:</h>
//             <SimpleSelect v={this.state.selectedCableThickness}
//               setV={(v) => this.setState({ ...this.state, selectedCableThickness: v, showLowLoadWarning: false })}
//               arr={this.state.thicknessArr[this.state.selectedCableType - 1]} />
//             {this.state.showLowLoadWarning && <p style={{ color: "red" }}>עומס נמוך</p>}
//             <button onClick={() => this.addCableClick()}>{this.state.addressToAddCableTo ? "אשר" : "הוסף כבל"}</button>
//             <button onClick={() => this.setState({ ...this.state, newPolyline: null, openDialog: false, showLowLoadWarning: false })}>בטל</button>
//           </Dialog>
//         </div>
//       ))

//       return (
//         <div>
//           <Dialog open={this.state.showPolylineClick} onBackdropClick={() => this.setState({ ...this.state, showPolylineClick: false })}>
//             <p>point load:{this.state.loadLeftForCurrentPoint}</p>
//             <p>cable load:{this.state.loadForSelectedCable}</p>
//             <button onClick={this.deleteCable}>delete</button>
//           </Dialog>
//           <Dialog open={this.state.showCabelDeleteWarning}>
//             <p>אין אפשרות למחוק כבל זה כי יש כבל אחר שתלוי בו או כתובת שתלויה בו</p>
//             <button onClick={() => this.setState({ ...this.state, showCabelDeleteWarning: false })}>אישור</button>
//           </Dialog>
//           <div style={{ width: "100%", position: "relative" }, { height: "100%" }, { zIndex: 1 }, { backgroundColor: "red" }, { margin: "30px" }}>
//             <Line>
//               <PlacesAutoComplete onSelectionChanged={this.handlPlaceSelect} />
//               {this.props.addresses && <div>
//                 <Select arr={this.props.addresses} handleSelect={this.handleAddressSelect} />
//               </div>}
//             </Line>
//             <GoogleMapExample
//               containerElement={<div style={{ height: `500px`, width: '100%', position: "relative" }} />}
//               mapElement={<div style={{ height: `100%` }} />}
//             />
//           </div>
//         </div>
//       );
//     }
//   }
// //)
