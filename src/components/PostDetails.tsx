import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  comments: Comment[] | null;
  isCommentError: boolean;
  writeComment: boolean;
  setWriteComment: React.Dispatch<React.SetStateAction<boolean>>;
  onAddNewComment: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isCommentError,
  writeComment,
  setWriteComment,
  onAddNewComment,
  onDeleteComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {!comments && !isCommentError && <Loader />}

          {isCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments?.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => {
                const {
                  id,
                  name,
                  email,
                  body,
                } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
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
                        onClick={() => onDeleteComment(id)}
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

          {!writeComment && (
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
            selectedPostId={selectedPost.id}
            onAddNewComment={onAddNewComment}
          />
        )}
      </div>
    </div>
  );
};
