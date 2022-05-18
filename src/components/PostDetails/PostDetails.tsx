import React, { useState } from 'react';
import { removeComments } from '../../api/comments';
import { Comment, Post } from '../../types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postComments: Comment[];
  postDetails: Post | null;
  handleDeleteComment: (postId: number) => void;
  handleAddComment: (name: string, email: string, body: string) => void;
};

export const PostDetails: React.FC<Props> = ({
  postComments,
  postDetails,
  handleDeleteComment,
  handleAddComment,
}) => {
  const [showBtn, setShowBtn] = useState(true);

  const toogleBtn = () => {
    setShowBtn(!showBtn);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {postDetails && (
        <section className="PostDetails__post">
          <h4>{postDetails.title}</h4>
          <p>{postDetails.body}</p>
        </section>
      )}

      {!!postComments.length && (
        <section className="PostDetails__comments">
          {postComments.length === 1 ? (
            <>
              <button
                type="button"
                className="button"
                hidden={!showBtn}
                onClick={toogleBtn}
              >
                Hide 1 comment
              </button>

              <button
                type="button"
                className="button"
                hidden={showBtn}
                onClick={toogleBtn}
              >
                Show 1 comment
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="button"
                hidden={!showBtn}
                onClick={toogleBtn}
              >
                {`Hide ${postComments.length} comments`}
              </button>

              <button
                type="button"
                className="button"
                hidden={showBtn}
                onClick={toogleBtn}
              >
                {`Show ${postComments.length} comments`}
              </button>
            </>
          )}

          {showBtn && (
            <ul className="PostDetails__list">
              {postComments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      removeComments(comment.id);
                      handleDeleteComment(comment.id);
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
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            handleAddComment={handleAddComment}
            postDetails={postDetails}
          />
        </div>
      </section>
    </div>
  );
};
