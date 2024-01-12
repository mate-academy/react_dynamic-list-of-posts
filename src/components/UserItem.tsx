import { User } from '../types/User';

type Props = {
  user: User
  choose : (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: number,
    name: string) => void,
};

export const UserItem: React.FC<Props> = ({
  user,
  choose,
}) => {
  const { id, name } = user;

  return (
    <>
      <a
        href={`${user.id}#user-${id}`}
        className="dropdown-item"
        key={id}
        onClick={(e) => choose(e, id, name)}
      >
        {name}
      </a>
    </>
  );
};
