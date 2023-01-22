import React, {
  useState,
  useEffect,
  memo,
  useMemo,
} from 'react';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { CommentItem } from './CommentItem';
import { NewCommentForm } from './NewCommentForm';
import { getComments } from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = memo(({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isErrorOnLoading, setIsErrorOnLoading] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWriteCommentButtonClicked,
    setIsWriteCommentButtonClicked] = useState(false);

  const loadComments = async () => {
    try {
      setIsErrorOnLoading(false);
      setIsLoading(true);

      const loadedComments = await getComments(post.id);

      setComments(loadedComments);
    } catch (error) {
      setIsErrorOnLoading(true);
    } finally {
      setIsLoading(false);
      setIsLoadingFinish(true);
    }
  };

  useEffect(() => {
    loadComments();
    setComments([]);
    setIsLoadingFinish(false);
    setIsWriteCommentButtonClicked(false);
  }, [post]);

  const isNoCommentsYet = useMemo(() => (
    !isLoading && !isErrorOnLoading && comments.length === 0
  ), [isLoading, isErrorOnLoading, comments]);

  const isWriteCommentButtonVisible = useMemo(() => (
    isLoadingFinish && !isErrorOnLoading && !isWriteCommentButtonClicked
  ), [isLoadingFinish, isErrorOnLoading, isWriteCommentButtonClicked]);

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

          {isNoCommentsYet && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentItem
                  comment={comment}
                  key={comment.id}
                  setComments={setComments}
                />
              ))}
            </>
          )}

          {isWriteCommentButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriteCommentButtonClicked(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteCommentButtonClicked && (
          <NewCommentForm
            setComments={setComments}
            post={post}
          />
        )}
      </div>
    </div>
  );
});
