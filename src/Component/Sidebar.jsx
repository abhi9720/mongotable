import { Button } from '@material-ui/core';
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


            <NavLink

                activeStyle={{
                    fontWeight: "bold",
                    color: '#03045e',
                    backgroundColor: "#ffb703"
                }} to="/managesessios">Manage Session</NavLink>


            <NavLink activeStyle={{
                fontWeight: "bold",
                color: '#03045e',
                backgroundColor: "#ffb703"
            }} to="/manageconfig">Manage Configuration</NavLink>

            <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ position: "absolute", right: "5%" }}
                onClick={() => {
                    window.localStorage.removeItem('wizegridAdminToken')
                    window.location.href = "/"
                }}
            >
                Logout
            </Button>
        </div>
    );
}

export default Sidebar;