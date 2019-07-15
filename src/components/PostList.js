import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';
import './PostList.css';

const PostList = (props) => {
  const loadButton = props.isLoaded
      || (
        <button
          type="button"
          className="button"
          onClick={props.handleClick}
        >
          {props.isLoading ? 'Loaidng...' : 'Load Posts'}
        </button>
      );

  const postBlock = props.isLoaded
    && props.postWithUsersAndComments.map(post => (
      <Post
        key={post.id}
        post={post}
      />
    ));

  const filter = props.isLoaded
    && (
      <input
        className="post__filter"
        type="text"
        placeholder="filter by title or posts text"
        onChange={props.handlePostFilter}
        value={props.filterValue}
      />
    );

  return (
    <div className="post-list">
      <h1>Dynamic list of posts</h1>
      {loadButton}
      {filter}
      {postBlock}
    </div>
  );
};

PostList.propTypes = {
  postWithUsersAndComments: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handlePostFilter: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};

export default PostList;
