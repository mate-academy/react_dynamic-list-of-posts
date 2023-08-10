import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  enableForm: boolean
  commentError: boolean
  isLoading: boolean
  post: Post
  comments: Comment[]
  setEnableForm: React.Dispatch<React.SetStateAction<boolean>>
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoading,
  commentError,
  setEnableForm,
  enableForm,
  setComments,
}) => {
  const handleDeleteComment = (id: number) => {
    setComments(curComments => curComments
      .filter(comment => comment.id !== id));
  };

  return (
    <div className="content" data-cy="PostDetails">
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
          {isLoading && (
            <Loader />
          )}

          {commentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isLoading && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(({
                email, name, body, id,
              }) => (
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
                      onClick={() => handleDeleteComment(id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isLoading && !enableForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setEnableForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {enableForm && (
          <NewCommentForm
            setComments={setComments}
            postId={post.id}
          />
        )}
      </div>
    </div>
  );
};
