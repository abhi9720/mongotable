import React from 'react';
import './sidebar.css'
function Sidebar() {
    return (
        <div class="sidenav">
            <a href="#manageusers">Manage User</a>
            <a href="#managesessios">Manage Session</a>
            <a href="#manageconfig">Manage Configuration</a>

        </div>
    );
}

export default Sidebar;