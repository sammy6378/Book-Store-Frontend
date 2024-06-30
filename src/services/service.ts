import Instance from "../client/connect";
import { Tbook } from "../components/form";

// get all books
export const getBooks = async ():Promise<Tbook[]> => {
  const response = await Instance.get("/api/books");
  return response.data;
};

// get a book by id
export const getBook = async (id: number):Promise<Tbook> => {
  const response = await Instance.get(`/api/book/${id}`);
  return response.data;
};

// create a new book
export const createBook = async (book: Tbook):Promise<Tbook> => {
  const response = await Instance.post("/api/book", book);
  return response.data;
};
// delete a book
export const deleteBook = async (id: number):Promise<void> => {
  await Instance.delete(`/api/book/${id}`);
};

// update a book   
export const updateBook = async (book: Tbook):Promise<Tbook> => {
  const response = await Instance.put(`/api/book/${book.id}`, book);
  return response.data;
};