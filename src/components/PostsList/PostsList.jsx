import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getComents, getPostsById } from '../../helpers';
import './PostsList.scss';

export const PostsList = ({ posts, setComments, setchoosenPost }) => {
  const [choosenPostId, setChoosenId] = useState('');

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
                onClick={
                  async() => {
                    let comments = await getComents(post.id);
                    const choosenPost = await getPostsById(post.id);

                    comments = comments
                      .filter(comment => comment.postId === post.id);
                    setComments(comments);

                    setchoosenPost(choosenPost);
                    setChoosenId(post.id);
                  }
              }
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={
                  () => {
                    setchoosenPost(null);
                    setChoosenId('');
                  }
                }
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
