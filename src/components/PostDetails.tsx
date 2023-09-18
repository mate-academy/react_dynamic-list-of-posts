import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useComments } from './Contexts/CommentsContext';
import { Post } from '../types/Post';
import { getComments } from '../api/comments';

type Props = {
  selectedPost: Post | null
  isNewComment: boolean,
  onAddComment: (status: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isNewComment,
  onAddComment,
}) => {
  const { comments, setComments } = useComments();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (selectedPost) {
      getComments(selectedPost.id)
        .then(setComments)
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  const toggleAddCommentForm = () => {
    onAddComment(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`${selectedPost?.id}: ${selectedPost?.title}`}
            </h2>

            <p data-cy="PostBody">
              {selectedPost?.body}
            </p>
          </div>

          <div className="block">

            {/* <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div> */}
            {comments.length ? (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map((comment) => {
                  return (
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
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  );
                })}
              </>
            ) : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}
            {isNewComment ? (
              <NewCommentForm />
            ) : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={toggleAddCommentForm}
              >
                Write a comment
              </button>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
