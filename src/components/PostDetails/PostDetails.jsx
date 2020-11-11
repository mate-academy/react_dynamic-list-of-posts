/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  getPostComments,
  getPostDetails,
  deletePostComment,
  postComment,
} from '../../api/api';
import { PostDetailsProps } from '../../props/PostDetailsProps';
import { Comments } from '../Comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState({ body: '' });
  const [comments, setComments] = useState(null);

  useEffect(
    () => {
      updetePostDetails(postId);
      updeteComments(postId);
    },
    [postId],
  );

  async function updetePostDetails(postIdForUpdete) {
    try {
      const postData = await getPostDetails(postIdForUpdete);

      setPost(postData);
    } catch (err) {
      console.warn(err);
    }
  }

  async function updeteComments(postIdForUpdete) {
    try {
      const commentsData = await getPostComments(postIdForUpdete);

      setComments(commentsData);
    } catch (err) {
      console.warn(err);
    }
  }

  function removeComment(commentId) {
    try {
      deletePostComment(commentId);

      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.warn(err);
    }
  }

  async function addComment(comment) {
    try {
      const newComment = await postComment({
        postId: post.id,
        ...comment,
      });

      setComments(currentComments => [...currentComments, newComment]);
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      {comments && (
        <Comments
          comments={comments}
          removeComment={removeComment}
        />
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = PostDetailsProps;
