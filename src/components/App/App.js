import React, { Component } from 'react';
import ImageContainer from '../ImageContainer/ImageContainer';
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <header>
          <h1>Mood Ring</h1>
        </header>
        <ImageContainer />
      </div>
    );
  }
}

export default App;
