import React, { useContext } from 'react';
import { TodosContext } from '../../TodoContext/TodoContext';
import { Errors } from '../../types/Errors';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';

export const PostsList: React.FC = () => {
  const {
    isLoading,
    userPosts,
    selectedPost,
    selectedUser,
    errorMessage,
    setSelectedPost,
    setAvailNewComment,
  } = useContext(TodosContext);

  const choosePost = (post: Post) => {
    setSelectedPost(post);
    setAvailNewComment(false);
  };

  const resetChoosenPost = () => {
    setSelectedPost(undefined);
    setAvailNewComment(false);
  };

  const userLength = userPosts.length > 0;

  return (
    <>
      {isLoading && (
        <Loader />
      )}

      {(selectedUser && userLength && !isLoading) && (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table className="table 
            is-fullwidth 
            is-striped 
            is-hoverable 
            is-narrow"
          >
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {userPosts.map(post => (
                <tr
                  data-cy="Post"
                  key={post.id}
                >
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">
                    {post.title}
                  </td>

                   <td className="has-text-right is-vcentered">
                    {
                      selectedPost && selectedPost.id === post.id
                        ? (
                          <button
                            type="button"
                            data-cy="PostButton"
                            className="button is-link is-blue"
                            onClick={resetChoosenPost}
                          >
                            Close
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-cy="PostButton"
                            className="button is-link is-light"
                            onClick={() => choosePost(post)}
                          >
                            Open
                          </button>
                        )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(selectedUser && !userLength && !errorMessage && !isLoading) && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          {Errors.NoPostsYet}
        </div>
      )}

      {errorMessage && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          {Errors.SomethingWrong}
        </div>
      )}
    </>
  );
};
