import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Props {
  comments: Comment[];
  posts: Post[];
  postId: number;
  error: boolean;
  loadingComments: boolean;
  handleDeleteComment: (value: number) => void;
  handleAddComment: (value: Comment) => void;
}

export const PostDetails: React.FC<Props> = ({
  comments,
  posts,
  postId,
  error,
  loadingComments,
  handleDeleteComment,
  handleAddComment,
}) => {
  const selectedPost = posts.find(p => p.id === postId);
  const [addCommentWindow, setAddCommentWindow] = useState(false);

  useEffect(() => {
    setAddCommentWindow(false);
  }, [postId]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>
        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loadingComments && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loadingComments && !error && (
          <>
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
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
                        onClick={() => {
                          handleDeleteComment(comment.id);
                        }}
                      />
                    </div>

                    <div
                      className="message-body"
                      data-cy="CommentBody"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            )}

            {!addCommentWindow && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => {
                  setAddCommentWindow(true);
                }}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {addCommentWindow && (
        <NewCommentForm handleAddComment={handleAddComment} postId={postId} />
      )}
    </div>
  );
};
