import React, { useCallback, useState } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { getComments } from '../utils/fetchClient';
import { type Comment } from '../types/Comment';

type Props = {
  posts: Post[];
  setSelectedPost: (selectedPost: Post | null) => void;
  selectedPost: Post | null;
  setErrorNotification: (error: string) => void;
  setShowCommentField: (showCommentField: boolean) => void;
  setCommentsFromPost: (comment: Comment[]) => void;
  setCommentLoading: (commentLoading: boolean) => void;
};

export const PostsList = ({
  posts,
  setSelectedPost,
  selectedPost,
  setErrorNotification,
  setShowCommentField,
  setCommentsFromPost,
  setCommentLoading,
}: Props) => {
  const [showComments, setShowComments] = useState(false);
  const loadComments = useCallback(async (postId: number) => {
    setCommentLoading(true);
    setErrorNotification('');
    setShowCommentField(false);

    try {
      const commentsFromStorage = await getComments(postId);

      setCommentsFromPost(commentsFromStorage);
    } catch {
      setErrorNotification('something went wrong');
    } finally {
      setCommentLoading(false);
    }
  }, []);

  const handleOpeningComments = (post: Post) => {
    setShowComments(!showComments);
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
      loadComments(post.id);
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.body}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': selectedPost?.id !== post.id,
                    })}
                    onClick={() => handleOpeningComments(post)}
                  >
                    {selectedPost?.id === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
