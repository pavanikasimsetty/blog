import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../state/Auth/authActions";

// initial values/field required for authentication 
const initialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  gender: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // For registration success
  const user = useSelector((state) => state.auth.user); // Get logged-in user info

  function handleSubmit(values) {
    values.gender = gender;
    console.log("handle submit", values);
    dispatch(registerUser({ data: values }));
    setIsRegistered(true); // Show success message
  }

  function handleChange(event) {
    setGender(event.target.value);
  }

  function handleLogout() {
    // Clear token from localStorage
    localStorage.removeItem("authToken");
    // Clear Redux state
    dispatch({ type: "LOGOUT" });
    // Redirect to login page
    navigate("/login");
  }

  return (
    <>
      {user ? (
        // Show logout button if user is logged in
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Welcome, {user.name}!</h2>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="secondary"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={initialValues}
          >
            <Form className="space-y-5">
              <div className="space-y-5">
                <div>
                  <Field
                    as={TextField}
                    name="fname"
                    placeholder="First Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    name="fname"
                    component={"div"}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <Field
                    as={TextField}
                    name="lname"
                    placeholder="Last Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    name="lname"
                    component={"div"}
                    className="text-red-500"
                  />
                </div>

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
                    component={"div"}
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
                    component={"div"}
                    className="text-red-500"
                  />
                </div>

                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </div>
              <Button
                sx={{
                  padding: ".8rem 0rem",
                  backgroundColor: "#1976d2",  // This sets the background color to blue
                  "&:hover": { backgroundColor: "#1565c0" },  // Darker blue on hover
                }}
                fullWidth
                type="submit"
                variant="contained"
              >
                Register
              </Button>

              {/* <Button
                sx={{ padding: ".8rem 0rem" }}
                fullWidth
                type="submit"
                variant="contained"
                color="primary" // Blue color
              >
                Register
              </Button> */}
            </Form>
          </Formik>

          {isRegistered && (
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: "green",
              }}
            >
              Registration successful! Please login.
              <Button
                onClick={() => navigate("/login")}
                style={{ marginLeft: "10px" }}
                color="primary" // Blue color
              >
                Go to Login
              </Button>
            </div>
          )}

          {/* Add the "Already have an account? Log in" link */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <p>
              Already have an account?{" "}
              <Button onClick={() => navigate("/login")} color="primary">
                Login here
              </Button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
