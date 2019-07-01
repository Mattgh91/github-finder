import React, { Component } from 'react';
import axios from 'axios';
import { Navbar } from './components/layout/Navbar';
import { Users } from './components/Users';
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

    render() {
        const { users, loading } = this.state;
        return (
            <div className="App">
                <Navbar />
                <Spinner loading={loading} />
                <div className="container">
                    <Users users={users} loading={loading} />
                </div>
            </div>
        );
    }
}

export default App;
