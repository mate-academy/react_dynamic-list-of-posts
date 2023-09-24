/* eslint-disable */
// eslint-disable
import { Dispatch, useReducer } from "react"
import { Post } from "../types/Post"
import { ACTIONS } from "../utils/enums"
import React from "react"
import { User } from "../types/User"
import { Comment } from "../types/Comment"
import { cloneDeep } from "lodash";

type Action = { type: ACTIONS.SET_SELECTED_POST, payload: Post }
| { type: ACTIONS.SET_SELECTED_USER, payload: User }
| { type: ACTIONS.SET_COMMENTS, payload: Comment[] }
| { type: ACTIONS.IS_LOADING, payload: boolean }
| { type: ACTIONS.SHOWFORM, payload: boolean }
| { type: ACTIONS.DELETE_COMMENT, payload: Comment }
| { type: ACTIONS.SET_ERROR, payload: string }

interface Data {
  selectedPost: Post,
  selectedUser: User,
  comments: Comment[],
  isLoading: boolean,
  showForm: boolean,
  error: string
}

function remove(state: Data, comment: Comment): Comment[] {
  const copyList = cloneDeep(state.comments);
  const index = copyList.findIndex(elem => elem.id === comment.id);

  copyList.splice(index, 1);

  return copyList;
}

function reducer(state: Data, action: Action): Data {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      }
    case ACTIONS.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      }
    case ACTIONS.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case ACTIONS.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case ACTIONS.SHOWFORM:
      return {
        ...state,
        showForm: action.payload,
      }
    case ACTIONS.DELETE_COMMENT:
      return {
        ...state,
        comments: [...remove(state, action.payload)],
      }
    default:
      return state;
  }
}

type State = {
  state: Data,
  dispatch: Dispatch<Action>,
}

const initialState: State = {
  state: {
    selectedPost: {} as Post,
    selectedUser: {} as User,
    comments: [] as Comment[],
    isLoading: false,
    showForm: false,
    error: '',
  },
  dispatch: () => { },
};

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState.state);

  return (
    <StateContext.Provider value={{
      state: {
        ...state,
      },
      dispatch,
    }}>
      {children}
    </StateContext.Provider>
  )
}
