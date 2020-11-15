import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AddCommentForm } from '../../Comments/addCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../../api/posts';
import {
  getPostComments,
  addComment,
  removeComment,
} from '../../../api/comments';
import { CommentsDetails } from '../../Comments/CommentsDetails';

export const PostDetails = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);

  const add = async(newComment) => {
    await addComment(newComment);

    setComments([...comments, newComment]);
  };

  const remove = async(removedCommentId) => {
    await removeComment(removedCommentId);
    const filteredComments = comments.filter(
      comment => removedCommentId !== comment.id,
    );

    setComments(filteredComments);
  };

  useEffect(() => {
    const getDetails = async() => {
      const postFromServer = await getPostDetails(postId);

      setPost(postFromServer);
    };

    const getComments = async() => {
      const commentsFromServer = await getPostComments(postId);

      setComments(commentsFromServer);
    };

    getDetails();
    getComments();
  }, [postId]);

  return (
    <>
      {!post ? (
        <h2>Please wait, posts loading</h2>
      ) : (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          {!!comments.length && (
            <CommentsDetails
              commentsLength={comments.length}
              comments={comments}
              remove={remove}
            />
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <AddCommentForm
                postId={postId}
                add={add}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
