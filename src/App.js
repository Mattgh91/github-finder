import React, {Component, Fragment} from 'react';
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

class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null,
    };

    // Search GitHub Users...
    searchUsers = async text => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&
            client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);

        this.setState({
            users: res.data.items,
        }, () => {
            this.setState({ loading: false });
        });
    };

    // Clear GitHub search/users
    clearUsers = () => {
         this.setState({
             users: [],
             loading: false,
         });
    };

    // Set alert in case of no entry upon submit
    setAlert = (msg, type) => {
        this.setState({
            alert: {
                msg,
                type,
            }
        }, () => {
            setTimeout(() => this.setState({ alert : null }), 3500)
        })
    };

    // Get single GitHub user details
    getUser = async username => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
                process.env.REACT_APP_GITHUB_SECRET}`
        );

        this.setState({
            user: res.data,
        }, () => {
            this.setState({ loading: false });
        });
    };

    render() {
        const { users, loading, alert, user } = this.state;
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={alert} />
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search
                                        searchUsers={this.searchUsers}
                                        clearUsers={this.clearUsers}
                                        showClear={users.length > 0}
                                        setAlert={this.setAlert}
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
                                        getUser={this.getUser}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
