import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import * as commentService from '../utils/services';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentIsError, setCommentIsError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setCommentLoading(true);
    setCommentIsError('');
    setIsFormOpen(false);
    commentService
      .getCommentByPostId(selectedPost.id)
      .then(setComments)
      .catch(() => setCommentIsError('Something went wrong'))
      .finally(() => setCommentLoading(false));
  }, [selectedPost.id]);

  function handleDeleteComment(commentId: number) {
    commentService
      .deleteComment(commentId)
      .then(() =>
        setComments(currentComments =>
          currentComments.filter(c => c.id !== commentId),
        ),
      );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost.id}: {selectedPost.title}
        </h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {commentLoading && <Loader />}

        {commentIsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong!
          </div>
        )}

        {comments.length > 0 ? (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  {/* ИСПРАВЛЕНО: Динамический email */}
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
            ))}
          </>
        ) : (
          !commentLoading &&
          !commentIsError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )
        )}
        {!commentIsError && !commentLoading && !isFormOpen && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>
      {isFormOpen && <NewCommentForm />}
    </div>
  );
};
