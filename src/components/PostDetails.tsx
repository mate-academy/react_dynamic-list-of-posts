import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null,
  filteredComments: Comment[],
  isLoading: boolean,
  isError: boolean,
  addComment: (
    value1: string,
    value2: string,
    value3: string
  ) => void,
  handleRemoveComment: (value: number) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  filteredComments,
  isLoading,
  isError,
  addComment,
  handleRemoveComment,
}) => {
  const [isButtonNotVisible, setIsButtonNotVisible] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}:${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!filteredComments.length
            ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <p className="title is-4">Comments:</p>
            )}

          {filteredComments.map(comment => (
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
                  onClick={() => handleRemoveComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {isButtonNotVisible
            ? (
              <NewCommentForm
                addComment={addComment}
                selectedPost={selectedPost}
                setIsButtonNotVisible={setIsButtonNotVisible}
              />
            ) : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsButtonNotVisible(true)}
              >
                Write a comment
              </button>
            )}
        </div>
      </div>
    </div>
  );
};
