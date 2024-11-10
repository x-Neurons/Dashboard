import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogged, setIsLogged] = useState()
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log("email:", email, "-->", "password", password);
        authenticate();
    }

    const authenticate = async () => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username: email,
                password: password,
                expiresInMins: 1,
                RefreshExpiresInMins: 2,
            })


            if (response) {
                setIsLogged(true)
                console.log("User Logged in", response);

                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000);

                const expiresInMins = 1
                const expiresInSecs = expiresInMins * 60; // Convert minutes to seconds
                const expiresAt = Math.floor(new Date().getTime() / 1000) + expiresInSecs;

                const RefreshExpiresInMins = 2
                const RefreshExpiresInSecs = expiresInMins * 60; // Convert minutes to seconds
                const RefreshExpiresAt = Math.floor(new Date().getTime() / 1000) + expiresInSecs;

                const { token, refreshToken } = response.data

                localStorage.setItem('token', token)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('expiresAt', expiresAt)



                console.log("token", localStorage.getItem('token'));
                console.log("Refresh token", localStorage.getItem('refreshToken'));
                console.log("ExpiresAt", localStorage.getItem('expiresAt'));
                console.log("RefreshExpiresAt", localStorage.getItem('RefreshExpiresAt'));


                const expirationDate = new Date(expiresAt * 1000); // Convert seconds to milliseconds
                console.log("Readable Token Expiration Date:", expirationDate.toLocaleString());

                const RefreshExpirationDate = new Date(expiresAt * 1000); // Convert seconds to milliseconds
                console.log("Readable Refresh Token Expiration Date:", RefreshExpirationDate.toLocaleString());
            }
        } catch (error) {
            setIsLogged(false)
            console.error("User Not Authenticated", error);
        }

    }

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('https://dummyjson.com/auth/refresh', {
                refreshToken: refreshToken
            });

            const newToken = response.data.token;
            const expiresInSecs = 1 * 60; // New access token expiration time
            const currentTime = Math.floor(new Date().getTime() / 1000);
            const newExpiresAt = currentTime + expiresInSecs;

            localStorage.setItem('token', newToken);
            localStorage.setItem('expiresAt', newExpiresAt);

            const tokenRefreshEvent = new Event('tokenRefreshed');
            window.dispatchEvent(tokenRefreshEvent);

            console.log("New access token:", newToken);
            console.log("New expiration time:", new Date(newExpiresAt * 1000).toLocaleString());

            // Reschedule the next token refresh
            checkTokenExpiration();
        } catch (error) {
            console.error("Failed to refresh access token:", error);
        }
    };

    const checkTokenExpiration = () => {
        const expiresAt = parseInt(localStorage.getItem('expiresAt'), 10);
        const currentTime = Math.floor(new Date().getTime() / 1000);

        const timeUntilExpiration = expiresAt - currentTime;

        if (timeUntilExpiration <= 0) {
            refreshAccessToken(); // Refresh immediately if expired
        } else {
            // Schedule the refresh a few seconds before expiration
            setTimeout(refreshAccessToken, (timeUntilExpiration - 5) * 1000);
        }
    };

    useEffect(() => {
        if (isLogged) {
            checkTokenExpiration(); // Start token expiration check once logged in
        }
    }, [isLogged]);

    return (
        <div className='bg-black h-screen -mt-5 dark'>
            <h1 className='text-white text-3xl pt-32 pb-10 text-center'>LOGIN</h1>
            <div className='flex justify-center items-center '>
                <form className="max-w-sm  w-11/12" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="username" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <button type="submit" className="text-white  bg-blue-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>

            {
                isLogged === true ? (<div id="alert-border-3" className="flex items-center w-1/2 md:w-1/5 m-auto p-4 mt-8 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 text-sm font-medium ">
                        Login Successful.
                    </div>
                </div>
                ) : isLogged === false ? (<div id="alert-border-2" className="flex items-center w-1/2 md:w-1/5 m-auto p-4 mt-8 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 text-sm font-medium">
                        Login Failed.
                    </div>
                </div>
                ) : null
            }


        </div>
    )
}

export default Login
