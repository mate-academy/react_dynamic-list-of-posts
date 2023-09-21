/* eslint-disable */
// eslint-disable
import { Dispatch, useReducer } from "react"
import { Post } from "../types/Post"
import { ACTIONS } from "../utils/enums"
import React from "react"
import { User } from "../types/User"
import { Comment } from "../types/Comment"

type Action = { type: ACTIONS.SET_SELECTED_POST, payload: Post }
| { type: ACTIONS.SET_SELECTED_USER, payload: User }
| { type: ACTIONS.SET_COMMENTS, payload: Comment[] }

interface Data {
  selectedPost: Post,
  selectedUser: User,
  comments: Comment[],
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
  },
  dispatch: () => { },
};

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState.state);
  console.log(state.selectedPost,dispatch);
  // dispatch({ type: ACTIONS.SET_SELECTED_POST, payload: {
  //   id: 0,
  //   userId: 3554,
  //   title: 'string',
  //   body: 'string',
  // } as Post })

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
