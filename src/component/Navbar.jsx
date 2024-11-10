import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';



const Navbar = ({ toggleDrawer }) => {

    const location = useLocation()

    const isProductsPage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isDashboardPage = location.pathname === '/dashboard';
    
    return (
        <div className='dark mt-20 bg-blue-300'>


            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {isProductsPage && (
                        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">APEX Store</span>
                        </a>
                    )}
                    {!isProductsPage && (
                        <a className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DashBoard</span>
                            <button className="  text-white bg-blue-700 dark: hover:bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-300" type="button" data-drawer-target="drawer-navigation"
                                onClick={toggleDrawer}
                                aria-controls="drawer-navigation">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </a>
                    )}
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">


                        {isProductsPage && (

                            <a href='/login'><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-red-700 ">Log In DashBoard
                            </button></a>
                        )}
                        {isDashboardPage && (
                            <a href='/login'><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-red-700 ">Log Out
                            </button></a>
                        )}

                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>


                    </div>
                    <div className=" items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {isProductsPage && (
                                <li>
                                    <form className="max-w-md"
                                    // onSubmit={handleSubmit}
                                    >
                                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                        <div className="relative border w-full">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input type="search" id="" className="block w-full p-4 ps-10 text-sm lg:w-96 dark:bg-gray-700 dark:border-gra-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-00" placeholder="Search" required />

                                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Search</button>
                                        </div>
                                    </form>
                                </li>
                            )}


                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
