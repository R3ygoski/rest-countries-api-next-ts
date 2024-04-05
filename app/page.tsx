"use client"
// Components
import Cards from "./components/Cards"

// Hooks
import { useEffect, useState } from "react";

// API
import { getData } from './api/data.js'

// Context
import { useNavbarContext } from "./context/NavbarContext";

// Types
type searchCountry = {
  searchCountry: string;
  filterContinent: string;
}

export default function Home(): JSX.Element {

  const [country, setCountry] = useState([])
  const {searchCountry, filterContinent} = useNavbarContext() as searchCountry

  useEffect(()=>{
    if (searchCountry==''&&filterContinent=='Filter by Region'){
      // Return All Countries
      getData().then(countries=>setCountry(countries))
    } else if (searchCountry!=''){
      // Return Input Name Countries
      getData().then(countries=>{
        let countriesFiltered = countries.filter((filtered:any)=>{
          const filteredTarget = filtered.name.common.toLowerCase()
          return filteredTarget.includes(searchCountry.toLowerCase())
        })
        setCountry(countriesFiltered)
      })
    } else if (filterContinent!='Filter by Region'){
      // Return Menu Regions Countries
      getData().then(countries=>{
        let countriesFiltered = countries.filter((filtered:any)=>{
          const filteredTarget = filtered.region
          return filterContinent===filteredTarget
        })
        setCountry(countriesFiltered)
      })
    }
  },[searchCountry, filterContinent])

  return (
    <main className="flex flex-wrap justify-center py-16 px-28 gap-20 xl:justify-start xl:py-3 xl:px-20 xl:gap-x-[4.65rem] xl:gap-y-[5.25rem] dark:bg-dark-primary">
        {
          country.map((country: any, idx: number)=>{
            return <Cards key={idx} name={country.name.common} pops={country.population} region={country.region} capital={country.capital} img={country.flags.png} imgAlt={country.flags.alt} cca3={country.cca3}/>
          })
        }
    </main>
  );
}
