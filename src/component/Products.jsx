import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Products = () => {
    const api = 'https://fakestoreapi.com/products';

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(api)
                setProducts(response.data)
                console.log("Data Successfully fetched");
                console.log(response);

            } catch (error) {
                console.log("data not fetched", error);
            }
        }

        fetchApi()

    }, []);


    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the index, and if it exceeds the array length, start from 0
            setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 2000);

        return () => clearInterval(interval); // Clean up on unmount
    }, [products.length]);

    return (
        <div className='dark mt-28'>
            {/* Carousel wrapper */}
            <div id="controls-carousel" className="relative w-full " data-carousel="static">
                {products.map((product, index) => (
                    <div key={product.id} className={`relative h-56 overflow-hidden rounded-lg md:h-96 ${activeIndex === index ? '' : 'hidden'}`}>
                        {/* Carousel Item */}
                        <div className="duration-700 ease-in-out" data-carousel-item>
                            <img src={product.image} className="absolute block w-full h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={product.name} />
                        </div>
                    </div>
                ))}

                {/* Slider controls */}
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={() => setActiveIndex((activeIndex - 1 + products.length) % products.length)}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={() => setActiveIndex((activeIndex + 1) % products.length)}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
            <div className='pt-20 dark bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

                {products.map((product) => (
                    <div key={product.id} className="w-11/12 h-full max-w-sm bg-white border border-gray-200 hover:opacity-90 hover:bg-black 
                 shadow dark:bg-gray-600 dark:border-gray-700 mx-auto overflow-hidden text-ellipsis whitespace-nowrap">
                        <a href="#">
                            <img className="p-8 rounded-t-lg h-2/3 w-full hover:ease-out hover:duration-300 hover:-translate-y-1 hover:scale-110 hover:skew-y-2" src={product.image} alt="product image" />
                        </a>
                        <div className="px-5 pb-5">
                            <a href="#">
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                            </a>
                            <div className="flex items-center mt-2.5 mb-5">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 
                            py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 hover:bg-yellow-500 hover:-translate-y-1 hover:scale-110 duration-300
                            hover:cursor-pointer hover:text-white">Rating {product.rating.rate}</span>
                            </div>
                            <div className="flex items-center justify-between w-full mb-0">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white items-">${product.price}</span>
                                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800 
                            hover:-translate-y-1 hover:scale-110 duration-300 ">Add to cart</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <footer className="bg-white  shadow dark:bg-gray-900 mt-2">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">APEX Store</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
                </div>
            </footer>

        </div>
    )
}

export default Products
