import React, { Component } from 'react'
import ShowMedia from '../components/ShowMedia'
export default class SearchContainer extends Component {
    render() {
        return (
            <div id="search-container" className="tab-content">
                <div className="search-message">
                    <h2>
                        {this.props.message}
                    </h2>
                </div>
                <ShowMedia mediaList={this.props.shows} />
            </div>
        )
    }
}
