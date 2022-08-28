import React from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post,
  comments: Comment[],
  setComments(comments: Comment[]): void,
  loadingComments: boolean,
  commentsError: boolean,
  writing: boolean,
  setWriting(writing: boolean): void,
  loadComments(): void,
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  setComments,
  loadingComments,
  commentsError,
  writing,
  setWriting,
  loadComments,
}) => {
  const getMainContent = () => {
    if (loadingComments) {
      return <Loader />;
    }

    if (commentsError) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    if (!comments.length) {
      return (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      );
    }

    return (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map(comment => (
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
                onClick={() => {
                  setComments(comments
                    .filter(currentComment => currentComment.id
                      !== comment.id));

                  client.delete(`/comments/${comment.id}`)
                    .catch(loadComments);
                }}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}
      </>
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {getMainContent()}

          {!writing && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriting(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {writing && (
          <NewCommentForm
            postId={post.id}
            comments={comments}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
