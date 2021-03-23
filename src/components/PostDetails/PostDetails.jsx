import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import {
  getPostComments,
  deletePostComments,
  createPost,
} from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [commentId, setCommentId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const postsDetailsData = await getPostDetails(selectedPostId);

      const postCommentsData = await getPostComments(selectedPostId);

      const filteredPostComments = postCommentsData.filter(comment => (
        comment.postId === selectedPostId
      ));

      setPostDetails(postsDetailsData);
      setPostComments(filteredPostComments);
    }

    fetchData();
  }, [selectedPostId]);

  const deletePost = useCallback(
    async() => {
      await deletePostComments(commentId);
      const postCommentsData = await getPostComments(selectedPostId);

      const filteredPostComments = postCommentsData.filter(comment => (
        comment.postId === selectedPostId
      ));

      setPostComments(filteredPostComments);
    },
    [selectedPostId, commentId],
  );

  useEffect(() => {
    deletePost();
  }, [deletePost]);

  function handleIsCommentVisible() {
    setIsCommentVisible(current => !current);
  }

  const addNewComment = useCallback(
    async(item) => {
      await createPost({ ...item });
      const postCommentsData = await getPostComments(selectedPostId);

      const filteredPostComments = postCommentsData.filter(comment => (
        comment.postId === selectedPostId
      ));

      setPostComments(filteredPostComments);
    }, [selectedPostId],
  );

  useEffect(() => {
    addNewComment();
  }, [addNewComment]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleIsCommentVisible}
        >
          {isCommentVisible
            ? `Hide ${postComments.length} comments`
            : `Show ${postComments.length} comments`
            }
        </button>
        {isCommentVisible && (
          <ul className="PostDetails__list">
            {postComments.map(postComment => (
              <li className="PostDetails__list-item" key={postComment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => setCommentId(postComment.id)}
                >
                  X
                </button>
                <p>{postComment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postDetails.id}
            newComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
