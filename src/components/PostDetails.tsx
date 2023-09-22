import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getCommentsByPostId } from '../api/api';
import { CommentList } from './CommentList';
import { CommentsContext } from './CommentsContext';
import { getWhatToShow } from '../utils/helpers';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const { comments, setComments } = useContext(CommentsContext);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const {
    isShowError,
    isShowLoad,
    isShowContent,
    isShowNoContent,
  } = getWhatToShow(isError, isLoader, !!comments.length);

  const isShowWriteButton = (isShowNoContent || isShowContent) && !isWriting;

  useEffect(() => {
    setIsError(false);
    setIsLoader(true);
    setComments([]);
    setIsWriting(false);
    (async () => {
      try {
        const serverComments = await getCommentsByPostId(id);

        setComments(serverComments);
      } catch {
        setIsError(true);
      } finally {
        setIsLoader(false);
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
          {isShowLoad && <Loader />}

          {isShowError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isShowNoContent && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isShowContent && <CommentList comments={comments} />}

          {isShowWriteButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriting(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriting && <NewCommentForm />}
      </div>
    </div>
  );
};
