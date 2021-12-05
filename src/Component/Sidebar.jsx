import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css'
function Sidebar() {
    return (
        <div class="sidenav">
            <NavLink activeStyle={{
                fontWeight: "bold",
                color: '#03045e',
                backgroundColor: "#ffb703"
            }}
                to="/manageusers">Manage User</NavLink>


            <NavLink activeStyle={{
                fontWeight: "bold",
                color: '#03045e',
                backgroundColor: "#ffb703"
            }} to="/managesessios">Manage Session</NavLink>


            <NavLink activeStyle={{
                fontWeight: "bold",
                color: '#03045e',
                backgroundColor: "#ffb703"
            }} to="/manageconfig">Manage Configuration</NavLink>

        </div>
    );
}

export default Sidebar;