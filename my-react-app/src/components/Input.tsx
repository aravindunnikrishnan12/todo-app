import React from 'react';
import { Plus } from 'lucide-react';

type InputProps = {
  type: "text" | "color" | "checkbox";
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent) => void;
};

export const Input = ({ inputValue, setInputValue, handleSubmit }: InputProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={inputValue}
        className="w-full p-3 pr-12 rounded-lg bg-gray-50 shadow-sm border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in-out duration-300"
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Enter text..."
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-sm transition duration-300 ease-in-out"
      >
        <Plus size={20} className="text-gray-700" />
      </button>
    </div>
  );
};