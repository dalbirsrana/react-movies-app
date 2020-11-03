import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { getSearch } from '../services/api'

import Movies from './MoviesContainer'
import Search from './SearchContainer'
import TvShows from './TvContainer'
import Form from '../components/Form'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


export default class FullWidthTabs extends Component {

    state = {
        value: 0,
        
        isLoading: false,
        shows: {},
        currentPage: 1,
        totalPages: 1,
        category: 'multi',
        query: '',
        msg: 'Please enter a search'
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    
    setSearch(cat, query, page=1) {
        getSearch( cat, query, page ).then(List => {
            this.setState({
                isLoading: false,
                shows: List.results,
                currentPage: List.page,
                totalPages: List.total_pages
            })
        })
    }

    
    fetchShows = (e) => {
        e.preventDefault(); 

        this.setState({ 
            isLoading:true
        })

        this.setSearch(this.state.category, this.state.query)

        console.log(this.state.shows)
    }

    handleInputChange = (value) => {
        this.setState({
            query: value
        })
    }

    handleCategoryChange = (value) => {
        this.setState({
            category: value
        })
    }


    render() {

        const {value} = this.state;

        return (
            <>
            <Form
                onSubmit={this.fetchShows}
                onInputChange={this.handleInputChange}
                onCategoryChange={this.handleCategoryChange}
                category={this.category}
            />

            <div>
            <AppBar position="static" color="default">
                <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs"
                >
                    <Tab label="Movies" {...a11yProps(0)} />
                    <Tab label="Search" {...a11yProps(1)} />
                    <Tab label="Tv Shows" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            
            <TabPanel value={value} index={0}>
                <Movies />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Search shows={this.state.shows} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TvShows />
            </TabPanel>

        </div>
        </>
        );
    }
}