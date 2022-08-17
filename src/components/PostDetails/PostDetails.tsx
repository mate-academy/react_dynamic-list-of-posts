import React, { useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

import { getPostComments, deleteComment } from '../../api/comments';
import { Loader } from '../Loader';

type Props = {
  selectedPost: Post,
  postComments: Comment[] | null,
  setPostComments: (comments: Comment[] | null) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  postComments,
  setPostComments,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const buttonTitle = showComments
    ? `Show ${postComments?.length} comments`
    : `Hide ${postComments?.length} comments`;

  const removeComment = async (commentId: number) => {
    setIsLoadingComments(true);
    await deleteComment(commentId);

    const result = await getPostComments(selectedPost.id);

    setPostComments(result);
    setIsLoadingComments(false);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.body}</p>
      </section>

      {postComments && (
        isLoadingComments ? (
          <Loader />
        ) : (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setShowComments(!showComments)}
            >
              {buttonTitle}
            </button>

            {!showComments && (
              <ul className="PostDetails__list" data-cy="postDetails">
                {postComments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => removeComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )

      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPost={selectedPost}
            setPostComments={setPostComments}
            setIsLoadingComments={setIsLoadingComments}
          />
        </div>
      </section>
    </div>
  );
};
