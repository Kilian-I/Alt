import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Toolbar.css';

const Toolbar = () => {
    return (
        <nav className="toolbar">
            <div>
            </div>
            <div className="toolbar-links">
                <NavLink to="/ressources" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Manage Ressources
                </NavLink>
                <NavLink to="/events" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Manage Events
                </NavLink>
                <NavLink to="/notifications" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Notifications
                </NavLink>
            </div>
            <div>
            </div>
            <div>
            </div>
        </nav>
    );
};

export default Toolbar;
