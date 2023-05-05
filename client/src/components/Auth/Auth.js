import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// import { LockOutlinedIcon } from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import { useState } from "react";
import Input from "./Input";
import Icon from "./Icon";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {};
  const changeHandler = () => {};
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const switchMode = () => {
    setIsSignup(!isSignup);
    showPasswordHandler(false);
  };
  const googleSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    // console.log(decoded);

    try {
      dispatch({ type: "AUTH", data: decoded });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GoogleOAuthProvider clientId="376305568168-32lmed619a76acak17fc59j88gh42222.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid Container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    changeHandler={changeHandler}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    changeHandler={changeHandler}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                changeHandler={changeHandler}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                changeHandler={changeHandler}
                type={showPassword ? "text" : "password"}
                showPasswordHandler={showPasswordHandler}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  changeHandler={changeHandler}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submnit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={() => console.log("Error")}
                  //   render={(renderProps) => (
                  //     <Button
                  //       className={classes.googleButton}
                  //       color="primary"
                  //       fullWidth
                  //       onClick={renderProps.onClick}
                  //       disabled={renderProps.disabled}
                  //       startIcon={<Icon />}
                  //       variant="contained"
                  //     >
                  //       Google Sign In
                  //     </Button>
                  //   )}
                />
              </Grid>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Auth;
