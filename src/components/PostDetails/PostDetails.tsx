import React, { useState, useEffect, useCallback } from 'react';

import { getCommentsOfPost } from '../../api/comment';

import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { CommentItem } from '../CommentItem';

import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { LoadStage } from '../../types/LoadStage';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost: {
    id,
    title,
    body,
  },
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadStage, setLoadStage] = useState(LoadStage.Uninitialized);
  const [isFormOpened, setIsFormOpened] = useState(false);

  useEffect(() => {
    setLoadStage(LoadStage.Loading);
    setIsFormOpened(false);

    getCommentsOfPost(id)
      .then(setComments)
      .then(
        () => setLoadStage(LoadStage.Success),
        () => setLoadStage(LoadStage.Error),
      );
  }, [id]);

  const handleCommentAddLocal = useCallback((comment: Comment): void => (
    setComments(prevComments => [...prevComments, comment])
  ), []);

  const handleCommentDeleteLocal = useCallback((commentId: number): void => (
    setComments(prevComments => (
      prevComments.filter(comment => comment.id !== commentId)
    ))
  ), []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {loadStage === LoadStage.Loading && (
            <Loader />
          )}

          {loadStage === LoadStage.Error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {loadStage === LoadStage.Success && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {loadStage === LoadStage.Success && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onCommentDelete={handleCommentDeleteLocal}
                />
              ))}
            </>
          )}

          {loadStage === LoadStage.Success && !isFormOpened && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpened(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpened && (
          <NewCommentForm
            postId={id}
            onCommentAdd={handleCommentAddLocal}
          />
        )}
      </div>
    </div>
  );
};
