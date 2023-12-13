import React, { useState, useEffect } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as postService from '../utils/apiRequests';

type Props = {
  comments: Comment[];
  selectedPost: Post | null;
  setComments: (newComments: Comment[]) => void;
  showList: boolean;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  selectedPost,
  setComments,
  showList,
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleDeleteComment = (commentId: number) => {
    postService
      .deleteComments(commentId)
      .then(() => {
        const updatedComments
        = comments.filter((comment) => comment.id !== commentId);

        setComments(updatedComments);
      });
  };

  useEffect(() => {
    setShowForm(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>
        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {showList && <Loader />}
        {!!comments.length && !showList
        && <p className="title is-4">Comments:</p>}

        {!showList && !!comments.length ? comments.map((comment) => (
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
                onClick={() => {
                  if (comment.id !== undefined) {
                    handleDeleteComment(comment.id);
                  }
                }}
              >
                Delete
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))
          : (
            !showList && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          )}

        {!showList && !showForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(!showForm)}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && (
        <NewCommentForm
          comments={comments}
          selectedPost={selectedPost}
          setComments={setComments}
        />
      )}
    </div>
  );
};
