import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/post';
import { getPostComments, deleteComment } from '../../api/comment';
import { Comments } from '../Comments/Comments';

export const PostDetails = ({ postId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then((post) => {
        setPostDetails(post);
      });
  }, [postId]);

  useEffect(() => {
    getPostComments(postId)
      .then((comment) => {
        setComments(comment);
      });
  }, [postId]);

  const updateComments = async() => {
    const commentsFromserver = await getPostComments(postId);

    setComments(commentsFromserver);
  };

  const handleDelete = async(commentId) => {
    await deleteComment(commentId);
    updateComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        {
          comments.length
            ? (
              <>
                <button
                  type="button"
                  className="button"
                  onClick={() => setHide(!hide)}
                >
                  {
                    hide
                      ? `Show ${comments.length} comments`
                      : `Hide ${comments.length} comments`
                  }
                </button>

                <ul className="PostDetails__list">
                  {
                    hide
                      ? ''
                      : (
                        <Comments
                          comments={comments}
                          handleDelete={handleDelete}
                        />
                      )
                  }
                </ul>
              </>
            )
            : <p>My first comment</p>
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm comments={getPostComments} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
