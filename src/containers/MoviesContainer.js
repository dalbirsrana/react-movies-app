import React, { Component } from 'react'
import Loading from '../components/Loading'
import { getMovies } from '../services/api'


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';

// import ListMovies from '../components/ListMovies'


export default class MoviesContainer extends Component {

    state = {
        isLoading: false,
        movies: {},
        currentPage: 1,
        totalPages: 1,
        category: 'popular'
    }

    setMovies(cat, page=1) {
        getMovies( cat, page ).then(moviesList => {
            this.setState({
                isLoading: false,
                movies: moviesList.results,
                currentPage: moviesList.page,
                totalPages: moviesList.total_pages
            })
        })
    }

    componentDidMount() {
        const { category } = this.state

        this.setState({
            isLoading: true
        })
        // retrieving default category
        this.setMovies(category)
    }

    onCategoryChange = categorySelected => {

        this.setState({ 
            isLoading:true, 
            category: categorySelected 
        })

        this.setMovies(categorySelected)
    }

    onPageChange = (event, page=1) => {
        console.log(page)

        this.setState({
            currentPage: page
        })

        this.setMovies(this.state.category, page)
    }

    render() {

        let {isLoading, movies, category, currentPage, totalPages } = this.state


        return (
            <div id="movies-container" className="tab-container">

            <FormControl variant="outlined" className="form-control">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="select-category"
                    onChange={(e)=>this.onCategoryChange(e.target.value)}
                    value={category}
                    label="Select Category">
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="now_playing">Now Playing</MenuItem>
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                    <MenuItem value="top_rated">Top Rated</MenuItem>
                </Select>
            </FormControl>


            <Pagination 
                count={totalPages} 
                page={currentPage} 
                variant="outlined" 
                shape="rounded" 
                onChange={this.onPageChange}
                className="pagination-bar"
            />


                <h1>Movies</h1>

                { isLoading ? (
                    <Loading />
                ) : (
                    <>
                    { 
                        Array.isArray(movies) && movies.map( (movie, index) => (
                            <div key={index} className="show-container">
                                
                                <div className="show-poster">
                                    <img src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="poster" />
                                </div>

                                <div className="show-details">
                                    <h4>{movie.original_title}</h4>
    
                                    <div>Release Date: {movie.release_date} | Popularity: { movie.popularity }</div>
                                    
                                    <p>{ movie.overview }</p>
                                </div>

                            </div>
                        )) 
                    }                        
                    </>
                    
                )}
            </div>
        )
    }
}
