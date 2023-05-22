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

  const validate = (values) => {
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
  };

  const inputFields = [
    { name: "firstName", type: "text", placeholder: "name..." },
    { name: "email", type: "email", placeholder: "email..." },
    { name: "phone", type: "text", placeholder: "phone..." },
  ];

  const renderForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => (
    <form onSubmit={handleSubmit} className="form">
      {inputFields.map((field) => (
        <div key={field.name}>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[field.name]}
          />
          <p className="validation-info">
            {errors[field.name] && touched[field.name] && errors[field.name]}
          </p>
        </div>
      ))}
      <button type="submit" disabled={isSubmitting} className="btn-submit">
        Submit
      </button>
    </form>
  );

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{ firstName: "", email: "", phone: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {renderForm}
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
