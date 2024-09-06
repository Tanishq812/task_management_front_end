import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function ColorSchemeToggle(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function User() {
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />

  

      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          right: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1725537372~exp=1725540972~hmac=d09af308d1193e33a35bcb209ef4c85b0674b4a3e8d46bfb6d578b07f4cbe3bb&w=740)`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1725537372~exp=1725540972~hmac=d09af308d1193e33a35bcb209ef4c85b0674b4a3e8d46bfb6d578b07f4cbe3bb&w=740)`,
          },
        })}
      />


<Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <img
                src="https://img.icons8.com/3d-fluency/50/people.png"
                alt=""
                className="logo_style"
              />
              <Typography level="title-lg">Management Tool</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
            <Typography level="h3" color="primary">
              Register user
            </Typography>
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 500,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mt: 2 }}>
              <form>

             

              <Stack flex={"row"} direction={"row"} gap={2}>
                  <FormControl
                    required
                    sx={{
                      width: "50%",
                    }}
                  >
                    <FormLabel>First name</FormLabel>
                    <Input
                      type="text"
                      name="firstname"
                      placeholder="Enter Firstname"
                      className="firstname_input"
                    />
                  </FormControl>

                  <FormControl
                    required
                    sx={{
                      width: "50%",
                    }}
                  >
                    <FormLabel>Last name</FormLabel>
                    <Input
                      type="text"
                      name="lastname"
                      placeholder="Enter Lastname"
                      className="lastname_input"
                    />
                  </FormControl>
                </Stack>

              
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="email_input"
                  />
                </FormControl>

                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="firstname"
                    placeholder="Enter Password"
                    className="password_input"
                  />
                </FormControl>

                <FormControl required>
                  <FormLabel>Pancard number</FormLabel>
                  <Input
                    type="text"
                    name="pancard"
                    placeholder="Enter Pancard number"
                    className="pancard_input"
                  />
                </FormControl>

           

                <Stack flex={"row"} direction={"row"} gap={2}>
                  <FormControl
                    required
                    sx={{
                      width: "50%",
                    }}
                  >
                    <FormLabel>Number</FormLabel>
                    <Input
                      type="number"
                      name="number"
                      placeholder="Enter number"
                      className="number_input"
                    />
                  </FormControl>

                  <FormControl required   sx={{
                      width: "50%",
                    }}>
                   <FormLabel>Role</FormLabel>
                    <Select
                      placeholder="Select role"
                      name="role"
                      required
                      // sx={{ minWidth: 200 }}
                    >
                       <Option value="super_admin" Select>Super Admin</Option>
                       <Option value="admin">Admin</Option>
                    </Select>
                  </FormControl>

                
                </Stack>

                <Button>Save</Button>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Management Tool {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
