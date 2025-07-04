// app/login/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push('/');
    else alert(error.message);
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) alert('Check your inbox to confirm.');
    else alert(error.message);
  };

  return (
    <div className="p-6">
      <input
        className="border p-2 block mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 block mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 mr-2">Login</button>
      <button onClick={handleSignup} className="bg-gray-500 text-white px-4 py-2">Sign up</button>
    </div>
  );
}
