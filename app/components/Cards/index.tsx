// Next Components
import Image from "next/image";
import Link from "next/link";

// Types
type CardProps = {
    name: string,
    pops: number,
    region: string,
    capital: string,
    img: string,
    imgAlt: string,
    cca3: string,
}

export default function Cards({name,pops,region,capital,img,imgAlt,cca3}: CardProps){

    let popsConverted = pops.toLocaleString()
    if (!imgAlt){
        imgAlt = `Flag of ${name}`
    }

    return (
        <article className="min-w-[264px] w-[528px] rounded-lg shadow-lg xl:w-[264px] dark:bg-dark-secondary">
            <Link href={`/countries/${cca3}`}>
                <figure className="max-h-[320px]">
                    <Image src={img} alt={imgAlt} width={500} height={500} className="rounded-t-lg w-full h-[200px] sm:h-[320px] xl:h-[160px]" priority/>
                </figure>
            </Link>
            <section className="h-[19rem] px-12 xl:h-36 xl:px-6">
                <h2 className="my-12 text-lg font-bold sm:text-4xl xl:text-xl xl:mt-6 xl:mb-3 dark:text-dark-text">{name}</h2>
                <p className="text-base sm:text-2xl xl:text-sm dark:text-dark-text"><span className="font-semibold">Population: </span>{popsConverted}</p>
                <p className="text-base mt-4 sm:text-2xl xl:text-sm xl:mt-2 dark:text-dark-text"><span className="font-semibold">Region: </span>{region}</p>
                <p className="text-base mt-4 sm:text-2xl xl:text-sm xl:mt-2 dark:text-dark-text"><span className="font-semibold">Capital: </span>{capital}</p>
            </section>
        </article>
    )
}