import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
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
import emailjs from 'emailjs-com';
import { Editor } from 'primereact/editor';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Message(props) {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);
    const [text, setText] = useState("");
    const [isPublicMessage, setIsPublicMessage] = useState(false);
    const [success, setSuccess] = useState(null);

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
    function sendEmail() {
        const email = {
            user_name: 'hadasa',
            user_email: 'dassid1441@gmail.com',
            message: text
        }
        emailjs.send('service_9ld1zyn', 'template_jmc6w9j', email, 'user_s1s1t72g3Z2bzGLalf5Xf')
            .then(succ => {
                console.log("sucss");
                setSuccess(true);
                setText("");
                setUser(null);
                setIsPublicMessage(false);
                setTimeout(() => {
                    setSuccess(null);
                }, 6000)
            }, err => {
                console.log("error");
                setSuccess(false);
                setTimeout(() => {
                    setSuccess(null);
                }, 6000)
            })
    }

    return (
        <div style={{
            marginTop: '15vh', backgroundColor: '#ffffff', width: '70%', marginLeft: 'auto',
            marginRight: 'auto', alignItems: 'center', padding: '10px'
        }}>
            {
                success === true ? (
                    <Alert severity="success" style={{ width: "350px", position: "fixed", top: "10vh", left: 5, zIndex: 2000 }}>
                        <AlertTitle>בוצע בהצלחה</AlertTitle>
                        <strong> ההודעה נשלחה.</strong>
                    </Alert>
                ) : success === false ?
                    (
                        <Alert severity="error" style={{ width: "350px", position: "fixed", top: "10vh", left: 5, zIndex: 2000 }}>
                            <AlertTitle>שגיאה</AlertTitle>
                            <strong>אירעה שגיאה נסה שוב!</strong>
                        </Alert>
                    ) : null
            }
            <div style={{ display: 'flex' }}>
                <p style={{ marginTop: '15px', marginRight: '10%' }}>שלח הודעה ל</p>
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
                </FormControl>}</div>
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={(e) => { handleChecked(e) }}
                        name="isPublicmessage"
                        color="default"
                    />
                }
                label="הודעה כללית"
                style={{ paddingRight: '10% ' }}
            />

            <div className="card" style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Editor style={{ height: '250px' }} value={text} onTextChange={handleChange} />
            </div>
            <Button style={{ backgroundColor: 'rgb(255,170,23)', color: 'white', marginRight: '80%' }} onClick={() => { sendEmail() }}>שלח<SendIcon /></Button>
        </div>
    )
}
