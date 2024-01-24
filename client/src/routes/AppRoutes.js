import React from 'react';
import Tasks from "../pages/Tasks/Tasks";
import CreateTask from "../pages/Tasks/CreateTask/CreateTask";
import Page404 from '../pages/Page404/Page404';
import { Routes, Route, Navigate } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/tasks" />}/>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/task/:id" element={<CreateTask />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AppRoutes;