// Fetch Data
import { getData } from "@/app/api/data"
import CountryInfo from "@/app/components/CountryInfo"

// Next Components
import Image from "next/image"
import Link from "next/link"
import { CgFlagAlt } from "react-icons/cg"


export default async function Country({params}:any){
    
    // State
    const countries = await getData(params.country)
    const selectedCountry = countries as any
    
    if (selectedCountry[0]){
        // Pops Converted
        let convertedPops = selectedCountry[0].population.toLocaleString()

        // Native Name
        let nativeNameRight
        let nativeNames = selectedCountry[0].name.nativeName
        if (selectedCountry[0].name.hasOwnProperty('native')){
            let nativeName = Object.keys(nativeNames)[0]
            nativeNameRight = nativeNames[nativeName].common
        } else {
            nativeNameRight = selectedCountry[0].name.common
        }

        // Languages
        let allLanguages
        let language = selectedCountry[0].languages
        if (selectedCountry[0].hasOwnProperty('languages')){
            allLanguages = Object.keys(language).map(key=>{
            return language[key]
            })
        } else {
            allLanguages = 'No Official language'
        }

        // Currencies
        let allCurrencies
        let currency = selectedCountry[0].currencies
        if (selectedCountry[0].currencies){
            allCurrencies = Object.keys(currency).map(key=>{
                return currency[key].name
            })
        } else {
            allCurrencies = 'No Currencies'
        }

        const info = {
            name: selectedCountry[0].name.common,
            nativeName: nativeNameRight,
            population: convertedPops,
            region: selectedCountry[0].region,
            subregion: selectedCountry[0].subregion,
            continents: selectedCountry[0].continents,
            capital: selectedCountry[0].capital,
            tld: selectedCountry[0].tld,
            currencies: allCurrencies,
            languages: allLanguages,

            flagImg: selectedCountry[0].flags.svg,
            flagAlt: selectedCountry[0].flags.alt,
        }

        if(info.flagAlt==undefined) {
            info.flagAlt = `Flag of ${info.name}`
        }

        return (
            <main className="flex flex-col items-start px-14 py-8 xl:flex-row xl:items-center xl:px-20">
                <Image src={info.flagImg} alt={info.flagAlt} width={900} height={600} className="w-full h-60 sm:h-[28rem] self-center lg:w-[560px]"/>
                <div className="flex flex-col">
                    <div className="mt-20 xl:mt-0">
                        <h1 className="text-5xl font-bold xl:pl-36 xl:text-4xl dark:text-dark-text"> {info.name}</h1>
                    </div>
                    <div className="xl:flex">
                        <div className="flex flex-col mt-16 gap-y-7 xl:mt-5 xl:pl-36 xl:gap-y-2">
                            <CountryInfo info="Native Name: ">{info.nativeName}</CountryInfo>
                            <CountryInfo info="Population: ">{info.population}</CountryInfo>
                            <CountryInfo info="Region: ">{info.region}</CountryInfo>
                            {info.subregion != undefined
                            ?
                                <CountryInfo info="Sub Region: ">{info.subregion}</CountryInfo>
                            :
                                <CountryInfo info="Continent: ">{info.continents}</CountryInfo>
                            }
                            {info.capital != undefined
                            ?
                                <CountryInfo info="Capital: ">{info.capital}</CountryInfo>
                            :
                                <CountryInfo info="Capital: ">{info.name} do not have a capital</CountryInfo>
                            }
                        </div>
                        <div className="flex flex-col mt-24 gap-y-7 xl:mt-5 xl:pl-20 xl:gap-y-2">
                            {info.tld != undefined 
                            ?
                                <CountryInfo info="Top Level Domain: ">{info.tld}</CountryInfo>
                            :
                                <CountryInfo info="Top Level Domain: ">{info.name} do not have a top level domain</CountryInfo>                     
                            }
                            <CountryInfo info="Currencies: ">{`${info.currencies}`}</CountryInfo>
                            <CountryInfo info="Languages: ">{`${info.languages}`}</CountryInfo>
                        </div>
                    </div>
                    <section className="mt-20 xl:flex xl:mt-10 xl:pl-36 xl:gap-x-1">
                        <h2 className="text-3xl font-semibold xl:text-base xl:w-48 dark:text-dark-text">Border Countries:</h2>
                        <div className="flex flex-wrap mt-7 gap-4 xl:mt-0 xl:ml-2">
                            { selectedCountry[0].borders?
                                selectedCountry[0].borders.map((border:string)=>{
                                    return <Link href={`/countries/${border}`} key={border} className="flex justify-center items-center h-14 w-48 p-2 rounded-md text-xl font-semibold bg-light-primary border-2 border-light-secondary xl:h-7 xl:w-24 xl:text-base dark:text-dark-text dark:bg-dark-secondary">{border}</Link>
                                })
                                :
                                <p className="text-xl font-semibold dark:text-dark-text">No borders</p>
                            }
                        </div>
                    </section>
                </div>
            </main>
        )
    } else {
        return (
            <main className="flex flex-col items-center px-14 py-8">
                <h1 className="text-5xl font-bold dark:text-dark-text">Loading...</h1>
            </main>
        )
    }   
}

export async function generateStaticParams() {
    const countries = await getData()
    return countries.map((country:any) => ({
        country: country.cca3
    }))
}