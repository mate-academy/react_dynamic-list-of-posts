import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getPosts } from '../api/posts';
import { Post } from '../types/Post';
import { Notifications } from '../types/Notifications';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setPosts: (posts: Post[]) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

// export const UserSelector: React.FC<Props> = ({
//   users,
//   selectedUser,
//   setSelectedUser,
//   setErrorMessage,
//   setPosts,
//   setLoading,
//   setSelectedPost,
// }) => {
//   const [isDropdownActive, setIsDropdownActive] = useState(false);

//   const loadUserPosts = (userId: number) => {
//     setSelectedPost(null);
//     setLoading(true);
//     getPosts(userId)
//       .then(setPosts)
//       .catch(() => setErrorMessage(Notifications.loadingError))
//       .finally(() => setLoading(false));
//   };

//   const handleUserChange = (user: User) => {
//     setSelectedUser(user);
//     setIsDropdownActive(false);
//     loadUserPosts(user.id);
//   };

//   return (
//     <div
//       data-cy="UserSelector"
//       className={classNames('dropdown', {
//         'is-active': isDropdownActive,
//       })}
//     >
//       <div className="dropdown-trigger">
//         <button
//           type="button"
//           className="button"
//           aria-haspopup="true"
//           aria-controls="dropdown-menu"
//           onClick={() => setIsDropdownActive(!isDropdownActive)}
//         >
//           <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

//           <span className="icon is-small">
//             <i className="fas fa-angle-down" aria-hidden="true" />
//           </span>
//         </button>
//       </div>

//       <div className="dropdown-menu" id="dropdown-menu" role="menu">
//         <div className="dropdown-content">
//           {users.map(user => (
//             <a
//               href={`#user-${user.id}`}
//               key={user.id}
//               className={classNames('dropdown-item', {
//                 'is-active': selectedUser?.id === user.id,
//               })}
//               onClick={() => handleUserChange(user)}
//             >
//               {user.name}
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setErrorMessage,
  setPosts,
  setLoading,
  setSelectedPost,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const loadUserPosts = (userId: number) => {
    setSelectedPost(null);
    setLoading(true);
    getPosts(userId)
      .then(setPosts)
      .catch(() => setErrorMessage(Notifications.loadingError))
      .finally(() => setLoading(false));
  };

  const handleUserChange = (user: User) => {
    setSelectedUser(user);
    setIsDropdownActive(false);
    loadUserPosts(user.id);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(prev => !prev)}
          onBlur={() => setIsDropdownActive(false)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => handleUserChange(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
