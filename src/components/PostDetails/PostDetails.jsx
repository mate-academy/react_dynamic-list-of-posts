import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { deletePostComment, getPostComments } from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    const addDetails = async() => setPost(
      await getPostDetails(selectedPostId),
    );

    const addComments = async() => setComments(
      await getPostComments(selectedPostId),
    );

    addDetails();
    addComments();
  }, [selectedPostId, commentsVisible]);

  const deleteComment = async(commentId) => {
    await deletePostComment(commentId);
    setComments(
      await getPostComments(selectedPostId),
    );
  };

  return (
    !post
      ? (
        <Loader />
      ) : (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            {post
            && <p>{post.body}</p>}
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              onClick={() => setCommentsVisible(!commentsVisible)}
              className="button"
            >
              {`${commentsVisible
                ? 'Hide'
                : 'Show'} ${comments.length} comments`}
            </button>
            {commentsVisible
            && (
              <ul className="PostDetails__list">
                {comments.map(comment => (

                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                selectedPostId={selectedPostId}
                setComments={setComments}
              />
            </div>
          </section>
        </div>
      )
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
