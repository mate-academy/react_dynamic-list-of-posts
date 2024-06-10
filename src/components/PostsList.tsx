import React, { useContext } from 'react';
import { Post } from '../types/Post';
import { PostContext } from '../context/PostContextProvider';
import { PostComponent } from './Post';

export interface PListType {
  posts: Post[];
}

export const PostsList: React.FC<PListType> = ({ posts }) => {
  const postContext = useContext(PostContext);

  const handleOpenPost = (post: Post, active: boolean) => {
    if (!active) {
      postContext.setPost(null);

      return;
    }

    postContext.setPost(post);
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
              <PostComponent
                post={post}
                key={post.id}
                handleOpenPost={handleOpenPost}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
