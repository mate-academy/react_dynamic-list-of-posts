import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null;
  newComment: boolean;
  handleNewComment: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  post, newComment, handleNewComment,
}) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadCommentsError, setLoadCommentsError] = useState(false);

  useEffect(() => {
    setLoadCommentsError(false);

    async function fetchComments() {
      if (post) {
        setIsLoading(true);
      }

      try {
        const data = await client.get<Comment[]>(`\\comments?postId=${post?.id}`);

        if (data) {
          setComments(data);
        }
      } catch (error) {
        setLoadCommentsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComments();
  }, [post]);

  const deleteComment = async (commentId: number) => {
    const backupComments = comments ? [...comments] : null;

    setComments(comments && comments
      .filter(comment => comment.id !== commentId));
    try {
      await client.delete(`\\comments/${commentId}`);
    } catch (error) {
      setComments(backupComments ? [...backupComments] : null);
    }
  };

  const handleComments = (value: Comment[]) => {
    setComments(value);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post && `#${post.id}: ${post?.title}`}
          </h2>
          <p data-cy="PostBody">

            {post && post.body}
          </p>
        </div>

        <div className="block">
          {isLoading ? (<Loader />) : (
            <>
              {post && loadCommentsError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {post && comments?.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {comments && comments
                .map(comment => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
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
              {!newComment && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => handleNewComment(true)}
                >
                  Write a comment
                </button>
              )}

            </>
          )}
        </div>

        { newComment && post
        && (
          <NewCommentForm
            post={post}
            handleComments={handleComments}
          />
        )}
      </div>
    </div>
  );
};
