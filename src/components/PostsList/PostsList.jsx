import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';
import { PostShape } from '../shapes/PostShape';
import { UserShape } from '../shapes/UserShape';
import { Post } from '../Post';
import { Loader } from '../Loader';

export const PostsList = (props) => {
  const { posts, toggletPost, postId, users, isLoading } = props;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="PostsList">
      <h2 className="PostsList__title">Posts:</h2>

      <ul className="PostsList__list">
        {
          posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              user={users.find(user => user.id === post.userId)}
              isOpen={post.id === postId}
              toggletPost={toggletPost}
            />
          ))
        }
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(PostShape)).isRequired,
  toggletPost: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
