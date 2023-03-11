import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

// import { CommentData } from '../types/Comment';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

import { getPostComments, getUserPost, deletePostComment } from '../helpers';

type Props = {
  postId: number | null,
};

export const PostDetails: React.FC<Props> = React.memo(
  ({ postId }) => {
    const [comments, setCommnets] = useState<Comment[]>([]);
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isWriteComment, setIsWriteComment] = useState(false);

    const loadDataCommets = async () => {
      try {
        const commentsData = await getPostComments(postId);

        setCommnets(commentsData);
      } catch {
        if (post !== null) {
          setIsError(true);
        }
      }
    };

    useEffect(() => {
      loadDataCommets();
    }, [postId, comments]);

    const currentPostHandle = async () => {
      try {
        setIsLoading(true);

        const postData = await getUserPost(postId);

        setPost(postData);
        setIsWriteComment(false);

        setIsError(false);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    useEffect(() => {
      if (postId !== null) {
        currentPostHandle();
      }
    }, [postId]);

    const onCommentDelete = async (commentId: number) => {
      try {
        await deletePostComment(commentId);
      } catch (error) {
        setIsError(true);
      }
    };

    return (
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            {post && (
              <h2 data-cy="PostTitle">
                #
                {post?.id}
                :
                {' '}
                {post?.title}
              </h2>
            )}

            <p data-cy="PostBody">
              {post?.body}
            </p>
          </div>

          <div className="block">
            {isLoading && (
              <Loader />
            )}

            {isError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!isLoading && (
              <>
                {!comments.length && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {!!comments.length && (
                  <p className="title is-4">Comments:</p>
                )}
  
                {comments.map((comment) => (
                  <>
                    {post && (
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
                            onClick={() => onCommentDelete(comment.id)}
    
                          >
                            delete button
                          </button>
                        </div>
    
                        <div className="message-body" data-cy="CommentBody">
                          {comment.body}
                        </div>
                      </article>
                    )}
                  </>
                ))}

                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsWriteComment(true)}
                >
                  Write a comment
                </button>
              </>
            )}
          </div>

          {isWriteComment && (
            <NewCommentForm
              postId={postId}
              setIsError={setIsError}
            />
          )}
        </div>
      </div>
    );
  },
);
