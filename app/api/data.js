async function fetchData(country) {
    if (country) {
        let res = await fetch(`https://restcountries.com/v3.1/alpha/${country}`)
        let data = await res.json()
        return data
    } else {
        let res = await fetch('https://restcountries.com/v3.1/all')
        let data = await res.json()
        return data
    }
}

export async function getData(country) {
    let countries = await fetchData(country)
    return countries
}