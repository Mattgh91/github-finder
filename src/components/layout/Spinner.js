import React, { useContext, Fragment } from 'react';
import GitHubContext from '../../context/github/githubContext';
import spinner from './spinner.gif';

const Spinner = () => {
    const gitHubContext = useContext(GitHubContext);
    const { loading } = gitHubContext;
    if (loading) {
        return (
            <Fragment>
                <img
                    src={spinner}
                    alt="spinner"
                    style={{ maxWidth: 250, display: 'block', margin: '0 auto' }}
                />
            </Fragment>
        );
    } else return <Fragment />
};

export default Spinner;
