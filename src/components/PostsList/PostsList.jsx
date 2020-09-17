import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  selectedPostId,
  posts,
  selectedUser,
  setPostId,
  setPosts,
}) => {
  useEffect(() => {
    getPosts()
      .then(data => setPosts(
        data.filter(post => (selectedUser === '0'
          ? post
          : post.userId === +selectedUser)),
      ));
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.body}
            </div>
            <button
              type="button"
              onClick={() => (
                selectedPostId !== post.id
                  ? setPostId(post.id)
                  : setPostId(null)
              )}
              className="PostsList__button button"
            >
              {selectedPostId !== post.id ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  selectedPostId: PropTypes.number,
  selectedUser: PropTypes.string.isRequired,
  setPostId: PropTypes.func.isRequired,
  setPosts: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  selectedPostId: null,
};
