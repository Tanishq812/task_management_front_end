/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getComparator, stableSort } from '../../utils/orderFormat';
import { formatDate, truncateTaskName } from '../../utils/formate';
import { fetchTasksReport } from '../../../features/slice/taskReportSlice';
import { UseDispatch } from 'react-redux';
import DashboardTaskSkeleton from '../Skeletons/DashboardTaskSkeleton';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import axios from 'axios';
import { getAuthTokenFromCookie } from '../../../features/auth';
import LoadingsCircle from '../../utils/LoadingsCircle';
import axiosInstance from '../../../features/slice/axiosInstance';
import Alerts from '../../utils/Alerts';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
const token =getAuthTokenFromCookie()
type Order = 'asc' | 'desc';

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function ReportsTable() {
  const dispatch = useDispatch()
  const [order, setOrder] = React.useState<Order>('desc');
  const [reportData, setReportData] = useState<any>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);
  // const teams = useSelector((state: any) => state.teams.teams || []); 
  const { teams, status, error } = useSelector((state:any) => state.teams);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts]=useState(false);


  



const fetchTaskReportList = async (fromDate: any, toDate: any, employeeId: any, teamId: any, status: any) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post('/tasks/tasks_report_list', 
      {
        from_date: fromDate,
        to_date: toDate,
        employee_id: employeeId,
        team_id: teamId,
        status: status,
      }
    );
    setReportData(response.data.data.detail);
  } catch (error) {

    setAlerts(true)
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  

  fetchTaskReportList(startDate, endDate, selectedEmployee, selectedTeam, statusFilter);
}, [ startDate, endDate, selectedEmployee, selectedTeam, statusFilter]);




  const handleStatusFilterChange = (event: any, newValue: string | null) => {
    
    setStatusFilter(newValue);
  };


  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = event.target.value;
    if (!endDate || newStartDate <= endDate) {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value;
    if (!startDate || newEndDate >= startDate) {
      setEndDate(newEndDate);
    }
  };



  //pagination code 
  const pageSize = 8; 

  const handleNext = () => {
    if (reportData.length > (currentPage * pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, reportData.length);
  const paginatedTasks = reportData.slice(startIndex, endIndex);



  



  
  
  const handleCSVDownload = async () => {
    let url = `${`https://api.manageyourteam.in`}/tasks/task_csv?token=${token}`;
  
    if (startDate) {
      url += `&from_date=${startDate}`;
      console.log(startDate,"starrttttt");
    }
  
    if (endDate) {
      url += `&to_date=${endDate}`;
      console.log(endDate,"EEEEEEEEEEEEnd");
    }
    if(selectedEmployee){
      url+=`&employee_id=${selectedEmployee}`
      console.log(selectedEmployee);
    }
    if(selectedTeam){
      url +=`&team_id=${selectedTeam}`
      console.log(selectedTeam);
    }
    if(statusFilter){
      url +=`&status=${statusFilter}`
      console.log(statusFilter);
    
    }
  
    window.open(url);
  //  this.setState({ openFilter: false, status: '' }); // Assuming this.setState is available
  };



  // async function fetchTaskCsvData() {

//   const fetchTaskCsvData = async () => {
//     const baseURL = 'https://api.manageyourteam.in/';
//     const endpoint = 'tasks/task_csv';

//     try {
//         const response = await axios.get(baseURL + endpoint, {
//             headers: {
//                 token: `${token}`,  
//             },
//             params: {
//                 from_date: startDate,
//                 to_date: endDate,
//                 employee_id: selectedEmployee,
//                 team_id: selectedTeam,
//                 status: statusFilter
//             }
//         });
      
//         console.log('Task CSV Data:', response.data);
//     } catch (error) {
//         console.error('Error fetching task CSV data:', error);
//         alert('something went wrong')
//     }
// };


  useEffect(() => {

    if (reportData.length < 10 && currentPage > 1) {
      handlePrevious();
    }
  }, [reportData, currentPage]);





  const handleTeamChange = (event: any, newValue: any) => {
    console.log('team id', newValue);
    setSelectedTeam(newValue);

    const selectedTeam = teams.find((team: any) => team._id === newValue);
    if (selectedTeam) {
      setEmployees(selectedTeam.members_list);
    } else {
      setEmployees([]);
    }
  };


 
  const handleEmployeeChange = (event: any, newValue: any) => {
    console.log('employee id', newValue);
    setSelectedEmployee(newValue);
   
  };




  const renderFilters = () => (
    <React.Fragment>

     
      <FormControl size="sm">
        <FormLabel>Team Name</FormLabel>
        <Select
          size="sm"
          placeholder="Select Team"
          onChange={handleTeamChange}
        >
          <Option value={null}>All</Option>


          {/* {teams.map((team: any) => (
            <Option value={team._id}>
              {team.team_name}
            </Option>
          ))} */}
          {teams.length > 0 && teams.map((team: any) => ( 
          <Option value={team._id}>
            {team.team_name}
          </Option>
        ))}
        </Select>
      </FormControl>


      <FormControl size="sm">
        <FormLabel>Employee Name</FormLabel>
        <Select
          size="sm"
          placeholder="Select Employee"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          disabled={!selectedTeam} 
        >
          {employees.map((employee: any) => (
            <Option value={employee._id}>
              {employee.first_name} {employee.last_name}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Task Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value={null}>All</Option>
          <Option value="pending">Pending</Option>
          <Option value="completed">Completed</Option>
          <Option value="reviewed">Reviewed</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Start Date</FormLabel>
        <Input
          type="date"
          value={startDate || ''}
          onChange={handleStartDateChange}
          slotProps={{
            input: {
              min: '2018-06-07',
              max: '2024-12-31',
            },
          }}
        />
      </FormControl>

      <FormControl size="sm">
        <FormLabel>End Date</FormLabel>
        <Input
          type="date"
          value={endDate || ''}
          onChange={handleEndDateChange}
          slotProps={{
            input: {
              min: '2018-06-07',
              max: '2024-12-31',
            },
          }}
        />
      </FormControl>

    </React.Fragment>
  );
  return (


    <React.Fragment>
     
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2" component="h1">
          Reports
        </Typography>
        <Button
          color="primary"
          startDecorator={<DownloadRoundedIcon />}
          size="sm"
        onClick={handleCSVDownload}
        >
          Download CSV
        </Button>
      </Box>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
       
        {renderFilters()}
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

              <th style={{ width: 120, padding: '12px 6px' }}>
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
                  Task Name
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Team</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Task status</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Assigned to</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Assigned by</th>
              <th style={{ width: 50, padding: '12px 6px' }}></th>
            </tr>
          </thead>


{
  reportData.length !== 0 &&   <tbody>
        

  {stableSort(paginatedTasks, getComparator(order, '_id')).map((data: any) => (
    <tr key={data._id}>

      <td>
        <Typography level="body-xs"> {truncateTaskName(data.task_name)}</Typography>
      </td>
      <td>

        <Typography level="body-xs">{formatDate(data.start_date)}</Typography>
      </td>
      <td>
        {data.team_id.map((team: any) => (
          <Typography key={team._id} level="body-xs">
            {team.team_name}
          </Typography>
        ))}

      </td>
      <td>
        <Typography level="body-xs">
          {data.isCompleted ? "completed" : data.isReviewed ? "reviewed" : data.isCreated ? "pending" : ""}
        </Typography>
      </td>

      <td>


        {data.employee_id.map((employee_id: any) => (
          <Typography key={employee_id._id} level="body-xs">
            {employee_id.first_name + " " + employee_id.last_name}
          </Typography>
        ))}


      </td>
      <td>

        <Typography level="body-xs">
          {data.assigned_by.map((assigned_by: any) => (
            <Typography key={assigned_by._id} level="body-xs">
              {assigned_by.first_name + " " + assigned_by.last_name}
            </Typography>
          ))}</Typography>


      </td>
      <td>

        <FlagRoundedIcon htmlColor={
          {
            urgent: '#d90429',
            high: '#ffba08',
            normal: '#0466c8',
            low: '#7d8597',
            no_priority: '#52b788',
          }[data.priority] as ColorPaletteProp
        } />

      </td>
    </tr>
  ))}


</tbody>
}

        

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
        {reportData.length > currentPage * pageSize && (
          <Button size="sm" variant="outlined" color="neutral" endDecorator={<KeyboardArrowRightIcon />} onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>


      {/* {(status === 'loading' || loading) && <LoadingsCircle />} */}

   {alerts && <Alerts
        title="Refresh page"
        icon={<ErrorOutlineOutlinedIcon />}
       description="Please refresh the page and try again to continue."
        color="warning"
      />}
    </React.Fragment>
  );
}