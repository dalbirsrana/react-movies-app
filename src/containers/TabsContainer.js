import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
                {children}
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
        category: "multi",
        query: "",
        msg: 'Please enter a search'
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }
    
    fetchShows = (e) => {
        e.preventDefault(); 

        this.setState({ 
            isLoading:true
        })

        getSearch(this.state.category, this.state.query, this.state.currentPage).then(List => {
            this.setState({
                isLoading: false,
                shows: List.results,
                currentPage: List.page,
                totalPages: List.total_pages,
                msg: ""
            })

            if (Object.keys(this.state.shows).length === 0) {
                this.setState({
                    msg: "Sorry, there were no results"
                })
            }
        })
    }

    handleInputChange = (value) => {
        if (value !== "") {
            this.setState({
                query: value,
                msg: "Please initiate a search"
            })
        } else {
            this.setState({
                query: value,
                msg: "Please enter a search"
            })
        }
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
            <div className="header-form">
                <Form
                    onSubmit={this.fetchShows}
                    onInputChange={this.handleInputChange}
                    onCategoryChange={this.handleCategoryChange}
                    category={this.state.category}
                />
            </div>

            <div className="tab-container">
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
                        <Tab label="Search Results" {...a11yProps(1)} />
                        <Tab label="Tv Shows" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                
                <TabPanel value={value} index={0}>
                    <Movies />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Search shows={this.state.shows} message={this.state.msg} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TvShows />
                </TabPanel>

        </div>
        </>
        );
    }
}