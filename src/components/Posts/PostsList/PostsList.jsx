import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { PostButton } from '../../Buttons/PostButton';

export const PostsList = ({ posts, changePostId }) => (
  <>
    {!posts.length ? (
      <h2>Please wait, posts loading</h2>
    ) : (
      <div className="PostsList">
        <h2>Posts:</h2>
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>{`User #${post.userId}`}</b>
                <br />
                {post.title}
              </div>
              <PostButton
                changePostId={changePostId}
                postId={post.id}
              />
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);
PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  changePostId: PropTypes.func.isRequired,
};
