
import React, { useRef, useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, DrawingManager, Polyline, InfoWindow, Circle, Marker } from '@react-google-maps/api';
import Cables from './Mobx/Cables'
import Generator from './Mobx/Generator'
import { toJS } from 'mobx'
import AddGeneratorDrawer from './view/GeneratorDrawer'
import { CableOfPoint, loadToPointInCable, CalcLength, loadToPointInCable2, calcLoadByTypeAndThickness, getLatLngFromString, lengthForCable } from './services/Functions'
import PlacesAutoComplete from './UIKit/placesAutoComplete'
import { AddCable, DeleteCable } from './connect to server/Connect'
import Dialog from '@material-ui/core/Dialog'
import Line from './UIKit/Line';
import Select from './UIKit/Select'
import SimpleSelect from './UIKit/SimpleSelect'

const containerStyle = {
    height: `500px`,
    width: '100%'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function MyComponent(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBwBhST7RvyHmk9JLlkMPHp8LAfY7AqIEw&libraries=places,drawing,geometry&language=iw"
    })

    const [map, setMap] = React.useState(null)
    const types = [1, 2];
    const thicknessType1 = [1.5, 2.5, 4, 6, 10, 16, 25, 30, 35, 50, 70, 92, 120, 150, 240];
    const thicknessType2 = [24, 50, 70, 65, 150, 240];
    const [isAddCable, setIsAddCable] = useState(false);
    const [center, setCenter] = useState({ lat: 54.68916, lng: 25.2798 });
    const refMap = useRef(null);
    const [isLoadMessageOpen, setIsLoadMessageOpen] = useState(false);
    const [address, setAddress] = useState('search')
    const [infoWindowPosition, setInfoWindowPosition] = useState({ lat: -34.397, lng: 150.644 })
    const [loadLeftForCurrentPoint, setLoadLeftForCurrentPoint] = useState(0)
    const [polylinesArr, setPolylinesArr] = useState([])
    const [openDrawer, setOpenDrawer] = useState([])
    const [openDialog, setOpenDialog] = useState(false);
    const [showLowLoadWarning, setShowLowLoadWarning] = useState(false)
    const [showCabelDeleteWarning, setshowCabelDeleteWarning] = useState(false)
    const [showPolylineClick, setShowPolylineClick] = useState(false)
    const [thicknessArr, setThicknessArr] = useState([thicknessType1, thicknessType2])
    const [loadForSelectedCable, setLoadForSelectedCable] = useState(0)
    const [DeleteCable, setDeleteCable] = useState(-1)
    const [selectedCableType, setSelectedCableType] = useState(1)
    const [newPolyline, setNewPolyline] = useState(null)
    const [newCable, setNewCable] = useState(null)
    const [selectedCableThickness, setSelectedCableThickness] = useState(1.5)
    const [centerCoords, setCenterCoords] = useState({ lat: -34.397, lng: 150.644 });
    const [selectedCableId, setSelectedCableId] = useState(-1);
    const [addressToAddCableTo, setAddressToAddCableTo] = useState(null);

    const colors = [
        { color: "#ff4444", thickness: 14 }, { color: "#ffbb33", thickness: 12 }, { color: "#00C851", thickness: 10 }, { color: "#33b5e5", thickness: 8 },
        { color: "#CC0000", thickness: 6 }, { color: "#FF8800", thickness: 4 }
    ];

    //   componentWillMount() {
    //     if (this.props.polylinesArr != undefined)
    //       this.setState({ ...this.state, polylinesArr: this.props.polylinesArr })

    //     if (this.props.openDrawer != undefined)
    //       this.setState({ ...this.setState, openDrawer: this.props.openDrawer })
    //   }

    const onPolylineComplete = (polyline) => {
        var connectToCableOrGenerator = false;
        var startOnSelectedAddress = false;
        var generatorId = -1;
        var pol = polyline.getPath().getArray();
        var addressPointIndex = -1;
        if (props.address) {
            console.log("addressToAddCableTo", addressToAddCableTo)
            var centerCirclePoint = new window.google.maps.LatLng(addressToAddCableTo.lat, addressToAddCableTo.lng);

            if (window.google.maps.geometry.spherical.computeDistanceBetween(pol[0], centerCirclePoint) <= 3) {
                startOnSelectedAddress = true;
                addressPointIndex = 0;
            }
            else if (window.google.maps.geometry.spherical.computeDistanceBetween(pol[pol.length - 1], centerCirclePoint) <= 3) {
                startOnSelectedAddress = true;
                addressPointIndex = 1;
            }

            var pointToConnect = addressPointIndex == 0 ? pol[1] :
                addressPointIndex == 1 ? pol[0] :
                    null;
        }

        var point = addressToAddCableTo && pointToConnect != null ? pointToConnect : pol[0];

        toJS(Generator.generators).map(g => {
            if (window.google.maps.geometry.spherical.computeDistanceBetween(point, new window.google.maps.LatLng(g.address.lat, g.address.lng)) <= 10) {
                connectToCableOrGenerator = true;
                generatorId = g.generatorId;
            }
        })

        toJS(Cables.cables).map(cable => {
            cable.coordinates.map((p, i) => {
                if (i != cable.coordinates.length - 1) {
                    var startPoint = { lat: p.lat, lng: p.lng };
                    var endPoint = { lat: cable.coordinates[i + 1].lat, lng: cable.coordinates[i + 1].lng };
                    var coordinates = [startPoint, endPoint];
                    var poll = new window.google.maps.Polyline({
                        path: coordinates
                    })

                    if (window.google.maps.geometry.poly.isLocationOnEdge(point, poll, 0.0001)) {
                        connectToCableOrGenerator = true;
                        generatorId = cable.generatorId;
                    }
                }
            })
        })

        if (!connectToCableOrGenerator && !props.address || (props.address && (!connectToCableOrGenerator || !startOnSelectedAddress)))
            polyline.setMap(null);
        else {
            var pol = pol;
            setNewPolyline(pol);
            setOpenDialog(true);
            setNewCable({ generatorId: generatorId, })
        }
    }

    const handleAddressSelect = (event) => {
        const newBounds = new window.google.maps.LatLngBounds();
        event.target.value.path.map(c => {
            newBounds.extend(new window.google.maps.LatLng(c.lat(), c.lng()));
        });
        props.setSelectedCable(event.target.value);
        fitBounds(newBounds);
    }

    const handlPlaceSelect = (address) => {
        if (address == null || address.geometry == null)
            return;
        console.log("setCenterCoords", centerCoords)
        setCenterCoords({ lat: address.geometry.location.lat(), lng: address.geometry.location.lng() })
    }

    const handleCloseCall = () => {
        setIsLoadMessageOpen(false);
    }

    const fitBounds = (bounds) => {
        map.fitBounds(bounds);
    }

    const addCableClick = () => {
        if (props.address) {
            var length = lengthForCable(newPolyline);
            var loadByTypeAndThickness = calcLoadByTypeAndThickness(selectedCableType, selectedCableThickness);
            var load = loadToPointInCable2(length, loadByTypeAndThickness);
            console.log("load", load)
            if (load < props.amperTpAdd) {
                setShowLowLoadWarning(true);
                return;
            }

            var cable = {
                thickness: selectedCableThickness,
                type: selectedCableType,
                path: newPolyline,
                load: load,
                routeLength: length,
                generatorId: newCable.generatorId
            }
            props.setSelectedCable(cable);
            setOpenDialog(false);
            setIsAddCable(true);
            return;
        }

        var coordinatesAsString = "";
        newPolyline.map(point => coordinatesAsString += point.lat() + "," + point.lng() + " ")
        var cable = { ...newCable, path: coordinatesAsString, thickness: selectedCableThickness, type: parseInt(selectedCableType) }
        var polArr = [];
        newPolyline.map(p => polArr.push({ lat: p.lat(), lng: p.lng() }))
        var id = AddCable(cable).then(result =>
            Cables.cables = [...toJS(Cables.cables), { ...cable, coordinates: polArr, id: result.data }]
        );


        setOpenDialog(false)
        setIsAddCable(true);
    }

    const deleteCable = async () => {
        var selectedCable;
        var hasCableOn = false;
        toJS(Cables.cables).map(cable => {
            if (cable.id == selectedCableId)
                selectedCable = cable;
        })

        var poll = new window.google.maps.Polyline({
            path: selectedCable.coordinates
        })
        toJS(Cables.cables).map(cable => {
            if (cable.id != selectedCable.id && window.google.maps.geometry.poly.isLocationOnEdge(new window.google.maps.LatLng(cable.coordinates[0].lat, cable.coordinates[0].lng), poll, 0.000001)) {
                hasCableOn = true;
            }
        })
        if (hasCableOn) {
            setShowPolylineClick(false);
            setshowCabelDeleteWarning(true)
            return;
        }
        var status = await DeleteCable(selectedCableId);
        if (status.data)
            Cables.removeCable(selectedCableId);
        setIsLoadMessageOpen(false);
    }

    const lengthForNewDrawnCable = () => {
        if (!newPolyline)
            return "";
        return (window.google.maps.geometry.spherical.computeDistanceBetween(newPolyline[0], newPolyline[1])).toFixed(2);
    }

    useEffect(() => {
        if (props.address)
            setAddressToAddCableTo(props.address.lat ? props.address : getLatLngFromString(props.address.address));
        setCenterCoords(addressToAddCableTo ? addressToAddCableTo : { lat: -34.397, lng: 150.644 });
        if (props.polylinesArr != undefined)
            setPolylinesArr(props.polylinesArr)

        if (props.openDrawer != undefined)
            setOpenDrawer(props.openDrawer)
    }, [])

    const handleBoundsChanged = () => {
        const mapCenter = refMap.current.getCenter(); //get map center
        setCenter(mapCenter);
    };

    const polylineClick = (polyMouseEvent, id) => {
        var cable = CableOfPoint(polyMouseEvent.latLng.toJSON());
        var lengthFromStart = 0;
        cable.currentCable.map((point, i) => {
            if (i < cable.currentCable.length - 1 && i <= cable.index) {
                lengthFromStart += CalcLength(toJS(point), toJS(cable.currentCable[i + 1]));
            }
        })

        lengthFromStart += CalcLength(toJS(cable.currentCable[cable.index]), polyMouseEvent.latLng.toJSON());
        var loadForAllCable = calcLoadByTypeAndThickness(cable.type, cable.thickness);
        var loadLeftForCurrentPoint = loadToPointInCable(lengthFromStart, loadForAllCable);
        setInfoWindowPosition(polyMouseEvent.latLng.toJSON());
        setLoadLeftForCurrentPoint(loadLeftForCurrentPoint)
        setIsLoadMessageOpen(true)
        setSelectedCableId(id)
    }

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <div style={{marginTop: '10vh'}}>
            <Line>
                <PlacesAutoComplete onSelectionChanged={handlPlaceSelect} />
                {props.addresses && <div>
                    <Select arr={props.addresses} handleSelect={handleAddressSelect} />
                </div>}
            </Line>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={centerCoords}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                width={"100%"}
            >
                {
                    newPolyline &&
                    <Polyline
                        path={newPolyline}
                        geodesic={false}
                        options={{
                            strokeOpacity: 1,
                            strokeWeight: 7,
                        }}
                        key={newPolyline}
                    />
                }
                //#region הוספת גנרטור
                <AddGeneratorDrawer openDrawer={openDrawer} />
                //#endregion
                {<DrawingManager
                    onPolylineComplete={(e) => { onPolylineComplete(e) }}
                    options={{
                        position: window.google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: ['polyline']
                    }}
                />}
                {props.address && <Marker position={addressToAddCableTo} />}
                //#region  ציור כבלים (הוספת כבל) התחלה
                {polylinesArr.length &&
                    polylinesArr.map((c, i) =>
                        <Polyline
                            path={c.path}
                            geodesic={false}
                            options={{
                                strokeColor: colors[i].color,
                                strokeOpacity: 1,
                                strokeWeight: colors[i].thickness,
                            }}
                            key={c.path} />
                    )
                }
                //#endregion
                //#region  עומס על כבל התחלה 
                {(
                    isLoadMessageOpen && <InfoWindow position={infoWindowPosition} onCloseClick={handleCloseCall}>
                        <div>
                            <p> {loadLeftForCurrentPoint}</p>
                            {/* <button onClick={this.deleteCable}>delete</button> */}
                        </div>
                    </InfoWindow>
                )}
                //#endregion
                //#region  ציור כבלים התחלה
                {toJS(Cables.cables).length &&
                    toJS(Cables.cables).map(pt =>
                        <Polyline onRightClick={(e, k) => console.log(e, k, pt.id)} path={pt.coordinates} options={{ strokeColor: "black" }}
                            onClick={(polyline) => { polylineClick(polyline, pt.id) }} />
                    )
                }
                //#endregion
                //#region  start generators
                {Generator.generators.length && Generator.generators.map(g =>
                    <Circle
                        key={g.generatorId}
                        center={{
                            lat: g.address.lat,
                            lng: g.address.lng
                        }}
                        radius={10}
                    />
                )}
                //#endregion
                {
                    addressToAddCableTo
                    && <Circle
                        center={
                            addressToAddCableTo}
                        options={{
                            fillColor: 'red',
                            strokeColor: 'red'
                        }}
                        radius={3}
                    />
                }
                <></>
            </GoogleMap>
            <Dialog open={showPolylineClick} onBackdropClick={() => setShowPolylineClick(false)}>
                <p>point load:{loadLeftForCurrentPoint}</p>
                <p>cable load:{loadForSelectedCable}</p>
                <button onClick={deleteCable}>delete</button>
            </Dialog>
            <Dialog open={showCabelDeleteWarning}>
                <p>אין אפשרות למחוק כבל זה כי יש כבל אחר שתלוי בו או כתובת שתלויה בו</p>
                <button onClick={() => this.setState({ ...this.state, showCabelDeleteWarning: false })}>אישור</button>
            </Dialog>
            <Dialog open={openDialog}>
                <h>אורך כבל: {lengthForNewDrawnCable()}</h>
                <h>סוג כבל:</h>
                <SimpleSelect v={selectedCableType}
                    setV={(v) => { setSelectedCableType(v); setSelectedCableThickness(thicknessArr[v - 1][0]); setShowLowLoadWarning(false) }}
                    arr={types}
                // handleSelect={handleTypesSelect} 
                />
                <h>עובי כבל:</h>
                <SimpleSelect v={selectedCableThickness}
                    setV={(v) => { setSelectedCableThickness(v); setShowLowLoadWarning(false) }}
                    arr={thicknessArr[selectedCableType - 1]} />
                {showLowLoadWarning && <p style={{ color: "red" }}>עומס נמוך</p>}
                <button onClick={() => addCableClick()}>{addressToAddCableTo ? "אשר" : "הוסף כבל"}</button>
                <button onClick={() => { setNewPolyline(null); setOpenDialog(false); setShowLowLoadWarning(false) }}>בטל</button>
            </Dialog>
        </div>
    ) : <></>
}

export default React.memo(MyComponent)