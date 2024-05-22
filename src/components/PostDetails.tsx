import React, { useContext, useEffect } from 'react';
import { Loader } from './Loader';
import { Comments } from './Comments';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { DispatchContext, StateContext } from '../context/GlobalPostsProvider';

export const PostDetails: React.FC = () => {
  const { choosedPost, comments } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const fetchedComment = await client.get<any[]>(`/comments?postId=${choosedPost?.id}`);
        dispatch({ type: 'setComments', comments: fetchedComment });
        console.log("🚀 ~ comments:", comments);
      } catch (error) {
        dispatch({ type: 'setPostsFetchError', postsFetchError: true });
      }
    };

    fetchComment();
  }, [choosedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{choosedPost?.id}: {choosedPost?.title}
          </h2>

          <p data-cy="PostBody">
            {choosedPost?.body}
          </p>
        </div>

        <div className="block">
          <Loader />
          {}
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>

          {comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {comments.map((comment) => {
            return (
              <Comments key={comment?.id} comment={comment} />
            );
          })}
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
              Some comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
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
          </article>

          <article className="message is-small" data-cy="Comment">
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
  );
};
