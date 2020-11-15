import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  getPostDetails,
  getPostComments,
  deleteComment,
  addComment,
} from '../../api/api';
import { CommentsList } from './CommentsList';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      setPostComments([]);
      const commentsPromise = getPostComments(selectedPostId);

      setPostDetails(await getPostDetails(selectedPostId));
      setPostComments(await commentsPromise);
    };

    fetchData();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails ? postDetails.body : 'Loading...'}</p>
      </section>

      <CommentsList
        postComments={postComments}
        deleteComment={async(commentId) => {
          await deleteComment(commentId);
          setPostComments(await getPostComments(selectedPostId));
        }}
      />

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onSubmit={async(comment) => {
            const newComment = {
              ...comment, postId: selectedPostId,
            };

            await addComment(newComment);
            setPostComments(await getPostComments(selectedPostId));
          }}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
