import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TwoSidedLayout from './TwoSidedLayout';
import { useNavigate } from 'react-router-dom';

import { BiLogoPlayStore } from "react-icons/bi";

export default function HeroLeft() {
    
    const handleDownloadBtn = (): void => {
        window.location.href = 'https://play.google.com/store/games?device=windows&pli=1';
      };
      
    

    return (
        <TwoSidedLayout>
            <Typography
                level="h1"
                fontWeight="xl"
                fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
               MYT: Task Management Simplified
            </Typography>
            <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">

                MYT streamlines task management. Organize, assign, and track tasks effortlessly. Boost productivity and collaboration with Myt. Manage tasks smartly!
            </Typography>
            <Card
                variant="outlined"
                color="neutral"
                orientation="horizontal"
                sx={{ gap: 2, my: 1, textAlign: 'left' }}
            >
                {/* <AutoAwesomeIcon color="success" fontSize="xl3" sx={{fontSize:'xl3'}} /> */}
                <AutoAwesomeIcon color="success" sx={{ fontSize: 'xl3' }} />
                <div>
                    <Typography fontSize="xl" fontWeight="lg" sx={{ mb: 1 }}>
                        MYT new version is out.
                    </Typography>
                    <Typography level="body-sm">
                        This is where a notification message will appear. <br />
                        Enter text into this container.
                    </Typography>
                </div>
            </Card>
            <Button size="lg" startDecorator={<BiLogoPlayStore size={'2rem'}  />}  sx={{
        backgroundColor: '#5046E3',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#6366F1',
        },
      }} onClick={handleDownloadBtn}>Download the App</Button>
            {/* <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        HeroLeft07
      </Typography> */}
        </TwoSidedLayout>
    );
}