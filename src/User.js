import React from 'react';

function User({ user }) {
    return (
        <div className="user" >
            <h5 className="author">Author</h5>
            <ul className="user_info">
                <li className="user_name">Author-name: <span>{user.name}</span></li>
                <li className="user_email">Email: <span>{user.email}</span></li>
                <li className="user_address">City: <span>{user.address.city}</span></li>
            </ul>
        </div>
    )
}

export default User;