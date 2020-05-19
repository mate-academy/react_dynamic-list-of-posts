import React, { useCallback, useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { Post } from './Post';


interface Props {
  posts: PostType[];
}

export const PostList: React.FC<Props> = ({ posts }) => {
  const [query, setQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const visiblePosts = useMemo(() => {
    const pattern = new RegExp(filterQuery, 'i');

    return posts.filter(({ body, title }) => pattern.test(body + title));
  }, [posts, filterQuery]);

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 500),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  return (
    <>
      <div className="wrapper">
        <h3 className="search-title">Search for posts:</h3>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            className="validate"
            placeholder="Type something to search post..."
            value={query}
            onChange={handleChange}
          />
        </label>
      </div>
      <ul className="post post__list">
        {visiblePosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};
