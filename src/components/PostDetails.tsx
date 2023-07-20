import React, { useEffect, useState, useMemo } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { getComments, deleteComment, addComment } from '../utils/serverHelper';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentsList } from '../common/CommentsList';
import { NoCommentsMessage } from '../common/NoCommentsMessage';
import { CommentError } from '../common/CommentError';

type Props = {
  post: Post | null;
  postSelected: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post, postSelected }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isNewFormVisible, setIsNewFormVisible] = useState(false);
  const [isCommentErrorVisible, setIsCommentErrorVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isNewCommentLoading, setIsNewCommentLoading] = useState(false);

  useEffect(() => {
    const loadComments = async (selectedPost: Post) => {
      setIsLoaderVisible(true);

      try {
        const commentsFromServer = await getComments(selectedPost.id);

        setComments(commentsFromServer);
        setIsCommentErrorVisible(false);
        setIsNewFormVisible(false);
      } catch {
        setIsCommentErrorVisible(true);
      } finally {
        setIsLoaderVisible(false);
      }
    };

    if (post !== null) {
      loadComments(post);
    }
  }, [post]);

  const handleOnDelete = async (id: number) => {
    if (post === null) {
      return;
    }

    try {
      await deleteComment(id);

      setComments(prevComments => prevComments
        .filter(comment => comment.id !== id));
    } catch {
      setHasError(true);
    }
  };

  const handleOnAdd = async (newComment: CommentData) => {
    const preparedComment = { ...newComment, postId: post?.id };

    setIsNewCommentLoading(true);

    try {
      const comment = await addComment(preparedComment);

      setComments(prevComments => [...prevComments, comment]);
      setIsNewFormVisible(false);
    } catch {
      setHasError(true);
    } finally {
      setIsNewCommentLoading(false);
    }
  };

  const handleShowNewForm = () => {
    setIsNewFormVisible(true);
  };

  const isCommentsVisible = useMemo(() => comments.length > 0
  && !isLoaderVisible, [comments, isLoaderVisible]);
  const isNoComments = useMemo(() => comments.length === 0
  && !isLoaderVisible
  && !isCommentErrorVisible,
  [comments, isLoaderVisible, isCommentErrorVisible]);

  if (hasError) {
    return <CommentError />;
  }

  return (
    <>
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>
          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoaderVisible && <Loader />}
          {isCommentErrorVisible && <CommentError />}
          {isNoComments && <NoCommentsMessage />}
          {isCommentsVisible
          && (
            <CommentsList
              comments={comments}
              onDeleteComment={handleOnDelete}
            />
          )}
          {isNewFormVisible && (
            <NewCommentForm
              handleOnAdd={handleOnAdd}
              isNewCommentLoading={isNewCommentLoading}
              postSelected={postSelected}
            />
          )}
          {!isNewFormVisible && isCommentsVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowNewForm}
            >
              Write a comment
            </button>
          )}
        </div>
      </div>
    </>
  );
};
