import React, { Component } from 'react';
import axios from 'axios';
import { Navbar } from './components/layout/Navbar';
import { Users } from './components/Users';
import Alert from './components/Alert';
import Search from './components/Search';
import Spinner from './components/layout/Spinner';
import './index.css';

class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null,
    };

    // async componentDidMount() {
    //     const res = await axios.get(
    //         `https://api.github.com/users?
    //         client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    //         client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
    //
    //     this.setState({
    //         users: res.data,
    //     }, () => {
    //         this.setState({ loading: false });
    //     });
    // }

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

    clearUsers = () => {
         this.setState({
             users: [],
             loading: false,
         });
    };

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

    render() {
        const { users, loading, alert } = this.state;
        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Alert alert={alert} />
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0}
                        setAlert={this.setAlert}
                    />
                    <Spinner loading={loading} />
                    <Users users={users} loading={loading} />
                </div>
            </div>
        );
    }
}

export default App;
