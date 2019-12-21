import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ GetPosts }) => {
  const [visiblePosts, savePosts] = useState([]);
  const [isLoading, changeLoading] = useState(false);
  const [loaded, saveLoaded] = useState(false);
  const [error, saveError] = useState(false);
  const [filteredPosts, saveFilteredPosts] = useState([]);
  const [input, saveInput] = useState('');

  const loadPosts = async() => {
    try {
      changeLoading(true);

      const posts = await GetPosts();

      savePosts(posts);
      changeLoading(false);
      saveLoaded(true);
      saveError(false);
    } catch (e) {
      saveError(true);
    }
  };

  const inputHandler = (value) => {
    saveInput(value);
    const filtered = visiblePosts.filter(post => post.title.includes(value)
    || post.body.includes(value));

    saveFilteredPosts(filtered);
  };

  const PostsToShow = input.length !== 0 ? filteredPosts : visiblePosts;

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
              onChange={event => inputHandler(event.target.value)}
            />
          </label>
          {PostsToShow.map(post => (
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

PostList.propTypes = { GetPosts: PropTypes.func.isRequired };

export default PostList;
