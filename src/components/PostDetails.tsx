import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { getComments } from '../utils/requests';
import { CommentContent } from './CommentContent';
import { HandleErrorsComponent } from './HandleErrorsComponent';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadingError, setisLoadingError] = useState(false);
  const [areCommentsLoaded, setAreCommentsLoaded] = useState(false);
  const [isCommentFormShown, setIsCommentFormShown] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [commentsBeforeFilter, setCommentsBeforeFilter] = useState(comments);
  const [isAddingError, setIsAddingError] = useState(false);

  const isNoComments = areCommentsLoaded
    && comments
    && comments.length < 1;
  const postId = selectedPost?.id;
  const isCommentContentRendered = !!comments.length && !isLoader;

  useEffect(() => {
    setisLoadingError(false);
    setIsLoader(true);
    setIsCommentFormShown(false);

    const fetchData = async () => {
      try {
        const data: Comment[] = await getComments(postId);

        setComments(data);
        setAreCommentsLoaded(true);
      } catch (error) {
        setisLoadingError(true);
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

        <HandleErrorsComponent
          isLoadingError={isLoadingError}
          isDeleteError={isDeleteError}
          isAddingError={isAddingError}
          isNoComments={isNoComments}
          isLoader={isLoader}
        />

        {!isLoadingError && (
          <div className="block">
            {isLoader && (
              <Loader />
            )}

            {!isNoComments && !isLoader && (
              <p className="title is-4">Comments:</p>
            )}

            {isCommentContentRendered && comments.map((comment) => {
              const generateKey = (pre: string) => {
                return `${pre}_${new Date().getTime()}`;
              };

              return (
                <CommentContent
                  key={generateKey(comment.name)}
                  comment={comment}
                  setComments={setComments}
                  setIsDeleteError={setIsDeleteError}
                  commentsBeforeFilter={commentsBeforeFilter}
                  setCommentsBeforeFilter={setCommentsBeforeFilter}
                />
              );
            })}

            {!isLoader && !isCommentFormShown && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsCommentFormShown(true)}
              >
                Write a comment
              </button>
            )}
          </div>
        )}

        {isCommentFormShown && (
          <NewCommentForm
            setComments={setComments}
            setCommentsBeforeFilter={setCommentsBeforeFilter}
            setIsAddingError={setIsAddingError}
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
