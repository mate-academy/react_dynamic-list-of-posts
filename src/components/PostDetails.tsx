import {FC, memo, useEffect, useState} from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment, deleteComment, getComments } from '../api/comment';

interface Props {
  post: Post | null;
}
export const PostDetails: FC<Props> = memo(({ post }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const loadComments = async () => {
    try {
      if (post) {
        setIsLoading(true);
        const commentsFromServer = await getComments(post.id);

        setComments(commentsFromServer);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (comments) {
      const filteredComments = comments.filter(comment => (
        comment.id !== commentId
      ));

      setComments(filteredComments);
      try {
        await deleteComment(commentId);
      } catch {
        throw new Error('Unable to delete a comment');
      }
    }
  };

  const handleAdd = async (comment: Comment) => {
    try {
      const newComment = await addComment(comment);

      if (comments) {
        setComments([...comments, newComment]);
      }
    } catch {
      throw new Error('Unable to add a comment');
    } finally {
      setIsSubmitted(false);
      setIsFormLoading(false);
    }
  };

  useEffect(() => {
    setIsFormActive(false);
    setIsError(false);
    loadComments();
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
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

              {comments && !isLoading && !isError && (
                <>
                  {!comments?.length ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments:</p>
                    </>
                  )}

                  {comments?.map(comment => (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${comment.email}`}
                          data-cy="CommentAuthor"
                        >
                          {comment.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => handleDelete(comment.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  ))}
                </>
              )}

              {(!isError && !isLoading && post?.id) && (
                isFormActive ? (
                  <NewCommentForm
                    postId={post?.id}
                    onAdd={handleAdd}
                    isSubmitted={isSubmitted}
                    setSubmitted={setIsSubmitted}
                    isLoading={isFormLoading}
                    onLoad={setIsFormLoading}
                  />
                ) : (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsFormActive(true)}
                  >
                    Write a comment
                  </button>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});
