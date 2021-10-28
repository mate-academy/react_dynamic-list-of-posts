import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, deleteComment } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [isCommentsListHidden, setCommentsListVisibility] = useState<boolean>(true);
  const [commentsList, setCommentsList] = useState<PostComment[]>([]);

  useEffect(() => {
    getPostComments(selectedPost.id)
      .then(comments => setCommentsList(comments));
  }, [commentsList]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button PostDetails__comment-button"
          onClick={() => setCommentsListVisibility(!isCommentsListHidden)}
        >
          {isCommentsListHidden && (commentsList.length === 0 ? 'Hide form' : `Hide ${commentsList.length} comments`)}
          {!isCommentsListHidden && (commentsList.length === 0 ? 'Add new comment' : `Show ${commentsList.length} comments`)}
        </button>

        {isCommentsListHidden && (
          <ul className="PostDetails__list">
            {commentsList.map((comment: PostComment) => (
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
            ))}
          </ul>
        )}
      </section>

      {isCommentsListHidden && (
        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm postId={selectedPost.id} />
          </div>
        </section>
      )}
    </div>
  );
};
