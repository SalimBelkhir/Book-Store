import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!Array.isArray(books)) {
    return <div className="text-red-500">No books available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <tr>
            <td colSpan="5" className='text-center p-4'>
              <Link to="/books/create">
                <button className='px-4 py-2 bg-sky-300 rounded-md text-white'>
                  Add Book
                </button>
              </Link>
            </td>
          </tr>      
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 h-10">
            <th className="border border-slate-700 rounded-md">#</th>
            <th className="border border-slate-700 rounded-md">Title</th>
            <th className="border border-slate-700 rounded-md max-md:hidden">Author</th>
            <th className="border border-slate-700 rounded-md max-md:hidden">Year</th>
            <th className="border border-slate-700 rounded-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="h-12">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {book.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.publishYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800 hover:text-green-600" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-400" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-400" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
