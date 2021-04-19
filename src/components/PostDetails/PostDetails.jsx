import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import { Loader } from '../Loader';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(result => setPost(result));

    getPostComments(selectedPostId)
      .then((result) => {
        setComments(result);
        setLoading(false);
      });
  }, [selectedPostId]);

  const deleteThisComment = (commentId) => {
    deleteComment(commentId);

    setComments(prevComments => prevComments
      .filter(comment => comment.id !== commentId));
  };

  const addComment = (comment) => {
    setComments(prevComments => [
      ...prevComments,
      comment,
    ]);
  };

  if (!post) {
    return (
      <p>
        No post selected
      </p>
    );
  }

  if (loading) {
    return (<Loader />);
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        {showComment
          ? (
            <button
              type="button"
              className="button"
              onClick={() => {
                setShowComment(false);
              }}
            >
              {comments.length === 1
                ? `Hide comment`
                : `Hide ${comments.length} comments`
            }
            </button>
          )
          : (
            <button
              type="button"
              className="button"
              onClick={() => {
                setShowComment(true);
              }}
            >
              {comments.length === 1
                ? `Show comment`
                : `Show ${comments.length} comments`
            }
            </button>
          )
        }
        {showComment && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteThisComment(comment.id)}
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
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};
