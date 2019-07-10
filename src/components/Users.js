import React, { useContext } from 'react';
import Spinner from './layout/Spinner';
import { UserItem } from './UserItem';
import GitHubContext from '../context/github/githubContext';

const Users = () => {
    const gitHubContext = useContext(GitHubContext);
    const { users, loading } = gitHubContext;

    if (loading) {
        return <Spinner />
    } else {
        return (
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
    }
};

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem',
};

export { Users };
