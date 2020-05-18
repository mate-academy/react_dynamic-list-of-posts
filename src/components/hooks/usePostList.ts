import {
  ChangeEvent, useCallback, useMemo, useState,
} from 'react';
import debounce from 'lodash/debounce';

export const usePostList = ({ posts }: PostListProps) => {
  const [query, setQuery] = useState('');
  const [filteredQuery, setFilteredQuery] = useState('');

  const visiblePosts = useMemo(() => {
    const filteredPosts = [...posts].filter(post => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      return (title + body).includes(filteredQuery.toLowerCase());
    });

    return filteredPosts;
  }, [posts, filteredQuery]);

  const setFilteredQueryWithDebounce = useCallback(
    debounce(setFilteredQuery, 1000),
    [],
  );

  const handleSearch = useCallback(({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;

    setQuery(value);
    setFilteredQueryWithDebounce(value);
  }, [setFilteredQueryWithDebounce]);

  return {
    handleSearch,
    query,
    visiblePosts,
  };
};
