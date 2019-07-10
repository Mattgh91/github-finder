import React, {Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Users } from './components/Users';
import User from './components/User';
import Alert from './components/Alert';
import Search from './components/Search';
import About from './components/About';
import './index.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
    return (
        <GithubState>
        <AlertState>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={alert} />
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search />
                                    <Users />
                                </Fragment>
                            )} />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                render={props => (
                                    <User
                                        { ...props}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </AlertState>
        </GithubState>
    );
};

export default App;
