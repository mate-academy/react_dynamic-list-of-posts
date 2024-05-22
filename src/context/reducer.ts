import { Action } from "../types/Action";
import { State } from "../types/State";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setUsers':
      return { ...state, users: action.users };

    case 'setPosts':
      return { ...state, posts: action.posts };

    case 'setComments':
      return { ...state, comments: action.comments };

    case 'chooseUser':
      return { ...state, user: action.user };

    case 'isUserSelectOpen':
      return { ...state, isUserSelectOpen: !state.isUserSelectOpen };

    case 'deletedCommentId':
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.deletedCommentId
        )
      };

    case 'isCommentsLoading':
      return { ...state, isCommentsLoading: action.isCommentsLoading };

    case 'isOpenNewCommentForm':
      return { ...state, isOpenNewCommentForm: action.isOpenNewCommentForm };

    case 'isDataSend':
      return {
        ...state,
        isDataSend: action.isDataSend,
        comments: [...state.comments, action.newComment]
      };

    case 'isPostsLoading':
      return { ...state, isPostsLoading: action.isPostsLoading };

    case 'postsFetchError':
      return { ...state, postsFetchError: action.postsFetchError };

    case 'setCommentsFetchError':
      return { ...state, commentsFetchError: action.commentsFetchError };

    case 'isOpenPostBody':
      return { ...state, isOpenPostBody: action.isOpenPostBody };

    case 'choosedPost':
      return { ...state, choosedPost: action.choosedPost };

    default:
      return state;
  }
}
