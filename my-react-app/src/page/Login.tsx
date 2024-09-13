import { useState } from "react";

const Login = () => {
  const [isBlue, setIsBlue] = useState(false); // to toggle between two colors

  const handleClick = () => {
    setIsBlue(!isBlue); // Toggle between true and false
  };

  return (
    <div
      className={`h-screen flex justify-center items-center transition-colors duration-500 ${
        isBlue ? 'bg-blue-300' : 'bg-red-300'
      }`}
    >
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
      >
        Change Background Color
      </button>
    </div>
  );
};

export default Login;
