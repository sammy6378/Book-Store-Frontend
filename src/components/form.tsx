
// import React from 'react';
import  { useState } from 'react';


export interface Tbook{
    id:number,
    name: string;
    Author: string;
    Year: number;
    Price: number;
    Description: string;
}


export function Inputs({ addBook}:any){
  const [bookName, setBookName] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [price, setprice] = useState('');
  // const [bookId, setBookId] = useState('');
  

  const getData = (e:any) => {
    e.preventDefault();

    const id = Math.floor(1000 + Math.random() * 9000);

    const newBook = {
      id,
      name: bookName,
      author,
      year,
      price,
      description
    };

    addBook(newBook);

    // Clear form fields
    setBookName('');
    setDescription('');
    setAuthor('');
    setYear('');
    setprice('');
  };

 
 
  return(
    <>
    <table className='table table-zebra table-xs my-5 border-collapse border border-slate-500'>
          <thead className='bg-slate-700'>
            <tr className='text-sm text-cyan-400 border border-slate-600 py-5'>
              <th>Book Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>Price</th>
            </tr>
          </thead>

  <tr>
    <td>
      <input
        type="text"
        placeholder="Enter Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-transparent  text-white"
      />
    </td>
    <td>
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-transparent text-white"
      />
    </td>
    <td>
      <input
        type="text"
        placeholder="Enter Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-transparent text-white"
      />
    </td>
    <td>
      <input
        type="text"
        placeholder="Enter Publication Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-transparent text-white"
      />
    </td>
    <td>
      <input
        type="text"
        maxLength={4}
        minLength={3}
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setprice(e.target.value)}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-transparent text-white"
      />
    </td>
  </tr>
  
</table>
<form onSubmit={getData}>
    <button className='px-4 py-1 btn-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Add Record</button>
</form>
  </>
  )
  
}

