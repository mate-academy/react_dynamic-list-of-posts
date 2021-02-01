import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
// eslint-disable-next-line max-len
import { getPostComments, deleteCommentFromServer, postCommentToServer } from '../../api/comments';
import { Loader } from '../Loader';
import './PostDetails.scss';

export const PostDetails = React.memo(({ selectedPostId }) => {
  const [currentPost, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsVisibility, toggleComments] = useState(true);

  const loadPost = async(postId) => {
    const post = await getPostDetails(postId);

    setPost(post);
  };

  const loadComments = async(postId) => {
    const loadedComments = await getPostComments(postId);

    setComments(loadedComments);
  };

  const deleteComment = async(commentId) => {
    try {
      const comment = await deleteCommentFromServer(commentId);

      loadComments(selectedPostId);
      // eslint-disable-next-line no-console
      console.log(`Comment ${comment.id} was deleted`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Something went wrond - ${error}`);
    }
  };

  const postComment = async(data) => {
    const [nameQuery, emailQuery, bodyQuery] = data;

    try {
      const comment = await postCommentToServer({
        postId: selectedPostId,
        name: nameQuery,
        email: emailQuery,
        body: bodyQuery,
      });

      loadComments(selectedPostId);
      // eslint-disable-next-line no-console
      console.log(`Post ${comment.id} was added`);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    loadPost(selectedPostId);
    loadComments(selectedPostId);
  }, [selectedPostId]);

  if (!currentPost) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {currentPost.title}
        </p>
      </section>

      <section className="PostDetails__comments">
        {!commentsVisibility
          ? (
            <button
              type="button"
              className="button"
              onClick={() => {
                toggleComments(!commentsVisibility);
              }}
            >
              Show
              {` ${comments.length} `}
              Comments
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => {
                toggleComments(!commentsVisibility);
              }}
            >
              Hide Comments
            </button>
          )
        }

        {comments && commentsVisibility
          && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                  <p>
                    {comment.body}
                  </p>

                  <span className="PostDetails__name">
                    {comment.name}
                  </span>
                </li>
              ))}
            </ul>
          )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postComment={postComment} />
        </div>
      </section>
    </div>
  );
});

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
