import React from 'react';

interface UserBoxProps {
    user: {
        name: string;
        email: string;
    };
}

export const UserBox: React.FC<UserBoxProps> = ({ user }) => {
    return (
        <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
        </div>
    );
};