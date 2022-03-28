import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import './TableUsersNew.css';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog as DialogPrime } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { toJS } from 'mobx';
import User from '../Mobx/User'
import { getUsersByManagerId, deleteUser } from '../connect to server/Connect'
import { AddNewUser, GetAllManagers } from "../connect to server/Connect";
import { Toast } from 'primereact/toast';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { setStorageItem } from '../services/Functions';
import { useHistory } from 'react-router';
import UpdateUserDetails from './UpdateUserDetails'
import { FetchFullUserDetailsById } from '../connect to server/Connect'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles((theme) => ({
    mainBox: {
        // position: "relative",
        borderBottomRightRadius: "4px",
        borderBottomLeftRadius: "4px",
        // background: theme.palette.background.default,
    },
    paper: {
        marginTop: theme.spacing(4),
        backgroundColor: '#ffffff87',
        // padding: '30px 20px 25px 20px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiGrid-container": {
            justifyContent: 'end'
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#df9a1a !important',
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "rgb(88,88,90) !important",
        color: 'white',
        "&:hover": {
            backgroundColor: 'rgb(52,51,51) !important',
        },
    },
    link: {
        color: 'rgb(52,51,51)',
        "&:hover": {
            color: '#df9a1a'
        }
    },
    textField: {
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "0",
        "& label.Mui-focused": {
            color: "rgb(255,170,23)",
            // marginRight: '25px'
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "rgb(255,170,23)",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "grey",
            },
            "&:hover fieldset": {
                borderColor: "grey",
            },
            "&.Mui-focused fieldset": {
                borderColor: "rgb(255,170,23)",
            },
            "&.muirtl-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
                cursor: 'pointer'
            }
        },
    },
}));

