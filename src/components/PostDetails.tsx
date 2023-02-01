import React from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post,
  comments: Comment[];
  isLoadingComments: boolean;
  commentsLoadingError: boolean,
  createNewComment: () => void,
  isAddingNewComment: boolean,
  addComment: (newComment: Comment) => void,
  deleteComment: (commentId: number) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isLoadingComments,
  commentsLoadingError,
  createNewComment,
  isAddingNewComment,
  addComment,
  deleteComment,
}) => {
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
          {isLoadingComments && <Loader />}

          {commentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoadingComments
            && !commentsLoadingError
            && !comments.length
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

          {!isLoadingComments
            && !commentsLoadingError
            && comments.length > 0
            && (
              <>
                <p className="title is-4">Comments:</p>

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
              </>
            )}

          {!isLoadingComments
            && !isAddingNewComment
            && !commentsLoadingError
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={createNewComment}
              >
                Write a comment
              </button>
            )}
        </div>

        {isAddingNewComment
          && !isLoadingComments
          && !commentsLoadingError
          && (
            <NewCommentForm
              addComment={addComment}
              selectedPostId={selectedPost.id}
            />
          )}
      </div>
    </div>
  );
};
