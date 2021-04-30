import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, removeComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId, selectedPost }) => {
  const [comments, setComments] = useState([]);
  const [isCommentShown, setIsCommentShown] = useState(true)

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(commentsFromServer => setComments(commentsFromServer))

    console.log('hi');
  }, [selectedPostId])

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{`Title: ${selectedPost.title || 'This post hasn\'t title'}`}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setIsCommentShown(current => !current)}
        >
          {`${isCommentShown ? 'Hide ' : 'Show '}${comments.length} comments`}
        </button>

        {isCommentShown && (
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
                    removeComment(comment.id, { method: 'DELETE' })
                      .then(result => console.log(result))
                  }}
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
          />
        </div>
      </section>
    </div>
  )
};
