import { useState, useEffect } from 'react';
//import '../styles/globals.css';

export default function OwnerDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    location: '',
    contact: ''
  });

  const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'));

  const fetchListings = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { ...form, owner: user.name };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    });
    if (res.ok) {
      alert('Book added!');
      setForm({ title: '', author: '', genre: '', location: '', contact: '' });
      fetchListings();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add a Book Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
        <input placeholder="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
        <input placeholder="Contact Info" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} required />
        <button className="bg-purple-500 text-white py-2 rounded">Add Book</button>
      </form>

      <h2 className="text-lg mt-6 mb-2">Your Listings</h2>
      {books.filter(book => book.owner === user.name).map((book, idx) => (
        <div key={idx} className="border p-2 my-2">
          <strong>{book.title}</strong> by {book.author}<br/>
          Genre: {book.genre || 'N/A'}<br/>
          Location: {book.location} | Contact: {book.contact}<br/>
          <span className="italic">Status: {book.status || 'Available'}</span>
        </div>
      ))}
    </div>
  );
}
