import { useState } from 'react';
import { useRouter } from 'next/router';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      if (data.role === 'Owner') router.push('/owner-dashboard');
      else router.push('/seeker-dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-72">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
      <p className="mt-4">Don't have an account? <a className="text-blue-600" href="/register">Register</a></p>
    </main>
  );
}