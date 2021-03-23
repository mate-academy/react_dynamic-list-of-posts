import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getPostsById, getComentsById } from '../../helpers';
import './PostsList.scss';

export const PostsList = ({ posts, setComments, setchoosenPost }) => {
  const [choosenPostId, setChoosenId] = useState('');

  const openPostHandler = async(id) => {
    let comments = await getComentsById(id);
    const choosenPost = await getPostsById(id);

    comments = comments
      .filter(comment => comment.postId === id);
    setComments(comments);

    setchoosenPost(choosenPost);
    setChoosenId(id);
  };

  const closePostHandler = () => {
    setchoosenPost(null);
    setChoosenId('');
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {(choosenPostId !== post.id) ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  openPostHandler(post.id);
                }}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={closePostHandler}
              >
                Close
              </button>
            )
          }

          </li>
        ))
        }
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  setComments: PropTypes.func.isRequired,
  setchoosenPost: PropTypes.func.isRequired,
};
