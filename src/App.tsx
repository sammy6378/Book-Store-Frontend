
import { useEffect, useState } from 'react'
import './App.scss'
import  { Tbook,Inputs } from './components/form'
import Header from './components/header';
import { Nav } from './components/nav';


// to be updated
export const hideForm = () => {
  const form = document.querySelector('.form');
  form?.classList.remove('active');
}

function App() {
  const [books, setBooks] = useState<Tbook[]>([]);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const booksPerPage = 6;
  

const fetchData = async () =>{
    fetch('https://book-store-backend-iahi.onrender.com/api/books')
    .then(response => response.json())
    .then(data => setBooks(data))
    .catch(error => console.error('Unable to fetch the data:', error));
}
console.log(books)

useEffect(()=>{
  fetchData()
},[])


  // Loading books from localstorage
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Add new book record
  const addBook = (newBook: Tbook) => {
    const booksData = [...books, newBook];
    setBooks(booksData);
    localStorage.setItem('books', JSON.stringify(booksData));
  };

  
  // Delete book record
  const confirmDelete = () => {
    if (confirm('Are you sure you want to delete the record?')) {
      const updatedBooks = books.filter(book => !checkedItems.includes(book.id));
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      setCheckedItems([]);
    }
  };

  // Search books record
  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate the current books to display
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <>
      <Header />
      
      <div className="flex">

        <div className="border-r border-r-slate-400 bg-gray-800 w-1/5 py-5 px-2 left-nav max-[767px]:w-3/6 md:mx-auto h-screen justify-start">
        <div className="flex items-start mb-10">
        <span className="text-2xl font-bold text-orange-500">Book Store</span>
      </div>
        <div className="max-w-full w-full  pt-5">
        <input
          type="text"
          placeholder="Search Book by name...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input w-full px-2 py-1 border-1 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-transparent'
        />
      </div>
      <Nav />
        </div>

      <div className="p-3 overflow-hidden">

        <div className="flex justify-start items-center gap-5">
        <button className='px-4 py-1 btn-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Filters</button>
        <button className="px-4 py-1 btn-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ">Columns</button>
        <button 
        onClick={confirmDelete}
        disabled={checkedItems.length === 0}
        className='btn btn-sm btn-outline btn-accent'>Delete</button>
        </div>
        
        <div className=" overflow-x-auto">
        <Inputs addBook={addBook}/>
        </div>
        
        <div className=" overflow-x-auto">
        <table className='table table-zebra table-xs my-5 border-collapse border border-slate-500'>
          <thead className='bg-slate-700'>
            <tr className='text-sm text-cyan-400 border border-slate-600 py-5'>
              <th></th>
              <th>Ref</th>
              <th>Book Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks && currentBooks.map((book, index) => (
              <tr className='border border-slate-600 text-white hover text-sm py-20' key={book.id}>
                <td><input 
                type="checkbox"  
                name="check" 
                className='checkbox checkbox-success checkbox-sm custom-checkbox'
                    value={book.id}
                    checked={checkedItems.includes(book.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedItems([...checkedItems, book.id]);
                      } else {
                        setCheckedItems(checkedItems.filter(id => id !== book.id));
                      }
                    }}
                /></td>
                <td className='text-xl'>{indexOfFirstBook + index + 1}</td>
                <td className='text-sm'>{book.name}</td>
                <td className='text-sm'>{book.Description}</td>
                <td className='text-sm'>{book.Author}</td>
                <td className='text-sm'>{book.Year}</td>
                <td className='text-sm'>{book.Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className='flex justify-between mt-4'>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className='btn btn-outline btn-primary'>
            Previous
          </button>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentBooks.length < booksPerPage}
            className='btn btn-outline btn-primary'>
            Next
          </button>
        </div>
      </div>
      </div>
     
    </>
  )
}

export default App;
