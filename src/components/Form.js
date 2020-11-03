import React from 'react'

import { makeStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const getStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    marginTop: '25px'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dropdown: {
    minWidth: 100
  }
}))

const Form = props => {
  const classes = getStyles()
  return (
    <form onSubmit={props.onSubmit} className={classes.form}>
      <TextField
        label='Search'
        name='searchQuery'
        className={classes.textField}
        onChange={e => props.onInputChange(e.target.value)}
        margin='normal'
        variant='outlined'
      />

      
      <FormControl variant="outlined" margin="normal" className={classes.dropdown}>
          <InputLabel id="search-category-label">Search Type</InputLabel>
            <Select
              labelId="search-category-label"
              id="select-search-category"
              onChange={(e)=>props.onCategoryChange(e.target.value)}
              value={props.category}
              label="Search Type">
              <MenuItem value="multi">Multi</MenuItem>
              <MenuItem value="movie">Movies</MenuItem>
              <MenuItem value="tv">TV Shows</MenuItem>
            </Select>
        </FormControl>

      <Button variant='outlined' className={classes.button} type='submit'>
        Search
      </Button>

    </form>
  )
}

export default Form
