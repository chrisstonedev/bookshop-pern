import React from 'react';
import './App.css';
import {useBookQuery} from './useRequest';
import {GET_BOOKS} from './graphql';
import AddBook from './components/AddBook';
import {IBook} from './types/Book';
import Book from './components/Book';

const App: React.FC = () => {
  const {loading, error, data} = useBookQuery(GET_BOOKS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;

  return (
    <div className="App">
      <h1>My Books</h1>
      <AddBook/>
      {data?.books.map((book: IBook) => (
        <Book key={book.id} book={book}/>
      ))}
    </div>
  );
};

export default App;