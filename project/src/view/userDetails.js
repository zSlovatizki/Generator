import { useHistory } from "react-router-dom";
import  { useState, useEffect } from 'react'
import Grid from '../UIKit/Grid'
import { useLocation } from "react-router-dom";
import { ListItemButton } from '@mui/material';
import { ListItemText } from '@mui/material';
import { getStorageItem } from "../services/Functions";

export default function UserDetails(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        var currentUser=JSON.parse(getStorageItem("currentUser"))
        setUser(currentUser);
    }, [])

    const history = useHistory();
    const location = useLocation();

    const usingClick = () => {
        var url = history.location.pathname;

        if (url.substring(url.lastIndexOf("/"), url.length) == '/userDetails')
            history.push({ pathname: `${history.location.pathname}/using`, search: `id=${user.ID}`, state: { user: user } })
        else
            history.push({ pathname: `${url.substring(0, url.lastIndexOf("/"))}/using`, search: `id=${user.ID}`, state: { user: user } })
    }

    async function detailsClick() {
        var url = history.location.pathname;
        if (url.substring(url.lastIndexOf("/"), url.length) == '/userDetails')
            history.push({ pathname: `${history.location.pathname}/updateDetails`, search: `id=${user.ID}`, state: { user: user } })
        else
            history.push({ pathname: `${url.substring(0, url.lastIndexOf("/"))}/updateDetails`, search: `id=${user.ID}`, state: { user: user } })
    }

    const addressesClick = () => {
        var url = history.location.pathname;

        if (url.substring(url.lastIndexOf("/"), url.length) == '/userDetails')
            history.push({ pathname: `${history.location.pathname}/addresses`, search: `id=${user.ID}`, state: { user: user } })
        else
            history.push({ pathname: `${url.substring(0, url.lastIndexOf("/"))}/addresses`, search: `id=${user.ID}`, state: { user: user } })
    }

    return (
        <>
            <Grid width="200px">
                <div style={{ backgroundColor: "#e7ebf0" }}>
                    <ListItemButton href="#simple-list" onClick={usingClick}>
                        <ListItemText primary="גרף צריכה" />
                    </ListItemButton>
                    <ListItemButton href="#simple-list" onClick={detailsClick}>
                        <ListItemText primary="פרטים" />
                    </ListItemButton>
                    <ListItemButton href="#simple-list" onClick={addressesClick}>
                        <ListItemText primary="כתובות" />
                    </ListItemButton>
                </div>
            </Grid>
        </>
    )
}
