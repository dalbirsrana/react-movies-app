import React from 'react'
import './App.css';

import Tabs from './containers/TabsContainer'

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <h1>React Movies App</h1>
      </header>
      <Tabs />
    </div>
  );
}

export default App;