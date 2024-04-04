import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
  number: yup
    .string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const initialValues = { name: "", number: "" };

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();
  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success("Added new contact.");
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.fieldContainer}>
          <label htmlFor={nameId}>Name</label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={nameId}
          ></Field>
          <span className={css.error}>
            <ErrorMessage name="name" />
          </span>
        </div>

        <div className={css.fieldContainer}>
          <label htmlFor={numberId}>Number</label>
          <Field
            className={css.field}
            type="text"
            name="number"
            id={numberId}
          ></Field>
          <span className={css.error}>
            <ErrorMessage name="number" />
          </span>
        </div>

        <button type="submit">Add contact</button>
        <Toaster />
      </Form>
    </Formik>
  );
}
