import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = ({ loading }) => {
    if (loading) {
        return (
            <Fragment>
                <img src={spinner} alt="spinner" />
            </Fragment>
        );
    } else return <Fragment />
};

export default Spinner;
