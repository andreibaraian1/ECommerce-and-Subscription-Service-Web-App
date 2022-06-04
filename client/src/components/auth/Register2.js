import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import image from "../../images/1.jpg";
const theme = createTheme();

const Register2 = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (!username || !password || !confirmPassword || !email) {
      setError(true);
      setErrorMessage("Input cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Passwords do not match");
      return;
    }
    const register = await Axios.post(`${process.env.REACT_APP_HOSTNAME}/users/register`, {
      username,
      password,
      email,
    });

    if (register.data?.error) {
      setErrorMessage(register.data.error);
      return;
    } else {
      navigate("/login");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            {errorMessage && (
              <Typography component="caption" variant="h6" color="error">
                {errorMessage}
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {" "}
              <TextField
                margin="normal"
                required
                error={error}
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                  setErrorMessage("");
                }}
              />
              <TextField
                margin="normal"
                required
                error={error}
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(false);
                  setErrorMessage("");
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={error}
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                  setErrorMessage("");
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={error}
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(false);
                  setErrorMessage("");
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to="/login">Already have an account ? Log in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Register2;
