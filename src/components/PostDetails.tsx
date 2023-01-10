import React, { useState, useEffect } from 'react';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { CommentItem } from './CommentItem';
import { NewCommentForm } from './NewCommentForm';
import { getComments } from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { post } = props;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isErrorOnLoading, setIsErrorOnLoading] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const loadComments = async () => {
    try {
      setIsErrorOnLoading(false);
      setIsLoading(true);

      const loadedComments = await getComments(post.id);

      setIsLoading(false);
      setComments(loadedComments);
    } catch (error) {
      setIsErrorOnLoading(true);
      setIsLoading(false);
    } finally {
      setIsLoadingFinish(true);
    }
  };

  useEffect(() => {
    loadComments();
    setComments([]);
    setIsLoadingFinish(false);
    setIsButtonClicked(false);
  }, [post]);

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
          {isLoading && <Loader />}

          {!isLoading && isErrorOnLoading && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {!isLoading
            && !isErrorOnLoading
            && comments.length === 0
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentItem comment={comment} key={comment.id} />
              ))}
            </>
          )}

          {isLoadingFinish && !isErrorOnLoading && !isButtonClicked && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsButtonClicked(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isButtonClicked && (
          <NewCommentForm
            setComments={setComments}
            post={post}
          />
        )}
      </div>
    </div>
  );
};
