
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useSelector } from 'react-redux';
import ErrorCard from '../../cards/errorCard';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import TourIcon from '@mui/icons-material/Tour';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';

import { formatDate, capitalizeFirstLetter } from '../../utils/formate';
import { getComparator, stableSort } from '../../utils/orderFormat';
import DashboardTaskSkeleton from '../Skeletons/DashboardTaskSkeleton';
import { useEffect } from 'react';


type Order = 'asc' | 'desc';




export default function DashboardTask() {
    const [order, setOrder] = React.useState<Order>('desc');
    const { tasks, loading, error } = useSelector((state: any) => state.tasks);


    useEffect(()=>{
        if(!tasks){
            window.location.reload()
        }
    })

    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 5; 

    if(tasks.length < 0){
        window.location.reload()
    }
    const handleNext = () => {
        if (tasks.length > (currentPage * pageSize)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, tasks.length);
    const paginatedTasks = tasks.slice(startIndex, endIndex);

   if(error){
    return alert("something went wrong, please try again")
   }



    return (
        <React.Fragment>

            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                marginTop: '1rem',
                marginBottom: '1rem'
            }}>
                <Typography level='title-lg'>Assigned Task</Typography>
            </Box>

            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                    maxHeight: 300
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>

                            <th style={{ width: 160, padding: '12px 30px' }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                    fontWeight="lg"
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={{
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                        },
                                    }}
                                >
                                    Name
                                </Link>
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Priority</th>
                            <th style={{ width: 240, padding: '12px 6px' }}>Assigned by</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <DashboardTaskSkeleton />
                    ) : (
                        <tbody>


                            {stableSort(paginatedTasks, getComparator(order, '_id')).map((tasks: any) => (
                                <tr key={tasks._id}>

                                    <td style={{ paddingLeft: '30px' }}>
                                        <Typography level="body-xs">{tasks.task_name}</Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-xs"> {formatDate(tasks.start_date)}</Typography>
                                    </td>
                                    <td>
                                        <Chip
                                            variant="soft"
                                            size="sm"
                                            startDecorator={
                                                {
                                                    urgent: <AutoAwesomeIcon />,
                                                    high: <TourIcon />,
                                                    normal: <AutoFixNormalIcon />,
                                                    low: <DonutLargeRoundedIcon />,
                                                    no_priority: <AutoGraphIcon />,
                                                }[tasks.priority]
                                            }
                                            color={
                                                {
                                                    urgent: 'danger',
                                                    high: 'warning',
                                                    normal: 'primary',
                                                    low: 'neutral',
                                                    no_priority: 'success',
                                                }[tasks.priority] as ColorPaletteProp
                                            }
                                        >
                                            {capitalizeFirstLetter(tasks.priority)}


                                        </Chip>
                                    </td>
                                    <td>
                                        {
                                            tasks.assigned_by.map((names: any) => (
                                                <Typography level="body-xs" key={names._id}>{names.first_name + " " + names.last_name}</Typography>
                                            ))
                                        }



                                    </td>

                                </tr>
                            ))}
                        </tbody>)}
                </Table>
            </Sheet>

            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2, gap: 1, [`& .${iconButtonClasses.root}`]: {
                        borderRadius: '50%'
                    }, display: {
                        xs: 'none', md: 'flex',
                        justifyContent: 'end'
                    }
                }}
            >
                {currentPage > 1 && (
                    <Button size="sm" variant="outlined" color="neutral" startDecorator={<KeyboardArrowLeftIcon />} onClick={handlePrevious}>
                        Previous
                    </Button>
                )}
                {tasks.length > currentPage * pageSize && (
                    <Button size="sm" variant="outlined" color="neutral" endDecorator={<KeyboardArrowRightIcon />} onClick={handleNext}>
                        Next
                    </Button>
                )}
            </Box>
        </React.Fragment>
    );
}