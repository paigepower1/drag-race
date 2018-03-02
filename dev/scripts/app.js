import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './components/LandingPage';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
    
    };
  }

  render() {
    return (
      <div>
        < LandingPage/>

      </div>
    )
  }  
  }



  


ReactDOM.render(<App />, document.getElementById('app'));
