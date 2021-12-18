
// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import UserDetails from './userDetails'

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
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const validationSchema =
//   yup.object().shape({
//     email: yup
//       .string('Enter your email')
//       .email('Enter a valid email')
//       .required('Email is required'),
//     password: yup
//       .string('Enter your password')
//       .min(8, 'Password should be of minimum 8 characters length')
//       .required('Password is required'),
//     Phone: yup
//       .string('Entter your phone')
//       .min(10, 'Incorrect cell phone number')
//   });


// const WithMaterialUI = () => {
//   const classes = useStyles();

//   const formik = useFormik({
//     initialValues: {
//       email: 'd@gmail.com',
//       password: '12345678'
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log("update");
//     }
//   });

//   return (
//     <div>
//       <form className={classes.form} onSubmit={formik.handleSubmit}>
//         {/* <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="FirstName"
//           name="FirstName"
//           label="First name"
//           type="text"
//           //value={formik.values.password}
//           onChange={formik.handleChange}
//         //error={formik.touched.password && Boolean(formik.errors.password)}
//         //helperText={formik.touched.password && formik.errors.password}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="LastName"
//           name="LastName"
//           label="Last name"
//           type="text"
//           //value={formik.values.password}
//           onChange={formik.handleChange}
//         //error={formik.touched.password && Boolean(formik.errors.password)}
//         //helperText={formik.touched.password && formik.errors.password}
//         /> */}
//         {/* <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="Phone"
//           name="Phone"
//           label="Phone"
//           type="tel"
//           //value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.Phone && Boolean(formik.errors.Phone)}
//           helperText={formik.touched.Phone && formik.errors.Phone}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         /> */}
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           className={classes.submit}
//         >
//           update
//         </Button>
//       </form>
//       <div style={{height:"500px"}}>
//         <UserDetails></UserDetails>
//       </div>
//     </div>
//   );
// };

// export default WithMaterialUI;