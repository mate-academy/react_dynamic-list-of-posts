import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { getCommentsForThisPost } from '../service/getComments';
import { Comment } from '../types/Comment';

type PostListProps = {
  userPosts: Post[] | null;
  showPostInfo: boolean;
  setShowPostInfo: (val: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  setSelectedComments: (comments: Comment[] | null) => void;
  setCommentsError: (val: boolean) => void;
  setNewCommentPressed: (val: boolean) => void;
  setPostInfoLoading: (val: boolean) => void;
  setVisibleComList: (val: Comment[] | null) => void;
};

export const PostsList: React.FC<PostListProps> = ({
  userPosts,
  showPostInfo,
  setShowPostInfo,
  selectedPost,
  setSelectedPost,
  setSelectedComments,
  setCommentsError,
  setNewCommentPressed,
  setPostInfoLoading,
  setVisibleComList,
}) => {
  const handlePostSelect = async (post: Post) => {
    try {
      setPostInfoLoading(true);
      const commentsForThisPost = await getCommentsForThisPost(post.id);

      setSelectedComments(commentsForThisPost);
      setVisibleComList(commentsForThisPost);
    } catch {
      setCommentsError(true);
    } finally {
      setPostInfoLoading(false);
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
          {userPosts?.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id || !showPostInfo,
                  })}
                  onClick={() => {
                    if (post.id === selectedPost?.id) {
                      setShowPostInfo(false);
                      setSelectedPost(null);
                      setNewCommentPressed(false);
                      setSelectedComments(null);
                    } else {
                      setSelectedComments(null);
                      setShowPostInfo(true);
                      handlePostSelect(post);
                      setSelectedPost(post);
                      setNewCommentPressed(false);
                    }
                  }}
                >
                  {post.id === selectedPost?.id && showPostInfo
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
