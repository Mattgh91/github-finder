import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ id, login ,avatar, link }) => {
    return (
        <div className="card text-center">
            <img
                className="round-img"
                src={avatar}
                alt={login}
                style={{width: 60}}
            />
            <h3>{login}</h3>
            <div>
                <a
                    href={link}
                    className="btn btn-dark btn-sm my-1"
                >
                    More
                </a>
            </div>
        </div>
    );
};

UserItem.propTypes = {
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};


export { UserItem };
