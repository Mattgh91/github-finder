import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './components/layout/Navbar';
import { Users } from './components/Users';
import User from './components/User';
import Alert from './components/Alert';
import Search from './components/Search';
import About from './components/About';
import Spinner from './components/layout/Spinner';
import './index.css';

import GithubState from './context/github/GithubState';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Search GitHub Users...
    const searchUsers = async text => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setUsers(res.data.items);
        setLoading(false);
    };

    // Get single GitHub user details
    const getUser = async username => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setUser(res.data);
        setLoading(false);
    };

    // Get user repos
    const getUserRepos = async username => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setRepos(res.data);
        setLoading(false);
    };

    // Clear GitHub search/users
    const clearUsers = () => {
         setUsers([]);
         setLoading(false);
    };

    // Set alert in case of no entry upon submit
    const showAlert = (msg, type) => {
        setAlert({msg, type});
        setTimeout(() => setAlert(null), 3500);
    };

    return (
        <GithubState>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={alert} />
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={users.length > 0}
                                        setAlert={showAlert}
                                    />
                                    <Spinner loading={loading} />
                                    <Users users={users} loading={loading} />
                                </Fragment>
                            )} />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                render={props => (
                                    <User
                                        { ...props}
                                        user={user}
                                        repos={repos}
                                        getUser={getUser}
                                        getUserRepos={getUserRepos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
