import React from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | undefined
  comments: Comment[]
  loadingComment: boolean
  showComments: boolean
  dropErrorComments: boolean
  removeComment: (value: number) => void
  setShowForm: (value: boolean) => void
  showForm: boolean
  addComment: (
    name: string,
    email: string,
    body: string,
    setSpinner: (React.Dispatch<React.SetStateAction<boolean>>),
  ) => void
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  loadingComment,
  showComments,
  dropErrorComments,
  removeComment,
  setShowForm,
  showForm,
  addComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #
            {selectedPost?.id}
            {': '}
            {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        {loadingComment && <Loader /> }
        {dropErrorComments && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {
          showComments && (
            <div className="block">
              {comments.length === 0 ? (
                <>
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No Comments yet
                  </p>
                </>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>
                  {comments.map(comment => (
                    <article className="message is-small" data-cy="Comment">
                      <div className="message-header">
                        <a
                          href={comment.email}
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
                            removeComment(comment.id);
                          }}
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
              {!showForm ? (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  Write a comment
                </button>
              ) : (
                <NewCommentForm addComment={addComment} />
              )}
            </div>
          )
        }
      </div>
    </div>
  );
};
