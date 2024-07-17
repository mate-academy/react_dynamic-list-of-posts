/* eslint-disable prettier/prettier */
import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { type Comment } from '../types/Comment';

type Props = {
  commentsFromPost: Comment[];
  setCommentsFromPost: (comment: Comment[]) => void;
  selectedPost: Post | null;
  errorNotification: string;
  setErrorNotification: (errorNotification: string) => void;
  commentLoading: boolean;
  setShowCommentField: (showCommentField: boolean) => void;
  showCommentField: boolean;
  onDeleteComment: (numberId: number) => void;
};

export const PostDetails = ({
  commentsFromPost,
  setCommentsFromPost,
  errorNotification,
  selectedPost,
  commentLoading,
  showCommentField,
  setShowCommentField,
  onDeleteComment,
  setErrorNotification,
}: Props) => {


  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {selectedPost && commentLoading && <Loader />}
          {errorNotification && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorNotification}
            </div>
          )}
          {commentsFromPost.length === 0 &&
            !commentLoading &&
            !errorNotification && (
            <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
            </p>
          )}
          {commentsFromPost.length !== 0 &&
            !commentLoading &&
            !errorNotification && <p className="title is-4">Comments:</p>}
          {!commentLoading &&
            !errorNotification &&
            commentsFromPost.map(comment => (
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
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          {!showCommentField && !commentLoading && !errorNotification && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowCommentField(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showCommentField && <NewCommentForm
          setErrorNotification={setErrorNotification}
          selectedPost={selectedPost}
          setCommentsFromPost={setCommentsFromPost}
          commentsFromPost={commentsFromPost}/>}
      </div>
    </div>
  );
};
