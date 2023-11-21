/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Post } from '../types/Post';
import { ListContext } from './ListContext';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[],
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const {
    selectedPost,
    setSelectedPost,
    setIsCommentFormVisible,
  } = useContext(ListContext);

  const handleOpenPost = (postId: number, post: Post) => {
    if (postId === selectedPost.id) {
      setSelectedPost({
        id: -1,
        userId: -1,
        title: '',
        body: '',
      });
    } else {
      setSelectedPost(post);
    }

    setIsCommentFormVisible(false);
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
          {
            posts.map(post => (
              <PostItem
                post={post}
                selectedPost={selectedPost}
                openPost={handleOpenPost}
                key={post.id}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
