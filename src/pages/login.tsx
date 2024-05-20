import * as React from "react";
import { toast } from 'react-toastify';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FooterIllustrationsV1 from "@/common/Footer";
import { EyeOffOutline, EyeOutline } from "mdi-material-ui";
import { useAuthDispatch, useAuthState } from "@/hooks/useAuthDispatch";
import { NavigateBefore } from "@mui/icons-material";
import { useRouter } from "next/router";

interface State {
  password: string;
  showPassword: boolean;
}

export default function Login() {
  const { loginAsync, } = useAuthDispatch();
  const router = useRouter()

  const { token } = useAuthState();

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    }
    console.log(formData);
    if (formData.email && formData.password) {

      try {
        loginAsync({ email: formData.email, password: formData.password });
      } catch (error) {
        toast.error('Login failed. Please check your credentials.');
      }
    }
  };

  React.useEffect(() => {
    if (token) {
      router.push('/')
    }
  }, [token])
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem 2.25rem 1.75rem!important",
            border: "1px solid #fff",
            backgroundColor: "#FFF",
            color: "rgba(58, 53, 65, 0.87)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            borderRadius: "6px",
            backgroundImage: "none",
            overflow: "hidden",
            boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
            zIndex: 1,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#9155FD" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ marginBottom: 4 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}

            <TextField
              required
              autoFocus
              fullWidth
              id="email"
              label="Email"
              sx={{ marginBottom: 4 }}
              name="email"
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                // required
                label="Password"
                name="password"
                value={values.password}
                id="auth-login-password"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Grid container alignItems={"center"}>
              <Grid textAlign={"right"}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs textAlign={"end"}>
                <Link href="#" variant="body2" color={"#9155FD"}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, backgroundColor: "#9155FD" }}
            >
              Sign In
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Link href="#" variant="body2" color={"rgba(58, 53, 65, 0.68)"}>
                  New on our platform?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color={"#9155FD"} marginLeft={1}>
                  Create an account
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <FooterIllustrationsV1 />
    </React.Fragment>
  );
}
