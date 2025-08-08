import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | undefined;
  comments: Comment[] | undefined;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
  stateCommentButton: boolean;
  setStateCommentButton: React.Dispatch<React.SetStateAction<boolean>>;
  // stateAWriteAComment: boolean;
  // setStateAWriteAComment: React.Dispatch<React.SetStateAction<boolean>>;
  errorIsSubmiting: string;
  setErrorIsSubmiting: React.Dispatch<React.SetStateAction<string>>;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  setComments,
  stateCommentButton,
  // stateAWriteAComment,
  setStateCommentButton,
  // setStateAWriteAComment,
  errorIsSubmiting,
  setErrorIsSubmiting,
}) => {
  const handleDeleteComment = (id: number) => {
    const originalComments = comments;

    setComments(currentComments =>
      currentComments?.filter(comment => comment.id !== id),
    );

    client.delete(`/comments/${id}`).catch(() => {
      setComments(originalComments);
      setErrorIsSubmiting('Failed to delete comment. Please try again.');
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {post && (
          <>
            <div className="block">
              <h2 data-cy="PostTitle">
                {`#${post?.id}: ${post?.title}`}
                {/* #18: voluptate et itaque vero tempora molestiae */}
              </h2>

              <p data-cy="PostBody">
                {post?.body}
                {/* eveniet quo quis laborum totam consequatur non dolor ut et est
            repudiandae est voluptatem vel debitis et magnam */}
              </p>
            </div>

            <div className="block">
              {!post && <Loader />}

              {errorIsSubmiting && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorIsSubmiting}
                </div>
              )}

              {!comments && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              <p className="title is-4">Comments:</p>

              {comments?.map(comment => (
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
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {!stateCommentButton && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => {
                    setStateCommentButton(true);
                  }}
                >
                  Write a comment
                </button>
              )}
            </div>
          </>
        )}

        {stateCommentButton && (
          <NewCommentForm
            post={post}
            setComments={setComments}
            setErrorIsSubmiting={setErrorIsSubmiting}
          />
        )}
      </div>
    </div>
  );
};
