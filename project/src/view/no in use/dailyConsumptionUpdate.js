
// import React,{useEffect} from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
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
//       .min(10, 'Incorrect cell phone number'),
//     firstName: yup
//       .string("")
//       .min(1,"")
//       .required("first name is requeird"),
//     lastName: yup
//       .string("")
//       .min(1,"")
//       .required("last name is requeird"),
//   });


// const WithMaterialUI = (props) => {
//   const classes = useStyles();


//   useEffect(
//     ()=>{
//     console.log(props.user,"user")
//     }
//     ,[])

//   const formik = useFormik({
//     initialValues: {
//       firstName:props.user.firstName,
//       lastName:props.user.lastName,
//       email: props.user.email,
//       password: props.user.password,
//       phone: props.user.phone,
//       ampere: props.user.ampereAmount,
//       address: props.user.address

//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log("update");
//     }
//   });

//   return (
//     <div>
//       <form className={classes.form} onSubmit={formik.handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="firstName"
//           name="firstName"
//           label="First name"
//           type="text"
//           value={formik.values.firstName}
//           onChange={formik.handleChange}
//           error={formik.touched.firstName && Boolean(formik.errors.firstName)}
//           helperText={formik.touched.firstName && formik.errors.firstName}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="lastName"
//           name="lastName"
//           label="Last name"
//           type="text"
//           value={formik.values.lastName}
//           onChange={formik.handleChange}
//           error={formik.touched.lastName && Boolean(formik.errors.lastName)}
//           helperText={formik.touched.lastName && formik.errors.lastName}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="phone"
//           name="phone"
//           label="phone"
//           type="tel"
//           value={formik.values.phone}
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
//         />
//          <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="address"
//           name="address"
//           label="Address"
//           type="text"
//           value={formik.values.address}
//           onChange={formik.handleChange}
//           error={formik.touched.address && Boolean(formik.errors.address)}
//           helperText={formik.touched.address && formik.errors.address}
//         />     
//         <TextField
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         id="email"
//         name="email"
//         label="Email"
//         type="email"
//         value={formik.values.email}
//         onChange={formik.handleChange}
//         error={formik.touched.email && Boolean(formik.errors.email)}
//         helperText={formik.touched.email && formik.errors.email}
//       />
//        <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="ampere"
//           name="ampere"
//           label="ampre"
//           type="number"
//           value={formik.values.ampere}
//           onChange={formik.handleChange}
//           error={formik.touched.ampere && Boolean(formik.errors.ampere)}
//           helperText={formik.touched.ampere && formik.errors.ampere}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="status"
//           name="status"
//           label="status"
//           type="bol"
//           //value={formik.values.password}
//           onChange={formik.handleChange}
//           //error={formik.touched.password && Boolean(formik.errors.password)}
//           //helperText={formik.touched.password && formik.errors.password}
//         />
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
//     </div>
//     );
// };

// export default WithMaterialUI;