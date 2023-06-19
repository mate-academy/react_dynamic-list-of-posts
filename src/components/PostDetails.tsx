import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments } from '../api/comments';
import { CommentItem } from './CommentItem';

type Props = {
  currentPost: Post,
};

export const PostDetails: React.FC<Props> = ({ currentPost }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setIsWriting(false);
    setIsLoading(true);
    getComments(currentPost.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [currentPost]);

  const handleSetWriting = () => {
    setIsWriting(true);
  };

  const addNewComment = (comment: Comment) => {
    setComments(prevState => [...prevState, comment]);
  };

  const deleteCurrentComment = (id: number) => {
    setComments(prevState => prevState.filter(item => {
      return item.id !== id;
    }));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost.id}: ${currentPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {currentPost.body}
          </p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {!comments.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      setIsError={setIsError}
                      deleteCurrentComment={deleteCurrentComment}
                    />
                  ))}
                </>
              )}
            </>
          )}

          {!isWriting && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleSetWriting}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriting && (
          <NewCommentForm
            postId={currentPost.id}
            setIsError={setIsError}
            addNewComment={addNewComment}
          />
        )}
      </div>
    </div>
  );
};
