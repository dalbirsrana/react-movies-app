import React, { Component } from 'react'
export default class SearchContainer extends Component {

    render() {

        return (

            <div id="movies-container" className="tab-container">
            
            { Array.isArray(this.props.shows) && this.props.shows.map( (show, index) => {
                const {poster_path, original_title, popularity, overview} = show

                return (
                    <div key={index} className="show-container">
                        <div className="show-poster">
                            <img src={"http://image.tmdb.org/t/p/w185" + poster_path} alt="poster" />
                        </div>
                        <div className="show-details">
                            <h4>{original_title}</h4>
                            <div>Popularity: {popularity}</div>
                            <p>{overview }</p>
                        </div>
                    </div>
                )
            }
                ) 
            }
            </div>
        )
    }
}
