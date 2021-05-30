import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({ posts, setPost, selectPost, selectUser }) => {
  const filterPosts = posts.filter((post) => {
    if (!(+selectUser)) {
      return post;
    }

    return post.userId === selectUser;
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
                  onClick={() => setPost(0)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setPost(+post.id)}
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
  setPost: PropTypes.func.isRequired,
  selectPost: PropTypes.number.isRequired,
  selectUser: PropTypes.number.isRequired,
};
