/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { ListContext } from './ListContext';

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
              <tr
                data-cy="Post"
                key={post.id}
              >
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': post.id !== selectedPost.id,
                    })}
                    onClick={() => handleOpenPost(post.id, post)}
                  >
                    {
                      post.id === selectedPost.id ? (
                        'Close'
                      ) : (
                        'Open'
                      )
                    }
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
