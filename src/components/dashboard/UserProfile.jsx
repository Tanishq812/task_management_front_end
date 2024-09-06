import { useEffect } from 'react';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { getAuthUserFromCookie,getAuthTokenFromCookie } from '../../features/auth';
import { useDispatch,useSelector } from 'react-redux';
import {fetchUserDetails} from '../../features/slice/UserDetails';
import axios from 'axios';

export default function UserProfile() {
    const dispatch=useDispatch()
    const userData = getAuthUserFromCookie()
    const user = userData ? JSON.parse(userData) : null;
    const token = getAuthTokenFromCookie();
    console.log(token);
   
    
    
    const id=user._id
    console.log(id);



    const userId = '6683b8bee2898d9482632700'; // Replace with dynamic userId if needed
  
    // Fetch user details when the component mounts
    useEffect(() => {
      dispatch(fetchUserDetails(userId));
    }, [dispatch, userId]);
  
    // Select data from the store
    const userDetails = useSelector((state) => state.user.userDetails);
   
    console.log(userDetails);
    
    
      
      
    
      

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon sx={{ fontSize: 'sm' }} />}
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
                       
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            My profile
                        </Typography>
                    </Breadcrumbs>
                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        My profile
                    </Typography>
                </Box>

            </Box>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">Personal info</Typography>
                        
                    </Box>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                    >
                        <Stack direction="column" spacing={1}>
                            <AspectRatio
                                ratio="1"
                                maxHeight={200}
                                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                            >
                                <img
                                    src={user.profile_picture}
                                    // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>

                        </Stack>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            <Stack spacing={1}>
                                <Box>
                                    <Typography level='title-sm'>
                                        Name
                                    </Typography>
                                    <Typography
                                        level='body-md'
                                        sx={{
                                            border: 1,
                                            borderRadius: '.3rem',
                                            px: 2,
                                            py: .5,
                                            borderColor: '#cfd8dc',
                                            mt: 1

                                        }}
                                    >{user.first_name + " " + user.last_name}</Typography>
                                </Box>
                            </Stack>
                            <Stack spacing={1}>
                                <Box>
                                    <Typography level='title-sm'>
                                        Email
                                    </Typography>
                                    <Typography
                                        level='body-md'
                                        sx={{
                                            border: 1,
                                            borderRadius: '.3rem',
                                            px: 2,
                                            py: .5,
                                            borderColor: '#cfd8dc',
                                            mt: 1

                                        }}
                                    >{user.email}</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Box sx={{ width: '50%' }}>
                                    <Typography level='title-sm'>
                                        Role
                                    </Typography>
                                    <Typography
                                        level='body-md'
                                        sx={{
                                            border: 1,
                                            borderRadius: '.3rem',
                                            px: 2,
                                            py: .5,
                                            borderColor: '#cfd8dc',
                                            mt: 1

                                        }}
                                    >{user.user_type }</Typography>
                                </Box>


                                <Box sx={{ width: '50%' }}>
                                    <Typography level='title-sm'>
                                        Number
                                    </Typography>
                                    <Typography
                                        level='body-md'
                                        sx={{
                                            border: 1,
                                            borderRadius: '.3rem',
                                            px: 2,
                                            py: .5,
                                            borderColor: '#cfd8dc',
                                            mt: 1

                                        }}
                                    >{user.phone_number}</Typography>
                                </Box>
                            </Stack>


                        </Stack>
                    </Stack>


                </Card>

            </Stack>
        </Box>
    );
}