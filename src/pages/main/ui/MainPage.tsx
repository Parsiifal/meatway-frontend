import Link from "next/link"

export const MainPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <p className="text-xl text-blue-400">Это главная страница</p>
            <Link href="/">Домой</Link>
        </div>
    )
}