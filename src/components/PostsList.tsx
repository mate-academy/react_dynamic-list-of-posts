import React, { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Loader } from './Loader';

type PostsListProps = {
  userId: number | null;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>;
  setShowNewCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<PostsListProps> = ({
  userId,
  setSelectedPostId,
  setShowNewCommentForm,
}) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError(false);

      client
        .get<Post[]>(`/posts?userId=${userId}`)
        .then(posts => setUserPosts(posts))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div data-cy="PostsList">
          {error ? (
            <div className="notification is-danger" data-cy="PostsLoadingError">
              Something went wrong!
            </div>
          ) : userPosts.length === 0 ? (
            <div className="notification is-warning" data-cy="NoPostsYet">
              No posts yet
            </div>
          ) : (
            <>
              <p className="title">Posts:</p>

              <table
                className="
                  table 
                  is-fullwidth 
                  is-striped 
                  is-hoverable 
                  is-narrow
                "
              >
                <thead>
                  <tr className="has-background-link-light">
                    <th>#</th>
                    <th>Title</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {userPosts.map(userPost => {
                    const isActive = activePostId === userPost.id;

                    return (
                      <tr data-cy="Post" key={userPost.id}>
                        <td data-cy="PostId">{userPost.id}</td>
                        <td data-cy="PostTitle">{userPost.title}</td>
                        <td className="has-text-right is-vcentered">
                          <button
                            type="button"
                            data-cy="PostButton"
                            className={`button is-link ${
                              isActive ? '' : 'is-light'
                            }`}
                            onClick={() => {
                              const newId = isActive ? null : userPost.id;

                              setActivePostId(newId);
                              setSelectedPostId(newId);
                              setShowNewCommentForm(false);
                            }}
                          >
                            {isActive ? 'Close' : 'Open'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </>
  );
};
