import React, { useEffect, useState } from 'react';
import { getPostDetails, getPostComments, deleteComment } from '../../api/api';
import { Comment } from '../../types/Comment';
import { Details } from '../../types/Details';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Details>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentShow, setIsCommentShow] = useState<boolean>(true);
  const [commentAdded, setCommentAdded] = useState<boolean>(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(data => setPostDetails(data));
    getPostComments(selectedPostId)
      .then(data => setComments(data));
  }, [selectedPostId, commentAdded]);

  return (
    <div className="PostDetails">
      {postDetails && (
        <>
          <h2>{`Post details: ${selectedPostId}`}</h2>

          <section className="PostDetails__post">
            <p>{postDetails.title}</p>
          </section>

          {comments.length > 0 && (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setIsCommentShow(!isCommentShow)}
              >
                {isCommentShow ? (
                  `Hide ${comments.length} comments`
                ) : (
                  `Show ${comments.length} comments`
                )}
              </button>

              {isCommentShow && (
                <ul className="PostDetails__list" data-cy="postDetails">
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => {
                          deleteComment(comment.id)
                            .then(() => {
                              setComments(comments.filter(item => (
                                item.id !== comment.id
                              )));
                            });
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
                selectedPostId={selectedPostId}
                setCommentAdded={setCommentAdded}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
