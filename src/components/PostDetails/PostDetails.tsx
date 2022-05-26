import React, { useCallback, useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [details, setPDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isVisibleComments, setIsVisibleComments] = useState(true);

  const handleVisibilityComments = useCallback(() => {
    setIsVisibleComments(!isVisibleComments);
  }, [isVisibleComments]);

  const handleRemoveComment = useCallback(async (commentId: number) => {
    await removeComment(commentId);
    const updatedComments
      = comments?.filter((comment) => comment.id !== commentId) || null;

    setComments(updatedComments);
  }, [comments]);

  const postDetails = useCallback(async () => {
    const [userPostDetails, userPostComments] = await Promise.all([
      getPostDetails(selectedPostId),
      getPostComments(selectedPostId),
    ]);

    setPDetails(userPostDetails);
    setComments(userPostComments);
  }, [selectedPostId]);

  useEffect(() => {
    setComments(comments);
    postDetails();
  }, [selectedPostId, comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleVisibilityComments}
        >
          {(comments && comments.length > 0) && (isVisibleComments
            ? `Hide ${comments?.length} comments`
            : `Show ${comments?.length} comments`)}

          {(!comments || !comments.length) && 'No comments'}
        </button>

        <ul className="PostDetails__list" data-cy="postDetails">
          {isVisibleComments && comments?.map((comment) => (
            <li
              className="PostDetails__list-item"
              key={comment.id}
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => handleRemoveComment(comment.id)}
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
          <NewCommentForm
            selectedPostId={selectedPostId}
            setComments={setComments}
            comments={comments}
          />
        </div>
      </section>
    </div>
  );
};
