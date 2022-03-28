
import React, { useEffect, useState, useDebugValue } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { updateUserDetails } from '../connect to server/Connect'
import UserDetails from './UserDetails'
import Line from '../UIKit/Line'
import Box from '../UIKit/Box'
import { useLocation } from "react-router-dom";
import { FetchFullUserDetailsById } from '../connect to server/Connect'
import UserAddresses from './UserAddresses'
import { useParams } from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginRight:'auto !important',
     marginLeft:'auto !important',
     backgroundColor:'#ffffff87',
     padding:'15px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  line:{
    width:'80%'
  }
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

  const classes = useStyles();
  const location = useLocation();

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

  useEffect(async () => {
    if (userDetails == undefined) {
      var id = query.get('id');
      var user = await FetchFullUserDetailsById(id)
      setUserDetails(user);
    }
  }, [location])


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
    }
  });

  return (
    <>
    <UserDetails/>
      <Line className={classes.line}>
        {/* {userDetails.ID && <UserDetails userDetails={userDetails} />} */}
        {/* <UserDetails /> */}
        <form className={classes.form} onSubmit={formik.handleSubmit} style={{ width: "500px" }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            flexDirection="rtl"
            id="firstName"
            name="firstName"
            label="שם פרטי"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            name="lastName"
            label="Last name"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            name="phone"
            label="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.Phone && Boolean(formik.errors.Phone)}
            helperText={formik.touched.Phone && formik.errors.Phone}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="Email"
            name="Email"
            label="Email"
            type="email"
            value={formik.values.Email}
            onChange={formik.handleChange}
            error={formik.touched.Email && Boolean(formik.errors.Email)}
            helperText={formik.touched.Email && formik.errors.Email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="status"
            name="status"
            label="status"
            type="bol"
            value={formik.values.status}
            onChange={formik.handleChange}
          //error={formik.touched.password && Boolean(formik.errors.password)}
          //helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            update
        </Button>
        </form>
      </Line>
      <Box>
        {/* //{userDetails.ID && <UserAddresses userDetails={userDetails}/>} */}
      </Box>
    </>
  );
};

export default WithMaterialUI;