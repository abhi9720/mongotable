import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('wizegridAdminToken');

        const userToken = JSON.parse(tokenString);
        console.log(userToken);
        return userToken
    };


    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        if (!userToken) {
            return
        }
        localStorage.setItem('wizegridAdminToken', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}