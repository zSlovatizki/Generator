import { useHistory } from "react-router-dom";
import react, { useState } from 'react'
import Grid from '../UIKit/Grid'
import { useLocation } from "react-router-dom";

export default function UserDetails(props) {

    const history = useHistory();
    const location = useLocation();
    const usingClick = () => {
        var url = history.location.pathname;

        if (url.substring(url.lastIndexOf("/"), url.length) == '/userDetails')
            history.push({pathname:`${history.location.pathname}/using`,state:{user:location.state}})
        else
            history.push({pathname:`${url.substring(0, url.lastIndexOf("/"))}/using`,state:{user:location.state}})

    }

    const detailsClick = () => {
        var url = history.location.pathname;
        console.log("userd",location)
        if (url.substring(url.lastIndexOf("/"), url.length) == '/userDetails')
            history.push({pathname:`${history.location.pathname}/updateDetails`,state:{user:location.state}})
        else
            history.push({pathname:`${url.substring(0, url.lastIndexOf("/"))}/updateDetails`,state:{user:location.state}})
    }

    const updateAmountClick = () => {
        var url = history.location.pathname;

        if (url.substring(url.lastIndexOf("/"), url.length) == '/userDetails')
            history.push({pathname:`${history.location.pathname}/amuont`,state:{user:location.state}})
        else
            history.push({pathname:`${url.substring(0, url.lastIndexOf("/"))}/amuont`,state:{user:location.state}})
    }

    return (
        <>
            <Grid width="200px">
                <button onClick={usingClick} style={{ height: "50px" }}>using</button>
                <button onClick={detailsClick} style={{ height: "50px" }}>details</button>
                <button onClick={updateAmountClick} style={{ height: "50px" }}>update amount use</button>
            </Grid>
        </>
    )
}
