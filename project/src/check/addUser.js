import React from 'react'
import { Formik, Field, Form } from 'formik';

const addUser=()=>{


return(
    <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
    }}
    onSubmit={(values) => {
      alert(JSON.stringify(values, null, 2));
    }}
  >
    <Form>
      <label htmlFor="firstName">First Name</label>
      <Field id="firstName" name="firstName" />

      <label htmlFor="lastName">Last Name</label>
      <Field id="lastName" name="lastName" />

      <label htmlFor="email">Email</label>
      <Field
        id="email"
        name="email"
        // placeholder="jane@acme.com"
        type="email"
      />

      <label htmlFor="password">password</label>
      <Field
        id="password"
        name="password"
        type="password"
      />

<label htmlFor="address">address</label>
      <Field
        id="address"
        name="address"
      />

<label htmlFor="address">phone</label>
      <Field
        id="phone"
        name="phone"
        type="phone"
      />

      <button type="submit">Submit</button>
    </Form>
  </Formik>
)

}
export default addUser;
