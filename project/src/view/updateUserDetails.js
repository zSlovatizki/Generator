
import React, { useEffect, useState, useDebugValue } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from "@mui/material/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { updateUserDetails } from '../connect to server/Connect'
import UserDetails from './UserDetails'
import Line from '../UIKit/Line'
import Box from '../UIKit/Box'
import { useLocation } from "react-router-dom";
import { FetchFullUserDetailsById } from '../connect to server/Connect'
import UserAddresses from './UserAddresses'
import { useParams } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//     marginRight: 'auto !important',
//     marginLeft: 'auto !important',
//     backgroundColor: '#ffffff87',
//     padding: '15px'
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   line: {
//     width: '80%'
//   }
// }));
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
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-around",
    // width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
    backgroundColor: '#ffffff87',
    padding: '15px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 2),
    backgroundColor: 'rgb(255,170,23) !important',
    color: 'white',
    // "&:hover": {
    //     backgroundColor: 'rgb(52,51,51) !important',
    // },
    borderColor: 'rgb(255,170,23) !important'
  },
  button: {
    margin: theme.spacing(3, 0, 2, 2),
    backgroundColor: 'rgb(52,51,51) !important',
    color: 'white',
  },
  link: {
    color: 'rgb(52,51,51)',
    "&:hover": {
      color: '#df9a1a'
    }
  },
  textField: {
    direction: 'rtl',
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

const validationSchema =
  yup.object().shape({
    Email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    Phone: yup
      .string('Entter your phone')
      .min(10, 'Incorrect cell phone number'),
    firstName: yup
      .string("")
      .min(1, "")
      .required("first name is requeird"),
    lastName: yup
      .string("")
      .min(1, "")
      .required("last name is requeird"),
  });

const WithMaterialUI = (props) => {
  const theme = createTheme({
    direction: "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const classes = useStyles();
  const location = useLocation();
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const [userDetails, setUserDetails] = useState(() => {
    if (location.state.user) {
      // console.log("location", location.state.user)
      return location.state.user;
    }
    else {
      // console.log("location", location.state)
      return location.state;
    }
  });

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

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

  useEffect(async () => {
    if (userDetails == undefined) {
      var id = query.get('id');
      var user = await FetchFullUserDetailsById(id)
      setUserDetails(user);
    }
  }, [location])

  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
};

const handleClickShowVerifyPassword = (event) => {
    setShowVerifyPassword(!showVerifyPassword);
};


  const formik = useFormik({
    initialValues: {
      firstName: userDetails.FirstName,
      lastName: userDetails.LastName,
      Email: userDetails.Email,
      password: userDetails.Password,
      phone: userDetails.Phone,
      status: userDetails.Status
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateUserDetails({ ...values, ID: userDetails.ID })
      //הצגת הודעת הצלחה
      setSuccess(true);
      setTimeout(()=>{
          setSuccess(false);
      },6000)
    }
  });

  return (
    <>
      {
        success === true ? (
          <Alert severity="success" style={{width:"350px", position:"fixed",top:"15vh", left:5, zIndex:2000}}>
            <AlertTitle>בוצע בהצלחה</AlertTitle>
            <strong> הפרטים עודכנו בהצלחה!</strong>
          </Alert>
        ) : null
      }
      <div>
      <UserDetails />
      <Line className={classes.line}>
        {/* {userDetails.ID && <UserDetails userDetails={userDetails} />} */}
        {/* <UserDetails /> */}
        <form className={classes.form} onSubmit={formik.handleSubmit} style={{ width: "500px" }}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    flexDirection="rtl"
                    id="firstName"
                    name="firstName"
                    label="שם פרטי"
                    type="text"
                    className={classes.textField}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="שם משפחה"
                    type="text"
                    className={classes.textField}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="phone"
                    name="phone"
                    label="טלפון"
                    type="tel"
                    className={classes.textField}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.Phone && Boolean(formik.errors.Phone)}
                    helperText={formik.touched.Phone && formik.errors.Phone}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    name="password"
                    label="סיסמה"
                    type={showPassword ? "text" : "password"}
                    className={classes.textField}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: iconPassword,
                    }}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="Email"
                    name="Email"
                    label="מייל"
                    type="email"
                    className={classes.textField}
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    error={formik.touched.Email && Boolean(formik.errors.Email)}
                    helperText={formik.touched.Email && formik.errors.Email}
                  />
                </Grid>
              </Grid>
              {/* <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="status"
                name="status"
                label="status"
                type="bol"
                className={classes.textField}
                value={formik.values.status}
                onChange={formik.handleChange}
              //error={formik.touched.password && Boolean(formik.errors.password)}
              //helperText={formik.touched.password && formik.errors.password}
              /> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                עדכון
              </Button>
            </ThemeProvider>
          </CacheProvider>
        </form>

      </Line>
      <Box>
        {/* //{userDetails.ID && <UserAddresses userDetails={userDetails}/>} */}
      </Box>
      </div>
    </>
  );
};

export default WithMaterialUI;