import React, { Component } from 'react';
import ImageContainer from '../ImageContainer/ImageContainer';
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Mood Ring</h1>
          <p className="App-intro">-- an image carousel with applied tags --</p>
        </header>
        <ImageContainer />
      </div>
    );
  }
}

export default App;
