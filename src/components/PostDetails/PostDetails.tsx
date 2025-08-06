import React, { useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewComment/NewCommentForm';
import { Post } from '../../types/Post';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import { ErrorMessage } from '../../constants/ErrorMessage';
import { Comment } from '../../types/Comment';

interface Props {
  posts: Post[];
  selectedPostId: number | null;
  loading: boolean;
  comments: Comment[];
  error: string;
  onAddComment: (commentData: Omit<Comment, 'id'>) => void;
  onDeleteComment: (id: number) => void;
}

export const PostDetails: React.FC<Props> = ({
  posts,
  selectedPostId,
  loading,
  comments,
  error,
  onAddComment,
  onDeleteComment,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const selectedPost = posts.find(post => post.id === selectedPostId);

  if (!selectedPost) {
    return (
      <div className="content" data-cy="PostDetails">
        <p className="title is-5">Select a post to see details</p>
      </div>
    );
  }

  const filteredComments = comments.filter(
    comment => comment.postId === selectedPostId,
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{selectedPost?.title}</h2>
        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {error && (
          <ErrorNotification
            dataCy="CommentsError"
            type="danger"
            message={ErrorMessage.LOADING_ERROR}
          />
        )}

        <p className="title is-4">Comments:</p>

        {filteredComments.length > 0 ? (
          filteredComments.map(comment => (
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
                  onClick={() => onDeleteComment(comment.id)}
                >
                  delete
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))
        ) : (
          <ErrorNotification
            dataCy="NoCommentsMessage"
            type="warning"
            message={ErrorMessage.NO_COMMENT}
          />
        )}

        {!isFormOpen && (
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

      {isFormOpen && selectedPostId !== null && (
        <NewCommentForm
          postId={selectedPostId}
          onAddComment={onAddComment}
          setIsFormOpen={setIsFormOpen}
        />
      )}
    </div>
  );
};
