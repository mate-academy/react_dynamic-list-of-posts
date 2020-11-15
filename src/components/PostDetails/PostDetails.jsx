import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { deleteComment, getComments } from '../../api/comments';
import { Loader } from '../Loader';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisibleComments, setVisibleComments] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostAndComments = async(id) => {
      try {
        setLoading(true);
        const [commentsFromServer, postFromServer] = await Promise
          .all([getComments(id), getPostDetails(id)]);

        setLoading(false);
        setPost(postFromServer);
        setComments(commentsFromServer);
      } catch (error) {
        setLoading(false);
        setErrorMessage(`${error}`);
      }
    };

    fetchPostAndComments(postId);
  }, [postId]);

  const handleUpdateComments = useCallback(async() => {
    try {
      const updatedComments = await getComments(postId);

      setComments(updatedComments);
    } catch (error) {
      setErrorMessage(`${error}`);
    }
  }, [postId]);

  const handleDeleteComment = async(id) => {
    await deleteComment(id);

    handleUpdateComments();
  };

  if (errorMessage) {
    return (
      <div className="PostDetails">
        <h3>{errorMessage}</h3>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {isLoading
        ? <Loader />
        : (
          <>
            <section className="PostDetails__post">
              <p>{post.body}</p>
            </section>
            {comments.length
              ? (
                <section className="PostDetails__comments">
                  <button
                    type="button"
                    className="button"
                    onClick={() => setVisibleComments(prevState => !prevState)}
                  >
                    {`${isVisibleComments
                      ? 'Hide'
                      : 'Show'} ${comments.length} comments`}
                  </button>
                  {isVisibleComments && (
                    <ul className="PostDetails__list">
                      {comments.map(comment => (
                        <li
                          className="PostDetails__list-item"
                          key={comment.id}
                        >
                          <button
                            type="button"
                            className="PostDetails__remove-button button"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            X
                          </button>
                          <p>{comment.body}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ) : ''}
            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  postId={postId}
                  handleUpdateComments={handleUpdateComments}
                />
              </div>
            </section>
          </>
        )}
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
