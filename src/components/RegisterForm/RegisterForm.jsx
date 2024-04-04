import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOps";
import { useId } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./RegisterForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Too short!")
    .max(50, "Too long!"),
  email: Yup.string().email("Wrong format email.").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must contain at least 6 characters."),
});
const initialValue = { name: "", email: "", password: "" };

export default function RegisterForm() {
  const dispatch = useDispatch();
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .catch(() => {
        toast.error("Register error");
      });

    actions.resetForm();
  };
  return (
    <div>
      <Toaster />
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId} />
          <span className={css.error}>
            <ErrorMessage name="name" />
          </span>
          <label htmlFor={emailId}>Email</label>
          <Field type="email" name="email" id={emailId} />
          <span className={css.error}>
            <ErrorMessage name="email" />
          </span>
          <label htmlFor={passwordId}>Password</label>
          <Field type="password" name="password" id={passwordId} />
          <span className={css.error}>
            <ErrorMessage name="password" />
          </span>
          <button className={css.button} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
