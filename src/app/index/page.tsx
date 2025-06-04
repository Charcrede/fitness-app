'use client'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Programme de Musculation</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Suis ton programme, reste motivé et atteins tes objectifs !
      </p>
      <Link href="/workout">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Commencer la séance du jour
        </button>
      </Link>
      <div className="mt-8 flex space-x-4">
        <Link href="/calendar">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Calendrier
          </button>
        </Link>
      </div>
    </div>
  );
}