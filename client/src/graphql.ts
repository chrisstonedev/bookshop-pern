import {gql} from '@apollo/client';

export const GET_BOOKS = gql`
  {
    books {
      id,
      title,
      author,
      year
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
      year
    }
  }`;