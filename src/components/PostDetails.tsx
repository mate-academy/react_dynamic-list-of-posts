import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as commentService from '../services/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [writeComment, setWriteComment] = useState(false);

  function loadComments() {
    setErrorMessage('');
    setWriteComment(false);
    setLoading(true);

    if (!selectedPost.id) {
      setWriteComment(false);

      return;
    }

    commentService.getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setLoading(false));
  }

  useEffect(loadComments, [selectedPost.id]);

  const addComment = ({
    postId,
    name,
    email,
    body,
  }: Comment) => {
    return commentService.createComment({
      postId,
      name,
      email,
      body,
    })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      })
      .catch(() => {
        setWriteComment(false);
        setErrorMessage('Something went wrong!');
      });
  };

  const deleteComment = (commentId: number) => {
    setComments(currentComments => currentComments
      .filter(comment => comment.id !== commentId));

    return commentService.deleteComment(commentId);
  };

  const hasError = !loading && errorMessage;
  const hasNoComments = !loading
    && !errorMessage && selectedPost && !comments.length;
  const shouldRenderComments = !loading
    && !errorMessage && selectedPost && comments.length > 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">

          {loading && (
            <Loader />
          )}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {shouldRenderComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                return (
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
                );
              })}
            </>
          )}

          {!loading && !writeComment && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeComment && (
          <NewCommentForm
            selectedPost={selectedPost}
            addComment={addComment}
          />
        )}
      </div>
    </div>
  );
};
