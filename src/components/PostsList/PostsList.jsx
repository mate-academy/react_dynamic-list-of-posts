import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

export const PostsList = ({ todos, setPostId, selectedPostId }) => {
  const handleClick = (postId) => {
    if (selectedPostId === postId) {
      setPostId(0);
    } else {
      setPostId(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {todos.map(todo => (
          <li className="PostsList__item" key={todo.id}>
            <div>
              <b>
                {`[User #${todo.userId}]:`}
                {' '}
              </b>
              {todo.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleClick(todo.id)}
            >
              {selectedPostId === todo.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
};
