import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { SingleComment } from './SingleComment';

type Props = {
  post: Post,
  comments: Comment[],
  postComments: Comment[],
  isLoadingComments: boolean,
  setComments: (value: Comment[])=> void,
  setPostComments: (value: Comment[])=> void,
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  setComments,
  isLoadingComments,
  postComments,
  setPostComments,
}) => {
  const { id, title, body } = post;
  const [isSeen, setIsSeen] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsSeen(false);
  }, [post]);

  return (
    <>
      {post && <div>aasassasa</div>}
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`# ${id}: ${title}`}
            </h2>
            <p data-cy="PostBody">
              {body}
            </p>
          </div>

          {isLoadingComments && <Loader />}
          {!isLoadingComments && (
            <div className="block">
              {isError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {postComments.length > 0 && (
                <>
                  <p className="title is-4">Comments:</p>
                  {postComments.map((comment: Comment) => {
                    return (
                      <SingleComment
                        comment={comment}
                        comments={comments}
                        setComments={setComments}
                        postComments={postComments}
                        setPostComments={setPostComments}
                        setIsError={setIsError}
                      />
                    );
                  })}
                </>
              )}

              {postComments.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
              {!isSeen && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => {
                    setIsSeen(true);
                  }}
                >
                  Write a comment
                </button>
              )}
            </div>
          )}
          {isSeen && (
            <NewCommentForm
              post={post}
              comments={comments}
              setComments={setComments}
              setPostComments={setPostComments}
              postComments={postComments}
            />
          )}
        </div>
      </div>
    </>
  );
};
