import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { PostInfo } from '../PostInfo';
import { CommentsBlock } from '../CommentsBlock';

import { UserShape } from '../shapes/UserShape';

import './PostDetails.scss';

export const PostDetails = ({ postId, users }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isShownComments, setIsShownComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showOpenPost = async(id) => {
    setIsLoading(true);

    const receivedPost = await getPostDetails(id);

    setIsLoading(false);

    setPost(receivedPost.data);
    setIsShownComments(false);
  };

  const getComments = async(id) => {
    if (!id) {
      setComments([]);

      return;
    }

    const receivedComments = await getPostComments(id);

    setComments(receivedComments);
  };

  const handleDelete = async(comment) => {
    const respones = await deleteComment(comment);

    if (!respones.ok) {
      return;
    }

    getComments(postId);
  };

  useEffect(() => {
    showOpenPost(postId);
    getComments(postId);
  }, [postId]);

  if (isLoading) {
    return <Loader />;
  }

  if (post) {
    const foundUser = users.find(user => user.id === post.userId);

    return (
      <div className="PostDetails">
        <div className="PostDetails__wrapper">
          <PostInfo
            post={post}
            user={foundUser}
          />

          <CommentsBlock
            comments={comments}
            isShownComments={isShownComments}
            setIsShownComments={setIsShownComments}
            handleDelete={handleDelete}
          />

          <NewCommentForm
            postId={postId}
            getComments={getComments}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="PostDetails PostDetails__no-post">
      <h2 className="PostDetails">Post not selected</h2>
      <i className="PostDetails__no-post-icon fas fa-scroll" />
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
};
