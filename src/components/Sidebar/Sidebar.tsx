import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { client } from '../../utils/fetchClient';
import { PostDetails } from '../PostDetails';

import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  selectedPost: Post | null;
};

const COMMENTS_BY_POST = '/comments?postId=';
const COMMENTS_DELETE_BY_ID = '/comments/';

const Sidebar: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorTimer, setErrorTimer] = useState<any>(null);

  useEffect(() => {
    const getComments = async (requestPath: string) => {
      try {
        const receivedComments
          = await client.get<Comment[]>(requestPath);

        setComments(receivedComments);
      } catch {
        setHasError(true);
        setComments([]);
      } finally {
        setIsLoadingComments(false);
      }
    };

    if (selectedPost) {
      const urlGetCommentById = COMMENTS_BY_POST + selectedPost.id;

      setIsLoadingComments(true);

      getComments(urlGetCommentById);
    }
  }, [selectedPost]);

  useEffect(() => {
    clearInterval(errorTimer);
    const timer = setTimeout(() => setHasError(false), 3000);

    setErrorTimer(timer);
  }, [hasError]);

  const onDeleteComment = (commentId: number) => {
    const deletingCommentUrl = COMMENTS_DELETE_BY_ID + commentId;

    setComments(currentComments => {
      return currentComments.filter(comment => comment.id !== commentId);
    });

    client.delete(deletingCommentUrl)
      .catch(() => {
        setComments(comments);
        setHasError(true);
      });
  };

  const onAddComment = async (nComment: Omit<Comment, 'id'>) => {
    try {
      const newComment = await client.post<Comment>('/comments', nComment);

      setComments(currentComments => [...currentComments, newComment]);
    } catch {
      setHasError(true);
    }
  };

  return (
    <div
      data-cy="Sidebar"
      className={cn(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        { 'Sidebar--open': selectedPost },
      )}
    >
      <div className="tile is-child box is-success ">
        {selectedPost && (
          <PostDetails
            post={selectedPost}
            comments={comments}
            hasError={hasError}
            isLoading={isLoadingComments}
            onDeleteComment={onDeleteComment}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
};

export const MemoSidebar = React.memo(Sidebar);
