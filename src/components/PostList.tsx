import React, { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { PostWithUser } from '../api';
import Post from './Post';

type Props = {
  posts: PostWithUser[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  const [query, setQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const getVisiblePosts = (allPosts: PostWithUser[], searchQuery: string) => {
    const pattern = new RegExp(searchQuery, 'i');

    return allPosts.filter(({ body, title }) => pattern.test(body + title));
  };

  const visiblePosts = useMemo(
    () => getVisiblePosts(posts, filterQuery), [filterQuery, posts],
  );

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 1000),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  return (
    <>
      <label htmlFor="filter" className="filter__label">
        Filter posts:
        <input
          type="text"
          id="filter"
          className="filter__input"
          value={query}
          onChange={handleChange}
          placeholder="Enter post title"
        />
      </label>

      <ul className="posts">
        {visiblePosts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
    </>
  );
};

export default PostList;
