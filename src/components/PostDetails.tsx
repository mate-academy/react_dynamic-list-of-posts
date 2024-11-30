import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { CommentItem } from './CommentItem';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post | null;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isErrorAdding, setIsErrorAdding] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);

  useEffect(() => {
    if (post === null) {
      return;
    }
  }, []);

  useEffect(() => {
    setIsErrorAdding(false);
  }, [post?.id]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setIsFormOpened(false);

    client
      .get<Comment[]>(`/comments?postId=${post?.id}`)
      .then(data => setComments(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [post?.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isErrorAdding ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Unable to add a comment
            </div>
          ) : isLoading ? (
            <Loader />
          ) : isError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : !!comments?.length ? (
            <>
              <p className="title is-4">Comments:</p>

              {comments?.map(comment => (
                <CommentItem
                  comment={comment}
                  key={comment.id}
                  setComments={setComments}
                />
              ))}
            </>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !isFormOpened && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpened(true)}
            >
              Write a comment
            </button>
          )}
          {isFormOpened && !isErrorAdding && (
            <NewCommentForm
              postId={post?.id}
              comments={comments}
              addNewComment={setComments}
              onAddingError={setIsErrorAdding}
            />
          )}
        </div>
      </div>
    </div>
  );
};
