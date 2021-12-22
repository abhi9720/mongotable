import { forwardRef } from 'react';
import React from 'react';
import MaterialTable from '@material-table/core';
import Edit from '@material-ui/icons/Edit';

import { ExportCsv, ExportPdf } from '@material-table/exporters';
import axiosInstance from '../util/axiosConfig'
import { toast } from 'react-toastify';
class ConfigTable extends React.Component {
    state = {
        columns: [],
        fetchedData: [],
        tableIcons: [],
    };


    componentDidMount() {
        this.setState({
            columns: [
                {
                    title: "Key", field: "key",
                    editable: false,

                },

                {
                    title: "Value",
                    field: "value",
                },
            ],
            tableIcons: {
                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            }
        })


        axiosInstance.get('/admin/get-env', {
            headers: {
                "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null}`
            }
        }).then(res => {
            const envData = res.data;
            console.log(envData)
            this.setState({ fetchedData: envData })
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
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'config')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'config')
                        }],

                        pageSize: 10,
                        pageSizeOptions: [10, 20, this.state?.fetchedData?.length],
                        filtering: true,
                        grouping: true,
                        searching: true,
                        sorting: true,
                        emptyRowsWhenPaging: false,


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

                                const url = "/admin/edit-env"

                                const data = {
                                    key: newData.key,
                                    value: newData.value
                                }

                                axiosInstance.post(url, data, {
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

export default ConfigTable;