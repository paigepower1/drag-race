import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
   
  constructor() {
    super();
    this.state = {
      songsFilteredBySeason: []
    };
  }
  
  // here is our first API request
  // next we need to on click of an item, get the value and put it in the link
  // this will make it season specific

  componentDidMount() {
    axios.get(`http://www.nokeynoshade.party/api/seasons/1/lipsyncs`, {
    })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          songsFilteredBySeason: data.results
        });
      });
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }  
  }



  

ReactDOM.render(<App />, document.getElementById('app'));
