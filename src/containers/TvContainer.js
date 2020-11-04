import React, { Component } from 'react'
import Loading from '../components/Loading'
import { getTv } from '../services/api'
import ShowMedia from '../components/ShowMedia'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';

export default class TvContainer extends Component {

    state = {
        isLoading: false,
        shows: {},
        currentPage: 1,
        totalPages: 1,
        category: 'airing_today'
    }

    setShow(cat, page=1) {
        getTv(cat, page).then(showList => {
            this.setState({
                isLoading: false,
                shows: showList.results,
                currentPage: showList.page,
                totalPages: showList.total_pages
            })
        })
    }

    componentDidMount() {
        const { category } = this.state

        this.setState({
            isLoading: true
        })
        // retrieving default category
        this.setShow(category)
    }

    onCategoryChange = categorySelected => {

        this.setState({ 
            isLoading:true, 
            category: categorySelected 
        })
        this.setShow(categorySelected)
    }

    onPageChange = (event, page) => {
        this.setState({
            currentPage: page
        })
        this.setShow(this.state.category, page)
    }

    render() {

        let {isLoading, shows, category, currentPage, totalPages } = this.state

        return (
            <div id="tvShow-container" className="tab-content">

            <FormControl variant="outlined" className="form-control">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="select-category"
                    onChange={(e)=>this.onCategoryChange(e.target.value)}
                    value={category}
                    label="Select Category">
                    <MenuItem value="airing_today">Airing Today</MenuItem>
                    <MenuItem value="on_the_air">On the Air</MenuItem>
                    <MenuItem value="popular">Popular</MenuItem>
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

            { isLoading ? ( <Loading /> ) : ( <ShowMedia mediaList={shows} /> )}

            </div>
        )
    }
}
