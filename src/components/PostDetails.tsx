import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment } from '../api/comments';
import { warningTimer } from '../utils/warningTimer';

type Props = {
  post: Post | null;
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
  isLoaderComments: boolean,
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  setComments,
  isLoaderComments,
}) => {
  const [isWriteComment, setIsWriteComment] = useState(false);
  const [isHasError, setIsHasError] = useState(false);

  const removeComment = async (commentRemoveId: number) => {
    try {
      await deleteComment(commentRemoveId);
      setComments(prevComments => prevComments
        .filter(({ id }) => id !== commentRemoveId));
    } catch {
      setIsHasError(true);
      warningTimer(setIsHasError, false, 3000);
    }
  };

  useEffect(() => {
    setIsWriteComment(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isLoaderComments && <Loader />}

          {isHasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoaderComments && !isHasError && (!comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => {
                const {
                  id,
                  email,
                  name,
                  body,
                } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${email}`}
                        data-cy="CommentAuthor"
                      >
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => removeComment(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </>
          ))}

          {!isLoaderComments && !isHasError && !isWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteComment && (
          <NewCommentForm
            postId={post?.id}
            setComments={setComments}
            setIsHasError={setIsHasError}
          />
        )}
      </div>
    </div>
  );
};
