
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Header from './components/Header';
import UserDrawer from './UserDrawer';
import ReportsTable from './components/ReportsTable';
import { useEffect } from 'react';
import { fetchTeams } from '../../features/slice/teamsSlice';
import { useDispatch } from 'react-redux';



export default function Dashboard() {

  const dispatch = useDispatch();

  useEffect(() => {
     
      dispatch(fetchTeams());
    }, [dispatch]);


 

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
      

        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex',justifyContent:'space-between',  alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon sx={{fontSize:'sm'}} />}
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
                href="/dashboard/reports"
                fontSize={12}
                fontWeight={500}
               
              >
                Task Reports
              </Link>
              {/* <Typography color="primary" fontWeight={500} fontSize={12}>
                Orders
              </Typography> */}
            </Breadcrumbs>

          <UserDrawer/>


          </Box>
         
         <ReportsTable/>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}




