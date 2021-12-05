import { forwardRef } from 'react';
import React from 'react';
import MaterialTable from '@material-table/core';
import Edit from '@material-ui/icons/Edit';

import { ExportCsv, ExportPdf } from '@material-table/exporters';
import axiosInstance from '../util/axiosConfig'

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
                    render: (rowData) => {
                        return <div>{new Date(rowData?.createdAt).toLocaleDateString()}</div>
                    }

                },
                {
                    title: "Action Date", field: 'updatedAt', editable: false,
                    render: (rowData) => {
                        return <div>{new Date(rowData?.updatedAt).toLocaleDateString()}</div>
                    }
                },
                {
                    title: "Seeker", field: "from.firstname", editable: false,
                    render: (rowData) => {
                        return <div>{rowData.from?.firstname + " " + rowData.from?.lastname}</div>
                    }
                },
                {
                    title: "Advisor", field: "to.firstname", editable: false,
                    render: (rowData) => {
                        console.log(rowData);
                        return <div>{rowData.to?.firstname + " " + rowData.to?.lastname}</div>
                    }
                },
                {
                    title: "Payment",
                    field: "rowData.transaction.amount.amount",
                    editable: false,
                    render: (rowData) => {
                        return <div>
                            {rowData.transaction?.amount.amount / 100}
                        </div>
                    }
                },

                {
                    title: "Current State", field: "status",
                    lookup: {
                        'requested': "requested",
                        "declined": "declined",
                        "approved": "approved",
                        "cancelled": "cancelled"



                    }

                },
                {
                    title: "sendPayment",
                    field: "payment_id: ",
                },
            ],
            tableIcons: {
                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            }
        })

        console.log(this.state.fetchedData)
        axiosInstance.get('/sessions/findall').then(res => {
            const sessionData = res.data;

            this.setState({ fetchedData: sessionData })
        })
    }

    // Helper function
    handleClick = () => {
        this.componentDidMount()
    };

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
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'sesssion')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'sesssion')
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
                                this.setState({ fetchedData: dataUpdate })

                                axiosInstance.post('/session/' + oldData._id, newData)
                                    .then(res => {
                                        this.setState({ fetchedData: dataUpdate })

                                        resolve();
                                    })
                                    .catch(err => {
                                        console.log(err);
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