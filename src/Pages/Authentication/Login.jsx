import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../state/Auth/authActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); // State for login error

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("handle submit", values);
      const response = await dispatch(loginUser({ data: values }));

      if (response.payload?.token) {
        // Navigate to home page after successful login
        navigate("/home/feed");
      } else {
        // Handle unsuccessful login
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false); // Ensure form is re-enabled after submission
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema} // Enable validation
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div className="space-y-5">
              <div>
                <Field
                  as={TextField}
                  name="email"
                  placeholder="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <Field
                  as={TextField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            {loginError && (
              <div className="text-red-500 text-center">{loginError}</div>
            )}

            <Button
              sx={{ 
                padding: ".8rem 0rem", 
                backgroundColor: '#1976d2', // Blue color
                '&:hover': {
                  backgroundColor: '#1565c0', // Darker blue on hover
                }
              }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            {/* <Button
              sx={{ padding: ".8rem 0rem" }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button> */}
          </Form>
        )}
      </Formik>

      <div className="flex gap-2 items-center justify-center pt-5">
        <p>Don't have an account?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </>
  );
}

export default Login;
