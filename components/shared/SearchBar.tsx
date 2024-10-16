"use client"

import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center bg-gray-200 rounded-full px-4 py-3 w-3/4">
        <img src="/assets/search.svg" alt="Search" />
        <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search Posts"
            className="bg-gray-200 outline-none ml-2 text-gray-600 placeholder-gray-400 flex-1"
        />
    </div>
  );
}