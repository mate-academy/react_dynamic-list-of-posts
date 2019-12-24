import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ getPosts }) => {
  const [posts, setPosts] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState([]);

  const loadPosts = async() => {
    try {
      setLoading(true);

      const gotPosts = await getPosts();

      setVisiblePosts([...gotPosts]);
      setPosts(gotPosts);
      setloaded(true);
      setError(false);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  };

  const searchPosts = (value) => {
    const searchQuery = value.toLowerCase();

    setPosts(
      visiblePosts.filter(({ title, body }) => (title + body)
        .toLowerCase().includes(searchQuery))
    );
  };

  const debounce = (f, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  };

  const debounceHandler = debounce(searchPosts, 1000);

  return (
    <div>
      {posts.length === 0 && !error && (
        <button type="button" className="button" onClick={loadPosts}>
          Load
        </button>
      )}
      {isLoading && !error && <p>Loading...</p>}
      {loaded && !isLoading && (
        <div>
          <p>
            Posts
            &nbsp;
            {posts.length}
          </p>
          <input
            className="input"
            type="search"
            placeholder="Search posts"
            onChange={e => debounceHandler(e.target.value)}
          />

          {posts.map(post => (
            <Post currentPost={post} key={post.id} />
          ))}
        </div>
      )}
    </div>
  );
};

PostList.propTypes = { getPosts: PropTypes.func.isRequired };
export default PostList;
