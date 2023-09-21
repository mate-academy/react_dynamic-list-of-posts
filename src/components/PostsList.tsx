/* eslint-disable */
import React, { useContext,
  // useEffect,
  // useEffect,
  // useState,
} from 'react';
import { Post } from '../types/Post';
import { StateContext } from './AppContext';
import { ACTIONS } from '../utils/enums';
// import { getComments } from '../utils/loadutil';

type Props = {
  usersPosts: Post[],
}

export const PostsList: React.FC<Props> = ({ usersPosts }) => {
  // const [selectedPost, setSelectedPost] = useState({} as Post);
  const { state, dispatch } = useContext(StateContext);

  // console.log(selectedPost, 'list');

  function openPost(post: Post) {

    // setSelectedPost(post);
    dispatch({ type: ACTIONS.SET_SELECTED_POST, payload: post });

}

  console.log(state.comments, 'state');
  // useEffect(() => {
  //   getComments(state.selectedPost.id)
  //   .then(res => {
  //     dispatch({ type: ACTIONS.SET_COMMENTS, payload: res })
  //     console.log(res, 'res');

  //   })
  // }, [])
  // console.log(state.comments.filter(comment => comment.postId === state.selectedPost.id));

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

          {usersPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => openPost(post)}
                >
                  Open
                </button>
              </td>
            </tr>
          ))}



          {/* <tr data-cy="Post">
          <td data-cy="PostId">18</td>

          <td data-cy="PostTitle">
            voluptate et itaque vero tempora molestiae
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link"
            >
              Close
            </button>
          </td>
        </tr> */}

          {/* <tr data-cy="Post">
          <td data-cy="PostId">19</td>
          <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr> */}

          {/* <tr data-cy="Post">
          <td data-cy="PostId">20</td>
          <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr> */}
        </tbody>
      </table>
    </div>
  )
};
