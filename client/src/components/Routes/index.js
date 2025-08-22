// src/components/Routes/index.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import ManageRessources from '../../pages/ManageRessources';
import Notifications from '../../pages/Notifications';
import ManageEvents from '../../pages/ManageEvents';
import Toolbar from '../../pages/Toolbar';
import Log from '../log/index';


const Index = () => {
    return (
        <Router>
            <Toolbar />
            <Routes>
                <Route path="/log" element={<Log/>} />
                <Route path="/ressources" element={<ManageRessources />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/events" element={<ManageEvents />} />
                <Route path="*" element={<Navigate to="/" />} />
                
            </Routes>
        </Router>
    );
};

export default Index;