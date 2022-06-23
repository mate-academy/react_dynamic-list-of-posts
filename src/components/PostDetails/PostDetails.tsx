import React from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
  postDetails: Post | null;
  postsComments: Comment[] | [];
  hideDetails: boolean;
  setHideDetails: (prev:boolean) => void;
  deletePostCommentById: (id:number) => void;
  newComment: (body:NewComment) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
  postDetails,
  postsComments,
  hideDetails,
  setHideDetails,
  deletePostCommentById,
  newComment,
}) => {
  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {
        selectedPostId ? (
          <>
            <section className="PostDetails__post">
              <p>{postDetails?.body}</p>
            </section>

            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setHideDetails(!hideDetails)}
              >
                {!hideDetails
                  ? `Hide ${postsComments.length} comments`
                  : `Show ${postsComments.length} comments`}
              </button>
              <ul
                className="PostDetails__list"
                data-cy="postDetails"
              >

                {!hideDetails && (
                  postsComments.map(comment => {
                    const { body, id } = comment;

                    return (
                      <li
                        className="PostDetails__list-item"
                        key={id}
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => deletePostCommentById(id)}
                        >
                          X
                        </button>
                        <p>{body}</p>
                      </li>
                    );
                  })
                )}
              </ul>
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  selectedPostId={selectedPostId}
                  newComment={newComment}
                />
              </div>
            </section>
          </>
        )
          : null
      }
    </div>
  );
};
