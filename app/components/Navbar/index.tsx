"use client"
// Context
import { useNavbarContext } from "@/app/context/NavbarContext";

// Next Components
import Link from "next/link";

// Hooks
import { usePathname } from "next/navigation";
import { useState } from "react";

// Icons
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowRoundBack } from "react-icons/io";

// Styles
const liStyle = "text-2xl font-semibold xl:text-sm xl:font-light cursor-pointer"

// Types
type NavbarContextShape = {
    searchCountry: string;
    setSearchCountry: (country: string) => void;
    filterContinent: string;
    setFilterContinent: (country: string) => void;
}

export default function Navbar({functionInput}: any){

    const pathname = usePathname()
    const [openMenu, setOpenMenu] = useState(false)
    const {searchCountry, setSearchCountry, filterContinent, setFilterContinent} = useNavbarContext() as NavbarContextShape

    const clickHandler = (): void => {
        setOpenMenu(!openMenu)
    }
    const changeHandler = (e:any): void => {
        setSearchCountry(e.target.value)
        setFilterContinent('Filter by Region')
    }

    const filterContinentHandler = (continent: string): void => {
        setFilterContinent(continent)
        setSearchCountry('')
    }

    return (
        <nav className="flex flex-wrap justify-between items-start xl:items-center h-[15rem] px-8 mt-12 xl:h-32 xl:px-20 xl:mt-3 dark:bg-dark-primary">
            { pathname == '/'?
            <>
                <div className="relative w-full rounded-md shadow-md xl:w-[478px]">
                    <FaMagnifyingGlass className="absolute bottom-4 left-3 text-lg sm:bottom-9 sm:left-16 sm:text-3xl xl:bottom-5 xl:left-8 xl:text-base text-light-secondary dark:text-dark-text"/>
                    <input className="h-12 w-full rounded-md pl-12 text-base sm:h-24 sm:w-full sm:pl-36 sm:text-2xl xl:h-14 xl:pl-20 xl:text-base dark:bg-dark-secondary dark:text-dark-text" type="text" placeholder="Search for a country..." onChange={changeHandler} value={searchCountry}/>
                </div>
                <div className="flex justify-between items-center relative self-end h-12 w-full px-12 rounded-md shadow-md sm:w-96 sm:h-24 xl:self-center xl:h-14 xl:w-auto xl:px-4 xl:gap-4 dark:bg-dark-secondary dark:text-dark-text" 
                onClick={clickHandler}>
                    <p className="w-40 font-semibold text-xl xl:text-base">{filterContinent}</p>
                    {openMenu? 
                    <>
                        <IoIosArrowUp/>
                        <ul role="menu" aria-label="Filter by Region" className="flex flex-col gap-5 absolute top-[7rem] left-0 w-full pl-12 py-8 rounded-md shadow-md sm:top-[6rem] sm:py-4 xl:top-[4.5rem] xl:pl-2 xl:py-2 xl:gap-2 bg-light-primary dark:bg-dark-secondary dark:text-dark-text">
                            <li className={liStyle} onClick={()=>{filterContinentHandler('Africa')}}>Africa</li>
                            <li className={liStyle} onClick={()=>{filterContinentHandler('Americas')}}>America</li>
                            <li className={liStyle} onClick={()=>{filterContinentHandler('Asia')}}>Asia</li>
                            <li className={liStyle} onClick={()=>{filterContinentHandler('Europe')}}>Europe</li>
                            <li className={liStyle} onClick={()=>{filterContinentHandler('Oceania')}}>Oceania</li>
                        </ul>
                    </>
                    :
                    <>
                        <IoIosArrowDown/>
                        <ul className="hidden">
                        </ul>
                    </>
                    }
                    
                </div>
            </>
            :
            <>
                <Link role="button" href="/" className="flex justify-center items-center w-52 h-16 mt-8 ml-6 gap-4 text-3xl font-light shadow-md rounded-lg dark:bg-dark-secondary dark:text-dark-text xl:text-2xl">
                    <IoIosArrowRoundBack/>
                    Back
                </Link>
            </>
            }
        </nav>
    )
}
