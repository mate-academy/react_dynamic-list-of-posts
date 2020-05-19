import React from 'react';
import CommentList from './CommentList';
import UserInfo from './UserInfo';

type Props = {
  author: UserProps;
  comments: CommentProps[];
};

const User: React.FC<Props> = ({ author, comments }) => (
  <>
    <div className="user_info">
      <h4 className="author">
        Author:&nbsp;
        {author.name}
      </h4>
      <p className="email">
        Email:&nbsp;
        {author.email}
      </p>
    </div>
    <UserInfo author={author} />
    <CommentList comments={comments} />
  </>
);

export default User;
