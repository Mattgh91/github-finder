import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from './layout/Spinner';

class User extends Component {
    componentDidMount() {
        const { getUser } = this.props;
        getUser(this.props.match.params.login);
    }

    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            company,
            following,
            public_repos,
            public_gists,
            hireable,
        } = this.props.user;

        const { loading } = this.props;

        if (loading) return <Spinner loading={loading} />;

        return (
            <Fragment>
                <Link to ='/' className="btn btn-light">Back</Link>
                <div className="card grid-2">
                    <div className="all-center">
                        <img
                            src={avatar_url}
                            className="round-img"
                            alt=""
                            style={{ width: 150 }}
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio &&
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        }
                        <a href={html_url} className="btn btn-dark my-1">Visit profile</a>
                        <ul>
                            <li>
                                {login &&
                                    <Fragment>
                                        <strong>Username: </strong> {login}
                                    </Fragment>
                                }
                            </li>
                            <li>
                                <strong>Open for hire:</strong> {hireable ? <i className="fas fa-check text-success" /> : <i className="fa fa-times-circle text-danger" /> }
                            </li>
                            <li>
                                {blog &&
                                    <Fragment>
                                        <strong>Blog: </strong> {blog}
                                    </Fragment>
                                }
                            </li>
                            <li>
                                {company &&
                                    <Fragment>
                                        <strong>Company: </strong> {company}
                                    </Fragment>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-danger">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
            </Fragment>
        );
    }
}

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
};

export default User;
