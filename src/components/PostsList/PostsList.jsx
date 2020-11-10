import React from 'react';
import PropTypes from 'prop-types';
import { PostShape } from '../../shapes/PostShape';
import { Post } from '../Post/Post';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList = ({
  posts,
  showPostDetails,
  isLoading,
  selectedPostId,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <Post
            post={post}
            showPostDetails={showPostDetails}
            key={post.id}
            isOpen={post.id === selectedPostId}
          />
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PostShape.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
  showPostDetails: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
