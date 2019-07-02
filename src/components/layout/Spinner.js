import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = ({ loading }) => {
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
