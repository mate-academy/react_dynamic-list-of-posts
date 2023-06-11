import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getCommentsByPost, deleteComment } from '../api/api';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post | null;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isNewComent, setIsNewComent] = useState(false);
  const [hasComments, setHasComments] = useState(false);

  useEffect(() => {
    if (post) {
      setIsLoading(true);
      getCommentsByPost(post.id).then((res) => {
        setIsLoading(false);
        setComments(res);
        setIsNewComent(false);
      }).catch(() => {
        setIsLoading(false);
        setHasComments(true);
        setHasError(true);
      });
    }
  }, [post]);

  useEffect(() => {
    if (!comments.length) {
      setHasComments(false);
    } else if (comments.length > 0) {
      setHasComments(true);
    }
  }, [comments]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    setComments((prevState: Comment[]) => (
      prevState.filter(comment => comment.id !== commentId)
    ));
  };

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
          {isLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(comments.length > 0 && !isLoading) && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => {
                const {
                  name,
                  email,
                  id,
                  body,
                } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={name}
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

          {(!hasComments && post && !isLoading) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!isNewComent && !isLoading && !hasError) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewComent(true)}
            >
              Write a comment
            </button>
          )}

        </div>

        {(isNewComent && !isLoading) && (
          <NewCommentForm
            setComments={setComments}
            postId={post?.id || 0}
          />
        )}
      </div>
    </div>
  );
};
