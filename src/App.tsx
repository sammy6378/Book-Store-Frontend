
import { useEffect, useState,useReducer  } from 'react'
import './App.scss'
import  { Tbook,Inputs } from './components/form'
import Header from './components/header';
import { Nav } from './components/nav';
import { getBooks,createBook,deleteBook} from './services/service';


// to be updated
export const hideForm = () => {
  const form = document.querySelector('.form');
  form?.classList.remove('active');
}

function App() {
  const initialBooks: Tbook[] = [];
  const [fullBooks, setFullBooks] = useState<Tbook[]>([]);
  const [books, dispatch] = useReducer(bookReducer,initialBooks);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const booksPerPage = 6;


  type TAction = 
  |{type:'LOAD_BOOKS',payload:any}
  |{type:'ADD_BOOK',payload:any}
  |{type:'DELETE_BOOK',payload:number}
  |{type:'UPDATE_BOOK',payload:any}
 
  function bookReducer(state:Tbook[], action:TAction) {
    switch (action.type) {
      case 'LOAD_BOOKS':
        return action.payload;
      case 'ADD_BOOK':
        return [...state, action.payload];
      case 'DELETE_BOOK':
        return state.filter((book:any) => book.id !== action.payload);
      case 'UPDATE_BOOK':
        return state.map((book:any) =>
          book.id === action.payload.id ? action.payload : book
        );
      default:
        return state;
    }
  }
  

// get books
useEffect(()=>{
    const fetchBooks = async () => {
      const books = await getBooks();
      setFullBooks(books);
      dispatch({type:'LOAD_BOOKS',payload:books})
    }
    fetchBooks();
},[books])


// Add new book record
const addBook = async (newBook: Tbook) => {
  try {
    const record = await createBook(newBook);
    dispatch({type:'ADD_BOOK',payload:record}) 
  } catch (error) {
    console.log("Unable to post data",error)
  }
};


// delete book record
const confirmDelete = async () => {
  if (confirm('Are you sure you want to delete the record?')) {
    try {
      // Loop through checkedItems 
      for (const bookId of checkedItems) {
        await deleteBook(bookId);
      }

      // Update the state after successful deletion
      const updatedBooks = fullBooks.filter((book: { id: number }) => !checkedItems.includes(book.id));
      setCheckedItems([]);
      setFullBooks(updatedBooks);
      dispatch({ type: 'LOAD_BOOKS', payload: updatedBooks });
    } catch (error) {
      console.log("Unable to delete data", error);
    }
  }
};

  // Search books record in the database
  useEffect(() => {
    const searchBooks = () => {
      const filteredBooks = fullBooks.filter((book: Tbook) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
      dispatch({ type: 'LOAD_BOOKS', payload: filteredBooks });
    };
    searchBooks();
  }, [search, fullBooks]);
 

  // Calculate the current books to display
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

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
            {currentBooks && currentBooks.map((book:Tbook) => (
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
                <td className='text-xl'>{book.id}</td>
                <td className='text-sm'>{book.name}</td>
                <td className='text-sm'>{book.description}</td>
                <td className='text-sm'>{book.author}</td>
                <td className='text-sm'>{book.year}</td>
                <td className='text-sm'>{book.price}</td>
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
