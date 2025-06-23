'use client';

import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Назад
      </button>

      <h1 className="text-2xl font-bold mb-2">О проекте</h1>
      <p className="text-gray-700">
        Это простое fullstack-приложение TODO, созданное для практики TypeScript, Next.js и Backend API.
      </p>
    </main>
  );
}
