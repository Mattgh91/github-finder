import React from 'react';
import PropTypes from 'prop-types';
import { UserItem } from './UserItem';

const Users = ({ users, loading }) => (
    <div style={userStyle}>
        {users.map(user => (
            <UserItem
                key={user.id}
                id={user.id}
                login={user.login}
                avatar={user.avatar_url}
                url={user.url}
                link={user.html_url}
            />
        ))}
    </div>
);

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem',
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export { Users };
