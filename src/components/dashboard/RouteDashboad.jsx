import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider'

import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import { selectPage, setPage } from '../../features/slice/pageSlice';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function RouteDashboad() {

    const dispatch=useDispatch()
    const navigate = useNavigate()

    const handlePageChange = (page) => {
        dispatch(setPage(page));
        navigate(page === 'dashboard' ? '/dashboard' : '/dashboard/reports');
      };
     
  return (
<>
<CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
       <Sidebar onPageChange={handlePageChange} selectedPage={selectPage}/>
       
        <Outlet />
      </Box>
      </CssVarsProvider>
</>
  )
}


