import { Button } from '@material-ui/core'
import React from 'react'

import SessionTable from '../Component/SessionTable'



let items = [
    {
        name: 'fred',
        email: 'fred@somewhere',
        amount: 1.02,
    },
    {
        name: 'jo',
        email: 'jo@somewhere',
        amount: 1.02,
    },
    {
        name: 'jo with a comma,',
        email: 'jo@somewhere',
        amount: 1.02,
    },
    {
        name: 'jo with a quote"',
        email: 'jo@somewhere',
        amount: 1.02,
    }]



export default function ManageSession() {
    return (
        <>



            <SessionTable />
        </>
    )
}
