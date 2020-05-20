import React, { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { PostWithUser } from '../helpers/typeDefs';
import { Post } from './Post';


type Props ={
  posts: PostWithUser[];
};

export const PostList: React.FC<Props> = ({ posts }) => {
  const [query, setQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const getVisiblePosts = (allPosts: PostWithUser[], searchQuery: string) => {
    const pattern = new RegExp(searchQuery, 'i');

    return allPosts.filter(({ body, title }) => pattern.test(body + title));
  };

  const setFilterQueryWithDebounce = useCallback(debounce(setFilterQuery, 1000), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  const visiblePosts = useMemo(() => getVisiblePosts(posts, filterQuery), [posts, filterQuery]);
  const noData = visiblePosts.length;

  return (
    <div className="post__list">
      <label htmlFor="input">
        C&apos;mon, let&apos;s find smth
        <input
          type="text"
          className="ml5"
          id="input"
          value={query}
          onChange={handleChange}
        />
      </label>
      {noData === 0 && <p>No requested data here, friend</p>}

      {visiblePosts.map(post => (
        <div className="item" key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};
