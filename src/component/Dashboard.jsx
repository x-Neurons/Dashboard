import React, { useState, useEffect } from 'react'
import ChartComponent from './Chart'
import Table from './Table'
import axios from 'axios'
import CountdownTimer from './CountdownTimer'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const api = 'https://fakestoreapi.com/products';

    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(api)
                setProducts(response.data)

            } catch (error) {
                console.log("data not fetched", error);
            }
        }

        fetchApi()

    }, []);

    useEffect(() => {
        const checkAccessToken = () => {
          const expiresAt = parseInt(localStorage.getItem('expiresAt'), 10); // Retrieve and parse expiration time from localStorage
          const now = Math.floor(new Date().getTime() / 1000); // Get current time in seconds
    
          if (expiresAt > now) {
            const timeLeft = expiresAt - now; // Calculate remaining time
            console.log("Time Pending: " + Math.floor(timeLeft / 60) + " minutes " + (timeLeft % 60) + " seconds");
          } else {
            console.log("Token expired. Logging out.");
            navigate('/login');
          }
        };
    
        checkAccessToken(); // Check immediately on mount
        const intervalId = setInterval(checkAccessToken, 1000); // Check every second
    
        return () => clearInterval(intervalId); // Clean up interval on unmount
      }, [navigate]);
      
    return (
        <div className='mt-20 mx-auto'>
                <CountdownTimer />
            <div className='md:block mx-auto items-center sm:block'>
                <ChartComponent products={products} />
                <Table products={products} />
            </div>
        </div>
    )
}

export default Dashboard
