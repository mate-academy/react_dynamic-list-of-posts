import React from 'react';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
// import { User } from '../types/User';

type Props = {
  post: Post | undefined,
  setPost: any,
  userPosts: Post[],
  detailsSeen: boolean,
  setDetailsSeen: any,
  postComments: Comment[],
  setPostComments: any,
  setIsLoadingComments: any,
};

export const PostsList: React.FC<Props> = ({
  post, setPost, userPosts, detailsSeen, setDetailsSeen,
  setIsLoadingComments, setPostComments,
}: any) => {
  const textInButton = (singlePost: Post) => {
    return detailsSeen && post.id === singlePost.id ? 'Close' : 'Open';
  };

  const getPost = async (singlePost: any) => {
    setIsLoadingComments(true);
    try {
      const usersResponse = client.get('/comments');
      const usersResult = await usersResponse;

      if (Array.isArray(usersResult) && usersResult) {
        await setPostComments(usersResult.filter(
          (comment: any) => comment.postId === singlePost.id,
        ));
      }
    } catch (error) {
      throw Error('An error occured');
    }

    setIsLoadingComments(false);

    setPost(singlePost);
    setDetailsSeen(true);

    if (detailsSeen && post.id === singlePost.id) {
      setDetailsSeen(false);
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
          {
            userPosts.map((singlePost: Post) => {
              return (
                <tr data-cy="Post" key={singlePost.id}>
                  <td data-cy="PostId">{singlePost.id}</td>
                  <td data-cy="PostTitle">
                    {singlePost.title}
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={`button is-link 
                      ${textInButton(singlePost) === 'Open' && 'is-light'}`}
                      onClick={() => {
                        getPost(singlePost);
                      }}
                    >
                      {textInButton(singlePost)}
                    </button>
                  </td>
                </tr>
              );
            })

          }
        </tbody>
      </table>
    </div>
  );
};
