import React, { useState } from 'react';
import { deleteComment } from '../../api/comments';
import { Post, Comment } from '../../types/types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  postDetails: Post | null;
  comments: Comment[];
  selectedPostId: number;
  updateDetails: () => void;
}

export const PostDetails: React.FC<Props> = (props) => {
  const {
    comments,
    postDetails,
    selectedPostId,
    updateDetails,
  } = props;

  const [showComments, setShowComments] = useState<boolean>(true);

  const isShowComments = showComments ? 'Hide' : 'Show';

  const removeComment = (id: number) => {
    deleteComment(id);
    updateDetails();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      {comments.length ? (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
            {`${isShowComments} ${comments.length} comments`}
          </button>

          {showComments && (
            <ul className="PostDetails__list">
              {comments.map((comment: Comment) => (
                <li key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(comment.id)}
                  >
                    X
                  </button>

                  <p>{`${comment.name} (${comment.email})`}</p>
                  <br />
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : 'No comments yet'}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={selectedPostId} updateDetails={updateDetails} />
        </div>
      </section>
    </div>
  );
};
