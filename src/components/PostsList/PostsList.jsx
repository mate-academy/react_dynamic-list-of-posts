import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({ posts,
  setSelectedPost,
  selectPost,
  selectedUser }) => {
  const filterPosts = posts.filter((post) => {
    if (!(+selectedUser)) {
      return post;
    }

    return post.userId === selectedUser;
  });

  return (
    <div className="PostsList">
      <h2>{filterPosts.length ? 'Posts:' : 'No Posts'}</h2>
      <ul className="PostsList__list">
        {filterPosts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId}]:`}</b>
              {post.title}
            </div>
            {selectPost === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setSelectedPost(0)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setSelectedPost(+post.id)}
                >
                  Open
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setSelectedPost: PropTypes.func.isRequired,
  selectPost: PropTypes.number.isRequired,
  selectedUser: PropTypes.number.isRequired,
};
