import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  const fetchComments = () => {
    if (!post) {
      return;
    }

    setErrorMessage('');
    setIsOpenEditor(false);
    setLoading(true);

    client.get<Comment[]>(`/comments?postId=${post.id}`)
      .then((data) => setComments(data))
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchComments, [post]);

  const addComment = (comment: CommentData) => {
    if (!post) {
      return;
    }

    setErrorMessage('');
    setIsCreatingComment(true);

    client.post<Comment>('/comments',
      { ...comment, postId: post.id })
      .then((newComment) => setComments(
        (currentComments) => [...currentComments, newComment],
      )).catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsCreatingComment(false));
  };

  const deleteComment = (commentId: number) => {
    client.delete(`/comments/${commentId}`);

    setComments((prevComments) => prevComments
      .filter(prevComment => prevComment.id !== commentId));
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
          {loading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {comments.length === 0 && !loading && !errorMessage && (
            (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          )}

          {comments.length > 0 && !loading && !errorMessage && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment) => (
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

          {!isOpenEditor && !loading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpenEditor(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenEditor && (
          <NewCommentForm
            loading={isCreatingComment}
            onSubmit={addComment}
          />
        )}
      </div>
    </div>
  );
};
