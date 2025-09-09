import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { PostComment } from '../types/PostComment';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post | null;
  comments: PostComment[];
  commentsHandler: (comments: PostComment[]) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  commentsHandler,
}) => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const currentIdOfPost = selectedPost?.id ?? null;
  const nextIdOfComment =
    comments.sort((comment1, comment2) => comment2.id - comment1.id)[0].id + 1;

  return (
    selectedPost && (
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              #{selectedPost.id}: {selectedPost.title}
            </h2>

            <p data-cy="PostBody">{selectedPost.body}</p>
          </div>

          <div className="block">
            {isLoading && <Loader />}

            {isError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!comments.some(comment => comment.postId === selectedPost.id) ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments
                  .filter(comment => comment.postId === selectedPost.id)
                  .map(comment => (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
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
                          onClick={async event => {
                            event.preventDefault();

                            try {
                              setIsLoading(true);

                              await client.delete(`/comments/${comment.id}`);

                              commentsHandler(
                                comments.filter(c => c.id !== comment.id),
                              );
                            } catch {
                              setIsError(true);
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                        />
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  ))}
              </>
            )}

            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={event => {
                event.preventDefault();
                setIsFormActive(!isFormActive);
              }}
            >
              Write a comment
            </button>
          </div>

          {isFormActive && (
            <NewCommentForm
              currentPostId={currentIdOfPost}
              createdCommentId={nextIdOfComment}
              comments={comments}
              addCommentHandler={commentsHandler}
            />
          )}
        </div>
      </div>
    )
  );
};
