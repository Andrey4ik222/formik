import React, { useState } from "react";
import { Formik } from "formik";
import Values from "../Values/Values";

import "./Form.css";

const Basic = () => {
  const [submittedValues, setSubmittedValues] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmittedValues(values);
    setSubmitting(false);
  };

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{ firstName: "", email: "", phone: "" }}
        validate={(values) => {
          const errors = {};
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          const phoneRegex = /^[0-9]+$/;

          if (!values.firstName) {
            errors.firstName = "Name cannot be empty!";
          }

          if (!values.email) {
            errors.email = "Email cannot be empty!";
          } else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid email address!";
          }

          if (!values.phone) {
            errors.phone = "Phone cannot be empty!";
          } else if (!phoneRegex.test(values.phone)) {
            errors.phone = "Only numbers allowed!";
          } else if (values.phone.length !== 12) {
            errors.phone = "Must be 12 digits!";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              name="firstName"
              placeholder="name..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            <p className="validation-info">
              {errors.firstName && touched.firstName && errors.firstName}
            </p>

            <input
              type="email"
              name="email"
              placeholder="email..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <p className="validation-info">
              {errors.email && touched.email && errors.email}
            </p>

            <input
              type="text"
              name="phone"
              placeholder="phone..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            <p className="validation-info">
              {errors.phone && touched.phone && errors.phone}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-submit"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>

      {submittedValues && (
        <Values
          firstName={submittedValues.firstName}
          email={submittedValues.email}
          phone={submittedValues.phone}
        />
      )}
    </div>
  );
};

export default Basic;
