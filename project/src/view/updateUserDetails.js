
import React,{useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {updateUser} from '../connect to server/Connect'
import Select from '@mui/material/Select';
import UserDetails from './userDetails'
import Line from '../UIKit/Line'
import { useLocation } from "react-router-dom";

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
      .min(1,"")
      .required("first name is requeird"),
    lastName: yup
      .string("")
      .min(1,"")
      .required("last name is requeird"),
  });


const WithMaterialUI = (props) => {
  const classes = useStyles();


  useEffect(
    ()=>{
    console.log(props.user,"user")
    }
    ,[])

  

  const location = useLocation();
  const [userDetails, setUserDetailst] = useState(location.state.user);

  useEffect(()=>{
    console.log("nn",location.state)
   setUserDetailst(location.state.user)
  },[])

  const formik = useFormik({
    initialValues: {
      firstName:userDetails.FirstName,
      lastName:userDetails.LastName,
      Email: userDetails.Email,
      password: userDetails.Password,
      phone: userDetails.Phone,
      ampere: userDetails.AmpereAmount,
      address: userDetails.Address,
      status: userDetails.Status
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("update");
      updateUser(values)
    }
  });
  
  return (
    <Line>
      <form className={classes.form} onSubmit={formik.handleSubmit} style={{width:"500px"}}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="firstName"
          name="firstName"
          label="First name"
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
          id="address"
          name="address"
          label="Address"
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
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
          id="ampere"
          name="ampere"
          label="ampre"
          type="number"
          value={formik.values.ampere}
          onChange={formik.handleChange}
          error={formik.touched.ampere && Boolean(formik.errors.ampere)}
          helperText={formik.touched.ampere && formik.errors.ampere}
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
      <UserDetails></UserDetails>
    </Line>
    );
};

export default WithMaterialUI;