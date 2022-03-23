import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
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
import { AddNewUser, GetAllManagers } from "../connect to server/Connect";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { setStorageItem } from "../services/Functions";
import {
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Dialog } from "material-ui";
import { useHistory } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default function SignUp() {
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
      // marginTop: theme.spacing(8),
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
        backgroundColor: '#ffffff87',
        padding: '30px 20px 25px 20px',
        marginTop: "-5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiGrid-container" : {
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

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    isMenager: 0,
    menagerId: 0,
  });
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState([]);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState();
  const [title, setTitle] = useState();
  const [buttonText, setButtonText] = useState();
  const [isButton, setIsButton] = useState(false);

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

          if(succ.data != -1){
            setStorageItem("currentUser", JSON.stringify(user));
            setTitle("נרשמת בהצלחה !");
            setIsButton(false);
            setOpen(true);
            history.push("/map");
          }
          else{
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

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    GetAllManagers().then((data) => {
      setManagers(data); setSelectedManager(data[0]);
    });
  }, []);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
  };

  const handleClickShowVerifyPassword = (event) => {
    setShowVerifyPassword(!showVerifyPassword);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className={classes.paper}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar className={classes.avatar} variant="rounded">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              הרשמה
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
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
                <Grid container justifyContent="start !important" style={{marginRight:"20px"}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        onChange={handleChecked}
                        name="isManager"
                        color="default"
                      />
                    }
                    label="מעוניין להרשם כמנהל"
                  />
                </Grid>
              </Grid>
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                הירשם
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/sign_in" variant="body2" className={classes.link}>
                    כבר רשום במערכת? היכנס
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <MuiThemeProvider>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogActions>
              {isButton && (
                <Button
                  onClick={() => {
                    history.push(`/${path}`); setOpen(false);
                  }}
                >
                  {buttonText}
                </Button>
              )}
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                autoFocus
              >
                הבנתי
              </Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
