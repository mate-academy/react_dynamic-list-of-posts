import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import classnames from 'classnames';

export const PostsList = ({ posts, getPost }) => {
  const [postIsSelect, setPostIsSelect] = useState(false);
  const [buttonId, setButtonId] = useState(0);

  const onPostButton = (postID) => {
    if (postID === buttonId) {
      setPostIsSelect(!postIsSelect);
    } else {
      setPostIsSelect(true);
    }

    getPost(postID);
    setButtonId(postID);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User
                {' '}
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className={classnames({
                PostsList__button: true,
                button: true,
                'PostsList__user-button': postIsSelect
                && buttonId === post.id,
              })}
              onClick={() => {
                onPostButton(post.id);
              }}
            >
              {postIsSelect
              && buttonId === post.id
                ? 'Close'
                : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequaired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  getPost: PropTypes.func.isRequired,
};
