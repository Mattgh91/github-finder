import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Users } from './components/Users';
import User from './components/User';
import Alert from './components/Alert';
import Search from './components/Search';
import About from './components/About';
import './index.css';

import GithubState from './context/github/GithubState';

const App = () => {
    const [alert, setAlert] = useState(null);

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
                                    <Search setAlert={showAlert} />
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
        </GithubState>
    );
};

export default App;
