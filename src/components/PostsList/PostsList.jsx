import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  viewPostUser,
  setPostDetails,
  postId,
  setPostId
}) => {
  function handleClick(id) {
    if (postId === id) {
      setPostId(0);
      setPostDetails([]);
    } else {
      setPostId(id);
      viewPostUser(id);
    }
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
      {
        posts.map(({ userId, title, id }) => {
          return (
            <li
              className="PostsList__item"
              key={id}
            >
              <div>
                <b>[User #{userId}]:</b>
                {title}
              </div>
              <button
                onClick={() => {
                  handleClick(id);
                }}
                type="button"
                className="PostsList__button button"
              >
                {id === postId ? "Close" : "Open"}
              </button>
            </li>
          )
        })
      }
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  viewPostUser: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
  setPostDetails: PropTypes.func.isRequired,
};
