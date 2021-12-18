import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Button from '../UIKit/Button'
import Select from '../UIKit/Select'

export default function UpdateAmountForAdress(props) {
    const location = useLocation();
    const [userDetails, setUserDetailst] = useState(location.state.user);
    const [addresses, setAddresses] = useState([]);

    useEffect(async () => {
        await updateAddresses();
    }, [])

    async function updateAddresses() {
        const tempArr = [];
        await Promise.all(userDetails.Addresses.map(async (item) => {
            await gotAddressName(item.Address).then(p => tempArr.push(p))
        }));

        setAddresses(tempArr)
    }

    const getLatLngFromString = (latLngString) => {
        var latSrt = latLngString.substring(0, latLngString.indexOf(','));
        var lngStr = latLngString.substring(latLngString.indexOf(',') + 1, latLngString.length);

        return { lat: parseFloat(latSrt), lng: parseFloat(lngStr) }
    }

    async function gotAddressName(address) {
        var latLng = getLatLngFromString(address)
        var addressName = "";
        await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latLng.lat + ',' + latLng.lng + '&key=' + "AIzaSyBw1O0w3i7M3WhVhge2UldEhP62AEIJKqc")
            .then((response) => response.json())
            .then((responseJson) =>
                addressName =
                responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'locality', 'political').length > 0)[0].long_name
                +
                responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'route').length > 0)[0].short_name

            )
        return addressName.toString();
    }

    const f=()=>
    {

    }
    return (
        <>
            {
                <>
                <Button text="aa" onClick={f}/>
                <Select arr={addresses}/>
                </>
            }
        </>
    )
}