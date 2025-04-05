import Link from "next/link"

export const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <p className="text-xl text-blue-400">Это страница о нас</p>
            <Link href="/">Домой</Link>
        </div>
    )
}