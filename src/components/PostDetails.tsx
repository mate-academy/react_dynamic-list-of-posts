import React, { useState, useEffect } from 'react';

import { getCommentsOfPost } from '../api/comment';

import { NewCommentForm } from './NewCommentForm';
import { Loader } from './Loader';

import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { LoadStage } from '../types/LoadStage';
import { CommentItem } from './CommentItem';

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
  const [loadStage, setLoadStage]
    = useState<LoadStage>(LoadStage.Uninitialized);

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
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
