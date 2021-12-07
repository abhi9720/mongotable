import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axiosInstance from '../util/axiosConfig';
import './pagestyle.css';

async function loginUser(credentials) {


    const userlogindata =
    {
        identifier: credentials.username,
        password: credentials.password
    }
    console.log(userlogindata);
    try {
        const res = await axiosInstance.post('/auth/login', userlogindata)

        if (res.data?.user?.internaladmin) {
            return (res.data.jwt);
        }
        else {
            alert("You land on incorrect page go back ")
            return null;
        }
    }
    catch (err) {
        window.location.href = "/"
    }





    // return data

    //     return axiosInstance.post('/login', { body: JSON.stringify(credentials) })
    //         .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <div className="login-wrapper">
            <div className="input_container">
                <h5>Please Log In</h5>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>

                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            type="submit"
                            style={
                                {
                                    marginTop: '20px'
                                }
                            }
                        >
                            Login
                        </Button>


                    </div>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}