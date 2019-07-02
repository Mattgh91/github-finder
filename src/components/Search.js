import React, {Component} from 'react';

class Search extends Component {
    state = {
        text: '',
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { text } = this.state;
        const { searchUsers } = this.props;

        e.preventDefault();
        searchUsers(text);
        this.setState({ text: '' });
    };

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="text"
                        placeholder="Search Users..."
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-dark btn-block"
                    />
                </form>
            </div>
        );
    }
}

export default Search;
