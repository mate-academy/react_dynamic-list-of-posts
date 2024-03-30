import React, { useContext } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { UserListContext } from './listContext';

export const PostDetails: React.FC = () => {
  const { errorComments, comments, post, selectedPostId } =
    useContext(UserListContext);

  const selectedPost = post.find(po => po.id === selectedPostId);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>

          <div className="block">
            {/* {loaderDetails && <Loader />} */}
            {errorComments && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}
            {!comments.length ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(com => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={com.id}
                  >
                    <div className="message-header">
                      <a href={`mailto:${com.email}`} data-cy="CommentAuthor">
                        {com.name}
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
                      {com.body}
                    </div>
                  </article>
                ))}
              </>
            )}

            {/* <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    Misha Hrynko
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
                  One more comment
                </div>
              </article> */}

            {/* <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    Misha Hrynko
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
                  {'Multi\nline\ncomment'}
                </div>
              </article> */}

            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
            >
              Write a comment
            </button>
          </div>

          <NewCommentForm />
        </div>
      </div>
    </div>
  );
};
