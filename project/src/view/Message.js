import Trix from "trix";
import React, { useEffect, useState } from "react";
import { ReactTrixRTEInput } from "react-trix-rte";
import Paper from "@mui/material/Paper";
import './Navigation.css'
import { getUsersByManagerId } from '../connect to server/Connect';
import User from '../Mobx/User';
import { toJS } from 'mobx';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

export default function Message(props) {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);
    const [text, setText] = useState();
    const [isPublicMessage, setIsPublicMessage] = useState(false)

    useEffect(async () => {
        var _users = await getUsersByManagerId(toJS(User.currentUser).id);
        setUsers(_users)
    }, [])


    function handleChange(event, newtext) {
        setText(newtext); // OR custom on change listener.
    }
    function handleChecked(event) {
        if (event.target.checked) {
            setIsPublicMessage(true)
        }
        else {
            setIsPublicMessage(false)
        }
    }
    function sendEmail(){
        
    }

    return (
        <>
            <p>שלח הודעה ל</p>
            {!isPublicMessage && <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={user}
                    onChange={(e) => { setUser(e.target.value) }}
                    label="user"
                >
                    <MenuItem value="dassi"><em>dassi</em></MenuItem>
                    {
                        users && users.map(u =>
                            <MenuItem key={u.id} value={u}><em>{u.firstName + " " + u.lastName}</em></MenuItem>)
                    }
                </Select>
            </FormControl>}
            <Grid container justifyContent="start !important" style={{ marginRight: "20px" }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(e) => { handleChecked(e) }}
                            name="isPublicmessage"
                            color="default"
                        />
                    }
                    label="הודעה כללית"
                />
            </Grid>
            <Paper
                elevation={3}
                style={{
                    width: "40vw",
                    height: "80vh",
                    paddingRight: "4vw",
                    paddingTop: "2vh",
                }}
            >
                <ReactTrixRTEInput
                    defaulttext={text}
                    onChange={handleChange}
                    autofocus="true"
                    className="editor"
                />
                <button onClick={()=>{sendEmail()}}>שלח</button>
            </Paper>
        </>
    )
}