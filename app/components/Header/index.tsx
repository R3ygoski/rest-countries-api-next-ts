"use client"
// Hooks
import { useState, useEffect } from 'react';

// Icons
import {BsMoon, BsMoonFill} from 'react-icons/bs'

const toggleThemeLoad = ():void => {
    const pageClass = document.documentElement.classList;
    pageClass.toggle('dark')
}

export default function Header(){
    
    const [darkTheme, setDarkTheme] = useState(false)
    
    useEffect(()=>{
        const pageTheme = document.documentElement.classList.value
        if (pageTheme === 'dark') {
            setDarkTheme(true)
        }
    }, [])

    const toggleTheme = () => {
        setDarkTheme(!darkTheme)
    }

    return (
        <header className='flex justify-between items-center px-2 h-24 shadow-md sm:px-8 sm:h-40 xl:h-20 xl:px-20 dark:bg-dark-secondary dark:text-dark-text'>
            <h1 className='text-base font-bold sm:text-3xl xl:text-2xl'>Where in the world?</h1>
            <div className='flex h-2/6 items-center cursor-pointer' onClick={()=>{
                toggleThemeLoad()
                toggleTheme()}
                }>
                {
                darkTheme?
                    <>
                        <BsMoonFill className='mr-2 text-lg sm:text-3xl xl:text-lg'/>
                    </>
                    :
                    <>
                        <BsMoon className='mr-2 text-lg sm:text-3xl xl:text-lg'/>
                    </>
                }
                <p className='text-base font-semibold sm:text-2xl xl:text-lg'>Dark Mode</p>
            </div>
        </header>
    )
}