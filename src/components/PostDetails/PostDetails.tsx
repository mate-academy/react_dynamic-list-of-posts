import React from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectPostDetails: Post | null;
  showOrHideComments: () => void | Promise<void>;
  showComments: boolean;
  postComments: Comment[];
  deleteComment: (commentId: Comment) => void;
  changeName: (value: React.ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (value: React.ChangeEvent<HTMLInputElement>) => void;
  changeBody: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  postName: string;
  postEmail: string;
  postBody: string;
  addComment: () => void;
  isLoadingComments: boolean;
  isLoadingForm: boolean;
};

export const PostDetails: React.FC<Props> = (
  {
    selectPostDetails,
    showOrHideComments,
    showComments,
    postComments,
    deleteComment,
    changeName,
    changeEmail,
    changeBody,
    postName,
    postEmail,
    postBody,
    addComment,
    isLoadingComments,
    isLoadingForm,
  },
) => {
  if (!selectPostDetails) {
    return null;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectPostDetails.body}</p>
      </section>

      <section className="PostDetails__comments" data-cy="postList">
        <button
          type="button"
          className="button"
          onClick={showOrHideComments}
        >
          {showComments ? 'Hide comments' : 'Show comments'}
        </button>

        {showComments && (
          isLoadingComments ? <Loader /> : (
            <ul className="PostDetails__list">
              {postComments.length > 0
                ? (postComments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(comment)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                )))
                : 'No comments yet'}
            </ul>
          )
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          {isLoadingForm
            ? <Loader />
            : (
              <NewCommentForm
                addComment={addComment}
                name={postName}
                email={postEmail}
                body={postBody}
                changeName={changeName}
                changeEmail={changeEmail}
                changeBody={changeBody}
              />
            )}
        </div>
      </section>
    </div>
  );
};
