
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from '../connect to server/Connect'

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
    amount: yup
      .number()
      .min(0)
      .required('amount is required'),

  });


const UpdateUse = (props) => {

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    }
  });

  const getCurrentDate = () => {
    var date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toLocaleString('default', { month: 'long' })
  }


  return (
    <div>
      <h4>update use for month {getCurrentDate()}</h4>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="amount"
          name="amount"
          label="amount"
          type="number"
          value={formik.values.amount}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
          }}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
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
    </div>
  );
};

export default UpdateUse;