import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import pageSlice from './slice/pageSlice';
import taskSlice from './slice/taskSlice';
import UserDetails from './slice/UserDetails';
import logoutSlice from './slice/logoutSlice';
import tasksReportSlice from './slice/taskReportSlice';
import teamsReducer from './slice/teamsSlice';
import teamInfroSlic from './slice/teamInfroSlic';
const store = configureStore({
  reducer: {

    user:userSlice,
    page:pageSlice,
    tasks: taskSlice,
    userdetails:UserDetails,
    logout:logoutSlice,
    tasksreport:tasksReportSlice,
    teams: teamsReducer,
    teaminfo:teamInfroSlic
  },
});


export default store;
