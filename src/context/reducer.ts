import { Action } from "../types/Action";
import { State } from "../types/State";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setUsers':
      return { ...state, users: action.users };

    case 'setPosts':
      return { ...state, posts: action.posts, isPostsLoading: false };

    case 'setComments':
      return { ...state, comments: action.comments };

    case 'isUserSelectOpen':
      return { ...state, isUserSelectOpen: !state.isUserSelectOpen };

    case 'isPostsLoading':
      return { ...state, isPostsLoading: action.isPostsLoading };

    case 'postsFetchError':
      return { ...state, postsFetchError: action.postsFetchError };

    case 'isOpenPostBody':
      return { ...state, isOpenPostBody: action.isOpenPostBody };

    case 'choosedPost':
      return { ...state, choosedPost: action.choosedPost };

    case 'chooseUser':
      return { ...state, user: action.user };

    default:
      return state;
  }
}
