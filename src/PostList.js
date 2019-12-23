import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Post from './Post';

const PostList = ({ getPosts }) => {
  const [visiblePosts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [input, setInput] = useState('');

  const loadPosts = async() => {
    try {
      setLoading(true);

      const posts = await getPosts();

      setPosts(posts);
      setLoading(false);
      setLoaded(true);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const inputHandler = (value) => {
    const searchQuery = value.toLowerCase().trim();

    setInput(searchQuery);
    const filtered = visiblePosts
      .filter(post => post.title.includes(searchQuery)
        || post.body.includes(searchQuery));

    setFilteredPosts(filtered);
  };

  const debouncedInputHandler = _.debounce(inputHandler, 500);

  const postsToShow = input.length !== 0 ? filteredPosts : visiblePosts;

  return (
    <div>
      {visiblePosts.length === 0 && !error && !isLoading
        && (
          <button
            className="load"
            type="button"
            onClick={loadPosts}
          >
          Load
          </button>
        )
      }
      {isLoading && !error && <div className="loading">Loading...</div>}
      {loaded && !isLoading && (
        <div>
          <label>
            Search
            <input
              className="input"
              type="search"
              onChange={event => debouncedInputHandler(event.target.value)}
            />
          </label>
          {postsToShow.map(post => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      )}
      {error && (
        <div className="button_container">
          <p className="error">Error occurred</p>
          <button
            className="load"
            type="button"
            onClick={loadPosts}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

PostList.propTypes = { getPosts: PropTypes.func.isRequired };

export default PostList;
