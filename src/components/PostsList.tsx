import classNames from 'classnames';
import React from 'react';
import { usePosts } from '../PostsContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    posts,
    selectedPost,
    setSelectedPost,
    getPostDetails,
    setOpenForm,
  } = usePosts();

  const handlePostSelect = (chosenPost: Post) => {
    if (selectedPost === chosenPost) {
      setSelectedPost(null);
    } else {
      setSelectedPost(chosenPost);
      getPostDetails(chosenPost.id);
      setOpenForm(false);
    }
  };

  return (
    ((posts.length === 0) ? (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    ) : (
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
            {posts.map((post: Post) => (
              <tr data-cy="Post">
                <td data-cy="PostId">
                  {post.id}
                </td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': selectedPost !== post,
                    })}
                    onClick={() => handlePostSelect(post)}
                  >
                    {selectedPost !== post ? 'Open' : 'Close'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    ));
};
