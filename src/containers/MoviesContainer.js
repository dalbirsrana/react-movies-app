import React, { Component } from 'react'
import Loading from '../components/Loading'
import { getMovies } from '../services/api'


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import ListMovies from '../components/ListMovies'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default class MoviesContainer extends Component {

    state = {
        isLoading: false,
        movies: {},
        category: 'popular'
    }

    componentDidMount() {
        const { category } = this.state

        this.setState({
            isLoading: true
        })

        getMovies( category ).then(m => {

            this.setState({
                isLoading: false,
                movies: m.results
            })

        })

    }

    onCategoryChange = e => {
        this.setState({ isLoading:true, category: e.target.value })

        getMovies( this.state.category ).then(m => {
            this.setState({
                isLoading: false,
                movies: m.results
            })
        })
    }

    render() {

        let {isLoading, movies, category } = this.state

        return (
            <div>
            <FormControl variant="outlined" className={useStyles.formControl}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="select-category"
                    value={category}
                    onChange={this.onCategoryChange}
                    label="Category"
                >
                    <MenuItem value={'popular'}>Popular</MenuItem>
                    <MenuItem value={'now_playing'}>Now Playing</MenuItem>
                    <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                    <MenuItem value={'top_rated'}>Top Rated</MenuItem>
                </Select>
            </FormControl>

                <div>Movies Container</div>
                { isLoading ? (
                    <Loading />
                ) : (
                    <>
                    { 
                        Array.isArray(movies) && movies.map( movie => (
                            <div id={movie.id}>
                                
                                <img src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="poster" />

                                <h4>{movie.original_title}</h4>

                                <div>Release Date: {movie.release_date} | Popularity: { movie.popularity }</div>
                                
                                <p>{ movie.overview }</p>

                            </div>
                        )) 
                    }                        
                    </>
                    
                )}
            </div>
        )
    }
}
