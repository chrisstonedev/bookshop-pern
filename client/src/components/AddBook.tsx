import React from 'react';
import {IBook, IBookMutation, IBooks} from '../types/Book';
import {useBookMutation} from '../useRequest';
import {ADD_BOOK, GET_BOOKS} from '../graphql';
import {ApolloCache, FetchResult} from '@apollo/client';

const AddBook: React.FC = () => {
  const [formData, setFormData] = React.useState<IBook | {}>();
  const [addBook] = useBookMutation(ADD_BOOK);

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveBook = (
    e: React.FormEvent,
    {title, author}: IBook | any,
  ) => {
    e.preventDefault();
    addBook({
      variables: {title, author},
      update: (
        cache: ApolloCache<IBookMutation>,
        {data}: FetchResult<IBookMutation>,
      ) => {
        const cacheData = cache.readQuery({query: GET_BOOKS}) as IBooks;
        cache.writeQuery({
          query: GET_BOOKS,
          data: {
            books: [...cacheData.books, data?.addBook],
          },
        });
      },
    }).then();
  };

  return (
    <form className="Form" onSubmit={(e) => handleSaveBook(e, formData)}>
      <div>
        <div>
          <label htmlFor="title">Title</label>
          <input onChange={handleForm} type="text" id="title"/>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input onChange={handleForm} type="text" id="author"/>
        </div>
      </div>
      <button>Add Book</button>
    </form>
  );
};

export default AddBook;