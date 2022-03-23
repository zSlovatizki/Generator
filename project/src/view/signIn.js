import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toJS } from "mobx";
import { FetchUserByPassword } from "../connect to server/Connect";
import { getGeneratorsByManagerId } from "../connect to server/Connect";
import { FetchCablesByManager } from "../connect to server/Connect";
import User from "../Mobx/User";
import { useHistory } from "react-router";
import Cables from "../Mobx/Cables";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { setStorageItem } from "../services/Functions";
import {
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Dialog } from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { white } from "material-ui/styles/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#ffffff87',
    padding: '30px 20px 25px 20px',
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiGrid-container" : {
      justifyContent: 'end'
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#df9a1a',
  },
  form: {
    // width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(88,88,90)",
    color: white,
    "&:hover": {
      backgroundColor: 'rgb(52,51,51)',
      // color: "rgb(88,88,90)",
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
    // paddingTop: "0",
    "& .muirtl-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
      marginBottom: '10px'
    },
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
    "& .muirtl-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
      cursor: 'pointer'
    }
  },
}));

const validationSchema = yup.object().shape({
  email: yup.string("הכנס מייל").email(" מייל לא חוקי").required("מייל חובה"),
  password: yup
    .string("הכנס סיסמא")
    .required("סיסמא חובה")
    .matches(
      /^(?=.*\d).{8,}$/,
      "סיסמא חייבת להיות באורך 8 תוים ולהכיל סיפרה אחת לפחות"
    ),
});

const WithMaterialUI = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [path, setPath] = useState();
  const [title, setTitle] = useState();
  const [buttonText, setButtonText] = useState();
  const [isButton, setIsButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      var user;
      const res = await FetchUserByPassword(values.password, values.email);
      User.currentUser = res;
      user = res;
      if (user && user.id) {
        setStorageItem("user", JSON.stringify(user));
        await getGeneratorsByManagerId(user.id);
        await FetchCablesByManager(user.id);
        console.log(toJS(Cables.cable));
        history.push("/map");
      } else {
        setTitle("הפרטים שהזנת אינם קיימים במערכת...");
          setPath("sign_up");
          setButtonText("הרשם למערכת");
          setIsButton(true);
          setOpen(true);
      }
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

  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [expand, setExpand] = React.useState(false);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };
  const theme = createTheme({
    direction: "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar} variant="rounded"></Avatar>
          <Typography component="h1" variant="h5" style={{marginBottom: '10px'}}>
            כניסה
          </Typography>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <form
                className={classes.form}
                onSubmit={formik.handleSubmit}
                dir="rtl"
              >
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  id="email"
                  name="email"
                  label="מייל"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  className={classes.textField}
                  variant="outlined"
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
                {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" fullWidth>סיסמא</InputLabel>
                  <OutlinedInput
                    fullWidth
                    onChange={formik.handleChange}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="סיסמא"
                  />
                </FormControl> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  כניסה
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/sign_up" variant="body2" className={classes.link}>
                      {"לא רשום במערכת? הרשם"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </ThemeProvider>
          </CacheProvider >
        </div>
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
    </div >
  );
};

export default WithMaterialUI;
