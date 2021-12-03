import React, { useState } from 'react';
import '../App.css';
import MaterialTable from '@material-table/core';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Link } from '@material-ui/core';

const empList = [
    { id: 1, name: "Neeraj", email: 'neeraj@gmail.com', phone: 9876543210, status: 'underVerification', expEditAlert: "1" },
    { id: 2, name: "Raj", email: 'raj@gmail.com', phone: 9812345678, status: 'verifiedRestricted', expEditAlert: "1" },
    { id: 3, name: "David", email: 'david342@gmail.com', phone: 7896536289, status: 'suspended', expEditAlert: "0" },
    { id: 4, name: "Vikas", email: 'vikas75@gmail.com', phone: 9087654320, status: 'suspended', expEditAlert: "0" },
    { id: 5, name: "Neeraj", email: 'neeraj@gmail.com', phone: 9876543210, status: 'fullVerified', expEditAlert: "1" },
    { id: 6, name: "Raj", email: 'raj@gmail.com', phone: 9812345678, status: 'suspended', expEditAlert: "1" },
    { id: 7, name: "David", email: 'david342@gmail.com', phone: 7896536289, status: 'fullVerified', expEditAlert: "1" },
    { id: 8, name: "Vikas", email: 'vikas75@gmail.com', phone: 9187654321, status: 'fullVerified', expEditAlert: "1" },
    { id: 9, name: "Neeraj", email: 'neeraj@gmail.com', phone: 9876543210, status: 'suspended', expEditAlert: "0" },
    { id: 10, name: "Raj", email: 'raj@gmail.com', phone: 9812345678, status: 'verifiedRestricted', expEditAlert: "0" },
    { id: 11, name: "David", email: 'david342@gmail.com', phone: 7896536289, status: 'verifiedRestricted', expEditAlert: "0" },
    { id: 12, name: "Vikas", email: 'vikas75@gmail.com', phone: 9087654321, status: 'underVerification', expEditAlert: "0" },
]

function Table() {

    const [data, setData] = useState(empList);
    const columns = [
        { title: "ID", field: "id", editable: false, filtering: false },
        {
            title: "Name", field: "name",
            render: rowData => {

                return <Link target="_blank" href={'https://localhost:9000' + rowData.name}

                >
                    {rowData.name}
                </Link>
            },

        },
        { title: "Email", field: "email" },
        { title: "Phone Number", field: 'phone', },
        {
            title: "Status", field: "status",
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
                0: '-',
                1: 'mark verified'
            }
        },


    ]

    const tableIcons = {
        Edit: <Edit />,
        Delete: <DeleteOutline />
    }
    // Helper function
    function getNewDataBulkEdit(changes, copyData) {
        // key matches the column data id
        const keys = Object.keys(changes);
        for (let i = 0; i < keys.length; i++) {
            if (changes[keys[i]] && changes[keys[i]].newData) {
                // Find the data item with the same key in copyData[]
                let targetData = copyData.find((el) => el.id === keys[i]);
                if (targetData) {
                    let newTargetDataIndex = copyData.indexOf(targetData);
                    copyData[newTargetDataIndex] = changes[keys[i]].newData;
                }
            }
        }
        return copyData;
    }

    return (
        <MaterialTable
            data={data}
            columns={columns}
            options={{
                // ...
                exportMenu: [{
                    label: 'Export PDF',
                    exportFunc: (cols, datas) => ExportPdf(cols, datas, 'myPdfFileName')
                }, {
                    label: 'Export CSV',
                    exportFunc: (cols, datas) => ExportCsv(cols, datas, 'myCsvFileName')
                }],
                selection: true,
                filtering: true,
            }
            }
            icons={[
                tableIcons
            ]}


            editable={{
                onBulkUpdate: (changes) => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            let copyData = [...data];
                            setData(getNewDataBulkEdit(changes, copyData));
                            resolve();
                        }, 1000);
                    })
                },
                onRowAdd0led: (rowData) => console.log("Row adding 0led"),
                onRowUpdate0led: (rowData) => console.log("Row editing 0led"),
                // onRowAdd: (newData) => {

                //     return new Promise((resolve, reject) => {
                //         setTimeout(() => {
                //             newData.id = "uuid-" + Math.random() * 10000000;
                //             setData([...data, newData]);
                //             resolve();
                //         }, 1000);
                //     });
                // },
                onRowUpdate: (newData, oldData) => {
                    console.log(newData)
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            // In dataUpdate, find target
                            const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                            const index = dataUpdate.indexOf(target);
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            resolve();
                        }, 1000);
                    });
                },
                // onRowDelete: (oldData) => {
                //     return new Promise((resolve, reject) => {
                //         setTimeout(() => {
                //             const dataDelete = [...data];
                //             const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                //             const index = dataDelete.indexOf(target);
                //             dataDelete.splice(index, 1);
                //             setData([...dataDelete]);
                //             resolve();
                //         }, 1000);
                //     });
                // },
            }}
        />
    );
}

export default Table;