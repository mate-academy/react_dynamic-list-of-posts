import React, { useCallback, useState } from 'react';
import cn from 'classnames';

import { PostDetails } from './PostDetails';
import { Post } from '../types/Post';
import { Comment as CommentType, CommentData } from '../types/Comment';
import * as client from '../api/comments';

type Props = {
  activePost: Post | null;
};

const SidebarBase: React.FC<Props> = ({ activePost }) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const loadComments = useCallback(async () => {
    setComments([]);

    if (activePost?.id) {
      return client
        .getPostComments(activePost?.id)
        .then(res => {
          setComments(res);

          return res;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }

    return Promise.reject('No post selected.');
  }, [activePost?.id]);

  const addComment = useCallback(
    async (postId: number, comment: CommentData) => {
      return client
        .createComment(postId, comment)
        .then(res => {
          setComments(prevState => {
            return [...prevState, { ...res }];
          });

          return res;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    [],
  );

  const deleteComment = useCallback(
    async (commentId: number) => {
      const commentToDelete = comments.find(comment => {
        return comment.id === commentId;
      });

      setComments(prevState => {
        return prevState.filter(comment => comment.id !== commentId);
      });

      return client
        .deleteComment(commentId)
        .then(res => {
          return res;
        })
        .catch(err => {
          if (commentToDelete) {
            setComments(prevState => {
              return [...prevState, { ...commentToDelete }];
            });
          }

          return Promise.reject(err);
        });
    },
    [comments],
  );

  return (
    <div
      data-cy="Sidebar"
      className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': !!activePost,
      })}
    >
      <div className="tile is-child box is-success ">
        {activePost && (
          <>
            <PostDetails
              loadComments={loadComments}
              deleteComment={deleteComment}
              post={activePost}
              comments={comments}
              setComments={setComments}
              addComment={addComment}
            />
          </>
        )}
      </div>
    </div>
  );
};

export const Sidebar = React.memo(SidebarBase);
