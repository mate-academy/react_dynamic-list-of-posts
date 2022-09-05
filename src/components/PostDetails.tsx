import React, { useState, useEffect } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isUpdates, setIsUpdates] = useState(false);

  const loadComments = async (id: number): Promise<any> => {
    setIsLoading(true);
    const result = await client.get(`/comments?postId=${id}`);

    setIsLoading(false);

    return result;
  };

  useEffect(() => {
    loadComments(post.id)
      .then(response => {
        if ('error' in response) {
          setHasError(true);
        } else {
          setComments(response);
        }
      });
    setIsOpenForm(false);
    setIsUpdates(false);
  }, [post, isUpdates]);

  const handleUpdate = (comment: Comment) => {
    setComments((prev) => [...prev, comment]);
  };

  const handleRemove = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
    client.delete(`/comments/${id}`);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {(() => {
            if (isLoading) {
              return (<Loader />);
            }

            if (comments.length === 0) {
              return (
                <p
                  className="title is-4"
                  data-cy="NoCommentsMessage"
                >
                  No comments yet
                </p>
              );
            }

            return (
              <>
                <p className="title is-4">
                  Comments:
                </p>

                {comments.map(comment => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
                    <div className="message-header">
                      <a
                        href="mailto:misha@mate.academy"
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleRemove(comment.id)}
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
            );
          })()}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isOpenForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsOpenForm(true);
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenForm && (
          <NewCommentForm
            postId={post.id}
            onUpdate={(comment) => {
              handleUpdate(comment);
            }}
          />
        )}
      </div>
    </div>
  );
};
