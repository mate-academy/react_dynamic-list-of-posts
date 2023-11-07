import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/services';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenedForm, setIsOpenedForm] = useState(false);

  const onSetError = () => {
    setError(true);
  };

  const loadCommentsFromServer = async (post: Post) => {
    setLoading(true);

    try {
      const usersFromServer = await getComments(post.id);

      setComments(usersFromServer);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const addNewComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  useEffect(() => {
    if (selectedPost) {
      setError(false);
      setComments([]);
      loadCommentsFromServer(selectedPost);
    }
  }, [selectedPost]);

  const handleDeleteComment = (id: number) => {
    try {
      deleteComment(id);

      setComments((prev) => prev.filter(com => com.id !== id));
    } catch {
      setComments(prev => prev);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {`${selectedPost?.body}`}
          </p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error
            && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

          {comments?.length === 0 && !loading
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

          {comments?.length !== 0 && !loading
            && (
              <>
                <p className="title is-4">Comments:</p>
                {comments?.map(comment => {
                  return (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
                    >
                      <div className="message-header">
                        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                          {comment.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  );
                })}
              </>
            )}
          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              Some comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>
            <div
              className="message-body"
              data-cy="CommentBody"
            >
              One more comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {'Multi\nline\ncomment'}
            </div>
          </article> */}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsOpenedForm(true)}
          >
            Write a comment
          </button>
        </div>

        {isOpenedForm
          && (
            <NewCommentForm
              selectedPost={selectedPost}
              addNewComment={addNewComment}
              onSetError={onSetError}
            />
          )}

      </div>
    </div>
  );
};
