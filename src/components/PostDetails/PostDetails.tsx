import React, { useState, useEffect } from 'react';
import { deleteCommentHandler, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  post: Post;
  selectedPostId: number | undefined;
};

export const PostDetails: React.FC<Props> = ({ post, selectedPostId }) => {
  const [comments, setComments] = useState<Comments[] | undefined>();
  const [isCommentsVisible, setCommentsVisible] = useState(true);

  const updateComments = () => {
    if (selectedPostId !== undefined) {
      getPostComments(selectedPostId).then(res => {
        setComments(res);
      });
    }
  };

  useEffect(updateComments, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments && (comments.length === 0 ? 'No Comments'
          : (
            <button
              type="button"
              className="button"
              onClick={() => setCommentsVisible(!isCommentsVisible)}
            >
              {isCommentsVisible ? 'Hide' : 'Show'}
              {' '}
              {comments.length}
              {' '}
              {(comments.length === 1) ? 'comment' : 'comments'}
            </button>
          ))}
        <ul className="PostDetails__list">
          {comments && isCommentsVisible && comments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => deleteCommentHandler(comment.id)
                  .then(updateComments)}
              >
                X
              </button>

              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          {selectedPostId
            && (
              <NewCommentForm
                postId={selectedPostId}
                updateComments={updateComments}
              />
            )}
        </div>
      </section>
    </div>
  );
};
