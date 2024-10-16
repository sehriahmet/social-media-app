"use client";

import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // console.log('Search input changed:', newValue);

    const handler = setTimeout(() => {
      onChange(e);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  };

  return (
    <div className="flex items-center bg-gray-200 rounded-full px-4 py-3 w-3/4 border-2 border-solid focus-within:border-blue-400">
      <img src="/assets/search.svg" alt="Search" />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search Posts"
        className="bg-gray-200 outline-none ml-2 text-gray-600 placeholder-gray-400 flex-1"
      />
    </div>
  );
};

export default SearchBar;
