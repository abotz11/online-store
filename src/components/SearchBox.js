import React from 'react';

class SearchBox extends React.Component {
    render() {
        return (
            <div className="searchForm text-white">
            <input
                type="text"
                placeholder="Search for product..."
                onChange={this.props.handlerSearch}
                />
            </div>
        );
    }
}

export default SearchBox;