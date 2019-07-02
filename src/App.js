import React, { Component } from 'react';
import axios from 'axios';
import { Navbar } from './components/layout/Navbar';
import { Users } from './components/Users';
import Search from './components/Search';
import Spinner from './components/layout/Spinner';
import './index.css';

class App extends Component {
    state = {
        users: [],
        loading: true,
    };

    async componentDidMount() {
        const res = await axios.get(
            `https://api.github.com/users?
            client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);

        this.setState({
            users: res.data,
        }, () => {
            this.setState({ loading: false });
        });
    }

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

    render() {
        const { users, loading } = this.state;
        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Search searchUsers={this.searchUsers} />
                    <Spinner loading={loading} />
                    <Users users={users} loading={loading} />
                </div>
            </div>
        );
    }
}

export default App;
