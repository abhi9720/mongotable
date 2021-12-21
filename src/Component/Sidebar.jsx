import { Button } from '@material-ui/core';

import './sidebar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';





const { CSVLink } = require('react-csv')


const headers = [
    { label: "First Name", key: "name" },
    {
        label: "Account Number", key: "accountno"
    }, {
        label: "IFSC Code", key: "ifsc"
    }, {
        label: "Amount", key: "amount"
    }


];


class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.csvLinkEl = React.createRef();
    }


    getUserList = () => {
        return fetch('http://localhost:5000/api/v1/admin/duepayments')
            .then(res => res.json()).then(jsondata => {

                let MappedData = jsondata.map(session => {

                    return {
                        name: session.to?.firstname + " " + session.to?.lastName,
                        accountno: session.to?.bank_account?.account_number || 'N/A',
                        ifsc: session.to?.bank_account?.ifsc_code || 'N/A',
                        amount: session.transaction?.amount?.amount / 100
                    }
                })

                return MappedData

            })
    }


    downloadReport = async () => {
        this.getUserList()
            .then(response => {

                this.setState({ data: response }, () => {
                    setTimeout(() => {
                        this.csvLinkEl.current.link.click();
                    }, 1000);
                });
            })
            .catch(err => {
                console.log("err");
                alert("Some Error happens ")
            })


    }

    render() {
        const { data } = this.state;
        return (
            <div className="sidenav">


                <CSVLink
                    headers={headers}
                    filename="payemnt.csv"
                    data={data}
                    ref={this.csvLinkEl}
                    style={{
                        display: "none"
                    }}
                />


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
                }} to="/manageconfig">
                    Manage Configuration</NavLink>

                <Button
                    variant="contained"
                    style={{ marginLeft: "10px" }}
                    color="secondary"
                    startIcon={<downloadDuePaymentCSV />}
                    onClick={this.downloadReport}
                >
                    Due Payment
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                        window.localStorage.removeItem('wizegridAdminToken')
                        window.location.href = "/"
                    }}
                >
                    Logout
                </Button>
            </div>
        )
    }
}

export default Sidebar;