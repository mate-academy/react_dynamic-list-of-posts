import React, { useCallback, useState } from 'react';
import { deleteCommentFromServer } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPost: Post;
  selectedPostComments: Comment[];
  getComments: () => Promise<void>;
};

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPost,
  selectedPostComments,
  getComments,
}) => {
  const [isCommentsVisible, setCommentsVisible] = useState(true);
  const [isDeleteCommentLoading, setDeleteCommentLoading] = useState(false);
  const [deleteTargets, setDeleteTargets] = useState<number[]>([]);

  const deleteComment = useCallback(async (id: number) => {
    setDeleteCommentLoading(true);
    await deleteCommentFromServer(id);
    await getComments();
    setDeleteCommentLoading(false);
    setDeleteTargets((prevState) => {
      return prevState.filter(targetId => targetId !== id);
    });
  }, [getComments]);

  return (
    <div
      className="PostDetails"
      data-cy="postDetails"
    >
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {selectedPost.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsVisible(!isCommentsVisible)}
        >
          {`${isCommentsVisible ? ('Hide') : ('Show')} ${selectedPostComments.length} comments`}
        </button>

        <ul className="PostDetails__list">
          {isCommentsVisible && (
            selectedPostComments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                    setDeleteTargets((prevState) => {
                      return ([
                        ...prevState,
                        comment.id,
                      ]);
                    });
                  }}
                  disabled={isDeleteCommentLoading
                    && deleteTargets.includes(comment.id)}
                >
                  {isDeleteCommentLoading && deleteTargets.includes(comment.id)
                    ? (<Loader />)
                    : 'X'}
                </button>
                <p>
                  {comment.body}
                </p>
              </li>
            ))
          )}

        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPost.id}
            getComments={getComments}
          />
        </div>
      </section>
    </div>
  );
});
