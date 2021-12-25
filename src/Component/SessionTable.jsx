import { forwardRef } from 'react';
import React from 'react';
import MaterialTable from '@material-table/core';
import Edit from '@material-ui/icons/Edit';
import './sidebar.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import moment from 'moment'


import { ExportCsv, ExportPdf } from '@material-table/exporters';
import axiosInstance from '../util/axiosConfig'

import { toast } from 'react-toastify';


class SessionTable extends React.Component {
    state = {
        columns: [],
        fetchedData: [],
        tableIcons: [],
    };


    componentDidMount() {
        this.setState({
            columns: [
                {
                    title: "SI No", field: "_id",
                    editable: false,

                },
                {
                    title: "Created", field: "createdAt", editable: false,
                    render: rowData => moment(rowData?.createdAt).format('DD/MM/YYYY')



                },
                {
                    title: "Action Date", field: 'updatedAt', editable: false,
                    render: rowData => moment(rowData?.updatedAt).format('DD/MM/YYYY')

                },
                {
                    title: "Seeker", field: "from.firstname", editable: false,

                    render: function (data, type, row) {
                        return data.from?.firstname + ' ' + data.from?.lastname;
                    }
                    // render: (rowData) => {
                    //     return <div>{rowData.from?.firstname + " " + rowData.from?.lastname}</div>
                    // }
                },
                {
                    title: "Advisor", field: "to.firstname", editable: false,

                    render: function (data, type, row) {
                        return data.to?.firstname + ' ' + data.to?.lastname
                    }
                },
                {
                    title: "Payment",
                    field: "transaction.amount.amount",
                    editable: false,
                    render: function (data, type, row) {
                        return data.transaction?.amount.amount / 100
                    }
                },
                {
                    title: "Current State", field: "status",
                    lookup: {
                        'completed': "Completed",
                        'abandoned': "Abandoned",
                        'declined': "Declined",
                        'approved': "Approved",
                        'cancelled': "Cancelled"
                    }
                },
                {
                    title: "Due Date",
                    field: "dueDate",
                    editable: false,


                    render: rowData => String(moment(rowData.dueDate).format('DD/MM/YYYY'))




                },
            ],
            tableIcons: {
                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            }
        })


        axiosInstance.get('/admin/sessions/findall', {
            headers: {
                "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null}`
            }
        }).then(res => {
            const sessionData = res.data;
            this.setState({ fetchedData: sessionData })
        })
    }

    // Helper function
    handleClick = () => {
        this.componentDidMount()
    };

    success = () => toast.success('Update Successfully', {
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

                    detailPanel={rowData => {
                        const data = rowData.rowData.AmountPaid
                        console.log(rowData)
                        console.log(data)
                        return (

                            <div style={{ padding: "50px", backgroundColor: "#e8eaf5" }} >

                                <table>
                                    <tr>
                                        <th>Session Booked Fee</th>
                                        <th>NetAmount</th>
                                        <th>charityAmount</th>
                                        <th>WizegridCommission</th>
                                        <th>PaymentProcessorFee</th>
                                    </tr>
                                    <tr>
                                        <th>{rowData.rowData.transaction?.amount?.amount / 100 || null}</th>
                                        <th>{data.NetAmount || null}</th>
                                        <th>{data.charityAmount}</th>
                                        <th>{data.WizegridCommission || null}</th>
                                        <th>{data.PaymentProcessorFee || null}</th>

                                    </tr>
                                </table>


                            </div>
                        )
                    }}
                    actions={[
                        rowData => ({
                            disabled: rowData.status === 'completed' || rowData.status !== 'approved',
                            icon: () =>
                                rowData.status === 'completed' ? <DoneAllIcon /> :
                                    <CheckCircleIcon />,
                            tooltip: rowData.status === 'completed' ? "Payment Done" : "Mark Payment Done",

                            onClick: (event, rowData) => {
                                console.log(event);
                                axiosInstance.post("/admin/sessions/markpaid/" + rowData._id, {
                                    headers: {
                                        "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null} `
                                    }
                                }).then(res => {


                                    const dataUpdate = [...this.state.fetchedData];
                                    const target = dataUpdate.find((el) => el._id === rowData._id);
                                    const index = dataUpdate.indexOf(target);
                                    dataUpdate[index].status = "completed";
                                    this.setState({ fetchedData: dataUpdate })
                                    this.success();
                                })
                                    .catch(err => {
                                        this.error();
                                        console.dir(err);
                                    })

                            }

                        })
                    ]}



                    title={"Manage User"}
                    options={{
                        exportMenu: [{
                            label: 'Export PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'sesssion')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'sesssion')
                        }],
                        paging: true,
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 50, 100, this.state?.fetchedData?.length],
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


                                axiosInstance.post('/admin/session/' + oldData._id, newData, {
                                    headers: {
                                        "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null} `
                                    }
                                })
                                    .then(res => {
                                        this.setState({ fetchedData: dataUpdate })
                                        this.success()
                                        resolve();
                                    })
                                    .catch(err => {
                                        if (parseInt(err.response?.status) === 401) {
                                            console.log('removing token ');
                                            window.localStorage.removeItem('wizegridAdminToken')
                                            window.location.href = "/"
                                        }
                                        console.log(err);
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

export default SessionTable;