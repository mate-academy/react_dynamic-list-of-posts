import React from 'react';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';
import { postShape } from '../types/propShapes';

interface PostsListProps {
  posts: Post[] | null;
  onSelectPost: (id: number) => void;
  selectedPostId: number | null;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  onSelectPost,
  selectedPostId,
}) => {
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
          {posts &&
            posts.map(post => (
              <tr data-cy="Post" key={post.id}>
                <PostItem
                  post={post}
                  onSelectPost={onSelectPost}
                  isSelected={post.id === selectedPostId}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(postShape.isRequired).isRequired,
  selectedPostId: PropTypes.number,
  onSelectPost: PropTypes.func.isRequired,
};
