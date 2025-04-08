import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p className="text-3xl text-green-500">MeatWay</p>
      <Link href="/main" className="mt-5 text-blue-500 underline text-xl">Главная</Link>
      <Link href="/about">О нас</Link>
    </div>
  );
}
