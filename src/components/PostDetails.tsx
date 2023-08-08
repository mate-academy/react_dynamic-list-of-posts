import React, { useMemo, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment } from '../utils/api';

interface Props {
  selectedPost: Post | null;
  comments: Comment[] | null;
  isCommentLoading: boolean;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  commentsError: boolean
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isCommentLoading,
  setComments,
  commentsError,
}) => {
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);

  useMemo(() => {
    setIsFormOpened(false);
  }, [selectedPost]);

  const handleDeleteComment = (commentId: number) => {
    if (comments) {
      const updatedComments = comments
        .filter(comment => comment.id !== commentId);

      setComments(updatedComments);
    }

    deleteComment(commentId);
  };

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
          {isCommentLoading ? (
            <Loader />
          ) : (
            <>

              {commentsError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {comments?.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>
                  {comments?.map((comment) => {
                    const {
                      id,
                      name,
                      body,
                      email,
                    } = comment;

                    return (
                      <article
                        key={id}
                        className="message is-small"
                        data-cy="Comment"
                      >
                        <div className="message-header">
                          <a
                            href={`mailto:${email}`}
                            data-cy="CommentAuthor"
                          >
                            {name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => handleDeleteComment(id)}
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
              {(!commentsError && !isFormOpened)
              && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsFormOpened(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isFormOpened
        && (
          <NewCommentForm
            selectedPost={selectedPost}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
