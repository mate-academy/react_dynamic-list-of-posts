import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [tempComments, setTempComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ollComments = [...comments, ...tempComments];

  const getComments = useCallback(async (): Promise<void> => {
    if (!selectedPost) {
      return;
    }

    try {
      setError(false);
      setLoading(true);
      const fetchedcomments = (await client.get(
        `/comments?postId=${selectedPost.id}`,
      )) as Comment[];

      setComments(fetchedcomments);
      setTempComments(prevTemp =>
        prevTemp.filter(
          temp =>
            !fetchedcomments.some(
              comment =>
                comment.name === temp.name &&
                comment.email === temp.email &&
                comment.body === temp.body,
            ),
        ),
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [selectedPost]);

  const deleteComment = async (commentId: number): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      await client.delete(`/comments/${commentId}`);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
      setTempComments(prevTemp =>
        prevTemp.filter(temp => temp.id !== commentId),
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPost !== null) {
      getComments();
      setIsOpen(false);
    }
  }, [selectedPost, getComments]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost?.id}: {selectedPost?.title}
        </h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading ? <Loader /> : null}

        {error ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong!
          </div>
        ) : (
          <>
            {!loading && comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {ollComments.map((comment: Comment) => (
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
                        onClick={() => deleteComment(comment.id)}
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
            {!loading && !isOpen ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsOpen(true)}
              >
                Write a comment
              </button>
            ) : null}{' '}
            {isOpen && (
              <NewCommentForm
                postId={selectedPost.id}
                setError={setError}
                getComments={getComments}
                setTempComments={setTempComments}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
