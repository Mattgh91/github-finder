import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: '',
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = e => {
        const {text} = this.state;
        const {searchUsers, setAlert} = this.props;

        e.preventDefault();
        if(text === '') {
            setAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
            this.setState({text: ''});
        }
    };

    render() {
        const {clearUsers, showClear} = this.props;
        const {text} = this.state;
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="text"
                        placeholder="Search Users..."
                        value={text}
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-dark btn-block"
                    />
                </form>
                {showClear &&
                    <button
                        className="btn btn-light btn-block"
                        onClick={clearUsers}
                    >
                        Clear
                    </button>
                }
            </div>
        );
    }
}

export default Search;
