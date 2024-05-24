import React, { useReducer, createContext } from "react";
import { reducer } from "./reducer";
import { State } from "../types/State";

const initialState: State = {
  users: [],
  posts: [],
  user: null,
  comments: [],
  choosedPost: null,
  isDataSend: false,
  isPostSelected: false,
  isPostsLoading: false,
  isOpenPostBody: false,
  postsFetchError: false,
  isUserSelectOpen: false,
  isCommentsLoading: false,
  commentsFetchError: false,
  isWriteButtonHidden: false,
  isOpenNewCommentForm: false,
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<React.Dispatch<any>>(
  () => {}
);

interface Props {
  children: React.ReactNode;
}

export const GlobalPostsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
