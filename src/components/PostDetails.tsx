import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isAddComment, setIsAddComment] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      setComments([]);
      setIsAddComment(false);

      client
        .get(`/comments?postId=${selectedPost?.id}`)
        .then(data => setComments(data as Comment[]))
        .catch(() => setError('Something went wrong'))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedPost]);

  const handleDelete = (id: number) => {
    const oldComments = [...comments];

    setComments(oldComments.filter(item => item.id !== id));

    client.delete(`/comments/${id}`).catch(() => {
      setComments(oldComments);
      throw Error('Something went wrong!');
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!isLoading && error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!isLoading && !comments.length && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !!comments.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment: Comment) => {
                const { id, email, name, body } = comment;

                return (
                  <article
                    key={id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDelete(id)}
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
          )}

          {!isLoading && !isAddComment && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsAddComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isAddComment && (
          <NewCommentForm postId={selectedPost?.id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
