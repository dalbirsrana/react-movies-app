import axios from 'axios'

import { API_KEY, BASE_URL } from '../config/api_config'

//movies filters: now_playing, popular, top_rated, upcoming 
export const getMovies = async (filter, cur_page) => {
    const url = BASE_URL + 'movie/' + filter

    try {
        const response = await axios.get(url, {
        params: {
            api_key: API_KEY,
            page: cur_page
        }
    })
    return response.data   
    } catch (error) {
        throw error
    }
}

// TV filters: airing_today, on_the_air, popular, top_rated
export const getTv = async (filter, cur_page) => {
    const url = BASE_URL + 'tv/' + filter

    try {
        const response = await axios.get(url, {
            params: {
                api_key: API_KEY,
                page: cur_page
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

// search filter: movie, multi, tv
export const getSearch = async (filter, search_query, cur_page) => {
    const url = BASE_URL + 'search/' + filter

    try {
        const response = await axios.get(url, {
            params: {
                api_key: API_KEY,
                query: search_query,
                page: cur_page
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}