import {
  FC, memo, useCallback, useEffect, useState,
} from 'react';
import {
  addComment, deleteComment, getCommentsByPostId,
} from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post
};

export const PostDetails: FC<Props> = memo(({ post }) => {
  const { id: postId, title, body: postBody } = post;

  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentWriting, setIsCommentWriting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCommentDelete = async (commentId: number) => {
    setErrorMessage('');

    const currentComments = comments;

    try {
      setComments(comments.filter(({ id }) => id !== commentId));

      await deleteComment(commentId);
    } catch {
      setErrorMessage("Can't delete comment");
      setComments(currentComments);
    }
  };

  const handleCommentAdd = useCallback(async (commentData: CommentData) => {
    try {
      setErrorMessage('');

      const uploadedComment = await addComment({ postId, ...commentData });

      setComments(prevComments => [...prevComments, uploadedComment]);

      return true;
    } catch (error) {
      setErrorMessage("Can't add comment");

      return false;
    }
  }, []);

  useEffect(() => {
    setErrorMessage('');
    setIsCommentWriting(false);
    setIsLoading(true);

    getCommentsByPostId(postId)
      .then(loadedComments => {
        setComments(loadedComments);
      })
      .catch(() => {
        setErrorMessage("Can't load comments");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postId}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {postBody}
          </p>
        </div>

        <div className="block">
          {isLoading
            ? <Loader />
            : (
              <>
                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!comments.length && !errorMessage && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {comments.length > 0 && (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(({
                      id, email, name, body,
                    }) => (
                      <article
                        key={id}
                        className="message is-small"
                        data-cy="Comment"
                      >
                        <div className="message-header">
                          <a
                            href={`mailto:${email}"`}
                            data-cy="CommentAuthor"
                          >
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
                    ))}
                  </>
                )}

                {!isCommentWriting && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsCommentWriting(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}

        </div>

        {isCommentWriting && <NewCommentForm onSubmit={handleCommentAdd} />}
      </div>
    </div>
  );
});
