import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Line from '../UIKit/Line'
import Grid from '../UIKit/Grid'
import SimpleSelect from '../UIKit/SimpleSelect'
import Cables from '../Mobx/Cables';
import { toJS } from 'mobx';
import AddCableMap from './AddCableMap'
import { loadToPointInCable2, getLatLngFromString, lengthForCable, calcLoadByTypeAndThickness, getAddressNameByLatLng } from '../services/Functions'
import Dialog from '@mui/material/Dialog';
import { AmpereLeftToGenerator, AddUserAddress, AddCable, addCableToAddress, addAmpereToUser } from '../connect to server/Connect'
import ReplyIcon from '@mui/icons-material/Reply';
import { Button } from '@material-ui/core';
import { parse } from 'querystring';

export default function UpdateAmountForAdress(props) {

    const location = useLocation();
    const types = [1, 2];
    const thickness1 = [1.5, 2.5, 4, 6, 10, 16, 25, 30, 35, 50, 70, 92, 120, 150, 240];
    const thickness2 = [24, 50, 70, 65, 150, 240];
    const [polylinesArr, setPolylinesArr] = useState([]);
    const [address, setAddress] = useState();
    const [selectedCables, setselectedCables] = useState([]);
    const [amperInputValue, setAmperInputValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCableType, setSelectedCableType] = useState(1);
    const [selectedCableThickness, setSelectedCableThickness] = useState(10);
    const [thicknessArr, setThicknessArr] = useState(thickness1);
    const [show, setShow] = useState(false);
    const [openSucceededPopup, setOpenSucceededPopup] = useState(false);
    const [cableForNewAddress, setCableForNewAddress] = useState();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    useEffect(() => {
        var selectedCables = [];
        setAddress(props.address)
        if (!props.newAddress) {
            Cables.cables.map(c => {
                props.address.cables.map(c2 => {
                    if (c.id == c2)
                        selectedCables.push(c);
                })
            })
        }
        setselectedCables(selectedCables);
    }, [])

    const updateAmperAndCablesView = (userAddressID, amperAmount, newCableId) => {
        props.updateAmperView(userAddressID, amperAmount);
        setAddress({ ...address, cables: [...address.cables, newCableId], ampereAmount: parseFloat(address.ampereAmount) + parseFloat(amperAmount) })
        clearAll();
    }

    const loadForCable = () => {
        var load = 0;
        selectedCables.map(cable => {
            var cableLength = lengthForCable(toJS(cable).coordinates);
            var cableLoad = calcLoadByTypeAndThickness(toJS(cable).type, toJS(cable).thickness)
            var loadForCable = loadToPointInCable2(cableLength, cableLoad);
            if (loadForCable > 0)
                load += loadForCable;
        });
        return load;
    } //check

    async function handleUpdateClick() {
        if (!props.address.lat && props.newAddress)
            return;
        var load = 0;
        if (!props.newAddress)
            load = loadForCable();

        var addressAmpereAmount = address.ampereAmount ? address.ampereAmount : 0;

        if (props.newAddress && !cableForNewAddress || !props.newAddress && (parseFloat(parseFloat(amperInputValue) + parseFloat(addressAmpereAmount))) > parseFloat(load)) {
            if (!show && !props.newAddress)
                setShow(true);
            else {
                var amperToAdd = props.newAddress ? amperInputValue : load - address.ampereAmount < 0 ? amperInputValue : amperInputValue - (load - address.ampereAmount)
                shortRouteBetweenTwoPoints(amperToAdd)
            }
        }
        else {
            if (props.newAddress) {
                var userAddressObj = {
                    address: props.address.lat + "," + props.address.lng,
                    ampereAmount: amperInputValue,
                    generatorID: cableForNewAddress.cable.generatorId,
                    userID: query.get('id')
                }

                var addressId = await AddUserAddress(userAddressObj);
                console.log("addressId",  addressId)
                var cableId = await AddCable(cableForNewAddress.cable).then(result => cableId = result.data);
                addCableToAddress(cableId, addressId)
                setAddress({ ...address, cables: address.cables ? [...address.cables, cableId] : [cableId] })
                Cables.cables = [...toJS(Cables.cables), { ...cableForNewAddress.cable, coordinates: cableForNewAddress.cordsArr, id: cableId }]
                setCableForNewAddress(undefined)
                var name = await getAddressNameByLatLng(props.address);

                var newAddress = {
                    address: userAddressObj.address,
                    ampereAmount: userAddressObj.ampereAmount,
                    generatorID: userAddressObj.generatorID,
                    userAddressID: addressId,
                    cables: [cableId],
                    UsesForDate: [],
                    name: name
                }
                clearAll();
                props.updateNewAddress(true, newAddress);
            }
            else {
                //var ampereLeftToGenerator = await AmpereLeftToGenerator(cable.generatorId);
                //if (ampereLeftToGenerator >= amperInputValue && (parseFloat(parseFloat(amperInputValue) + parseFloat(addressAmpereAmount))) <= parseFloat(load) && amperInputValue > 0) {

                if ((parseFloat(parseFloat(amperInputValue) + parseFloat(addressAmpereAmount))) <= parseFloat(load) && amperInputValue > 0) {
                    {
                        addAmpereToUser(props.address.userAddressID, amperInputValue)
                        updateAmperAndCablesView(props.address.userAddressID, amperInputValue);
                    }
                }
            }
        }
    }

    async function shortRouteBetweenTwoPoints(amperToAdd) {
        var latLngAddress;
        if (!props.newAddress)
            latLngAddress = getLatLngFromString(address.address)
        else
            latLngAddress = props.address

        var polylinesArr = [];
        var tempPolylinesArr = [];
        await Promise.all(Cables.cables.map(async cable => {
            var isAddressCable = false;
            address.cables && address.cables.map(c => {
                if (c == toJS(cable).id)
                    isAddressCable = true;
            })
            var ampereLeftToGenerator = await AmpereLeftToGenerator(cable.generatorId);
             console.log(":",!isAddressCable && ampereLeftToGenerator >= amperToAdd && cable.generatorId == address.generatorID)
            if ( !isAddressCable && ampereLeftToGenerator >= amperToAdd && (cable.generatorId == address.generatorID || !cable.generatorID)) {
                var pointsInCable = allPointInCable(toJS(cable.coordinates));
                pointsInCable.map((point) => {
                    var length = (window.google.maps.geometry.spherical.computeDistanceBetween(point, latLngAddress)).toFixed(2);
                    var loadByTypeAndThickness = calcLoadByTypeAndThickness(selectedCableType, selectedCableThickness);
                    var load = loadToPointInCable2(length, loadByTypeAndThickness);
                    if (load >= amperToAdd)
                        tempPolylinesArr.push(
                            {
                                path: [new window.google.maps.LatLng(latLngAddress.lat, latLngAddress.lng), toJS(point)],
                                routeLength: length,
                                load: load,
                                generatorId: cable.generatorId,
                                thickness: selectedCableThickness,
                                type: selectedCableType
                            })
                })
                tempPolylinesArr.map(pol => {
                    var contains = polylinesArr.find(p => (window.google.maps.geometry.spherical.computeDistanceBetween(p.path[1], pol.path[1])).toFixed(2) == 0);
                    if (!contains && pol.routeLength > 0)
                        polylinesArr.push(pol);
                })
            }
        }))
        polylinesArr.sort((a, b) => (parseFloat(a.routeLength) > parseFloat(b.routeLength)) ? 1 : ((parseFloat(b.routeLength) > parseFloat(a.routeLength)) ? -1 : 0))
        setPolylinesArr(polylinesArr.slice(0, 6));
        setOpenDialog(true);
    }

    const handleTypesSelect = (selectedType) => {

        if (selectedType == 1) {
            setThicknessArr(thickness1)
            setSelectedCableThickness(thickness1[0])
        }
        else {
            setThicknessArr(thickness2)
            setSelectedCableThickness(thickness2[0])
        }
    }

    const handleSucceededClose = () => setOpenSucceededPopup(false);

    const handleSucceededOpen = () => setOpenSucceededPopup(true);

    const setSelectedCable = (cable, cordsArr, address) => {
        setCableForNewAddress({ cable: cable, cordsArr: cordsArr, address: address })
    }

    const allPointInCable = (coordinates) => {
        var points = coordinates.map(point => new window.google.maps.LatLng(point.lat, point.lng));
        return getAllPointsForCable(points);
    }

    const clearAll = () => {
        setAmperInputValue(0);
        setShow(false);
        setSelectedCableType(1);
        setThicknessArr(thickness1);
        setSelectedCableThickness(10);
    }

    //#region התחלת חיפוש כל נקודות על כבל
    const getAllPointsForCable = (points) => {

        var nextMarkerAt = 0;     // Counter for the marker checkpoints.
        var nextPoint = null;     // The point where to place the next marker.

        var pointsArr = [];
        while (true) {
            var routePoints = points;
            nextPoint = moveAlongPath(routePoints, nextMarkerAt);

            if (nextPoint) {
                //Adding marker from localhost
                pointsArr.push(nextPoint);
                // Add +1000 meters for the next checkpoint.
                nextMarkerAt += 100;

            }
            else {
                // moveAlongPath returned null, so there are no more check points.
                break;
            }
        }
        return pointsArr;
    }

    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }

    Number.prototype.toDeg = function () {
        return this * 180 / Math.PI;
    }

    function moveAlongPath(point, distance, index) {
        index = index || 0;  // Set index to 0 by default.

        var routePoints = [];

        for (var i = 0; i < point.length; i++) {
            routePoints.push(point[i]);
        }

        if (index < routePoints.length) {
            // There is still at least one point further from this point.

            // Construct a GPolyline to use the getLength() method.
            // console.log("ind", routePoints[index],"     :", routePoints[index + 1] )
            var polyline = new window.google.maps.Polyline({
                path: [routePoints[index], routePoints[index + 1]],
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            });

            // Get the distance from this point to the next point in the polyline.
            var distanceToNextPoint = polyline.Distance();

            if (distance <= distanceToNextPoint) {
                // distanceToNextPoint is within this point and the next.
                // Return the destination point with moveTowards().
                return moveTowards(routePoints, distance, index);
            }
            else {
                // The destination is further from the next point. Subtract
                // distanceToNextPoint from distance and continue recursively.
                return moveAlongPath(routePoints,
                    distance - distanceToNextPoint,
                    index + 1);
            }
        }
        else {
            // There are no further points. The distance exceeds the length
            // of the full path. Return null.
            return null;
        }
    }

    function moveTowards(point, distance, index) {

        var lat1 = point[index].lat().toRad();
        var lon1 = point[index].lng().toRad();
        var lat2 = point[index + 1].lat().toRad();
        var lon2 = point[index + 1].lng().toRad();
        var dLon = (point[index + 1].lng() - point[index].lng()).toRad();

        // Find the bearing from this point to the next.
        var brng = Math.atan2(Math.sin(dLon) * Math.cos(lat2),
            Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) *
            Math.cos(dLon));

        var angDist = distance / 6371000;  // Earth's radius.

        // Calculate the destination point, given the source and bearing.
        lat2 = Math.asin(Math.sin(lat1) * Math.cos(angDist) +
            Math.cos(lat1) * Math.sin(angDist) *
            Math.cos(brng));

        lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(angDist) *
            Math.cos(lat1),
            Math.cos(angDist) - Math.sin(lat1) *
            Math.sin(lat2));

        if (isNaN(lat2) || isNaN(lon2)) return null;



        return new window.google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
    }

    window.google.maps.Polyline.prototype.Distance = function () {
        var dist = 0;
        for (var i = 1; i < this.getPath().getLength(); i++) {
            dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
        }
        return dist;
    }

    window.google.maps.LatLng.prototype.distanceFrom = function (newLatLng) {
        //var R = 6371; // km (change this constant to get miles)
        var R = 6378100; // meters
        var lat1 = this.lat();
        var lon1 = this.lng();
        var lat2 = newLatLng.lat();
        var lon2 = newLatLng.lng();
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    //#endregion סוף חיפוש כל הנקודות על כבל

    return (
        <>
            <Line height="100%">
                <Grid>
                    <Button onClick={clearAll} style={{ width: 40 }}><ReplyIcon /></Button>
                    <p>כמות אמפר:</p>
                    <input value={amperInputValue} onChange={(event) => setAmperInputValue(event.target.value)} disabled={show} />
                    {openDialog && <AddCableMap updateAmperView={updateAmperAndCablesView} newAddress={props.newAddress} address={props.address} setSelectedCable={setSelectedCable} polylinesArr={polylinesArr} setOpen={setOpenDialog} amperAmount={amperInputValue} />}
                    {show && <p>אין מספיק אמפר בכבל להוספת כבל בחר סוג כבל ורוחב כבל</p>}
                    {(show || props.newAddress) && <SimpleSelect v={selectedCableType} setV={setSelectedCableType} arr={types} handleSelect={handleTypesSelect} />}
                    {(show || props.newAddress) && <SimpleSelect v={selectedCableThickness} setV={setSelectedCableThickness} arr={thicknessArr} />}
                    <Dialog
                        open={openSucceededPopup}
                        onClose={handleSucceededClose}>
                        <p>the action succeeded, the amper added</p>
                    </Dialog>
                    <button onClick={handleUpdateClick}>עדכן</button>
                </Grid>
            </Line>
        </>
    )
}