import React from "react"
import { User } from "../../types/User"

type Props = {
    user: User
    selectedUser: User | null
    onSelectUser: (person: User) => void
}

export const UserItem: React.FC<Props> = ({
    user,
    selectedUser,
    onSelectUser = () => {}
}) => {
    const isActive = selectedUser?.id === user.id;
    return (
        <a href={`#user-${user.id}`}
           className={`dropdown-item ${isActive ? 'is-active' : ''}`}
           onClick={() => onSelectUser(user)}
        >
            {user.name}
        </a>
    )
}