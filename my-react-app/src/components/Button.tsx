import { FaPlus } from "react-icons/fa";

export const Button = () => {
  return (
    <button
      type="submit"
      className="bg-blue-600 p-2 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out flex items-center justify-center"
    >
      <FaPlus size={19} />
    </button>
  );
};
