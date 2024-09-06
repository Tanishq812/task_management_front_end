import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Header from "./Header";
import Home from "./Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import UserDrawer from "../UserDrawer";
import { useEffect, useState } from "react";

import ErrorCard from "../../cards/errorCard";
import DashboardTask from "./DashboardTask";
import { fetchDashboardTasks } from "../../../features/slice/taskSlice";
import LoadingsCircle from "../../utils/LoadingsCircle";
import { getAuthTokenFromCookie } from "../../../features/auth";
import { fetchTeams } from "../../../features/slice/teamsSlice";
export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDashboardTasks());
        dispatch(fetchTeams());
      }, [dispatch]);


 


  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  if (data < 0) {
    window.location.reload();
  }
  const fetchData = async () => {
    try {
      const storedToken = getAuthTokenFromCookie();
      const response = await axios.get(
        "https://api.manageyourteam.in/users/generate_stat_data",
        {
          headers: {
            token: `${storedToken}`,
          },
        }
      );
      setData(response.data.data);

      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />

      {loading ? (
        <LoadingsCircle />
      ) : error ? (
        <ErrorCard title="Error Occurred" description={error} />
      ) : (
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}
        >
          <Header />

          <Box
            component="main"
            className="MainContent"
            sx={{
              px: { xs: 2, md: 6 },
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              height: "100dvh",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon sx={{ fontSize: "sm" }} />}
                sx={{ pl: 0 }}
              >
                <Link
                  underline="none"
                  color="neutral"
                  href="#some-link"
                  aria-label="Home"
                >
                  <HomeRoundedIcon />
                </Link>
                <Link
                  underline="hover"
                  color="primary"
                  href="dashboard"
                  fontSize={12}
                  fontWeight={500}
                >
                  Dashboard
                </Link>
              </Breadcrumbs>
              <UserDrawer />
            </Box>
            <Box
              sx={{
                display: "flex",
                mb: 1,
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "start", sm: "center" },
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Typography level="h2" component="h1">
                Dashboard
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1.5,
                  alignItems: "center",
                }}
              ></Box>
            </Box>
            {/* <OrderTable /> */}
            {/* <OrderList /> */}
            {data && <Home data={data} />}
            <DashboardTask />
          </Box>
        </Box>
      )}
    </CssVarsProvider>
  );
}
