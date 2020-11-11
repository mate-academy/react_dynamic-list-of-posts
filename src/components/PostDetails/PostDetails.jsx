import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Loader } from '../Loader';
import { getPostDetails } from '../../api/posts';
import { getPostComments, addComment, removeComment } from '../../api/comments';
import { ButtonShowHide } from '../ButtonShowHide';

export const PostDetails = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [isShowedComments, setIsShowedComments] = useState(false);

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

  const isShowedCommentsOnClick = (bool) => {
    setIsShowedComments(bool);
  };

  return (
    <>
      {!post ? (
        <Loader />
      ) : (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          {!!comments.length && (
            <section className="PostDetails__comments">
              <ButtonShowHide
                commentsLength={comments.length}
                isShowedCommentsOnClick={isShowedCommentsOnClick}
              />
              {isShowedComments && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => remove(comment.id)}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
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
