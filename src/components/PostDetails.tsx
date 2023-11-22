import React, { useContext } from 'react';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';
import { deleteComments } from '../api/Api';
import { NewCommentForm } from './NewCommentForm';
import { Context } from './Context/Context';

type Props = {
  comments: Comment[];
  errorMessage: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  errorMessage,
  setComments,
}) => {
  const {
    isShownForm,
    setIsShownForm,
    postId,
    posts,
    isLoading,
  } = useContext(Context);
  const post = posts.find(p => p.id === postId);

  const removeComment = (id: number) => {
    deleteComments(id)
      .then(() => setComments((current) => current
        .filter(comment => comment.id !== id)))
      .catch()
      .finally();
  };

  return (
    <div className="content" data-cy="PostDetails">
      {post && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${post?.id}: ${post?.title}`}
            </h2>

            <p data-cy="PostBody">
              {post?.body}
            </p>
          </div>

          <div className="block">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {errorMessage.includes('No comments yet') && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    {errorMessage}
                  </p>
                )}

                {errorMessage.includes('went wrong') && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    {errorMessage}
                  </div>
                )}

                {comments.length > 0 && (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => {
                      const {
                        email, name, body, id,
                      } = comment;

                      return (
                        <article
                          key={id}
                          className="message is-small"
                          data-cy="Comment"
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
                              onClick={() => removeComment(id)}
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

                {isShownForm ? (
                  <NewCommentForm
                    setComments={setComments}
                  />
                ) : (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsShownForm(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
