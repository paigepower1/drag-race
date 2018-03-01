import React from 'react';
import axios from 'axios';
// import config from 'config.js';

class LandingPage extends React.Component {
    constructor() {
        super();
        this.state = {
            songsFilteredBySeason: [],
            songDetails: {
              songName:"",
              songOriginalArtist:"",
            }
            
        };
    this.handleClick = this.handleClick.bind(this);
    }
    // here is our first API request
    // next we need to on click of an item, get the value and put it in the link
    // this will make it season specific

    handleClick(e) {
        e.preventDefault(e)
        // console.log(e.target.value);
        const getSeason = e.target.value;
        console.log(getSeason);
        axios.get(`http://www.nokeynoshade.party/api/seasons/${getSeason}/lipsyncs`, {
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
                <ul>
                    <li value="1" onClick={this.handleClick}>Season 1</li>
                    <li value="2" onClick={this.handleClick}>Season 2</li>
                    <li value="3" onClick={this.handleClick}>Season 3</li>
                    <li value="4" onClick={this.handleClick}>Season 4</li>
                    <li value="5" onClick={this.handleClick}>Season 5</li>
                    <li value="6" onClick={this.handleClick}>Season 6</li>
                    <li value="7" onClick={this.handleClick}>Season 7</li>
                    <li value="8" onClick={this.handleClick}>Season 8</li>
                    <li value="9" onClick={this.handleClick}>Season 9</li>
                </ul>
    
            </div>
        )
    }  
}




export default LandingPage;