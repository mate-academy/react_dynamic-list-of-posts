import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { getComments } from '../utils/requests';
import { CommentContent } from './CommentContent';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { ErrorLoadingComments } from './Notifications/ErrorLoadingComments';
import { NoCommentsYet } from './Notifications/NoCommentsYet';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadingErorr, setisLoadingErorr] = useState(false);
  const [areCommentsLoaded, setAreCommentsLoaded] = useState(false);
  const [isCommentFormShown, setIsCommentFormShown] = useState(false);
  const isNoComments = areCommentsLoaded
  && comments
  && comments.length < 1;
  const postId = selectedPost?.id;

  useEffect(() => {
    setisLoadingErorr(false);
    setIsLoader(true);
    setIsCommentFormShown(false);

    const fetchData = async () => {
      try {
        const data: Comment[] = await getComments(postId);

        setComments(data);
        setAreCommentsLoaded(true);
      } catch (error) {
        setisLoadingErorr(true);
        setIsLoader(false);
        setAreCommentsLoaded(true);
      } finally {
        setAreCommentsLoaded(true);
        setIsLoader(false);
      }
    };

    fetchData();
  }, [selectedPost]);

  const { id, title, body } = selectedPost;

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
          {isLoader && (
            <Loader />
          )}

          {isLoadingErorr && (
            <ErrorLoadingComments />
          )}

          {isNoComments && !isLoader && (
            <NoCommentsYet />
          )}

          {!isNoComments && !isLoader && (
            <p className="title is-4">Comments:</p>
          )}

          {!!comments.length && !isLoader && comments.map((comment) => {
            return (
              <CommentContent
                key={comment.id}
                comment={comment}
                setComments={setComments}
              />
            );
          })}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsCommentFormShown(true)}
          >
            Write a comment
          </button>
        </div>

        {isCommentFormShown && (
          <NewCommentForm setComments={setComments} />
        )}
      </div>
    </div>
  );
};
