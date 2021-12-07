import { forwardRef } from 'react';
import React from 'react';
import MaterialTable from '@material-table/core';
import Edit from '@material-ui/icons/Edit';

import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Link } from '@material-ui/core';
import axiosInstance from '../util/axiosConfig'

import { toast } from 'react-toastify';




class UserTable extends React.Component {
    state = {
        columns: [],
        fetchedData: [],
        tableIcons: []
    };
    componentDidMount() {
        this.setState({
            columns: [
                // {
                //     title: "ID", field: "_id", editable: false, filtering: false,
                //     width: "3%",
                // },
                {
                    title: "Created", field: "createdAt", editable: false,
                    render: (rowData) => {
                        return <div>{new Date(rowData?.createdAt).toLocaleDateString()}</div>
                    }

                },
                {
                    title: "Name", field: "name",
                    editable: false,
                    render: rowData => {
                        return <Link target="_blank" href={'https://localhost:9000' + rowData._id}>
                            {rowData.firstname + " " + rowData.lastname}
                        </Link>
                    },

                },
                {
                    title: "linkedin", field: "linkedin_profile",
                    render: rowData => {

                        return <Link target="_blank" href={rowData.linkedin_profile}>
                            {rowData.linkedin_profile}
                        </Link>
                    },

                },
                { title: "Email", field: "email", editable: false, },
                {
                    title: "Phone", field: 'phone_number',
                },
                {
                    title: "Status", field: "profile_status",
                    lookup: {
                        'underVerification': 'under verification',
                        'verifiedRestricted': 'verified Restricted',
                        'fullVerified': 'full verified',
                        'suspended': 'Suspended'
                    }
                }, {
                    title: "Exp. Edit Alert",
                    field: "expEditAlert",
                    lookup: {
                        0: 'Experince Edited',
                        1: 'mark verified'
                    }
                },
            ],
            tableIcons: {
                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            }
        })

        console.log(this.state.fetchedData)
        axiosInstance.get('/admin/user/findall', {
            headers: {
                "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null}`
            }
        }).then(res => {
            const user = res.data;
            this.setState({ fetchedData: user })
        })
    }

    // Helper function
    handleClick = () => {
        this.componentDidMount()
    };

    success = () => toast.success('Update successfully', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    error = () => toast.error('Failed to update!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    render() {
        return (
            <>
                <MaterialTable
                    data={this.state.fetchedData}
                    columns={this.state.columns}
                    title={"Manage User"}
                    options={{
                        // ...
                        exportMenu: [{
                            label: 'Export PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'user')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'user')
                        }],
                        paging: true,
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 50, 100, this.state?.fetchedData?.length],
                        selection: true,
                        filtering: true,
                        grouping: true,
                        searching: true,
                        sorting: true,
                        emptyRowsWhenPaging: false,
                        // this will we used for sorting by created date 
                        // customSort: (a, b) => a.name.length - b.name.length 

                    }
                    }
                    icons={this.state.columnstableIcons}
                    editable={{
                        onRowAdd0led: (rowData) => console.log("Row adding 0led"),
                        onRowUpdate0led: (rowData) => console.log("Row editing 0led"),

                        onRowUpdate: (newData, oldData) => {
                            return new Promise(async (resolve, reject) => {
                                const dataUpdate = [...this.state.fetchedData];
                                const target = dataUpdate.find((el) => el._id === oldData.tableData._id);
                                const index = dataUpdate.indexOf(target);
                                dataUpdate[index] = newData;


                                axiosInstance.post('/admin/user/' + oldData._id, newData, {
                                    headers: {
                                        "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null}`
                                    }
                                })
                                    .then(res => {


                                        console.log(res);
                                        this.setState({ fetchedData: dataUpdate })
                                        this.success()
                                        resolve();
                                    })
                                    .catch(err => {

                                        if (parseInt(err.response.status) === 401) {

                                            window.localStorage.removeItem('wizegridAdminToken')
                                            window.location.href = "/"
                                        }
                                        this.error();
                                        reject()
                                    })
                                    .finally(_ => {
                                        this.handleClick()
                                    })


                            });
                        },

                    }}
                />

            </>
        )
    };
}

export default UserTable;