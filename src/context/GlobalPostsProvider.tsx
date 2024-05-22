import React, { useEffect, useReducer, createContext, useContext } from "react";
import { reducer } from "./reducer";
import { State } from "../types/State";
import { client } from "../utils/fetchClient";

const initialState: State = {
  users: [],
  posts: [],
  user: null,
  comments: [],
  choosedPost: null,
  isPostSelected: false,
  isPostsLoading: false,
  isOpenPostBody: false,
  postsFetchError: false,
  isUserSelectOpen: false,
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
  const dispatcher = useContext(DispatchContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await client.get<any[]>('/users');

        dispatch({ type: 'setUsers', users: fetchedUsers });
      } catch (error) {
        dispatcher({ type: 'setPostsFetchError', postsFetchError: true });
      }
    };

    fetchUsers();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
