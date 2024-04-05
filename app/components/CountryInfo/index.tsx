type CountryInfoProps = {
    info: string
    children: React.ReactNode
} 

export default function CountryInfo({children, info}:CountryInfoProps){
    return (
        <p className="text-3xl xl:text-base dark:text-dark-text">
            <span className="font-semibold">
                {info}
            </span>
            {children}
        </p>
    )
}