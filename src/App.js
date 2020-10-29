import React from 'react'
import './App.css';

import SearchForm from './components/Form'
// import TabsSection from './containers/TabsContainer'

import MoviesSection from './containers/MoviesContainer'

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <h1>React Movies App</h1>
      </header>
      <SearchForm />
      <MoviesSection />
    </div>
  );
}

export default App;