
import { ListDivider } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { getAuthUserFromCookie } from '../../features/auth';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/slice/logoutSlice';
import { removeAuthUserFromCookie, removeAuthTokenFromCookie ,getAuthTokenFromCookie} from '../../features/auth';
import { useEffect } from 'react';

export default function UserDrawer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = getAuthUserFromCookie();
    const user = userData ? JSON.parse(userData) : null;
    const token = getAuthTokenFromCookie()

    // useEffect(()=>{
    //     if(!token){
    //         navigate('/');
    //     }
    // },[dispatch])
    const handleLogout = () => {

        dispatch(logoutUser()).then((result) => {
            if (result.type === 'auth/logout/fulfilled') {
                navigate('/'); 
               
              
                
            }
        });
    };

    const handleProfile=()=>{
        navigate('/dashboard/profile')
    }


    return (
        <>
            <Dropdown>
                <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}
                   
                >
                    <Avatar src={user.profile_picture} sx={{ maxWidth: '32px', maxHeight: '32px' }} />
                </MenuButton>
                <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                        zIndex: '99999',
                        p: 1,
                        gap: 1,
                        '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                >
                    <MenuItem onClick={handleProfile}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={user.profile_picture} sx={{ borderRadius: '50%' }} />
                            <Box sx={{ ml: 1.5 }}>
                                <Typography level="title-sm" textColor="text.primary">
                                    {user.first_name + " " + user.last_name}
                                </Typography>
                                <Typography level="body-xs" textColor="text.tertiary">
                                    {user.email}
                                </Typography>
                            </Box>
                        </Box>
                    </MenuItem>
                    <ListDivider />
                    <MenuItem>
                        <HelpRoundedIcon />
                        Help
                    </MenuItem>
                    <ListDivider />
                    <MenuItem component="a" href="https://play.google.com/store/apps/details?id=com.sahasrara.myt">
                        Download App
                        <OpenInNewRoundedIcon />
                    </MenuItem>
                    <ListDivider />
                    <MenuItem onClick={handleLogout}>
                        <LogoutRoundedIcon />
                        Log out
                    </MenuItem>
                </Menu>
            </Dropdown>
        </>
    );
}
