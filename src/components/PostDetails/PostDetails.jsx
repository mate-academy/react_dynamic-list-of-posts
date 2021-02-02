import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostDetails.scss';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import * as api from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [hiddenComments, setHiddenComments] = useState(false);

  useEffect(() => {
    const fetchAllData = async() => {
      const postInfo = await getPostDetails(postId);
      const commentsInfo = await api.getPostComments(postId);

      setPost(postInfo.data);
      setComments(commentsInfo.data);
    };

    fetchAllData();
  }, [postId]);

  const deleteComment = async(commentId) => {
    await api.deletePostComment(commentId);
    const newComments = await api.getPostComments(postId);

    setComments(newComments.data);
  };

  const addComment = async({ name, email, body }) => {
    await api.addPostComment({
      postId, name, email, body,
    });
    const newComments = await api.getPostComments(postId);

    setComments(newComments.data);
  };

  if (postId && !post) {
    return <Loader />;
  }

  return (
    <>
      {post
        && (
          <div className="PostDetails">
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{post.body}</p>
            </section>

            {comments && comments.length > 0
              ? (
                <section className="PostDetails__comments">
                  <button
                    type="button"
                    className="button"
                    onClick={() => setHiddenComments(!hiddenComments)}
                  >
                    {!hiddenComments
                      ? `Hide ${comments.length} comments`
                      : `Show ${comments.length} comments`
                    }
                  </button>

                  <ul
                    className="PostDetails__list"
                    hidden={hiddenComments}
                  >
                    {comments.map(comment => (
                      <li
                        key={comment.id}
                        className="PostDetails__list-item"
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => deleteComment(comment.id)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))
                    }
                  </ul>
                </section>
              )
              : (
                <p className="PostDetails__empty-message">
                  There is no comments yet, you could be first !!!
                </p>
              )
            }

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm addComment={addComment} />
              </div>
            </section>
          </div>
        )
      }
    </>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
