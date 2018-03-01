import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import SingleSeason from './components/SingleSeason';
// import SongInfo from './components/SongInfo';

class App extends React.Component {

  
  
  render() {
    return (
      <div>
        <LandingPage />
        <SingleSeason />
      </div>
    )
  }  
  }



  


ReactDOM.render(<App />, document.getElementById('app'));
