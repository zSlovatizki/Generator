
import Map from '../mapTwo'
import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import Line from '../UIKit/Line'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { getAddressNameByLatLng } from '../services/Functions'
import { AddCable, addCableToAddress, addAmpereToUser } from '../connect to server/Connect'
import Cables from '../Mobx/Cables';
import { toJS } from 'mobx';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useTheme, makeStyles } from "@material-ui/core/styles";

export default function AddCableMap(props) {

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [names, setNames] = React.useState([]);
    const [openSuccessMessage, setOpenSuccessMessage] = useState(false)

    const useStyles = makeStyles((theme) => ({
        dialog: {
            "& + .pac-container": {
                zIndex: theme.zIndex.modal + 1
            }
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        updateAdressess();
    }, [])

    async function updateAdressess() {
        var tempArr = []
        await Promise.all(props.polylinesArr.map(async (item) => {
            await getAddressNameByLatLng({ lat: item.path[1].lat(), lng: item.path[1].lng() }).then(p => tempArr.push({ name: p, item: item }))
        }));

        //tempArr.sort((a, b) => (parseFloat(a.item.routeLength) > parseFloat(b.item.routeLength)) ? 1 : ((parseFloat(b.item.routeLength) > parseFloat(a.item.routeLength)) ? -1 : 0))

        setNames(tempArr);
    }

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
        props.setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        setOpen(true);
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const [cable, setCable] = useState();
    const setSelectedCable = (cable) => {
        setCable(cable);
    }

    async function addCable() {
        if (!cable)
            return;
        var path = "";
        cable.path.map(point => path += point.lat() + "," + point.lng() + " ")
        //props.setSelectedCable(cable)
        var polArr = [];
        cable.path.map(p => polArr.push({ lat: p.lat(), lng: p.lng() }))
        var cableObj = ({
            thickness: cable.thickness,
            path: path,
            generatorId: cable.generatorId,
            type: cable.type
        })
        if (!props.newAddress) {
            setOpenSuccessMessage(true);
            addAmpereToUser(props.address.userAddressID, props.amperAmount)
            var cableId = await AddCable(cableObj).then(result => cableId = result.data);
            Cables.cables = [...toJS(Cables.cables), { ...cableObj, coordinates: polArr, id: cableId }]
            addCableToAddress(cableId, props.address.userAddressID)
            props.updateAmperView(props.address.userAddressID, props.amperAmount, cableId);
            console.log("true")
        }
        else {
            props.setSelectedCable(cableObj, polArr, props.address);
        }
        setOpen(false);
        props.setOpen(false);
    }

    return (
        <div style={{ width: "100%" }}>
            <Dialog
                className={classes.dialog}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth={"90%"}
                fullWidth={true}
                PaperProps={{ style: { zIndex: 1 } }}
                componentsProps={{ style: { zIndex: 1 } }}
                zIndex={1}>
                <Line margin={0} width={"100%"}>
                    <div style={{width:"200px"}}>
                        {<h3>נתוני כבל בחור:</h3>}
                        {<p>עומס: {cable ? cable.load : 0} אמפר</p>}
                        {<p>אורך כבל: {cable ? cable.routeLength : 0} מ</p>}
                    </div>
                    <div>
                    <Map width={"90%"} address={props.address} addresses={names.slice(1, 6)} amperToAdd={props.amperAmount} setSelectedCable={setSelectedCable} polylinesArr={props.polylinesArr.slice(1, 6)} openDrawer={true} />
                    </div>
                </Line>
                <DialogActions>
                    <Button onClick={handleClose}>בטל</Button>
                    <Button onClick={addCable}>הוסף כבל</Button>
                </DialogActions>
            </Dialog>

            <Snackbar variant="outlined" autoHideDuration={6000} open={openSuccessMessage} onClose={() => setOpenSuccessMessage(false)} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    הכבל נוסף בהצלחה!
                </Alert>
            </Snackbar>
        </div >
    );
}
