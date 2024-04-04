import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/authOps";
import css from "./LoginForm.module.css";
import toast, { Toaster } from "react-hot-toast";

const initialValues = { email: "", password: "" };
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Wrong format email.").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must contain at least 6 characters."),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const emailID = useId();
  const passwordId = useId();
  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .catch(() => {
        toast.error("Login error");
      });

    actions.resetForm();
  };
  return (
    <div>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label htmlFor={emailID}>Email</label>
          <Field type="email" name="email" />
          <span className={css.error}>
            <ErrorMessage name="email" />
          </span>
          <label htmlFor={passwordId}>Password</label>
          <Field type="password" name="password" />
          <span className={css.error}>
            <ErrorMessage name="password" />
          </span>
          <button className={css.button} type="submit">
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
}
