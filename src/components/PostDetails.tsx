import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import * as Client from '../api/client';

type Props = {
  postId: number | null;
  posts: { id: number; title: string; body: string }[];
};

export const PostDetails: React.FC<Props> = ({ postId, posts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [openToWriteComment, setOpenToWriteComment] = useState(false);

  const post = posts.find(p => p.id === postId);
  const userId = post ? post.id : null;

  useEffect(() => {
    if (!postId) {
      return;
    }

    setIsLoading(true);
    setError(false);

    Client.CommentsAPI.getCommentsByPostId(postId)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [postId]);

  useEffect(() => {
    setOpenToWriteComment(false);
  }, [postId, userId]);

  const deleteComment = (commentId: number) => {
    Client.CommentsAPI.deleteComment(commentId)
      .then(() => {
        setComments(prev => prev.filter(c => c.id !== commentId));
      })
      .catch(() => setError(true));
  };

  const addComment = async (newComment: CommentData) => {
    const comment = await Client.CommentsAPI.addComment(newComment);

    setComments(prev => [...prev, comment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !isLoading && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}

          {comments.map(comment => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
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

          {!error && !isLoading && !openToWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenToWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openToWriteComment && (
          <NewCommentForm onSubmit={addComment} postId={postId} />
        )}
      </div>
    </div>
  );
};
