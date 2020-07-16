import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { PostExtended } from '../interfaces/data';

interface Props {
  initialPosts: PostExtended[];
  setPosts(posts: PostExtended[]): void;
}

export const PostFilter: React.FC<Props> = ({ initialPosts, setPosts }) => {
  const [query, setQuery] = useState('');

  const getFilteredPosts = (posts: PostExtended[], value: string) => {
    const pattern = new RegExp(value, 'i');

    return posts.filter(({ title, body }) => {
      return pattern.test(title) || pattern.test(body);
    });
  };

  const setPostsWithDebounce = useCallback(
    debounce((value: string) => {
      setPosts(getFilteredPosts(initialPosts, value));
    }, 1000),
    [],
  );

  const filterPosts = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setQuery(value);
    setPostsWithDebounce(value);
  };

  return (
    <label className="filter" htmlFor="filter">
      <input
        id="filter"
        className="filter__input"
        type="text"
        value={query}
        placeholder="Filter by title or content"
        onChange={filterPosts}
      />
    </label>
  );
};
