/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';

import {
  getPostComments,
  getPostDetails,
  deletePostComment,
  postComment,
} from '../../api/posts';

import { Comments } from '../Comments';
import { Loader } from '../Loader/Loader';
import { NewCommentForm } from '../NewCommentForm';

import { PostDetailsProps } from '../../props/PostDetailsProps';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState({ body: '' });
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    () => {
      const fetchData = async() => {
        try {
          setIsLoading(currentIsLoading => !currentIsLoading);

          const dataDetails = await getPostDetails(postId);
          const dataComments = await getPostComments(postId);

          setPost(dataDetails);
          setComments(dataComments);

          setIsLoading(currentIsLoading => !currentIsLoading);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    },
    [postId],
  );

  const removeComment = useCallback(
    async(commentId) => {
      try {
        deletePostComment(commentId);

        setComments(comments.filter(comment => comment.id !== commentId));
      } catch (err) {
        console.warn(err);
      }
    },
    [comments],
  );

  const addComment = useCallback(
    async(comment) => {
      try {
        const newComment = await postComment({
          postId: post.id,
          ...comment,
        });

        setComments(currentComments => [...currentComments, newComment]);
      } catch (err) {
        console.warn(err);
      }
    },
    [post],
  );

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {
        isLoading
          ? <Loader />
          : (
            <>
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
            </>
          )
      }
    </div>
  );
};

PostDetails.propTypes = PostDetailsProps;
