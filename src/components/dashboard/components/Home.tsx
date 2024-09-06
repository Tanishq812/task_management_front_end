import Box from '@mui/joy/Box'
import React, { Fragment } from 'react'
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import TripOriginIcon from '@mui/icons-material/TripOrigin';



export default function Home({ data }) {
    return (
        <React.Fragment>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                   
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'flex', sm: 'flex' },
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                        maxWidth: { lg: '1200px' }
                    },
                }}
            >



                <Card variant="solid" invertedColors sx={{ backgroundColor: '#6366F1', width: 400, mt: 2, borderRadius: '1.5rem', overflow: 'hidden' }}>


                    <TripOriginIcon sx={{ fontSize: '8rem', color: '#D2D0F9', position: 'absolute', right: '-3rem', top: '-3rem' }} />
                    <CardContent orientation="vertical">
                        <CircularProgress size="lg" determinate value={0}>
                            <SvgIcon>
                                <TaskOutlinedIcon style={{ fontSize: '2rem' }} />
                            </SvgIcon>
                        </CircularProgress>

                        <CardContent>
                            <Typography level="h2">{data.ongoingTask}</Typography>
                            <Typography level="body-md">On Going Task</Typography>
                        </CardContent>
                    </CardContent>
                  
                </Card>
                <Card variant="solid" invertedColors sx={{ backgroundColor: '#2563EB', width: 400, mt: 2, borderRadius: '1.5rem', overflow: 'hidden' }}>
                    <TripOriginIcon sx={{ fontSize: '8rem', color: '#BED1FB', position: 'absolute', right: '-3rem', top: '-3rem' }} />
                    <CardContent orientation="vertical">
                        <CircularProgress size="lg" determinate value={0}>
                            <SvgIcon>
                                <TaskAltRoundedIcon style={{ fontSize: '2rem' }} />
                            </SvgIcon>
                        </CircularProgress>

                        <CardContent>
                            <Typography level="h2">{data.completedTask}</Typography>
                            <Typography level="body-md">Task Completed</Typography>
                        </CardContent>
                    </CardContent>
                   
                </Card>
            </Box>
        </React.Fragment>
    )
}



