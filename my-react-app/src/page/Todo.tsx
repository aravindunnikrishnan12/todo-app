import { useState, useEffect } from "react";
import "../App.css";
import { Input } from "../components/Input";

type Items = {
  title: string;
  id: string;
  timestamp: number;
};

function Todo() {
  const [items, setItems] = useState<Items[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  const validateInput = (input: string) => {
    if (input.trim() === "") {
      return "Task cannot be empty!";
    }
    if (input.length > 50) {
      return "Task cannot be longer than 50 characters!";
    }
    return "";
  };

  const handlesubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationMessage = validateInput(inputValue);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    const newItem = { title: inputValue, id: Date.now().toString(), timestamp: Date.now() };
    setItems((prev) => [...prev, newItem]);
    setInputValue("");
    setErrorMessage("");
  };

  const handleEdit = (id: string, title: string) => {
    setEditItemId(id);
    setEditInputValue(title);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const validationMessage = validateInput(editInputValue);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === editItemId ? { ...item, title: editInputValue } : item
      )
    );
    setEditItemId(null);
    setEditInputValue("");
    setIsDialogOpen(false);
    setErrorMessage("");
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setItems((prev) => prev.filter((data) => data.id !== itemToDelete));
    setItemToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditInputValue("");
    setIsDialogOpen(false);
  };

  const getItemSizeClass = (index: number) => {
    if (index === items.length - 1) return "text-xl sm:text-2xl";
    if (index === items.length - 2) return "text-base sm:text-xl";
    return "text-sm sm:text-base";
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-5xl font-semibold tracking-wider mb-4 sm:mb-6 wavey-text font-custom">
        Taskify
      </h1>

      <div className="w-full max-w-lg p-4 rounded-lg ">
        {errorMessage && <p className="text-red-400 mb-2 text-sm sm:text-base">{errorMessage}</p>}

        <div className="overflow-y-auto max-h-[400px] scrollbar-hide">
          {items.map((data, index) => (
            <div
              key={data.id}
              className={`flex justify-between items-center border border-gray-500 p-2 mb-2 rounded-md bg-gray-600 ${getItemSizeClass(
                index
              )}`}
            >
              <p className="text-gray-300 font-bold italic tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-red-400 drop-shadow-md">
                {data.title}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(data.id, data.title)}
                  className="bg-gray-600 p-1 rounded hover:bg-gray-500 transition duration-200 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="fill-current text-gray-400"
                  >
                    <path d="M 18.414062 2 C 18.158188 2 17.902031 2.0974687 17.707031 2.2929688 L 16 4 L 20 8 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.925594 2.0974687 18.669937 2 18.414062 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
                  </svg>
                </button>

                <button
                  onClick={() => handleDelete(data.id)}
                  className="bg-gray-600 p-1 rounded hover:bg-gray-500 transition duration-200 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="16"
                    height="16"
                    viewBox="0 0 30 30"
                    className="fill-current text-gray-400"
                  >
                    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center mt-4" onSubmit={handlesubmit}>
          <Input
            type="text"
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handlesubmit}
          />
        </form>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-md w-full max-w-md">
            <h2 className="text-gray-200 text-lg font-semibold mb-4">
              Edit Task
            </h2>
            <input
              type="text"
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-600 text-gray-200 px-4 py-2 rounded hover:bg-gray-500 transition duration-200 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-md w-full max-w-md">
            <h2 className="text-gray-200 text-lg font-semibold mb-4">
              Delete Task
            </h2>
            <p className="text-gray-300">Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 ease-in-out"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-600 text-gray-200 px-4 py-2 rounded hover:bg-gray-500 transition duration-200 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
