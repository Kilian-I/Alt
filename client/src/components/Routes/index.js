// src/components/Routes/index.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Redirect } from 'react-router-dom';


import Home from '../../pages/Home';
import ManageRessources from '../../pages/ManageRessources';
import Notifications from '../../pages/Notifications';
import ManageEvents from '../../pages/ManageEvents';

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ressources" element={<ManageRessources />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/events" element={<ManageEvents />} />
                <Route path="*" element={<Navigate to="/" />} />
               
                
            </Routes>
        </Router>
    );
};

export default Index;