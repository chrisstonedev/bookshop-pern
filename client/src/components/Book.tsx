import React from 'react';
import {IBook} from '../types/Book';

type Props = {
  book: IBook;
}

const Book: React.FC<Props> = ({book}) => {
  const {title, author} = book;

  return (
    <div className="Card">
      <h2>{title}</h2>
      <span>{author}</span>
    </div>
  );
};

export default Book;