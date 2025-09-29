import { FC, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deletePostComment, getPostComments } from './services/comments';
import { Comment } from '../types/Comment';

type Props = {
  activePost: Post;
};

export const PostDetails: FC<Props> = ({ activePost }) => {
  const [isloading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isActiveWriteComment, setIsActiveWriteComment] = useState(false);
  const [deletedComment, setDeletedComment] = useState<number | null>(null);

  useEffect(() => {
    setComments([]);
    setErrorMessage('');
    if (activePost) {
      setIsLoading(true);
      getPostComments(activePost.id)
        .then(commentsFromServer => {
          setComments(commentsFromServer);
          setIsActiveWriteComment(false);
        })
        .catch(() => {
          setErrorMessage('Something went wrong!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [activePost]);

  const deleteComment = async (commentId: number) => {
    setDeletedComment(commentId);

    return deletePostComment(commentId)
      .then(() => {
        setComments(currentComments => {
          return currentComments.filter(comment => comment.id !== commentId);
        });
      })
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setDeletedComment(null);
      });
  };

  const addComment = (newComment: Comment) => {
    setComments(currentComments => {
      return [...currentComments, newComment];
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{activePost.id}: {activePost.title}
        </h2>

        <p data-cy="PostBody">{activePost.title}</p>
      </div>

      <div className="block">
        {isloading && <Loader />}

        {!isloading && errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isloading && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isloading && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  {deletedComment === comment.id && <Loader />}
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
                    disabled={!!deletedComment}
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

        {!isloading && !isActiveWriteComment && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsActiveWriteComment(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isActiveWriteComment && (
        <NewCommentForm addComment={addComment} activePostId={activePost.id} />
      )}
    </div>
  );
};
