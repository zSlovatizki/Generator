import { useHistory } from "react-router-dom";
import  { useState, useEffect } from 'react'
import Grid from '../UIKit/Grid'
import { useLocation } from "react-router-dom";
import { ListItemButton } from '@mui/material';
import { ListItemText } from '@mui/material';
import { getStorageItem } from "../services/Functions";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import GradingIcon from '@mui/icons-material/Grading';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

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
            <Grid width="150px" className="GridUserDetails">
                <div style={{ backgroundColor: "#e7ebf0", display:'flex', flexDirection:'column', zIndex:1000}}>
                    <ListItemButton href="#simple-list" onClick={usingClick} style={{color:'rgb(66, 64, 64)', fontSize:'20px', padding:'10px'}}>
                         <AutoGraphIcon/><ListItemText primary="גרף צריכה" />
                    </ListItemButton>
                    <ListItemButton href="#simple-list" onClick={detailsClick} style={{color:'#978e8e', padding:'10px'}}>
                         <GradingIcon/><ListItemText primary="פרטים" />
                    </ListItemButton>
                    <ListItemButton href="#simple-list" onClick={addressesClick} style={{color:'rgb(255,170,23)', padding:'10px'}}>
                         <AddLocationAltIcon/><ListItemText primary="כתובות" />
                    </ListItemButton>
                </div>
            </Grid>
        </>
    )
}
