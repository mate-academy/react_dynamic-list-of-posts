import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import UsersAsync from 'store/users/usersAsync';
import User from 'models/User';
import { selectUsers } from 'store/users/usersSelectors';
import { selectSelectedPost } from 'store/posts/postsSelectors';
import { PostsList } from 'components/PostsList';
import { PostDetails } from 'components/PostDetails';
import { Autocomplete, TextField } from '@mui/material';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const selectedPost = useAppSelector(selectSelectedPost);

  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    dispatch(UsersAsync.fetchUsers());
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <Autocomplete
                  data-cy="UserSelector"
                  sx={{ width: { xs: '100%', md: '240px' } }}
                  value={author}
                  disablePortal
                  id="select-user"
                  options={users || []}
                  getOptionLabel={(user) => user.name || 'Unknow'}
                  onChange={(_:SyntheticEvent, user:User | null) => {
                    setAuthor(user);
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name || 'Unknow'}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="User"
                      placeholder="Choose user"
                    />
                  )}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {author ? (
                  <PostsList authorId={author.id} />
                ) : (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className="tile is-parent is-8-desktop Sidebar Sidebar--open"
            >
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
