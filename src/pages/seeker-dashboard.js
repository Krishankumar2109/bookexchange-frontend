import { useEffect, useState } from 'react';

export default function SeekerDashboard() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ title: '', location: '', genre: '' });

  const fetchBooks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(filters.title.toLowerCase()) &&
    b.location.toLowerCase().includes(filters.location.toLowerCase()) &&
    b.genre.toLowerCase().includes(filters.genre.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Browse Book Listings</h1>
      <div className="flex gap-2 mb-4">
        <input placeholder="Title" value={filters.title} onChange={e => setFilters({ ...filters, title: e.target.value })} />
        <input placeholder="Location" value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} />
        <input placeholder="Genre" value={filters.genre} onChange={e => setFilters({ ...filters, genre: e.target.value })} />
      </div>
      {filteredBooks.map((book, idx) => (
        <div key={idx} className="border p-2 my-2">
          <strong>{book.title}</strong> by {book.author}<br/>
          Genre: {book.genre || 'N/A'}<br/>
          Location: {book.location} | Contact: {book.contact}<br/>
          Owner: {book.owner} | Status: {book.status || 'Available'}
        </div>
      ))}
    </div>
  );
}
