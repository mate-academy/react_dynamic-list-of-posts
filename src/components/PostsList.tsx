import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setActiveTab: (activeTab: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (selectedPost: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setActiveTab,
  selectedPost,
  setSelectedPost,
}) => {
  // const handleActivateComment = (postId: number) => {
  //   setActiveTab(true);
  //   setSelectedPost(posts.find(post => post.id === postId) || null);
  // }

  const handleActivateComment = (postId: number) => {
    if (selectedPost?.id === postId) {
      setActiveTab(false);
      setSelectedPost(null);
    } else {
      setActiveTab(true);
      setSelectedPost(posts.find(post => post.id === postId) || null);
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn(
                    'button is-link ',
                    { 'is-light': selectedPost?.id !== post.id },
                  )}
                  onClick={() => handleActivateComment(post.id)}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
