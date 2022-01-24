import {DocumentNode} from 'graphql';
import {useMutation, useQuery} from '@apollo/client';
import {IBookMutation, IBooks} from './types/Book';

export function useBookQuery(gqlQuery: DocumentNode) {
  const {loading, error, data} = useQuery<IBooks>(gqlQuery);
  return {loading, error, data};
}

export function useBookMutation(gqlQuery: DocumentNode) {
  const [addBook] = useMutation<IBookMutation>(gqlQuery);
  return [addBook];
}