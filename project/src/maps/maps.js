import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { useEffect, useState } from 'react';

const style = {
    width: '100%',
    height: '90%'
}

const MapContainer = (props) => {
    const { stores, id } = props


    const [current, setcurrent] = useState({})

    useEffect(() => {
        setcurrent(stores.filter((f) => f.id === id)[0])
    }, [stores, id])


    return (
        <>
           <Map google={props.google} zoom={14}
                style={style}
                center={{
                    lat: '5.5678',
                    lng: '34.567'
                }}
            >
                {
                    current? <Marker
                    title={current?.storeName}
                    name={'Current location'}
                    position={{ lat: current?.latitude, lng: current?.lonitude}}
                >
                </Marker>:
                    stores?.map((item, i) => {
                        return (
                            <Marker
                                title={item.storeName + item.latitude + item.lonitude}
                                key={i}
                                name={'Current location'}
                                position={{ lat: item.latitude, lng: item.lonitude }}
                            >
                            </Marker>)
                    })
                }
            </Map>
        </>
    );
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw')
})(MapContainer)

