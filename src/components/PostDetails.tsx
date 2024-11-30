import React, { useEffect } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Loader } from './Loader';
import { Comment, CommentData } from '../types/Comment';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  isCommentLoading: boolean;
  postComments: Comment[];
  selectedPost: Post | null;
  errorsComment: boolean;
  onDeleteComment: (commentId: number) => void;
  onAddComment: (newComment: CommentData) => void;
  isButtonAddLoading: boolean;
  onShowCommentFormChange: (item: boolean) => void;
  isCommentFormVisible: boolean;
  userSelected: User | null;
};

export const PostDetails: React.FC<Props> = ({
  isCommentLoading,
  postComments,
  selectedPost,
  errorsComment,
  onDeleteComment,
  onAddComment,
  isButtonAddLoading,
  onShowCommentFormChange,
  isCommentFormVisible,
  userSelected,
}) => {
  useEffect(() => {
    onShowCommentFormChange(false);
  }, [selectedPost]);

  if (!selectedPost || userSelected?.id !== selectedPost.userId) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isCommentLoading ? (
            <Loader />
          ) : (
            <>
              {errorsComment ? (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              ) : (
                <>
                  {postComments.length === 0 ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <p className="title is-4">Comments:</p>
                  )}

                  {postComments.map((comment: Comment) => (
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
                          onClick={() => onDeleteComment(comment.id)}
                        ></button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  ))}

                  {!isCommentFormVisible && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => onShowCommentFormChange(true)}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
        {isCommentFormVisible && (
          <NewCommentForm
            addComment={onAddComment}
            buttonAddLoading={isButtonAddLoading}
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
