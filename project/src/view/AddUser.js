import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { AddNewUser } from "../connect to server/Connect";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { setStorageItem } from "../services/Functions";
import { useHistory } from "react-router";

export default function AddUser({ setAddNewUserState, addNewUserState,history}) {

  const theme = createTheme({
    direction: "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const useStyles = makeStyles((theme) => ({
    mainBox: {
      position: "relative",
      marginTop: "-8px",
      padding: "10px 20px",
      borderBottomRightRadius: "4px",
      borderBottomLeftRadius: "4px",
      background: theme.palette.background.default,
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: "rgb(255,170,23)",
      backgroundColor: "black",
    },
    textField: {
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "0",
      "& label.Mui-focused": {
        color: "rgb(255,170,23)",
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
      },
    },
  }));

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    isMenager: 0,
    menagerId: 0,
  });

  const classes = useStyles();
  console.log(history)
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
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "סיסמא חייבת להיות באורך 8 תוים ולהכיל: אות קטנה אחת, אות גדולה אחת, סיפרה אחת ותו מיוחד אחד לפחות"
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
      firstName: "גלי",
      lastName: "שפיגל",
      phone: "",
      email: "gil@gmail.com",
      password: "gG%123456",
      verifyPassword: "gG%123456",
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
        modify: 0,
      };
      AddNewUser(user).then(
        (succ) => {
          if (succ.data != -1) {
            history.push({
              pathname: `/userDetails/updateDetails`,
              search: `id=${succ.data}`,
            })
          }
          else
            alert("שגיאה קיים כבר משתמש כזה..")
          setAddNewUserState({ ...addNewUserState, isOpen: false })
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




  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
  };

  const handleClickShowVerifyPassword = (event) => {
    setShowVerifyPassword(!showVerifyPassword);
  };


  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                sx={{ mt: 3, mb: 2 }}
              >
                המשך
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}
