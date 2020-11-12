import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { ButtonOpenClose } from '../ButtonOpenClose';
import { Loader } from '../Loader';

export const PostsList = ({ posts, changePostId }) => (
  <>
    {!posts.length ? (
      <Loader />
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
              <ButtonOpenClose
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
