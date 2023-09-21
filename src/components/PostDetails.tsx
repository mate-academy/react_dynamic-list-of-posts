import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
// import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getCommentsByPostId } from '../api/api';
import { CommentList } from './CommentList';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const isShowComments = !!comments.length && !isError && !isLoad;
  const isShowError = !comments.length && isError && !isLoad;
  const isShowLoader = !comments.length && !isError && isLoad;
  const isNoComments = !comments.length && !isError && !isLoad;
  const isShowWriteButton = isNoComments || isShowComments;

  useEffect(() => {
    setIsError(false);
    setIsLoad(true);
    (async () => {
      try {
        const serverComments = await getCommentsByPostId(id);

        setComments(serverComments);
      } catch {
        setIsError(true);
      } finally {
        setIsLoad(false);
      }
    })();
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isShowLoader && <Loader />}

          {isShowError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isShowComments && <CommentList comments={comments} />}

          {isShowWriteButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
            >
              Write a comment
            </button>
          )}
        </div>

        {/* <NewCommentForm /> */}
      </div>
    </div>
  );
};
