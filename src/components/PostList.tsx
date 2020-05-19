import React, { useCallback, useState, useMemo } from 'react';
import debounce from 'lodash/debounce';

import { PostWithUser } from '../api/api';
import Post from './Post';

type Props = {
  posts: PostWithUser[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  const [query, setQuery] = useState('');
  const [filterQuery, setfilterQuery] = useState('');


  const getVisiblePosts = (allPosts: PostWithUser[], searchQuery: string) => {
    const pattern = new RegExp(searchQuery, 'i');

    return allPosts.filter(({ body, title }) => pattern.test(body + title))
  }

  const vissiblePosts = useMemo(
    () => getVisiblePosts(posts, filterQuery),

    [filterQuery]
  );

  const setfilterQueryWithDebonce = useCallback(
    debounce(setfilterQuery, 1000),
    []
  );


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setfilterQueryWithDebonce(event.target.value)
  }



  return (
    <>
      <label htmlFor="filter" className="filter__text">
        Filter posts:
          </label>
      <input
        type="text"
        id="filter"
        className="filter__field"
        placeholder="enter word..."
        value={query}
        onChange={handleChange}
      />

      <ul className="posts">
        {vissiblePosts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
    </>
  )

}



export default PostList;
