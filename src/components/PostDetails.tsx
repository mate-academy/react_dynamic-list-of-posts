import React, {
  useEffect,
  useState,
} from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/posts';

type Props = {
  post: Post,
  setIsError: (error: boolean) => void,
  error: boolean,
};

export const PostDetails: React.FC<Props> = React.memo(({
  post,
  setIsError,
  error,
}) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [writeCommentButtonClick, setWriteCommentButtonClick] = useState(false);

  const loadComments = async () => {
    const loadingUsers = await getComments(post.id);

    setComments(loadingUsers);
  };

  useEffect(() => {
    setComments(null);
    loadComments();
    setWriteCommentButtonClick(false);
  }, [post.id]);

  const handleCommentDelete = (id: number) => {
    setIsError(false);
    try {
      deleteComment(id);

      setComments(state => {
        if (state) {
          return [...state.filter(comment => comment.id !== id)];
        }

        return [];
      });
    } catch {
      setIsError(true);
    }
  };

  const handleWriteCommentButtonClick = () => {
    setWriteCommentButtonClick(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post?.title}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {!comments ? (
            <Loader />
          ) : (
            <>
              {error && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              <p className="title is-4">Comments:</p>

              {!comments?.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                comments?.map(({
                  id,
                  email,
                  name,
                  body,
                }) => {
                  return (
                    <article
                      key={id}
                      className="message is-small"
                      data-cy="Comment"
                    >
                      <div className="message-header">
                        <a href={email} data-cy="CommentAuthor">
                          {name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => handleCommentDelete(id)}
                        >
                          delete button
                        </button>
                      </div>
                      <div className="message-body" data-cy="CommentBody">
                        {body}
                      </div>
                    </article>
                  );
                })
              )}
            </>
          )}
          {!writeCommentButtonClick && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteCommentButtonClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeCommentButtonClick && (
          <NewCommentForm
            setComments={setComments}
            postId={post?.id}
          />
        )}
      </div>
    </div>
  );
});
