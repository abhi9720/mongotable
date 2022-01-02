import { forwardRef } from 'react';
import React from 'react';
import MaterialTable from '@material-table/core';
import Edit from '@material-ui/icons/Edit';

import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Link } from '@material-ui/core';
import axiosInstance from '../util/axiosConfig'
import { FRONTEND_URL } from '../constant';
import { toast } from 'react-toastify';
import moment from 'moment';




class UserTable extends React.Component {
    state = {
        columns: [],
        fetchedData: [],
        tableIcons: []
    };
    componentDidMount() {
        this.setState({
            columns: [
                {
                    title: "ID", field: "_id", editable: false, filtering: false,
                    width: "3%",
                    render: rowData => {
                        return <Link target="_blank" href={"/profile/" + rowData._id}>
                            {rowData._id}
                        </Link>
                    },
                },
                {
                    title: "Created", field: "createdAt", editable: false,
                    render: rowData => moment(rowData?.createdAt).format('DD/MM/YYYY')
                },
                {
                    title: "Name", field: "firstname",
                    editable: false,
                    render: rowData => {
                        return <Link target="_blank" href={FRONTEND_URL + "profile/view/" + rowData._id}>
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
                        'verifiedFullAccess': 'full verified',
                        'suspendedPre': 'Suspended Pre-verification',
                        'suspendedPost': 'Suspended Post-verification'
                    }
                }, {
                    title: "Exp. Edit Alert",
                    field: "isExpEdited",
                    lookup: {
                        true: 'Experience Edited',
                        false: 'verified'
                    }
                },
            ],
            tableIcons: {
                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            }
        })


        axiosInstance.get('/admin/user/findall', {
            headers: {
                "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null}`
            }
        }).then(res => {
            const user = res.data;
            this.setState({ fetchedData: user })
        })
            .catch(err => {
                if (parseInt(err.response?.status) === 403) {
                    window.localStorage.removeItem('wizegridAdminToken')
                    window.location.href = "/"
                }

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
                        // selection: true,
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


                                const url = '/admin/user/' + oldData._id + `/?prev=${oldData?.profile_status}&new=${newData.profile_status}`

                                const dataUpdate = [...this.state.fetchedData];
                                const target = dataUpdate.find((el) => el._id === oldData.tableData._id);
                                const index = dataUpdate.indexOf(target);
                                dataUpdate[index] = newData;
                                console.log(newData);

                                axiosInstance.post(url, newData, {
                                    headers: {
                                        "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null}`
                                    }
                                })
                                    .then(res => {



                                        this.setState({ fetchedData: dataUpdate })
                                        this.success()
                                        resolve();
                                    })
                                    .catch(err => {

                                        if (parseInt(err.response?.status) === 401) {

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