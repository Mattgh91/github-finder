import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
    return (
        <nav className="navbar bg-primary">
            <i className={icon} />
            <h1>{title}</h1>
        </nav>
    );
};

Navbar.defaultProps = {
    icon: 'fab fa-github',
    title: 'Github Finder',
};

Navbar.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export { Navbar };