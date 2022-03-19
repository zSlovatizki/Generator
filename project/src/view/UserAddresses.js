import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@material-ui/core';
import ExpandMore from "@material-ui/icons/ExpandMore";
import { getLatLngFromString, getAddressNameByLatLng } from '../services/Functions'
import UpdateAmountForAdress from './UpdateAmperForUserAdress'
import PlacesAutoComplete from '../UIKit/placesAutoComplete'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { FetchFullUserDetailsById, DeleteAddressToUser, CanAddUsesForDate, AddUserUsesForDate } from '../connect to server/Connect'
import UserDetails from './UserDetails'
import Box2 from '../UIKit/Box'
import { toJS } from 'mobx';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@material-ui/lab/TabPanel';
import Box from '@mui/material/Box';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';

export default function UserAddresses(props) {

    const location = useLocation();
    const [awaitNames, setAwait] = useState(false)
    const [addressesNames, setaddressesNames] = useState();
    const [tabsValues, setTabsValues] = React.useState([]);
    const [await2, setawait2] = useState(false);
    const [usingInputValue, setUsingInputValue] = useState();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    var inReneder = true;

    const [newAddress, setNewAddress] = useState({});

    const [userDetails, setUserDetails] = useState(
        // () => {
        // if (location.state.user)
        //     return location.state.user;
        // else 
        //     return location.state;
        // }
    );

    useEffect(() => {
        if (userDetails == undefined) {
            const id = query.get('id');
            FetchFullUserDetailsById(id).then(d => {
                setUserDetails(d);
            });
        }
    }, [])

    //    useEffect(()=>{
    //     if (addressesNames && addressesNames.length > 0) {
    //     setAwait(true)
    //     }
    //    },[addressesNames])

    useEffect(async () => {
        var names = [];
        if (userDetails != null && userDetails.Addresses != null) {
            await Promise.all(userDetails.Addresses.map(async (item, i) => {
                await getAddressNameByLatLng(getLatLngFromString(item.address)).then(p => names.push({ name: p, ...item, i: i }))
            }))
            names.sort((a, b) => a.i > b.i ? 1 : b.i > a.i ? -1 : 0)

            setaddressesNames(names);
            setAwait(true);

            //עדכון של כולם בכתובת חדשה
            var tempTabs = [];
            var tempUsing = [];
            userDetails.Addresses.map(add => {
                var canAddUsesForDate = CanAddUsesForDate(add.userAddressID);
                tempTabs.push({ value: '1', canAdd: canAddUsesForDate });
                tempUsing.push(0);
            })

            setTabsValues(tempTabs);
            setUsingInputValue(tempUsing);
            setawait2(true);
            inReneder = false;
        }
       
    }, [userDetails])

    useEffect(() => {
        try {
            if (tabsValues.length) {
                tabsValues.map(t =>
                    t.canAdd.then(d => t.canAdd = d)
                )
            }
        }
        catch (e) { }
    }, [tabsValues])

    const handlNewAddressSelect = (address) => {
        console.log("select2")
        if (address == null)
            setNewAddress(null)
        else
            setNewAddress({ lat: address.geometry.location.lat(), lng: address.geometry.location.lng() })
    }

    const updateAmperView = (addressId, ampere) => {
        var temp = [];
        userDetails.Addresses.map(add => {
            if (add.userAddressID == addressId) {
                temp.push({ ...add, ampereAmount: parseInt(add.ampereAmount) + parseInt(ampere) });
            }
            else
                temp.push(add)
        })
        setUserDetails({ ...userDetails, Addresses: temp })
    }

    const updateNewAddress = (flag, newAddress) => {
    
        if (flag) {
            setTabsValues([...tabsValues, { value: '1', canAdd: false }])
            getAddressNameByLatLng(getLatLngFromString(newAddress.address)).then(name => {
                setaddressesNames([...addressesNames, { name: name, ...newAddress }])
                setUserDetails({ ...userDetails, Addresses: [...userDetails.Addresses, newAddress] });
            })
        }
    }

    const deleteAddress = (id) => {
        DeleteAddressToUser(id);
        var addresses = [];
        var tabValues = [];

        console.log("add", userDetails.Addresses);
        userDetails.Addresses.map((address, i) =>{
            if (address.userAddressID != id)
            {
                addresses.push(address);
                tabValues.push(tabsValues[i]);
            }
        })
        setTabsValues(tabsValues);
        setUserDetails({...userDetails, Addresses:addresses});
    }

    const handleChange = (newValue, index) => {
        var temp = [];
        tabsValues.map((tabValue, i) => {
            if (i == index) {
                temp.push({ value: newValue, canAdd: tabValue.canAdd });
            }
            else
                temp.push(tabValue);
        })
        setTabsValues(temp);
    };

    const updateUsingToAddress = (value, addressIndex) => {
        var tempUsing = [...usingInputValue];
        tempUsing[addressIndex] = value;
        setUsingInputValue(tempUsing);
    }

    const addUserUsesForDate = (userAddressID, addressIndex) => {
        var temp = [];
        tabsValues.map((tabValue, i) => {
            if (i == addressIndex)
                temp.push({ value: '1', canAdd: false });
            else
                temp.push(tabValue);
        })
        setTabsValues(temp);
        AddUserUsesForDate(userAddressID, usingInputValue[addressIndex])
    }

    return (
        <>
            {userDetails && <UserDetails userDetails={userDetails} />}
            <Box2>
                {awaitNames && userDetails.Addresses.map((address, i) =>
                    <Accordion
                     style={{ width: 400 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}
                        >
                            <p>{addressesNames[i].name} אמפר: {address.ampereAmount}</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <Button onClick={() => deleteAddress(address.userAddressID)}><DeleteIcon style={{color:'#58585A'}}/></Button>
                                {await2 && <TabContext value={tabsValues[i].value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList TabIndicatorProps={{
                                            style: {
                                                backgroundColor: "#FAA51A"
                                            },
                                        }} onChange={(e, v) => handleChange(v, i)} aria-label="lab API tabs example">
                                            <Tab label="הוספת אמפר לכתובת" value="1" />
                                            <Tab label="הוספת שימושיות לחודש" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <UpdateAmountForAdress updateAmperView={updateAmperView} updateNewAddress={updateNewAddress} address={address} newAddress={false} />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        {tabsValues[i].canAdd && <div key={address.userAddressID + i}>
                                            <p>הוספת שימושיות לחודש </p>
                                            <p>כמות אמפר:</p>
                                            <input type="number" defaultValue="0" value={usingInputValue[i]} onChange={(e) => updateUsingToAddress(e.target.value, i)} />
                                            <button onClick={() => { addUserUsesForDate(address.userAddressID, i) }}>עדכן</button>
                                        </div>}
                                        {!tabsValues[i].canAdd && <p key={tabsValues[i].canAdd}>כבר עודכנה צריכה לחודש זה</p>}
                                    </TabPanel>
                                </TabContext>}
                            </div>

                        </AccordionDetails>
                    </Accordion>)
                }
                {awaitNames && <Accordion toggleAcordion={false} style={{ width: 400 }}>
                    <AccordionSummary expandIcon={<AddIcon />}>
                        <p>הוסף כתובת חדשה</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ height: 400 }, { display: "block" }}>
                        <PlacesAutoComplete onSelectionChanged={handlNewAddressSelect} />
                        {newAddress && <UpdateAmountForAdress updateNewAddress={updateNewAddress} address={newAddress} newAddress={true} />}
                    </AccordionDetails>
                </Accordion>}
            </Box2>
        </>
    )
}