export default function TableUsersNew() {
    let emptyUser = {
        Id: null,
        FirstName: '',
        LastName: '',
        Phone: '',
        Email: ''
    }
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(emptyUser);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const dt = useRef(null);
    const toast = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedUser, setselectedUser] = useState(false);
    const history = useHistory();
    const classes = useStyles();
    const [selectedManager, setSelectedManager] = useState([]);
    const [title, setTitle] = useState();
    const [isButton, setIsButton] = useState(false);
    const [buttonText, setButtonText] = useState();
    const [path, setPath] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);


    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = yup.object().shape({
        email: yup.string("הכנס מייל").email(" מייל לא חוקי").required("מייל חובה"),
        password: yup
            .string("הכנס סיסמא")
            .required("סיסמא חובה")
            .matches(
                /^(?=.*\d).{8,}$/,
                "סיסמא חייבת להיות באורך 8 תוים ולהכיל סיפרה אחת לפחות"
            ),
        phone: yup
            .string("הכנס מספר פלאפון")
            .min(10, "מספר פלאפון חייב להיות באורך 10 ספרות")
            .max(10, "מספר פלאפון חייב להיות באורך 10 ספרות")
            .matches(phoneRegExp, "מספר פלאפון שגוי"),
        firstName: yup.string("").min(1, "").required("שם פרטי חובה"),
        lastName: yup.string("").min(1, "").required("שם משפחה חובה"),
        verifyPassword: yup
            .string("")
            .oneOf([yup.ref("password"), null], "סיסמא לא תואמת"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            verifyPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            var user = {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                Email: values.email,
                password: values.password,
                status: 1,
                modify: selectedManager ? 1 : 0,
            };
            AddNewUser(user).then(
                (succ) => {

                    if (succ.data != -1) {
                        debugger
                        setStorageItem("currentUser", JSON.stringify(user));
                        // setTitle("נרשמת בהצלחה !");
                        toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המוצר נמחק', life: 3000 });
                        setIsButton(false);
                        setOpen(true);
                        history.push("/users");
                    }
                    else {
                        setTitle("משתמש קיים במערכת !");
                        setIsButton(true);
                        setButtonText("לכניסה");
                        setPath("sign_in");
                        setOpen(true);
                    }
                },
                (error) => console.log("error on create new user", error)
            );
        },
    });

    let iconPassword = null;
    if (showPassword) {
        iconPassword = (
            <VisibilityOff onClick={(evant) => handleClickShowPassword(evant)} />
        );
    } else {
        iconPassword = (
            <Visibility onClick={(evant) => handleClickShowPassword(evant)} />
        );
    }

    let iconVerifyPassword = null;
    if (showVerifyPassword) {
        iconVerifyPassword = (
            <VisibilityOff
                onClick={(evant) => handleClickShowVerifyPassword(evant)}
            />
        );
    } else {
        iconVerifyPassword = (
            <Visibility onClick={(evant) => handleClickShowVerifyPassword(evant)} />
        );
    }


    useEffect(
        async () => {
            var getUsers = await getUsersByManagerId(toJS(User.currentUser).id);
            setUsers(getUsers);
        }, [])
    const handleClickShowPassword = (event) => {
        setShowPassword(!showPassword);
    };

    const handleClickShowVerifyPassword = (event) => {
        setShowVerifyPassword(!showVerifyPassword);
    };

    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };
    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    }
    const saveProduct = () => {
        setSubmitted(true);
    }
    //edit user
    const editProduct = async (user) => {
        var getuser = await FetchFullUserDetailsById(user.id)
        setStorageItem("currentUser", JSON.stringify(getuser));
        setselectedUser(user);
        history.push({ pathname: `/userDetails/updateDetails`, search: `id=${user.id}`, state: user });
        setOpen(true);
        setUser({ ...user });
    }

    //אישור מחיקת משתמש
    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const deleteUser = () => {
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

    const userDialogFooter = (
        <div style={{ textAlign: 'left' }}>
            <Button label="ביטול" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="שמור" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </div>
    );
    const deleteUserDialogFooter = (
        <div style={{ textAlign: 'left' }}>
            <Button label="לא" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="כן" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </div>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="p-edit">
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteUser(rowData)} />
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <>
                <h5 className="p-mx-0 p-my-1">פרטי משתמשים</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="חיפוש..." />
                </span>
            </>
            <div>
                <Button label="משתמש חדש" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={handleClickOpen} />
            </div>
        </div>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
                <DataTable ref={dt} value={users} emptyMessage={<div>לא נמצאו משתמשים הכנס משתמש...🤓</div>}
                    dataKey="id" paginator rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="מציג {last} - {first} מתוך {totalRecords} משתמשים"
                    globalFilter={globalFilter} responsiveLayout="scroll" header={header}>
                    <Column field="id" header="מזהה" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="firstName" header="שם פרטי" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="lastName" header="שם משפחה" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="phone" header="טלפון" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="Email" header="מייל" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
            <Dialog open={open} onClose={handleClose} style={{direction:'rtl', marginLeft:'auto', marginRight:'auto', width:'520px'}}>
                <DialogTitle>משתמש חדש</DialogTitle>
                <DialogContent>
                        <Grid container spacing={2} style={{marginTop:'10px'}}>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    className={classes.textField}
                                    autoFocus
                                    id="firstName"
                                    name="firstName"
                                    label="שם פרטי"
                                    type="text"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.firstName &&
                                        Boolean(formik.errors.firstName)
                                    }
                                    helperText={
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    className={classes.textField}
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="שם משפחה"
                                    type="text"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.lastName && Boolean(formik.errors.lastName)
                                    }
                                    helperText={
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    className={classes.textField}
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    label="פלאפון"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    className={classes.textField}
                                    fullWidth
                                    id="Email"
                                    name="email"
                                    label="מייל"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.textField}
                                    password={true}
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="סיסמא"
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: iconPassword,
                                    }}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={
                                        formik.touched.password && formik.errors.password
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.textField}
                                    fullWidth
                                    id="verifyPassword"
                                    name="verifyPassword"
                                    label="אישור סיסמא"
                                    type={showVerifyPassword ? "text" : "password"}
                                    value={formik.values.verifyPassword}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        endAdornment: iconVerifyPassword,
                                    }}
                                    error={
                                        formik.touched.verifyPassword &&
                                        Boolean(formik.errors.verifyPassword)
                                    }
                                    helperText={
                                        formik.touched.verifyPassword &&
                                        formik.errors.verifyPassword
                                    }
                                />
                            </Grid>
                        </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ביטול</Button>
                    <Button 
                     type="submit">שמור</Button>
                </DialogActions>
            </Dialog>
            {/* <DialogPrime visible={userDialog} style={{ width: '450px' }} header="פרטי משתמש" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
            </DialogPrime> */}

            {/* <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {user && <span>האם אתה בטוח שברצונך למחוק את המוצר  <b>{`${user.firstName} ${user.lastName}`}</b>?</span>}
                </div>
            </Dialog> */}
        </div>
    );
}