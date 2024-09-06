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

export default function CreateCompany() {
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
          backgroundImage: `url(https://img.freepik.com/free-vector/organizing-projects-concept-illustration_114360-542.jpg?w=740&t=st=1725533984~exp=1725534584~hmac=546304fef02f84375ad2a52486e8194604a27fe20bae2683770c82074c343d6d)`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(https://img.freepik.com/free-vector/organizing-projects-concept-illustration_114360-542.jpg?w=740&t=st=1725533984~exp=1725534584~hmac=546304fef02f84375ad2a52486e8194604a27fe20bae2683770c82074c343d6d)`,
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
              Register compnay
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

              <FormControl required>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    type="text"
                    name="compnay"
                    placeholder="Enter company name"
                    className="company_input"
                  />
                </FormControl>

                <Stack flex={"row"} direction={"row"} gap={2}>
                  <FormControl
                    required
                    sx={{
                      width: "50%",
                    }}
                  >
                    <FormLabel>State</FormLabel>
                    <Input
                      type="text"
                      name="statename"
                      placeholder="Enter state"
                      className="firstname_input"
                    />
                  </FormControl>

                  <FormControl
                    required
                    sx={{
                      width: "50%",
                    }}
                  >
                    <FormLabel>City</FormLabel>
                    <Input
                      type="text"
                      name="cityname"
                      placeholder="Enter city"
                      className="city_input"
                    />
                  </FormControl>
                </Stack>

              
                <Stack flex={"row"} direction={"row"} gap={2}>
                  <FormControl
                    required
                    sx={{
                      width: "50%",
                    }}
                  >
                    <FormLabel>Pincode</FormLabel>
                    <Input
                      type="text"
                      name="pincode"
                      placeholder="Enter pincode"
                      className="pincode_input"
                    />
                  </FormControl>

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
                </Stack>

                <FormControl required>
                  <FormLabel>GST number</FormLabel>
                  <Input
                    type="text"
                    name="number"
                    placeholder="Enter GST number"
                    className="number_input"
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
                    <FormLabel>Select No employee</FormLabel>
                    <Select
                      placeholder="Select No of employee"
                      name="role"
                      required
                      // sx={{ minWidth: 200 }}
                    >
                       <Option value="1-10" Select>1-10</Option>
                       <Option value="11-50">11-50</Option>
                       <Option value="51-100">51-100</Option>
                       <Option value="101-200">101-200</Option>
                       <Option value="201-500">201-500</Option>
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
